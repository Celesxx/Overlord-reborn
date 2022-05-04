const BestiaireController = require('../../controllers/bestiaire.controller.js')
const LogCombatFunction = require("../../functions/gestion/logCombat.function.js")
const MessageFunction = require("../../functions/gestion/message.function.js")
const LevelFunction = require("../../functions/character/level.function.js")
const PlayerCreationFunction = require("../../functions/character/creation.function.js")

module.exports = 
{
    name: 'recompense',
    description: "Permet d'obtenir la récompense du combat",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /recompense")
    },
    options:
    [
        {
            name: "id",
            description: "id du combat",
            type: "STRING",
            required: true,
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        let combatId = interaction.options.get("id").value
        let id = interaction.member.user.id
        let [items, status, participantDead, alive, winnerCounter] = [[],[],[], [], 0]
        let winner = Math.floor(Math.random() * alive.length)


        const messageFunction = new MessageFunction()
        const bestiaireController = new BestiaireController()
        const logCombatFunction = new LogCombatFunction()
        const experienceFunction = new LevelFunction()
        const playerCreationFunction = new PlayerCreationFunction()


        const logCombat = await logCombatFunction.getLogCombatById(combatId)
        const messageResult = await messageFunction.getMessageByIdInteraction(logCombat[0].messageId, interaction)
        
        const log = logCombat[0]
        let embed = messageResult.embeds[0]
        let monstres = log.participant.filter(result => !result.includes(`<@!`))
        let participants = log.participant.filter(result => result.includes(`<@!`))


        if(!log.recompense)
        {
            for(const participant of participants)
            {
                const result = await playerCreationFunction.getPlayerById(participant.replace(/[<@!>]/gm,""))
                if(result[0].hp[0] > 0) alive.push(result[0])
                else participantDead.push(result[0])
            }


            
            if(alive.length != 0)
            {
                for(let participantAlive of alive)
                {
                    let [xpTotal, goldTotal, itemGain] = [0, { bronze : 0, argent : 0, or : 0}, []]

                    for(const monstre of monstres)
                    {
                        const resultMonstre = await bestiaireController.getMonstreByNameId(monstre.slice(0,-2))
                        let zoneLvl = log.zoneLvl
        
                        if(Math.floor(Math.random() * 100) < resultMonstre[0].loot.item.chance) resultMonstre[0].loot.item.loot.forEach(item => { items.push(item) })
                        goldTotal.bronze += Math.floor(Math.random() * ( resultMonstre[0].loot.gold.bronze[1]  - resultMonstre[0].loot.gold.bronze[0] ) ) +  resultMonstre[0].loot.gold.bronze[0]
                        goldTotal.argent += Math.floor(Math.random() * ( resultMonstre[0].loot.gold.argent[1]  - resultMonstre[0].loot.gold.argent[0] ) ) +  resultMonstre[0].loot.gold.argent[0]
                        goldTotal.or += Math.floor(Math.random() * ( resultMonstre[0].loot.gold.or[1]  - resultMonstre[0].loot.gold.or[0] ) ) +  resultMonstre[0].loot.gold.or[0]
                        
                        let xp = Math.floor(Math.random() * ( resultMonstre[0].loot.xp[1]  - resultMonstre[0].loot.xp[0] ) ) +  resultMonstre[0].loot.xp[0]
                        xpTotal += Math.max(0, Math.round(xp + (xp *  (zoneLvl + (participantAlive.lvl / 15) - participantAlive.lvl)) * 1.5 * Math.exp(participantAlive.lvl / 100)))
                    }

                    for(const participant of participantDead)
                    {
                        goldTotal.bronze += participant.money[0]
                        goldTotal.argent += participant.money[1]
                        goldTotal.or += participant.money[2]

                        let xp = participant.xp / 1000
                        let level = participant.lvl
                        xpTotal += Math.max(0, Math.round(xp *  (level + (participantAlive.lvl / 4) - participantAlive.lvl) * Math.exp(participantAlive.lvl / 100)))
                    }


                    let rankBefore = await experienceFunction.getRankPlayer(participantAlive)

                    
                    
                    participantAlive.xp += parseInt(xpTotal)
                    participantAlive.money[0] += goldTotal.bronze
                    participantAlive.money[1] += goldTotal.argent
                    participantAlive.money[2] += goldTotal.or

                    
                    for(const item of items)
                    {
                        if(winnerCounter == winner)
                        {
                            if(participant.inventaire.length != 0) participant.inventaire.map(obj => { if(obj[0] == item) obj[1] += 1 })
                            else participant.inventaire.push([item, 1])

                            itemGain.push(item)
                            items = log.participant.filter(result => result.includes(item))
                            winner = Math.floor(Math.random() * aliveCount)
                        }
                    }

                    winnerCounter++

                    await playerCreationFunction.editPlayerById(participantAlive.id, participantAlive)
                    await experienceFunction.verifLvlUp(participantAlive.id, client, interaction, rankBefore, participantAlive)

                    status.push(`\n- <@${participantAlive.id}> gagne ${xpTotal} xp, ${goldTotal.bronze} pièces de bronze, ${goldTotal.argent} pièces d'argent, ${goldTotal.or} pièces d'or ${itemGain.length ? `et ${itemGain}` : '' } `)
            
                }

            }else status.push(`\n- absolument rien, car tout le monde est mort !`)
            
            embed.fields.slice(-1)[0].value = `Félicitations vous gagnez les récompense suivantes : ${status}`
            
        }else embed.fields.slice(-1)[0].value = `Bien essayé mais vous avez déja reçus votre récompense !`
        
        await logCombatFunction.recompenseLogCombat(combatId, log, embed.fields.slice(-1)[0].value)
        await messageFunction.editMessageByIdInteraction(log.messageId, interaction, embed)

        await interaction.reply({ ephermal: true, content: '** **' })
        await interaction.deleteReply()
    }
}