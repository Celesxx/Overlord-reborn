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
                stat.hp[1] += stat.equipement.casque[0]
                stat.magie[1] += stat.equipement.casque[1]
                stat.attaque[1] += stat.equipement.casque[2]
                stat.armure[1] += stat.equipement.casque[3]
            }

            if(stat.equipement.plastron.length != 0)
            {
                stat.hp[1] += stat.equipement.plastron[0]
                stat.magie[1] += stat.equipement.plastron[1]
                stat.attaque[1] += stat.equipement.plastron[2]
                stat.armure[1] += stat.equipement.plastron[3]
            }

            if(stat.equipement.arme.length != 0)
            {
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
        
        for(let [key, value] of Object.entries(stat.equipement)) 
        {
            if(value != undefined || value != null)
            {
                for( [keyStat, valueStat] of Object.entries(value.statistique))
                {
                    if(keyStat == "hp") stat.hp[1] -= valueStat
                    else if(keyStat == "mana") stat.magie[1] -= valueStat
                    else if(keyStat == "degat") stat.attaque[0] -= parseFloat(valueStat), stat.attaque[1] -= parseFloat(valueStat)
                    else if(keyStat == "defensePhysique") stat.armure[0] -= parseFloat(valueStat), stat.armure[1] -= parseFloat(valueStat)
                    else if(keyStat == "defenseMagique") stat.protection[0] -= parseFloat(valueStat), stat.protection[1] -= parseFloat(valueStat)
                }
            }
        }

        return stat

    }
 


    
    
}

module.exports = InventaireFunction