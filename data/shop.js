if(message.content.toLowerCase().statWith(`${shop}`))
{
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
