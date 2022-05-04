const MessageFunction = require("../../functions/gestion/message.function.js")
const { MessageActionRow, MessageButton  } = require("discord.js")

const buttons = new MessageActionRow()
.addComponents
(
    new MessageButton()
    .setCustomId('rank-guild')
    .setLabel('Informations sur les rangs')
    .setStyle('PRIMARY'),

    new MessageButton()
    .setCustomId('quest-guild')
    .setLabel('Voir les quêtes')
    .setStyle('SUCCESS'),
)

module.exports = 
{
    name: 'previous-guild',
    runSlash: async (client, interaction) => 
    {   
        const messageFunction = new MessageFunction()

        const message = await messageFunction.getMessageByIdInteraction(interaction.message.id, interaction)
        
        let embed = message.embeds[0]

        embed.fields = []
        embed.description = "> **Liliana** : `Bienvenue à la guilde ! Que puis-je faire pour vous ?`"
       
        await messageFunction.editMessageByIdInteraction(interaction.message.id, interaction, embed) 
        await messageFunction.editMessageButtonsByIdInteraction(interaction.message.id, interaction, buttons) 
        await interaction.reply({ ephermal: true, fetchReply: true })
    }
}