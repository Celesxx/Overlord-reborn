const MessageFunction = require("../../functions/gestion/message.function.js")
const bddClass = require("../../bdd/classe.json")

module.exports = 
{
    name: 'select-classe',
    runSlash: async (client, interaction) => 
    {   
        const messageFunction = new MessageFunction()

        const message = await messageFunction.getMessageByIdInteraction(interaction.message.id, interaction)

        let embed = message.embeds[0]
        const classe = bddClass[interaction.values[0]]

        embed.title = `__${classe.nom}__`
        embed.description = `_${classe.description}_`
        embed.image.url = classe.image
        embed.fields = []
        embed.addField("Gain par niveau", `❤️ ${classe.statistiques.hp} | ✨ ${classe.statistiques.mana} |🛡️ ${classe.statistiques.armure} | ⚔️ ${classe.statistiques.attaque} `)
        embed.addField("Compétences", "ci-dessous vous allez trouvé les différentes aptitudes et compétences que vous allez débloquer au fur et a mesure de votre level")

        classe.level.forEach(element => 
        {
            let gainAll = []
            if(element.passif.length != 0) element.passif.forEach(gain => gainAll.push( `**Nom : **${gain.nom}\n**Description: **${gain.description}\n`))
            else if(element.skill.length != 0)element.skill.forEach(gain => gainAll.push( `**Nom : **${gain.nom}\n**Description: **${gain.description}\n`))
            
            embed.addField(`🔰level : ${element.lvl}`, `${gainAll.join("").replace(/[,]/gm, "")}`)  
        })

        await messageFunction.editMessageByIdInteraction(interaction.message.id, interaction, embed) 
        await interaction.reply({ ephermal: true, fetchReply: true })
    }
}