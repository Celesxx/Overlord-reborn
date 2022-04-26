const { MessageEmbed } = require("discord.js")
const PlayerCreationFunction = require("../../functions/character/creation.function.js")

module.exports = 
{
    name: 'ptlevel',
    description: "Affiche vos points d'attributs",
    run: async (client, message, args) => 
    {
        var id = message.author.id
        console.log("id : ", id)
        const playerCreationFunction = new PlayerCreationFunction()
        const stat = await playerCreationFunction.getPlayerById(id.replace(/[<@>]/gm,""))
            
        stat = stat[0]
        if(stat.attribut[0] == 0)
        {
            let embed = new Discord.MessageEmbed()
            .setTitle("Vous n'avez pas de points à attribuer.")
            message.channel.send({embeds: [embed]});

        }else 
        {

            const filter = (reaction, user) => ['🛡️','⚔️','✨','❤️'].includes(reaction.emoji.name) && user.id === message.author.id && user.id != message.author.bot;
            let embed = new Discord.MessageEmbed()
            .setColor("#5DADE2")
            .setTitle("Vous pouvez attribuer " + stat.attribut[0] + " dans une de vos statistiques.")
            .setDescription("🛡️ = 0,25 dans l'armure\n⚔️ = 1 dans l'attaque\n✨ = 5 dans le mana\n❤️ = 5 dans la santé\n🔙 = Fermer la commande")
            .setImage("https://static.wikia.nocookie.net/log-horizon/images/0/0f/Teacher_System.png/revision/latest?cb=20131214072538")

            message.channel.send({embeds: [embed]}).then(async message => 
            {
                        
                await message.react('🛡️');
                await message.react('⚔️');
                await message.react('✨');
                await message.react('❤️');
    
                let collector = await message.createReactionCollector(filter,{time: 3600000,errors:['time']});
                await collector.on('collect', async (reaction, collector) =>  
                {
                    if(!collector.bot)
                    {
                        switch (reaction.emoji.name) 
                        {
                            case '🛡️':
                                if(stat.attribut[0] == 0) message.channel.send("Vous n'avez plus de point à attribuer.")
                                else 
                                {
                                    stat.armure[0] += 0.25  
                                    stat.armure[1] += 0.25
                                    stat.attribut[0] -= 1
                                    await playerCreationFunction.editPlayerById(stat.id, stat)
                                    message.channel.send("Vous venez d'utiliser un point dans l'armure, il ne vous en reste plus que " + stat.attribut[0])
                                }
                            break

                            case '⚔️':
                                if(stat.attribut[0] == 0) message.channel.send("Vous n'avez plus de point à attribuer.")
                                else 
                                {
                                    stat.attaque[0] += 1
                                    stat.attaque[1] += 1
                                    stat.attribut[0] -= 1
                                    await playerCreationFunction.editPlayerById(stat.id, stat)
                                    message.channel.send("Vous venez d'utiliser un point dans l'attaque, il ne vous en reste plus que " + stat.attribut[0])
                                }
                            break

                            case '❤️':
                                if(stat.attribut[0] == 0)message.channel.send("Vous n'avez plus de point à attribuer.")
                                else 
                                {
                                    stat.hp[0] += 5
                                    stat.hp[1] += 5
                                    stat.attribut[0] =  stat.attribut[0] - 1
                                    await playerCreationFunction.editPlayerById(stat.id, stat)
                                    message.channel.send("Vous venez d'utiliser un point dans la vitalité, il ne vous en reste plus que " + stat.attribut[0])
                                }
                            break;

                            case '✨':
                                if(stat.attribut[0] == 0) message.channel.send("Vous n'avez plus de point à attribuer.")
                                else 
                                {
                                    stat.magie[0] += 5
                                    stat.magie[1] += 5
                                    stat.attribut[0] =  stat.attribut[0] - 1
                                    await playerCreationFunction.editPlayerById(stat.id, stat)
                                    message.channel.send("Vous venez d'utiliser un point dans le mana, il ne vous en reste plus que " + stat.attribut[0])
                                }
                            break;
                        
                        }
                    }
                })
            })
        }
    }
}