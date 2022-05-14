const { type } = require('express/lib/response')
const ZoneController = require('../../controllers/zone.controller')

class ZoneFunction 
{
    /**
     * @param {String} data
    */
    async zoneCreation(data)
    {
        try
        {
            const zoneController = new ZoneController()
            return await zoneController.createZone(data)

        } catch(error)
        {
            console.log(`error : ${error}`)
        }
    }


    /**
     * @param {String} message
    */
     async getZone(message)
     {
         try
         {
            let zone = ""
            await message.channel.messages.fetch({limit: 25}).then(async data => 
            {    
                for(const [key,value] of data.entries())
                {
                    let embed
                    if(value.embeds.length != 0)
                    {
                        if(zone != "") break;
                        embed = value.embeds[0]
                        for(let field of embed.fields)
                        {
                            if(field.name == "Zone") 
                            {
                                zone = field.value
                                break;
                            }
                        }
                    }
                }
            })
            return zone

         } catch(error)
         {
             console.log(`error : ${error}`)
         }
     }





     /**
     * @param {Array} possibleMob
     * @param {Object} zone
     * @param {Number} nbrPlayer
     * @param {Number} totalCombatParticipant
    */
    async getEncounterMob(possibleMob, zone, nbrPlayer, totalCombatParticipant)
    {
        let [encounterMob, index , maxMob, verification] = [[], [], 0, false]
        let monstreId
        let diff = nbrPlayer - zone[0].nombre
        let roll = Math.floor((Math.random() * 100) + 1)

        if(diff > 0) maxMob = Math.floor((Math.random() * (zone[0].nombre + diff)) + 1)
        else maxMob = Math.floor((Math.random() * zone[0].nombre) + 1)

        if(totalCombatParticipant >= 5 ) totalCombatParticipant += 5

        while(encounterMob.length < maxMob)
        {   
            for(const mob of possibleMob)
            {
                monstreId = mob.nomId
                console.log("roll : ", roll)
                console.log("totalCombatParticipant : ", totalCombatParticipant)
                if(roll >= totalCombatParticipant || verification) 
                {
                    if(Math.floor((Math.random() * 100) + 1) < mob.spawn.find(data => data.zone === zone[0].nom).drop && encounterMob.length < maxMob) 
                    {
                        let newMob = JSON.parse(JSON.stringify(mob))
                        if( encounterMob.some(value => value.nom === newMob.nom) ) // si mob est déja spawn une fois 
                        {
                            for(const value of index)
                            {
                                if(value.nom == newMob.nom )
                                {
                                    value.id++ // incrémente l'id
                                    newMob.nomId = `${monstreId}${newMob.position}${value.id}` // donne l'index au monstre
                                }
                            }
                            encounterMob.push(newMob)
                        }else
                        {
                            index.push( {nom : newMob.nom, id: 0} )
                            newMob.nomId = `${monstreId}${mob.position}0`
                            encounterMob.push(newMob)
                        }
                    }
                }else 
                {
                    if(maxMob == 1 && nbrPlayer > 1) maxMob = Math.round(4 * (nbrPlayer / 1.5))
                    else if(maxMob == 1) maxMob = 4
                    else maxMob = (maxMob * 1.5 ) + nbrPlayer
                    verification = true
                }
            }
        }
        return {mob : encounterMob, isGardien: verification}     
    }
    
}

module.exports = ZoneFunction