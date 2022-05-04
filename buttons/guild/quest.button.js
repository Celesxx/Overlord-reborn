const { MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js")
const MessageFunction = require("../../functions/gestion/message.function.js")
const quest = require("../../bdd/quest.json")

const buttons = new MessageActionRow()
.addComponents
(
    
    new MessageButton()
    .setCustomId('previous-guild')
    .setLabel('⟵')
    .setStyle('PRIMARY'), 
)

module.exports = 
{
    name: 'quest-guild',
    runSlash: async (client, interaction) => 
    {   
        const messageFunction = new MessageFunction()
        const message = await messageFunction.getMessageByIdInteraction(interaction.message.id, interaction)
        const select = new MessageActionRow()
        let selectMenu = new MessageSelectMenu()
        .setCustomId('select-quest')
        .setPlaceholder('Afficher les autres quêtes')
        .addOptions({label: "bronze", value: "bronze"})
        // .addOptions({label: "fer", value: "fer"})
        // .addOptions({label: "argent", value: "argent"})
        // .addOptions({label: "or", value: "or"})
        // .addOptions({label: "platine", value: "platine"})
        // .addOptions({label: "mithril", value: "mithril"})
        // .addOptions({label: "orichalque", value: "orichalque"})
        // .addOptions({label: "adamantite", value: "adamantite"})

        const bronzeQuest = quest["bronze"]
        let embed = message.embeds[0]
        let i = 0

        embed.description = "**Liliana** : `Voici les quêtes disponibles, cependant attention de ne pas prendre des quêtes qui ne sont pas de votre rang !`"

        bronzeQuest.quete.forEach(quete => 
        { 
            console.log(quete)
            embed.addField(`📜quête #${i}`, `**gain**: _${quete.gain}_\n**description**: _${quete.description}_`) 
            i++
        })

        select.addComponents(selectMenu)
        
        await messageFunction.editMessageByIdInteraction(interaction.message.id, interaction, embed) 
        await messageFunction.editMessageComponentsByIdInteraction(interaction.message.id, interaction, buttons, select) 
        await interaction.reply({ ephermal: true, fetchReply: true })
    }
}