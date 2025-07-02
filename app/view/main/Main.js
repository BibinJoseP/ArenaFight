Ext.define('ArenaFight.view.main.Main', {
    extend: 'Ext.Container',
    xtype: 'app-main',

    requires: [
        'ArenaFight.view.screens.IntroScreen',
        'ArenaFight.view.screens.NameScreen',
        'ArenaFight.view.screens.FightScreen'
    ],

    config: {
        layout: 'card',
        items: [
            { xtype: 'introscreen' },
            { xtype: 'namescreen' },
            { xtype: 'fightscreen' }
        ]
    }
});
