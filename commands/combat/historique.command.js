const { MessageEmbed } = require("discord.js")
const LogCombatFunction = require("../../functions/gestion/logCombat.function.js")

module.exports = 
{
    name: 'historique',
    description: "Permet de rejoindre un combat déja en cours !",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /historique")
    },
    options:
    [
        {
            name: "type",
            description: "Les différentes méthodes d'historiques",
            type: "STRING",
            required: true,
            choices:
            [
                {
                    name: "single",
                    value: "single"
                },
                {
                    name: "active",
                    value: "active"
                }
            ]
        },
        {
            name: "id",
            description: "id du combat",
            type: "STRING",
            required: false,
        }
    ],
    runSlash: async (client, interaction) => 
    {   

        if(interaction.member.roles.cache.some(role => role.name === 'Fondateur' || role.name === "Administrateur"))
        {
            let type = interaction.options.get("type").value
            let combatId
            if(type == "single" && !interaction.options.get("id")) return interaction.reply("Il manque l'id du combat !")
            else if(type == "single") combatId = interaction.options.get("id").value

            const logCombatFunction = new LogCombatFunction()
            let embed = new MessageEmbed()
            
            
            if(type == "single")
            {
                const logCombat = await logCombatFunction.getLogCombatById(combatId)
                console.log(logCombat)
                embed.setTitle(`Historique du combat : ${combatId}`)
                embed.addField("Participant", `${logCombat[0].participant.join("\n")}`, true)
                embed.addField("Channel", `${logCombat[0].channel}`, true)
                for(const round of logCombat[0].round) embed.addField(`tour : ${round.number}`, `${round.event}`)

            }else if(type == "active")
            {
        
                const logCombat = await logCombatFunction.getAllLogCombat()
                let i = 1
                embed.setTitle(`Liste des combats actif`)
                for(const log of logCombat)
                {
                    if(!log.over)
                    {
                        embed.addField(`Combat #${i}`, `combatId : ${log.combatId} \n channel: ${log.channel} \n createdAt : ${log.createdAt}`)
                        i++
                    }
                }
            }
        }

        await interaction.reply({embeds: [embed]})
    }
}