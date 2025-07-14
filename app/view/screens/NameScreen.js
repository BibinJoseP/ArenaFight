Ext.define("ArenaFight.view.screens.NameScreen", {
  extend: "Ext.Container",
  xtype: "namescreen",

  requires: [
    "Ext.form.Panel",
    "Ext.field.Text",
    "Ext.Button",
    "Ext.MessageBox",
    "ArenaFight.view.screens.FightScreen",
    "ArenaFight.utils.CordovaUtils"
  ],

  layout: "fit",
  // cls: "name-screen-container",
  listeners: {
    painted: function () {
      // ✅ Set up network listeners only here (not in intro screen)
      ArenaFight.utils.CordovaUtils.initCordovaUtils();
const el = this.element;
      if (el && el.dom) {
        el.dom.style.backgroundImage = "url('resources/images/bg2.jpeg')";
        el.dom.style.backgroundSize = "cover";
        el.dom.style.backgroundPosition = "center center";
        el.dom.style.backgroundRepeat = "no-repeat";
      }
    }
  },
  items: [
    {
      xtype: "formpanel",
      scrollable: false,
      cls: "arena-namescreen-form-panel",
      layout: {
        type: "vbox",
        align: "middle",
        pack: "center",
      },
      items: [
        {
          xtype: "component",
          cls: "name-screen-title",
          html: "Enter Your Name",
        },
        {
          xtype: "textfield",
          name: "fighterName",
          placeholder: "Fighter Name",
          clearable: false,
          required: true,
          cls: "x-namescreen-fighter-name-field",
          listeners: {
            painted: function () {
              Ext.defer(() => this.focus(), 100, this);
            },
            keyup: function (field) {
              const btn = field
                .up("formpanel")
                .down("button[name=startBattleBtn]");
              btn.setHidden(!field.getValue().trim());
            },
          },
        },
        {
          xtype: "button",
          text: "START BATTLE",
          name: "startBattleBtn",
          // hidden: true,
          margin: "25 0 0 0",
          cls: "name-screen-button",
          handler: function (btn) {
            const form = btn.up("formpanel");
            const values = form.getValues();

            if (values.fighterName && values.fighterName.trim().length > 0) {
              // 🔽 Clean and sanitize the name before saving
              let name = values.fighterName.trim();
              name = name.replace(/[^a-zA-Z0-9 ]/g, ""); // Only allow letters, numbers, space

              localStorage.setItem("fighterName", name);

              Ext.Viewport.setActiveItem({
                xtype: "fightscreen",
                animation: {
                  type: "slide",
                  direction: "left",
                  duration: 300,
                },
              });
            } else {
              if (window.isDeviceReady) {
                ArenaFight.utils.CordovaUtils.showAlert("Please enter a name to proceed.", "ops..!");
              } else {
                Ext.Msg.alert("Oops!", "Please enter a name to proceed.");
              }
            }
          },
        },
        {
    xtype: "button",
    text: "Get Music & Play",
    ui: "confirm",
    margin: "25 0 0 0",
    handler: function () {
      const mp3Url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
      const filename = "theme.mp3";

      // if (!window.isDeviceReady) {
      //   Ext.Msg.alert("Device Not Ready", "This feature works on real device only.");
      //   return;
      // }

      ArenaFight.utils.FileManager.downloadAndSaveFile(
        mp3Url,
        filename,
        function (localPath) {
          // On successful download, play the file
          ArenaFight.utils.AudioManager.playFromFile(localPath);
        },
        function (err) {
          Ext.Msg.alert("Error", "Download failed. Check console for more.");
          console.error(err);
        }
      );
    },
  },{
  xtype: "button",
  text: "Sign in with Google",
  ui: "action",
  margin: "25 0 0 0",
  handler: function () {
    if (window.plugins && window.plugins.googleplus) {
      window.plugins.googleplus.login(
        {
          scopes: "profile email",
          webClientId: "892305566260-c73115i0vascaimuideck19le91u8g44.apps.googleusercontent.com",
          offline: true
        },
        function (userData) {
          const name = userData.displayName || "Unknown";
          localStorage.setItem("fighterName", name);

          if (typeof firebase !== "undefined" && firebase.analytics) {
            firebase.analytics().logEvent("google_sign_in_success", {
              user_id: userData.userId,
              email: userData.email,
              display_name: userData.displayName,
              timestamp: new Date().toISOString()
            });
          }

          Ext.Viewport.setActiveItem({
            xtype: "fightscreen",
            animation: {
              type: "slide",
              direction: "left",
              duration: 300
            }
          });
        },
        function (error) {
          console.error("Sign-in error:", error);
          Ext.Msg.alert("Google Sign-In Failed", error);

          if (typeof firebase !== "undefined" && firebase.analytics) {
            firebase.analytics().logEvent("google_sign_in_error", {
              error_message: error,
              timestamp: new Date().toISOString()
            });
          }
        }
      );
    } else {
      Ext.Msg.alert("Error", "Google Sign-In plugin not available.");
    }
  }
},

        {
          xtype: "button",
          text: "Visit Game Website",
          ui: "action",
          margin: "105 0 0 0",
          handler: function () {
            const url = "https://dynamicnext.com/"; // ✅ Replace with your actual game/help link
            if (ArenaFight.utils.CordovaUtils.isReady()) {
              cordova.InAppBrowser.open(url, "_blank", "location=yes");
            } else {
              window.open(url, "_blank");
            }
          }
        },

      ],
    },
  ],
});
