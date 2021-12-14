package com.xcpwawebview;

import com.facebook.react.ReactActivity;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "xcpwawebview";
  }

  /* @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    WebView webview = new WebView(this);
    webview.loadUrl("https://xcpwaretail-development.mobify-storefront.com/");
    webview.setWebViewClient(new WebViewClient());
    WebSettings settings = webview.getSettings();
    settings.setJavaScriptEnabled(true);
    settings.setDomStorageEnabled(true);
    settings.setDatabaseEnabled(true);
    //setContentView(webview);
  } */

}
