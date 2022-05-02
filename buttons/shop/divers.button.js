const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js")
const MessageFunction = require("../../functions/gestion/message.function.js")
const ShopFunction = require("../../functions/interface/shop.function")


const buttons = new MessageActionRow()
.addComponents
(
    new MessageButton()
    .setCustomId('previous-divers')
    .setLabel('⟵')
    .setStyle('PRIMARY'),

    new MessageButton()
    .setCustomId('back-shop')
    .setLabel('retour')
    .setStyle('DANGER'),

    new MessageButton()
    .setCustomId('next-divers')
    .setLabel('⟶')
    .setStyle('PRIMARY'),

)
module.exports = 
{
    name: 'divers',
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
        let selectMenu = new MessageSelectMenu()
        .setCustomId('select-shop')
        .setPlaceholder('Acheter un item')


        embed.description = "> **Oriax** : `Voici toutes les bric à brac disponible !`"
        embed.setAuthor({name: `page ${0} sur ${allSplit.length - 1}`})

        allSplit[0].forEach(data => 
        {
            selectMenu.addOptions({label: data.nom, value: data.nomId})

            embed.addField(`__${data.nom}__`,
            `${data.statistique.degat ? `\n⚔️**degat:** _${data.statistique.degat}_`: ""}` +
            `${data.statistique.penetration ? `\n🗡️**penetration:** _${data.statistique.penetration}%_`: ""}` +
            `${data.statistique.critique ? `\n✨**critique:** _${data.statistique.critique}%_`: ""}` +
            `${data.statistique.hp ? `\n❤️**hp:** _${data.statistique.hp}_`: ""}` +
            `${data.statistique.mana ? `\n✨**mana:** _${data.statistique.mana}_`: ""}` +
            `${data.statistique.defensePhysique ? `\n🛡️**armure:** _${data.statistique.defensePhysique}_ `: ""}` +
            `${data.statistique.defenseMagique ? `\n💠**protection:** _${data.statistique.defenseMagique}_`: ""}` +
            `${data.effet.description ? `\n🔰**effet:** _${data.effet.description}_`: ""}` +
            `${data.regeneration ? `\n❤️**gain:** _+${data.regeneration.hp}_%`: ""}` +
            `${data.regeneration ? `\n✨**gain:** _+${data.regeneration.mana}_%`: ""}` +
            `\n🥉**bronze:** _${data.price[0]}_ \n🥈**argent:** _${data.price[1]}_ \n🥇**or:** _${data.price[2]}_`, true)

        })

        select.addComponents(selectMenu)
        await messageFunction.editMessageByIdInteraction(interaction.message.id, interaction, embed) 
        await messageFunction.editMessageComponentsByIdInteraction(interaction.message.id, interaction, buttons, select) 
        await interaction.reply({ ephermal: true, fetchReply: true })
    }
}