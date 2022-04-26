const { MessageEmbed } = require("discord.js")
const PlayerCreationFunction = require("../../functions/character/creation.function.js")

module.exports = 
{
    name: 'nomrp',
    description: "Permet d'actualiser son nickname",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /nomRp")
    },
    runSlash: async (client, interaction) => 
    {   
        let id = interaction.member.user.id
        const playerCreationFunction = new PlayerCreationFunction()
        playerCreationFunction.setNameRp(interaction, id)
        interaction.reply("Done !")
    }
}