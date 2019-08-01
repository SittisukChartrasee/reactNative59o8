package com.codefin3.myapplication.onboarding

import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import android.widget.Toast
import com.facebook.react.bridge.Callback

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.util.HashMap



class OnboardManager(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    companion object {
        private const val prefKey = "APP_SHARE_PREFERENCE"
        private const val STATUS_APPROVE_KEY = "STATUS_APPROVE"
        private const val STATUS_NEW_CUSTOMER_KEY = "STATUS_NEW_CUSTOMER"

        const val STATUS_APPROVE = "approve"
        const val STATUS_NEW_CUSTOMER = "new_customer"
        const val KEY_USER_FLAG = "ob_flag"
        const val KEY_ACCESS_TOKEN = "ob_access_token"
        const val KEY_FCM = "ob_FCM"
        const val KEY_VERSION = "ob_version"
    }

    private val sharedPref: SharedPreferences by lazy {
        reactContext.getSharedPreferences(prefKey, Context.MODE_PRIVATE)
    }

    override fun getConstants(): MutableMap<String, Any> {
        val constants = hashMapOf<String, Any>()
        constants[STATUS_APPROVE_KEY] = STATUS_APPROVE
        constants[STATUS_NEW_CUSTOMER_KEY] = STATUS_NEW_CUSTOMER
        return constants
    }

    @ReactMethod
    fun show(message: String, duration: Int) {
        Toast.makeText(reactApplicationContext, message, duration).show()
    }

    @ReactMethod
    fun saveRegisterFlag(flag: String) {
        saveStringToPref(KEY_USER_FLAG, flag)
//        LogHelper.show(flag)
    }

    @ReactMethod
    fun autoLogin(code: String, token: String) {
        val text = "code : "+code+" token : "+token
        Toast.makeText(reactApplicationContext, "call function autoLogin"+text, Toast.LENGTH_SHORT).show();
        // todo
    }

    @ReactMethod
    fun getRegisterFlag(callback: Callback) {
        val stringFromPref = getStringFromPref(KEY_USER_FLAG)
        callback.invoke(stringFromPref ?: "")
    }

    @ReactMethod
    fun saveUserToken(token: String) {
        saveStringToPref(KEY_ACCESS_TOKEN, token)
//        TokenManager.saveStringToken(token)
    }

    @ReactMethod
    fun getUserToken(callback: Callback) {
        val stringFromPref = getStringFromPref(KEY_ACCESS_TOKEN)
        callback.invoke(stringFromPref ?: "")
//        val stringFromPref = TokenManager.getStringToken()
    }

    @ReactMethod
    fun saveVersionAppKMyFunds(version: String) {
        saveStringToPref(KEY_VERSION, version)
    }
    
    @ReactMethod
    fun getVersionAppKMyFunds(callback: Callback) {
        val stringFromPref = getStringFromPref(KEY_VERSION)
        callback.invoke(stringFromPref ?: "")
    }

    @ReactMethod
    fun saveFCMToken(token: String) {
        saveStringToPref(KEY_FCM, token)
    }

    @ReactMethod
    fun getFCMToken(callback: Callback) {
        val stringFromPref = getStringFromPref(KEY_FCM)
        callback.invoke(stringFromPref ?: "")
    }

    @ReactMethod
    fun getDeviceInfo(callback: Callback) {
        callback.invoke("getDeviceInfo")
    }

    @ReactMethod
    fun finishActivity() {
        reactContext.currentActivity?.finish()
    }

    override fun getName(): String {
        return "KMyFundOnboarding"
    }

    private fun getStringFromPref(key: String) = sharedPref.getString(key, "")

    private fun saveStringToPref(key: String, value: String) {
        sharedPref.edit { putString(key, value) }
    }

    private fun getBoolFromPref(key: String) = sharedPref.getBoolean(key, false)

    private fun saveBoolToPref(key: String, value: Boolean) {
        sharedPref.edit { putBoolean(key, value) }
    }

    inline fun SharedPreferences.edit(
        commit: Boolean = false,
        action: SharedPreferences.Editor.() -> Unit
    ) {
        val editor = edit()
        action(editor)
        if (commit) {
            editor.commit()
        } else {
            editor.apply()
        }
    }
}