Ext.define('ArenaFight.view.screens.HomeScreen', {
    extend: 'Ext.Container',
    xtype: 'homescreen',

    config: {
        layout: 'vbox',
        style: 'background:#111; color:white;',
        items: [
            {
                xtype: 'container',
                html: '<h2 style="text-align:center;margin-top:40%;">Welcome to ArenaFight</h2>',
                flex: 1
            },
            {
                xtype: 'button',
                text: 'Start Game',
                ui: 'action',
                margin: 20,
                handler: function () {
                    // Move to NameScreen (index 1)
                    Ext.ComponentQuery.query('app-main')[0].setActiveItem(1);
                }
            }
        ]
    }
});
