const CanvasCharacterFunction = require("../design/character.function.js")
const InventaireFunction = require("./inventaire.function.js")
const PlayerCreationFunction = require("./creation.function.js")
const bdd = require('../../bdd/bdd.json')
const lvl = require('../../bdd/lvl.json')
const fs = require("fs")


class ExperienceFunction 
{
    

    /**
     * @param {Number} lvl
    */
     async getXpNeedByLvl(lvl)
     {
        try
        {

         let xp = Math.round(100 + lvl + (lvl * 5 * 1.3))
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

         // console.log("rank before", rank)
         rank.sort((a,b)=>b.lvl - a.lvl)[0].lvl
         // console.log("rank after", rank)
         rank.sort((a,b)=>b.xp - a.xp)[0].xp
         // console.log("rank final", rank)

         let i = 0
         let rankPosition = rank.length
         for(const user of rank) user[0] == id ? rankPosition = i - 1 : i--

         return rankPosition

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
   async verifLvlUp(id, message, client, rankBefore, stat)
   {
      try
      {

         // let stat = bdd[id]
         let xpNeed, xpNeedNext
         let [HpGain, MaGain, AtGain, ArGain] = [0, 0, 0, 0]
         let levelUp = false
         const experienceFunction = new ExperienceFunction()
         const inventaireFunction = new InventaireFunction()
         const canvasCharacterFunction = new CanvasCharacterFunction()
         const playerCreationFunction = new PlayerCreationFunction()

         // let rankBefore = await experienceFunction.getRankPlayer(bdd, id)

         do
         {
            xpNeed = await experienceFunction.getXpNeedByLvl(stat.lvl + 1)
            xpNeedNext = await experienceFunction.getXpNeedByLvl(stat.lvl + 2)
                     
            if(stat.xp >= xpNeed)
            {
               levelUp = true
               
               
               stat = await inventaireFunction.removeEquipmentStat(stat)

               //ajoute le gain pour l'afficher dans l'image de level up
               HpGain += Math.round( lvl[`${stat.classe}_HP`] + ((lvl[`${stat.classe}_HP`] * stat.lvl * stat.hp[2]) - (lvl[`${stat.classe}_HP`] * stat.lvl)))
               MaGain += Math.round( lvl[`${stat.classe}_MA`] + ((lvl[`${stat.classe}_MA`] * stat.lvl * stat.magie[2]) - (lvl[`${stat.classe}_MA`] * stat.lvl)))
               AtGain += Math.round( lvl[`${stat.classe}_AT`] + ((lvl[`${stat.classe}_AT`] * stat.lvl * stat.attaque[2]) - (lvl[`${stat.classe}_AT`] * stat.lvl)))
               ArGain += lvl[`${stat.classe}_AR`] + ((lvl[`${stat.classe}_AR`] * stat.lvl * stat.armure[2]) - (lvl[`${stat.classe}_AR`] * stat.lvl))


               // Augmentation des stats en fonction de la classe et du palier
               stat.xp -= xpNeed
               stat.lvl += 1
               xpNeed = await experienceFunction.getXpNeedByLvl(stat.lvl + 1)
               
               
               // Stat total + gain de classe
               stat.attribut[0] += lvl[`palier${stat.ptPalier}`]
               stat.attribut[1] += lvl[`palier${stat.ptPalier}`]
               stat.hp[1] += lvl[`${stat.classe}_HP`] 
               stat.magie[1] += lvl[`${stat.classe}_MA`] 
               stat.attaque[1] += lvl[`${stat.classe}_AT`]
               stat.armure[1] = stat.armure[1] + lvl[`${stat.classe}_AR`]
               
               
               // Stat total * stat bonus de race
               stat.hp[1] += Math.round((lvl[`${stat.classe}_HP`] * stat.lvl * stat.hp[2]) - (lvl[`${stat.classe}_HP`] * stat.lvl))
               stat.magie[1] += Math.round((lvl[`${stat.classe}_MA`] * stat.lvl * stat.magie[2]) - (lvl[`${stat.classe}_MA`] * stat.lvl))
               stat.attaque[1] += Math.round((lvl[`${stat.classe}_AT`] * stat.lvl * stat.attaque[2]) - (lvl[`${stat.classe}_AT`] * stat.lvl))
               stat.armure[1] += (lvl[`${stat.classe}_AR`] * stat.lvl * stat.armure[2]) - (lvl[`${stat.classe}_AR`] * stat.lvl)


               //Si équipement rajoute toutes les stats qui ont été enlevé par l'ajout des nouvelles stats 
               stat = await inventaireFunction.addEquipmentStat(stat)

               //Ajoute les stat actuel après calcul de tous les bonus
               stat.hp[0] = stat.hp[1] 
               stat.magie[0] = stat.magie[1] 
               stat.attaque[0] = stat.attaque[1] 
               stat.armure[0] = stat.armure[1]
            }
         }while(stat.xp >= xpNeed)

         if(levelUp)
         {

            //Affiche le canvas lvl
            let save = await playerCreationFunction.editPlayerById(id, stat)
            let rankAfter = await experienceFunction.getRankPlayer(id)
            let percentXp = stat.xp * 100 / xpNeedNext 
            let currentRank = ""

            rankAfter < rankBefore ? currentRank = "down" : rankAfter > rankBefore ? currentRank = "up" : currentRank = "equal"
            const data = 
            {
               rank: [currentRank, rankAfter],
               Hp: HpGain,
               Mag: MaGain,
               Atk: AtGain,
               Def: ArGain,
               percent: percentXp,
               xpNeed: xpNeedNext,
               xp: stat.xp,
               lvl: stat.lvl
            }

            let channel = client.channels.cache.get('965223174570664007') //Channel Niveau
            // let channel = client.channels.cache.get('955068685146529874')
            await canvasCharacterFunction.displayCanvasLvlUp(channel, data, message, id)
            await playerCreationFunction.setNameRp(message, id)
         }
         
      }catch(error)
      {
         console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
      }
   }

    
}

module.exports = ExperienceFunction