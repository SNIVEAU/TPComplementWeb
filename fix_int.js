const fs = require("fs");

// On lit tout le fichier
let data = JSON.parse(fs.readFileSync("cards.json"));

// On accède au tableau de cartes
let cards = data.cards;

// On transforme les ID en nombre
cards = cards.map(card => ({
  ...card,
  id: Number(card.id)
}));

// On réécrit le fichier complet
fs.writeFileSync("cards_fixed.json", JSON.stringify({ cards }, null, 2));
console.log("✅ Fichier corrigé : cards_fixed.json");
