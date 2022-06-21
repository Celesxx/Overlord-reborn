const { MessageEmbed } = require("discord.js")
const LogCombatFunction = require("../../functions/gestion/logCombat.function.js")
const MessageFunction = require("../../functions/gestion/message.function.js")

module.exports = 
{
    name: 'exclure',
    description: "Permet de virer quelqu'un du combat en cours",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /exclure")
    },
    options:
    [
        {
            name: "id",
            description: "id du combat",
            type: "STRING",
            required: true,
        },
        {
            name: "joueur",
            description: "ping de la personne",
            type: "MENTIONABLE",
            required: true,
        },
    ],
    runSlash: async (client, interaction) => 
    {   
        if(interaction.member.roles.cache.some(role => role.name === 'Fondateur' || role.name === "Administrateur" || role.name === "Helper"))
        {
            const combatId = interaction.options.get("id").value
            const user = interaction.options.get("joueur").value.replace(/[<@!>]/, "")

            const logCombatFunction = new LogCombatFunction()
            const messageFunction = new MessageFunction()
    
            const logCombat = await logCombatFunction.getLogCombatById(combatId)
            const embedData = await messageFunction.getMessageByIdInteraction(logCombat[0].messageId, interaction)

            let order = embedData.embeds[0].fields.slice(3)[0].value.split("\n").filter(participant => !participant.includes(`${user}`))
            embedData.embeds[0].fields.slice(3)[0].value = order.join("\n")
            logCombat[0].participant = logCombat[0].participant.filter(target => !target.includes(`${user}`))

            await logCombatFunction.editLogCombat(combatId, logCombat)
            await messageFunction.editMessageByIdInteraction(logCombat[0].messageId, interaction, embedData.embeds[0]) 

            await interaction.reply({ ephermal: true, content: '** **' })
            await interaction.deleteReply()

        }else interaction.channel.send({content: "La commande est réservé aux membres du staff"})
    }
}