const CanvasCharacterFunction = require("./design/character.function.js")
const InventaireFunction = require("./inventaire.function.js")
const bdd = require('../bdd/bdd.json')
const lvl = require('../bdd/lvl.json')
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
         console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
        }
     }







   /**
    * @param {Number} lvl
   */
   async getRankPlayer(id)
   {
      try
      {
         let rank = []
         for(const user in bdd) rank.push([bdd[user].id, bdd[user].xp])

         rank.sort((a,b)=>b[1]-a[1])

         let i = 0
         let rankPosition = 0
         for(const user of rank) user[0] == id ? rankPosition = i +1 : i++

         return rankPosition

      }catch(error)
      {
         console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
      }
   }








    /**
     * @param {String} id
     * @param {Object} message
     * @param {Object} client
   */
   async verifLvlUp(id, message, client, rankBefore)
   {
      try
      {

         let stat = bdd[id]

         const experienceFunction = new ExperienceFunction()
         const inventaireFunction = new InventaireFunction()
         const canvasCharacterFunction = new CanvasCharacterFunction()


         let xpNeed = await experienceFunction.getXpNeedByLvl(stat.lvl + 1)
         let xpNeedNext = await experienceFunction.getXpNeedByLvl(stat.lvl + 2)
         // let rankBefore = await experienceFunction.getRankPlayer(bdd, id)
         
         console.log("xp : ", stat.xp)
         console.log("xp need : ", xpNeed)
         if(stat.xp >= xpNeed)
         {
            let HpGain = lvl[`${stat.classe}_HP`] 
            let MaGain = lvl[`${stat.classe}_MA`] 
            let AtGain = lvl[`${stat.classe}_AT`]
            let ArGain = lvl[`${stat.classe}_AR`] 
            // Augmentation des stats en fonction de la classe et du palier
            stat.xp -= xpNeed
            stat.lvl += 1
            stat.ptStock += lvl[`palier${stat.ptPalier}`]
            stat.HP += HpGain
            stat.MA += MaGain
            stat.AT += AtGain
            stat.AR += ArGain

            // Stat de classe * stat bonus de race
            stat.HPtotal = Math.round(stat.HP * stat.Php)
            stat.MAtotal = Math.round(stat.MA * stat.Pma)
            stat.ATtotal = Math.round(stat.AT * stat.Pat)
            stat.ARtotal = Math.round(stat.AR * stat.Par)

            //Vérifie que le multiplicateur de bonus de race pour l'armure donne bien un chiffre qui s'incrèmente max de 0.5 par 0.5. Corrige si ce n'est pas le cas
            let Ar = stat.AR; // 1.5
            let totalAR = stat.AR * stat.Par // 1.575
            if(totalAR != Ar && Math.round(totalAR) == Ar) stat.ARtotal = Ar 
            else if(totalAR != Ar) stat.ARtotal = Math.round(totalAR)-0.5

            //Ajoute les stat actuel après calcul de tous les bonus
            stat.ARactuel = stat.ARtotal 
            stat.MAactuel = stat.MAtotal
            stat.ATactuel = stat.ATtotal 
            stat.HPactuel = stat.HPtotal

            //Si équipement rajoute toutes les stats qui ont été enlevé par l'ajout des nouvelles stats 
            await inventaireFunction.checkEquipmentStat(id)

            //Affiche le canvas lvl 
            let rankAfter = await experienceFunction.getRankPlayer(bdd, id)
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

            fs.writeFile("bdd/bdd.json", JSON.stringify(bdd,null,4), (err) =>{

               if (err)
               {
                  console.log(err)
               }
               
         
            })

            let channel = client.channels.cache.get('965223174570664007') //Channel Niveau
            // let channel = client.channels.cache.get('955068685146529874')
            
            await canvasCharacterFunction.displayCanvasLvlUp(channel, data, message, id)

         }
      }catch(error)
      {
         console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
      }
   }

    
}

module.exports = ExperienceFunction