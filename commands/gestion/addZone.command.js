const { MessageEmbed } = require("discord.js")
const ZoneFunction = require("../../functions/interface/zone.function.js")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = 
{
    name: 'bdd-zone',
    description: "permet d'ajouter les zones à la bdd",
    run: async (client, message, args) => 
    {
        if(message.member.roles.cache.some(role => role.name === 'Fondateur'))
        {
            const file = message.attachments.first()?.url
            if (!file) console.log('Il manque le fichier json');

            const response = await fetch(file)
            if (!response.ok) message.channel.send('Une erreur est survenue',response.statusText,)

            const text = await response.text()
            if (text) 
            {
                data = JSON.parse(text)
                const zoneFunction = new ZoneFunction()

                const timer = ms => new Promise(res => setTimeout(res, ms))

                for(const [key, value] of Object.entries(data))
                {
                    const response = await zoneFunction.zoneCreation(value)
                    
                    let embed = new MessageEmbed()

                    if(response.state == false) 
                    {
                        embed.addField(`${value.nom}`, `${response.log}`)
                        embed.setColor("#ff0000")
                    }
                    else
                    {
                        embed.addField(`${value.nom}`, `${response.message}`)
                        embed.setColor("#00ff00")
                    }

                    await timer(1000)
                        
                    message.channel.send({embeds: [ embed ]})
                }

                message.delete()
                message.channel.send({embeds: [embed]})
            }
        }
    },
   
    runSlash: async (client, interaction) => 
    {
        interaction.reply("merci d'utiliser ?bdd-zone à la place")
    }
}