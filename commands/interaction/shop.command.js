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
    name: 'shop',
    description: "Permet d'afficher la boutique",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser la commande /shop")
    },
    runSlash: async (client, interaction) => 
    {   

        let embed = new MessageEmbed()
        .setTitle("Shop&Co")
        .setDescription("> **Oriax** : `Bienvenue chers client à la boutique Shop&Co ! Si je peux vous aider pour quoi que ce soit il ne faut pas hésiter, je suis à votre disposition !`")
        .setImage("https://media.discordapp.net/attachments/951928506021998652/969382469692432475/48e951aeca534599fb39d8fdc02519b6.jpg")
        await interaction.reply({embeds: [embed], components: [buttons]})

    }
}