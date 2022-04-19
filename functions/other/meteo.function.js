class MeteoFunction 
{
    /**
     * @param {Object} message
    */
    async meteo(client) 
    {
        var channel = client.channels.cache.get('939189315563585575');
        console.log('test')
        //channel.send('test');
        var date = new Date()
        var saisson = date.toLocaleDateString()

        saisson = saisson.split('/')

        let mois = saisson.slice(3, 5)

        if(mois[0] == '0') mois = mois.slice(1, 2)
        
        mois = saisson[1]
        /*
        autone = 10
        hiver = 1;
        printemps = 4;
        été = 7
        */
        var random = Math.floor((Math.random() * 100) + 1);
        if(mois >= 7 && mois < 10)
        {
            // été
        } else if (mois >= 10) 
        {
            // autonome 
        } else if (mois >= 1 && mois < 4)
        {
            var random = Math.floor((Math.random() * 100) + 1);
            if(random < 70)
            {
                var random = Math.floor((Math.random() * 100) + 1);
                // Soleil   
                if(random < 50)
                {
                    var random = Math.floor((Math.random() * 100) + 1);
                    if(random < 70)
                    {
                            const help_embed = new Discord.MessageEmbed()
                            .setColor("#0098FF")
                            .setImage("https://c4.wallpaperflare.com/wallpaper/637/645/206/snow-anime-girls-deer-anime-wallpaper-preview.jpg")
                            .addField("**●▬▬▬▬▬▬▬▬▬▬▬▬:snowflake: Journée ensoleillé ▬▬▬▬▬▬▬▬▬▬▬▬●**", "Aujourd'hui est un jour enneigé. Mais en plus d'avoir la chance d'avoir des flocons de neige qui vous tombent dessus....Il n'y a presque aucun nuage à l'horizon ! Un temps idéal pour une saison d'hiver !")
                            channel.send(help_embed)
                    } else 
                    {
                        const help_embed = new Discord.MessageEmbed()
                        .setColor("#117ec9")
                        .setImage("https://desktophut.com/wp-content/uploads/2018/10/4ATRrdNVOpsVHRaeEDYs.jpg.webp")
                        .addField("**●▬▬▬▬▬▬▬:cloud_snow: De la neige et des nuages ▬▬▬▬▬▬▬●**", "Alors oui, il y a quelques nuages qui peuvent être dérangeant...Mais il y a de la neige ! Et tous le monde aime la neige !")
                        channel.send(help_embed)
                    }
                } else if (random < 80)
                {
                    var random = Math.floor((Math.random() * 100) + 1);
                    if(random < 70)
                    {
                            const help_embed = new Discord.MessageEmbed()
                            .setColor("#f5e61d")
                            .setImage("https://media.discordapp.net/attachments/939189314993139759/948348499999748146/4578907-anime-landscape-hoshi-wo-ou-kodomo-anime-girls-sky-sun-clouds-children-who-chase-lost-voices.png?width=1203&height=676")
                            .addField("**●▬▬▬▬▬▬▬▬▬▬▬▬:sunny: Plein soleil ▬▬▬▬▬▬▬▬▬▬▬▬●**", "Il n'y a pas de neige alors que vous êtes en hiver, c'est vrai que ce n'est pas la forme...Mais regardez moi ce magnifique soleil !")
                            channel.send(help_embed)
                    }else 
                    {
                        const help_embed = new Discord.MessageEmbed()
                        .setColor("#f0e8a5")
                        .setImage("https://i.pinimg.com/736x/93/e6/6b/93e66b7542ecb87803ed17f6aba9e1dd.jpg")
                        .addField("**●▬▬▬▬▬▬▬▬▬▬▬▬:white_sun_cloud: Du soleil et des nuages ▬▬▬▬▬▬▬▬▬▬▬▬●**", "Tout est dit dans le titre. Un magnifique soleil avec quelques nuages qui viendront maudire votre journée !")
                        channel.send(help_embed)
                    }
                }
            } else if (random < 101)
            {
                var random = Math.floor((Math.random() * 100) + 1);
                // Pluie
                if(random < 60)
                {
                    var random = Math.floor((Math.random() * 100) + 1);
                    if(random < 50)
                    {
                            const help_embed = new Discord.MessageEmbed()
                            .setColor("#5bb4f0")
                            .setImage("https://i.pinimg.com/originals/97/57/14/975714154eba15aa31695ffaccc3ed16.jpg")
                            .addField("**●▬▬▬▬▬▬▬▬▬▬▬▬:cloud_rain: Journée de pluie ▬▬▬▬▬▬▬▬▬▬▬▬●**", "Ce n'est pas une bonne journée...Il va pleuvoir toute la journée ! Et il n'y aura aucun soleil qui viendra vous aider !")
                            channel.send(help_embed)
                    } else 
                    {
                        const help_embed = new Discord.MessageEmbed()
                        .setColor("#239ad1")
                        .setImage("https://img3.goodfon.com/wallpaper/nbig/b/dc/kotonoha-no-niva-anime-anime.jpg")
                        .addField("**●▬▬▬▬▬▬▬▬▬▬▬▬:white_sun_rain_cloud: Journée de pluie et de soleil ▬▬▬▬▬▬▬▬▬▬▬▬●**", "La journée est ni trop belle, ni trop moche. Vous allez avoir un petit mixte entre un peu de pluie et quelques rayons du soleil pour venir vous garder une bonne chaleur corporelle.")
                        channel.send(help_embed)
                    }
                // Tempête
                } else if (random < 80)
                {
                    var random = Math.floor((Math.random() * 100) + 1);
                    if(random < 80)
                    {
                            const help_embed = new Discord.MessageEmbed()
                            .setColor("#9e9e9e")
                            .setImage("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c28275ba-0854-48ea-913b-a5e14f543e02/d32wsau-b0222d9f-9e34-4e9f-ab6a-e5bb08f94ae2.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MyODI3NWJhLTA4NTQtNDhlYS05MTNiLWE1ZTE0ZjU0M2UwMlwvZDMyd3NhdS1iMDIyMmQ5Zi05ZTM0LTRlOWYtYWI2YS1lNWJiMDhmOTRhZTIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.yG42Bs9Azjn65-z1xlwbH0lq_yBCWl1iFI1kT_At2Gk")
                            .addField("**●▬▬▬▬▬▬▬▬▬▬▬▬:cloud_tornado: Tornade ▬▬▬▬▬▬▬▬▬▬▬▬●**", "Cette journée va être compliquée...Il n'y a peut-être pas la pluie ou bien des gros grelons, mais il y a une terrible tempête qui a la capacité de repousser les plus légers !")
                            channel.send(help_embed)
                    } else 
                    {
                        const help_embed = new Discord.MessageEmbed()
                        .setColor("#dbf8f8")
                        .setImage("https://wallpaperaccess.com/full/2991837.jpg")
                        .addField("**●▬▬▬▬▬▬▬▬▬▬▬▬:cloud_tornado::cloud_tornado::cloud_tornado: Grande tempête ! ▬▬▬▬▬▬▬▬▬▬▬▬●**", "Contrairement à la petite image, il y a une énorme tempête accompagnée d'une immense pluie ! Tous cela vous empêche d'ailleurs de pouvoir combattre en extérieur voir même dans les grottes qui sont pour la plupart innondés. Il ne vous reste donc plus que le RP passif...")
                        channel.send(help_embed)
                    }
                }
                
            } 
        
        } else 
        {
            // Printemps
        }
    
    }

}

module.exports = MeteoFunction