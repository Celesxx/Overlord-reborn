const mongoose = require('mongoose');
mongoose.pluralize(null);

const LogZone = mongoose.Schema(
{
    author: { type: String, required: true },
    createdAt : [{type: String, required: false}],
    totalCombat : {type: Number, required: true,},
    resetDate: { type: Number, required: true },
})

module.exports = mongoose.model('LogZone', LogZone);