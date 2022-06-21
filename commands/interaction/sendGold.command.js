const { MessageEmbed } = require("discord.js")
const PlayerCreationFunction = require("../../functions/character/creation.function.js")

module.exports = 
{
    name: 'give-argent',
    description: "Permet de donner de l'argent à quelqu'un",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser la commande /give-argent")
    },
    options:
    [
        {
            name: "player",
            description: "ping de la personne concerné",
            type: "MENTIONABLE",
            required: true,
        },
        {
            name: "bronze",
            description: "nombre de pièce de bronze",
            type: "NUMBER",
            required: false,
        },
        {
            name: "argent",
            description: "nombre de pièce d'argent",
            type: "NUMBER",
            required: false,
        },
        {
            name: "or",
            description: "nombre de pièce d'or",
            type: "NUMBER",
            required: false,
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        let player = interaction.options.get("player").value
        let bronze = interaction.options.get("bronze")
        let argent = interaction.options.get("argent")
        let or = interaction.options.get("or")
        let id = interaction.member.user.id


        const playerCreationFunction = new PlayerCreationFunction()
        let userSender = await playerCreationFunction.getPlayerById(id.replace(/[<@!>]/gm,""))
        let userReceiver = await playerCreationFunction.getPlayerById(player.replace(/[<@!>]/gm,""))
        userSender = userSender[0]
        userReceiver  = userReceiver[0]

        if(bronze == undefined || null && argent == undefined || null && or == undefined || null) await interaction.reply("Il faut indiquer une somme à donner !")
        else
        {
            result = []
            if(bronze != undefined && bronze != null && userSender.money[0] - bronze.value > 0) 
            {
                userSender.money[0] -= bronze.value
                userReceiver.money[0] += bronze.value
                result.push(`${bronze.value} bronze`)
            }
            else if(argent != undefined && bronze != null && userSender.money[0] - bronze.value <= 0) 
            {
                interaction.reply("Vous n'avez pas assez de bronze pour faire cela")
                return
            }


            if(argent != undefined && argent != null && userSender.money[1] - argent.value > 0) 
            {
                userSender.money[1] -= argent.value
                userReceiver.money[1] += argent.value
                result.push(`${argent.value} argent`)
            }
            else if(argent != undefined && argent != null && userSender.money[1] - argent.value <= 0) 
            {
                interaction.reply("Vous n'avez pas assez d'argent pour faire cela")
                return
            }


            if(or != undefined && or != null && userSender.money[2] - or.value > 0) 
            {
                userSender.money[2] -= or.value
                userReceiver.money[2] += or.value
                result.push(`${or.value} or`)
            }
            else if(argent != undefined && or != null && userSender.money[2] - or.value <= 0) 
            {
                interaction.reply("Vous n'avez pas assez d'or pour faire cela")
                return
            }

            console.log(result)

            await playerCreationFunction.editPlayerById(id.replace(/[<@!>]/gm,""), userSender)
            await playerCreationFunction.editPlayerById(player.replace(/[<@!>]/gm,""), userReceiver)

            let embed = new MessageEmbed()
            .setTitle("Vente")
            .setColor("#00FF00")
            .setDescription(`Vous avez donné :\n${result.join("\n")}`)
            
            await interaction.reply({embeds: [embed]})
        }
    }
}