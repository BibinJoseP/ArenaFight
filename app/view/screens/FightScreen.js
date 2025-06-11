Ext.define("ArenaFight.view.screens.FightScreen", {
  extend: "Ext.Container",
  xtype: "fightscreen",

  config: {
    layout: "vbox",
    style: "background: #000; color: white; font-family: 'Arial', sans-serif;",

    items: [
      // 🔝 Header Section
      {
        xtype: "container",
        flex: 2,
        layout: { type: "hbox", align: "middle" },
        padding: 10,
        style: "border-bottom: 1px solid #333;",
        items: [
          {
            xtype: "container",
            width: "50%",
            layout: { type: "vbox", align: "center", pack: "center" },
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
                itemId: "fighterNameDisplay",
                html: `
                  <span style="font-size:20px; color:white;">
                    <b style="color:#00bfff;">...</b>
                  </span>
                `,
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
              { html: `⚔️ <b>Level:</b> <span style="color:#00e676;">5</span>` },
              { html: `💪 <b>Strength:</b> <span style="color:#ff5252;">80</span>` },
              { html: `🔥 <b>Stamina:</b> <span style="color:#ffc107;">65</span>` },
              { html: `🪙 <b>Money:</b> <span style="color:#7e57c2;">$120</span>` },
            ],
          },
        ],
      },

      // 🔄 Main Content (dynamic)
      {
        xtype: "container",
        itemId: "mainContent",
        flex: 6,
        layout: "fit",
        scrollable: true,
        cls: "fight-screen",
      },

      // 🔻 Bottom Navigation
      {
        xtype: "toolbar",
        docked: "bottom",
        layout: { type: "hbox", pack: "space-around" },
        style: "background:#111; color:white; border-top: 1px solid #333;",
        items: [
          // Arena Button
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
              main.removeAll(true);
              main.add({
                xtype: "container",
                layout: "vbox",
                showAnimation: {
                  type: "fade",
                  duration: 300,
                },
                items: [
                  {
                    xtype: "component",
                    html: "<h2 style='color:#2196f394; padding: 10px 10px 0 10px;'>Arena</h2>",
                  },
                  {
                    xtype: "container",
                    flex: 1,
                    scrollable: true,
                    padding: 10,
                    items: [
                      {
                        xtype: "dataview",
                        store: { type: "opponents" },
                        itemCls: "opponent-card",
                        itemTpl:
                          ArenaFight.view.templates.OpponentCardTemplate.getTemplate(),
                      },
                    ],
                  },
                ],
              });
            },
          },

          // Inventory Button
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
                  { xtype: "component", html: "<h2 style='color:#2196f394;'>Inventory</h2>" },
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

          // Settings Button
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
                  { xtype: "component", html: "<h2 style='color:#2196f394;'>Settings</h2>"},
                  {
                    xtype: "formpanel",
                    cls: "arena-fightscreen-form-panel",
                    items: [
                      { xtype: "togglefield", label: "Music", labelAlign: "left", value: 1 },
                      { xtype: "togglefield", label: "Sound Effects", labelAlign: "left", value: 1 },
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
                          Ext.Msg.alert("Reset", "Progress has been reset (not really 😄)");
                        },
                      },
                      {
                        xtype: "button",
                        text: "Logout",
                        ui: "decline",
                        handler: function () {
                          Ext.Msg.confirm("Exit", "Do you want to exit the game?", (btn) => {
                              if (btn === "yes") navigator.app.exitApp();
                          });
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

    // ✅ Set fighter name
    const fighterName = localStorage.getItem("fighterName") || "Unknown";
    const nameComp = this.down("#fighterNameDisplay");
    if (nameComp) {
      nameComp.setHtml(`
        <span style="font-size:20px; color:white;">
          <b style="color:#00bfff;">${Ext.String.htmlEncode(fighterName)}</b>
        </span>
      `);
    }

    // ✅ Auto-select Arena tab
    const arenaBtn = this.down("button[text=Arena]");
    if (arenaBtn && typeof arenaBtn.getHandler() === "function") {
      arenaBtn.getHandler().call(arenaBtn.getScope() || this, arenaBtn);
    }

    // ✅ Handle Android back button
    document.addEventListener("backbutton", () => {
        const toolbar = this.down("toolbar[docked=bottom]");
        const selectedBtn = toolbar.down(".selected");

        if (selectedBtn.getText() !== "Arena") {
          const arenaBtn = toolbar.down("button[text=Arena]");
          if (arenaBtn) {
            toolbar.items.each((btn) => btn.removeCls("selected"));
            arenaBtn.addCls("selected");
            arenaBtn.getHandler().call(arenaBtn.getScope() || this, arenaBtn);
          }
        } else {
          Ext.Msg.confirm("Exit", "Do you want to exit the game?", (btn) => {
            if (btn === "yes") navigator.app.exitApp();
          });
        }
    }, false);
  },
});
