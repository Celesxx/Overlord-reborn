const { MessageEmbed } = require("discord.js")

module.exports = 
{
    name: 'getallchannel',
    description: 'affiche tous les channels du serveur',
    run: (client, message, args) => 
    {
        if(message.member.roles.cache.some(role => role.name === 'Administrateur'))
        {

            let channels = message.guild.channels.cache
            let embed = new MessageEmbed().setTitle("Affichage de tous les channels !")
            let embed2 = new MessageEmbed()
            let embed3 = new MessageEmbed()
            i = 0
            for (const channel of channels) 
            {
                if(i <= 24) embed.addField(`${channel[1].name}`, `${channel[1].id}`)
                else if(i <= 49) embed2.addField(`${channel[1].name}`, `${channel[1].id}`)
                else embed3.addField(`${channel[1].name}`, `${channel[1].id}`)
                i++
            }

            message.channel.send({embeds: [embed, embed2, embed3]})

        }
    },
    runSlash: (client, interaction) => 
    {

        if(interaction.member.roles.cache.some(role => role.name === 'Administrateur'))
        {

            let channels = interaction.guild.channels.cache
            let embed = new MessageEmbed().setTitle("Affichage de tous les channels !")
            let embed2 = new MessageEmbed()
            let embed3 = new MessageEmbed()
            let i = 0

            for (const channel of channels) 
            {
                if(i <= 24) embed.addField(`${channel[1].name}`, `${channel[1].id}`)
                else if(i <= 49) embed2.addField(`${channel[1].name}`, `${channel[1].id}`)
                else embed3.addField(`${channel[1].name}`, `${channel[1].id}`)
                i++
            }

            interaction.reply({embeds: [embed, embed2, embed3]})

        }else interaction.replay("Cette commande est réservé aux administrateurs !")
    }
}