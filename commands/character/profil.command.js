const { MessageEmbed } = require("discord.js")
const PlayerCreationFunction = require("../../functions/character/creation.function.js")
const CanvasCharacter = require("../../functions/design/character.function.js")
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
        let [inventaire, equipement] = [[], []]
        
        if(user) id = user.value
        else id = interaction.member.user.id
        
        const playerCreationFunction = new PlayerCreationFunction()
        // const canvasCharacter = new CanvasCharacter()

        let data = await playerCreationFunction.getPlayerById(id.replace(/[<@!>]/gm, ""))
        data = data[0]

        if(Object.keys(data.inventaire).length != 0) 
        {
            for(const item of data.inventaire)
            { 
                let stat = []
                if(item.type == "arme" || item.type == "armure" || item.type == "accessoire") for(const [key, value] of Object.entries(item.statistique)) stat.push(`**${key}**: ${value}\n`)
                inventaire.push(`**nom:** ${item.nom}\n**id:** ${item.nomId}\n${stat.join("").replace(/[,]/gm,"")}\n`) 
            }
        }
        if(Object.values(data.equipement).some(value => value != undefined))
        {
            for(const [key, item] of Object.entries(data.equipement))
            {
                let stat = []
                if(item != undefined) 
                {
                    for(const [key, value] of Object.entries(item.statistique)) stat.push(`**${key}**: ${value}\n`)
                    equipement.push(`**nom:** ${item.nom}\n${stat.join("").replace(/[,]/gm,"")}\n`)
                }
            }
        }

        let embed = new MessageEmbed()
        .setColor("#5DADE2")
        .setTitle(`:bust_in_silhouette: ${data.prenom} ${data.nom}`)
        .addField(`:dna: race`, data.race)
        .addField(`:label: classe`, data.classe)
        .addField(`:beginner: level`, `${data.lvl}`)
        .addField(`:military_medal: experience`, `${data.xp}`)
        .addField(`:fleur_de_lis: attribut restant`, `${data.attribut[0]}`, true)
        .addField(`:heart: hp`, `${data.hp[0]}`, true)
        .addField(`:sparkles: magie`, `${data.magie[0]}`, true)
        .addField(`:crossed_swords: attaque`, `${data.attaque[0]}`, true)
        .addField(`:shield: armure`, `${data.armure[0]}`, true)
        .addField(`:diamond_shape_with_a_dot_inside:  protection`, `${data.protection[0]}`, true)
        .addField("●▬▬▬▬▬▬▬▬▬▬:gear: equipement :gear:▬▬▬▬▬▬▬▬▬▬●", `${equipement.length == 0 ? '-' : `${equipement.join("").replace(/[,]/gm,"")}`}`)
        .addField("●▬▬▬▬▬▬▬▬▬▬:tools: : inventaire :tools:▬▬▬▬▬▬▬▬▬▬●", `${inventaire.length == 0 ? '-' : `${inventaire.join("").replace(/[,]/gm,"")}`}`)
        .addField("●▬▬▬▬▬▬▬▬▬▬:coin:     argent     :coin:▬▬▬▬▬▬▬▬▬▬●", `:third_place: bronze : ${data.money[0]} \n:second_place: argent : ${data.money[1]} \n:first_place: or : ${data.money[2]}`)
        .setImage(data.image.replace(/["]/gm, ""))
        
        await interaction.reply({ ephermal: true, content: '** **' })
        await interaction.deleteReply()
        await interaction.channel.send({embeds: [embed]})


    }
}