package com.danzaio.gotdubrovnik;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.Typeface;
import android.opengl.GLES11Ext;
import android.opengl.GLES30;
import android.opengl.GLSurfaceView;
import android.opengl.Matrix;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.TextView;

import com.google.ar.core.Anchor;
import com.google.ar.core.ArCoreApk;
import com.google.ar.core.Camera;
import com.google.ar.core.Config;
import com.google.ar.core.Coordinates2d;
import com.google.ar.core.Earth;
import com.google.ar.core.Frame;
import com.google.ar.core.GeospatialPose;
import com.google.ar.core.Session;
import com.google.ar.core.StreetscapeGeometry;
import com.google.ar.core.TrackingState;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.nio.IntBuffer;
import java.util.ArrayList;
import java.util.List;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

/**
 * Native AR walking screen: camera image with the route drawn on the ground (chevrons anchored
 * to the terrain with the ARCore Geospatial API) and nearby buildings tinted from Streetscape
 * Geometry. Positions come from Google's visual positioning, not from the compass.
 */
public class ArNavActivity extends Activity implements GLSurfaceView.Renderer {
    private static final int REQ = 71;
    private static final double STEP_M = 5.0;
    private static final int MAX_MARKS = 48;

    private GLSurfaceView gl;
    private TextView status;
    private Session session;
    private boolean installRequested;
    private double[] route;
    private String name = "";

    private final List<double[]> marks = new ArrayList<>();   // lat, lon, bearingDeg, isLast
    private final List<Anchor> anchors = new ArrayList<>();
    private final List<Boolean> anchorLast = new ArrayList<>();
    private boolean anchorsRequested;
    private int viewW, viewH;
    private boolean geometryChanged = true;

    private int camTex, bgProg, bgPos, bgUv, flatProg, flatPos, flatMvp, flatColor;
    private FloatBuffer quadNdc, quadUv, chevron, pillar;
    private final float[] view = new float[16], proj = new float[16], model = new float[16], mvp = new float[16], tmp = new float[16];

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        route = getIntent().getDoubleArrayExtra("points");
        String n = getIntent().getStringExtra("name");
        if (n != null) name = n;
        buildMarks();

