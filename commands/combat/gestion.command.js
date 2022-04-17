//---------------------------- Rejoindre combat ----------------------------
if(message.content.toLowerCase().startsWith(`${préfix}rejoindre`))
{
    try
    {
        let combatId = args[0]
        let user = message.author.id

        const logCombatFunction = new LogCombatFunction()
        const messageFunction = new MessageFunction()
        
        let logCombat = Promise.resolve(logCombatFunction.getLogCombatById(combatId))
        logCombat.then(async result => 
        {
            try
            {
                if(result.length != 0 && !result[0].participant.includes(`<@${user}>`))
                {
                    const embedData = await messageFunction.getMessageById(result[0].messageId, message)
                    let embed = embedData.embeds[0]

                    embed.fields.slice(3)[0].value = `${embed.fields.slice(3)[0].value} \n:white_check_mark: <@${user}>`
                    embed.fields.slice(-1)[0].value = `<@${user}> viens de rejoindre le combat !`
                    await logCombatFunction.JoinLogCombat(combatId, result, embed.fields.slice(-1)[0].value, `<@${user}>`)
                    await messageFunction.editMessageById(result[0].messageId, message, embed)

                }else if(result[0].participant.includes(`<@${user}>`))
                {
                    message.channel.send("Vous êtes déja présent dans le combat !").then(setTimeout(() => {message.channel.bulkDelete(1)}, 3000))
                }else
                {
                    message.channel.send("l'id du combat n'est pas valide !").then(setTimeout(() => {message.channel.bulkDelete(1)}, 3000))
                }
                
                message.delete()

            }catch(error)
            {
                console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
            }

        })


    }catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
    }
    
}









//---------------------------- Fin combat vs monstre ----------------------------
if(message.content.toLowerCase().startsWith(`${préfix}fin`))
{
    try
    {
        let combatId = args[0]
        let embed
        let isInCombat = false

        const logCombatFunction = new LogCombatFunction()
        const messageFunction = new MessageFunction()
        
        let logCombat = Promise.resolve(logCombatFunction.getLogCombatById(combatId))
        logCombat.then(async result => 
        {
            const embedData = await messageFunction.getMessageById(result[0].messageId, message)
            embed = embedData.embeds[0]

            if(embed.author != undefined && embed.author.name == combatId) isInCombat = true
            if(isInCombat)
            {
                embed.fields.slice(3)[0].value = "-"
                embed.fields.slice(-1)[0].name = ":coin: Récompense"
                embed.fields.slice(-1)[0].value = "Vous avez terminé votre combat, merci de faire la commande suivante *?Recompense IdDuCombat*"       
            }

            await logCombatFunction.endLogCombat(combatId, result)
            await messageFunction.editMessageById(result[0].messageId, message, embed)
            message.delete()
        })
    } catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
    }
}









