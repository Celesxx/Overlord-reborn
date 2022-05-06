const { MessageEmbed } = require("discord.js")
const PlayerCreationFunction = require("../../functions/character/creation.function")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = 
{
    name: 'bdd-player-update',
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
                    const playerCreationFunction = new PlayerCreationFunction()

                    const timer = ms => new Promise(res => setTimeout(res, ms))

                    for(const player of data)
                    {

                        let response = await playerCreationFunction.editPlayerById(player.id, player)

                        let embed = new MessageEmbed()
                        

                        if(response.state == false) 
                        {
                            embed.addField(`${player.prenom} ${player.nom}`, `${response.log}`)
                            embed.setColor("#ff0000")
                        }
                        else
                        {
                            embed.addField(`${player.prenom} ${player.nom}`, `Le joueur est update !`)
                            embed.setColor("#00ff00")
                        }
                        await timer(1000)
                            
                        message.channel.send({embeds: [ embed ]})
                        
                            
                        
                    }
                }
            })
        }
    },
   
    runSlash: async (client, interaction) => 
    {
        interaction.reply("merci d'utiliser ?bdd-monstre à la place")
    }
}