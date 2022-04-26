const { Console } = require('console')
const Discord = require('discord.js')
const { DiscordMenus, ButtonBuilder, MenuBuilder } = require('discord-menus');
const { Client, Collection, MessageEmbed, MessageAttachment, Intents }  = require('discord.js');

const Canvas = require('canvas')
const { registerFont } = require('canvas')
const { performance } = require('perf_hooks')
const QuickChart = require('quickchart-js')
const bdd = require('./bdd/bdd.json')
const lvl = require('./bdd/lvl.json')
var vm = require('vm')
const { send } = require('process')
const { channel } = require('diagnostics_channel')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require("dotenv").config();

const BestiaireController = require('./controllers/bestiaire.controller.js')
const ZoneController = require('./controllers/zone.controller.js')
const SkillController = require('./controllers/skill.controller.js')
const BestiaireFunction = require('./functions/monstre/bestiaire.function.js')
const SkillFunction = require('./functions/character/skill.function.js')
const CombatFunction = require('./functions/interface/combat.function.js')
const ZoneFunction = require('./functions/interface/zone.function.js')
const LogCombatFunction = require("./functions/gestion/logCombat.function.js")
const PerformanceFunction = require("./functions/gestion/performance.function.js")
const MessageFunction = require("./functions/gestion/message.function.js")
const CanvasCharacterFunction = require("./functions/design/character.function.js")
const LevelFunction = require("./functions/character/level.function.js")
const PlayerCreationFunction = require("./functions/character/creation.function.js")
const MeteoFunction = require("./functions/other/meteo.function.js")

const allIntents = new Intents(98045)
const client = new Client({ intents: allIntents })

// const talkedRecently = new Set()
// const talkedRecently2 = new Set()
// const talkedRecently3 = new Set()
// const talkedRecentlyGrimoire = new Set()
const fs = require("fs")
const mongoose = require('mongoose');

client.commands = new Collection()
const utils = ['command.util', 'event.util']
utils.forEach(handler => { require(`./utils/handlers/${handler}`)(client)})

process.on('exit', code => { console.log(`_____________⚠️ Erreur ⚠️_____________\nServer status : Le processes s'est arrété avec le code => ${code}\n____________________________________`)})
process.on('uncaughtException', (err, origin) => {console.log(`_____________⚠️ Erreur ⚠️_____________\nServer status : UNCAUGHT_EXCEPTION => ${err}\nServer status: source du problème => ${origin}\n____________________________________`)})
process.on('unhandledRejection', (reason, promise) => 
{
  console.log(`_____________⚠️ Erreur ⚠️_____________`)
  console.log(`Server status : UNHANDLED_REJECTION ${reason}`)
  console.log(`Server status: source du problème =>`)
  console.log(promise)
  console.log(`____________________________________`)
})
process.on('warning', (...args) => 
{
  console.log(`_____________⚠️ Warning ⚠️_____________`)
  console.log(...args)
  console.log(`____________________________________`)
})

// const MenusManager = new DiscordMenus(client);

//zelgius bot
client.login(process.env.ZELGIUSBOTTOKEN);
let préfix = process.env.PREFIX;



const connectDB = async () => 
{
    try 
    {
      await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
      console.log('Server status : successfully connected to MongoDB.');
    }catch (err) 
    {
      console.log('Server status : could not connect to MongoDB.')
      console.log(err)
      process.exit()
    }
}
connectDB()