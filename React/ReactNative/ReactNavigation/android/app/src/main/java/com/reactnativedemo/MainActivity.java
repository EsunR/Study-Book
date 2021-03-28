package com.reactnativedemo;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.pgyersdk.crash.PgyCrashManager;
import com.pgyersdk.update.PgyUpdateManager;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ReactNativeDemo";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // PgyCrashManager.register();
    // new PgyUpdateManager.Builder()
    //         .setForced(true)                //设置是否强制提示更新
    //         // v3.0.4+ 以上同时可以在官网设置强制更新最高低版本；网站设置和代码设置一种情况成立则提示强制更新
    //         .setUserCanRetry(false)         //失败后是否提示重新下载
    //         .setDeleteHistroyApk(false)     // 检查更新前是否删除本地历史 Apk， 默认为true
    //         .register();

  }
}
