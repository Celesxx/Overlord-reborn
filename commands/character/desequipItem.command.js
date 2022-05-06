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


        
        if(Object.values(player.equipement).some(data => data != undefined ? data.nomId == item : null))
        {
            let idItem

            for(let [key, value] of Object.entries(player.equipement)) 
            {
                if(value != undefined && value.nomId == item)
                {
                    idItem = value._id
                    player.equipement[key] = null
                }
            }

            player.inventaire.push({_id: idItem})
            await playerCreationFunction.editPlayerById(id, player)
            interaction.reply(`Vous vous êtes bien déséquiper de l'item ${item}`)
            
        
        }else interaction.reply("Vous n'avez pas cet item d'équiper !")
    }
}