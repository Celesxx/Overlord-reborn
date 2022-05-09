const CanvasCharacterFunction = require("../design/character.function.js")
const InventaireFunction = require("./inventaire.function.js")
const PlayerCreationFunction = require("./creation.function.js")
const lvl = require('../../bdd/lvl.json')
const classe = require('../../bdd/classe.json')
const fs = require("fs")
const { type } = require("express/lib/response")


class ExperienceFunction 
{
    

    /**
     * @param {Number} lvl
    */
     async getXpNeedByLvl(lvl)
     {
        try
        {

         let y = 100
         for(let i = 1; i < lvl; i++)  y = y + i + (i * 5 * 1.3)
         let xp = Math.round(y + lvl + (lvl * 5 * 1.3))
         return xp

        }catch(error)
        {
         console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
        }
     }







   /**
    * @param {Number} lvl
   */
   async getRankPlayer(id)
   {
      try
      {

         const playerCreationFunction = new PlayerCreationFunction()
         let rank = await playerCreationFunction.getPlayerStatForRankById(id)

         rank.sort((a,b)=> b.lvl == a.lvl ? b.xp - a.xp : b.lvl - a.lvl )[0].lvl

         let i = 0
         let rankPosition = rank.length
         for(const user of rank) user.id == id ? rankPosition = i - 1 : i--
         
         return rankPosition.toString().replace(/[-+]/gm, "")

      }catch(error)
      {
         console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
      }
   }








    /**
     * @param {String} id
     * @param {Object} message
     * @param {Object} client
     * @param {Number} rankBefore
     * @param {Object} stat
   */
   async verifLvlUp(id, client,interaction, rankBefore, stat)
   {
      try
      {

         // let stat = bdd[id]
         let xpNeed, xpNeedNext
         let [HpGain, MaGain, AtGain, ArGain, PtGain] = [0, 0, 0, 0, 0]
         let levelUp = false
         const experienceFunction = new ExperienceFunction()
         const inventaireFunction = new InventaireFunction()
         const canvasCharacterFunction = new CanvasCharacterFunction()
         const playerCreationFunction = new PlayerCreationFunction()


         do
         {
            xpNeed = await experienceFunction.getXpNeedByLvl(stat.lvl + 1)
            console.log("Server status : xp actuel => ", stat.xp)
            console.log("Server status : xpNeed => ", xpNeed)
            xpNeedNext = await experienceFunction.getXpNeedByLvl(stat.lvl + 2)
         
            if(stat.xp >= xpNeed)
            {
               levelUp = true
               
               let classStat = classe[stat.classe].statistiques
               let palier = 2

               stat = await inventaireFunction.removeEquipmentStat(stat)

               //ajoute le gain pour l'afficher dans l'image de level up
               HpGain += Math.round( classStat.hp * (stat.lvl - 1) * stat.hp[2] - (classStat.hp * (stat.lvl - 2) * stat.hp[2]) )
               MaGain += Math.round( (classStat.mana * (stat.lvl - 1) * stat.magie[2]) - (classStat.mana * (stat.lvl - 2) * stat.magie[2]) )
               AtGain += parseFloat(((classStat.attaque * (stat.lvl - 1) * stat.attaque[2]) - (classStat.attaque * (stat.lvl - 2) * stat.attaque[2])).toFixed(2))
               ArGain += parseFloat(((classStat.armure * (stat.lvl - 1) * stat.armure[2]) - (classStat.armure * (stat.lvl - 2) * stat.armure[2])).toFixed(2))
               PtGain += parseFloat(((classStat.protection * (stat.lvl - 1) * stat.protection[2]) - (classStat.protection * (stat.lvl - 2) * stat.protection[2])).toFixed(2))

               // Augmentation des stats en fonction de la classe et du palier
               stat.xp -= xpNeed
               stat.lvl += 1
               xpNeed = await experienceFunction.getXpNeedByLvl(stat.lvl + 1)
               
               if(stat.lvl >= 30) palier = 3
               else if(stat.lvl >= 45) palier = 4

               // Stat total + gain de classe
               stat.attribut[0] += palier
               stat.attribut[1] += palier
               
               // Stat total * stat bonus de race
               stat.hp[1] = Math.round( stat.hp[1] - (classStat.hp * (stat.lvl - 2) * stat.hp[2]) + (classStat.hp * (stat.lvl - 1) * stat.hp[2]) )
               stat.magie[1] = Math.round( stat.magie[1] - (classStat.mana * (stat.lvl - 2) * stat.magie[2]) + (classStat.mana * (stat.lvl - 1) * stat.magie[2]) )
               stat.attaque[1] = parseFloat( (stat.attaque[1] - (classStat.attaque * (stat.lvl - 2) * stat.attaque[2]) + (classStat.attaque * (stat.lvl - 1) * stat.attaque[2])).toFixed(2) )
               stat.armure[1] = parseFloat( (stat.armure[1] - (classStat.armure * (stat.lvl - 2) * stat.armure[2]) + (classStat.armure * (stat.lvl - 1) * stat.armure[2])).toFixed(2) )
               stat.protection[1] = parseFloat( (stat.protection[1] - (classStat.protection * (stat.lvl - 2) * stat.protection[2]) + (classStat.protection * (stat.lvl - 1) * stat.protection[2])).toFixed(2) )
               
               //Si équipement rajoute toutes les stats qui ont été enlevé par l'ajout des nouvelles stats 
               stat = await inventaireFunction.addEquipmentStat(stat)

               //Ajoute les stat actuel après calcul de tous les bonus
               stat.hp[0] = stat.hp[1] 
               stat.magie[0] = stat.magie[1] 
               stat.attaque[0] = stat.attaque[1]
               stat.armure[0] = stat.armure[1]
               stat.protection[0] = stat.protection[1]
            }
         }while(stat.xp >= xpNeed)

         if(levelUp)
         {

            //Affiche le canvas lvl
            let response = await playerCreationFunction.editPlayerById(id, stat)
            let rankAfter = await experienceFunction.getRankPlayer(id)
            let percentXp = stat.xp * 100 / xpNeedNext 
            let currentRank = ""

            if(rankAfter < rankBefore) currentRank = "down"
            else if(rankAfter > rankBefore) currentRank = "up"
            else currentRank = "equal"

            const data = 
            {
               rank: [currentRank, rankAfter],
               Hp: HpGain,
               Mag: MaGain,
               Atk: AtGain,
               Def: ArGain,
               Pt: PtGain,
               percent: percentXp,
               xpNeed: xpNeedNext,
               xp: stat.xp,
               lvl: stat.lvl,
               image: stat.image
            }

            let channel = client.channels.cache.get('965223174570664007') //Channel Niveau
            // let channel = client.channels.cache.get('955068685146529874')
            await canvasCharacterFunction.displayCanvasLvlUp(channel, data, id)
            await playerCreationFunction.setNameRp(interaction, id)
         }
         
      }catch(error)
      {
         console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
      }
   }

    
}

module.exports = ExperienceFunction