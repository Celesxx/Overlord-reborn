const bdd = require('../../bdd/bdd.json')

class InventaireFunction 
{




    /**
     * @param {String} stat
    */
    async addEquipmentStat(stat)
    {
        try
        {
            if(stat.equipement.casque.length != 0)
            {
                console.log("test")
                stat.hp[1] += stat.equipement.casque[0]
                stat.magie[1] += stat.equipement.casque[1]
                stat.attaque[1] += stat.equipement.casque[2]
                stat.armure[1] += stat.equipement.casque[3]
            }

            if(stat.equipement.plastron.length != 0)
            {
                console.log("test1")
                stat.hp[1] += stat.equipement.plastron[0]
                stat.magie[1] += stat.equipement.plastron[1]
                stat.attaque[1] += stat.equipement.plastron[2]
                stat.armure[1] += stat.equipement.plastron[3]
            }

            if(stat.equipement.arme.length != 0)
            {
                console.log("test2")
                stat.hp[1] += stat.equipement.arme[0]
                stat.magie[1] += stat.equipement.arme[1]
                stat.attaque[1] += stat.equipement.arme[2]
                stat.armure[1] += stat.equipement.arme[3]
            }

            return stat

        }catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
        }
    }





    /**
     * @param {String} stat
    */
    async removeEquipmentStat(stat)
    {
        try
        {
            if(stat.equipement.casque.length != 0)
            {
                console.log("test")
                stat.hp[1] -= stat.equipement.casque[0]
                stat.magie[1] -= stat.equipement.casque[1]
                stat.attaque[1] -= stat.equipement.casque[2]
                stat.armure[1] -= stat.equipement.casque[3]
            }

            if(stat.equipement.plastron.length != 0)
            {
                console.log("test1")
                stat.hp[1] -= stat.equipement.plastron[0]
                stat.magie[1] -= stat.equipement.plastron[1]
                stat.attaque[1] -= stat.equipement.plastron[2]
                stat.armure[1] -= stat.equipement.plastron[3]
            }

            if(stat.equipement.arme.length != 0)
            {
                console.log("test2")
                stat.hp[1] -= stat.equipement.arme[0]
                stat.magie[1] -= stat.equipement.arme[1]
                stat.attaque[1] -= stat.equipement.arme[2]
                stat.armure[1] -= stat.equipement.arme[3]
            }

            return stat

        }catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
        }
    }
 


    
    
}

module.exports = InventaireFunction