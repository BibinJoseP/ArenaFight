/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'ArenaFight.Application',

    name: 'ArenaFight',
    controllers: [
        // 'Main'
    ],

    requires: [
        // This will automatically load all classes in the ArenaFight namespace
        // so that application classes do not need to require each other.
        'ArenaFight.*'
    ],

    // The name of the initial view to create.
    mainView: 'ArenaFight.view.main.Main',
    launch: function () {
        // Carousel override goes here
        Ext.override(Ext.carousel.Carousel, {
            onDragStart: Ext.emptyFn,
            onDrag: Ext.emptyFn,
            onDragEnd: Ext.emptyFn,
            onSwipe: Ext.emptyFn
        });
        // ✅ Setup Cordova deviceready listener
        window.isDeviceReady = false;

document.addEventListener('deviceready', function () {
    console.log('Cordova is ready.');
    window.isDeviceReady = true;

    ArenaFight.utils.Platform.init();

    // Firebase Messaging
    if (cordova.plugins && cordova.plugins.firebase && cordova.plugins.firebase.messaging) {
        const messaging = cordova.plugins.firebase.messaging;

        messaging.requestPermission().then(() => {
            console.log("Push permission granted");

            messaging.getToken().then((token) => {
                console.log("FCM Token:", token);
            }).catch((err) => {
                console.error("Error getting token:", err);
            });

            messaging.onTokenRefresh((token) => {
                console.log("Token refreshed:", token);
            });

            messaging.onMessage((notification) => {
                console.log("Foreground push received:", notification);

                if (notification.tap) {
                    console.log("Notification tapped (cold start or background)");
                } else {
                    alert(notification.body || "New Notification");
                }
            });

        }).catch((err) => {
            console.error("Push permission denied", err);
        });
    } else {
        console.warn("Firebase Messaging plugin not available.");
    }

    // Firebase Analytics
    if (cordova.plugins && cordova.plugins.firebase && cordova.plugins.firebase.analytics) {
        const analytics = cordova.plugins.firebase.analytics;

        analytics.logEvent("test_event", { method: "manual_test" })
            .then(() => console.log("Analytics event sent"))
            .catch((err) => console.error("Analytics error:", err));
    } else {
        console.warn("Firebase Analytics plugin not available.");
    }

    // Custom Plugin: Echo Notification Test
    if (cordova.plugins && cordova.plugins.Echo && cordova.plugins.Echo.showNotification) {
        cordova.plugins.Echo.showNotification(
            "My Custom Notification",
            "This is a message from the Echo plugin! Time: " + new Date().toLocaleTimeString(),
            function(msg) {
                console.log("✅ Notification function success: " + msg);
            },
            function(err) {
                console.error("❌ Notification function failed: " + err);
            }
        );
    } else {
        console.warn("Echo plugin's showNotification method not available.");
    }
    // Custom Plugin: Echo Test
// if (cordova.plugins && cordova.plugins.Echo) {
//     cordova.plugins.Echo.echo("Hello from Echo Plugin!",
//         function(msg) {
//             console.log("✅ Echo successful: " + msg);
//         },
//         function(err) {
//             console.error("❌ Echo failed: " + err);
//         }
//     );
// } else {
//     console.warn("Echo plugin not available.");
// }

    // // Firebase Crashlytics
    // if (cordova.plugins && cordova.plugins.firebase && cordova.plugins.firebase.crashlytics) {
    //     const crashlytics = cordova.plugins.firebase.crashlytics;

    //     crashlytics.logMessage("This is a test Crashlytics log.")
    //         .then(() => console.log("Crashlytics log sent"))
    //         .catch((err) => console.error("Crashlytics log error:", err));

    //     // To test crash (commented)
    //     // crashlytics.sendCrash();
    // } else {
    //     console.warn("Firebase Crashlytics plugin not available.");
    // }
 
}, false);




        // Optional: fallback if Cordova doesn't load after 5 seconds (debug mode)
        setTimeout(() => {
            if (!window.isDeviceReady) {
                console.warn('Cordova deviceready not triggered. Are you testing in browser?');
            }
        }, 5000);
    }
});
