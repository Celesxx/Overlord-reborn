const { MessageEmbed } = require("discord.js")
const PlayerCreationFunction = require("../../functions/character/creation.function")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = 
{
    name: 'addplayer',
    description: "Permet d'enregister un joueur dans la bdd",
    run: async (client, message, args) => 
    {
        message.channel.send("merci d'utiliser la commande /addplayer !")
    },
    options:
    [
        {
            name: "ping",
            description: "ping le joueur concerné",
            type: "STRING",
            required: true,
        },
        {
            name: "nom",
            description: "nom du personnage",
            type: "STRING",
            required: true,
        },
        {
            name: "prenom",
            description: "prénom du personnage",
            type: "STRING",
            required: true,
        },
        {
            name: "race",
            description: "race du personnage",
            type: "STRING",
            required: true,
            choices:
            [
                { name: "humain", value: "humain" },
                { name: "elf", value: "elf" },
                { name: "beastman", value: "beastman" },
                { name: "nymphe", value: "nymphe" },
                { name: "automate", value: "automate" },
                { name: "liche", value: "liche" },
                { name: "vampire", value: "vampire" },
                { name: "démon", value: "démon" },
            ]
        },
        {
            name: "classe",
            description: "classe du personnage",
            type: "STRING",
            required: true,
            choices:
            [
                { name: "combattant", value: "combattant" },
                { name: "mage", value: "mage" },
                { name: "voleur", value: "voleur" },
                { name: "ranger", value: "ranger" }
            ]
        },
        {
            name: "image",
            description: "url de l'image du personnage",
            type: "STRING",
            required: true,
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        if(interaction.member.roles.cache.some(role => role.name === 'Fondateur' || role.name === "Administrateur"))
        {
            let user = interaction.options.get("ping").value.replace(/[<@!>]/gm, "")
            let nom = interaction.options.get("nom").value
            let prenom = interaction.options.get("prenom").value
            let race = interaction.options.get("race").value
            let classe = interaction.options.get("classe").value
            let image = interaction.options.get("image").value

            const playerCreationFunction = new PlayerCreationFunction()
            let creation = await playerCreationFunction.playerCreation(user, nom, prenom, race, classe, image)
            
            let embed = new MessageEmbed()
            .setColor("#49b28b")
            .setTitle("Création du joueur dans la bdd ! ")
            
            if(creation.state == false) embed.addField("Status", `${creation.log}`)
            else embed.addField(`Status`, `${creation.message}`)

            interaction.reply({embeds: [embed]})
                
        }else return interaction.reply("Cette commande est réservée aux administrateurs")
    }
}