const { MessageActionRow, MessageButton  } = require("discord.js")
const MessageFunction = require("../../functions/gestion/message.function.js")

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
    name: 'rank-guild',
    runSlash: async (client, interaction) => 
    {   
        const messageFunction = new MessageFunction()

        const message = await messageFunction.getMessageByIdInteraction(interaction.message.id, interaction)
        
        let embed = message.embeds[0]

        embed.description = "> **Liliana** : `Voici les différents rangs au sein de la guilde, chaque rang vous permet d'accéder à des quetes plus compliqué mais rapporte bien plus d'argent`"
        embed.addField("__🔰Bronze__", "_Le rang débutant que vous gagnez quand vous rejoingnez la guilde, elle vous donne accés aux quêtes de niveau bronze_")
        embed.addField("__🔰Fer__", "**description: **_Le rang fer ce gagne une fois vous avez prouvez votre valeur au sein de la guilde_\n**condition:** avoir terminé 5 quêtes du rang précédent\n**quête possible:** fer ou moins")
        embed.addField("__🔰Argent__", "**description: **_Le rang argent prouve que vous êtes un aventurier aguerris de la guilde_\n**condition:** avoir terminé 10 quêtes du rang précédent\n**quête possible:** arg ou moins")
        embed.addField("__🔰Gold__", "**description: **_Le rang or fait de vous quelqu'un de respecter au sein de la guilde_\n**condition:** avoir terminé 10 quêtes du rang précédent\n**quête possible:** or ou moins")
        embed.addField("__🔰Platine__", "**description: **_Le rang platine ne ce gagne pas facilement vous pouvez en être fier_\n**condition:** avoir terminé 15 quêtes du rang précédent\n**quête possible:** platine ou moins")
        embed.addField("__🔰Mithril__", "**description: **_Le rang mithril est un rang que peu de monde ont atteint vous êtes quelqu'un qui succiste l'admiration_\n**condition:** avoir terminé 15 quêtes du rang précédent\n**quête possible:** mithril ou moins")
        embed.addField("__🔰Orichalque__", "**description: **_Le rang Orichalque est extrement dur à atteindre, les membres ayant ce rang ce compte sur les doigts des mains_\n**condition:** avoir terminé 20 quêtes du rang précédent\n**quête possible:** orichalque ou moins")
        embed.addField("__🔰Adamantite__", "**description: **_Le rang Adamantite prouve que vous êtes l'un des meilleurs aventurier du pays et beaucoup vous admire !_\n**condition:** avoir terminé 35 quêtes du rang précédent\n**quête possible:** toutes")

        await messageFunction.editMessageByIdInteraction(interaction.message.id, interaction, embed) 
        await messageFunction.editMessageButtonsByIdInteraction(interaction.message.id, interaction, buttons) 
        await interaction.reply({ ephermal: true, fetchReply: true })
    }
}