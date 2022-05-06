const { MessageEmbed } = require("discord.js")
const PlayerCreationFunction = require("../../functions/character/creation.function.js")

module.exports = 
{
    name: 'vente-taverne',
    description: "Permet d'encaisser une vente dans la taverne",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser la commande /vente-taverne")
    },
    options:
    [
        {
            name: "type",
            description: "type d'argent",
            type: "STRING",
            required: true,
            choices:
            [
                { name: "bronze", value: "bronze" },
                { name: "argent", value: "argent" },
                { name: "or", value: "or" },
            ]
        },

        {
            name: "nombre",
            description: "argent de la vente",
            type: "NUMBER",
            required: true,
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        let money = interaction.options.get("type").value
        let nombre = interaction.options.get("nombre").value
        let id = interaction.member.user.id


        const playerCreationFunction = new PlayerCreationFunction()
        let user = await playerCreationFunction.getPlayerById(id.replace(/[<@!>]/gm,""))
        user = user[0]

        if(money == "bronze") user.money[0] += nombre / 2
        else if(money == "argent") user.money[1] += nombre / 2
        else if(money == "or") user.money[2] += nombre / 2

        await playerCreationFunction.editPlayerById(id, user)

        let embed = new MessageEmbed()
        .setTitle("Vente")
        .setColor("#00FF00")
        .setDescription(`Vous avez bien reçu le paiement vous gagnez ${money} ${nombre / 2}`)
        
        await interaction.reply({embeds: [embed]})

    }
}