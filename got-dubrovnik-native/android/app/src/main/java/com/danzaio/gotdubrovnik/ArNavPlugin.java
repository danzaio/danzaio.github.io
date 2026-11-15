package com.danzaio.gotdubrovnik;

import android.content.Intent;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.ar.core.ArCoreApk;

/** Bridge between the web guide and the native AR walking screen. */
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
}
