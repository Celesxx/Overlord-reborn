const LogCombatFunction = require("../../functions/gestion/logCombat.function.js")
const MessageFunction = require("../../functions/gestion/message.function.js")

module.exports = 
{
    name: 'rejoindre',
    description: "Permet de rejoindre un combat déja en cours !",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /rejoindre")
    },
    options:
    [
        {
            name: "id",
            description: "id du combat que vous voulez rejoindre",
            type: "STRING",
            required: true,
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        let user = interaction.member.user.id
        let combatId = interaction.options.get("id").value

        const logCombatFunction = new LogCombatFunction()
        const messageFunction = new MessageFunction()
        
        const logCombat = await logCombatFunction.getLogCombatById(combatId)
        if(logCombat.length != 0 && !logCombat[0].participant.includes(`<@${user}>`))
        {
            const embedData = await messageFunction.getMessageByIdInteraction(logCombat[0].messageId, interaction)
            let embed = embedData.embeds[0]

            embed.fields.slice(3)[0].value = `${embed.fields.slice(3)[0].value} \n:white_check_mark: <@${user}>`
            embed.fields.slice(-1)[0].value = `<@${user}> viens de rejoindre le combat !`
            await logCombatFunction.JoinLogCombat(combatId, logCombat, embed.fields.slice(-1)[0].value, `<@${user}>`)
            await messageFunction.editMessageByIdInteraction(logCombat[0].messageId, interaction, embed) 

        }else if(logCombat[0].participant.includes(`<@${user}>`))
        {
            interaction.channel.send("Vous êtes déja présent dans le combat !")
        }else
        {
            interaction.channel.send("l'id du combat n'est pas valide !")
        }
        await interaction.reply({ ephermal: true, content: '** **' })
        await interaction.deleteReply()
    }
}