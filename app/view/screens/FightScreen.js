Ext.define("ArenaFight.view.screens.FightScreen", {
  extend: "Ext.Container",
  xtype: "fightscreen",

  config: {
    layout: "vbox",
    style: "background:#000; color:white;",

    items: [
      // 🔝 Header Section (User Info)
      {
        xtype: "container",
        flex: 2,
        layout: "hbox",
        padding: 10,
        items: [
          {
            xtype: "image",
            src: "resources/images/profile.png",
            width: 60,
            height: 60,
            style: "border-radius: 30px; margin-right: 10px;",
          },
          {
            xtype: "container",
            layout: "vbox",
            items: [
              { html: "Name: <b>Ron</b>" },
              { html: "Level: 5" },
              { html: "Strength: 80" },
              { html: "Stamina: 65" },
              { html: "Money: $120" },
            ],
          },
        ],
      },

      // 🔄 Main Content Area
      {
        xtype: "container",
        flex: 6,
        itemId: "mainContent",
        layout: "vbox",
        scrollable: true,
        items: [
          // Default content: Arena opponents
{
  xtype: 'list',
  store: {
    type: 'opponents'
  },
  itemTpl: new Ext.XTemplate(
    `<div style="border:1px solid white; padding:10px; margin:10px;">
      <div style="display:flex; align-items:center;">
        <img src="{image}" width="50" height="50" style="border-radius:25px; margin-right:10px;" />
        <div>
          <b>{name}</b> (Level {level})<br/>
          STR: {strength} | STA: {stamina}<br/>
          INT: {intellect} | AGI: {agility}<br/>
          <button onclick="ArenaFight.app.getController('Main').fightOpponent('{name}', {strength}, {stamina}, {intellect}, {agility})">Fight</button>
        </div>
      </div>
    </div>`
  ),
  scrollable: true,
  style: 'background:transparent; color:white;'
},

        ],
      },

      // 🔻 Bottom Navigation
      {
        xtype: "toolbar",
        docked: "bottom",
        layout: {
          type: "hbox",
          pack: "space-around",
        },
        style: "background:#111; color:white;",
        items: [
          {
            xtype: "button",
            text: "Arena",
            iconCls: "x-fa fa-bolt",
            handler: function (btn) {
              const main = btn.up("fightscreen").down("#mainContent");
              main.removeAll();

              main.add({
                xtype: "list",
                store: {
                  type: "opponents", // refers to the store you defined earlier
                },
                itemTpl: new Ext.XTemplate(
                  `<div style="border:1px solid white; padding:10px; margin:10px;">
                    <div style="display:flex; align-items:center;">
                        <img src="{image}" width="50" height="50" style="border-radius:25px; margin-right:10px;" />
                        <div>
                            <b>{name}</b> (Level {level})<br/>
                            STR: {strength} | STA: {stamina}<br/>
                            INT: {intellect} | AGI: {agility}<br/>
                            <button onclick="ArenaFight.app.getController('Main').fightOpponent('{name}', {strength}, {stamina}, {intellect}, {agility})">Fight</button>
                        </div>
                    </div>
                </div>`
                ),
                style: "background:transparent; color:white;",
                scrollable: true,
              });
            },
          },

          {
            xtype: "button",
            text: "Inventory",
            iconCls: "x-fa fa-box",
            handler: function (btn) {
              const main = btn.up("fightscreen").down("#mainContent");
              main.removeAll();
              main.add({
                xtype: "container",
                padding: 10,
                html: "<b>Character:</b> Ron<br>Strength: 80<br>Stamina: 65<br>Equipment: Sword, Shield",
              });
            },
          },
          {
            xtype: "button",
            text: "Settings",
            iconCls: "x-fa fa-cog",
            handler: function (btn) {
              const main = btn.up("fightscreen").down("#mainContent");
              main.removeAll();
              main.add({
                xtype: "container",
                padding: 10,
                html: "<b>About:</b> Arena Fight Game<br><button onclick=\"alert('Logging out...')\">Logout</button>",
              });
            },
          },
        ],
      },
    ],
  },
});
