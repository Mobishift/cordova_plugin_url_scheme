package com.mobishift.plugins.urlscheme;

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

    public static String urlPath;
    public static String urlQuery;

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals(ACTION_GET_URL)) {
            String message = args.getString(0);
            this.coolMethod(message, callbackContext);
            return true;
        }
        return false;
    }

    public getURL(Context context){

    }
}
