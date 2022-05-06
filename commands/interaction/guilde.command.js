const { MessageEmbed, MessageActionRow, MessageButton  } = require("discord.js")

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
    name: 'guilde',
    description: "Permet d'afficher la guilde",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser la commande /guilde")
    },
    runSlash: async (client, interaction) => 
    {   

        let embed = new MessageEmbed()
        .setTitle("Guilde des aventuriers")
        .setDescription("> **Liliana** : `Bienvenue à la guilde ! Que puis-je faire pour vous ?`")
        .setImage("https://media.discordapp.net/attachments/951928506021998652/971022791103111218/unknown.png")
        .setThumbnail("https://media.discordapp.net/attachments/951928506021998652/971059614621782126/ehJm5dp.gif")
        await interaction.reply({embeds: [embed], components: [buttons]})

    }
}