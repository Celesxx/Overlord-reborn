const BestiaireController = require('../../controllers/bestiaire.controller')

class BestiaireFunction 
{
    /**
     * @param {String} data
    */
    async monstreCreation(data)
    {
        try
        {
            const bestiaireController = new BestiaireController()            
            return await bestiaireController.createMonstre(data)

        } catch(error)
        {
            console.log(`error : ${error}`)
        }
    }
}

module.exports = BestiaireFunction