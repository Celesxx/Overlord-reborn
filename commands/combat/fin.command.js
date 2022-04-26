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
            required: true,
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        let combatId = interaction.options.get("id").value

        const logCombatFunction = new LogCombatFunction()
        const messageFunction = new MessageFunction()
        
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
        await interaction.reply({ ephermal: true, content: '** **' })
        await interaction.deleteReply()
    }
}