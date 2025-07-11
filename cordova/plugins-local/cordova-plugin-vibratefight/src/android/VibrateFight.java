package com.example.vibratefight;

import android.os.Vibrator;
import android.content.Context;
import android.util.Log;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;

public class VibrateFight extends CordovaPlugin {

    public VibrateFight() {
        Log.d("VibrateFight", "Plugin loaded");
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("vibrateNow")) {
            this.vibrateNow(callbackContext);
            return true;
        }
        return false;
    }

    private void vibrateNow(CallbackContext callbackContext) {
        Vibrator v = (Vibrator) cordova.getActivity().getSystemService(Context.VIBRATOR_SERVICE);
        if (v != null) {
            v.vibrate(500); // Vibrate for 500 milliseconds
            callbackContext.success("Vibrated");
        } else {
            callbackContext.error("Vibrator not available");
        }
    }
}
