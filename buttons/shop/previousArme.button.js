const { MessageActionRow, MessageSelectMenu } = require("discord.js")
const MessageFunction = require("../../functions/gestion/message.function.js")
const ShopFunction = require("../../functions/interface/shop.function")


module.exports = 
{
    name: 'previous-arme',
    runSlash: async (client, interaction) => 
    {   
        const chunkSize = 6
        const select = new MessageActionRow()
        const messageFunction = new MessageFunction()
        const shopFunction = new ShopFunction()

        const message = await messageFunction.getMessageByIdInteraction(interaction.message.id, interaction)
        let arme = await shopFunction.getShopItemByType("arme")
        const bouclier = await shopFunction.getShopItemByType("bouclier")
        arme = arme.concat(bouclier)
        
        const armeSplit = arme.map((e, i) => { return i % chunkSize === 0 ? arme.slice(i, i + chunkSize) : null }).filter(e => { return e })

        let embed = message.embeds[0]
        let page = parseInt(embed.author.name.replace(/[^0-9]/g,'')[0]) - 1
        if(page < 0) page = armeSplit.length - 1
        let selectMenu = new MessageSelectMenu()
        .setCustomId('select-shop')
        .setPlaceholder('Acheter un item')

        embed.author.name = `page ${page} sur ${armeSplit.length - 1}`
        embed.fields = []
        let i = 0
        armeSplit[page].forEach(data => 
        {
            selectMenu.addOptions({label: data.nom, value: data.nomId})

            if(!data.statistique.hp)
            {
                embed.addField(`__${data.nom}__`,
                `āļø**degat:** _${data.statistique.degat}_
                š”ļø**penetration:** _${data.statistique.penetration}%_ 
                āØ**critique:** _${data.statistique.critique}%_${data.effet.description ? `\nš°**effet:**${data.effet.description}`: ""}
                š„**bronze:** _${data.price[0]}_
                š„**argent:** _${data.price[1]}_
                š„**or:** _${data.price[2]}_`, true)
            }else
            {
                embed.addField(`__${data.nom}__`,
                `ā¤ļø**hp:** _${data.statistique.hp}_
                š”ļø**armure:** _${data.statistique.defensePhysique}_ 
                š **protection:** _${data.statistique.defensePhysique}_${data.effet.description ? `\nš°**effet:**${data.effet.description}`: ""}
                š„**bronze:** _${data.price[0]}_
                š„**argent:** _${data.price[1]}_
                š„**or:** _${data.price[2]}_`, true)
            }

            i++
        })

        select.addComponents(selectMenu)
        await messageFunction.editMessageByIdInteraction(interaction.message.id, interaction, embed) 
        await messageFunction.editMessageSelectFirstByIdInteraction(interaction.message.id, interaction, select) 
        await interaction.reply({ ephermal: true, fetchReply: true})

    }
}