const { Client, Collection, MessageEmbed, MessageAttachment, Intents }  = require('discord.js');
const allIntents = new Intents(98045)
const client = new Client({ intents: allIntents })
const mongoose = require('mongoose');
require("dotenv").config();


// client.commands = new Collection()
// client.buttons = new Collection()

['commands', 'buttons', 'selects'].forEach(x => client[x] = new Collection())
const utils = ['command.util', 'event.util', 'button.util', 'select.util']
utils.forEach(handler => { require(`./utils/handlers/${handler}`)(client)})

process.on('exit', code => { console.log(`_____________⚠️ Erreur ⚠️_____________\nServer status : Le processes s'est arrété avec le code => ${code}\n____________________________________`)})
process.on('uncaughtException', (err, origin) => {console.log(`_____________⚠️ Erreur ⚠️_____________\nServer status : UNCAUGHT_EXCEPTION => ${err}\nServer status: source du problème => ${origin}\n____________________________________`)})
process.on('unhandledRejection', (reason, promise) => 
{
  if(reason != "DiscordAPIError: Cannot send an empty message")
  {
    console.log(`_____________⚠️ Erreur ⚠️_____________`)
    console.log(`Server status : UNHANDLED_REJECTION ${reason}`)
    console.log(`Server status: source du problème =>`)
    console.log(promise)
    console.log(`____________________________________`)
  }
})
process.on('warning', (...args) => 
{
  console.log(`_____________⚠️ Warning ⚠️_____________`)
  console.log(...args)
  console.log(`____________________________________`)
})


client.login(process.env.ZELGIUSBOTTOKEN)
// client.login(process.env.OVERLORDTOKEN)

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