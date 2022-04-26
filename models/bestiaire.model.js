const mongoose = require('mongoose');
mongoose.pluralize(null);

const BestiaireSchema = mongoose.Schema(
{
    nom: { type: String, required: true},
    nomId: {type: String, required: true},
    description: { type: String, required: false, default: ""},
    lvl : { type: Number, required: true },
    hp: { type: Array, required: true }, // [hp, hp par level]
    position: { type: Number, required: true}, // Position dans le combat (1 = 1ére ligne, 2 = 2éme ligne)
    image: { type: String, required: true},
    imageAttaque: { type: String, required: true},
    imageCritique: { type: String, required: true},
    imageSkill: { type: String, required: true},
    imageMiss: { type: String, required: true},
    armure: {type : Number, required: true},
    spawn: 
    [{ 
        zone: {type: String, required: true},
        drop: {type: Number, required: true}
    }],
    attaque: 
    { 
        description: { type: String, required: true},
        descriptionCrit: { type: String, required: true},
        degat: { type: Array, required: true }, // [min, max]
        crit: { type: Array, required: true }, // [%reussite, degatCritique]
        miss: { type: Number, required: true },
        penetration: { type: Array, required: false, default: [] }, //[%reussite, degatPenetration]
        poison: { type: Object, required: false, default: {} },
        level: { type: Array, required: true } // [nbr degat, nbr crit, nbr miss]
    },
    attaqueSpecial: 
    [{ 
        description: { type: String, required: true},
        activation: { type: Number, required: false }, // % réussite activation
        description: { type: String, required: false },
        repeat: { type: Array, required: false }, // [%chance repeat, nbr max repeat] 
        degatBonus: { type: Number, required: false }, // Dégat additionel à l'attaque (addition ou multiplicateur)
        crit: 
        {
            description: { type: String, required: true},
            activation : { type: Number, required: false }, // % critique
            degatBonus : { type: Number, required: false }, 
            effet : { type: String, required: false },
        },
        miss: { type: Number, required: false },
        level: { type: Array, required: false }, //[nbr degat, nbr crit, nbr miss]
        penetration: { type: Number, required: false } //[%reussite, degatPenetration]
    }],
    blocage: 
    {
        degat: { type: Array, required: true }, // [min réduction, max réduction]
        crit: { type: Array, required: true }, // [%reussite, degatReductionBonus]
        miss: { type: Number, required: true },
        level: { type: Array, required: true } // [nbr degat, nbr crit, nbr miss]
    },
    loot: 
    { 
        gold:
        {
            bronze: { type: Array, required: true }, // [min gold, max gold],
            argent: { type: Array, required: true }, // [min gold, max gold],
            or: { type: Array, required: true }, // [min gold, max gold],
        },
        item: { type: Object, required: false },
        xp : { type: Array, required: false }, // [min xp, max xp],
    }
});

module.exports = mongoose.model('Bestiaire', BestiaireSchema);