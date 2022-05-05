const PlayerCreationFunction = require("../../functions/character/creation.function.js")

module.exports = 
{
    name: 'equiper',
    description: "Affiche le profil d'un personnage",
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
            required: false,
        },
        
    ],
    runSlash: async (client, interaction) => 
    {   
        const item = interaction.options.get("item").value
        const id = interaction.member.user.id
        console.log("id : ", id)
        const playerCreationFunction = new PlayerCreationFunction()

        let player = await playerCreationFunction.getPlayerById(id)
        player = player[0]

        if(player.inventaire.some(data => data.nomId == item))
        {
            let [type, idItem] = []

            for(const data of player.inventaire)
            {
                if(data.nomId == item)
                {
                    if(data.type == "armure" && data.nom.includes("casque")) type = "casque"
                    else if(data.type == "armure") type = "plastron"
                    else if(data.type == "arme") type = "arme"
                    idItem = data._id

                    let index = player.inventaire.indexOf(data)
                    if (index !== -1) { player.inventaire.splice(index, 1) }
                    console.log("taille après : ", player.inventaire.length)
                    break
                }
            }
            for(let [key, value] of Object.entries(player.equipement)) 
            {
                if(key == type) player.equipement[key] = {_id : idItem}
            }
            
            await playerCreationFunction.editPlayerById(id, player)
            interaction.reply(`Vous vous êtes bien équiper de l'item ${item}`)
        }
        



    }
}