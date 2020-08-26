package xyz.esunr.react_native_mtj;

import com.baidu.mobstat.StatService;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BaiduMtjModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    public BaiduMtjModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "BaiduMtj";
    }

    @ReactMethod
    public void start() {
        StatService.start(reactContext);
    }

    @ReactMethod
    public void setDebug(Boolean value) {
        StatService.setDebugOn(value);
    }

    @ReactMethod
    public void onEvent(String eventId, String label) {
        StatService.onEvent(reactContext, eventId, label);
    }
}
