const PlayerCreationFunction = require("../../functions/character/creation.function.js")
const { MessageEmbed, MessageActionRow, MessageButton  } = require("discord.js")


module.exports = 
{
    name: 'evolution',
    description: "Permet de changer de classe si le level est suffisant",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /evolution")
    },
    runSlash: async (client, interaction) => 
    {   
        
        let id = interaction.member.user.id
        let lvlNeed = [90, 75, 60, 45, 30, 15]
        let evolution = 
        [ {}, {}, {}, {},
            {},
            {
                combattant: ["paladin", "chevalier"],
                mage: ["invocateur", "sorcier"],
                voleur: ["assassin", "rodeur"],
                ranger: ["archer", "bombardier"],
            }
        ]

        let IsEvoluting = false
        let buttons = new MessageActionRow()
        let embed = new MessageEmbed()
        

        const playerCreationFunction = new PlayerCreationFunction()
        let player = await playerCreationFunction.getPlayerById(id.replace(/[<@!>]/gm, ""))
        player = player[0]

        let i = 0
        for(const lvl of lvlNeed)
        {
            if(player.lvl >= lvl)
            {
                IsEvoluting = true
                for(const [key, value] of Object.entries(evolution[i]))
                {
                    if(player.classe == key)
                    {
                        buttons.addComponents
                        (
                            new MessageButton()
                            .setCustomId(value[0])
                            .setLabel(value[0])
                            .setStyle('PRIMARY'),

                            new MessageButton()
                            .setCustomId(value[1])
                            .setLabel(value[1])
                            .setStyle('SUCCESS')
                        )

                        embed.setColor("#00FF00")
                        embed.setTitle("Changement de classe")
                        embed.setDescription(`Vous avez le choix entre la classe ${value[0]} et la classe ${value[1]}`)

                        break
                    }
                }
                break
            }else i++
        }

        if(!IsEvoluting)
        {
            embed.setColor("#FF0000")
            embed.setTitle("Changement de classe")
            embed.setDescription(`Vous n'avez pas encore le niveau requis pour changer de classe ! `)

            await interaction.reply({embeds: [embed]})
        
        }else await interaction.reply({embeds: [embed], components: [buttons]})


    }
}