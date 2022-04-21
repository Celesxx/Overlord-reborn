if(message.content.startsWith(`${préfix}Zone`))
{
    try
    {
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
        let fullDescription = []
        let boss = false
        let bossName = ""
        const bestiaireController = new BestiaireController()
        const zoneController = new ZoneController()
        const logCombatFunction = new LogCombatFunction()
        const zoneFunction = new ZoneFunction()
        const playerCreationFunction = new PlayerCreationFunction()
        
        args.slice(1).forEach(async arg => 
        { 
            const data = await playerCreationFunction.getPlayerById(arg.replace(/[<@>]/g, ''))
            moyLvlPlayer += data[0].lvl
            users.push(client.users.cache.find(user => user.id === arg.replace(/[<!@>]/g, ''))) 
            totalParticipant.push(`:x:${client.users.cache.find(user => user.id === arg.replace(/[<!@>]/g, ''))}\n`) 
        })
        moyLvlPlayer = moyLvlPlayer / args.slice(1).length

        

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

                            for(const mob of encounterMob) 
                            { 
                                if(boss == false) 
                                {
                                    totalParticipant.push(`:x:${mob.nomId}\n`) 
                                    fullDescription.push(`*${mob.description}*\n`)
                                }

                                console.log("mob nom", mob.nom)
                                if(mob.nom == "kirishiga la dernière ombre") 
                                {
                                    message.channel.send({files:[{attachment: 'assets/sound/kirishiga.mp3', name: 'kirishiga.mp3'}]})
                                    boss = true
                                    bossName = mob.nom
                                }
                            }
                            totalParticipant = totalParticipant.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)

                            let embed = new Discord.MessageEmbed()
                            .setAuthor({name : combatId})
                            .setTitle(":crossed_swords: Début du combat")
                            .setDescription(`${fullDescription}`)
                            
                            if(!boss) embed.addField(":scroll: Explication", "Chaque monstre possède une référence 1x ou 2x, le premier chiffre correspond à la 1ére ligne ou à la 2éme ligne dans le combat. Une fois le combat terminé faites *?Fin CombatId*")
                            else if(bossName == "kirishiga la dernière ombre") embed.addField(":scroll: Explication", `Pas de chance, vous êtes tombez contre ${bossName}, si jamais c'est la première fois que vous l'affrontez et que vous mourrez contre lui il se contentera de vous laisser dans le coma sans vous achever en guise d'avertissement`)
                            else if(boss) embed.addField(":scroll: Explication", "Il semblerait que le destin sois contre vous, le gardien de la zone n'est pas très content et va surement faire qu'une bouchée de vous !")
                            embed.addField("Zone", zone, true)
                            embed.addField("Tour", "1", true)
                            embed.addField("Ordre du combat", totalParticipant.join(""))
                            for(const mob of encounterMob)
                            {
                                embed.setImage(mob.image)
                                diffLv = zoneData[0].lvl - mob.lvl
                                embed.addField(`${mob.nomId}`, `${mob.hp[0] + (mob.hp[1] * diffLv)}`, true)
                            }
                            embed.addField("Status", "Que le combat commence, merci de respecter l'ordre du combat !")
                
                            message.channel.send({embeds: [embed]}).then(async result => 
                            {
                                await logCombatFunction.logCombatCreation(author, combatId, result.id, totalParticipant, createdAt, result.channel.name, zoneData[0].lvl, moyLvlPlayer)
                            })
                            
                        }catch(error)
                        {
                            console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
                        }
                    })
                    
                }else message.channel.send("La zone n'est pas valide !")

            }catch(error)
            {
                console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
            }
        })
        
    }catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
    }
}




if(message.content.toLowerCase().startsWith(préfix + "zonecreation"))
{
    try
    {

        const zoneFunction = new ZoneFunction()
        const result = Promise.resolve(zoneFunction.zoneCreation(message.content))
        result.then((response) => 
        {
            let embed = new Discord.MessageEmbed()
            .setColor("#49b28b")
            .setTitle("Création de la zone dans la bdd")
            
            response.forEach(data =>
            {
                if(data.state == false)
                {
                    embed.addField("Status", `${data.log}`)
                }else embed.addField(`${data.zone.nom}`, `${data.state}`)
                
                
            })
            message.channel.send({embeds : [embed]})
            
        })
    }catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
    }
}
