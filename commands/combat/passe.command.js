const LogCombatFunction = require("../../functions/gestion/logCombat.function.js")
const MessageFunction = require("../../functions/gestion/message.function.js")

module.exports = 
{
    name: 'passe',
    description: "Permet de passer un tour",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /passe")
    },
    options:
    [
        {
            name: "id",
            description: "id du combat dans lequel vous voulez passer votre tour",
            type: "STRING",
            required: true,
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        let combatId = interaction.options.get("id").value
        let user = interaction.member.user.id

        const logCombatFunction = new LogCombatFunction()
        const messageFunction = new MessageFunction()
        
        const logCombat = await logCombatFunction.getLogCombatParticipantId(user)
        if(logCombat.length == 0) interaction.channel.send("Vous n'êtes présent dans aucun combat !")
        else if(logCombat.length > 1) interaction.channel.send("Vous êtes présent dans deux fight en même temps merci de vérifier d'avoir bien fais la commande /fin une fois vos précédent combat terminé")
        else
        {
            const embedData = await messageFunction.getMessageByIdInteraction(logCombat[0].messageId, interaction)

            let embed = embedData.embeds[0]
            let order = embed.fields.slice(3)[0].value.split("\n")
            let userOrder = order.filter(participant => participant.includes(user)).join("")

            if(userOrder.includes(":x:"))
            {
                userOrder = `:white_check_mark:<@${userOrder.replace(/[:x<@> ]/gm, "")}>` 
                order.forEach( (value, id) =>  { if(value.includes(user)) order[id] = userOrder }) 
                embed.fields.slice(-1)[0].value = "Vous avez passé votre tour !"  
            }
            else if(userOrder.includes(":white_check_mark:")) embed.fields.slice(-1)[0].value = `<@${user}> à déja effectué son action pour ce tour !`   
            
            if(!order.some(member => member.includes(":x:")))
            {
                order.forEach((value, id) => 
                {
                    order[id] = order[id].replace(":white_check_mark:", ":x:")
                })
                embed.fields.slice(2)[0].value = `${parseInt(embed.fields.slice(2)[0].value) + 1}`
            }

            embed.fields.slice(3)[0].value = order.join("\n")

            await logCombatFunction.addEventTurnLogCombatByName(combatId, logCombat[0], { number: embed.fields.slice(2)[0].value, event: embed.fields.slice(-1)[0].value })
            await messageFunction.editMessageByIdInteraction(logCombat[0].messageId, interaction, embed) 
        }

        await interaction.reply({ ephermal: true, content: '** **' })
        await interaction.deleteReply()
    }
}