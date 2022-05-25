const { MessageEmbed } = require("discord.js")

const PlayerCreationFunction = require("../../functions/character/creation.function.js")
const BestiaireController = require('../../controllers/bestiaire.controller.js')
const ZoneController = require('../../controllers/zone.controller.js')
const ZoneFunction = require('../../functions/interface/zone.function.js')
const LogCombatFunction = require("../../functions/gestion/logCombat.function.js")
const LogZone = require("../../functions/gestion/logZone.function")

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
            choices:
            [
                { name: "plaine", value: "plaine" },
                { name: "foret", value: "foret" },
                { name: "colline", value: "colline" },
                { name: "lac", value: "lac" },
                { name: "grotte", value: "grotte" },
                { name: "montagne", value: "montagne" },
                { name: "terre-arride", value: "terre-arride" },
                { name: "taverne", value: "taverne" },
                { name: "foret-magique", value: "foret-magique" },
                { name: "marécages", value: "marécages" },
                { name: "caserne-garde", value: "caserne-garde" },
            ]
        },
        {
            name: "participant-1",
            description: "ping le ou les joueur(s) présent dans le combat. Si plus d'un joueur séparé les pings par /",
            type: "MENTIONABLE",
            required: true,
        },
        {
            name: "participant-2",
            description: "ping le ou les joueur(s) présent dans le combat. Si plus d'un joueur séparé les pings par /",
            type: "MENTIONABLE",
            required: false,
        },
        {
            name: "participant-3",
            description: "ping le ou les joueur(s) présent dans le combat. Si plus d'un joueur séparé les pings par /",
            type: "MENTIONABLE",
            required: false,
        },
        {
            name: "participant-4",
            description: "ping le ou les joueur(s) présent dans le combat. Si plus d'un joueur séparé les pings par /",
            type: "MENTIONABLE",
            required: false,
        },
        {
            name: "participant-5",
            description: "ping le ou les joueur(s) présent dans le combat. Si plus d'un joueur séparé les pings par /",
            type: "MENTIONABLE",
            required: false,
        },
        {
            name: "participant-6",
            description: "ping le ou les joueur(s) présent dans le combat. Si plus d'un joueur séparé les pings par /",
            type: "MENTIONABLE",
            required: false,
        },
        {
            name: "participant-7",
            description: "ping le ou les joueur(s) présent dans le combat. Si plus d'un joueur séparé les pings par /",
            type: "MENTIONABLE",
            required: false,
        },
        {
            name: "participant-8",
            description: "ping le ou les joueur(s) présent dans le combat. Si plus d'un joueur séparé les pings par /",
            type: "MENTIONABLE",
            required: false,
        },
        {
            name: "participant-9",
            description: "ping le ou les joueur(s) présent dans le combat. Si plus d'un joueur séparé les pings par /",
            type: "MENTIONABLE",
            required: false,
        },
        {
            name: "participant-10",
            description: "ping le ou les joueur(s) présent dans le combat. Si plus d'un joueur séparé les pings par /",
            type: "MENTIONABLE",
            required: false,
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        let participants = []
        console.log("length : ", interaction.options._hoistedOptions.length)
        for(let i = 1; i < interaction.options._hoistedOptions.length; i++)
        {
            let participant = interaction.options.get(`participant-${i}`).value
            participants.push(`<@!${participant}>`)
        }
        console.log(participants)
        const zone = interaction.options.get("zone").value

        let [encounterMob, totalParticipant, fullDescription]= [[], [], [], []]
        let [moyLvlPlayer, moyZoneCombatTotal, boss, bossName] = [0, 0, false, ""]
        let diffLv

        const author = interaction.member.user.id
        const combatId = Math.random().toString(16).slice(8)
        const date = new Date()
        const createdAt = ("00" + (date.getMonth() + 1)).slice(-2) + "/" + ("00" + date.getDate()).slice(-2) + "/" + date.getFullYear() + " " + ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2) + ":" + ("00" + date.getSeconds()).slice(-2);
        const day = date.getDate()
        
        const bestiaireController = new BestiaireController()
        const zoneController = new ZoneController()
        const logCombatFunction = new LogCombatFunction()
        const zoneFunction = new ZoneFunction()
        const playerCreationFunction = new PlayerCreationFunction()
        const logZone = new LogZone()

        await interaction.reply({ ephermal: true, content: 'Chargement de la zone, merci de patienter quelques instants !' })

        if(!participants.map(participant => { if(isNaN(participant.replace(/[<@!>]/g, ''))) return false } ).includes(false)) 
        {
            for(const participant of participants)
            {
                const data = await playerCreationFunction.getPlayerById(participant.replace(/[<@!>]/g, ''))
                const logZoneResult = await logZone.logZoneAdd(participant.replace(/[<@!>]/g, ''), day, createdAt)

                moyZoneCombatTotal += logZoneResult.totalCombat
                moyLvlPlayer += data[0].lvl
                totalParticipant.push(`:x:${participant}\n`) 
            }
            
            moyLvlPlayer = moyLvlPlayer / participants.length
            moyZoneCombatTotal = Math.round(moyZoneCombatTotal / participants.length)
            const possibleMob = await bestiaireController.getMonstreByZone(zone)
            const zoneData = await zoneController.getZoneByName(zone)

            if(zoneData.length !=0)
            {
                if(possibleMob.length != 0) 
                {
                    encounterMob = await zoneFunction.getEncounterMob(possibleMob, zoneData, totalParticipant.length, moyZoneCombatTotal)

                    if(encounterMob.isGardien) zoneData[0].lvl += Math.round(moyLvlPlayer / 1.5)
                    if(encounterMob.mob.some(mob => mob.nom == "kirishiga la dernière ombre" || mob.nom == "Le roi des marécages")) boss = true

                    for(const mob of encounterMob.mob) 
                    { 
                        if(boss == false) 
                        {
                            totalParticipant.push(`:x:${mob.nomId}\n`) 
                            fullDescription.push(`> *- ${mob.description}*\n`)
                        
                        }else if(mob.nom == "kirishiga la dernière ombre" || mob.nom == "Le roi des marécages")
                        {
                            bossName = mob.nom
                            totalParticipant.push(`:x:${mob.nomId}\n`) 
                            fullDescription.push(`> *- ${mob.description}*\n`)
                            break
                        }
                    }
                }


                totalParticipant = totalParticipant.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)
                let embed = new MessageEmbed()
                .setAuthor({name : combatId})
                .setTitle(":crossed_swords: Début du combat")
                
                if(fullDescription.length != 0) embed.setDescription(`${fullDescription.join().replace(/[,]/gm, "")}`)
                else embed.setDescription("> _Un combat féroce vient de commencer que le meilleur gagne !_ ")
                if(!boss) embed.addField(":scroll: Explication", "Chaque monstre possède une référence 1x ou 2x, le premier chiffre correspond à la 1ére ligne ou à la 2éme ligne dans le combat. Une fois le combat terminé faites *?Fin CombatId*")
                else if(bossName == "kirishiga la dernière ombre" || bossName == "Le roi des marécages") embed.addField(":scroll: Explication", `Pas de chance, vous êtes tombez contre ${bossName}, si jamais c'est la première fois que vous l'affrontez et que vous mourrez contre lui il se contentera de vous laisser dans le coma sans vous achever en guise d'avertissement`)
                else if(boss) embed.addField(":scroll: Explication", "Il semblerait que le destin sois contre vous, le gardien de la zone n'est pas très content et va surement faire qu'une bouchée de vous !")
                
                embed.addField("Zone", zone, true)
                embed.addField("Tour", "1", true)
                embed.addField("Ordre du combat", totalParticipant.join(""))
                if(possibleMob.length != 0)
                {
                    for(const mob of encounterMob.mob)
                    {
                        if(boss && bossName == mob.nom)
                        {
                            embed.setImage(mob.image)
                            diffLv = zoneData[0].lvl - mob.lvl
                            if(diffLv >= -5 && diffLv <= 5) diffLv = 0
                            embed.addField(`${mob.nomId}`, `${mob.hp[0] + (mob.hp[1] * diffLv)}`, true)
                            break

                        }else if(!boss)
                        {
                            embed.setImage(mob.image)
                            diffLv = zoneData[0].lvl - mob.lvl
                            if(diffLv >= -5 && diffLv <= 5) diffLv = 0
                            embed.addField(`${mob.nomId}`, `${mob.hp[0] + (mob.hp[1] * diffLv)}`, true)
                        }
                    }
                }

                embed.addField("Status", "Que le combat commence, merci de respecter l'ordre du combat !")
                
                interaction.channel.send({embeds: [embed]}).then(async result => 
                {
                    if(boss)
                    {
                        if(bossName == "kirishiga la dernière ombre") interaction.channel.send({files:[{attachment: 'assets/sound/kirishiga.mp3', name: 'kirishiga.mp3'}]})
                        else if(bossName == "Le roi des marécages") interaction.channel.send({files:[{attachment: 'assets/sound/kingMarecage.mp3', name: 'kingMarecage.mp3'}]})
                    }
                    await logCombatFunction.logCombatCreation(author, combatId, result.id, totalParticipant, createdAt, interaction.channel.name, zoneData[0].lvl, moyLvlPlayer)
                })
                await interaction.deleteReply()
                        
            }else interaction.reply("La zone n'est pas valide !")
        }else interaction.reply(`Le participant ${participants.map(participant => { if(isNaN(participant.replace(/[<@!>]/g, ''))) return participant }).join("").replace(/[,]/gm, "")} n'est pas valide`)

    }
}

