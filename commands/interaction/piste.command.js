const { MessageEmbed } = require("discord.js")
const PlayerCreationFunction = require("../../functions/character/creation.function.js")
const ExperienceFunction = require("../../functions/character/level.function.js")

module.exports = 
{
    name: 'piste',
    description: "Permet de chercher la zone afin de chercher le tresor",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser la commande /piste")
    },
    options:
    [
        {
            name: "zone",
            description: "zone du channel ou vous vous trouvez",
            type: "STRING",
            required: true,
            choices:
            [
                { name: "plaine", value: "plaine" },
                { name: "foret", value: "foret" },
                { name: "colline", value: "colline" },
                { name: "lac", value: "lac" },
                { name: "grotte", value: "grotte" },
                { name: "montagne", value: "montagne" },
                { name: "terre-arride", value: "terre-arride" },
                { name: "taverne", value: "taverne" },
                { name: "foret-magique", value: "foret-magique" },
                { name: "marécages", value: "marécages" },
                { name: "caserne-garde", value: "caserne-garde" },
            ]
        }
    ],
    runSlash: async (client, interaction) => 
    {   

        const zone = interaction.options.get("zone").value
        let id = interaction.member.user.id
        
        const playerCreationFunction = new PlayerCreationFunction()
        let embed = new MessageEmbed()

        if(zone == "montagne")
        {
            let result = Math.floor(Math.random() * 5 ) + 1;

            if(result == 1)
            {
                let user = await playerCreationFunction.getPlayerById(id.replace(/[<@!>]/gm,""))
                user = user[0]
                user.money[0] += 500
                user.money[1] += 5
                await playerCreationFunction.editPlayerById(id, user)

                embed.setTitle("Tresor")
                embed.setColor("#00FF00")
                embed.setDescription(`Après un long moment de recherche vous avez enfin trouvez le trésor !\nVous gagnez : 300 bronze et 2 argent`)
                
                
            
            }else
            {
                embed.setTitle("Tresor")
                embed.setColor("#FF0000")
                embed.setDescription(`Après des recherchers certes minutieuse, vous ne trouvez rien !`)
            }
        }else
        {
            embed.setTitle("Tresor")
            embed.setColor("#FF0000")
            embed.setDescription(`Après des recherchers certes minutieuse, rien n'est présent dans cette zone`)
        }

        await interaction.reply({embeds: [embed]})
    }
}