const LogCombatFunction = require("../../functions/gestion/logCombat.function.js")
const MessageFunction = require("../../functions/gestion/message.function.js")

module.exports = 
{
    name: 'bdd-monstre',
    description: "permet d'ajouter les monstres à la bdd",
    run: (client, message, args) => 
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

                    let embed = new Discord.MessageEmbed()
                    .setColor("#00ff00")
                    .setTitle("Création de monstre dans la bdd")

                    for(const [key, value] of Object.entries(data))
                    {
                        // console.log("key : ", key)
                        // console.log(value)
                        const response = await bestiaireFunction.monstreCreation(value)
    
                        if(response.state == false) embed.addField("Status", `${response.message}`)
                        else embed.addField(`${response.monstre.nom}`, `${response.log}` )
                            
                        
                    }

                    message.delete()
                    message.channel.send({embeds: [embed]})
                }
            })
        }
    },
   
    runSlash: async (client, interaction) => 
    {
        interaction.reply("merci d'utiliser ?bdd-monstre à la place")
    }
}