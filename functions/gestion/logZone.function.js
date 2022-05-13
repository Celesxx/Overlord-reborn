const LogZoneController = require('../../controllers/logZone.controller')

class LogZone 
{

    /**
     * @param {String} userId
     * @param {String} date
    */
    async logZoneAdd(userId, day, date)
    {
        const logZoneController = new LogZoneController()
    
        const create = await logZoneController.createLogZone({author : userId, createdAt: [date], totalCombat: 1, resetDate: day})
        if(create.state) return create.zone
        else
        {
            let get = await logZoneController.getLogZoneById(userId)
            if(get.resetDate == day)
            {
                get.totalCombat += 1
                get.createdAt.push(date)
            }else
            {
                get.totalCombat = 0
                get.createdAt = []
                get.resetDate = day
            }

            await logZoneController.editLogZoneByUserId(userId, get)
            return get
        }
    }


}

module.exports = LogZone