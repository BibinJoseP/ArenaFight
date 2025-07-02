/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'ArenaFight.Application',

    name: 'ArenaFight',
    controllers: ['Main'],

    requires: [
        // This will automatically load all classes in the ArenaFight namespace
        // so that application classes do not need to require each other.
        'ArenaFight.*'
    ],

    // The name of the initial view to create.
    mainView: 'ArenaFight.view.main.Main',
     launch: function() {
        // Carousel override goes here
        Ext.override(Ext.carousel.Carousel, {
            onDragStart: Ext.emptyFn,
            onDrag: Ext.emptyFn,
            onDragEnd: Ext.emptyFn,
            onSwipe: Ext.emptyFn
        });
                // ✅ Setup Cordova deviceready listener
        window.isDeviceReady = false;

        document.addEventListener('deviceready', function () {
            console.log('Cordova is ready.');
            window.isDeviceReady = true;
        }, false);

        // Optional: fallback if Cordova doesn't load after 5 seconds (debug mode)
        setTimeout(() => {
            if (!window.isDeviceReady) {
                console.warn('Cordova deviceready not triggered. Are you testing in browser?');
            }
        }, 5000); 
    }
});
