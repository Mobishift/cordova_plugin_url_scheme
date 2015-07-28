package com.mobishift.plugins.urlscheme;

import android.util.Log;
import android.widget.Toast;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class URLScheme extends CordovaPlugin {
    private static final String ACTION_GET_URL = "getURL";
    private static final String TAG = "URLScheme";

    private static String urlPath;
    private static CallbackContext urlCallbackContext;

    public static void setUrl(String url){
        urlPath = url;
        getURL();
    }

    public static void getURL() {
        if (urlCallbackContext != null && urlPath != null) {
            JSONObject jsonObject = new JSONObject();
            try {
                jsonObject.put("urlPath", urlPath);
            } catch (JSONException ex) {
                Log.e(TAG, ex.getMessage());
            }
            urlPath = null;
            PluginResult result = new PluginResult(PluginResult.Status.OK, jsonObject);
            result.setKeepCallback(true);
            urlCallbackContext.sendPluginResult(result);
        }
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals(ACTION_GET_URL)) {
            urlCallbackContext = callbackContext;
            getURL();
            return true;
        }
        return false;
    }


}
