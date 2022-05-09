const { MessageEmbed } = require("discord.js")

const BestiaireController = require('../../controllers/bestiaire.controller.js')
const ZoneController = require('../../controllers/zone.controller.js')
const CombatFunction = require('../../functions/interface/combat.function.js')
const ZoneFunction = require('../../functions/interface/zone.function.js')
const LogCombatFunction = require("../../functions/gestion/logCombat.function.js")
const MessageFunction = require("../../functions/gestion/message.function.js")

module.exports = 
{
    name: 'monstre',
    description: "commande d'attaque pour les monstres qui sont dans votre combat",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /monstre")
    },
    options:
    [
        {
            name: "name",
            description: "nom du monstre qui attaque",
            type: "STRING",
            required: true,
        }
    ],
    runSlash: async (client, interaction) => 
    {
        const monstreName = interaction.options.get("name").value
        let combatStatus = []
        let combatId = ""
        let embed
        let user = interaction.member.user.id

        const bestiaireController = new BestiaireController()
        const zoneFunction = new ZoneFunction()
        const zoneController = new ZoneController()
        const combatFunction = new CombatFunction()
        const messageFunction = new MessageFunction()
        const logCombatFunction = new LogCombatFunction()
        
        const logCombat = await logCombatFunction.getLogCombatParticipantId(user)
        if(logCombat.length == 0) interaction.channel.send("Vous n'êtes présent dans aucun combat !")
        else if(logCombat.length > 1) interaction.channel.send("Vous êtes présent dans deux fight en même temps merci de vérifier d'avoir bien fais la commande /fin une fois vos précédent combat terminé")
        else
        {
            const embedData = await messageFunction.getMessageByIdInteraction(logCombat[0].messageId, interaction)
            embed = embedData.embeds[0]
            const turnVerification = await combatFunction.turnVerification(monstreName, embed)

            if(turnVerification.state)
            {
                const monstre = await bestiaireController.getMonstreByNameId(monstreName.slice(0,-2))
                const zoneData = await zoneController.getZoneByName(embed.fields.slice(1)[0].value)
                const damageResult = await combatFunction.dammageCalculMonstre(monstre, zoneData)
                
                let i = 0
                for(const result of damageResult)
                {
                    if(result.critique && result.special && result.specialCritique || result.special && result.specialCritique)
                    {
                        combatStatus.push(`\n - ${monstre[0].attaqueSpecial[result.attaqueIndex].crit.description} ${result.degat} de dégat`)
                        if(embed.image != null) embed.image.url = monstre[0].imageSkill
                        else embed.setImage(monstre[0].imageAttaque)
                    }
                    else if(result.critique && result.special || result.special)
                    {
                        combatStatus.push(`\n - ${monstre[0].attaqueSpecial[result.attaqueIndex].description} ${result.degat} de dégat`)
                        if(embed.image != null) embed.image.url = monstre[0].imageSkill
                        else embed.setImage(monstre[0].imageAttaque)
                    }
                    else if(result.critique)
                    {
                        combatStatus.push(`\n - ${monstre[0].attaque.descriptionCrit} ${result.degat} de dégat`)
                        if(embed.image != null) embed.image.url = monstre[0].imageCritique
                        else embed.setImage(monstre[0].imageAttaque)

                    }
                    else if(result.miss) 
                    {
                        combatStatus.push(`\n - rate son attaque`)
                        embed.image.url = monstre[0].imageMiss
                    }else 
                    {
                        combatStatus.push(`\n - ${monstre[0].attaque.description} ${result.degat} de dégat`)
                        if(embed.image != null) embed.image.url = monstre[0].imageAttaque
                        else embed.setImage(monstre[0].imageAttaque)
                    }
                    
                    i++
                }

                combatId = embed.author.name
                embed.fields.slice(-1)[0].value = `\n${monstreName} attaque <@${user}> et : ${combatStatus}`
                
        
                let logCombat = await logCombatFunction.getLogCombatById(combatId)
                await logCombatFunction.addEventTurnLogCombatByName(combatId, logCombat[0], { number: turnVerification.currentTurn, event: embed.fields.slice(-1)[0].value })
                await messageFunction.editMessageByIdInteraction(logCombat[0].messageId, interaction, embed) 

            }else await messageFunction.editMessageByIdInteraction(logCombat[0].messageId, interaction, embed) 
        }
        
        await interaction.reply({ ephermal: true, content: '** **' })
        await interaction.deleteReply()
    }
}