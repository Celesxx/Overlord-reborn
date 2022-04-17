const { Message } = require("discord.js");

if(command === 'test_shop'){ 
    id = message.author.id
    //message.channel.send(bdd[id].inventaire.item["potion"])
   // bdd[id].inventaire.item["potion"] = "AHHHHHHHHHHH";
  //  bdd[id].inventaire.item["potion_2"] = "Stro";

   // message.channel.send(bdd[id].inventaire.item["potion"])
   // message.channel.send(bdd[id].inventaire.item["potion_2"])
/*
    bdd[id].inventaire.item.Foreach(obj => {
        Object.entries(obj).Foreach((key,value) => {
            console.log(`${key} ${value}`);
        })
    })*/

    var text = "oui"
    bdd[id].inventaire[text] = 'blabla';
    /*for(var i =0; i < bdd[id].inventaire.item.length; i++){
        var obj = bdd[id].inventaire.item[i];
        for (var key in obj){
            var value = obj[key];
            message.channel.send(key);
            message.channel.send(value);
        }
    }*/
    message.channel.send(":white_check_mark: ") 
        Savebdd();
  }


  if(command === 'setargent'){
    if (message.member.roles.cache.has("939189314582085637")) {

        id = message.author.id;
        bdd[id].pieceBronze = parseInt(args[0]);
        bdd[id].pieceArgent = parseInt(args[1]);
        bdd[id].pieceOr = parseInt(args[2]);
        message.channel.send(":white_check_mark: ") 
        Savebdd();
    } else {
        message.channel.send("Commande résérvé au staff !")
    }
  }

  if(command === 'give'){
    id = message.author.id;
    if(bdd[id]){
        if(args[0]){
                joueur = getUserFromMention(args[0]);
                if(id != joueur){
                    if(Number.isInteger(parseInt(args[1])) && parseInt(args[1]) >= 0){
                        bronze = parseInt(args[1])
                        if(bdd[id].pieceBronze >= bronze){
                            bdd[joueur].pieceBronze += bronze;
                

                            bdd[id].pieceBronze -= bronze;
                            Savebdd()
                        } else {
                            message.channel.send("Il vous manque du bronze.")
                        }

                        if(Number.isInteger(parseInt(args[2])) && parseInt(args[2]) >= 0 || !args[2]){
                            if(!args[2]){
                                argent = 0
                            } else {
                                argent = parseInt(args[2])
                            }
                            if(bdd[id].pieceArgent >= argent){
                                bdd[joueur].pieceArgent += argent;
                    

                                bdd[id].pieceArgent -= argent;
                                Savebdd()
                            } else {
                                message.channel.send("Il vous manque de l'argent.")
                            }

                            if(args[3] && Number.isInteger(parseInt(args[3])) && parseInt(args[3]) >= 0 || !args[3]){
                                if(!args[3]){
                                    or = 0
                                } else {
                                    or = parseInt(args[3])
                                }
                                if(bdd[id].pieceOr >= or){
    
                                    bdd[joueur].pieceOr += or;

                                    bdd[id].pieceOr -= or;
                                    Savebdd()
                                } else {
                                    message.channel.send("Il vous manque de l'or.")
                                }

                            } else {
                                message.channel.send("Erreur dans la valeure de l'or")
                            }
                        } else {
                            message.channel.send("Erreur dans la valeure de l'argent.")
                        }
                        message.channel.send(":white_check_mark:")
                    } else {
                        message.channel.send("Entrez une valeur pour le bronze")
                    }
                } else {
                    message.channel.send("Vous ne pouvez pas vous donner de l'argent à vous même !")
                }
            } else {
                message.channel.send("Avez vous indiquer une somme ?")
            }
    } else {
        message.channel.send("Donne ta fiche avant de donner de l'argent.")
    }
  }
  

  if(message.content === préfix + "shop" || message.content === préfix + "Shop"){
    var id = message.author.id;
    const filter = (reaction, user) => ['🛡️','⚔️','✨','🔙','➡️'].includes(reaction.emoji.name) &&user.id === message.author.id;
    let embed = new Discord.MessageEmbed()
    .setColor("#5DADE2")
    .setTitle("Ouvertur de la boutique magique")
    .setAuthor("🛡️ Ouvrir l'armuerie\n⚔️ Ouvrir la forge\n✨ Ouvrir la boutique d'alchimie\n✉️ Ouvrir la droguerie\n🔙 Fermer la commande")
    .setImage("https://c.wallhere.com/photos/78/b8/fantasy_armor_fantasy_city_shopping_Friends_anime_room_detailed-34417.jpg!d")
    message.channel.send(embed).then(async message => 
        {
            await message.react('🛡️');
            await message.react('⚔️');
            await message.react('✨');
            await message.react('✉️');
            await message.react('🔙');
            //message.awaitReactions(filter,{max: 1, time: 10000,errors:['time']}).then(collected =>
            let collector = message.createReactionCollector(filter,{time: 3600000,errors:['time']});
            collector.on('collect', (reaction, collector) =>  {
                    //const reaction = collected.first();

                    switch (reaction.emoji.name) {
                        case '🛡️':
                            let embed2 = new Discord.MessageEmbed()
                            .setColor("#5DADE2")
                            .setTitle("Armure palier 1 ( level minimum = 3 )")
                            .addField(":military_helmet: **Casque en cuivre**", ":dollar: **Prix :** 150  pièces de bronze\n:handbag: **Achat :** ?Achat casque en cuivre", true)
                            .addField(":mechanical_arm: **Plastron en cuivre**", ":dollar: **Prix :** 150  pièces de bronze\n:handbag: **Achat :** ?Achat plastron en cuivre", true)
                            message.channel.send(embed2).then(async message => 
                                { 
                                    await message.react('🔙')
                                    await message.react('➡️')
                                    let collector = message.createReactionCollector(filter,{time: 3600000,errors:['time']});
                                        collector.on('collect', (reaction, collector) =>
                                            {
                                                //const reaction = collected.first();

                                                if(reaction.emoji.name === '🔙')
                                                {
                                                    message.delete()
                                                
                                                    //message.channel.bulkDelete(2);
                                                }
                                                if(reaction.emoji.name === '➡️')
                                                {
                                                    message.delete()

                                                    let embedAR = new Discord.MessageEmbed()
                                                    .setColor("#5DADE2")
                                                    .setTitle("Armure palier 1 ( level minimum = 10 )")
                                                    .addField(":military_helmet: **Casque tortank** (HP - AR)", ":dollar: **Prix :** 450  pièces de bronze\n:handbag: **Achat :** ?Achat casque tortank", true)
                                                    .addField(":mechanical_arm: **Plastron tortank** (HP - AR)", ":dollar: **Prix :** 450  pièces de bronze\n:handbag: **Achat :** ?Achat plastron tortank", true)
                                                    .addField("（ミ◕‿◕ミ）  ","█████████████████████████████████████████████████",)
                                                    .addField(":military_helmet: **Casque petit arbros** (HP)", ":dollar: **Prix :** 450  pièces de bronze\n:handbag: **Achat :** ?Achat casque petit arbros", true)
                                                    .addField(":mechanical_arm: **Plastron petit arbros** (HP)", ":dollar: **Prix :** 450  pièces de bronze\n:handbag: **Achat :** ?Achat plastron petit arbros", true)
                                                    .addField("（ミ◕‿◕ミ）  ","█████████████████████████████████████████████████",)
                                                    .addField(":military_helmet: **Casque du tigre** (MA - HP)", ":dollar: **Prix :** 450  pièces de bronze\n:handbag: **Achat :** ?Achat casque tigre", true)
                                                    .addField(":mechanical_arm: **Plastron du tigre** (MA - HP)", ":dollar: **Prix :** 450  pièces de bronze\n:handbag: **Achat :** ?Achat plastron tigre", true)
                                                    message.channel.send(embedAR).then(async message => 
                                                        { 
                                                            await message.react('🔙')
                                                            await message.react('➡️')
                                                            let collector = message.createReactionCollector(filter,{time: 3600000,errors:['time']});
                                                                collector.on('collect', (reaction, collector) =>
                                                                    {
                                                                        //const reaction = collected.first();
                        
                                                                        if(reaction.emoji.name === '🔙')
                                                                        {
                                                                            message.delete()
                                                                        
                                                                            //message.channel.bulkDelete(2);
                                                                        }
                                                                        if(reaction.emoji.name === '➡️')
                                                                        {
                                                                            message.delete()

                                                                            let embedGrotte = new Discord.MessageEmbed()
                                                                            .setColor("#5DADE2")
                                                                            .setTitle("Armure palier 2 ( level minimum = 20 )")
                                                                            .addField(":military_helmet: **Casque de gobelin paladin** (HP - AR - MA)", ":dollar: **Prix :** 1350  pièces de bronze et 60 pièces d'argent.\n:handbag: **Achat :** ?Achat casque gobelin paladin", true)
                                                                            .addField(":mechanical_arm: **Plastron de gobelin paladin** (HP - AR - MA)", ":dollar: **Prix :** 1350  pièces de bronze et 60 pièces d'argent.\n:handbag: **Achat :** ?Achat plastron gobelin paladin", true)
                                                                            .addField("（ミ◕‿◕ミ）  ","█████████████████████████████████████████████████",)
                                                                            .addField(":military_helmet: **Casque de gobelin assassin** (AR - MA - HP)", ":dollar: **Prix :** 1350  pièces de bronze et 60 pièces d'argent.\n:handbag: **Achat :** ?Achat casque gobelin assassin", true)
                                                                            .addField(":mechanical_arm: **Plastron de gobelin assassin** (AR - MA - HP)", ":dollar: **Prix :** 1350  pièces de bronze et 60 pièces d'argent.\n:handbag: **Achat :** ?Achat casque gobelin assassin", true)
                                                                            .addField("（ミ◕‿◕ミ）  ","█████████████████████████████████████████████████",)
                                                                            .addField(":military_helmet: **Casque de gobelin archer** (MA - HP - AR)", ":dollar: **Prix :** 1350  pièces de bronze et 60 pièces d'argent.\n:handbag: **Achat :** ?Achat casque gobelin archer", true)
                                                                            .addField(":mechanical_arm: **Plastron de gobelin archer** (MA - HP - AR)", ":dollar: **Prix :** 1350  pièces de bronze et 60 pièces d'argent.\n:handbag: **Achat :** ?Achat casque gobelin archer", true)
                                                                            message.channel.send(embedGrotte).then(async message => 
                                                                                { 
                                                                                    await message.react('🔙')
                                                                                    let collector = message.createReactionCollector(filter,{time: 3600000,errors:['time']});
                                                                                        collector.on('collect', (reaction, collector) =>
                                                                                            {
                                                                                                //const reaction = collected.first();
                                                
                                                                                                if(reaction.emoji.name === '🔙')
                                                                                                {
                                                                                                    message.delete()
                                                                                                
                                                                                                    //message.channel.bulkDelete(2);
                                                                                                }
                                                                                            })
                                                                                })
                                                                                        

                                                                        }
                                                                    })
                                                        })
                                                                

                                                }
                                            });
                                });
                        break;
                        case '⚔️':
                            let embed3 = new Discord.MessageEmbed()
                            .setColor("#5DADE2")
                            .setTitle("Arme palier 1 ( level minimum = 3 )")
                            .addField(":crossed_swords: **Arme au corps à corps** (AT)", ":dollar: **Prix :** 75  pièces de bronze\n:handbag: **Achat :** ?Achat arme au corps à corps", true)
                            .addField(":bow_and_arrow: **Arme à distance** (AT)", ":dollar: **Prix :** 75  pièces de bronze\n:handbag: **Achat :** ?Achat arme à distance", true)
                            message.channel.send(embed3).then(async message => 
                                { 
                                    await message.react('🔙')
                                    await message.react('➡️')
                                    let collector = message.createReactionCollector(filter,{time: 3600000,errors:['time']});
                                        collector.on('collect', (reaction, collector) =>
                                            {
                                                //const reaction = collected.first();

                                                if(reaction.emoji.name === '🔙')
                                                {
                                                    message.delete()
                                                
                                                    //message.channel.bulkDelete(2);
                                                }
                                                if(reaction.emoji.name === '➡️')
                                                {
                                                    message.delete()

                                                    let embedAT = new Discord.MessageEmbed()
                                                    .setColor("#5DADE2")
                                                    .setTitle("Arme palier 1 ( level minimum = 10 )")
                                                    .addField(":crossed_swords: **Enchantement marécage combattant** (HP - AR)", ":dollar: **Prix :** 300  pièces de bronze\n:handbag: **Achat :** ?Achat enchantement marécage combattant", true)
                                                    .addField(":dagger: **Enchantement marécage voleur** (AT - AR)", ":dollar: **Prix :** 300  pièces de bronze\n:handbag: **Achat :** ?Achat enchantement marécage voleur", true)
                                                    .addField(":book:  **Enchantement marécage mage** (MA - AT)", ":dollar: **Prix :** 300  pièces de bronze\n:handbag: **Achat :** ?Achat enchantement marécage mage", true)
                                                    message.channel.send(embedAT).then(async message => 
                                                        { 
                                                            await message.react('🔙')
                                                            await message.react('➡️')
                                                            let collector = message.createReactionCollector(filter,{time: 3600000,errors:['time']});
                                                                collector.on('collect', (reaction, collector) =>
                                                                    {
                                                                        //const reaction = collected.first();
                        
                                                                        if(reaction.emoji.name === '🔙')
                                                                        {
                                                                            message.delete()
                                                                        
                                                                            //message.channel.bulkDelete(2);
                                                                        }
                                                                        if(reaction.emoji.name === '➡️')
                                                                        {
                                                                            message.delete()

                                                                            let embedATgrotte = new Discord.MessageEmbed()
                                                                            .setColor("#5DADE2")
                                                                            .setTitle("Arme palier 2 ( level minimum = 20 )")
                                                                            .addField(":crossed_swords: **Enchantement du paladin gobelin** (HP - AR)", ":dollar: **Prix :** 800  pièces de bronze et 45 pièces d'argent.\n:handbag: **Achat :** ?Achat enchantement gobelin paladin", true)
                                                                            .addField(":dagger: **Enchantement de l'assassin gobelin** (AT - MA)", ":dollar: **Prix :** 800  pièces de bronze et 45 pièces d'argent.\n:handbag: **Achat :** ?Achat enchantement gobelin assassin", true)
                                                                            .addField(":book:  **Enchantement de l'archer gobelin** (MA - AT)", ":dollar: **Prix :** 800 pièces de bronze et 45 pièces d'argent.\n:handbag: **Achat :** ?Achat enchantement gobelin archer", true)
                                                                            message.channel.send(embedATgrotte).then(async message => 
                                                                                { 
                                                                                    await message.react('🔙')
                                                                                    let collector = message.createReactionCollector(filter,{time: 3600000,errors:['time']});
                                                                                        collector.on('collect', (reaction, collector) =>
                                                                                            {
                                                                                                //const reaction = collected.first();
                                                
                                                                                                if(reaction.emoji.name === '🔙')
                                                                                                {
                                                                                                    message.delete()
                                                                                                
                                                                                                    //message.channel.bulkDelete(2);
                                                                                                }
                                                                                            })
                                                                                })
                                                                                        

                                                                        }
                                                                    })
                                                        })
                                                                

                                                }
                                            });
                                        })
                        break;
                        case '✨':
                            let embed4 = new Discord.MessageEmbed()
                            .setColor("#5DADE2")
                            .setTitle("Alchimie ( tout niveaux )")
                            .addField(":heart: **Potion d'HP**", ":dollar: **Prix :** 30  pièces de bronze\n:handbag: **Achat :** ?Achat potion hp", true)
                            .addField(":blue_heart: **Potion de mana**", ":dollar: **Prix :** 30  pièces de bronze\n:handbag: **Achat :** ?Achat potion ma", true)
                            .addField("（ミ◕‿◕ミ）  ","█████████████████████████████████████████████████",)
                            .addField(":heart: **Super potion d'HP**", ":dollar: **Prix :** 90  pièces de bronze\n:handbag: **Achat :** ?Achat potion marécage hp", true)
                            .addField(":blue_heart: **Super potion de mana**", ":dollar: **Prix :** 90  pièces de bronze\n:handbag: **Achat :** ?Achat potion marécage ma", true)
                            .addField("（ミ◕‿◕ミ）  ","█████████████████████████████████████████████████",)
                            .addField(":heart: **Mega potion d'HP**", ":dollar: **Prix :** 200  pièces de bronze et 15 pièces d'argent.\n:handbag: **Achat :** ?Achat potion grotte hp", true)
                            .addField(":blue_heart: **Mega potion de mana**", ":dollar: **Prix :** 200  pièces de bronze et 15 pièces d'argent.\n:handbag: **Achat :** ?Achat potion grotte ma", true)
                            message.channel.send(embed4).then(async message => 
                                { 
                                    await message.react('🔙')
                                    let collector = message.createReactionCollector(filter,{time: 3600000,errors:['time']});
                                        collector.on('collect', (reaction, collector) =>
                                            {
                                                //const reaction = collected.first();

                                                if(reaction.emoji.name === '🔙')
                                                {
                                                    message.delete()
                                                
                                                    //message.channel.bulkDelete(2);
                                                }
                                            });
                                });
                        break;
                        case '✉️':
                            let embedDrog = new Discord.MessageEmbed()
                            .setColor("#5DADE2")
                            .setTitle("Droguerie ( tout niveaux )")
                            .addField("✉️ **Parchemin de message**", ":dollar: **Prix :** 20  pièces de bronze\n:handbag: **Achat :** ?Achat parchemin de message", true)
                            message.channel.send(embedDrog).then(async message => 
                                { 
                                    await message.react('🔙')
                                    let collector = message.createReactionCollector(filter,{time: 3600000,errors:['time']});
                                        collector.on('collect', (reaction, collector) =>
                                            {
                                                //const reaction = collected.first();

                                                if(reaction.emoji.name === '🔙')
                                                {
                                                    message.delete()
                                                
                                                    //message.channel.bulkDelete(2);
                                                }
                                            });
                                });
                        break;

                        case '🔙':
                            message.delete()
                        break;
                    
                    }  
                });
        });        
}
