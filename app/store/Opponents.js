Ext.define("ArenaFight.store.Opponents", {
  extend: "Ext.data.Store",
  alias: "store.opponents",

  fields: ["name", "level", "strength", "stamina", "intellect", "agility", "image"],

  data: [
    { name: "Dark Ninja", level: 6, strength: 70, stamina: 60, intellect: 40, agility: 50, image: "../resources/images/opponent.jpg" },
    { name: "Shadow Beast", level: 8, strength: 85, stamina: 75, intellect: 30, agility: 40, image: "../resources/images/opponent.jpg" },
    { name: "Iron Fist", level: 7, strength: 80, stamina: 65, intellect: 50, agility: 45, image: "../resources/images/opponent.jpg" },
    { name: "Flame Rider", level: 9, strength: 90, stamina: 80, intellect: 60, agility: 55, image: "../resources/images/opponent.jpg" },
    { name: "Storm Bringer", level: 10, strength: 100, stamina: 85, intellect: 65, agility: 60, image: "../resources/images/opponent.jpg" },
    { name: "Venom Snake", level: 5, strength: 60, stamina: 55, intellect: 35, agility: 40, image: "../resources/images/opponent.jpg" },
    { name: "Steel Golem", level: 12, strength: 110, stamina: 95, intellect: 45, agility: 30, image: "../resources/images/opponent.jpg" },
    { name: "Night Wolf", level: 8, strength: 75, stamina: 70, intellect: 50, agility: 55, image: "../resources/images/opponent.jpg" },
    { name: "Blood Phantom", level: 11, strength: 95, stamina: 90, intellect: 60, agility: 65, image: "../resources/images/opponent.jpg" },
    { name: "Blaze Spirit", level: 9, strength: 88, stamina: 78, intellect: 55, agility: 60, image: "../resources/images/opponent.jpg" },
  ],autoLoad: true,
});
