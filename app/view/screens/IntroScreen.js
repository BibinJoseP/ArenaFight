Ext.define("ArenaFight.view.screens.IntroScreen", {
  extend: "Ext.Container",
  xtype: "introscreen",
  cls: "intro-screen",
  flex: 1,

  requires: ["Ext.carousel.Carousel", "Ext.Audio", "ArenaFight.utils.AudioManager"],

  layout: "fit",

  items: [
    {
      xtype: "carousel",
      reference: "slideshow",
      cls: "intro-slideshow",
      indicator: false,
      userInteractionEnabled: false,
      draggable: false,

      items: [
        {
          xtype: "component",
          cls: "slide-1",
          style: {
            backgroundImage: "url('./resources/images/slide1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          },
          html: "<div class='slide-content'><h1>WELCOME TO ARENA FIGHT</h1></div>",
        },
        {
          xtype: "component",
          cls: "slide-2",
          style: {
            backgroundImage: "url('./resources/images/slide2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          },
        },
        {
          xtype: "component",
          cls: "slide-3",
          style: {
            backgroundImage: "url('./resources/images/slide3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          },
          html: "<div class='slide-content'><h1>BECOME THE CHAMPION</h1></div>",
        },
      ],
    },
  ],

  initialize: function () {
    this.callParent();

    // Play music using global AudioManager
    ArenaFight.utils.AudioManager.play("resources/audio/background.mp3");

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
      Ext.Viewport.setActiveItem({ xtype: "namescreen" });
    }, 6000);
  },

  scheduleNextSlide: function () {
    Ext.defer(this.nextSlide, 2000, this);
  },

  destroy: function () {
    this.autoNavigateTimeout && clearTimeout(this.autoNavigateTimeout);
    this.callParent();
  },


});
