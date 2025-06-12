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

    // Create and play background audio
    this.backgroundAudio = Ext.create("Ext.Audio", {
        url: "../../../resources/audio/background.mp3",
        loop: true,
        volume: 0.5,
        hidden: true
    });

    this.backgroundAudio.play();

    // Auto slide through carousel
    this.nextSlide = function () {
        var carousel = this.down('carousel');
        if (carousel) {
            var currentIndex = carousel.getActiveIndex();
            var totalSlides = carousel.getItems().length;

            if (currentIndex < totalSlides - 1) {
                carousel.setActiveItem(currentIndex + 1, {
                    type: 'slide',
                    direction: 'left',
                    duration: 500
                });
            }
        }
    };

    // Start auto slide every 2 seconds after each transition
    this.down('carousel').on('activeitemchange', function () {
        Ext.defer(this.nextSlide, 2000, this);
    }, this);

    // Kick off first slide after 2s
    Ext.defer(this.nextSlide, 2000, this);

    // Automatically navigate to namescreen after 6 seconds
    this.autoNavigateTimeout = Ext.defer(function () {
        // Clean up before navigation
        this.backgroundAudio.destroy();
        this.autoNavigateTimeout = null;

        Ext.Viewport.setActiveItem({ xtype: "namescreen" });
    }, 6000, this);
},

});
