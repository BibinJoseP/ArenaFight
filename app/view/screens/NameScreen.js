Ext.define("ArenaFight.view.screens.NameScreen", {
    extend: "Ext.Container",
    xtype: "namescreen",

    requires: [
        "Ext.form.Panel", 
        "Ext.field.Text", 
        "Ext.Button",
        "Ext.MessageBox",
        "ArenaFight.view.screens.FightScreen" 
    ],

    layout: "fit",
    cls: 'name-screen-container',

    items: [{
        xtype: "formpanel",
        scrollable: false,
        cls: 'arena-namescreen-form-panel',
        layout: {
            type: "vbox",
            align: "middle",
            pack: "center"
        },
        items: [{
            xtype: "component",
            cls: 'name-screen-title',
            html: "Enter Your Name"
        }, {
            xtype: "textfield",
            name: "fighterName",
            placeHolder: "Fighter Name",
            clearable: false,
            required: true,
            cls: 'x-namescreen-fighter-name-field',
            listeners: {
                keyup: function (field) {
                    const btn = field.up('formpanel').down('button[name=startBattleBtn]');
                    btn.setHidden(!field.getValue().trim());
                }
            }
        }, {
            xtype: "button",
            text: "START BATTLE",
            name: "startBattleBtn",
            hidden: true,
            margin: "25 0 0 0",
            cls: 'name-screen-button',
                 handler: function (btn) {
              const form = btn.up("formpanel");
              const values = form.getValues();

              if (values.fighterName && values.fighterName.trim().length > 0) {
                localStorage.setItem("fighterName", values.fighterName.trim());
                Ext.Viewport.setActiveItem({ xtype: "fightscreen" });
              } else {
                Ext.Msg.alert("Oops!", "Please enter a name to proceed.");
              }}
        }]
    }],


});