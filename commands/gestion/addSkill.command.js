const { MessageEmbed } = require("discord.js")
const SkillFunction = require("../../functions/character/skill.function.js")

module.exports = 
{
    name: 'bdd-skill',
    description: "permet d'ajouter les skills à la bdd",
    run: async (client, message, args) => 
    {
        if(message.member.roles.cache.some(role => role.name === 'Fondateur'))
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
                    const skillFunction = new SkillFunction()

                    let embed = new MessageEmbed()
                    .setColor("#00ff00")
                    .setTitle("Création du skill dans la bdd")

                    for(const [key, value] of Object.entries(data))
                    {
                        const response = await skillFunction.skillCreation(value)
    
                        if(response.state == false) embed.addField("Status", `${response.message}`)
                        else embed.addField(`${response.skill.nom}`, `${response.log}` )     
                    }

                    message.delete()
                    message.channel.send({embeds: [embed]})
                }
            })
        }
    },
   
    runSlash: async (client, interaction) => 
    {
        interaction.reply("merci d'utiliser ?bdd-skill à la place")
    }
}