Ext.define("ArenaFight.view.screens.FightScreen", {
  extend: "Ext.Container",
  xtype: "fightscreen",

  config: {
    layout: "vbox",
    style: "background: #000; color: white; font-family: 'Arial', sans-serif;",

    items: [
      // 🔝 Header
      {
        xtype: "container",
        flex: 2,
        layout: {
          type: "hbox",
          align: "middle",
        },
        padding: 10,
        style: "border-bottom: 1px solid #333;",
        items: [
          {
            xtype: "container",
            width: "50%",
            layout: {
              type: "vbox",
              align: "center",
              pack: "center",
            },
            items: [
              {
                xtype: "image",
                src: "../../../resources/images/profile.jpg",
                width: 82,
                height: 82,
                style: `
                  border-radius: 50%;
                  border: 3px solid #f00;
                  box-shadow: 0 0 12px rgba(255,0,0,0.5);
                  margin-bottom: 8px;
                `,
              },
              {
                xtype: "component",
                html: `<span style="font-size:20px; color:white;">
                        <b style="color:#00bfff;">Ron</b>
                      </span>`,
              },
            ],
          },
          {
            xtype: "container",
            width: "50%",
            layout: "vbox",
            defaults: {
              xtype: "component",
              style: "font-size: 16px; margin-bottom: 4px;",
            },
            items: [
              {
                html: `⚔️ <b>Level:</b> <span style="color:#00e676;">5</span>`,
              },
              {
                html: `💪 <b>Strength:</b> <span style="color:#ff5252;">80</span>`,
              },
              {
                html: `🔥 <b>Stamina:</b> <span style="color:#ffc107;">65</span>`,
              },
              {
                html: `🪙 <b>Money:</b> <span style="color:#7e57c2;">$120</span>`,
              },
            ],
          },
        ],
      },

      // 🔄 Main Content Area (dynamic container)
      {
        xtype: "container",
        itemId: "mainContent",
        flex: 6,
        layout: "fit",
        scrollable: true,
        cls: "fight-screen",
        // style: "background: transparent; color: grey;",
      },

      // 🔻 Bottom Navigation
      {
        xtype: "toolbar",
        docked: "bottom",
        layout: {
          type: "hbox",
          pack: "space-around",
        },
        style:
          "background-color:#111; background:#111; color:white; border-top: 1px solid #333;",
        items: [
          {
            xtype: "button",
            text: "Arena",
            iconCls: "x-fa fa-bolt",
            iconAlign: "top",
            cls: "bottom-nav-btn selected",
            listeners: {
              tap: function (btn) {
                const toolbar = btn.up("toolbar");
                toolbar.items.each((b) => b.removeCls("selected"));
                btn.addCls("selected");
              },
            },
            handler: function (btn) {
              const main = btn.up("fightscreen").down("#mainContent");
              main.removeAll();
              main.add({
                xtype: "dataview",
                store: { type: "opponents" },
                itemCls: "opponent-card",
                scrollable: true,
                style: "padding:10px;",
                itemTpl: new Ext.XTemplate(`
  <style>
    .custom-fight-btn {
      padding: 6px 10px;
      font-size: 13px;
      border: none;
      background: #ff1744;
      color: white;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    .custom-fight-btn:hover {
      background: #f20635;
    }
  </style>

  <div style="border:1px solid #4a90e2; border-radius:8px; padding:10px; margin-bottom:10px; display:flex; align-items:center;">
    
    <!-- 🖼️ Left: Opponent Image -->
    <div style="width: 64px; text-align:center;">
      <img src="{image}" width="56" height="56" style="border-radius:50%; box-shadow: 0 0 10px #4a90e2;" />
    </div>

    <!-- 📊 Middle: Opponent Info -->
    <div style="flex: 1; padding: 0 12px; font-size:14px;">
      <b style="color:#4a90e2;">{name}</b> <span style="font-size: 12px;">(Lvl {level})</span><br/>
      <span style="color:#ff5252;">STR: {strength}</span> | 
      <span style="color:#ffc107;">STA: {stamina}</span><br/>
      <span style="color:#00e676;">INT: {intellect}</span> | 
      <span style="color:#7e57c2;">AGI: {agility}</span>
    </div>

    <!-- ⚔️ Right: Fight Button -->
    <div style="text-align:right;">
      <button class="custom-fight-btn"
        onclick="ArenaFight.app.getController('Main').fightOpponent('{name}', {strength}, {stamina}, {intellect}, {agility})">
        Fight
      </button>
    </div>
  </div>
`),
              });
            },
          },
          {
            xtype: "button",
            text: "Inventory",
            iconCls: "x-fa fa-box",
            iconAlign: "top",
            cls: "bottom-nav-btn",
            listeners: {
              tap: function (btn) {
                const toolbar = btn.up("toolbar");
                toolbar.items.each((b) => b.removeCls("selected"));
                btn.addCls("selected");
              },
            },
            handler: function (btn) {
              const main = btn.up("fightscreen").down("#mainContent");
              main.removeAll();

              main.add({
                xtype: "container",
                padding: 10,
                scrollable: true,
                items: [
                  {
                    xtype: "component",
                    html: "<h2 style='color:white;'>Inventory</h2>",
                  },
                  {
                    xtype: "dataview",
                    cls: "inventory-list",
                    itemTpl: new Ext.XTemplate(`
            <div class="inventory-item">
              <div class="item-name">{name}</div>
              <div class="item-actions">
                <button class="buy-btn">Buy</button>
                <button class="sell-btn">Sell</button>
              </div>
            </div>
          `),
                    store: {
                      fields: ["name"],
                      data: [
                        { name: "Strength Potion" },
                        { name: "Stamina Potion" },
                        { name: "Agility Potion" },
                      ],
                    },
                  },
                ],
              });
            },
          },
          {
            xtype: "button",
            text: "Settings",
            iconCls: "x-fa fa-cog",
            iconAlign: "top",
            cls: "bottom-nav-btn",
            listeners: {
              tap: function (btn) {
                const toolbar = btn.up("toolbar");
                toolbar.items.each((b) => b.removeCls("selected"));
                btn.addCls("selected");
              },
            },
            handler: function (btn) {
              const main = btn.up("fightscreen").down("#mainContent");
              main.removeAll();

              main.add({
                xtype: "container",
                padding: 10,
                scrollable: true,
                items: [
                  {
                    xtype: "component",
                    html: "<h2 style='color:white;'>Settings</h2>",
                  },
                  {
                    xtype: "formpanel",
                    cls: "arena-fightscreen-form-panel",
                    items: [
                      {
                        xtype: "togglefield",
                        label: "Music",
                        labelAlign: "left",
                        value: 1,
                      },
                      {
                        xtype: "togglefield",
                        label: "Sound Effects",
                        labelAlign: "left",
                        value: 1,
                      },
                      {
                        xtype: "selectfield",
                        label: "Difficulty",
                        options: [
                          { text: "Easy", value: "easy" },
                          { text: "Normal", value: "normal" },
                          { text: "Hard", value: "hard" },
                        ],
                        value: "normal",
                      },
                      {
                        xtype: "button",
                        text: "Reset Progress",
                        ui: "decline",
                        margin: "20 0",
                        handler: function () {
                          Ext.Msg.alert(
                            "Reset",
                            "Progress has been reset (not really 😄)"
                          );
                        },
                      },
                      {
                        xtype: "button",
                        text: "Logout",
                        ui: "decline",
                        handler: function () {
                          Ext.Msg.alert("Logout", "You have been logged out.");
                        },
                      },
                    ],
                  },
                ],
              });
            },
          },
        ],
      },
    ],
  },
  initialize: function () {
    this.callParent();

    // Automatically trigger Arena tab handler on load
    const arenaBtn = this.down("button[text=Arena]");
    if (arenaBtn && typeof arenaBtn.getHandler() === "function") {
      arenaBtn.getHandler().call(arenaBtn.getScope() || this, arenaBtn);
    }
  },
});
