const { Console } = require('console')
const Discord = require('discord.js')
const { DiscordMenus, ButtonBuilder, MenuBuilder } = require('discord-menus');
const { Client,  MessageEmbed, MessageAttachment, Intents }  = require('discord.js');

const Canvas = require('canvas')
const { registerFont } = require('canvas')
const { performance } = require('perf_hooks')
const QuickChart = require('quickchart-js')
const bdd = require('./bdd/bdd.json')
const lvl = require('./bdd/lvl.json')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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

const allIntents = new Intents(32767);
const client = new Client({ intents: allIntents })

const talkedRecently = new Set()
const talkedRecently2 = new Set()
const talkedRecently3 = new Set()
const talkedRecentlyGrimoire = new Set()
const fs = require("fs")
const Cron = require("cron").CronJob;
const mongoose = require('mongoose');
require("dotenv").config();

let indexMonstre = 0;

const MenusManager = new DiscordMenus(client);

//Rhodaan bot
//  client.login(process.env.RHODAANBOTTOKEN);

//zelgius bot
client.login(process.env.ZELGIUSBOTTOKEN);

let préfix = process.env.PREFIX;
var vm = require('vm')

const { send } = require('process')
const { channel } = require('diagnostics_channel')


const connectDB = async () => 
{
    try 
    {
      await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
      console.log('Successfully connected to MongoDB.');
    }catch (err) 
    {
      console.log('Could not connect to MongoDB.')
      console.log(err)
      process.exit()
    }
}
connectDB();

client.on('ready', function () {
  console.log("Let's go")
})


client.on("messageCreate", async message =>
{

  const args = message.content.slice(préfix.length).split(/ +/g)
  // const SuperArgs = message.content.slice().split(/ +/g)
  // const second = message.content.split(/ +/g)
  const command = args.shift().toLowerCase()


  let rpServer = [
    "939189315781656717", "939189315781656718", "939189315781656719", "939189315781656721", "939189315781656722", "939189315781656723", "939189315781656724", "939189315781656724",
    "939189316192702565", "945974040630284288", "958786131678330880", "939189317610393707", "946054690553098340", "949447630444974141", "939189317610393706", "946054857503170580", 
    "949447694991118337", "939189317610393709", "945766632335237150", "945766954302570518", "945768047237533777", "945767470533337128", "945775381175238696",
    "949446480278732860", "949710374775693322", "945772877305741372", "945973619044012043", "945775469356273714", "945973530296717362", "946055135799427102", "946055337507700756",
    "945973584289992747", "940254750866309140", "945784495053869129", "945974006153084968", "945974437772152842", "945973555764555777", "939189317610393705", "945973470464974868", 
    "945974495640956988", "945774211887136808", "946055013371871233", "945974102143938561", "945974848226730014", "945970683480002601", "945974826013687828", "945775348656783390", 
    "945974568395358218", "945774986000486450", "945974585587793971", "945974077825380352", "945775181631209522", "945973634751668244", "945973572625661992",
    "945973484251668480", "939189317610393706", "945974119374139412", "945974019709087785", "945775505850921010", "945772961934221322", "945974513458372608"
  ]
  
  if(message.content.length >= 0 && rpServer.includes(message.channel.id))
  {
    try
    {
      if(message.content.length >= 200)
      {
        let id = message.author.id
        const playerCreationFunction = new PlayerCreationFunction()
        const experienceFunction = new LevelFunction()

        let stat = await playerCreationFunction.getPlayerById(id.replace(/[<@>]/gm,""))

        stat = stat[0]
        stat.xp = Math.round(5 + stat.xp + (message.content.length * 0.001 * (stat.lvl - (stat.lvl / 2)) * Math.exp(stat.lvl / 250)))

        let rankBefore = await experienceFunction.getRankPlayer(stat)
        await playerCreationFunction.editPlayerById(stat.id, stat)
        await experienceFunction.verifLvlUp(stat.id, message, client, rankBefore, stat)
      }
    
    }catch(error)
    {
      console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
    }
  }

  if (!message.content.startsWith(préfix) || message.author.bot) return



  eval(fs.readFileSync(__dirname + '/data/immobilier.js')+'')
  eval(fs.readFileSync(__dirname + '/data/ptJoueur.js')+'')

  eval(fs.readFileSync(__dirname + '/classe/classes.js')+'')
  eval(fs.readFileSync(__dirname + '/classe/menu.js')+'')
  // eval(fs.readFileSync(__dirname + '/classe/palier1_classe.js')+'')
  // eval(fs.readFileSync(__dirname + '/classe/palier2_classe.js')+'')
  // eval(fs.readFileSync(__dirname + '/classe/palier3_classe.js')+'')

  // eval(fs.readFileSync(__dirname + '/monstre/monstre.js')+'')
  // eval(fs.readFileSync(__dirname + '/monstre/palier1_foret.js')+'')
  // eval(fs.readFileSync(__dirname + '/monstre/palier1_monstre_marécage.js')+'')
  // eval(fs.readFileSync(__dirname + '/monstre/palier1_monstre.js')+'')
  // eval(fs.readFileSync(__dirname + '/monstre/palier2_donjon.js')+'')

  eval(fs.readFileSync(__dirname + '/commands/bestiaire/bestiaire.command.js')+'')
  eval(fs.readFileSync(__dirname + '/commands/skill/skill.command.js')+'')
  eval(fs.readFileSync(__dirname + '/commands/zone/zone.command.js')+'')
  eval(fs.readFileSync(__dirname + '/commands/logs/combat.command.js')+'')
  eval(fs.readFileSync(__dirname + '/commands/other/channel.command.js')+'')

  eval(fs.readFileSync(__dirname + '/commands/combat/monstre.command.js')+'')
  eval(fs.readFileSync(__dirname + '/commands/combat/joueur.command.js')+'')
  eval(fs.readFileSync(__dirname + '/commands/combat/gestion.command.js')+'')
  eval(fs.readFileSync(__dirname + '/commands/character/player.command.js')+'')
  

  if(command === 'roll')
  {
    var max_value = 100
    var min_value = 0
    var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value
    if(result < 50){
      couleur = "#f44336"
    } else {
      couleur = "#00FF00"
    } 
      const help_embed = new Discord.MessageEmbed()
      .setColor(couleur)
      .setTitle("**"+ result + "**")
       message.channel.send(help_embed)
  }

})
 
