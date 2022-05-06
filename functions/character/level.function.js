const CanvasCharacterFunction = require("../design/character.function.js")
const InventaireFunction = require("./inventaire.function.js")
const PlayerCreationFunction = require("./creation.function.js")
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
   async verifLvlUp(id, client,interaction, rankBefore, stat)
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


         do
         {
            console.log("lvl : ", stat.lvl)
            xpNeed = await experienceFunction.getXpNeedByLvl(stat.lvl + 1)
            console.log("xpNeed : ", xpNeed)
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
               stat.attribut[0] += lvl[`palier${stat.attributPalier}`]
               stat.attribut[1] += lvl[`palier${stat.attributPalier}`]
               stat.hp[1] += lvl[`${stat.classe}_HP`] 
               stat.magie[1] += lvl[`${stat.classe}_MA`] 
               stat.attaque[1] += lvl[`${stat.classe}_AT`]
               console.log("armure before : ", stat.armure)
               console.log((parseFloat(stat.armure[1]) + parseFloat(lvl[`${stat.classe}_AR`])).toFixed(2))
               stat.armure[1] = (parseFloat(stat.armure[1]) + parseFloat(lvl[`${stat.classe}_AR`])).toFixed(2)
               console.log("armure before1 : ", stat.armure)
               
               
               // Stat total * stat bonus de race
               stat.hp[1] += Math.round((lvl[`${stat.classe}_HP`] * stat.lvl * stat.hp[2]) - (lvl[`${stat.classe}_HP`] * stat.lvl))
               stat.magie[1] += Math.round((lvl[`${stat.classe}_MA`] * stat.lvl * stat.magie[2]) - (lvl[`${stat.classe}_MA`] * stat.lvl))
               stat.attaque[1] += Math.round((lvl[`${stat.classe}_AT`] * stat.lvl * stat.attaque[2]) - (lvl[`${stat.classe}_AT`] * stat.lvl))
               console.log("armure before2 : ", stat.armure)
               stat.armure[1] += (lvl[`${stat.classe}_AR`] * stat.lvl * stat.armure[2]) - (lvl[`${stat.classe}_AR`] * stat.lvl).toFixed(2)
               console.log("armure before3 : ", stat.armure)
               

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
            console.log(stat)
            console.log("id : ", id)
            let response = await playerCreationFunction.editPlayerById(id, stat)
            console.log(response)
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
               Def: ArGain.toFixed(2),
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