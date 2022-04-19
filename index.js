const { Console } = require('console')
const Discord = require('discord.js')
const { DiscordMenus, ButtonBuilder, MenuBuilder } = require('discord-menus');
const { Client, MessageEmbed, MessageAttachment, Intents }  = require('discord.js');

const Canvas = require('canvas')
const { registerFont } = require('canvas')
const { performance } = require('perf_hooks')
const QuickChart = require('quickchart-js')
const bdd = require('./bdd/bdd.json')
const lvl = require('./bdd/lvl.json')
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
const client = new Client({ intents: allIntents });

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

var préfix = "!";
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

  if (!message.content.startsWith(préfix) || message.author.bot) return

  const args = message.content.slice(préfix.length).split(/ +/g)
  // const SuperArgs = message.content.slice().split(/ +/g)
  // const second = message.content.split(/ +/g)
  const command = args.shift().toLowerCase()

  eval(fs.readFileSync(__dirname + '/data/immobilier.js')+'');
  eval(fs.readFileSync(__dirname + '/data/ptJoueur.js')+'');
  eval(fs.readFileSync(__dirname + '/data/shop_palier1.js')+'');

  eval(fs.readFileSync(__dirname + '/classe/classes.js')+'');
  eval(fs.readFileSync(__dirname + '/classe/menu.js')+'');
  // eval(fs.readFileSync(__dirname + '/classe/palier1_classe.js')+'');
  // eval(fs.readFileSync(__dirname + '/classe/palier2_classe.js')+'');
  // eval(fs.readFileSync(__dirname + '/classe/palier3_classe.js')+'');

  // eval(fs.readFileSync(__dirname + '/monstre/monstre.js')+'');
  // eval(fs.readFileSync(__dirname + '/monstre/palier1_foret.js')+'');
  // eval(fs.readFileSync(__dirname + '/monstre/palier1_monstre_marécage.js')+'');
  // eval(fs.readFileSync(__dirname + '/monstre/palier1_monstre.js')+'');
  // eval(fs.readFileSync(__dirname + '/monstre/palier2_donjon.js')+'');

  eval(fs.readFileSync(__dirname + '/commands/bestiaire/bestiaire.command.js')+'');
  eval(fs.readFileSync(__dirname + '/commands/skill/skill.command.js')+'');
  eval(fs.readFileSync(__dirname + '/commands/zone/zone.command.js')+'');
  eval(fs.readFileSync(__dirname + '/commands/logs/combat.command.js')+'');
  eval(fs.readFileSync(__dirname + '/commands/other/channel.command.js')+'');

  eval(fs.readFileSync(__dirname + '/commands/combat/monstre.command.js')+'');
  eval(fs.readFileSync(__dirname + '/commands/combat/joueur.command.js')+'');
  eval(fs.readFileSync(__dirname + '/commands/combat/gestion.command.js')+'');
  eval(fs.readFileSync(__dirname + '/commands/character/player.command.js')+'');
  

  if(message.content == `${préfix}omg` )
  {
    message.channel.send("Malgrès vent et marrée, je suis de retour !")
  }

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
       message.channel.send(help_embed);
  }

})
 
