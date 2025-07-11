package com.example.echo;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;
import androidx.core.app.NotificationCompat;

public class Echo extends CordovaPlugin {

    // Define a unique ID for our notification channel (for Android O and above)
    private static final String CHANNEL_ID = "echo_plugin_channel";
    private static final String CHANNEL_NAME = "Echo Plugin Notifications";
    private static final String CHANNEL_DESCRIPTION = "Notifications from the Echo Cordova plugin";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("echo")) {
            String message = args.getString(0);
            this.echo(message, callbackContext);
            return true;
        } else if (action.equals("showNotification")) { // NEW ACTION
            String title = args.getString(0);
            String message = args.getString(1);
            this.showNotification(title, message, callbackContext);
            return true;
        }
        return false;
    }

    private void echo(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            callbackContext.success(message);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    // NEW NOTIFICATION FUNCTIONALITY HERE
    private void showNotification(String title, String message, CallbackContext callbackContext) {
        Context context = cordova.getActivity().getApplicationContext();
        NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        if (notificationManager == null) {
            callbackContext.error("Notification service not available.");
            return;
        }

        // Create a Notification Channel for Android O (API 26) and above
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                CHANNEL_NAME,
                NotificationManager.IMPORTANCE_DEFAULT // or IMPORTANCE_HIGH, etc.
            );
            channel.setDescription(CHANNEL_DESCRIPTION);
            notificationManager.createNotificationChannel(channel);
        }

        // Build the notification
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, CHANNEL_ID)
                .setSmallIcon(android.R.drawable.ic_dialog_info) // You might want to use your app's icon here
                .setContentTitle(title)
                .setContentText(message)
                .setPriority(NotificationCompat.PRIORITY_DEFAULT) // For pre-Android O
                .setAutoCancel(true); // Dismisses the notification when tapped

        // Show the notification
        // Note: The notification ID (1 in this case) must be unique for each notification
        notificationManager.notify(1, builder.build());

        callbackContext.success("Notification shown: " + title + " - " + message);
    }
}