const { MessageEmbed } = require("discord.js")
const PlayerCreationFunction = require("../../functions/character/creation.function.js")

module.exports = 
{
    name: 'regeneration',
    description: "Permet de régénérer vos statistiques",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /")
    },
    options:
    [
        {
            name: "time",
            description: "temps depuis la dernière régénération",
            type: "NUMBER",
            required: true,
            choices:
            [
                {
                    name: "plus de 2 heure",
                    value: 2
                },
                {
                    name: "plus de 4 heure",
                    value: 4
                },
                {
                    name: "plus de 6 heure",
                    value: 6
                },
                {
                    name: "plus de 12 heure",
                    value: 12
                }
            ]
        },
        {
            name: "type",
            description: "type de régénération",
            type: "STRING",
            required: true,
            choices:
            [
                {
                    name: "hp",
                    value: "hp"
                },
                {
                    name: "mana",
                    value: "mana"
                }
            ]
        }

    ],
    runSlash: async (client, interaction) => 
    {   
        let time = interaction.options.get("time").value
        let type = interaction.options.get("type").value
        let id = interaction.member.user.id
        let gain = 0
        
        const playerCreationFunction = new PlayerCreationFunction()
        let player = await playerCreationFunction.getPlayerById(id)
        
        player = player[0]
        let embed = new MessageEmbed()
        .setTitle("Régénération")
        .setColor("#00FF00")
        
        if(type == "hp")
        {
            if(time == 2) 
            {
                gain = player.hp[1] * 25 / 100
                player.hp[0] += player.hp[1] * 25 /100
            }
            else if(time == 4) 
            {
                gain = player.hp[1] * 50 /100
                player.hp[0] += player.hp[1] * 50 /100
            }
            else if(time == 6) 
            {
                gain = player.hp[1] * 70 /100
                player.hp[0] += player.hp[1] * 75 /100
            }
            else if(time == 12)
            {
                gain = player.hp[1]
                player.hp[0] = player.hp[1]
            }

            player.hp[0] = Math.round(player.hp[0])
            if(player.hp[0] > player.hp[1]) player.hp[0] = player.hp[1]


        }else
        {
            if(time == 2) 
            {
                gain = player.magie[1] * 25 /100
                player.magie[0] += player.magie[1] * 25 /100
            }
            else if(time == 4) 
            {
                gain = player.magie[1] * 50 /100
                player.magie[0] += player.magie[1] * 50 /100
            }
            else if(time == 6) 
            {
                gain = player.magie[1] * 70 /100
                player.magie[0] += player.magie[1] * 75 /100
            }
            else if(time == 12)
            {
                gain = player.magie[1]
                player.magie[0] = player.magie[1]
            }

            player.magie[0] = Math.round(player.magie[0])
            if(player.magie[0] > player.magie[1]) player.magie[0] = player.magie[1]
        }

        await playerCreationFunction.editPlayerById(id,player)
        interaction.member.setNickname(player.prenom + " [❤️" + player.hp[0] + "] [✨" + player.magie[0] + "]")

        embed.setDescription(`Vous avez récupéré ${gain} ${type}`)

        await interaction.reply({embeds: [embed]})

    }
}