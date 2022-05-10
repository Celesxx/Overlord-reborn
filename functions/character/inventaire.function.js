class InventaireFunction 
{




    /**
     * @param {String} stat
    */
    async addEquipmentStat(stat)
    {
        for(let [key, value] of Object.entries(stat.equipement)) 
        {
            if(value != undefined && value != null && !Array.isArray(value))
            {
                for(const [keyStat, valueStat] of Object.entries(value.statistique))
                {
                    if(keyStat == "hp") stat.hp[1] += valueStat
                    else if(keyStat == "mana") stat.magie[1] += valueStat
                    else if(keyStat == "degat") stat.attaque[1] += parseFloat(valueStat)
                    else if(keyStat == "defensePhysique") stat.armure[1] += parseFloat(valueStat)
                    else if(keyStat == "defenseMagique") stat.protection[1] += parseFloat(valueStat)
                }

            }else if(value != undefined && value != null && Array.isArray(value))
            {
                for(const element of value)
                {
                    for(const [keyStat, valueStat] of Object.entries(element))
                    {
                        if(keyStat == "hp") stat.hp[1] += valueStat
                        else if(keyStat == "mana") stat.magie[1] += valueStat
                        else if(keyStat == "degat") stat.attaque[1] += parseFloat(valueStat)
                        else if(keyStat == "defensePhysique") stat.armure[1] += parseFloat(valueStat)
                        else if(keyStat == "defenseMagique") stat.protection[1] += parseFloat(valueStat)
                    }
                }
            }
        }
        return stat
    }



    /**
     * @param {String} stat
    */
    async removeEquipmentStat(stat)
    {
        for(let [key, value] of Object.entries(stat.equipement)) 
        {
            if(value != undefined && value != null && !Array.isArray(value))
            {
                console.log("test")
                for(const [keyStat, valueStat] of Object.entries(value.statistique))
                {
                    if(keyStat == "hp") stat.hp[1] -= valueStat
                    else if(keyStat == "mana") stat.magie[1] -= valueStat
                    else if(keyStat == "degat") stat.attaque[1] -= parseFloat(valueStat)
                    else if(keyStat == "defensePhysique") stat.armure[1] -= parseFloat(valueStat)
                    else if(keyStat == "defenseMagique") stat.protection[1] -= parseFloat(valueStat)
                }
            }else if(value != undefined  && value != null && Array.isArray(value))
            {
                for(const element of value)
                {
                    for(const [keyStat, valueStat] of Object.entries(element))
                    {
                        if(keyStat == "hp") stat.hp[1] -= valueStat
                        else if(keyStat == "mana") stat.magie[1] -= valueStat
                        else if(keyStat == "degat") stat.attaque[1] -= parseFloat(valueStat)
                        else if(keyStat == "defensePhysique") stat.armure[1] -= parseFloat(valueStat)
                        else if(keyStat == "defenseMagique") stat.protection[1] -= parseFloat(valueStat)
                    }
                }
            }
        }
        return stat
    }
 


    
    
}

module.exports = InventaireFunction