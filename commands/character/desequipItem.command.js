const PlayerCreationFunction = require("../../functions/character/creation.function.js")

module.exports = 
{
    name: 'déséquiper',
    description: "Permet de déséquiper un item",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /déséquiper ")
    },
    options:
    [
        {
            name: "item",
            description: "le nom id de l'equipement",
            type: "STRING",
            required: true,
        },
        
    ],
    runSlash: async (client, interaction) => 
    {   
        const item = interaction.options.get("item").value
        const id = interaction.member.user.id
        const playerCreationFunction = new PlayerCreationFunction()

        let player = await playerCreationFunction.getPlayerById(id)
        player = player[0]
        
        if(Object.values(player.equipement).some(data => data != undefined ? data.nomId == item : null) || player.equipement.accessoire.length !=0 )
        {

            let idItem
            for(let [key, value] of Object.entries(player.equipement)) 
            {
                if(value != undefined && value.nomId == item && value != null && !Array.isArray(value))
                {
                    for(const [keyStat, valueStat] of Object.entries(value.statistique))
                    {
                        if(keyStat == "hp") player.hp[1] -= valueStat
                        else if(keyStat == "mana") player.magie[1] -= valueStat
                        else if(keyStat == "degat") player.attaque[0] -= parseFloat(valueStat), player.attaque[1] -= parseFloat(valueStat)
                        else if(keyStat == "defensePhysique") player.armure[0] -= parseFloat(valueStat), player.armure[1] -= parseFloat(valueStat)
                        else if(keyStat == "defenseMagique") player.protection[0] -= parseFloat(valueStat), player.protection[1] -= parseFloat(valueStat)
                    }

                    idItem = value._id
                    player.equipement[key] = null
                
                }else if(Array.isArray(value))
                {
                    const valueItem = value.filter(data => data.nomId == item)
                    if(valueItem.length != 0) 
                    {
                        for(const [keyStat, valueStat] of Object.entries(valueItem[0].statistique))
                        {
                            if(keyStat == "hp") player.hp[1] -= valueStat
                            else if(keyStat == "mana") player.magie[1] -= valueStat
                            else if(keyStat == "degat") player.attaque[0] -= parseFloat(valueStat), player.attaque[1] -= parseFloat(valueStat)
                            else if(keyStat == "defensePhysique") player.armure[0] -= parseFloat(valueStat), player.armure[1] -= parseFloat(valueStat)
                            else if(keyStat == "defenseMagique") player.protection[0] -= parseFloat(valueStat), player.protection[1] -= parseFloat(valueStat)
                            
                        }
                        idItem = valueItem[0]._id
                        player.equipement.accessoire = value.filter(data => data.nomId != item)
                    }
                }

                if(player.hp[0] > player.hp[1]) player.hp[0] = player.hp[1]
                if(player.magie[0] > player.magie[1]) player.magie[0] = player.magie[1]
            }

            player.inventaire.push({_id: idItem})
            await playerCreationFunction.editPlayerById(id, player)
            interaction.reply(`Vous vous êtes bien déséquiper de l'item ${item}`)
        
        }else interaction.reply("Vous n'avez pas cet item d'équiper !")
    }
}