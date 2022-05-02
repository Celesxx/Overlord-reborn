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
    name: 'arme',
    runSlash: async (client, interaction) => 
    {   
        let status = []
        const chunkSize = 6
        const select = new MessageActionRow()
        const messageFunction = new MessageFunction()
        const shopFunction = new ShopFunction()

        const message = await messageFunction.getMessageByIdInteraction(interaction.message.id, interaction)
        const arme = await shopFunction.getShopItemByType("arme")
        const armeSplit = arme.map((e, i) => { return i % chunkSize === 0 ? arme.slice(i, i + chunkSize) : null }).filter(e => { return e })
        
        let embed = message.embeds[0]
        let selectMenu = new MessageSelectMenu()
        .setCustomId('select-shop')
        .setPlaceholder('Acheter un item')

        embed.description = "> **Oriax** : `Voici toutes les armes disponible !`"
        embed.setAuthor({name: `page ${0} sur ${armeSplit.length - 1}`})

        armeSplit[0].forEach(data => 
        {
            selectMenu.addOptions({label: data.nom, value: data.nomId})

            if(!data.statistique.hp)
            {
                embed.addField(`__${data.nom}__`,
                `⚔️**degat:** _${data.statistique.degat}_
                🗡️**penetration:** _${data.statistique.penetration}%_ 
                ✨**critique:** _${data.statistique.critique}%_${data.effet.description ? `\n🔰**effet:**${data.effet.description}`: ""}
                🥉**bronze:** _${data.price[0]}_
                🥈**argent:** _${data.price[1]}_
                🥇**or:** _${data.price[2]}_`, true)
            }else
            {
                embed.addField(`__${data.nom}__`,
                `❤️**hp:** _${data.statistique.hp}_
                🛡️**armure:** _${data.statistique.defensePhysique}_ 
                💠**protection:** _${data.statistique.defensePhysique}_${data.effet.description ? `\n🔰**effet:**${data.effet.description}`: ""}
                🥉**bronze:** _${data.price[0]}_
                🥈**argent:** _${data.price[1]}_
                🥇**or:** _${data.price[2]}_`, true)
            }
        })

        select.addComponents(selectMenu)
        await messageFunction.editMessageByIdInteraction(interaction.message.id, interaction, embed) 
        await messageFunction.editMessageComponentsByIdInteraction(interaction.message.id, interaction, buttons, select) 
        await interaction.reply({ ephermal: true, fetchReply: true })
    }
}