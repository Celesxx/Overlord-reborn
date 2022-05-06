const { MessageEmbed } = require("discord.js")
const BestiaireFunction = require("../../functions/monstre/bestiaire.function.js")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = 
{
    name: 'bdd-monstre',
    description: "permet d'ajouter les monstres à la bdd",
    run: async (client, message, args) => 
    {
        if(message.member.roles.cache.some(role => role.name === 'Fondateur' || role.name === 'Administrateur'))
        {
            const file = message.attachments.first()?.url
            if (!file) console.log('Il manque le fichier json');

            const response = Promise.resolve(fetch(file))
            response.then(async response =>
            {
                if (!response.ok) message.channel.send('Une erreur est survenue',response.statusText,)

                const text = await response.text()

                if (text) 
                {
                    data = JSON.parse(text)
                    const bestiaireFunction = new BestiaireFunction()

                    const timer = ms => new Promise(res => setTimeout(res, ms))

                    for(const [key, value] of Object.entries(data))
                    {
                        const response = await bestiaireFunction.monstreCreation(value)
    
                        let embed = new MessageEmbed()

                        if(response.state == false) 
                        {
                            embed.addField(`${value.nomId}`, `${response.log}`)
                            embed.setColor("#ff0000")
                        }
                        else
                        {
                            embed.addField(`${value.nomId}`, `${response.message}`)
                            embed.setColor("#00ff00")
                        }

                        await timer(1000)
                            
                        message.channel.send({embeds: [ embed ]})
                        
                    }

                    message.channel.send("done")
                }
            })
        }
    },
   
    runSlash: async (client, interaction) => 
    {
        interaction.reply("merci d'utiliser ?bdd-monstre à la place")
    }
}