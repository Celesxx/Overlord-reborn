const { CachedManager } = require("discord.js");
require("dotenv").config();

const prefix = process.env.PREFIX

module.exports = 
{
    name: 'messageCreate',
    once: false,
    execute(client, message) 
    {
        if(message.author.bot) return;
        if(!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const commandName = args.shift().toLowerCase()
        if(commandName.length == 0) return

        let command = client.commands.get(commandName)
        if(command) command.run(client, message, args)
    }
}