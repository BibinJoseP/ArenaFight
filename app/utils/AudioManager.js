Ext.define("ArenaFight.utils.AudioManager", {
  singleton: true,
  requires: ["Ext.Audio"],

  mediaInstance: null,
  extAudio: null,
  isPlaying: false,
  musicEnabled: true, // Default; can override from localStorage
  currentUrl: "",

  // Resolve media path based on platform
  getPlayableUrl: function (url) {
    if (window.cordova && window.Media) {
      if (Ext.os.is.Android) {
        return "/android_asset/www/" + url;
      } else {
        // iOS or other Cordova platforms
        return url;
      }
    }
    // Browser
    return url;
  },

  play: function (url) {
    this.musicEnabled = localStorage.getItem("musicEnabled") !== "0";

    if (!this.musicEnabled) return;

    this.stop(); // Stop any currently playing audio
    this.currentUrl = url;

    const playableUrl = this.getPlayableUrl(url);

    if (window.cordova && window.Media) {
      const self = this;
      this.mediaInstance = new Media(
        playableUrl,
        () => {
          console.log("Media playback ended. Restarting...");
          if (self.musicEnabled) {
            self.mediaInstance.play(); // Manual loop
          }
        },
        (err) => console.log("Media error:", err)
      );

      this.mediaInstance.play();
      this.isPlaying = true;
    } else {
      // Browser fallback
      this.extAudio = Ext.create("Ext.Audio", {
        url: playableUrl,
        loop: true,
        hidden: true,
        volume: 0.5,
        autoPlay: true
      });
      this.isPlaying = true;
    }
  },

  pause: function () {
    if (this.mediaInstance) {
      this.mediaInstance.pause();
    } else if (this.extAudio) {
      this.extAudio.pause();
    }
    this.isPlaying = false;
  },

  resume: function () {
    if (!this.musicEnabled) return;

    if (this.mediaInstance) {
      this.mediaInstance.play();
    } else if (this.extAudio) {
      this.extAudio.play();
    }
    this.isPlaying = true;
  },

  stop: function () {
    if (this.mediaInstance) {
      this.mediaInstance.stop();
      this.mediaInstance.release();
      this.mediaInstance = null;
    }
    if (this.extAudio) {
      this.extAudio.destroy();
      this.extAudio = null;
    }
    this.isPlaying = false;
  },

  toggle: function (enabled) {
    this.musicEnabled = enabled;
    localStorage.setItem("musicEnabled", enabled ? "1" : "0");

    if (enabled && this.currentUrl) {
      this.play(this.currentUrl);
    } else {
      this.stop();
    }
  },
playFromFile: function (localPath) {
  // Check if Cordova Media plugin is available
  if (window.Media && window.isDeviceReady) {
    const media = new Media(
      localPath,
      () => console.log("✅ Playback finished (Media plugin)"),
      (err) => console.error("❌ Media plugin error:", err)
    );
    media.play();
    this.mediaInstance = media;
    this.isPlaying = true;
  } else {
    //  Fallback for browser: assume localPath is a public URL
    try {
      if (this.extAudio) {
        this.extAudio.pause();
        this.extAudio = null;
      }

      const audio = new Audio(localPath); // Must be a full URL if running in browser
      audio.loop = true;
      audio.volume = 0.5;
      audio.play().then(() => {
        console.log("✅ Playback started (HTML5 Audio)");
      }).catch(err => {
        console.error("❌ Audio playback failed:", err);
        Ext.Msg.alert("Playback Error", "Could not play audio in browser.");
      });

      this.extAudio = audio;
      this.isPlaying = true;
    } catch (e) {
      console.error("❌ Fallback audio error:", e);
      Ext.Msg.alert("Unsupported", "Media plugin not available, and fallback failed.");
    }
  }
}


});
