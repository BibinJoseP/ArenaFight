/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'ArenaFight.Application',

    name: 'ArenaFight',

    requires: [
        // This will automatically load all classes in the ArenaFight namespace
        // so that application classes do not need to require each other.
        'ArenaFight.*'
    ],

    // The name of the initial view to create.
    mainView: 'ArenaFight.view.main.Main'
});
