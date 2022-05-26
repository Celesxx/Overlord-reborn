const LogCombatFunction = require("../../functions/gestion/logCombat.function.js")
const MessageFunction = require("../../functions/gestion/message.function.js")

module.exports = 
{
    name: 'fuite',
    description: "commande à faire pour prendre la fuite d'un combat",
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

        const user = interaction.member.user.id
        let luck = Math.floor(Math.random() * 100)

        let order = embed.fields.slice(3)[0].value.split("\n")
        let userOrder = order.filter(participant => participant.includes(user)).join("")
        console.log(userOrder)
        
        if
        (
            logCombat.length != 0 && logCombat[0].participant.includes(`<@${user}>`) && userOrder.includes(":x:") && luck <= 89
            ||
            logCombat.length != 0 && logCombat[0].participant.includes(`<@!${user}>`) && userOrder.includes(":x:") && luck <= 89
        )
        {
            userOrder = `:white_check_mark:<@${userOrder.replace(/[:x<@> ]/gm, "")}>`
            embed.fields.slice(-1)[0].value = `<@${user}> viens de prendre la fuite !`
            order = order.filter(participant => !participant.includes(user))
            
        }else if(userOrder.includes(":x:") && luck >= 90)
        {
            userOrder = `:white_check_mark:<@${userOrder.replace(/[:x<@> ]/gm, "")}>`
            embed.fields.slice(-1)[0].value = `<@${user}> tente de prendre la fuite, mais c'est un échec !`
            order.forEach( (value, id) =>  {if(value.includes(user)) order[id] = userOrder }) 
            
        }else if(!userOrder.includes(":x:"))
        {
            embed.fields.slice(-1)[0].value = `<@${user}> tente de prendre la fuite mais il à déja effectué son action pour ce tour !`
        }

        if(!order.some(member => member.includes(":x:")))
        {
            order.forEach((value, id) => 
            {
                order[id] = order[id].replace(":white_check_mark:", ":x:")
            })
            embed.fields.slice(2)[0].value = `${parseInt(embed.fields.slice(2)[0].value) + 1}`
        }

        embed.fields.slice(3)[0].value = order.join("\n") // edit le field "Ordre du combat"
        logCombat[0].participant = order

        await logCombatFunction.endLogCombat(combatId, logCombat)
        await logCombatFunction.FuiteLogCombat(combatId, logCombat, { event : embed.fields.slice(-1)[0].value, number: embed.fields.slice(2)[0].value } )
        await messageFunction.editMessageByIdInteraction(logCombat[0].messageId, interaction, embed) 

        await interaction.reply({ ephermal: true, content: '** **' })
        await interaction.deleteReply()

    }
}