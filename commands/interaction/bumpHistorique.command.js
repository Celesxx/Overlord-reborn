const { MessageEmbed } = require("discord.js")
const LogCombatFunction = require("../../functions/gestion/logCombat.function.js")
const LogBump = require("../../controllers/logBump.controller.js")

module.exports = 
{
    name: 'bump-historique',
    description: "Permet de rejoindre un combat déja en cours !",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /historique")
    },
    options:
    [
        {
            name: "taille",
            description: "taille des derniers logs",
            type: "STRING",
            required: true,
            choices:
            [
                {
                    name: "10",
                    value: "10"
                },
                {
                    name: "25",
                    value: "25"
                },
                {
                    name: "50",
                    value: "50"
                },
                {
                    name: "all",
                    value: "all"
                }
            ]
        },
        {
            name: "user",
            description: "ping de l'user",
            type: "STRING",
            required: true,
        }
    ],
    runSlash: async (client, interaction) => 
    {   

        if(interaction.member.roles.cache.some(role => role.name === 'Fondateur' || role.name === "Administrateur"))
        {
            let type = interaction.options.get("taille").value
            let id = interaction.options.get("user").value

            const logBump = new LogBump()
            const log = await logBump.getLogBumpById(id.replace(/[<@!>]/gm,""))

            let embed = new MessageEmbed()
            
            if(type == "all")
            {
                embed.setTitle(`Historique de tout les bump`)
                embed.setDescription(`${log.date.join("\n")}`)


            }else
            {
                embed.setTitle(`Historique des ${type} derniers bump`)
                embed.setDescription(`${log.date.slice(parseInt(`-${type}`)).join("\n")}`)
            }
            
            await interaction.reply({embeds: [embed]})
        }
    }
}