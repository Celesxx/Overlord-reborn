if(message.content.startsWith(`${préfix}Zone`))
{
    try
    {
        console.log("test1")
        const zone = args[0]
        let encounterMob = []
        let users = []
        let diffLv
        let moyLvlPlayer = 0
        let totalParticipant = []
        let author = message.author.username
        let combatId = Math.random().toString(16).slice(8)
        let date = new Date();
        let createdAt = ("00" + (date.getMonth() + 1)).slice(-2) + "/" + ("00" + date.getDate()).slice(-2) + "/" + date.getFullYear() + " " + ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2) + ":" + ("00" + date.getSeconds()).slice(-2);
        args.slice(1).forEach( arg => 
        { 
            moyLvlPlayer += bdd[arg.replace(/[<@>]/g, '')].lvl
            users.push(client.users.cache.find(user => user.id === arg.replace(/[<!@>]/g, ''))) 
            totalParticipant.push(`:x:${client.users.cache.find(user => user.id === arg.replace(/[<!@>]/g, ''))}\n`) 
        })
        moyLvlPlayer = moyLvlPlayer / args.slice(1).length

        const bestiaireController = new BestiaireController()
        const zoneController = new ZoneController()
        const logCombatFunction = new LogCombatFunction()
        const zoneFunction = new ZoneFunction()
        const messageFunction = new MessageFunction()

        const resultMonstre = Promise.resolve(bestiaireController.getMonstreByZone(zone))
        resultMonstre.then(possibleMob => 
        { 
            try
            {
                if(possibleMob.length !=0)
                {
                    const resultZone = Promise.resolve(zoneController.getZoneByName(zone))
                    resultZone.then(async zoneData => 
                    {
                        try
                        {
                            encounterMob = await zoneFunction.getEncounterMob(possibleMob, zoneData)

                            for(const mob of encounterMob) { totalParticipant.push(`:x:${mob.nomId}\n`) }
                            totalParticipant = totalParticipant.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)

                            let embed = new Discord.MessageEmbed()
                            .setAuthor(combatId)
                            .setTitle(":crossed_swords: Début du combat")
                            .setDescription("> Des adversaires hostile s'approche de vous pour vous réduire en charpie, soyez prêt !")
                            // .setImage("https://cdn.discordapp.com/attachments/723538729012297834/724774265269911622/fantasyart-1592870026825-1545.jpg")
                            .addField(":scroll: Explication", "Chaque monstre possède une référence 1x ou 2x, le premier chiffre correspond à la 1ére ligne ou à la 2éme ligne dans le combat. Une fois le combat terminé faites *?Fin CombatId*")
                            .addField("Zone", zone, true)
                            .addField("Tour", 1, true)
                            .addField("Ordre du combat", totalParticipant.join(""))
                            for(const mob of encounterMob)
                            {
                                embed.setImage(mob.image)
                                diffLv = zoneData[0].lv - mob.lvl
                                embed.addField(`${mob.nomId}`, mob.hp[0] + (mob.hp[1] * diffLv), true)
                            }
                            embed.addField("Status", "Que le combat commence, merci de respecter l'ordre du combat !")
                
                            console.log("test")
                            message.channel.send(embed).then(async result => 
                            {
                                console.log("test2")
                                await logCombatFunction.logCombatCreation(author, combatId, result.id, totalParticipant, createdAt, result.channel.name, zoneData[0].lv, moyLvlPlayer)
                            })
                            
                        }catch(error)
                        {
                            console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
                        }
                    })
                    
                }else message.channel.send("La zone n'est pas valide !")

            }catch(error)
            {
                console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
            }
        })
        
    }catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
    }
}




if(message.content.startsWith(préfix + "zoneCreation"))
{
    const zoneFunction = new ZoneFunction()
    const result = Promise.resolve(zoneFunction.zoneCreation(message.content))
    result.then((response) => 
    {
        let embed = new Discord.MessageEmbed()
        .setColor("#49b28b")
        .setTitle("Création de la zone dans la bdd")
        
        response.forEach( data =>
        {
            if(data.state == false)
            {
                embed.addField("Status", `${data.message}`)
            }else embed.addField(`${data.zone.nom}`, `${data.state}`)
            
            
        })
        message.channel.send(embed)
        
    })
}
