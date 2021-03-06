package com.kbankonboarding;

import android.app.Application;

import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.beefe.picker.PickerViewPackage;
import com.rssignaturecapture.RSSignatureCapturePackage;
import org.reactnative.camera.RNCameraPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.jimmydaddy.imagemarker.ImageMarkerPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.codefin3.myapplication.onboarding.OnboardPackage;
import com.facebook.react.ReactApplication;
import com.reactlibrary.securekeystore.RNSecureKeyStorePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.learnium.RNDeviceInfo.RNDeviceInfo;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNSecureKeyStorePackage(),
          new OnboardPackage(),
          new LinearGradientPackage(),
          new RNGestureHandlerPackage(),
          new PickerViewPackage(),
          new RSSignatureCapturePackage(),
          new RNCameraPackage(),
          new ImageMarkerPackage(),
          new ImageResizerPackage(),
          new RNCWebViewPackage(),
          new RNDeviceInfo()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
