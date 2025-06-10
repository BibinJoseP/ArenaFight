Ext.define("ArenaFight.view.screens.NameScreen", {
    extend: "Ext.Container",
    xtype: "namescreen",

    requires: [
        "Ext.form.Panel", 
        "Ext.field.Text", 
        "Ext.Button",
        "Ext.MessageBox",
        "ArenaFight.view.screens.FightScreen" // Ensure FightScreen is required
    ],

    layout: "fit",
    cls: 'name-screen-container', // For CSS styling

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
            html: "Enter Your Fighter Name"
        }, {
            xtype: "textfield",
            name: "fighterName",
            placeHolder: "Fighter Name",
            clearable: false,
            required: true,
            cls: 'x-namescreen-fighter-name-field'
        }, {
            xtype: "button",
            text: "START BATTLE",
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