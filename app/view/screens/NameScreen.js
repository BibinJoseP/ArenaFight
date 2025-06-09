Ext.define('ArenaFight.view.screens.NameScreen', {
    extend: 'Ext.Container',
    xtype: 'namescreen',

    config: {
        layout: 'vbox',
        style: 'background:#222; color:white;',
        items: [
            {
                xtype: 'textfield',
                label: 'Enter Fighter Name',
                margin: 20,
                id: 'fighterNameInput'
            },
            {
                xtype: 'button',
                text: 'Continue to Fight',
                ui: 'confirm',
                margin: 20,
                handler: function () {
                    const name = Ext.getCmp('fighterNameInput').getValue();
                    localStorage.setItem('fighterName', name);
                    Ext.ComponentQuery.query('app-main')[0].setActiveItem(2); // Go to FightScreen
                }
            }
        ]
    }
});
