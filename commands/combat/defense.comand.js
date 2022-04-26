const LogCombatFunction = require("../../functions/gestion/logCombat.function.js")
const MessageFunction = require("../../functions/gestion/message.function.js")
const PlayerCreationFunction = require("../../functions/character/creation.function.js")
const CombatFunction = require('../../functions/interface/combat.function.js')
const SkillController = require('../../controllers/skill.controller.js')

module.exports = 
{
    name: 'defense',
    description: "Permet de terminer un combat",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /defense")
    },
    options:
    [
        {
            name: "skill",
            description: "compétence que vous voulez utiliser pour vous défendre",
            type: "STRING",
            required: true,
        },
        {
            name: "degat",
            description: "dégat que l'adversaire vous inflige",
            type: "STRING",
            required: true,
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        const skillName = interaction.options.get("skill").value
        const degat = parseInt(interaction.options.get("degat").value)

        const user = interaction.member.user.id
        let embed

        // Initialization des classes
        const skillController = new SkillController()
        const combatFunction = new CombatFunction()
        const messageFunction = new MessageFunction()
        const logCombatFunction = new LogCombatFunction()
        const playerCreationFunction = new PlayerCreationFunction()

        const skillData = await skillController.getSkillByName(skillName)
        const data = await playerCreationFunction.getPlayerById(user)
        const logCombat = await logCombatFunction.getLogCombatParticipantId(user)
        if(logCombat.length == 0) interaction.channel.send("Vous n'êtes présent dans aucun combat !")
        else if(logCombat.length > 1) interaction.channel.send("Vous êtes présent dans deux fight en même temps merci de vérifier d'avoir bien fais la commande /fin une fois vos précédent combat terminé")
        else
        {
            const messageResult = await messageFunction.getMessageByIdInteraction(logCombat[0].messageId, interaction)

            embed = messageResult.embeds[0]
            if(skillData.length != 0 && skillData[0].defense.blocage.length != 0)
            {
    
                const result = await combatFunction.defenseCalculJoueur(data[0], degat, skillData[0])
                data[0].hp[0] -= result
                await playerCreationFunction.editPlayerById(user, {hp: data[0].hp})
                embed.fields.slice(-1)[0].value = `\n<@!${user}> ${skillData[0].description} \n- ${result} dégat`

                if(data[0].hp[0] <= 0) 
                {
                    interaction.member.setNickname(data[0].prenom + "  [☠️ KO]")
                    let order = embed.fields.slice(3)[0].value.split("\n").filter(participant => !participant.includes(`<@${user}>`))
                    embed.fields.slice(3)[0].value = order.join("\n")

                }else interaction.member.setNickname(data[0].prenom + " [❤️" + data[0].hp[0] + "] [🛡️"+ data[0].armure[0] +"] [✨" + data[0].magie[0] + "]")
                
            }else
            {
                embed.fields.slice(-1)[0].value = `\n<@!${user}> merci de mettre un skill valide !`
            }


            await logCombatFunction.addEventTurnLogCombatByName(embed.author.name, logCombat[0], { number: embed.fields.slice(2)[0].value, event: embed.fields.slice(-1)[0].value })
            await messageFunction.editMessageByIdInteraction(logCombat[0].messageId, interaction, embed) 
        }
        await interaction.reply({ ephermal: true, content: '** **' })
        await interaction.deleteReply()
    }
}