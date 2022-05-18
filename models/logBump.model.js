const mongoose = require('mongoose');
mongoose.pluralize(null);

const LogBump = mongoose.Schema(
{
    userId: { type: String, required: true },
    bump : {type: Number, required: false, default : 0},
    role : {type: String, required: false, default: "〖🔰〗Bumpeur novice"},
    money: { type: Number, required: false, default: 0},
    xp: { type: Number, required: false, default: 0},
    date: { type: Array, required: false, default: []},

});

module.exports = mongoose.model('LogBump', LogBump);