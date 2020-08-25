package com.reactnativedemo;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class MtjModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    public MtjModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "Mtj";
    }
}
