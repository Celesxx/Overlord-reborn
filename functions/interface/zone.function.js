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
    */
      async getEncounterMob(possibleMob, zone, nbrPlayer)
      {
          try
          {
            let [encounterMob, index , maxMob] = [[], [], 0]
            let monstreId
            let diff = nbrPlayer - zone[0].nombre
            if(diff > 0) maxMob = Math.floor((Math.random() * (zone[0].nombre + diff)) + 1)
            else maxMob = Math.floor((Math.random() * zone[0].nombre) + 1)

            while(encounterMob.length < maxMob)
            {
                for(const mob of possibleMob)
                {
                    monstreId = mob.nomId
                    if(Math.floor((Math.random() * 100) + 1) < mob.spawn.find(data => data.zone === zone[0].nom).drop && encounterMob.length < maxMob) 
                    {
                        let newMob = JSON.parse(JSON.stringify(mob))
                        if( encounterMob.some(value => value.nom === newMob.nom) ) // si mob est déja spawn une fois 
                        {
                            index.forEach( value => 
                            { 
                                if(value.nom == newMob.nom )
                                {
                                    value.id++ // incrémente l'id
                                    newMob.nomId = `${monstreId}${newMob.position}${value.id}` // donne l'index au monstre

                                }
                            })
                            encounterMob.push(newMob)
                        }else
                        {
                            index.push( {nom : newMob.nom, id: 0} )
                            newMob.nomId = `${monstreId}${mob.position}0`
                            encounterMob.push(newMob)
                        }
                    }
                }
            }
            return encounterMob

          } catch(error)
          {
              console.log(`error : ${error}`)
          }
      }
    
}

module.exports = ZoneFunction