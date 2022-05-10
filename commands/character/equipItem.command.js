const PlayerCreationFunction = require("../../functions/character/creation.function.js")

module.exports = 
{
    name: 'equiper',
    description: "Permet de s'équiper d'un item",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /equiper ")
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

        if(player.inventaire.some(data => data.nomId == item))
        {
            let [type, idItem, alreadyEquiped, statistiques, maxItem] = ["", "", false, [], false]

            for(const data of player.inventaire)
            {
                if(data.nomId == item)
                {
                    if(data.type == "armure" && data.nom.includes("casque")) type = "casque"
                    else if(data.type == "armure") type = "plastron"
                    else if(data.type == "arme") type = "arme"
                    else if(data.type == "bouclier") type = "bouclier"
                    else if(data.type == "accesoire") type = "accessoire"

                    for(const [key, value] of Object.entries(player.equipement))
                    {
                        if(key == type && value != undefined && key != "accessoire") 
                        {
                            alreadyEquiped = true
                            break
                        }
                    }

                    if(alreadyEquiped) break
                    idItem = data._id
                    statistiques.push(data.statistique)

                    let index = player.inventaire.indexOf(data)
                    if (index !== -1) { player.inventaire.splice(index, 1) }
                    break
                }
            }
            if(!alreadyEquiped)
            {
                for(let [key, value] of Object.entries(player.equipement)) 
                {
                    if(key == type && key != "accessoire") player.equipement[key] = {_id : idItem}
                    else if(key == type && key == "accessoire" && player.equipement[key].length < 2) 
                    {
                        player.equipement[key].push({_id : idItem})
                    }
                    else if(key == type && key == "accessoire" && player.equipement[key].length >= 2) maxItem = true
                }
                
                if(!maxItem)
                {
                    for( [key, value] of Object.entries(statistiques[0]))
                    {
                        if(key == "hp") player.hp[0] += value, player.hp[1] += value
                        else if(key == "mana") player.magie[0] += value, player.magie[1] += value
                        else if(key == "degat") player.attaque[0] += parseFloat(value), player.attaque[1] += parseFloat(value)
                        else if(key == "defensePhysique") player.armure[0] += parseFloat(value), player.armure[1] += parseFloat(value)
                        else if(key == "defenseMagique") player.protection[0] += parseFloat(value), player.protection[1] += parseFloat(value)
                    }
                
                    await playerCreationFunction.editPlayerById(id, player)
                    interaction.reply(`Vous vous êtes bien équiper de l'item ${item}`)
                
                }else interaction.reply(`Vous ne pouvez pas avoir plus de 2 accessoires sur vous !`)
            
            }else interaction.reply("Vous avez déja un item d'équiper, mercide faire /déséquiper")
        
        }else interaction.reply("Vous n'avez pas cet item dans votre inventaire !")
    }
}