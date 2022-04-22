//---------------------------- Fin combat vs monstre ----------------------------
if(message.content.toLowerCase().startsWith(`${préfix}delete`))
{
    try
    {
        if(message.member.roles.cache.some(role => role.name === 'Administrateur'))
        {
            let msgDelete = args[0]
            message.channel.bulkDelete(msgDelete)
        }
        
    }catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
    }
}




if(message.content.toLowerCase().startsWith(`${préfix}getallchannel`))
{
    try
    {
        if(message.member.roles.cache.some(role => role.name === 'Administrateur'))
        {

            let channels = message.guild.channels.cache
            let embed = new Discord.MessageEmbed()
            .setTitle("Affichage de tous les channels !")
            let embed2 = new Discord.MessageEmbed()
            let embed3 = new Discord.MessageEmbed()
            i = 0
            for (const channel of channels) 
            {
                if(i <= 24) embed.addField(`${channel[1].name}`, `${channel[1].id}`)
                else if(i <= 49) embed2.addField(`${channel[1].name}`, `${channel[1].id}`)
                else embed3.addField(`${channel[1].name}`, `${channel[1].id}`)
                i++
            }

            message.channel.send({embeds: [embed, embed2, embed3]})

        }
    }catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
    }
}



if(message.content.toLowerCase().startsWith(`${préfix}règle`))
{
    try
    {
        const rulesHrp = 
        [
            "Le spam est interdit ainsi que l'écriture en majuscule de façon abusif",

            "Vous devez parler dans le respect et rester courtois envers les autres",

            "N'hésitez pas à contacter le staff si vous avez la moindre question, cependant vérifier avant que la réponse n'ait pas été déjà posée !",

            "Vous avez le droit de poster une image dans le général, cependant cela doit rester occasionnel, il existe un channel média pour cela",

            "Si vous êtes nouveau, il est important de regarder les messages épinglés dans les salons et de lire parfois les annonces, nous ne mettons pas toujours à jour le règlement !",

            "Si vous trouvez que le staff n'est pas compétent, alors dites nous pourquoi tout en restant courtois",

            "Le NSFW est interdit sur le serveur",

            "Le lundi et le dimanche, le fondateur s'autorise à ignorer toutes questions.",
        ] 


        const rulesRp = 
        [
            "Merci de faire attention au fautes d'orthographe, nous ne demandons pas de faire aucune faute juste de faire attention !",

            "Essayé de détailler le plus possible vos message rp afin d'aider au maximum vos interlocuteurs dans leurs réponses",
            
            "Tout ce qui se passe inRP, reste inRP. N'allez pas insulter quelqu'un en HRP car il ne vous aime pas inRP. Cependant cela ne doit pas être abusif non plus, surtout si vous ne connaissez pas la personne !",
            
            "Le HRP, le MetaRP, no FearRP, le pain RP sont interdits ainsi que tout ce qui est en rapport",
            
            "Merci d'éviter les personnages de type DarkSasuke",
            
            "Il est STRICTEMENT interdit de tuer un personnage ou de faire toutes actions qui à pour conséquence la mort définitive, dans le pire des cas il tombe en état critique et/ou au bord de la mort. Vous devez attendre l'accord d'un staff avant de pouvoir vraiment l'achever. Seul un staff peut valider une mort",
                        
            "Le RPQ est interdit",
            
            "N'essayez pas de vous give de l'XP en cachette ou d'abuser de bugs du système, nous avons des logs",
                                                                        
            "Ne pas utiliser tupperbox pour des commandes de combat ! ",
            
            "Si vous mourrez avant le lvl 6 que cela soit en groupe ou en solo vous tombez dans le coma pendant 2 heures, cependant si vous tombez dans le coma 3 dans les dernières 12 heures, votre mort sera définitif "
            
        ]

        let i = 0
        let embed = new Discord.MessageEmbed()
        .setTitle("Règle du serveur")
        .setDescription("Voici les règles du serveur, merci de les lire très attentivement car tout manquement à ses règles entrainera des conséquences !")
        .addField("╔═══════◥◣◆◢◤═════════╗\n\t\t\t\t\t\t\tRègles HRP\n╚═══════◥◣◆◢◤═════════╝", "Les règles hrp sont des qui concerne en général le moment ou vous n'êtes pas en rp")
        for(const ruleHrp of rulesHrp) 
        {
            embed.addField(`📜 Règle #${i}`, ruleHrp)
            i++
        }
        
        i = 0
        let embed2 = new Discord.MessageEmbed()
        embed2.addField("╔═══════◥◣◆◢◤═════════╗\n\t\t\t\t\t\t\tRègles RP\n╚═══════◥◣◆◢◤═════════╝", "Les règles rp sont des qui concerne le moment ou vous êtes en rp")
        for(const ruleRp of rulesRp) 
        {
            embed2.addField(`📜 Règle #${i}`, ruleRp)
            i++
        }

        message.channel.send({embeds: [embed, embed2]})

    }catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
    }


}


if(message.content.toLowerCase() === préfix + "danger")
{
    console.log("test")
    try
    {
        if(message.member.roles.cache.some(role => role.name === 'Administrateur'))
        {
            let embed = new Discord.MessageEmbed()
            .setTitle("Une tempête approche !")
            .setDescription("Après avoir passé un long moment dans la zone, vous commencer à sentir que quelque chose ne va pas, aucun monstre ne semble être présent comme s'il avait tout fui la zone où vous vous trouvez, vous voyez aux loin des oiseaux ce lever des arbres et fuir dans votre direction. Vous ne savez pas ce qu'il se passe la bas mais une chose est sur cela se rapproche de vous ! ")
            .setImage("https://media.discordapp.net/attachments/951928506021998652/966436198895747132/tumblr_onvjp9rP5p1smy9ueo1_500.gif")
            message.channel.send({embeds: [embed]})
        }
    }catch(error)
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
    }
}