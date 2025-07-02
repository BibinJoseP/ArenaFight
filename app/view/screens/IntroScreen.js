Ext.define("ArenaFight.view.screens.IntroScreen", {
  extend: "Ext.Container",
  xtype: "introscreen",
  cls: "intro-screen",
  flex: 1,

  requires: ["Ext.carousel.Carousel", "Ext.Audio"],

  layout: "fit",

  items: [
    {
 xtype: "carousel",
    reference: "slideshow",
    cls: "intro-slideshow",
    flex: 1,
    indicator: false,
    userInteractionEnabled: false,
    draggable: false,
    
      items: [
        {
          xtype: "component",
          cls: "slide-1",
          html: "<div class='slide-content'><h1>WELCOME TO ARENA FIGHT</h1></div>",
        },
        {
          xtype: "component",
          cls: "slide-2",
        //   html: "<div class='slide-content'><h1>BATTLE YOUR RIVALS</h1></div>",
        },
        {
          xtype: "component",
          cls: "slide-3",
          html: "<div class='slide-content'><h1>BECOME THE CHAMPION</h1></div>",
        },
      ],
    },
  ],

initialize: function () {
    this.callParent();

    this.backgroundAudio = Ext.create("Ext.Audio", {
        url: "resources/audio/background.mp3",
        loop: true,
        volume: 0.5,
        hidden: true
    });
    this.backgroundAudio.play();

    const carousel = this.down('carousel');

    this.nextSlide = function () {
        const currentIndex = carousel.getActiveIndex();
        const totalSlides = carousel.getItems().length;
        if (currentIndex < totalSlides - 1) {
            carousel.setActiveItem(currentIndex + 1, {
                type: 'slide',
                direction: 'left',
                duration: 500
            });
        }
    };

    carousel.on('activeitemchange', this.scheduleNextSlide, this);
    Ext.defer(this.nextSlide, 2000, this);

    this.autoNavigateTimeout = Ext.defer(() => {
        this.backgroundAudio.destroy();
        Ext.Viewport.setActiveItem({ xtype: "namescreen" });
    }, 6000);
},

scheduleNextSlide: function () {
    Ext.defer(this.nextSlide, 2000, this);
},

destroy: function () {
    this.backgroundAudio && this.backgroundAudio.destroy();
    this.autoNavigateTimeout && clearTimeout(this.autoNavigateTimeout);
    this.callParent();
},


});
