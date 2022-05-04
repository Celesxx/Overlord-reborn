const LogCombat = require('../models/logCombat.model.js')
const errorHelper = require('../helpers/error.helper')

class LogCombatController 
{
    constructor()
    {
        this.filename = "logCombat.controller.js"
        this.type = "logCombat"
    }

    // ----------------------------------------------------Create combat log ---------------------------------------------------
    /**
     * @param {Object} data
    */
    async createLogCombat(data) 
    {
        const functionName = "createLog"
        try
        {      
            const logCombat = new LogCombat(
            {
                author: data.author,
                combatId: data.combatId,
                messageId: data.messageId,
                createdAt: data.createdAt, 
                zoneLvl: data.zoneLvl,
                moyLvlPlayer: data.moyLvlPlayer,
                channel: data.channel,
                round: data.round, 
                reward: data.reward,
                participant: data.participant,
                recompense: data.recompense,
                over: data.over,
            })
        
            const logCombatCheck = await LogCombat.find({combatId : data.combatId })
            if(logCombatCheck.length != 0) return errorHelper.zoneExist(logCombat, functionName)

            const logCombatSave = await logCombat.save()
            return errorHelper.zoneCreated(logCombatSave, functionName) 
                    
        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }








    // ----------------------------------------------------Get combat log by id ---------------------------------------------------

    /**
     * @param {Object} combatId
    */
     async getLogCombatById(combatId) 
     {
         const functionName = "getLogCombatById";
         try
         {     
            const logCombatGet = await LogCombat.find({combatId : combatId},'-_id -__v')
            return logCombatGet
                     
         }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
     }









    // ----------------------------------------------------Get combat log by participant ---------------------------------------------------

    /**
     * @param {String} id
    */
     async getLogCombatParticipantId(id) 
     {
         const functionName = "getLogCombatById";
         try
         {  
            let logCombatGet = await LogCombat.find({participant : {$in : [`<@!${id}>`]}, over: false, recompense: false},'-_id -__v')
            if(logCombatGet.length == 0) logCombatGet = await LogCombat.find({participant : {$in : [`<@${id}>`]}, over: false, recompense: false},'-_id -__v')
            return logCombatGet
                     
         }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
     }









    // ----------------------------------------------------edit combat log by id ---------------------------------------------------

    /**
     * @param {String} combatId
    */
    async editLogCombatByName(combatId, data) 
    {
        const functionName = "editLogCombatByName";
        try
        {     
        const logCombatGet = await LogCombat.updateOne({combatId: combatId},
        {
            author: data.author,
            combatId: data.combatId,
            messageId: data.messageId,
            createdAt: data.createdAt,
            zoneLvl: data.zoneLvl,
            moyLvlPlayer: data.moyLvlPlayer,
            channel: data.channel,
            round: data.round, 
            reward: data.reward,
            participant: data.participant,
            over: data.over, 
            recompense: data.recompense
        }, {new: true})
        
        return logCombatGet
                    
        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }






    // ----------------------------------------------------Get all combat log ---------------------------------------------------

    /**
     * @param {Object} combatId
    */
    async getAllLogCombat() 
    {
        const functionName = "getAllLogCombat";
        try
        {
        const logCombatGet = await LogCombat.find().select('-_id -__v')
        return logCombatGet
                    
        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }




    // ----------------------------------------------------Get all combat log ---------------------------------------------------

    /**
     * @param {String} userId
    */
    async getCombatIdByParticipant(userId) 
    {
        const functionName = "getCombatIdByParticipant";
        try
        {
            const logCombatGet = await LogCombat.findOne( { participant: { $in: [ `<@${userId}>` ] } },'-_id -__v').sort({_id:-1})
            return logCombatGet.messageId
                    
        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }

    


}

module.exports = LogCombatController







