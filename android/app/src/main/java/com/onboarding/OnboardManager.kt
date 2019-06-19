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
        const val KEY_USER_FLAG = "ob_flag"
        private const val STATUS_APPROVE_KEY = "STATUS_APPROVE"
        private const val STATUS_NEW_CUSTOMER_KEY = "STATUS_NEW_CUSTOMER"
        const val STATUS_APPROVE = "approve"
        const val STATUS_NEW_CUSTOMER = "new_customer"
    }

    private val sharedPref: SharedPreferences by lazy {
        reactContext.getSharedPreferences(prefKey, Context.MODE_PRIVATE)
    }

    @ReactMethod
    fun show(message: String, duration: Int) {
        Toast.makeText(reactApplicationContext, message, duration).show()
    }

    override fun getConstants(): MutableMap<String, Any> {
        val constants = hashMapOf<String, Any>()
        constants[STATUS_APPROVE_KEY] = STATUS_APPROVE
        constants[STATUS_NEW_CUSTOMER_KEY] = STATUS_NEW_CUSTOMER
        return constants
    }

    @ReactMethod
    fun saveRegisterFlag(flag: String) {
        saveStringToPref(KEY_USER_FLAG, flag)
//        LogHelper.show(flag)
    }

    @ReactMethod
    fun getRegisterFlag(callback: Callback) {
        val stringFromPref = getStringFromPref(KEY_USER_FLAG)
        callback.invoke(stringFromPref ?: "")
    }

    @ReactMethod
    fun saveUserToken(token: String) {
        saveStringToPref("tokenKey", token)
//        TokenManager.saveStringToken(token)
    }

    @ReactMethod
    fun getUserToken(callback: Callback) {
        val stringFromPref = getStringFromPref("tokenKey")
//        val stringFromPref = TokenManager.getStringToken()
        callback.invoke(stringFromPref ?: "")
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