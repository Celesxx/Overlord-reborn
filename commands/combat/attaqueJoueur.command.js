const { MessageEmbed } = require("discord.js")

const PlayerCreationFunction = require("../../functions/character/creation.function.js")
const BestiaireController = require('../../controllers/bestiaire.controller.js')
const ZoneController = require('../../controllers/zone.controller.js')
const SkillController = require('../../controllers/skill.controller.js')
const CombatFunction = require('../../functions/interface/combat.function.js')
const ZoneFunction = require('../../functions/interface/zone.function.js')
const LogCombatFunction = require("../../functions/gestion/logCombat.function.js")
const MessageFunction = require("../../functions/gestion/message.function.js")

module.exports = 
{
    name: 'attaque',
    description: "commande pour attaquer un joueur ou un monstre dans une instance de combat",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /attaque")
    },
    options:
    [
        {
            name: "skill",
            description: "compétence que vous voulez utiliser",
            type: "STRING",
            required: true,
        },
        {
            name: "cible",
            description: "choix de(s) cible(s), si plusieurs cibles utilisé / pour les séparer",
            type: "STRING",
            required: true,
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        let skillName = interaction.options.get("skill").value
        let multiCible = interaction.options.get("cible").value.replace(/[\s]/gm, "").split("/")
        let [monstreInCombat, degatForEachMonstre, combatStatus, allMonster] = [[], [], [], []]
        const user = interaction.member.user.id

        // Initialization des classes
        const skillController = new SkillController()
        const zoneFunction = new ZoneFunction()
        const zoneController = new ZoneController()
        const combatFunction = new CombatFunction()
        const bestiaireController = new BestiaireController()
        const messageFunction = new MessageFunction()
        const logCombatFunction = new LogCombatFunction()
        const playerCreationFunction = new PlayerCreationFunction()
        
        const logCombat = await logCombatFunction.getLogCombatParticipantId(user)
        if(logCombat.length == 0) interaction.channel.send("Vous n'êtes présent dans aucun combat !")
        else if(logCombat.length > 1) interaction.channel.send("Vous êtes présent dans deux fight en même temps merci de vérifier d'avoir bien fais la commande /fin une fois vos précédent combat terminé")
        else
        {
            const embedData = await messageFunction.getMessageByIdInteraction(logCombat[0].messageId, interaction)
            const turnVerification = await combatFunction.turnVerification(user, embedData.embeds[0])
            if(turnVerification.state)
            {
                let i = 0
                const data = await playerCreationFunction.getPlayerById(user) // get les données du joueur
                const skill = await skillController.getSkillByName(skillName) // get le skill en fonction de son nom 
                if(skill.length != 0)
                {
                    const resultZone = await zoneController.getZoneByName(embedData.embeds[0].fields.slice(1)[0].value) // get les stats de la zone en fonction du nom de la zone
                    const log = await logCombatFunction.getLogCombatById(turnVerification.embed.author.name)

                   for(let monster of embedData.embeds[0].fields[3].value.split("\n"))
                    {
                        if(!monster.includes(`<@`))
                        {
                        	monster = monster.replace(":x:", "")
                        	monster = monster.replace(":white_check_mark:", "")
                            let mob = await bestiaireController.getMonstreByNameId(monster.slice(0,-2))
                            allMonster.push(mob[0])
                        }
                    }

                    for(const target of multiCible)
                    {
                        let damageResult
                        if(!isNaN(target.replace(/[<@!>]/gm, " ")))
                        {
                            damageResult = await combatFunction.dammageCalculPlayer(skill, data[0]) //calcule les dommages en fonction du skill
                            monstreInCombat.push({nom: target})
                        }
                        else
                        {
                            const resultMonstre = await bestiaireController.getMonstreByNameId(target.slice(0,-2)) //get les stats du monstre en fonction de son id 
                            monstreInCombat.push(resultMonstre[0])
                            damageResult = await combatFunction.dammageCalcul(skill, data[0], [monstreInCombat[i]], resultZone) //calcule les dommages en fonction du skill, de la défense du monstre et du lv de la zone
                        }
                        degatForEachMonstre.push(damageResult)
                        i++
                    }

                    i = 0 
                    for(const degatResult of degatForEachMonstre)
                    {
                        console
                        if(degatResult.miss == false) combatStatus.push(`\n - ${degatResult.degat} à ${monstreInCombat[i].nom}`)
                        else if(degatResult.miss == true) combatStatus.push(`\n - rate son attaque sur ${monstreInCombat[i].nom} `)
                        i++
                    }

                    const multiCibleResult = await combatFunction.multiCibleCalcul(skill, multiCible) // vérifie si le skill peut attaquer un/plusieurs cible(s) 
                    const positionResult = await combatFunction.positionVerification(monstreInCombat, multiCible, skill, allMonster) // vérifie si le skill peut attaquer la position ou ce trouve le(s) monstre(s) 
                    const newCombatEmbed = await combatFunction.editCombatEmbed(user, multiCibleResult, skill, degatForEachMonstre, combatStatus, positionResult, turnVerification.embed, turnVerification.oldOrder) // edit l'embed du combat 
                    await logCombatFunction.addEventTurnLogCombatByName(newCombatEmbed.combatId, logCombat[0], { number: turnVerification.currentTurn, event: newCombatEmbed.embed.fields.slice(-1)[0].value })
                    await messageFunction.editMessageByIdInteraction(logCombat[0].messageId, interaction, newCombatEmbed.embed) 
                
                }else
                {
                    embedData.embeds[0].fields.slice(-1)[0].value = `<@${user}> le skill n'existe pas ou n'est pas valide !`
                    embedData.embeds[0].fields.slice(3)[0].value = turnVerification.oldOrder
                    await messageFunction.editMessageByIdInteraction(logCombat[0].messageId, interaction, embedData.embeds[0])
                }

            }else await messageFunction.editMessageByIdInteraction(logCombat[0].messageId, interaction, turnVerification.embed)
        }
        await interaction.reply({ ephermal: true, content: '** **' })
        await interaction.deleteReply()
    }
}