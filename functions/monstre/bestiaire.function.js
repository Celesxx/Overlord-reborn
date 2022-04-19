const BestiaireController = require('../../controllers/bestiaire.controller')

class BestiaireFunction 
{
    /**
     * @param {String} message
    */
    async monstreCreation(message)
    {
        try
        {
            let data = JSON.parse(message.slice(17))
            let result = []
            for(const monstre in data)
            {
                const bestiaireController = new BestiaireController()
                const bestiaireFunction = await bestiaireController.createMonstre(data[monstre])
                result.push(bestiaireFunction)
            }
            return result

        } catch(error)
        {
            console.log(`error : ${error}`)
        }
    }
}

module.exports = BestiaireFunction