//---------------------------- Fin combat vs monstre ----------------------------
if(message.content.toLowerCase().startsWith(`${préfix}recompense`))
{
    try
    {
        let id = message.channel.author
        let combatId = args[0]
        let goldTotal = { bronze : 0, argent : 0, or : 0} 
        let items = []
        let xpTotal = 0
        let status = []

        const messageFunction = new MessageFunction()
        const bestiaireController = new BestiaireController()
        const logCombatFunction = new LogCombatFunction()
        const experienceFunction = new LevelFunction()

        const logCombat = Promise.resolve(logCombatFunction.getLogCombatById(combatId))
        logCombat.then(async log =>
        {
            try
            {
                log = log[0]
                let moyLvl = log.moyLvlPlayer
                let monstres = log.participant.filter(result => !result.includes(`<@`))
                let participants = log.participant.filter(result => result.includes(`<@`))

                const messageResult = await messageFunction.getMessageById(log.messageId, message)
                let embed = messageResult.embeds[0]
                console.log(log.recompense)
                if(!log.recompense)
                {
                    for(const monstre of monstres)
                    {
                        const resultMonstre = await bestiaireController.getMonstreByNameId(monstre.slice(0,-2))
                        let zoneLvl = log.zoneLvl

                        if(Math.floor(Math.random() * 100) < resultMonstre[0].loot.item.chance) resultMonstre[0].loot.item.loot.forEach(item => { items.push(item) })
                        goldTotal.bronze += Math.floor(Math.random() * ( resultMonstre[0].loot.gold.bronze[1]  - resultMonstre[0].loot.gold.bronze[0] ) ) +  resultMonstre[0].loot.gold.bronze[0]
                        goldTotal.argent += Math.floor(Math.random() * ( resultMonstre[0].loot.gold.argent[1]  - resultMonstre[0].loot.gold.argent[0] ) ) +  resultMonstre[0].loot.gold.argent[0]
                        goldTotal.or += Math.floor(Math.random() * ( resultMonstre[0].loot.gold.or[1]  - resultMonstre[0].loot.gold.or[0] ) ) +  resultMonstre[0].loot.gold.or[0]
                        
                        let xp = Math.floor(Math.random() * ( resultMonstre[0].loot.xp[1]  - resultMonstre[0].loot.xp[0] ) ) +  resultMonstre[0].loot.xp[0]
                        xpTotal += Math.max(0, Math.round(xp + (xp *  (zoneLvl + (moyLvl / 15) - moyLvl)) * 1.5 * Math.exp(moyLvl / 100)))
                    }

                    let aliveCount = 0
                    for(const participant of participants)
                    {
                        let idParticipant = participant.replace(/[<@>\n]/gm, "")
                        if(bdd[idParticipant].HPactuel <= 0)
                        {
                            goldTotal.bronze += bdd[idParticipant].pieceBronze
                            goldTotal.argent += bdd[idParticipant].pieceArgent
                            goldTotal.or += bdd[idParticipant].pieceOr

                            let xp = bdd[idParticipant].xp / 1000
                            let level = bdd[idParticipant].lvl
                            xpTotal += Math.max(0, Math.round(xp *  (level + (moyLvl / 4) - moyLvl) * Math.exp(moyLvl / 100)))

                        }else aliveCount++
                    }
    
                    let winner = Math.floor(Math.random() * aliveCount)
                    let participantCounter = 0
                    for(let participant of participants)
                    {
                        participant = participant.replace(/[<@>\n]/gm, "")
                        if(bdd[participant].HPactuel > 0 && aliveCount > 0)
                        {
                            let bronze = Math.floor(goldTotal.bronze / aliveCount)
                            let argent = Math.floor(goldTotal.argent / aliveCount)
                            let or = Math.floor(goldTotal.or / aliveCount)
                            let itemGain = []
                            
                            let rankBefore = await experienceFunction.getRankPlayer(participant)

                            bdd[participant].xp += xpTotal
                            bdd[participant].pieceBronze += bronze
                            bdd[participant].pieceArgent += argent
                            bdd[participant].pieceOr += or

                            await experienceFunction.verifLvlUp(participant, message, client, rankBefore)

                            for(const item of items)
                            {
                                if(participantCounter == winner)
                                {
                                    if(bdd[participant].inventaire.hasOwnProperty(item)) bdd[participant].inventaire[item] = parseInt(bdd[participant].inventaire[item]) + 1
                                    else bdd[participant].inventaire[item] = 1
                                    itemGain.push(item)
                                    items = log.participant.filter(result => result.includes(item))
                                    winner = Math.floor(Math.random() * aliveCount)
                                }
                            }

                            Savebdd()
                            status.push(`\n- <@${participant}> gagne ${xpTotal} xp, ${bronze} pièces de bronze, ${argent} pièces d'argent, ${or} pièces d'or ${itemGain.length ? `et ${itemGain}` : '' } `)
                            participantCounter++

                        }else if(aliveCount <= 0) status.push(`\n- absolument rien, car tout le monde est mort !`)
                    }

                    

                    embed.fields.slice(-1)[0].value = `Félicitations vous gagnez les récompense suivantes : ${status}`

                    await logCombatFunction.recompenseLogCombat(combatId, log, embed.fields.slice(-1)[0].value)

                }else 
                {
                    embed.fields.slice(-1)[0].value = `Bien essayé mais vous avez déja reçus votre récompense !`
                } 

                await messageFunction.editMessageById(log.messageId, message, embed)
                message.delete()
            
            }catch(error)
            {
                console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
            }
        })

    }catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
    }
}