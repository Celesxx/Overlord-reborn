const Zone = require('../models/zone.model.js')
const errorHelper = require('../helpers/error.helper')

class ZoneController 
{
    constructor()
    {
        this.filename = "zone.controller.js"
        this.type = "zone"
    }

    // ----------------------------------------------------Create Zone ---------------------------------------------------
    /**
     * @param {Object} data
    */
    async createZone(data) 
    {
        const functionName = "createZone"
        try
        {      
            const zone = new Zone(
            {
                nom: data.nom,
                image: data.image,
                description: data.description,
                nombre: data.nombre,
                lv: data.lv,
                loot: data.loot,
            })
        
            const zoneCheck = await Zone.find({nom : zone.nom })
            if(zoneCheck.length != 0) return errorHelper.zoneExist(zone, functionName)

            const zoneSave = await zone.save()
            return errorHelper.zoneCreated(zoneSave, functionName) 
                    
        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }



    // ----------------------------------------------------Get skill by name ---------------------------------------------------

    /**
     * @param {String} zone
    */
     async getZoneByName(zone) 
     {
         const functionName = "getZoneByName";
         try
         {     
            const zoneGet = await Zone.find({nom : zone},'-_id -__v')
            return zoneGet
                     
         }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
     }
}

module.exports = ZoneController