        FrameLayout root = new FrameLayout(this);
        gl = new GLSurfaceView(this);
        gl.setPreserveEGLContextOnPause(true);
        gl.setEGLContextClientVersion(3);
        gl.setRenderer(this);
        gl.setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);
        root.addView(gl);

        status = new TextView(this);
        status.setTextColor(Color.WHITE);
        status.setTextSize(TypedValue.COMPLEX_UNIT_SP, 15);
        status.setTypeface(Typeface.DEFAULT_BOLD);
        status.setBackgroundColor(0xCC1F6FD1);
        int p = dp(12);
        status.setPadding(p, p, p, p);
        FrameLayout.LayoutParams lp = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.WRAP_CONTENT, Gravity.TOP);
        lp.setMargins(dp(12), dp(40), dp(64), 0);
        root.addView(status, lp);

        TextView close = new TextView(this);
        close.setText("✕");
        close.setTextColor(Color.WHITE);
        close.setTextSize(TypedValue.COMPLEX_UNIT_SP, 20);
        close.setGravity(Gravity.CENTER);
        close.setBackgroundColor(0xCC000000);
        FrameLayout.LayoutParams cl = new FrameLayout.LayoutParams(dp(44), dp(44), Gravity.TOP | Gravity.END);
        cl.setMargins(0, dp(40), dp(12), 0);
        close.setOnClickListener(new View.OnClickListener() { @Override public void onClick(View v) { finish(); } });
        root.addView(close, cl);
        setContentView(root);
        say(name.isEmpty() ? "AR" : name);
    }

    private int dp(int v) { return Math.round(v * getResources().getDisplayMetrics().density); }

    private void say(final String s) {
        runOnUiThread(new Runnable() { @Override public void run() { status.setText(s); } });
    }

    /** Interpolates the route into ground marks every few metres, each with the walking bearing. */
    private void buildMarks() {
        if (route == null) return;
        int n = route.length / 2;
        double carry = 0;
        for (int i = 0; i < n - 1 && marks.size() < MAX_MARKS; i++) {
            double la1 = route[i * 2], lo1 = route[i * 2 + 1], la2 = route[i * 2 + 2], lo2 = route[i * 2 + 3];
            double dy = (la2 - la1) * 111320.0, dx = (lo2 - lo1) * 111320.0 * Math.cos(Math.toRadians(la1));
            double len = Math.sqrt(dx * dx + dy * dy);
            if (len < 0.5) continue;
            double brg = Math.toDegrees(Math.atan2(dx, dy));
            for (double d = carry; d < len && marks.size() < MAX_MARKS; d += STEP_M) {
                double t = d / len;
                marks.add(new double[]{la1 + (la2 - la1) * t, lo1 + (lo2 - lo1) * t, brg, 0});
            }
            carry = (carry + Math.ceil((len - carry) / STEP_M) * STEP_M) - len;
            if (carry < 0) carry = 0;
        }
        if (n >= 1) marks.add(new double[]{route[(n - 1) * 2], route[(n - 1) * 2 + 1], 0, 1});
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED
                || checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.CAMERA, Manifest.permission.ACCESS_FINE_LOCATION}, REQ);
            return;
        }
        try {
            if (session == null) {
                ArCoreApk.InstallStatus st = ArCoreApk.getInstance().requestInstall(this, !installRequested);
                if (st == ArCoreApk.InstallStatus.INSTALL_REQUESTED) { installRequested = true; return; }
                session = new Session(this);
                Config c = session.getConfig();
                c.setGeospatialMode(Config.GeospatialMode.ENABLED);
                c.setStreetscapeGeometryMode(Config.StreetscapeGeometryMode.ENABLED);
                c.setUpdateMode(Config.UpdateMode.LATEST_CAMERA_IMAGE);
                session.configure(c);
                geometryChanged = true;
            }
            session.resume();
            gl.onResume();
        } catch (Throwable t) {
            say("AR: " + t.getClass().getSimpleName() + (t.getMessage() != null ? " — " + t.getMessage() : ""));
            session = null;
        }
    }

    @Override
    public void onRequestPermissionsResult(int code, String[] perms, int[] res) {
        super.onRequestPermissionsResult(code, perms, res);
        for (int r : res) if (r != PackageManager.PERMISSION_GRANTED) { finish(); return; }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (session != null) { gl.onPause(); session.pause(); }
    }

    @Override
    protected void onDestroy() {
        if (session != null) { try { session.close(); } catch (Throwable ignored) { } session = null; }
        super.onDestroy();
    }

    // ---------- rendering ----------
    private static FloatBuffer fb(float[] a) {
        FloatBuffer f = ByteBuffer.allocateDirect(a.length * 4).order(ByteOrder.nativeOrder()).asFloatBuffer();
        f.put(a).position(0);
        return f;
    }

    private static int shader(int type, String src) {
        int s = GLES30.glCreateShader(type);
        GLES30.glShaderSource(s, src);
        GLES30.glCompileShader(s);
        return s;
    }

    private static int program(String vs, String fs) {
        int p = GLES30.glCreateProgram();
        GLES30.glAttachShader(p, shader(GLES30.GL_VERTEX_SHADER, vs));
        GLES30.glAttachShader(p, shader(GLES30.GL_FRAGMENT_SHADER, fs));
        GLES30.glLinkProgram(p);
        return p;
    }

    @Override
    public void onSurfaceCreated(GL10 unused, EGLConfig config) {
        int[] t = new int[1];
        GLES30.glGenTextures(1, t, 0);
        camTex = t[0];
        GLES30.glBindTexture(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, camTex);
        GLES30.glTexParameteri(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, GLES30.GL_TEXTURE_MIN_FILTER, GLES30.GL_LINEAR);
        GLES30.glTexParameteri(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, GLES30.GL_TEXTURE_MAG_FILTER, GLES30.GL_LINEAR);
        GLES30.glTexParameteri(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, GLES30.GL_TEXTURE_WRAP_S, GLES30.GL_CLAMP_TO_EDGE);
        GLES30.glTexParameteri(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, GLES30.GL_TEXTURE_WRAP_T, GLES30.GL_CLAMP_TO_EDGE);

        bgProg = program(
                "attribute vec2 aPos; attribute vec2 aUv; varying vec2 vUv; void main(){ gl_Position=vec4(aPos,0.0,1.0); vUv=aUv; }",
                "#extension GL_OES_EGL_image_external : require\nprecision mediump float; varying vec2 vUv; uniform samplerExternalOES uTex; void main(){ gl_FragColor=texture2D(uTex,vUv); }");
        bgPos = GLES30.glGetAttribLocation(bgProg, "aPos");
        bgUv = GLES30.glGetAttribLocation(bgProg, "aUv");
        flatProg = program(
                "uniform mat4 uMvp; attribute vec3 aPos; void main(){ gl_Position=uMvp*vec4(aPos,1.0); }",
                "precision mediump float; uniform vec4 uColor; void main(){ gl_FragColor=uColor; }");
        flatPos = GLES30.glGetAttribLocation(flatProg, "aPos");
        flatMvp = GLES30.glGetUniformLocation(flatProg, "uMvp");
        flatColor = GLES30.glGetUniformLocation(flatProg, "uColor");

        quadNdc = fb(new float[]{-1, -1, 1, -1, -1, 1, 1, 1});
        quadUv = fb(new float[8]);
        // chevron lying on the ground, pointing to -Z (north in the geospatial frame), about 1.1 m wide
        float y = 0.04f;
        chevron = fb(new float[]{
                0f, y, -0.55f, -0.55f, y, 0.15f, -0.25f, y, 0.15f,
                0f, y, -0.55f, -0.25f, y, 0.15f, 0f, y, -0.15f,
                0f, y, -0.55f, 0f, y, -0.15f, 0.25f, y, 0.15f,
                0f, y, -0.55f, 0.25f, y, 0.15f, 0.55f, y, 0.15f});
        // destination pillar: two crossed vertical quads, 3 m tall
        float w = 0.25f, h = 3f;
        pillar = fb(new float[]{
                -w, 0, 0, w, 0, 0, w, h, 0, -w, 0, 0, w, h, 0, -w, h, 0,
                0, 0, -w, 0, 0, w, 0, h, w, 0, 0, -w, 0, h, w, 0, h, -w});
        if (session != null) session.setCameraTextureName(camTex);
    }

    @Override
    public void onSurfaceChanged(GL10 unused, int w, int h) {
        viewW = w; viewH = h; geometryChanged = true;
        GLES30.glViewport(0, 0, w, h);
    }

    @Override
    public void onDrawFrame(GL10 unused) {
        GLES30.glClearColor(0, 0, 0, 1);
        GLES30.glClear(GLES30.GL_COLOR_BUFFER_BIT | GLES30.GL_DEPTH_BUFFER_BIT);
        Session s = session;
        if (s == null) return;
        try {
            if (geometryChanged) {
                int rot = getWindowManager().getDefaultDisplay().getRotation();
                s.setDisplayGeometry(rot, viewW, viewH);
                geometryChanged = false;
            }
            s.setCameraTextureName(camTex);
            Frame frame = s.update();
            if (frame.hasDisplayGeometryChanged() || quadUv.get(0) == 0f && quadUv.get(3) == 0f) {
                frame.transformCoordinates2d(Coordinates2d.OPENGL_NORMALIZED_DEVICE_COORDINATES, quadNdc, Coordinates2d.TEXTURE_NORMALIZED, quadUv);
                quadNdc.position(0); quadUv.position(0);
            }
            drawBackground();

            Camera cam = frame.getCamera();
            if (cam.getTrackingState() != TrackingState.TRACKING) { say("📷 " + pick("Move the phone slowly to start AR", "Mova o celular devagar para iniciar o AR")); return; }
            cam.getViewMatrix(view, 0);
            cam.getProjectionMatrix(proj, 0, 0.1f, 300f);

            Earth earth = s.getEarth();
            if (earth == null) { say("AR…"); return; }
            if (earth.getEarthState() != Earth.EarthState.ENABLED) { say("AR: " + earth.getEarthState().name()); return; }
            if (earth.getTrackingState() != TrackingState.TRACKING) { say("🌍 " + pick("Point at buildings so the phone can locate itself", "Aponte para os prédios para o celular se localizar")); return; }
            GeospatialPose gp = earth.getCameraGeospatialPose();
            double acc = gp.getHorizontalAccuracy();

            if (!anchorsRequested && acc < 12) {
                anchorsRequested = true;
                for (final double[] m : marks) {
                    float th = (float) Math.toRadians(-m[2]);
                    final boolean last = m[3] > 0;
                    earth.resolveAnchorOnTerrainAsync(m[0], m[1], 0f, 0f, (float) Math.sin(th / 2), 0f, (float) Math.cos(th / 2),
                            (anchor, state) -> {
                                if (state == Anchor.TerrainAnchorState.SUCCESS && anchor != null) {
                                    synchronized (anchors) { anchors.add(anchor); anchorLast.add(last); }
                                }
                            });
                }
            }

            GLES30.glEnable(GLES30.GL_DEPTH_TEST);
            GLES30.glEnable(GLES30.GL_BLEND);
            GLES30.glBlendFunc(GLES30.GL_SRC_ALPHA, GLES30.GL_ONE_MINUS_SRC_ALPHA);
            GLES30.glUseProgram(flatProg);

            // buildings from Streetscape Geometry: translucent tint so the street reads as a corridor
            GLES30.glDepthMask(false);
            for (StreetscapeGeometry g : s.getAllTrackables(StreetscapeGeometry.class)) {
                if (g.getTrackingState() != TrackingState.TRACKING || g.getType() != StreetscapeGeometry.Type.BUILDING) continue;
                g.getMeshPose().toMatrix(model, 0);
                Matrix.multiplyMM(tmp, 0, view, 0, model, 0);
                Matrix.multiplyMM(mvp, 0, proj, 0, tmp, 0);
                GLES30.glUniformMatrix4fv(flatMvp, 1, false, mvp, 0);
                FloatBuffer v = g.getMesh().getVertexList();
                IntBuffer idx = g.getMesh().getIndexList();
                v.position(0); idx.position(0);
                GLES30.glEnableVertexAttribArray(flatPos);
                GLES30.glVertexAttribPointer(flatPos, 3, GLES30.GL_FLOAT, false, 0, v);
                GLES30.glUniform4f(flatColor, 0.84f, 0.68f, 0.27f, 0.16f);
                GLES30.glDrawElements(GLES30.GL_TRIANGLES, idx.remaining(), GLES30.GL_UNSIGNED_INT, idx);
            }
            GLES30.glDepthMask(true);
            GLES30.glClear(GLES30.GL_DEPTH_BUFFER_BIT);

            int drawn = 0;
            synchronized (anchors) {
                for (int i = 0; i < anchors.size(); i++) {
                    Anchor a = anchors.get(i);
                    if (a.getTrackingState() != TrackingState.TRACKING) continue;
                    a.getPose().toMatrix(model, 0);
                    Matrix.multiplyMM(tmp, 0, view, 0, model, 0);
                    Matrix.multiplyMM(mvp, 0, proj, 0, tmp, 0);
                    GLES30.glUniformMatrix4fv(flatMvp, 1, false, mvp, 0);
                    boolean last = anchorLast.get(i);
                    FloatBuffer buf = last ? pillar : chevron;
                    buf.position(0);
                    GLES30.glEnableVertexAttribArray(flatPos);
                    GLES30.glVertexAttribPointer(flatPos, 3, GLES30.GL_FLOAT, false, 0, buf);
                    if (last) GLES30.glUniform4f(flatColor, 0.56f, 0.11f, 0.11f, 0.85f);
                    else GLES30.glUniform4f(flatColor, 0.12f, 0.44f, 0.82f, 0.9f);
                    GLES30.glDrawArrays(GLES30.GL_TRIANGLES, 0, 12);
                    drawn++;
                }
            }
            GLES30.glDisable(GLES30.GL_BLEND);
            GLES30.glDisable(GLES30.GL_DEPTH_TEST);

            double rest = marks.isEmpty() ? 0 : distM(gp.getLatitude(), gp.getLongitude(), marks.get(marks.size() - 1)[0], marks.get(marks.size() - 1)[1]);
            String line = (name.isEmpty() ? "" : name + " · ") + Math.round(rest) + " m · ±" + Math.round(acc) + " m";
            if (!anchorsRequested) line += "\n" + pick("Improving position… keep pointing at buildings", "Melhorando a posição… continue apontando para os prédios");
            else if (drawn == 0) line += "\n" + pick("Placing the path on the ground…", "Colocando o caminho no chão…");
            say(line);
        } catch (Throwable t) {
            say("AR: " + t.getClass().getSimpleName());
        }
    }

    private String pick(String en, String pt) {
        String h = getIntent().getStringExtra("hint");
        return "pt".equals(h) ? pt : en;
    }

    private static double distM(double la1, double lo1, double la2, double lo2) {
        double dy = (la2 - la1) * 111320.0, dx = (lo2 - lo1) * 111320.0 * Math.cos(Math.toRadians(la1));
        return Math.sqrt(dx * dx + dy * dy);
    }

    private void drawBackground() {
        GLES30.glDisable(GLES30.GL_DEPTH_TEST);
        GLES30.glDepthMask(false);
        GLES30.glUseProgram(bgProg);
        GLES30.glActiveTexture(GLES30.GL_TEXTURE0);
        GLES30.glBindTexture(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, camTex);
        quadNdc.position(0); quadUv.position(0);
        GLES30.glEnableVertexAttribArray(bgPos);
        GLES30.glVertexAttribPointer(bgPos, 2, GLES30.GL_FLOAT, false, 0, quadNdc);
        GLES30.glEnableVertexAttribArray(bgUv);
        GLES30.glVertexAttribPointer(bgUv, 2, GLES30.GL_FLOAT, false, 0, quadUv);
        GLES30.glDrawArrays(GLES30.GL_TRIANGLE_STRIP, 0, 4);
        GLES30.glDepthMask(true);
    }
}
