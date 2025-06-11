
Ext.define("ArenaFight.controller.Main", {
  extend: "Ext.app.Controller",

  config: {
    refs: {},
    control: {},
  },

fightOpponent: function (name, strength, stamina, intellect, agility, opponentImage) {
  const me = localStorage.getItem("fighterName") || "You";
  const myImage = "../resources/images/profile.jpg";


  const battlePanel = Ext.create("Ext.Panel", {
    modal: true,
    centered: true,
    width: "90%",
    styleHtmlContent: true,
    cls: 'custom-battle-panel',
    style: "background-color: #111; color: white; border-radius: 10px; padding: 15px;",
    hideOnMaskTap: false,
    layout: 'vbox',
    items: [
      {
        xtype: 'container',
        html: `
          <div class="animate-fade-scale" style="text-align: center;">
            <div style="margin-bottom: 10px; font-size: 18px;color: white;"><b>Battle Begins!</b></div>
            <div style="display: flex; justify-content: center; align-items: center; gap: 20px;">
              <div>
                <img src="${myImage}" width="64" height="64" style="border-radius: 50%; box-shadow: 0 0 8px #00f;" />
                <div style="color: white;">${me}</div>
              </div>
              <div style="font-size: 20px; color: white;">vs</div>
              <div>
                <img src="${opponentImage}" width="64" height="64" style="border-radius: 50%; box-shadow: 0 0 8px #f00;" />
                <div style="color: white;">${name}</div>
              </div>
            </div>
          </div>
        `
      }
    ]
  });

  Ext.Viewport.add(battlePanel);
  battlePanel.show();


setTimeout(() => {
  battlePanel.removeAll();
  battlePanel.setItems([
    {
      xtype: 'container',
      html: `<div <div class="animate-pop-bounce" style="text-align:center; font-size: 20px; margin-bottom: 20px; color: white;">🎉 <b>You Won!</b></div>`
    },
    {
      xtype: 'container',
      layout: {
        type: 'hbox',
        pack: 'center'  
      },
 items: [
  {
    xtype: 'button',
    text: 'OK',
    style: {
      backgroundColor: '#43a6f5',
      color: '#000',
      fontWeight: 'bold',
      borderRadius: '6px',
      fontSize: '15px',
      width: '100px',
      height: '40px',
      margin: '0 auto',
      display: 'block',
    },
    handler: function () {
      Ext.Viewport.remove(battlePanel);
    }
  }
]

    }
  ]);
}, 3000);
}
});
