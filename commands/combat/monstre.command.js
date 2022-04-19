//----------------------------Riposte Monstre ----------------------------

if(message.content.toLowerCase().startsWith(`${préfix}monstre`))
{
    try
    {
        const monstreName = args[0]
        const userId = message.author.id
        let combatStatus = []
        let combatId = ""

        const bestiaireController = new BestiaireController()
        const zoneFunction = new ZoneFunction()
        const zoneController = new ZoneController()
        const combatFunction = new CombatFunction()
        const performanceFunction = new PerformanceFunction()
        const messageFunction = new MessageFunction()
        const logCombatFunction = new LogCombatFunction()
        

        const turnVerification = Promise.resolve(combatFunction.turnVerification(monstreName, message))
        turnVerification.then(async result => 
        {
            if(result.state)
            {
                const monstre = await bestiaireController.getMonstreByNameId(monstreName.slice(0,-2))
                const zone = await zoneFunction.getZone(message)
                const zoneData = await zoneController.getZoneByName(zone)
                const damageResult = await combatFunction.dammageCalculMonstre(monstre, zoneData)
                

                for(const result of damageResult)
                {
                    if(result.critique && result.special && result.specialCritique || result.special && result.specialCritique) 
                    combatStatus.push(`\n - ${monstre[0].attaqueSpecial[result.attaqueIndex].crit.description} ${result.degat} de dégat`)
                    else if(result.critique && result.special || result.special) 
                    combatStatus.push(`\n - ${monstre[0].attaqueSpecial[result.attaqueIndex].description} ${result.degat} de dégat`)
                    else if(result.critique)
                    combatStatus.push(`\n - ${monstre[0].attaque.descriptionCrit} ${result.degat} de dégat`)
                    else if(result.miss) 
                    combatStatus.push(`\n - rate son attaque`)
                    else 
                    combatStatus.push(`\n - ${monstre[0].attaque.description} ${result.degat} de dégat`)
                    i++
                }

                let isInCombat = false
                embed = result.embed
                
                for(let field of embed.fields)
                {
                    combatId = embed.author.name
                    //---------------- Vérifie que l'user est bien dans le combat ----------------
                    if(field.name == "Ordre du combat" && field.value.replace(/[<@>\n]/gm, " ").split(' ').filter(w => w !== '').includes(userId)) isInCombat = true
                    if(isInCombat)
                    {
                        if(field.name == "Status") 
                        {
                            field.value = `\n${monstreName} attaque ${message.author.username} et : ${combatStatus}`
                            embed.image.url = monstre[0].image
                        }
                    }
                }

                let logCombat = await logCombatFunction.getLogCombatById(combatId)
                await logCombatFunction.addEventTurnLogCombatByName(combatId, logCombat[0], { number: result.currentTurn, event: embed.fields.slice(-1)[0].value })
                await messageFunction.editMessageById(result.embedId, message, embed)

                message.delete()

            }else await messageFunction.editMessageById(result.embedId, message, result.embed)
        })

    }catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
    }
}