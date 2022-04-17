const Monstre = require('../models/bestiaire.model.js')
const errorHelper = require('../helpers/error.helper')


class BestiaireController 
{
    constructor()
    {
        this.filename = "bestiaire.controller.js"
        this.type = "bestiaire"
    }

    // ----------------------------------------------------Create Mob ---------------------------------------------------
    /**
     * @param {Object} data
    */
    async createMonstre(data) 
    {
        const functionName = "createMonstre"
        try
        {      
            const monstre = new Monstre(
            {
                nom: data.nom,
                nomId: data.nomId,
                image: data.image,
                description: data.description, 
                lvl : data.lvl, 
                hp: data.hp,
                position: data.position,
                spawn: data.spawn,
                attaque: data.attaque,
                attaqueSpecial: data.attaqueSpecial,
                blocage: data.blocage,
                armure: data.armure,
                loot: data.loot
            })
        
            const bestiaireCheck = await Monstre.find({nom : monstre.nom })
            if(bestiaireCheck.length != 0) return errorHelper.monstreExist(monstre, functionName)

            const monstreSave = await monstre.save()
            return errorHelper.monstreCreated(monstreSave, functionName) 
                    
        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }








    // ----------------------------------------------------Get mob by zone ---------------------------------------------------

    /**
     * @param {String} zone
    */
     async getMonstreByZone(zone) 
     {
         const functionName = "getMonstreByZone";
         try
         {     
            const monstreGet = await Monstre.find({spawn : {$elemMatch : {zone: zone}}},'-_id -__v')
            return monstreGet
                     
         }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
     }




     // ----------------------------------------------------Get mob by nameId ---------------------------------------------------

    /**
     * @param {String} id
    */
     async getMonstreByNameId(id) 
     {
         const functionName = "getMonstreByZone";
         try
         {     
            const monstreGet = await Monstre.find({nomId : id},'-_id -__v')
            return monstreGet
                     
         }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
     }
}

module.exports = BestiaireController







