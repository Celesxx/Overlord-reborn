const { Console } = require('console')
const Discord = require('discord.js')
const { DiscordMenus, ButtonBuilder, MenuBuilder } = require('discord-menus');
const { Client, MessageEmbed, Intents, MessageAttachment }  = require('discord.js');

const Canvas = require('canvas')
const { registerFont } = require('canvas')
const { performance } = require('perf_hooks');
const QuickChart = require('quickchart-js');
const bdd = require('./bdd/bdd.json')
const lvl = require('./bdd/lvl.json')
const monstre = require('./bdd/monstre.json')
const bddMonstre = require('./bdd/monstreCombat.json')
const liste_mobs = require('./bdd/stockage_mobs.json')
const bddShop = require('./bdd/bddShop.json')
const bddMeteo = require('./bdd/meteo.json')
const BestiaireController = require('./controllers/bestiaire.controller.js')
const ZoneController = require('./controllers/zone.controller.js')
const SkillController = require('./controllers/skill.controller.js')
const BestiaireFunction = require('./functions/bestiaire.function.js')
const SkillFunction = require('./functions/skill.function.js')
const CombatFunction = require('./functions/combat.function.js')
const ZoneFunction = require('./functions/zone.function.js')
const LogCombatFunction = require("./functions/logCombat.function.js")
const PerformanceFunction = require("./functions/performance.function.js")
const MessageFunction = require("./functions/message.function.js")
const CanvasCharacterFunction = require("./functions/design/character.function.js")
const LevelFunction = require("./functions/level.function.js")
const MeteoFunction = require("./functions/meteo.function.js")
const client = new Discord.Client()
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
let meteoFunction = new MeteoFunction()

const { send } = require('process')
const { channel } = require('diagnostics_channel')

var job = new Cron('01 16 18 * * *', meteoFunction.meteo(client))
job.start()

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


const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');
	let fontSize = 70;

	do {
		context.font = `${fontSize -= 10}px sans-serif`;
	} while (context.measureText(text).width > canvas.width - 300);

	return context.font;
};

client.on("message", async message =>
{

  if (!message.content.startsWith(préfix) || message.author.bot) return;

  const args = message.content.slice(préfix.length).split(/ +/g);
  const SuperArgs = message.content.slice().split(/ +/g);
  const second = message.content.split(/ +/g);
  const command = args.shift().toLowerCase();

  eval(fs.readFileSync(__dirname + '/data/bonus.js')+'');
  eval(fs.readFileSync(__dirname + '/data/calculatrice.js')+'');
  eval(fs.readFileSync(__dirname + '/data/enregistrement.js')+'');
  eval(fs.readFileSync(__dirname + '/data/immobilier.js')+'');
  eval(fs.readFileSync(__dirname + '/data/ptJoueur.js')+'');
  eval(fs.readFileSync(__dirname + '/data/systemeLevel.js')+'');
  eval(fs.readFileSync(__dirname + '/data/shop_palier1.js')+'');
  eval(fs.readFileSync(__dirname + '/data/shop.js')+'');
  eval(fs.readFileSync(__dirname + '/data/test.js')+'');

  eval(fs.readFileSync(__dirname + '/classe/classes.js')+'');
  eval(fs.readFileSync(__dirname + '/classe/evolution_classe.js')+''); 
  eval(fs.readFileSync(__dirname + '/classe/menu.js')+'');
  eval(fs.readFileSync(__dirname + '/classe/palier1_classe.js')+'');
  eval(fs.readFileSync(__dirname + '/classe/palier2_classe.js')+'');
  eval(fs.readFileSync(__dirname + '/classe/palier3_classe.js')+'');

  eval(fs.readFileSync(__dirname + '/monstre/monstre.js')+'');
  eval(fs.readFileSync(__dirname + '/monstre/palier1_foret.js')+'');
  eval(fs.readFileSync(__dirname + '/monstre/palier1_monstre_marécage.js')+'');
  eval(fs.readFileSync(__dirname + '/monstre/palier1_monstre.js')+'');
  eval(fs.readFileSync(__dirname + '/monstre/palier2_donjon.js')+'');

  eval(fs.readFileSync(__dirname + '/commands/bestiaire/bestiaire.command.js')+'');
  eval(fs.readFileSync(__dirname + '/commands/skill/skill.command.js')+'');
  eval(fs.readFileSync(__dirname + '/commands/zone/zone.command.js')+'');
  eval(fs.readFileSync(__dirname + '/commands/logs/combat.command.js')+'');
  eval(fs.readFileSync(__dirname + '/commands/other/channel.command.js')+'');

  eval(fs.readFileSync(__dirname + '/commands/combat/monstre.command.js')+'');
  eval(fs.readFileSync(__dirname + '/commands/combat/joueur.command.js')+'');
  eval(fs.readFileSync(__dirname + '/commands/combat/gestion.command.js')+'');
  
// * dada */
  function getUserFromMention(mention) {
    if (!mention) return;
  
    if (mention.startsWith('<@') && mention.endsWith('>')) {
      mention = mention.slice(2, -1);
  
      if (mention.startsWith('!')) {
        mention = mention.slice(1);
      }
  
      return mention;
    }
  }


  const ping = getUserFromMention(args[0])


  if(message.content == `${préfix}test1`)
  {
    let id = message.author.id
    const levelFunction = new LevelFunction()
    await levelFunction.verifLvlUp(id, message, client)
  }

  if(command === 'roll'){
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

  if(command === 'xp'){
    identifiant = message.author.id;

    bdd[identifiant].xp = bdd[identifiant].xp + 5;

    level = levelxp();
    if(bdd[identifiant].xp > level)

    Savebdd();
  }

  if(command === 'agrou'){
    autheur = message.author.id;
    id = getUserFromMention(args[0])
      i = 0
      if (message.member.roles.cache.has("939189314582085637")) {
        while(i < 15){
            message.channel.send("MIAOU MIAOUUUUUUUUUU " + "<@" + id + ">")
            message.channel.send("https://media4.giphy.com/media/KGfcnXIF8qHCThNb98/giphy.gif")
            message.channel.send("https://c.tenor.com/X4xXcYU30NkAAAAC/goat-cursed.gif")
            i = i + 1
        }
      } else {
        message.channel.send("gros con")
      }

  } 

  if(command === 'image'){
    id = message.author.id
    if(bdd[id]){
      bdd[id].apparence = args[0];
      Savebdd();
      message.channel.send("yes")
    }
  }

  
  if(command === 'supersortdelamortquitue'){
    autheur = message.author.id;
    id = getUserFromMention(args[0])
      i = 0
      if (message.member.roles.cache.has("939189314582085637")) {
        while(i < 9999){
            message.channel.send("Je déjeune, j'en ai pas pour très longtemps. " + "<@" + id + ">")
            message.channel.send("https://tenor.com/view/vietnam-flashback-cat-gif-18770750")
            i = i + 1
        }
      } else {
        message.channel.send("gros con")
      }

  } 
  

  if(message.content == `${préfix}test`)
    {
        message.channel.send("test validé")
    }

  

});


function Savebdd(){
  fs.writeFile("./bdd/bdd.json", JSON.stringify(bdd,null,4), (err) =>{

      if (err) message.channel.send("une erreur est survenue")

  })
}

function SavebddMonstre(){
  fs.writeFile("./bdd/monstreCombat.json", JSON.stringify(bddMonstre ,null,4), (err) =>{

      if (err) message.channel.send("une erreur est survenue")

  })
}

Savebdd()
 
