const { MessageActionRow, MessageSelectMenu } = require("discord.js")
const MessageFunction = require("../../functions/gestion/message.function.js")
const ShopFunction = require("../../functions/interface/shop.function")


module.exports = 
{
    name: 'previous-divers',
    runSlash: async (client, interaction) => 
    {   
        const chunkSize = 6
        const select = new MessageActionRow()
        const messageFunction = new MessageFunction()
        const shopFunction = new ShopFunction()

        const message = await messageFunction.getMessageByIdInteraction(interaction.message.id, interaction)
        const accesoire = await shopFunction.getShopItemByType("accesoire")
        const autre = await shopFunction.getShopItemByType("autre")
        const potion = await shopFunction.getShopItemByType("potion")

        const all = accesoire.concat(autre).concat(potion)
        const allSplit = all.map((e, i) => { return i % chunkSize === 0 ? all.slice(i, i + chunkSize) : null }).filter(e => { return e })

        let embed = message.embeds[0]
        let page = parseInt(embed.author.name.replace(/[^0-9]/g,'')[0]) - 1
        if(page < 0) page = allSplit.length - 1
        let selectMenu = new MessageSelectMenu()
        .setCustomId('select-shop')
        .setPlaceholder('Acheter un item')
        
        embed.author.name = `page ${page} sur ${allSplit.length - 1}`
        embed.fields = []
        let i = 0
        allSplit[page].forEach(data => 
        {
            selectMenu.addOptions({label: data.nom, value: data.nomId})

            embed.addField(`__${data.nom}__`,
            `${data.statistique && data.statistique.degat ? `\n⚔️**degat:** _${data.statistique.degat}_`: ""}` +
            `${data.statistique && data.statistique.penetration ? `\n🗡️**penetration:** _${data.statistique.penetration}%_`: ""}` +
            `${data.statistique && data.statistique.critique ? `\n✨**critique:** _${data.statistique.critique}%_`: ""}` +
            `${data.statistique && data.statistique.hp ? `\n❤️**hp:** _${data.statistique.hp}_`: ""}` +
            `${data.statistique && data.statistique.mana ? `\n✨**mana:** _${data.statistique.mana}_`: ""}` +
            `${data.statistique && data.statistique.defensePhysique ? `\n🛡️**armure:** _${data.statistique.defensePhysique}_ `: ""}` +
            `${data.statistique && data.statistique.defenseMagique ? `\n💠**protection:** _${data.statistique.defenseMagique}_`: ""}` +
            `${data.effet.description ? `\n🔰**effet:** _${data.effet.description}_`: ""}` +
            `${data.regeneration ? `\n❤️**gain:** _+${data.regeneration.hp}_%`: ""}` +
            `${data.regeneration ? `\n✨**gain:** _+${data.regeneration.mana}_%`: ""}` +
            `${data.description != "" ? `\n✨**description:** _${data.description}_`: ""}` +
            `\n🥉**bronze:** _${data.price[0]}_ \n🥈**argent:** _${data.price[1]}_ \n🥇**or:** _${data.price[2]}_`, true)

            i++
        })

        select.addComponents(selectMenu)
        await messageFunction.editMessageByIdInteraction(interaction.message.id, interaction, embed) 
        await messageFunction.editMessageSelectFirstByIdInteraction(interaction.message.id, interaction, select) 
        await interaction.reply({ ephermal: true, fetchReply: true})

    }
}