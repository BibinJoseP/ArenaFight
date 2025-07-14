Ext.define('ArenaFight.view.LoginPanel', {
  extend: 'Ext.panel.Panel',
  xtype: 'loginpanel',
  layout: {
    type: 'vbox',
    align: 'center',
    pack: 'center'
  },
  items: [
    {
      xtype: 'button',
      text: 'Sign in with Google',
      scale: 'medium',
      margin: 10,
      handler: function () {
        if (window.plugins && window.plugins.googleplus) {
          window.plugins.googleplus.login(
            {
              scopes: 'profile email',
              webClientId: '892305566260-c73115i0vascaimuideck19le91u8g44.apps.googleusercontent.com',
              offline: true
            },
            function (userData) {
              console.log('Signed in:', userData);
              Ext.Msg.alert('Success', 'Signed in: ' + userData.displayName + ' (' + userData.email + ')');

              // Log to Firebase Analytics
              if (typeof firebase !== 'undefined' && firebase.analytics) {
                firebase.analytics().logEvent('google_sign_in_success', {
                  user_id: userData.userId,
                  email: userData.email,
                  display_name: userData.displayName,
                  timestamp: new Date().toISOString()
                });
              }
            },
            function (error) {
              console.error('Error:', error);
              Ext.Msg.alert('Error', 'Sign-in failed: ' + error);

              // Log error to Firebase Analytics
              if (typeof firebase !== 'undefined' && firebase.analytics) {
                firebase.analytics().logEvent('google_sign_in_error', {
                  error_message: error,
                  timestamp: new Date().toISOString()
                });
              }
            }
          );
        } else {
          Ext.Msg.alert('Error', 'Google Sign-In plugin not available. Ensure Cordova plugin is installed.');
        }
      }
    }
  ]
});