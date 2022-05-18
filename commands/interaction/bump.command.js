const { MessageEmbed } = require("discord.js")
const LogBump = require("../../controllers/logBump.controller.js")
const PlayerCreationFunction = require("../../functions/character/creation.function.js")

module.exports = 
{
    name: 'bump-recompense',
    description: "Permet d'obtenir la récompense du bump",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser la commande /bump-recompense")
    },
    runSlash: async (client, interaction) => 
    {   

        let id = interaction.member.user.id
        let [log, gainxp, gainMoney] = []
        const bumpRole = ['〖🔰〗Bumpeur novice', '〖💠〗Bumpeur', '〖⚜️〗Seigneur bumpeur', '〖👑〗Roi bumpeur', '〖🔱〗Dieu bumpeur']

        const playerCreationFunction = new PlayerCreationFunction()
        const logBump = new LogBump()
        const date = new Date()

        const createdAt = ("00" + (date.getMonth() + 1)).slice(-2) + "/" + ("00" + date.getDate()).slice(-2) + "/" + date.getFullYear() + " " + ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2) + ":" + ("00" + date.getSeconds()).slice(-2);
        let stat = await playerCreationFunction.getPlayerById(id.replace(/[<@>]/gm,""))
        stat = stat[0]

        if(!interaction.member.roles.cache.some(role => bumpRole.includes(role.name)))
        {
            let result = await logBump.createLogBump({userId: id})
            let roleAdd = interaction.member.guild.roles.cache.find(role => role.name === bumpRole[0])                

            if(result.state) 
            {
                log = result.logBump
                await interaction.member.roles.add(roleAdd)
            }
            else console.log(`Server status : ${result.log}`)
        
        }else
        {
            let result = await logBump.getLogBumpById(id)
            log = result
        }

        log.bump += 1
        if(interaction.member.roles.cache.some(role => role.name === '〖🔰〗Bumpeur novice')) 
        {
            gainxp = 5
            gainMoney = 2
            stat.money[0] += 2
            stat.xp += 5
            log.money += 2
            log.xp += 5
            if(log.bump > 10) 
            {
                log.role = bumpRole[1]
                let roleAdd = interaction.member.guild.roles.cache.find(role => role.name === bumpRole[1])
                let roleDel = interaction.member.guild.roles.cache.find(role => role.name === bumpRole[0])
                await interaction.member.roles.remove(roleDel)
                await interaction.member.roles.add(roleAdd)
            } 
        }
        else if(interaction.member.roles.cache.some(role => role.name === '〖💠〗Bumpeur')) 
        {
            gainxp = 10
            gainMoney = 3
            stat.money[0] += 3
            stat.xp += 10
            log.money += 3
            log.xp += 10
            if(log.bump > 60) 
            {
                log.role = bumpRole[2]
                let roleAdd = interaction.member.guild.roles.cache.find(role => role.name === bumpRole[2])
                let roleDel = interaction.member.guild.roles.cache.find(role => role.name === bumpRole[1])
                await interaction.member.roles.remove(roleDel)
                await interaction.member.roles.add(roleAdd)
            } 
        }
        else if(interaction.member.roles.cache.some(role => role.name === '〖⚜️〗Seigneur bumpeur')) 
        {
            gainxp = 20
            gainMoney = 4
            stat.money[0] += 4
            stat.xp += 20
            log.money += 4
            log.xp += 20
            if(log.bump > 160) 
            {
                log.role = bumpRole[3]
                let roleAdd = interaction.member.guild.roles.cache.find(role => role.name === bumpRole[3])
                let roleDel = interaction.member.guild.roles.cache.find(role => role.name === bumpRole[2])
                await interaction.member.roles.remove(roleDel)
                await interaction.member.roles.add(roleAdd)
            } 
        }
        else if(interaction.member.roles.cache.some(role => role.name === '〖👑〗Roi bumpeur')) 
        {
            gainxp = 25
            gainMoney = 5
            stat.money[0] += 5
            stat.xp += 25
            log.money += 5
            log.xp += 25
            if(log.bump > 300) 
            {
                log.role = bumpRole[4]
                let roleAdd = interaction.member.guild.roles.cache.find(role => role.name === bumpRole[4])
                let roleDel = interaction.member.guild.roles.cache.find(role => role.name === bumpRole[3])
                await interaction.member.roles.remove(roleDel)
                await interaction.member.roles.add(roleAdd)
            } 
        }
        else if(interaction.member.roles.cache.some(role => role.name === '〖🔱〗Dieu bumpeur'))
        {
            gainxp = 30
            gainMoney = 6
            stat.money[0] += 6
            stat.xp += 30
            log.money += 6
            log.xp += 30
        }

        log.date.push(createdAt)

        let embed = new MessageEmbed()
        .setTitle("Récompense")
        .setColor("#00FF00")
        .setDescription(`Merci pour le bump ! voici votre récompense : ${gainxp}xp et ${gainMoney} bronze`)
        .setThumbnail("https://cdn.discordapp.com/attachments/951928506021998652/972884592082157668/fb1cea4c64a93ca4d547666d40216956.gif")

        await logBump.editLogBumpByUserId(id, log)
        await playerCreationFunction.editPlayerById(stat.id, stat)

        interaction.reply({embeds : [embed]})
    }
}