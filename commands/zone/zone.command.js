const { MessageEmbed } = require("discord.js")

const PlayerCreationFunction = require("../../functions/character/creation.function.js")
const BestiaireController = require('../../controllers/bestiaire.controller.js')
const ZoneController = require('../../controllers/zone.controller.js')
const ZoneFunction = require('../../functions/interface/zone.function.js')
const LogCombatFunction = require("../../functions/gestion/logCombat.function.js")

module.exports = 
{
    name: 'zone',
    description: "commande à faire chaque fois que l'on arrive dans une nouvelle zone",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /zone ")
    },
    options:
    [
        {
            name: "zone",
            description: "zone du channel ou vous vous trouvez",
            type: "STRING",
            required: true,
        },
        {
            name: "participant",
            description: "ping le ou les joueur(s) présent dans le combat. Si plus d'un joueur séparé les pings par /",
            type: "STRING",
            required: true,
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        let participants = interaction.options.get("participant").value.replace(/[\s]/gm, "").split("/")
        const zone = interaction.options.get("zone").value

        let [encounterMob, totalParticipant, fullDescription]= [[], [], [], []]
        let diffLv
        let moyLvlPlayer = 0
        let boss = false
        let bossName = ""
        const author = interaction.member.user.id
        const combatId = Math.random().toString(16).slice(8)
        const date = new Date()
        const createdAt = ("00" + (date.getMonth() + 1)).slice(-2) + "/" + ("00" + date.getDate()).slice(-2) + "/" + date.getFullYear() + " " + ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2) + ":" + ("00" + date.getSeconds()).slice(-2);
        
        const bestiaireController = new BestiaireController()
        const zoneController = new ZoneController()
        const logCombatFunction = new LogCombatFunction()
        const zoneFunction = new ZoneFunction()
        const playerCreationFunction = new PlayerCreationFunction()

        participants.forEach(async participant => 
        { 
            const data = await playerCreationFunction.getPlayerById(participant.replace(/[<@!>]/g, ''))
            totalParticipant.push(`:x:${participant}\n`) 
            moyLvlPlayer += data[0].lvl
        })

        moyLvlPlayer = moyLvlPlayer / participants.length

        const possibleMob = await bestiaireController.getMonstreByZone(zone)
        if(possibleMob.length !=0)
        {
            const zoneData = await zoneController.getZoneByName(zone)
            const encounterMob = await zoneFunction.getEncounterMob(possibleMob, zoneData)

            for(const mob of encounterMob) 
            { 
                if(boss == false) 
                {
                    totalParticipant.push(`:x:${mob.nomId}\n`) 
                    fullDescription.push(`> *- ${mob.description}*\n`)
                }

                if(mob.nom == "kirishiga la dernière ombre") 
                {
                    message.channel.send({files:[{attachment: 'assets/sound/kirishiga.mp3', name: 'kirishiga.mp3'}]})
                    boss = true
                    bossName = mob.nom
                }
            }

            totalParticipant = totalParticipant.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)

            let embed = new MessageEmbed()
            .setAuthor({name : combatId})
            .setTitle(":crossed_swords: Début du combat")
            .setDescription(`${fullDescription.join().replace(/[,]/gm, "")}`)
            
            if(!boss) embed.addField(":scroll: Explication", "Chaque monstre possède une référence 1x ou 2x, le premier chiffre correspond à la 1ére ligne ou à la 2éme ligne dans le combat. Une fois le combat terminé faites *?Fin CombatId*")
            else if(bossName == "kirishiga la dernière ombre") embed.addField(":scroll: Explication", `Pas de chance, vous êtes tombez contre ${bossName}, si jamais c'est la première fois que vous l'affrontez et que vous mourrez contre lui il se contentera de vous laisser dans le coma sans vous achever en guise d'avertissement`)
            else if(boss) embed.addField(":scroll: Explication", "Il semblerait que le destin sois contre vous, le gardien de la zone n'est pas très content et va surement faire qu'une bouchée de vous !")
            
            embed.addField("Zone", zone, true)
            embed.addField("Tour", "1", true)
            embed.addField("Ordre du combat", totalParticipant.join(""))
            
            for(const mob of encounterMob)
            {
                embed.setImage(mob.image)
                diffLv = zoneData[0].lvl - mob.lvl
                embed.addField(`${mob.nomId}`, `${mob.hp[0] + (mob.hp[1] * diffLv)}`, true)
            }

            embed.addField("Status", "Que le combat commence, merci de respecter l'ordre du combat !")

            await interaction.reply({ ephermal: true, content: '** **' })
            interaction.channel.send({embeds: [embed]}).then(async result => 
            {
                await logCombatFunction.logCombatCreation(author, combatId, result.id, totalParticipant, createdAt, interaction.channel.name, zoneData[0].lvl, moyLvlPlayer)
            })
                     
        }else interaction.channel.send("La zone n'est pas valide !")

    }
}

