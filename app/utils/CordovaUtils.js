Ext.define("ArenaFight.utils.CordovaUtils", {
  singleton: true,

  // Flag to prevent duplicate listener setup
  networkListenerInitialized: false,

  // Check if Cordova is ready
  isReady: function () {
    return !!(window.isDeviceReady && window.cordova);
  },

  // Exit the app (works only on device)
  exitApp: function () {
    if (this.isReady() && navigator.app && typeof navigator.app.exitApp === "function") {
      navigator.app.exitApp();
    } else {
      Ext.Msg.alert("Error", "Cordova not ready or not supported in the browser.");
    }
  },

  // Show an alert using Cordova or fallback to Ext.Msg
  showAlert: function (message, title = "Alert", buttonLabel = "OK") {
    if (this.isReady() && navigator.notification?.alert) {
      navigator.notification.alert(message, null, title, buttonLabel);
    } else {
      Ext.Msg.alert(title, message);
    }
  },

  // Show a confirm dialog
  confirm: function (message, callbackFn, title = "Confirm", buttonLabels = ["Yes", "No"]) {
    if (this.isReady() && navigator.notification?.confirm) {
      navigator.notification.confirm(message, callbackFn, title, buttonLabels);
    } else {
      Ext.Msg.confirm(title, message, callbackFn);
    }
  },

  // Trigger vibration
  vibrate: function (duration = 300) {
    if (this.isReady() && navigator.vibrate) {
      navigator.vibrate(duration);
    } else {
      console.log("Vibration not supported.");
    }
  },

  // Check if network is online
  checkNetwork: function () {
    if (this.isReady() && navigator.connection) {
      return navigator.connection.type !== "none";
    }
    return navigator.onLine;
  },

  // Setup listeners for online/offline events
  setupNetworkListeners: function () {
    if (this.networkListenerInitialized) return;

    document.addEventListener("offline", () => {
      this.showAlert("Unable to reach server. Retry after sometime.", "You're Offline");
    });

    document.addEventListener("online", () => {
      this.showAlert("You're back online!", "Network Restored");
    });

    this.networkListenerInitialized = true;
  },
  initCordovaUtils: function () {
    this.setupNetworkListeners();

    // Initial check when screen loads
    if (!this.checkNetwork()) {
      this.showAlert("Unable to reach server. Retry after sometime.", "You're Offline");
    }
  }
});
