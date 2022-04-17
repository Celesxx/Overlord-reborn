const mongoose = require('mongoose');
mongoose.pluralize(null);

const SkillSchema = mongoose.Schema(
{
    nom: { type: String, required: true},
    image: { type: String, required: true},
    description: { type: String, required: true},
    target: { type: Array, required: false}, // [nbr cible, nbr ligne position]
    attaque: 
    { 
        degat: { type: Array, required: false }, // [min, max]
        crit: { type: Array, required: false }, // [%reussite, degatCritique]
        miss: { type: Number, required: false },
        penetration: { type: Array, required: false }, //[%reussite, degatPenetration]
        poison: { type: Object, required: false },
    },
    defense: 
    { 
        blocage: { type: Array, required: false }, // [min, max]
        crit: { type: Array, required: false }, // [%reussite, degatCritique]
        miss: { type: Number, required: false },
        penetration: { type: Number, required: false }, // pourcentage réduction penetration
    },
});

module.exports = mongoose.model('Skill', SkillSchema);