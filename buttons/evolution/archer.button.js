const PlayerCreationFunction = require("../../functions/character/creation.function.js")


module.exports = 
{
    name: 'archer',
    runSlash: async (client, interaction) => 
    {   
        let id = interaction.member.user.id

        const playerCreationFunction = new PlayerCreationFunction()
        let player = await playerCreationFunction.getPlayerById(id.replace(/[<@!>]/gm, ""))
        player = player[0]

        player.classe = "archer"
        
        await playerCreationFunction.editPlayerById(id, player)
        interaction.reply(`Vous avez choisis la classe archer !`)

    }
}