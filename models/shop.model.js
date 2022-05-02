const mongoose = require('mongoose');
mongoose.pluralize(null);

const ShopSchema = mongoose.Schema(
{
    nom: { type: String, required: true},
    nomId: { type: String, required: true},
    type: { type: String, required: true},
    unique: { type: Boolean, required: true},
    exclusif: 
    {
        combattant: { type: Boolean, required: true},
        voleur: { type: Boolean, required: true},
        mage: { type: Boolean, required: true},
        archer: { type: Boolean, required: true},
    },
    statistique: { type: Object, required: true},
    regeneration: { type: Object, required: false},
    effet: 
    {
        type: { type: String, required: false},
        activation: { type: Number, required: false},
        description: { type: String, required: false},
    },
    description: { type: String, required: false},
    image: { type: String, required: false, default: ''},
    price: { type: Array, required: true}, // [bronze, argent, or]
});

module.exports = mongoose.model('Shop', ShopSchema);