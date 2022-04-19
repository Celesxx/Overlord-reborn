const mongoose = require('mongoose');
mongoose.pluralize(null);

const ZoneSchema = mongoose.Schema(
{
    nom: { type: String, required: true},
    image: { type: String, required: false},
    description: { type: String, required: true},
    nombre: { type: Number, required: true},
    lvl: { type: Number, required: true},
    loot: 
    { 
        money: { type: Array, required: true }, // [min, max]
        drop: { type: Object, required: true },
    },
});

module.exports = mongoose.model('Zone', ZoneSchema);