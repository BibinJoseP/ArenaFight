Ext.define('ArenaFight.view.main.Main', {
    extend: 'Ext.Container',
    xtype: 'app-main',
    fullscreen: true,

    requires: [
        'ArenaFight.view.screens.IntroScreen',
        'ArenaFight.view.screens.NameScreen',
        'ArenaFight.view.screens.FightScreen'
    ],

    config: {
        layout: 'card',
        activeItem: 0, // Start with HomeScreen
        items: [
            { xtype: 'introscreen' },
            { xtype: 'namescreen' },
            { xtype: 'fightscreen' }
        ]
    }
});
