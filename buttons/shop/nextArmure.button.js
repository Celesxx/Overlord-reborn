const { MessageActionRow, MessageSelectMenu } = require("discord.js")
const MessageFunction = require("../../functions/gestion/message.function.js")
const ShopFunction = require("../../functions/interface/shop.function")


module.exports = 
{
    name: 'next-armure',
    runSlash: async (client, interaction) => 
    {   
        const chunkSize = 6
        const select = new MessageActionRow()
        const messageFunction = new MessageFunction()
        const shopFunction = new ShopFunction()

        const message = await messageFunction.getMessageByIdInteraction(interaction.message.id, interaction)
        const armure = await shopFunction.getShopItemByType("armure")
        const armureSplit = armure.map((e, i) => { return i % chunkSize === 0 ? armure.slice(i, i + chunkSize) : null }).filter(e => { return e })
        let embed = message.embeds[0]
        let page = parseInt(embed.author.name.replace(/[^0-9]/g,'')[0]) + 1
        if(page > armureSplit.length - 1) page = 0
        let selectMenu = new MessageSelectMenu()
        .setCustomId('select-shop')
        .setPlaceholder('Acheter un item')

        embed.author.name = `page ${page} sur ${armureSplit.length - 1}`
        let i = 0
        embed.fields = []
        armureSplit[page].forEach(data => 
        {
            selectMenu.addOptions({label: data.nom, value: data.nomId})

            embed.addField(`__${data.nom}__`,
            `❤️**hp:** _${data.statistique.hp}_
            ✨**mana:** _${data.statistique.mana}_ 
            🛡️**armure:** _${data.statistique.defensePhysique}_ 
            💠**protection:** _${data.statistique.defensePhysique}_
            🥉**bronze:** _${data.price[0]}_
            🥈**argent:** _${data.price[1]}_
            🥇**or:** _${data.price[2]}_`, true)

            i++
        })

        select.addComponents(selectMenu)
        await messageFunction.editMessageByIdInteraction(interaction.message.id, interaction, embed) 
        await messageFunction.editMessageSelectFirstByIdInteraction(interaction.message.id, interaction, select) 
        await interaction.reply({ ephermal: true, fetchReply: true})

    }
}