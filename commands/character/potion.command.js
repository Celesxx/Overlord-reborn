const { MessageEmbed } = require("discord.js")
const PlayerCreationFunction = require("../../functions/character/creation.function.js")
const LogCombatFunction = require("../../functions/gestion/logCombat.function.js")
const MessageFunction = require("../../functions/gestion/message.function.js")

module.exports = 
{
    name: 'potion',
    description: "Permet d'utiliser une potion",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /potion ")
    },
    options:
    [
        {
            name: "item",
            description: "le nom id de l'equipement",
            type: "STRING",
            required: true,
        },
        {
            name: "combat-id",
            description: "id du combat si jamais vous êtes dans un combat",
            type: "STRING",
            required: false,
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        let [regeneration, hadItem, name, combatId] = [{hp: 0, mana: 0}, true, ""]
        const item = interaction.options.get("item").value
        if(interaction.options.get("combatId")) combatId = interaction.options.get("combatId").value
        const user = interaction.member.user.id
        
        const playerCreationFunction = new PlayerCreationFunction()
        const logCombatFunction = new LogCombatFunction()
        const messageFunction = new MessageFunction()
        
        let player = await playerCreationFunction.getPlayerById(user)
        const logCombat = await logCombatFunction.getLogCombatParticipantId(user)
        
        player = player[0]

        if(player.inventaire.some(data => data.nomId == item))
        {

            for(const data of player.inventaire)
            {
                if(data.nomId == item)
                {
                    name = data.nom
                    regeneration.hp = data.regeneration.hp
                    regeneration.mana = data.regeneration.mana
                    player.hp[0] += data.regeneration.hp
                    player.magie[0] += data.regeneration.mana

                    if(player.hp[0] > player.hp[1]) player.hp[0] = player.hp[1]
                    if(player.magie[0] > player.magie[1]) player.magie[0] = player.magie[1]
                    
                    let index = player.inventaire.indexOf(data)
                    if (index !== -1) { player.inventaire.splice(index, 1) }
                    break
                }
            }
        
        }else 
        {
            interaction.channel.send({content: "Vous n'avez pas cet item dans votre inventaire !"})
            hadItem = false
        }

        if(logCombat.length == 0 && hadItem)
        {
            let embed = new MessageEmbed()
            .setColor("#00FF00")
            .setTitle(`Utilisation de la potion`)
            .setDescription(`Vous utilisez une ${name} vous rendant ${regeneration.hp != 0 ? regeneration.hp : 0} hp et ${regeneration.mana != 0 ? regeneration.mana : 0} `)
            
            await playerCreationFunction.editPlayerById(user, player)
            await interaction.member.setNickname(player.prenom + " [❤️" + player.hp[0] + "] [✨" + player.magie[0] + "]")
            await interaction.channel.send({embeds: [embed]})

        }else if(logCombat.length != 0 && hadItem)
        {
            const embedData = await messageFunction.getMessageByIdInteraction(logCombat[0].messageId, interaction)
            let embed = embedData.embeds[0]

            let order = embed.fields.slice(3)[0].value.split("\n")
            let userOrder = order.filter(participant => participant.includes(user)).join("")

            if(userOrder.includes(":x:"))
            {
                userOrder = `:white_check_mark:<@${userOrder.replace(/[:x<@> ]/gm, "")}>` 
                order.forEach( (value, id) =>  { if(value.includes(user)) order[id] = userOrder }) 
                embed.fields.slice(-1)[0].value = `Vous utilisez une ${name} vous rendant ${regeneration.hp != 0 ? regeneration.hp : 0} hp et ${regeneration.mana != 0 ? regeneration.mana : 0} `  
                await playerCreationFunction.editPlayerById(user, player)
                await interaction.member.setNickname(player.prenom + " [❤️" + player.hp[0] + "] [✨" + player.magie[0] + "]")
            }
            else if(userOrder.includes(":white_check_mark:")) embed.fields.slice(-1)[0].value = `<@${user}> à déja effectué son action pour ce tour !`   
            
            if(!order.some(member => member.includes(":x:")))
            {
                order.forEach((value, id) => 
                {
                    order[id] = order[id].replace(":white_check_mark:", ":x:")
                })
                embed.fields.slice(2)[0].value = parseInt(embed.fields.slice(2)[0].value) + 1
            }

            embed.fields.slice(3)[0].value = order.join("\n")

            await logCombatFunction.addEventTurnLogCombatByName(combatId, logCombat[0], { number: embed.fields.slice(2)[0].value, event: embed.fields.slice(-1)[0].value })
            await messageFunction.editMessageByIdInteraction(logCombat[0].messageId, interaction, embed) 
        }

        await interaction.reply({ ephermal: true, content: '** **' })
        await interaction.deleteReply()
    }
}