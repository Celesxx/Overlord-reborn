const { MessageEmbed } = require("discord.js")
const PlayerCreationFunction = require("../../functions/character/creation.function.js")

module.exports = 
{
    name: 'profil',
    description: "Affiche le profil d'un personnage",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /")
    },
    options:
    [
        {
            name: "personnage",
            description: "ping le joueur pour afficher son personnage",
            type: "STRING",
            required: false,
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        let user = interaction.options.get("personnage")
        
        if(user) id = user.value
        else id = interaction.member.user.id
        
        const playerCreationFunction = new PlayerCreationFunction()
        let result = Promise.resolve(playerCreationFunction.getPlayerById(id.replace(/[<@!>]/gm, "")))
        result.then(async data => 
        {
            data = data[0]

            let embed = new MessageEmbed()
            .setColor("#5DADE2")
            .setTitle(`:bust_in_silhouette: ${data.prenom} ${data.nom}`)
            .addField(`:dna: race`, data.race)
            .addField(`:label: classe`, data.classe)
            .addField(`:beginner: level`, `${data.lvl}`, true)
            .addField(`:military_medal: experience`, `${data.xp}`, true)
            .addField(`:fleur_de_lis: attribut restant`, `${data.attribut[0]}`)
            .addField(`:heart: hp`, `${data.hp[0]}`, true)
            .addField(`:sparkles: magie`, `${data.magie[0]}`, true)
            .addField(`:crossed_swords: attaque`, `${data.attaque[0]}`, true)
            .addField(`:shield: armure`, `${data.armure[0]}`, true)
            .addField("●▬▬▬▬▬▬▬▬▬▬:gear: equipement :gear:▬▬▬▬▬▬▬▬▬▬●", `casque : ${Object.values(data.equipement.casque)} \nplastron : ${Object.values(data.equipement.plastron)} \narme : ${Object.values(data.equipement.arme)}`)
            .addField("●▬▬▬▬▬▬▬▬▬▬:tools: : inventaire :tools:▬▬▬▬▬▬▬▬▬▬●", Object.keys(data.inventaire).length != 0 ? `${data.inventaire}` : '-')
            .addField("●▬▬▬▬▬▬▬▬▬▬:coin:     argent     :coin:▬▬▬▬▬▬▬▬▬▬●", `:third_place: bronze : ${data.money[0]} \n:second_place: argent : ${data.money[1]} \n:first_place: or : ${data.money[2]}`)
            .setImage(data.image.replace(/["]/gm, ""))
            
            await interaction.reply({ ephermal: true, content: '** **' })
            await interaction.deleteReply()
            await interaction.channel.send({embeds: [embed]})

        })

    }
}