const { MessageEmbed } = require("discord.js")
const PlayerCreationFunction = require("../../functions/character/creation.function")
const InventaireFunction = require("../../functions/character/inventaire.function.js")
const classe = require('../../bdd/classe.json')


module.exports = 
{
    name: 'reset-character',
    description: "⚠️Commande admin⚠️ Permet de reset toutes les stats.",
    run: async (client, message, args) => 
    {
        message.channel.send("Merci de faire la commande /reset-character")

    },
    runSlash: async (client, interaction) => 
    {

        if(interaction.member.roles.cache.some(role => role.name === 'Fondateur' || role.name === 'Administrateur'))
        {

            const inventaireFunction = new InventaireFunction()
            const playerCreationFunction = new PlayerCreationFunction()

            let players = await playerCreationFunction.getAllPlayers()

            for(let player of players)
            {
                player = await inventaireFunction.removeEquipmentStat(player)
                
                let classStat = classe[player.classe].statistiques
                const [gainHp, gainMana, gainAttaque, gainArmure, gainProtection] = [classStat.hp, classStat.mana, classStat.attaque, classStat.armure, classStat.protection]
                const [beforeHp, beforeMana, beforeAttaque, beforeArmure, beforeProtection] = [player.hp[1], player.magie[1], player.attaque[1], player.armure[1], player.protection[1]]

                console.log(`personnage : ${player.prenom}`)
                console.log(`lvl : ${player.lvl}`)
                console.log(`classe : ${player.classe}`)
                console.log(`race : ${player.race}`)

                console.log(`before : hp ${player.hp[1]}, mana ${player.magie[1]}, attaque ${player.attaque[1]}, armure ${player.armure[1]}, protection ${player.protection[1]}`)
                player.lvl -= 1
                player.hp[1] = Math.round(60 + (gainHp * player.lvl) + ( (gainHp * player.lvl * player.hp[2]) - (gainHp * player.lvl) ))
                player.magie[1] = Math.round(20 + (gainMana * player.lvl) + ( (gainMana * player.lvl * player.magie[2]) - (gainMana * player.lvl) ))
                player.attaque[1] = Math.round(10 + (gainAttaque * player.lvl) + ( (gainAttaque * player.lvl * player.attaque[2]) - (gainAttaque * player.lvl) ))
                player.armure[1] = Math.round(2 + (gainArmure * player.lvl) + ( (gainArmure * player.lvl * player.armure[2]) - (gainArmure * player.lvl) ), 2)
                player.protection[1] = Math.round(2 + (gainProtection * player.lvl) + ( (gainProtection * player.lvl * player.protection[2]) - (gainProtection * player.lvl) ), 2)
                
                player.hp[0] = player.hp[1]
                player.magie[0] = player.magie[1]
                player.attaque[0] = player.attaque[1]
                player.armure[0] = player.armure[1]
                player.protection[0] = player.protection[1]

                player.lvl += 1
                
                console.log(`after : hp ${player.hp[1]}, mana ${player.magie[1]}, attaque ${player.attaque[1]}, armure ${player.armure[1]}, protection ${player.protection[1]}`)
                
                console.log(`gain hp : ${player.hp[1] - beforeHp}`)
                console.log(`gain mana : ${player.magie[1] - beforeMana}`)
                console.log(`gain attaque : ${player.attaque[1] - beforeAttaque}`)
                console.log(`gain armure : ${player.armure[1] - beforeArmure}`)
                console.log(`gain protection : ${player.protection[1] - beforeProtection}`)



                player = await inventaireFunction.addEquipmentStat(player)

                console.log(`item hp : ${player.hp[1]}`)
                console.log(`item mana : ${player.magie[1]}`)
                console.log(`item attaque : ${player.attaque[1]}`)
                console.log(`item armure : ${player.armure[1]}`)
                console.log(`item protection : ${player.protection[1]}`)
                console.log("------------------------------------------------------------")

            }


            

        }
    }

}