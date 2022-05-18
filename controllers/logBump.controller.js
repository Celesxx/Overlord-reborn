const LogBump = require('../models/logBump.model.js')
const errorHelper = require('../helpers/error.helper')

class LogBumpController 
{
    constructor()
    {
        this.filename = "logBump.controller.js"
        this.type = "logBump"
    }

    // ----------------------------------------------------Create combat log ---------------------------------------------------
    /**
     * @param {Object} data
    */
    async createLogBump(data) 
    {
        const functionName = "createLogBump"
        try
        {      
            const logBump = new LogBump(
            {
                userId: data.userId,
                bump: data.bump,
                role: data.role,
                money: data.money,
                xp: data.xp,
                date: data.date,
            })
        
            const logBumpCheck = await LogBump.find({userId : data.userId })
            if(logBumpCheck.length != 0) return errorHelper.bumpExist(logBump, functionName)

            const logBumpSave = await logBump.save()
            return errorHelper.bumpCreated(logBumpSave, functionName) 
                    
        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }








    // ----------------------------------------------------Get combat log by id ---------------------------------------------------

    /**
     * @param {Object} userId
    */
     async getLogBumpById(userId) 
     {
         const functionName = "getLogBumpById"
         try
         {     
            const logBumpGet = await LogBump.find({userId : userId},'-_id -__v')
            return logBumpGet[0]
                     
         }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
     }







    // ----------------------------------------------------edit bump log by id ---------------------------------------------------

    /**
     * @param {String} userId
     * @param {Object} data
    */
    async editLogBumpByUserId(userId, data) 
    {
        const functionName = "editLogBumpByUserId";
        try
        {     
            const logBump = await LogBump.updateOne({userId: userId}, data, {new: true})
            return logBump
                    
        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }





    // ----------------------------------------------------Get all bump log ---------------------------------------------------

    /**
     * @param {Object} combatId
    */
    async getAllLogBump() 
    {
        const functionName = "getAllLogBump";
        try
        {
            const logBumpGet = await LogBump.find().select('-_id -__v')
            return logBumpGet          
        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }




}

module.exports = LogBumpController







