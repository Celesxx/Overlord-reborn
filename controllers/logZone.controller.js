const LogZone = require('../models/logZone.model.js')
const errorHelper = require('../helpers/error.helper')

class LogBumpController 
{
    constructor()
    {
        this.filename = "logZone.controller.js"
        this.type = "logZone"
    }

    // ----------------------------------------------------Create combat log ---------------------------------------------------
    /**
     * @param {Object} data
    */
    async createLogZone(data) 
    {
        const functionName = "createLogZone"
        try
        {      
            const logZone = new LogZone(
            {
                author: data.author,
                createdAt: data.createdAt,
                totalCombat: data.totalCombat,
                resetDate: data.resetDate,
            })
        
            const logZoneCheck = await LogZone.find({author : data.author })
            if(logZoneCheck.length != 0) return errorHelper.zoneExist(logZone, functionName)

            const logZoneSave = await logZone.save()
            return errorHelper.zoneCreated(logZoneSave, functionName) 
                    
        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }








    // ----------------------------------------------------Get combat log by id ---------------------------------------------------

    /**
     * @param {Object} author
    */
     async getLogZoneById(author) 
     {
         const functionName = "getLogZoneById"
         try
         {     
            const logZone = await LogZone.find({author : author},'-_id -__v')
            return logZone[0]
                     
         }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
     }







    // ----------------------------------------------------edit bump log by id ---------------------------------------------------

    /**
     * @param {String} author
     * @param {Object} data
    */
    async editLogZoneByUserId(author, data) 
    {
        const functionName = "editLogZoneByUserId";
        try
        {     
            const logZone = await LogZone.updateOne({author: author}, data, {new: true})
            return logZone
                    
        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }





    // ----------------------------------------------------Get all bump log ---------------------------------------------------

    /**
     * @param {Object} combatId
    */
    async getAllLogZone() 
    {
        const functionName = "getAllLogZone";
        try
        {
            const logZone = await LogZone.find().select('-_id -__v')
            return logZone         
        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }




}

module.exports = LogBumpController







