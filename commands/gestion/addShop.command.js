const { MessageEmbed } = require("discord.js")
const ShopFunction = require("../../functions/interface/shop.function.js")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = 
{
    name: 'bdd-shop',
    description: "permet d'ajouter les items du shop dans la bdd",
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
                    const shopFunction = new ShopFunction()

                    const timer = ms => new Promise(res => setTimeout(res, ms))

                    for(const [key, value] of Object.entries(data))
                    {
                        const response = await shopFunction.shopCreation(value)

                        let embed = new MessageEmbed()
                        .addField(`${response.shop.nomId}`, `${response.message}`)

                        if(response.state == false) embed.setColor("#ff0000")
                        else embed.setColor("#00ff00")
                        await timer(1000)
                            
                        message.channel.send({embeds: [ embed ]})
                            
                    }

                    message.channel.send("Done")
                }
            })
        }
    },
   
    runSlash: async (client, interaction) => 
    {
        interaction.reply("merci d'utiliser ?bdd-arme à la place")
    }
}