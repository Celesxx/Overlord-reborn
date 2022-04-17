const bdd = require('../bdd/bdd.json')

class InventaireFunction 
{
    /**
     * @param {String} id
    */
    async checkEquipmentStat(id)
    {
        try
        {
            let stat = bdd[id]
            if(stat.casque != {})
            {
                let casque = stat.casque[Object.keys(stat.casque)[0]]
                stat.HPactuel += casque[0]
                stat.ARactuel += casque[1]
                stat.ATactuel += casque[2]
                stat.MAactuel += casque[3]
            }

            if(stat.plastron != {})
            {
                let plastron = stat.plastron[Object.keys(stat.plastron)[0]]
                stat.HPactuel += plastron[0]
                stat.ARactuel += plastron[1]
                stat.ATactuel += plastron[2]
                stat.MAactuel += plastron[3]
            }

            if(stat.arme != {})
            {
                let arme = stat.arme[Object.keys(stat.arme)[0]]
                stat.HPactuel += arme[0]
                stat.ARactuel += arme[1]
                stat.ATactuel += arme[2]
                stat.MAactuel += arme[3]
            }

            return

        }catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
        }
    }
    
}

module.exports = InventaireFunction