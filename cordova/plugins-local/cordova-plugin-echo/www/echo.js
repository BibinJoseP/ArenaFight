var exec = require('cordova/exec');

module.exports = {
    echo: function(arg0, successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'Echo', 'echo', [arg0]);
    },

    // NEW FUNCTIONALITY HERE
    showNotification: function(title, message, successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'Echo', 'showNotification', [title, message]);
    }
};