const PlayerFunction = require("../../functions/character/creation.function")
const ShopFunction = require("../../functions/interface/shop.function")
const MessageFunction = require("../../functions/gestion/message.function.js")
const { ObjectId } = require('mongodb');

module.exports = 
{
    name: 'select-shop',
    runSlash: async (client, interaction) => 
    {   

        const shopFunction = new ShopFunction()
        const playerFunction = new PlayerFunction()
        const messageFunction = new MessageFunction()

        const item = await shopFunction.getShopItemByName(interaction.values[0])
        let player = await playerFunction.getPlayerById(interaction.user.id)
        
        if(player[0].money[0] >= item[0].price[0] && player[0].money[1] >= item[0].price[1] && player[0].money[2] >= item[0].price[2])
        {
            player[0].inventaire.push({_id: item[0]._id})
            player[0].money[0] -= item[0].price[0]
            player[0].money[1] -= item[0].price[1]
            player[0].money[2] -= item[0].price[2]
            await playerFunction.editPlayerById(player[0].id, player[0])
            interaction.reply(`Vous venez d'acheter l'item suivant : ${item[0].nom}`)
            setTimeout(() => { interaction.deleteReply()}, 2000)

        
        }else 
        {
            interaction.reply(`Vous n'avez pas assez d'argent pour acheter l'item suivant : ${item[0].nom}`)
            setTimeout(() => {interaction.deleteReply()}, 2000)
        }




    }
}