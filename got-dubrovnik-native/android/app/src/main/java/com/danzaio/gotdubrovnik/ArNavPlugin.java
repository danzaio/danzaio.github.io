package com.danzaio.gotdubrovnik;

import android.content.Intent;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.ar.core.ArCoreApk;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

/** Bridge between the web guide and the native side: the AR walking screen and the device voice. */
@CapacitorPlugin(name = "ArNav")
public class ArNavPlugin extends Plugin {

    @PluginMethod
    public void isAvailable(PluginCall call) {
        JSObject ret = new JSObject();
        boolean ok = false;
        try {
            ArCoreApk.Availability a = ArCoreApk.getInstance().checkAvailability(getContext());
            ok = a.isSupported() || a.isTransient();
        } catch (Throwable t) {
            ok = false;
        }
        ret.put("available", ok);
        call.resolve(ret);
    }

    /** points: [[lat, lon], ...] from the walker to the destination; name: destination label. */
    @PluginMethod
    public void start(PluginCall call) {
        JSArray pts = call.getArray("points");
        if (pts == null || pts.length() < 2) {
            call.reject("points required");
            return;
        }
        try {
            double[] flat = new double[pts.length() * 2];
            for (int i = 0; i < pts.length(); i++) {
                org.json.JSONArray p = pts.getJSONArray(i);
                flat[i * 2] = p.getDouble(0);
                flat[i * 2 + 1] = p.getDouble(1);
            }
            Intent it = new Intent(getContext(), ArNavActivity.class);
            it.putExtra("points", flat);
            it.putExtra("name", call.getString("name", ""));
            it.putExtra("hint", call.getString("hint", ""));
            getActivity().startActivity(it);
            call.resolve();
        } catch (Exception e) {
            call.reject(e.getMessage());
        }
    }

    // ---- voice: the Android WebView has no speech synthesis, so the guide speaks through the system TTS ----
    private TextToSpeech tts;
    private boolean ttsReady, ttsFailed;
    private Runnable ttsPending;
    private PluginCall speakCall;
    private String lastId = "";
    private int seq = 0;

    private synchronized void finishSpeak(String id, boolean interrupted) {
        if (speakCall == null || (id != null && !id.equals(lastId))) return;
        JSObject ret = new JSObject();
        ret.put("interrupted", interrupted);
        speakCall.resolve(ret);
        speakCall = null;
    }

    /** parts: sentences spoken in order; lang: BCP-47 tag. Resolves when the last one ends ({interrupted:true} if cut short). */
    @PluginMethod
    public synchronized void speak(PluginCall call) {
        JSArray parts = call.getArray("parts");
        final String lang = call.getString("lang", "en-US");
        final List<String> list = new ArrayList<>();
        try {
            if (parts != null) for (int i = 0; i < parts.length(); i++) list.add(parts.getString(i));
        } catch (Exception e) {
            call.reject("bad parts");
            return;
        }
        if (list.isEmpty()) { call.resolve(); return; }
        finishSpeak(null, true);
        if (ttsFailed) { call.reject("no voice on this device"); return; }
        speakCall = call;
        final String base = "u" + (++seq);
        lastId = base + "_last";
        Runnable go = () -> {
            try {
                tts.setLanguage(Locale.forLanguageTag(lang));
                for (int i = 0; i < list.size(); i++) {
                    boolean last = i == list.size() - 1;
                    tts.speak(list.get(i), i == 0 ? TextToSpeech.QUEUE_FLUSH : TextToSpeech.QUEUE_ADD, null, last ? base + "_last" : base + "_" + i);
                }
            } catch (Throwable t) {
                finishSpeak(base + "_last", true);
            }
        };
        if (tts == null) {
            ttsPending = go;
            tts = new TextToSpeech(getContext().getApplicationContext(), status -> {
                synchronized (ArNavPlugin.this) {
                    if (status == TextToSpeech.SUCCESS) {
                        ttsReady = true;
                        tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                            @Override public void onStart(String id) { }
                            @Override public void onDone(String id) { finishSpeak(id, false); }
                            @Override public void onError(String id) { finishSpeak(id, true); }
                        });
                        Runnable r = ttsPending;
                        ttsPending = null;
                        if (r != null) r.run();
                    } else {
                        ttsFailed = true;
                        ttsPending = null;
                        finishSpeak(null, true);
                    }
                }
            });
        } else if (ttsReady) {
            go.run();
        } else {
            ttsPending = go;
        }
    }

    @PluginMethod
    public synchronized void stopSpeak(PluginCall call) {
        ttsPending = null;
        try { if (tts != null && ttsReady) tts.stop(); } catch (Throwable t) { }
        finishSpeak(null, true);
        call.resolve();
    }

    @Override
    protected void handleOnDestroy() {
        try { if (tts != null) tts.shutdown(); } catch (Throwable t) { }
        tts = null;
        super.handleOnDestroy();
    }
}
