const LogCombatController = require('../controllers/logCombat.controller')

class LogCombatFunction 
{

    /**
     * @param {String} author
     * @param {String} combatId
     * @param {Array} users
     * @param {String} createdAt
     * @param {Number} zoneLvl
     * @param {Number} moyLvlPlayer
    */
    async logCombatCreation(author, combatId, messageId, users, createdAt, channel, zoneLvl, moyLvlPlayer)
    {
        try
        {
            let data = { author: author, combatId: combatId, messageId: messageId, createdAt: createdAt, zoneLvl: zoneLvl, moyLvlPlayer: moyLvlPlayer, channel: channel, participant: users.map(function(item,index){ return item.replace(/[:x:\n ]/gm, "") }) }
            const logCombatController = new LogCombatController()
            const result = await logCombatController.createLogCombat(data)
        
            return result

        } catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
        }
    }








    /**
     * @param {String} combatId
    */
    async getLogCombatById(combatId)
    {
        try
        {
            const logCombatController = new LogCombatController()
            const result = await logCombatController.getLogCombatById(combatId)
            return result

        } catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
        }
    }





    /**
    * 
    */
    async getAllLogCombat()
    {
        try
        {
            const logCombatController = new LogCombatController()
            const result = await logCombatController.getAllLogCombat()
            return result

        } catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
        }
    }








    /**
     * @param {String} embedId
     * @param {String} combatId
     * @param {Object} logCombat
     * @param {Object} data
    */
    async addEventTurnLogCombatByName(combatId, logCombat, data)
    {
        try
        {
            const logCombatController = new LogCombatController()
            if(logCombat.round.length == 0 ) logCombat.round = [data]
            else
            {
                if(!logCombat.round.some(element => element.number == data.number)) logCombat.round.push(data)
                else
                {
                    logCombat.round.map(obj => { if(obj.number == data.number) obj.event.push(data.event) });
                }
            }

            console.log("combat Id : ", combatId)
            const result = await logCombatController.editLogCombatByName(combatId, logCombat)
            return result

        } catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
        }
    }









    /**
     * @param {String} combatId
     * @param {Object} logCombat
    */
    async endLogCombat(combatId, logCombat)
    {
        try
        {
        logCombat[0].over = true
        const logCombatController = new LogCombatController()
        const result = await logCombatController.editLogCombatByName(combatId, logCombat[0])
        return result

        } catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
        }
    }







    /**
     * @param {String} combatId
     * @param {Object} logCombat
     * @param {Object} status
    */
     async recompenseLogCombat(combatId, logCombat, status)
     {
         try
         {
            console.log(logCombat)
            let lastRound = logCombat.round.slice(-1)[0].number
            logCombat.recompense = true
            logCombat.round.push({number: lastRound + 1, event: status})
            const logCombatController = new LogCombatController()
            const result = await logCombatController.editLogCombatByName(combatId, logCombat)
            return result
 
         } catch(error)
         {
             console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
         }
     }






     /**
     * @param {String} combatId
     * @param {Object} logCombat
     * @param {Object} status
     * @param {Object} user
    */
      async JoinLogCombat(combatId, logCombat, status, user)
      {
          try
          {
            logCombat = logCombat[0]
            console.log("empty : ", logCombat.round.length)
            if(!logCombat.round.length == 0) logCombat.round.slice(-1)[0].event.push(status)
            else logCombat.round = [{number: 0, event: status}]
            logCombat.participant.push(user)

            const logCombatController = new LogCombatController()
            const result = await logCombatController.editLogCombatByName(combatId, logCombat)
            return result

          } catch(error)
          {
              console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
          }
      }






    /**
     * @param {String} combatId
     * @param {Object} logCombat
     * @param {Object} data
     * @param {Object} user
    */
    async FuiteLogCombat(combatId, logCombat, data)
    {
        try
        {
            logCombat = logCombat[0]
            if(!logCombat.round.length == 0) logCombat.round.slice(-1)[0].event.push(data.event)
            else if(logCombat.round.length == 0) logCombat.round.push(data)
            else if(logCombat.round.slice(-1)[0].number == data.number) logCombat.round.slice(-1)[0].event.push(data.event)

            const logCombatController = new LogCombatController()
            const result = await logCombatController.editLogCombatByName(combatId, logCombat)
            return result

        } catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
        }
    }







    /**
     * @param {String} userId
    */
    async getCombatIdByParticipant(userId)
    {
        try
        {
            const logCombatController = new LogCombatController()
            return await logCombatController.getCombatIdByParticipant(userId)

        } catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
        }
    }




}

module.exports = LogCombatFunction