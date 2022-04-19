if(message.content.toLowerCase().startsWith(`${préfix}addplayer`))
{
    try
    {
        let id = args[0].replace(/[<@>]/gm, "")
        let data = args.slice(1)

        if(args.length == 5)
        {
            const playerCreationFunction = new PlayerCreationFunction()
            let creation = Promise.resolve(playerCreationFunction.playerCreation(data, id))
            creation.then(result => 
            {
                let embed = new Discord.MessageEmbed()
                .setColor("#49b28b")
                .setTitle("Création du joueur dans la bdd ! ")
                
                if(result.state == false)
                {
                    embed.addField("Status", `${result.log}`)
                }else embed.addField(`Status`, `${result.message}`)

                message.channel.send({embeds: [embed]})
            })
        }else message.channel.send("Tu à oublié quelques choses ! Prenom Nom Race Classe Image")
    }catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
    }
}









if(message.content.toLowerCase().startsWith(`${préfix}profile`))
{
    try
    {
        let id = args[0].replace(/[<@>]/gm, "")
        console.log("id : ", id)
        if(id == undefined) id = message.author.id

        const playerCreationFunction = new PlayerCreationFunction()
        let result = Promise.resolve(playerCreationFunction.getPlayerById(id))
        result.then(data => 
        {
            try
            {

                data = data[0]
                console.log(data)
                let embed = new Discord.MessageEmbed()
                .setColor("#5DADE2")
                .setTitle(`:bust_in_silhouette: ${data.prenom} ${data.nom}`)
                .addField(`:dna: race`, data.race)
                .addField(`:label: classe`, data.classe)
                .addField(`:beginner: level`, `${data.lvl}`, true)
                .addField(`:military_medal: experience`, `${data.xp}`, true)
                .addField(`:fleur_de_lis: attribut restant`, `${data.attribut[0]}`)
                .addField(`:heart: hp`, `${data.hp[0]}`, true)
                .addField(`:sparkles: magie`, `${data.magie[0]}`, true)
                .addField(`:crossed_swords: attaque`, `${data.attaque[0]}`, true)
                .addField(`:shield: armure`, `${data.armure[0]}`, true)
                .addField("●▬▬▬▬▬▬▬▬▬▬:gear: equipement :gear:▬▬▬▬▬▬▬▬▬▬●", `casque : ${Object.values(data.equipement.casque)} \nplastron : ${Object.values(data.equipement.plastron)} \narme : ${Object.values(data.equipement.arme)}`)
                .addField("●▬▬▬▬▬▬▬▬▬▬:tools: : inventaire :tools:▬▬▬▬▬▬▬▬▬▬●", Object.keys(data.inventaire).length != 0 ? `${data.inventaire}` : '-')
                .addField("●▬▬▬▬▬▬▬▬▬▬:coin:     argent     :coin:▬▬▬▬▬▬▬▬▬▬●", `:third_place: bronze : ${data.money[0]} \n:second_place: argent : ${data.money[1]} \n:first_place: or : ${data.money[2]}`)
                .setImage(data.image.replace(/["]/gm, ""))
                message.channel.send({embeds: [embed]})

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




if(message.content.toLowerCase().startsWith(`${préfix}nomrp`))
{
    try
    {
        let id = args[0]
        if(id == undefined) id = message.author.id

        const playerCreationFunction = new PlayerCreationFunction()
        playerCreationFunction.setNameRp(message, id)

    }catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
    }
}