//---------------------------- Historique Combat ----------------------------

if(message.content.startsWith(`${préfix}Historique`) && !message.content.startsWith(`${préfix}Historique-active`))
{
    try
    {
        const combatId = args[0]
        const logCombatFunction = new LogCombatFunction()
        // const messageFunction = new MessageFunction()

        const logCombat = Promise.resolve(logCombatFunction.getLogCombatById(combatId))
        logCombat.then(async result => 
        {
            let embed = new Discord.MessageEmbed()
            .setTitle(`Historique du combat : ${combatId}`)
            .addField("Participant", `${result[0].participant.join("\n")}`, true)
            .addField("Channel", `${result[0].channel}`, true)
            for(const round of result[0].round) embed.addField(`tour : ${round.number}`, `${round.event}`)

            message.channel.send({embeds :[embed]})
        })

    }catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
    }
}









//---------------------------- Historique Combat ----------------------------

if(message.content.startsWith(`${préfix}Historique-active`))
{
    try
    {
        const logCombatFunction = new LogCombatFunction()
        const messageFunction = new MessageFunction()

        const logCombat = Promise.resolve(logCombatFunction.getAllLogCombat())
        logCombat.then(async result => 
        {
            let i = 1
            let embed = new Discord.MessageEmbed()
            .setTitle(`Liste des combats actif`)
            for(const logCombat of result)
            {
                if(!logCombat.over)
                {
                    embed.addField(`Combat #${i}`, `combatId : ${logCombat.combatId} \n channel: ${logCombat.channel} \n createdAt : ${logCombat.createdAt}`)
                    i++
                }
            }
            message.channel.send(embed)
        })

    }catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
    }
}