var exec = require('cordova/exec');

module.exports = {
    vibrateNow: function(success, error) {
        exec(success, error, 'VibrateFight', 'vibrateNow', []);
    }
};
