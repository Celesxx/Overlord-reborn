require("dotenv").config();
const PlayerCreationFunction = require("../../functions/character/creation.function.js")
const ExperienceFunction = require("../../functions/character/level.function")

const prefix = process.env.PREFIX

module.exports = 
{
    name: 'messageCreate',
    once: false,
    async execute(client, message) 
    {
        if(message.author.bot) return;

        let rpServer = 
        [
            "939189315781656717", "939189315781656718", "939189315781656719", "939189315781656721", "939189315781656722", "939189315781656723", "939189315781656724", "939189315781656724",
            "939189316192702565", "945974040630284288", "958786131678330880", "939189317610393707", "946054690553098340", "949447630444974141", "939189317610393706", "946054857503170580", 
            "949447694991118337", "939189317610393709", "945766632335237150", "945766954302570518", "945768047237533777", "945767470533337128", "945775381175238696",
            "949446480278732860", "949710374775693322", "945772877305741372", "945973619044012043", "945775469356273714", "945973530296717362", "946055135799427102", "946055337507700756",
            "945973584289992747", "940254750866309140", "945784495053869129", "945974006153084968", "945974437772152842", "945973555764555777", "939189317610393705", "945973470464974868", 
            "945974495640956988", "945774211887136808", "946055013371871233", "945974102143938561", "945974848226730014", "945970683480002601", "945974826013687828", "945775348656783390", 
            "945974568395358218", "945774986000486450", "945974585587793971", "945974077825380352", "945775181631209522", "945973634751668244", "945973572625661992", "940252629840314388",
            "945973484251668480", "939189317610393706", "945974119374139412", "945974019709087785", "945775505850921010", "945772961934221322", "945974513458372608"
        ]
        
        if
        (
            process.env.MODE == "prod" && message.content.length >= 0 && rpServer.includes(message.channel.id)
            /*||
            message.channel.id == "955068685146529874" && message.member.roles.cache.some(role => role.name === 'Fondateur') */
        )
        {
            if(message.content.length >= 200)
            {
                let id = message.author.id
                const playerCreationFunction = new PlayerCreationFunction()
                const experienceFunction = new ExperienceFunction()
        
                let stat = await playerCreationFunction.getPlayerById(id.replace(/[<@>]/gm,""))
        
                stat = stat[0]
                let rankBefore = await experienceFunction.getRankPlayer(stat.id)

                console.log("Server status : xp before " + stat.xp)
                stat.xp = Math.round(5 + stat.xp + (message.content.length * 0.001 * (stat.lvl - (stat.lvl / 2)) * Math.exp(stat.lvl / 250)))
                console.log("Server status : xp after " + stat.xp)
        
                await playerCreationFunction.editPlayerById(stat.id, stat)
                await experienceFunction.verifLvlUp(stat.id, client, message, rankBefore, stat)
            }
        }
        
        if(!message.content.startsWith(prefix)) return

        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const commandName = args.shift().toLowerCase()
        if(commandName.length == 0) return

        let command = client.commands.get(commandName)
        
        if(command)
        {
            console.log(`Server status : ${message.author.id} à utilisé la commande => ${message.content}`)
            command.run(client, message, args)
        }
    }
}