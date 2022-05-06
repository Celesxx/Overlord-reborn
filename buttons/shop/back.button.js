const MessageFunction = require("../../functions/gestion/message.function.js")
const { MessageEmbed, MessageActionRow, MessageButton  } = require("discord.js")

const buttons = new MessageActionRow()
.addComponents
(
    new MessageButton()
    .setCustomId('armure')
    .setLabel('Voir les armures')
    .setStyle('PRIMARY'),

    new MessageButton()
    .setCustomId('arme')
    .setLabel('Voir les armes')
    .setStyle('SUCCESS'),

    new MessageButton()
    .setCustomId('divers')
    .setLabel('Voir vos bric à brac')
    .setStyle('DANGER'),
    
)

module.exports = 
{
    name: 'back-shop',
    runSlash: async (client, interaction) => 
    {   
        const messageFunction = new MessageFunction()

        let embed = new MessageEmbed()
        .setTitle("Shop&Co")
        .setDescription("> **Oriax** : `Bienvenue chers client à la boutique Shop&Co ! Si je peux vous aider pour quoi que ce soit il ne faut pas hésiter, je suis à votre disposition !`")
        .setImage("https://media.discordapp.net/attachments/951928506021998652/969382469692432475/48e951aeca534599fb39d8fdc02519b6.jpg")

        await messageFunction.editMessageByIdInteraction(interaction.message.id, interaction, embed) 
        await messageFunction.editMessageButtonsByIdInteraction(interaction.message.id, interaction, buttons) 
        await interaction.reply({ ephermal: true, fetchReply: true})

    }
}