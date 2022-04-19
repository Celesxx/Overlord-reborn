if(message.content.toLowerCase().startsWith(`${préfix}ptlevelOld`)){
    var id = message.author.id
    if(bdd[id].ptStock == 0){
        var embed = new Discord.MessageEmbed()
        .setTitle("Vous n'avez pas de points à attribuer.")
        message.channel.send({embeds: [embed]});
    } else {

            const filter = (reaction, user) => ['🛡️','⚔️','✨','🔙','❤️'].includes(reaction.emoji.name) &&user.id === message.author.id;
            let embed = new Discord.MessageEmbed()
            .setColor("#5DADE2")
            .setTitle("Vous pouvez attribuer " + bdd[id].ptStock + " dans une de vos statistiques.")
                .setAuthor("🛡️ = 0,5 dans l'armure\n⚔️ = 1 dans l'attaque\n✨ = 5 dans le mana\n❤️ = 5 dans la santé\n🔙 = Fermer la commande")
                
                .setImage("https://static.wikia.nocookie.net/log-horizon/images/0/0f/Teacher_System.png/revision/latest?cb=20131214072538")
            message.channel.send({embeds: [embed]}).then(async message => 
                {
                    await message.react('🛡️');
                    await message.react('⚔️');
                    await message.react('✨');
                    await message.react('❤️');
                    await message.react('🔙');
        
                    //message.awaitReactions(filter,{max: 1, time: 10000,errors:['time']}).then(collected =>
                    let collector = message.createReactionCollector(filter,{time: 3600000,errors:['time']});
                    collector.on('collect', (reaction, collector) =>  {
                            //const reaction = collected.first();
        
                            switch (reaction.emoji.name) {
                                case '🛡️':
                                    if(bdd[id].ptStock == 0){
                                        let embed2 = new Discord.MessageEmbed()
                                        .setColor("#5DADE2")
                                        .setTitle("Vous n'avez plus de point à attribuer.")
                                        message.channel.send(embed2)  
                                    } else {
                                    bdd[id].AR =  bdd[id].AR + 0.5
                                    bdd[id].ptStock =  bdd[id].ptStock - 1
                                    message.channel.send("Vous venez d'utiliser un point dans l'armure, il ne vous en reste plus que " + bdd[id].ptStock)
                                    actualisationTotal(id);
                                    resetStatus()
                                    Savebdd()
                                }
                                break;
                                case '⚔️':
                                    if(bdd[id].ptStock == 0){
                                        let embed2 = new Discord.MessageEmbed()
                                        .setColor("#5DADE2")
                                        .setTitle("Vous n'avez plus de point à attribuer.")
                                        message.channel.send(embed2)
                                    }else {
                                    bdd[id].AT =  bdd[id].AT + 1
                                    bdd[id].ptStock =  bdd[id].ptStock - 1
                                    message.channel.send("Vous venez d'utiliser un point dans l'attaque, il ne vous en reste plus que " + bdd[id].ptStock)
                                    actualisationTotal(id);
                                    resetStatus()
                                    Savebdd()
                                    }
                                break;
                                case '❤️':
                                    if(bdd[id].ptStock == 0){
                                        let embed2 = new Discord.MessageEmbed()
                                        .setColor("#5DADE2")
                                        .setTitle("Vous n'avez plus de point à attribuer.")
                                        message.channel.send(embed2)
                                        Savebdd()
                                    } else {
                                    bdd[id].HP =  bdd[id].HP + 5
                                    bdd[id].ptStock =  bdd[id].ptStock - 1
                                    message.channel.send("Vous venez d'utiliser un point dans la vitalité, il ne vous en reste plus que " + bdd[id].ptStock)
                                    actualisationTotal(id);
                                    resetStatus()
                                    Savebdd()
                                    }
                                break;
                                case '✨':
                                    if(bdd[id].ptStock == 0){
                                        let embed2 = new Discord.MessageEmbed()
                                        .setColor("#5DADE2")
                                        .setTitle("Vous n'avez plus de point à attribuer.")
                                        message.channel.send(embed2)
                                    } else {
                                    bdd[id].MA =  bdd[id].MA + 5
                                    bdd[id].ptStock =  bdd[id].ptStock - 1  
                                    message.channel.send("Vous venez d'utiliser un point dans le mana, il ne vous en reste plus que " + bdd[id].ptStock)
                                    actualisationTotal(id);
                                    resetStatus()
                                    Savebdd()
                                    }
                                break;
                                case '🔙':
                                    message.delete()
                                break;
                            
                            }  
                        });
                });
        
    }
}
