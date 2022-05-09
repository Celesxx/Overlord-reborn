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
            let [weaponCrit, weaponPenetration] = [0,0]

            if(userData.equipement.some(item => item.type != undefined))
            {
                weaponCrit = userData.equipement.arme.statistique.critique
                weaponPenetration = userData.equipement.arme.statistique.penetration
                console.log("penetration : ", userData.equipement.arme.statistique.penetration) 
                console.log("critique : ", userData.equipement.arme.statistique.critique) 
            }

            let diffLevel = zone[0].lvl - monstreData[0].lvl 
            if(diffLevel >= -5 && diffLevel <= 5) diffLevel = 0

            let skillMultiplier = Math.floor(Math.random() * (skill[0].attaque.degat[1] - skill[0].attaque.degat[0]) ) + skill[0].attaque.degat[0];
            if(Math.floor(Math.random() * 100) <= skill[0].attaque.crit[0]) skillMultiplier += skill[0].attaque.crit[1]
            

            let blocageLevelDiff = diffLevel * monstreData[0].blocage.level[0]
            let blocageCritLevelDiff = diffLevel * monstreData[0].blocage.level[1]
            let blocageMissLevelDiff = diffLevel * monstreData[0].blocage.level[2]
            let missRoll = Math.floor(Math.random() * 100)
            let missRollPlayer = Math.floor(Math.random() * 100)
            let monstreBlocage = Math.floor(Math.random() * ( (monstreData[0].blocage.degat[1] + blocageLevelDiff) - ( monstreData[0].blocage.degat[0] + blocageLevelDiff) ) ) + ( monstreData[0].blocage.degat[0] + blocageLevelDiff )
            console.log("Server status : miss player attack" + missRollPlayer)

            if(Math.floor(Math.random() * 100) <= monstreData[0].blocage.crit[0] + blocageCritLevelDiff) monstreBlocage += monstreData[0].blocage.crit[1]
            if(missRoll <= monstreData[0].blocage.miss + blocageMissLevelDiff) monstreBlocage = 0
            if(missRollPlayer <= skill[0].attaque.miss) return {miss : true, degat: 0}
            else
            {
                let degat = ((userData.attaque[0] * skillMultiplier) / 100) + userData.attaque[0]
                let degatTotal = (( degat - monstreBlocage) * (100 - monstreData[0].armure)) / 100 // attaque actuelle * multiplicateur - blocage - réduction armure
                if(degatTotal < 0) degatTotal = 0
                return {miss : false, degat: Math.round(degatTotal), isMob: true}
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
         
        let weaponCrit = 0

        if(userData.equipement.some(item => item.type != undefined)) weaponCrit = userData.equipement.arme.statistique.critique
        console.log("critique : ", userData.equipement.arme.statistique.critique) 
        
        let skillMultiplier = Math.floor(Math.random() * (skill[0].attaque.degat[1] - skill[0].attaque.degat[0]) ) + skill[0].attaque.degat[0];
        if(Math.floor(Math.random() * 100) <= skill[0].attaque.crit[0] + weaponCrit) skillMultiplier += skill[0].attaque.crit[1]
        
        if(Math.floor(Math.random() * 100) <= skill[0].attaque.miss && skill[0].attaque.miss != 0) return {miss : true, degat: 0}
        else
        {
            let degat = ((userData.attaque[0] * skillMultiplier) / 100) + userData.attaque[0]
            if(degat < 0) degat = 0
            return {miss : false, degat: Math.round(degat), isMob : false}
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
            if(diffLevel >= -5 && diffLevel <= 5) diffLevel = 0
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
     * @param {Object} author
     * @param {String} user
     * @param {Array} multiCibleResult
     * @param {Array} skill
     * @param {Array} degatForEachMonstre
     * @param {Array} combatStatus
     * @param {Array} positionResult
     * @param {Array} embed
     * @param {String} oldOrder
    */

    async editCombatEmbed(user, multiCibleResult, skill, degatForEachMonstre, combatStatus, positionResult, embed, oldOrder)
    {
        let i = 0
        let result = {state: false, error: "", embed: [], combatId: ""}

        for(let field of embed.fields)
        {
            if(field.value == "mort" && multiCibleResult.cible.includes(field.name))  
            {
                embed.fields.slice(3)[0].value = oldOrder
                embed.fields.slice(-1)[0].value = `<@${user}> vous ne pouvez pas attaquer une cible déja morte`
                break
            }
        }
                

        if(multiCibleResult.error == false && positionResult.state == true) // Si tout est good 
        {
            i = 0
            for(const degatStatus of degatForEachMonstre) // Applique les dégat à chaque cible
            {
                if(degatStatus.isMob)
                {
                    let target = embed.fields.find(field => field.name === multiCibleResult.cible[i])
                    let targetIndex = embed.fields.indexOf(target)
                    if(target.length != 0 && parseInt(target.value) - degatStatus.degat > 0 && target.value != "mort") embed.fields.slice(targetIndex)[0].value = `${parseInt(target.value) - degatStatus.degat}`
                    else 
                    {
                        embed.fields.slice(targetIndex)[0].value = "mort"
                        embed.fields.slice(3)[0].value = embed.fields.slice(3)[0].value.split("\n").filter(participant => !participant.includes(target.name)).join("\n") 
                    }
                }
                i++
            }


            embed.fields.slice(-1)[0].value = `\n<@${user}> ${skill[0].description} ${combatStatus}`
            if(degatForEachMonstre.some(result => result.miss == false)) embed.image != null? embed.image.url = skill[0].image : embed.setImage(skill[0].image)
            else embed.image.url = skill[0].imageMiss
            
            let order = embed.fields.slice(3)[0].value.split("\n")     
            if(!order.some(member => member.includes(":x:"))) // Si tout le monde à déja fait son action ce tour
            {
                order.forEach((value, id) => 
                {
                    order[id] = order[id].replace(":white_check_mark:", ":x:") // On reset l'emoji pour tout le monde
                })
                embed.fields.slice(2)[0].value =  `${parseInt(embed.fields.slice(2)[0].value) + 1}`
            }
            embed.fields.slice(3)[0].value = order.join("\n")   


        }else if(positionResult.state == false) 
        {
            embed.fields.slice(-1)[0].value = `\n<@${user}> ${positionResult.message}` 
            embed.fields.slice(3)[0].value = oldOrder
            embed.fields.slice(2)[0].value = `${parseInt(embed.fields.slice(2)[0].value) - 1}`

        }else embed.fields.slice(-1)[0] = `\n<@${user}> ${multiCibleResult.message}` 
                            
        result.embed = embed
        result.state = true
        result.combatId = embed.author.name
        return result
    }







    
    //--------------------------------------- Check turn combat ------------------------------------------  

    /**
     * @param {String} user
     * @param {Object} embed
    */

    async turnVerification(user, embed)
    {
        let result = { state: true, error: "", embed: [], currentTurn: 1, oldOrder: embed.fields.slice(3)[0].value}
        try
        {

            let order = embed.fields.slice(3)[0].value.split("\n")
            let userOrder = order.filter(participant => participant.includes(user)).join("") //On get l'user qui fait son action dans la liste

            if(userOrder.includes(":x:")) // Si user n'a pas déja fait son action
            {
                if(!isNaN(user)) userOrder = `:white_check_mark:<@${userOrder.replace(/[:x<@> ]/gm, "")}>` // user prend l'emoji 
                else userOrder = `:white_check_mark:${userOrder.replace(/[:x<@> ]/gm, "")}` // monstre prend l'emoji 

                order.forEach( (value, id) => { if(value.includes(user)) order[id] = userOrder }) //remplace l'ancier user dans la liste de l'ordre du combat
                result.currentTurn = parseInt(embed.fields.slice(2)[0].value)

                if(!order.some(member => member.includes(":x:"))) // Si tout le monde à déja fait son action ce tour
                {
                    order.forEach((value, id) => 
                    {
                        order[id] = order[id].replace(":white_check_mark:", ":x:") // On reset l'emoji pour tout le monde
                    })
                    embed.fields.slice(2)[0].value = `${parseInt(embed.fields.slice(2)[0].value) + 1}`
                }

                embed.fields.slice(3)[0].value = order.join("\n") // edit le field "Ordre du combat"

            }else if(userOrder.includes(":white_check_mark:") && !order.includes(":x:")) // Si l'user à déja fait son action
            {
                if(!isNaN(user)) embed.fields.slice(-1)[0].value = `<@${user}> tente d'attaquer mais il a déja effectué son action pour ce tour !` // Si l'user est un joueur
                else embed.fields.slice(-1)[0].value = `${user} tente d'attaquer mais il a déja effectué son action pour ce tour !` // Si le joueur est un monstre
                result.state = false
            }

            result.embed = embed
                                
                      
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
            let miss = false
            let critique = 0
            let critiqueActivation = Math.floor(Math.random() * 100)
            let defense = Math.floor(Math.random() * ( (skill.defense.blocage[1]) - ( skill.defense.blocage[0]) ) ) + skill.defense.blocage[0] 

            if(Math.floor(Math.random() * 100) <= skill.defense.miss) miss = true
            if(critiqueActivation < skill.defense.crit[0]) critique = skill.defense.crit[1]
            if(!miss) degat = degat - (degat * userData.armure[0] / 100) - defense - critique
            if(degat < 0) degat = 0
            return {miss: miss, degat : parseInt(degat.toFixed(1)) }

        } catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
        }
    }

}

module.exports = CombatFunction