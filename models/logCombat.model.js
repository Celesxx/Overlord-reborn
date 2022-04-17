const mongoose = require('mongoose');
mongoose.pluralize(null);

const LogCombatSchema = mongoose.Schema(
{
    author: { type: String, required: true },
    combatId : { type: String, required: true },
    messageId: { type: String, required: false, default: "" },
    createdAt : {type: String, required: true},
    zoneLvl : {type: Number, required: true},
    moyLvlPlayer : {type: Number, required: true},
    channel : {type: String, required: true},
    round: 
    [{
        number: { type: Number, required: false },
        event: { type: Array, required: false },
    }],
    reward:
    [{
        user: { type: String, required: false},
        gain: { type: String, required: false},

    }],
    participant: { type: Array, required: true },
    over: { type: Boolean, required: false, default: false},
    recompense: { type: Boolean, required: false, default: false},

});

module.exports = mongoose.model('LogCombat', LogCombatSchema);