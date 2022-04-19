const mongoose = require('mongoose');
mongoose.pluralize(null);
const Double = require('@mongoosejs/double')

const PlayerSchema = mongoose.Schema(
{
    id: {type: String, required: true},
    prenom: { type: String, required: true},
    nom: { type: String, required: true},
    classe: { type: String, required: true},
    race: { type: String, required: false},
    description: { type: String, required: false, default: ""},
    lvl : { type: Number, required: false, default: 1 },
    xp: { type: Number, required: false, default: 0 },
    hp: { type: Array, required: true }, // [actuel, total, bonusByRace]
    magie: { type: Array, required: true }, // [actuel, total, bonusByRace]
    attaque: { type: Array, required: true }, // [actuel, total, bonusByRace]
    armure:[{ type: Double, required: true }], // [actuel, total, bonusByRace]
    money: { type: Array, required: false, default: [0, 0, 0] }, // [bronze, argent, or]
    attribut: { type: Array, required: false, default: [0, 0] }, // [restant, total]
    attributPalier: { type: Number, required: false, default: 1 },
    image: { type: String, required: false, default: "" },
    equipement: 
    { 
        casque: {type: Array, required: false, default: []},
        plastron: {type: Array, required: false, default: []},
        arme: {type: Array, required: false, default: []},
    },
    inventaire: { type: Array, required: false, default: [] },
    skill: { type: Array, required: false, default: [] },
});

module.exports = mongoose.model('Player', PlayerSchema);