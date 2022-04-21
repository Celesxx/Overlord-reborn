//---------------------------- Attaque vs monstre ----------------------------
if(message.content.toLowerCase().startsWith(`${préfix}attaque`))
{
    try
    {
        let multiCible = args.slice(1)
        let skillName = args[0]
        let monstreInCombat = []
        let degatForEachMonstre = []
        let combatStatus = []
        let allMonster = []
        const user = message.author.id

        // Initialization des classes
        const skillController = new SkillController()
        const zoneFunction = new ZoneFunction()
        const zoneController = new ZoneController()
        const combatFunction = new CombatFunction()
        const bestiaireController = new BestiaireController()
        const messageFunction = new MessageFunction()
        const logCombatFunction = new LogCombatFunction()
        const playerCreationFunction = new PlayerCreationFunction()
        
        const turnVerification = Promise.resolve(combatFunction.turnVerification(user, message))
        turnVerification.then(async result => 
        {
            if(result.state)
            {
                let i = 0
                const data = await playerCreationFunction.getPlayerById(user) // get les données du joueur
                const skill = await skillController.getSkillByName(skillName) // get le skill en fonction de son nom 
                const zone = await zoneFunction.getZone(message) // get la zone ou il ce trouve 
                const resultZone = await zoneController.getZoneByName(zone) // get les stats de la zone en fonction du nom de la zone
                const log = await logCombatFunction.getLogCombatById(result.embed.author.name)

                for(const monster of log[0].participant)
                {
                    
                    if(!monster.includes(`<@`))
                    {
                        let mob = await bestiaireController.getMonstreByNameId(monster.slice(0,-2))
                        allMonster.push(mob[0])
                    }
                }

                for(const monstre of multiCible)
                {
                    let damageResult
                    if(!isNaN(monstre.replace(/[<@!>]/gm, " ")))
                    {
                        damageResult = await combatFunction.dammageCalculPlayer(skill, data[0]) //calcule les dommages en fonction du skill
                        monstreInCombat.push({nom: monstre})
                    }
                    else
                    {
                        const resultMonstre = await bestiaireController.getMonstreByNameId(monstre.slice(0,-2)) //get les stats du monstre en fonction de son id 
                        monstreInCombat.push(resultMonstre[0])
                        damageResult = await combatFunction.dammageCalcul(skill, data[0], [monstreInCombat[i]], resultZone) //calcule les dommages en fonction du skill, de la défense du monstre et du lv de la zone
                    }
                    degatForEachMonstre.push(damageResult)
                    i++
                }

                i = 0 
                for(const degatResult of degatForEachMonstre)
                {
                    if(degatResult.miss == false) combatStatus.push(`\n - ${degatResult.degat} à ${monstreInCombat[i].nom}`)
                    else if(degatResult.miss == true) combatStatus.push(`\n - rate son attaque sur ${monstreInCombat[i].nom} `)
                    i++
                }

                const multiCibleResult = await combatFunction.multiCibleCalcul(skill, multiCible) // vérifie si le skill peut attaquer un/plusieurs cible(s) 
                const positionResult = await combatFunction.positionVerification(monstreInCombat, multiCible, skill, allMonster) // vérifie si le skill peut attaquer la position ou ce trouve le(s) monstre(s) 
                const newCombatEmbed = await combatFunction.editCombatEmbed(message, user, multiCibleResult, skill, degatForEachMonstre, combatStatus, positionResult, result.embed, result.oldOrder) // edit l'embed du combat
                const logCombat = await logCombatFunction.getLogCombatById(newCombatEmbed.combatId)
                
                await logCombatFunction.addEventTurnLogCombatByName(newCombatEmbed.combatId, logCombat[0], { number: result.currentTurn, event: newCombatEmbed.embed.fields.slice(-1)[0].value })
                await messageFunction.editMessageById(result.embedId, message, newCombatEmbed.embed) 

            }else await messageFunction.editMessageById(result.embedId, message, result.embed)
        })
        message.delete()
    }catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
    }
}







