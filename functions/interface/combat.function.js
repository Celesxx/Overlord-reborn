class CombatFunction 
{
    /**
     * @param {Object} skill
     * @param {Object} userData
     * @param {Object} monstreData
     * @param {Object} zone
    */

    async dammageCalcul(skill, userData, monstreData, zone)
    {
        try
        {
            let diffLevel = zone[0].lvl - monstreData[0].lvl 
            let skillMultiplier = Math.floor(Math.random() * (skill[0].attaque.degat[1] - skill[0].attaque.degat[0]) ) + skill[0].attaque.degat[0];
            if(Math.floor(Math.random() * 100) <= skill[0].attaque.crit[0]) skillMultiplier += skill[0].attaque.crit[1]
            

            let blocageLevelDiff = diffLevel * monstreData[0].blocage.level[0]
            let blocageCritLevelDiff = diffLevel * monstreData[0].blocage.level[1]
            let blocageMissLevelDiff = diffLevel * monstreData[0].blocage.level[2]

            let monstreBlocage = Math.floor(Math.random() * ( (monstreData[0].blocage.degat[1] + blocageLevelDiff) - ( monstreData[0].blocage.degat[0] + blocageLevelDiff) ) ) + ( monstreData[0].blocage.degat[0] + blocageLevelDiff )
            if(Math.floor(Math.random() * 100) <= monstreData[0].blocage.crit[0] + blocageCritLevelDiff) monstreBlocage += monstreData[0].blocage.crit[1]
            if(Math.floor(Math.random() * 100) <= monstreData[0].blocage.miss + blocageMissLevelDiff) monstreBlocage = 0

            if(Math.floor(Math.random() * 100) <= skill[0].attaque.miss) return {miss : true, degat: 0}
            else
            {
                let degat = ((userData.attaque[0] * skillMultiplier) / 100) + userData.attaque[0]
                let degatTotal = (( degat - monstreBlocage) * (100 - monstreData[0].armure)) / 100 // attaque actuelle * multiplicateur - blocage - réduction armure
                if(degatTotal < 0) degatTotal = 0
                return {miss : false, degat: Math.round(degatTotal)}
            }
        } catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
        }
    }







    //--------------------------------------- calcul dommage player attaque ---------------------------------------
    /**
     * @param {Object} skill
     * @param {Object} userData
    */

     async dammageCalculPlayer(skill, userData)
     {
         try
         {
             let skillMultiplier = Math.floor(Math.random() * (skill[0].attaque.degat[1] - skill[0].attaque.degat[0]) ) + skill[0].attaque.degat[0];
             if(Math.floor(Math.random() * 100) <= skill[0].attaque.crit[0]) skillMultiplier += skill[0].attaque.crit[1]
             
             if(Math.floor(Math.random() * 100) <= skill[0].attaque.miss) return {miss : true, degat: 0}
             else
             {
                 let degat = ((userData.attaque[0] * skillMultiplier) / 100) + userData.attaque[0]
                 if(degat < 0) degat = 0
                 return {miss : false, degat: Math.round(degat)}
             }
         } catch(error)
         {
             console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
         }
     }






    /**
     * @param {Object} skill
     * @param {Array} multiCible
    */

     async multiCibleCalcul(skill, multiCible)
     {
         try
         {

            if(multiCible.length == 1)return { multiTarget : false, cible: multiCible, error: false }
            else if
            (
                skill[0].target[0] > 1 && multiCible.length <= skill[0].target[0] 
                ||
                multiCible.length != 0 && skill[0].target[0] == 0
            ) return { multiTarget: true, cible: multiCible, error: false}
            else if(multiCible.length == 0 && skill[0].target[0] == 0) return { multiTarget: true, cible: ["all"], error: false}
            else if(multiCible.length == 0 && skill[0].target[0] != 0) return { multiTarget: true, cible: [], error: true, message: "Merci de choisir une cible" }
            else if(multiCible.length != 1 && skill[0].target[0] == 1) return { multiTarget: false, cible: [], error: true, message: "Merci de choisir une seul cible" }
            else return { multiTarget: false, cible : [], error: true, message: "Merci de bien choisir la cible" }
            
         } catch(error)
         {
             console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
         }
     }







     //--------------------------------------- Vérification des positions ------------------------------------------    

     /**
     * @param {Array} monstreInfo
     * @param {Array} cible
     * @param {Array} skill
    */

    async positionVerification(monstreInfo, cible, skill, allMonster)
    {
        try
        {
            let validePosition = []
            let target = []
            let position = []
            // console.log("TESST : ", monstreInfo.forEach(monstre => {if(monstre.position == 1) return false})) 

            for(const monster of allMonster) position.push(monster.position)
            for(const monstre of monstreInfo)
            {
                
                cible.forEach(element => { target.push(element.slice(0,-2)) })

                if
                (
                    target.includes(monstre.nomId) && monstre.position == skill[0].target[1]
                    ||
                    target.includes(monstre.nomId) && skill[0].target[1] == 0
                    ||
                    target.includes("all") && skill[0].target[1] == 0
                    ||
                    target.includes("all") && monstre.position == skill[0].target[1]
                    ||
                    !isNaN(monstre.nom.replace(/[<@!>]/gm, " ")) 
                    ||
                    !position.includes(1)

                ) validePosition.push("true")
                else validePosition.push("false")
            }

            if(validePosition.includes("false")) return {state: false, message : "Votre attaque ne vous permet pas d'atteindre toute le monde merci de faire attention à la position des cibles !"}
            else return {state : true, message: ""}

        }catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
        }
    }











    //--------------------------------------- Calcul des dégats monstre ------------------------------------------  

    /**
     * @param {Array} monstre
     * @param {Array} zone
    */

    async dammageCalculMonstre(monstre, zone)
    {
        try
        {
            let diffLevel = zone[0].lvl - monstre[0].lvl 
            let atkLvlDiff = diffLevel * monstre[0].attaque.level[0]
            let AtkLvlCritDiff = diffLevel * monstre[0].attaque.level[1]
            let AtkLvlCritMissDiff = diffLevel * monstre[0].attaque.level[2]
            let AtkSpe = Math.floor(Math.random() * monstre[0].attaqueSpecial.length)
            let AtkSpeLvlDiff = diffLevel * monstre[0].attaqueSpecial[AtkSpe].level[0]
            let AtkSpeCritLvlDiff = diffLevel * monstre[0].attaqueSpecial[AtkSpe].level[1]
            let AtkSpecialActRandom = Math.floor(Math.random() * 100)
            let AtkSpecialCritActRandom = Math.floor(Math.random() * 100)
            let degat = []
            let missActivation = false
            let critActivation = false
            let atkSpeActivation = false
            let atkSpeCritActivation = false
            let atk = Math.floor(Math.random() * ( (monstre[0].attaque.degat[1] + atkLvlDiff) - ( monstre[0].attaque.degat[0] + atkLvlDiff) ) ) + ( monstre[0].attaque.degat[0] + atkLvlDiff )

            //---------------------- Calcul dégat attaque spécial ----------------------
            let attaqueSpecial = function()
            {
                atkSpeCritActivation = false
                    atk = Math.floor(Math.random() * ( (monstre[0].attaque.degat[1] + atkLvlDiff) - ( monstre[0].attaque.degat[0] + atkLvlDiff) ) ) + ( monstre[0].attaque.degat[0] + atkLvlDiff )
                    let atkSpecialDegat = monstre[0].attaqueSpecial[AtkSpe].degatBonus + AtkSpeLvlDiff

                    if( AtkSpecialCritActRandom < monstre[0].attaqueSpecial[AtkSpe].crit.activation + AtkSpeCritLvlDiff ) 
                    {
                        atkSpeCritActivation = true
                        atkSpecialDegat += monstre[0].attaqueSpecial[AtkSpe].crit.degatBonus + AtkSpeLvlDiff
                    }

                    return Math.round(atk + ((atk * atkSpecialDegat) / 100))
                
            }


            //---------------------- attaque miss ----------------------
            if(Math.floor(Math.random() * 100) <= monstre[0].attaque.miss + AtkLvlCritMissDiff) 
            {
                atk = 0
                missActivation = true
            }


            //---------------------- attaque critique ----------------------
            if(Math.floor(Math.random() * 100) <= monstre[0].attaque.crit[0] + AtkLvlCritDiff && missActivation != true)
            {
                atk += monstre[0].attaque.crit[1] + AtkLvlCritDiff
                critActivation = true
                
            }
            

            //---------------------- Activation attaque spécial ----------------------
            if (AtkSpecialActRandom  < monstre[0].attaqueSpecial[AtkSpe].activation + AtkSpeCritLvlDiff && atk != 0) 
            { 
                atkSpeActivation = true
                degat.push(
                {
                    degat: attaqueSpecial(), 
                    miss: missActivation,
                    critique: critActivation,
                    special: atkSpeActivation,
                    specialCritique: atkSpeCritActivation,
                    attaqueIndex: AtkSpe,
                })

                //---------------------- Activation attaque repeat ----------------------
                for(let i = 0; i <= monstre[0].attaqueSpecial[AtkSpe].repeat[1]; i++)
                {
                    let AtkSpecialRepeatRandom = Math.floor(Math.random() * 100)
                    
                    if(AtkSpecialRepeatRandom < monstre[0].attaqueSpecial[AtkSpe].repeat[0]) 
                    {
                        degat.push(
                        {
                            degat: attaqueSpecial(), 
                            miss: missActivation,
                            critique: critActivation,
                            special: atkSpeActivation,
                            specialCritique: atkSpeCritActivation,
                            attaqueIndex: AtkSpe,
                        })
                    }else break
                }
            }else degat.push(
            {
                degat: atk, 
                miss: missActivation,
                critique: critActivation,
                special: atkSpeActivation,
                specialCritique: atkSpeCritActivation,
                attaqueIndex: AtkSpe,
            })

            return(degat)
           
        } catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
        }
    }









    //--------------------------------------- Edit message embed status ------------------------------------------  

    /**
     * @param {Object} message
     * @param {String} user
     * @param {Array} multiCibleResult
     * @param {Array} skill
     * @param {Array} degatForEachMonstre
     * @param {Array} combatStatus
     * @param {Array} positionResult
     * @param {Array} embed
     * @param {String} oldOrder
    */

    async editCombatEmbed(message, user, multiCibleResult, skill, degatForEachMonstre, combatStatus, positionResult, embed, oldOrder)
    {
        try
        {
            let i = 0
            let result = {state: false, error: "", embed: [], combatId: ""}
            let isInCombat = false
            let cibleDead = false

            for(let field of embed.fields)
            {
                
                if(field.name == "Ordre du combat" && field.value.replace(/[<@>\n]/gm, " ").split(' ').filter(w => w !== '').includes(user)) isInCombat = true
                if(isInCombat)
                {
                    // Vérifie si la cible est pas morte
                    // for(const fields of embed.fields) 
                    // {
                        if(field.value == "mort" && multiCibleResult.cible.includes(field.name))  
                        {
                            embed.fields.slice(3)[0].value = oldOrder
                            embed.fields.slice(-1)[0].value = `${message.author.username} vous ne pouvez pas attaquer une cible déja morte`
                            cibleDead = true
                            break
                        }
                    // }

                    if(multiCibleResult.error == false && positionResult.state == true) // Si tout est good 
                    {
                        i = 0
                        for(const degatStatus of degatForEachMonstre) // Applique les dégat à chaque cible
                        {
                            if(field.name == multiCibleResult.cible[i] && parseInt(field.value) - degatStatus.degat > 0 && field.value != "mort") field.value = `${parseInt(field.value) - degatStatus.degat}`
                            else if(field.name == multiCibleResult.cible[i] && parseInt(field.value) - degatStatus.degat <= 0) 
                            {
                                let order = embed.fields.slice(3)[0].value.split("\n").filter(participant => !participant.includes(field.name))
                                
                                if(!order.some(member => member.includes(":x:"))) // Si tout le monde à déja fait son action ce tour
                                {
                                    order.forEach((value, id) => 
                                    {
                                        order[id] = order[id].replace(":white_check_mark:", ":x:") // On reset l'emoji pour tout le monde
                                    })
                                    embed.fields.slice(2)[0].value =  `${parseInt(embed.fields.slice(2)[0].value) + 1}`
                                }
                                embed.fields.slice(3)[0].value = order.join("\n")
                                field.value = "mort"
                            }
                            i++
                        }
                        
                        if(field.name == "Status" && combatStatus.length != 0 ) 
                        {
                            field.value = `\n${message.author.username} ${skill[0].description} ${combatStatus}`
                            if(embed.image == null ) embed.setImage("https://media.discordapp.net/attachments/951928506021998652/956361957173252147/ac8bc3366058336faf13e2414cbdb579.gif")
                            else embed.image.url = "https://media.discordapp.net/attachments/951928506021998652/956361957173252147/ac8bc3366058336faf13e2414cbdb579.gif"
                            degatForEachMonstre.forEach(degatResult => { if(degatResult.miss == false) embed.image.url = skill[0].image })
                        }
                    }
                    else if(positionResult.state == false && field.name == "Status") 
                    {
                        field.value = `\n${message.author.username} ${positionResult.message}` 
                        embed.fields.slice(3)[0].value = oldOrder
                        embed.fields.slice(2)[0].value = `${parseInt(embed.fields.slice(2)[0].value) - 1}`
                    }
                    else if(field.name == "Status") field.value = `\n${message.author.username} ${multiCibleResult.message}` 
                    
                }
                    
            }
            result.embed = embed
            result.state = true
            result.combatId = embed.author.name
            return result

        }catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
            return {state : false, error : error}
        }
    }







    
    //--------------------------------------- Check turn combat ------------------------------------------  

    /**
     * @param {String} user
     * @param {Object} message
    */

    async turnVerification(user, message)
    {
        let result = { state: true, error: "", embedId: "", embed: [], currentTurn: 1, oldOrder: ""}
        try
        {

            await message.channel.messages.fetch({limit: 25}) // Cherche les 25 derniers messages du channel 
            .then(async data => 
            {    
                for(const [key,value] of data.entries())
                {
                    let embed
                    if(value.embeds.length != 0) // Si message contient un embed
                    {
                        let isInCombat = false
                        embed = value.embeds[0]

                        for(let field of embed.fields)
                        {
                            if(
                                field.name == "Ordre du combat" && field.value.replace(/[<@>\n]/gm, " ").split(' ').filter(w => w !== '').includes(user) 
                                || 
                                field.name == "Ordre du combat" && field.value.includes(user)
                            )isInCombat = true  // Vérifie que l'user est bien dans le combat 

                            if(isInCombat && field.name == "Ordre du combat") // Si le l'user est bien dans le combat
                            {
                                
                                let order = field.value.split("\n")
                                result.oldOrder = order.join("\n")
                                let userOrder = order.filter(participant => participant.includes(user)).join("") //On get l'user qui fait son action dans la liste

                                if(userOrder.includes(":x:")) // Si user n'a pas déja fait son action
                                {
                                    if(!isNaN(user)) userOrder = `:white_check_mark:<@${userOrder.replace(/[:x<@> ]/gm, "")}>` // user prend l'emoji 
                                    else userOrder = `:white_check_mark:${userOrder.replace(/[:x<@> ]/gm, "")}` // monstre prend l'emoji 

                                    order.forEach( (value, id) =>  //remplace l'ancier user dans la liste de l'ordre du combat
                                    {
                                        if(value.includes(user)) order[id] = userOrder
                                    })

                                    result.currentTurn = parseInt(embed.fields.slice(2)[0].value)

                                    if(!order.some(member => member.includes(":x:"))) // Si tout le monde à déja fait son action ce tour
                                    {
                                        order.forEach((value, id) => 
                                        {
                                            order[id] = order[id].replace(":white_check_mark:", ":x:") // On reset l'emoji pour tout le monde
                                        })
                                        embed.fields.slice(2)[0].value = `${parseInt(embed.fields.slice(2)[0].value) + 1}`
                                    }

                                    for(let field of embed.fields) if(field.name == "Ordre du combat") field.value = order.join("\n") // edit le field "Ordre du combat"
                                }
                                else if(userOrder.includes(":white_check_mark:") && !order.includes(":x:")) // Si l'user à déja fait son action
                                {
                                    if(!isNaN(user)) embed.fields.slice(-1)[0].value = `<@${user}> tente d'attaquer mais il a déja effectué son action pour ce tour !` // Si l'user est un joueur
                                    else embed.fields.slice(-1)[0].value = `${user} tente d'attaquer mais il a déja effectué son action pour ce tour !` // Si le joueur est un monstre
                                    result.state = false
                                }

                                result.embedId = value.id
                                result.embed = embed
                                break
                            }
                        } 
                    }
                }
            })
            return result

        }catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
        }
    }















    //--------------------------------------- calcul dommage player attaque ---------------------------------------
    /**
     * @param {String} userData
     * @param {Number} degat
     * @param {Object} skill
    */

    async defenseCalculJoueur(userData, degat, skill)
    {
        try
        {
            let critique = 0
            let critiqueActivation = Math.floor(Math.random() * 100)
            let defense = Math.floor(Math.random() * ( (skill.defense.blocage[1]) - ( skill.defense.blocage[0]) ) ) + skill.defense.blocage[0] 

            if(critiqueActivation < skill.defense.crit[0]) critique = skill.defense.crit[1]
            degat = degat - userData.armure[0] - defense - critique
            if(degat < 0) degat = 0
            return degat

        } catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
        }
    }

}

module.exports = CombatFunction