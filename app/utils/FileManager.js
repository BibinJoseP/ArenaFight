Ext.define("ArenaFight.utils.FileManager", {
  singleton: true,

  /**
   * Downloads a file and saves it locally using cordova-plugin-file-transfer
   * @param {String} url - Remote file URL
   * @param {String} filename - Local filename to save as
   * @param {Function} onSuccess - Callback with local path
   * @param {Function} onError - Error callback
   */
  downloadAndSaveFile: function (url, filename, onSuccess, onError) {
    if (!window.isDeviceReady || typeof FileTransfer === "undefined" || !cordova.file) {
      Ext.Msg.alert("Wait", "Cordova not ready or required plugin missing");
      if (onError) onError({ message: "Cordova/FileTransfer not ready" });
      return;
    }

    const fileTransfer = new FileTransfer();
    const uri = encodeURI(url);
    const targetPath = cordova.file.dataDirectory + filename;

    fileTransfer.download(
      uri,
      targetPath,
      function (entry) {
        console.log("✅ Download complete:", entry.toURL());
            // Convert to native file path
    entry.file(function (file) {
      const nativePath = entry.nativeURL;
      console.log("🎧 Native path for Media:", nativePath);
      if (typeof onSuccess === "function") onSuccess(nativePath); // ✅ Use nativeURL here
    });
      },
      function (error) {
        console.error("❌ FileTransfer error", error);
        Ext.Msg.alert("Download Failed", error.exception || "Could not download file");
        if (typeof onError === "function") onError(error);
      },
      false,
      {
        headers: {} // Add custom headers here if needed
      }
    );
  },

  /**
   * Plays audio from a local file path using cordova-plugin-media
   */
  playFromFile: function (localPath) {
    if (!window.Media) {
      Ext.Msg.alert("Unsupported", "Media plugin not available");
      return;
    }

    // Clean up previous instance
    if (this.mediaInstance) {
      this.mediaInstance.stop();
      this.mediaInstance.release();
    }

    this.mediaInstance = new Media(
      localPath,
      () => console.log("▶️ Playback finished"),
      (err) => {
        console.error("🎵 Media error:", err);
        Ext.Msg.alert("Playback Error", err.message || "Audio playback failed");
      }
    );

    this.mediaInstance.play();
    this.isPlaying = true;
  },

  /**
   * Cleans up the media player instance
   */
  destroyMedia: function () {
    if (this.mediaInstance) {
      this.mediaInstance.stop();
      this.mediaInstance.release();
      this.mediaInstance = null;
      this.isPlaying = false;
    }
  }
});
