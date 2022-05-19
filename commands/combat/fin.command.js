const { MessageEmbed } = require("discord.js")
const LogCombatFunction = require("../../functions/gestion/logCombat.function.js")
const MessageFunction = require("../../functions/gestion/message.function.js")

module.exports = 
{
    name: 'fin',
    description: "Permet de terminer un combat",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /fin")
    },
    options:
    [
        {
            name: "id",
            description: "id du combat que vous voulez terminer",
            type: "STRING",
            required: false,
        },
        {
            name: "all",
            description: "channel dans lequel vous voulez terminer tout les combats",
            type: "CHANNEL",
            required: false,
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        let [combatId, channel] = []
        
        if(interaction.options.get("id")) combatId = interaction.options.get("id").value
        if(interaction.options.get("all")) 
        {
            channel = interaction.options.get("all").value
            channel = await client.channels.fetch(channel)
        }
        
        const logCombatFunction = new LogCombatFunction()
        const messageFunction = new MessageFunction()

        if(combatId != undefined && channel == undefined)
        {
            
            const logCombat = await logCombatFunction.getLogCombatById(combatId)
            const embedData = await messageFunction.getMessageByIdInteraction(logCombat[0].messageId, interaction)
            let embed = embedData.embeds[0]

            if(embed.author != undefined && embed.author.name == combatId)
            {
                embed.fields.slice(3)[0].value = "-"
                embed.fields.slice(-1)[0].name = ":coin: Récompense"
                embed.fields.slice(-1)[0].value = "Vous avez terminé votre combat, merci de faire la commande suivante `/recompense`"       
            }

            await logCombatFunction.endLogCombat(combatId, logCombat)
            await messageFunction.editMessageByIdInteraction(logCombat[0].messageId, interaction, embed) 
            
        
        }else if(combatId == undefined && channel != undefined)
        {
            if(interaction.member.roles.cache.some(role => role.name === 'Fondateur' || role.name === "Administrateur"))
            {
                const timer = ms => new Promise(res => setTimeout(res, ms))
                const logCombat = await logCombatFunction.getAllLogCombat()
                for(const log of logCombat) 
                {
                    console.log(channel.name)
                    console.log(log.channel)
                    if(!log.over && channel.name == log.channel)
                    {
                        const embedData = await messageFunction.getMessageByIdInteraction(log.messageId, interaction)
                        console.log(embedData)
                        let embed = embedData.embeds[0]
                        
                        if(embed.author != undefined)
                        {
                            embed.fields.slice(3)[0].value = "-"
                            embed.fields.slice(-1)[0].name = ":coin: Récompense"
                            embed.fields.slice(-1)[0].value = "Vous avez terminé votre combat, merci de faire la commande suivante `/recompense`"       
                        }

                        await logCombatFunction.endLogCombat(embed.author.name, [log])
                        await messageFunction.editMessageByIdInteraction(log.messageId, interaction, embed) 
                        
                        let embed1 = new MessageEmbed()
                        .setColor("#49b28b")
                        .setTitle(`Le combat #${log.combatId} viens d'être terminé !`)
                        await interaction.channel.send({embeds: [embed1]})
                        await timer(2500)  
                    }
                }
                await interaction.channel.send({content: "Terminé !"})
            }else interaction.channel.send({content: "La commande /fin avec l'option 'all' est réservé aux membres du staff"})
        }else
        {
            await interaction.channel.send({content: "Il faut choisir une seul option ! "})
        }

        await interaction.reply({ ephermal: true, content: '** **' })
        await interaction.deleteReply()
    }
}