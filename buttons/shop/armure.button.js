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
    name: 'armure',
    runSlash: async (client, interaction) => 
    {   
        let status = []
        const chunkSize = 6
        const select = new MessageActionRow()
        const messageFunction = new MessageFunction()
        const shopFunction = new ShopFunction()

        const message = await messageFunction.getMessageByIdInteraction(interaction.message.id, interaction)
        const armure = await shopFunction.getShopItemByType("armure")
        const armureSplit = armure.map((e, i) => { return i % chunkSize === 0 ? armure.slice(i, i + chunkSize) : null }).filter(e => { return e })
        
        let embed = message.embeds[0]
        let selectMenu = new MessageSelectMenu()
        .setCustomId('select-shop')
        .setPlaceholder('Acheter un item')

        embed.description = "> **Oriax** : `Voici toutes les armures disponible !`"
        embed.setAuthor({name: `page ${0} sur ${armureSplit.length - 1}`})

        armureSplit[0].forEach(data => 
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
        })

        select.addComponents(selectMenu)
        await messageFunction.editMessageByIdInteraction(interaction.message.id, interaction, embed) 
        await messageFunction.editMessageComponentsByIdInteraction(interaction.message.id, interaction, buttons, select) 
        await interaction.reply({ ephermal: true, fetchReply: true })
    }
}