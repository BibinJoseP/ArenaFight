// app/view/templates/OpponentCardTemplate.js
Ext.define("ArenaFight.view.templates.OpponentCardTemplate", {
  singleton: true,
            // <span style="color:#ff5252;">STR: {strength}</span> |
          // <span style="color:#ffc107;">STA: {stamina}</span><br/>
          // <span style="color:#00e676;">INT: {intellect}</span> |
          // <span style="color:#7e57c2;">AGI: {agility}</span>

  getTemplate: function () {
    return new Ext.XTemplate(`
      <div style="border:1px solid #4a90e2; border-radius:8px; padding:10px; display:flex; align-items:center;">
        <div style="width: 64px; text-align:center;">
          <img src="{image}" width="56" height="56" style="border-radius:50%; box-shadow: 0 0 10px #4a90e2;" />
        </div>
        <div style="flex: 1; padding: 0 12px; font-size:14px;">
          <b style="color:#4a90e2;">{name}</b> <span style="font-size: 12px;">(Lvl {level})</span><br/>

        </div>
        <div style="text-align:right;">
          <button class="custom-fight-btn"
            onclick="ArenaFight.app.getController('Main').fightOpponent('{name}', {strength}, {stamina}, {intellect}, {agility}, '{image}')">
            Fight
          </button>
        </div>
      </div>
    `);
  },
});
