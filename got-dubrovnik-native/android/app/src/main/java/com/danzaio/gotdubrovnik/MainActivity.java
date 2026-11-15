package com.danzaio.gotdubrovnik;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(ArNavPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
