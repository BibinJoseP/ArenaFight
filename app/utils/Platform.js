Ext.define('ArenaFight.utils.Platform', {
  singleton: true,

  platform: 'browser',

  init: function () {
    if (window.device && device.platform) {
      this.platform = device.platform.toLowerCase();
    }
  },

  get: function () {
    return this.platform;
  },

  isAndroid: function () {
    return this.get() === 'android';
  },

  isIOS: function () {
    return this.get() === 'ios';
  }
});
