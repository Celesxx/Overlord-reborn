const { MessageEmbed } = require("discord.js")
const PlayerCreationFunction = require("../../functions/character/creation.function")

module.exports = 
{
    name: 'reset-character',
    description: "permet d'ajouter les monstres à la bdd",
    run: async (client, message, args) => 
    {
        

    },
    runSlash: (client, interaction) => 
    {

        if(interaction.member.roles.cache.some(role => role.name === 'Fondateur'))
        {
            
            const inventaireFunction = new InventaireFunction()
            const playerCreationFunction = new PlayerCreationFunction()

            let players = await playerCreationFunction.getAllPlayers()

        }
    }

}