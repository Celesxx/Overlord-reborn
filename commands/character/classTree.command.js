const { MessageEmbed } = require("discord.js")
const PlayerCreationFunction = require("../../functions/character/creation.function.js")

module.exports = 
{
    name: 'test',
    description: "Affiche l'arbre d'évolution des classes",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /classe-evolution")
    },
    options:
    [
        {
            name: "classe",
            description: "choisis la classe voulue entre combattant, mage et voleur",
            type: "STRING",
            required: false,
            choices:
            [
                {
                    name: "combattant",
                    value: "combattant"
                },
                {
                    name: "mage",
                    value: "mage"
                },
                {
                    name: "voleur",
                    value: "voleur"
                }
            ]
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        let choices = interaction.options.get("classe").value
        let arbres = 
        {
            "combattant": ["https://cdn.discordapp.com/attachments/345351140013244417/967457498271465553/Duelli_1.png","297FB9"],
            "voleur":["https://cdn.discordapp.com/attachments/345351140013244417/967477812443381901/voleur.png","FE7B7B"],
            "mage":["https://cdn.discordapp.com/attachments/345351140013244417/967522392756867092/mage.png","01CBFE"]
        }

        let arbre = arbres[choices]

        var embedArbre = new MessageEmbed()
        .setColor('#'+arbre[1])
        .setTitle("Arbre du " + choices)
        .setImage(arbre[0]);  
            
        await interaction.reply({ ephermal: true, content: '** **' })
        await interaction.deleteReply()
        await interaction.channel.send({embeds: [embedArbre]})

    }
}