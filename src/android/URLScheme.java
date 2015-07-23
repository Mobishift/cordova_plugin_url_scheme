package com.mobishift.plugins.urlscheme;

import android.util.Log;
import android.widget.Toast;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class URLScheme extends CordovaPlugin {
    private static final String ACTION_GET_URL = "getURL";
    private static final String TAG = "URLScheme";

    public static String urlPath;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals(ACTION_GET_URL)) {
            getURL(callbackContext);
            return true;
        }
        return false;
    }

    public void getURL(CallbackContext context){
        JSONObject jsonObject = null;
        if(urlPath != null){
            jsonObject = new JSONObject();
            try{
                jsonObject.put("urlPath", urlPath);
            }catch (JSONException ex){
                Log.e(TAG, ex.getMessage());
            }
            urlPath = null;
        }
        context.success(jsonObject);
    }
}