//---------------------------- Fuite ----------------------------
if(message.content.toLowerCase().startsWith(`${préfix}fuite`))
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
                const embedData = await messageFunction.getMessageById(result[0].messageId, message)
                let embed = embedData.embeds[0]
                let luck = Math.floor(Math.random() * 100)
                let order = embed.fields.slice(3)[0].value.split("\n")
                let userOrder = order.filter(participant => participant.includes(user)).join("")
                if(result.length != 0 && result[0].participant.includes(`<@${user}>`) && userOrder.includes(":x:") && luck <= 29)
                {
                    userOrder = `:white_check_mark:<@${userOrder.replace(/[:x<@> ]/gm, "")}>`
                    embed.fields.slice(-1)[0].value = `<@${user}> viens de prendre la fuite !`
                    order = order.filter(participant => !participant.includes(user))
                    
                }else if(userOrder.includes(":x:") && luck >= 90)
                {
                    userOrder = `:white_check_mark:<@${userOrder.replace(/[:x<@> ]/gm, "")}>`
                    embed.fields.slice(-1)[0].value = `<@${user}> tente de prendre la fuite, mais c'est un échec !`
                    order.forEach( (value, id) =>  {if(value.includes(user)) order[id] = userOrder }) 
                    
                }else if(!userOrder.includes(":x:"))
                {
                    embed.fields.slice(-1)[0].value = `<@${user}> tente de prendre la fuite mais il à déja effectué son action pour ce tour !`
                }

                if(!order.some(member => member.includes(":x:")))
                {
                    order.forEach((value, id) => 
                    {
                        order[id] = order[id].replace(":white_check_mark:", ":x:")
                    })
                    embed.fields.slice(2)[0].value = parseInt(embed.fields.slice(2)[0].value) + 1
                }

                embed.fields.slice(3)[0].value = order.join("\n") // edit le field "Ordre du combat"

                await logCombatFunction.FuiteLogCombat(combatId, result, { event : embed.fields.slice(-1)[0].value, number: embed.fields.slice(2)[0].value } )
                await messageFunction.editMessageById(result[0].messageId, message, embed)

            }catch(error)
            {
                console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
            }
        })
        message.delete()
    }catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
    }
    
}





//---------------------------- Defense joueur ----------------------------
if(message.content.toLowerCase().startsWith(`${préfix}defense`))
{
    try
    {
        const multiDegat = args.slice(1)
        const skillName = args[0]
        const user = message.author.id
        let resultDegat = []
        let embed
        // Initialization des classes
        const skillController = new SkillController()
        const combatFunction = new CombatFunction()
        const messageFunction = new MessageFunction()
        const logCombatFunction = new LogCombatFunction()
        const playerCreationFunction = new PlayerCreationFunction()

        const getSkill = Promise.resolve(skillController.getSkillByName(skillName))
        getSkill.then(async skillData =>
        {
            try
            {
                const data = await playerCreationFunction.getPlayerById(user)
                const combatId = await logCombatFunction.getCombatIdByParticipant(user)
                const messageResult = await messageFunction.getMessageById(combatId, message)
                embed = messageResult.embeds[0]
                if(skillData.length != 0 && skillData[0].defense.blocage.length != 0)
                {
                    for(const degat of multiDegat)
                    {
                        const result = await combatFunction.defenseCalculJoueur(data[0], degat, skillData[0])
                        resultDegat.push(`\n- ${result} dégat`)
                        data[0].hp[0] = (data[0].hp[0] - result).toFixed(1)
                        await playerCreationFunction.editPlayerById(user, {hp: data[0].hp})
                    }
                
                    embed.fields.slice(-1)[0].value = `\n<@!${user}> ${skillData[0].description} ${resultDegat}`

                    if(data[0].hp[0] <= 0) 
                    {
                        message.member.setNickname(data[0].prenom + "  [☠️ KO]")
                        let order = embed.fields.slice(3)[0].value.split("\n").filter(participant => !participant.includes(`<@${user}>`))
                        embed.fields.slice(3)[0].value = order.join("\n")

                    }else message.member.setNickname(data[0].prenom + " [❤️" + data[0].hp[0] + "] [🛡️"+ data[0].armure[0] +"] [✨" + data[0].magie[0] + "]")
                    
                }else
                {
                    embed.fields.slice(-1)[0].value = `\n<@!${user}> merci de mettre un skill valide !`
                }

                const logCombat = await logCombatFunction.getLogCombatById(embed.author.name)
                await logCombatFunction.addEventTurnLogCombatByName(embed.author.name, logCombat[0], { number: embed.fields.slice(2)[0].value, event: embed.fields.slice(-1)[0].value })
                await messageFunction.editMessageById(combatId, message, embed)
                message.delete()
                
            }catch(error)
            {
                console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
            }
        })

    }catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
    }
}