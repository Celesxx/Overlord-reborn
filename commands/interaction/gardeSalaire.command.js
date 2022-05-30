const { MessageEmbed } = require("discord.js")
const PlayerCreationFunction = require("../../functions/character/creation.function.js")
const ExperienceFunction = require("../../functions/character/level.function.js")

module.exports = 
{
    name: 'salaire-garde',
    description: "Permet de gagner votre salaire journalier",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser la commande /salaire-garde")
    },
    options:
    [
        {
            name: "grade",
            description: "votre rang au sein de la garde",
            type: "STRING",
            required: true,
            choices:
            [
                { name: "rookie", value: "rookie" },
                { name: "garde", value: "garde" },
                { name: "sergent", value: "sergent" },
                { name: "lieutenant", value: "lieutenant" },
                { name: "capitaine", value: "capitaine" },
            ]
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        let rank = interaction.options.get("grade").value
        let id = interaction.member.user.id

        let gain = 
        [
            {rank: "rookie", xp: 1, bronze: 10, argent: 0},
            {rank: "garde", xp: 3, bronze: 50, argent: 0},
            {rank: "sergent", xp: 5, bronze: 0, argent: 1},
            {rank: "lieutenant", xp: 8, bronze: 50, argent: 1},
            {rank: "capitaine", xp: 10, bronze: 0, argent: 2},
        ]

        const playerCreationFunction = new PlayerCreationFunction()
        const experienceFunction = new ExperienceFunction()

        let user = await playerCreationFunction.getPlayerById(id.replace(/[<@!>]/gm,""))
        let xpNeed = await experienceFunction.getXpNeedByLvl(user[0].lvl + 1)

        user = user[0]
        let result

        gain.map(type =>
        {
            if(type.rank == rank)
            {
                user.money[0] += type.bronze
                user.money[1] += type.argent
                user.xp += parseInt((xpNeed * type.xp / 100).toFixed(1))
                result = `${parseInt((xpNeed * type.xp / 100).toFixed(1))} xp ainsi que ${type.bronze != 0 ? `${type.bronze} bronze` : ""} ${type.argent != 0 ? `${type.argent} argent`: ""} `
            }
        })

        await playerCreationFunction.editPlayerById(id, user)

        let embed = new MessageEmbed()
        .setTitle("Salaire")
        .setColor("#00FF00")
        .setDescription(`Vous avez bien reçu votre salaire pour la journée vous gagnez ${result}`)
        
        await interaction.reply({embeds: [embed]})

    }
}