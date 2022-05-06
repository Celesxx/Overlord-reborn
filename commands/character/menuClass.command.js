const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")
const bddClass = require("../../bdd/classe.json")

module.exports = 
{
    name: 'classe',
    description: "Permet d'afficher les informations des classes'",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /classe")
    },
    options:
    [
        {
            name: "combattant",
            description: "toutes les classes de combattant et évolution",
            type: "STRING",
            required: false,
            choices:
            [
                { name: "combattant", value: "combattant" },
                { name: "paladin", value: "paladin" },
                { name: "chevalier", value: "chevalier" },
                // { name: "gardien", value: "gardien" },
                // { name: "clerc", value: "clerc" },
                // { name: "berserker", value: "berserker" },
                // { name: "duelliste", value: "duelliste" },
            ]
        },
        {
            name: "mage",
            description: "toutes les classes de mage et évolution",
            type: "STRING",
            required: false,
            choices:
            [
                { name: "mage", value: "mage" },
                { name: "invocateur", value: "invocateur" },
                { name: "sorcier", value: "sorcier" },
                // { name: "nécromancien", value: "necromancien" },
                // { name: "grand invocateur", value: "grand-invocateur" },
                // { name: "archimage", value: "archimage" },
                // { name: "druide", value: "druide" },
            ]
        },
        {
            name: "voleur",
            description: "toutes les classes de voleur et évolution",
            type: "STRING",
            required: false,
            choices:
            [
                { name: "voleur", value: "voleur" },
                { name: "assassin", value: "assassin" },
                { name: "rodeur", value: "rodeur" },
                // { name: "espion", value: "espion" },
                // { name: "ombre", value: "ombre" },
                // { name: "ninja", value: "ninja" },
                // { name: "prédateur", value: "predateur" }
            ]
        },
        {
            name: "ranger",
            description: "toutes les classes ranger et évolution",
            type: "STRING",
            required: false,
            choices:
            [
                { name: "ranger", value: "ranger" },
                { name: "archer", value: "archer" },
                { name: "bombardier", value: "bombardier" },
                // { name: "artilleur", value: "artilleur" },
                // { name: "gunner", value: "gunner" },
                // { name: "chasseur", value: "chasseur" },
                // { name: "archer d'elite", value: "archer-elite" },
            ]
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        if(!interaction.options._hoistedOptions.length == 0)
        { 
            let type =
            (interaction.options.get("combattant") != undefined) ? interaction.options.get("combattant").value : 
            (interaction.options.get("mage") != undefined) ? interaction.options.get("mage").value : 
            (interaction.options.get("voleur") != undefined) ? interaction.options.get("voleur").value : 
            interaction.options.get("ranger").value


            let allClass = []
            let color = ""
            if(interaction.options.get("combattant") != undefined && interaction.options.get("combattant").name == "combattant") 
            {
                color = "#374c99"
                allClass = [{ name: "combattant", value: "combattant" }, { name: "paladin", value: "paladin" },{ name: "chevalier", value: "chevalier" } /*,{ name: "gardien", value: "gardien" },{ name: "clerc", value: "clerc" },{ name: "berserker", value: "berserker" }, { name: "duelliste", value: "duelliste" }*/]
            
            }else if(interaction.options.get("mage")!= undefined && interaction.options.get("mage").name == "mage") 
            {
                color = "#8701a4"
                allClass = [{ name: "mage", value: "mage" },{ name: "invocateur", value: "invocateur" },{ name: "sorcier", value: "sorcier" } /*, { name: "nécromancien", value: "necromancien" }, { name: "archimage", value: "archimage" },{ name: "druide", value: "druide" }*/]
            
            }else if(interaction.options.get("voleur") != undefined && interaction.options.get("voleur").name == "voleur") 
            {
                color = "#2d2d2d"
                allClass = [{ name: "voleur", value: "voleur" }, { name: "assassin", value: "assassin" },{ name: "rodeur", value: "rodeur" } /* ,{ name: "espion", value: "espion" },{ name: "ombre", value: "ombre" },{ name: "ninja", value: "ninja" }, { name: "prédateur", value: "predateur" }*/]
            
            }else if(interaction.options.get("ranger") != undefined && interaction.options.get("ranger").name == "ranger")  
            {
                color = "#057e00"
                allClass = [{ name: "ranger", value: "ranger" }, { name: "archer", value: "archer" }, { name: "bombardier", value: "bombardier" }/*, { name: "traqueur", value: "traqueur" },  { name: "trapeur", value: "trapeur" }, { name: "maitre archer", value: "maitre-archer" }, { name: "bombardier", value: "bombardier" }*/ ]
            }


            const classe = bddClass[type]
            const select = new MessageActionRow()
            let selectMenu = new MessageSelectMenu()
            .setCustomId('select-classe')
            .setPlaceholder('Afficher une autre classe')

            allClass.forEach(element => { selectMenu.addOptions({label: element.name, value: element.value}) })

            var embed = new MessageEmbed()
            .setColor(color)
            .setTitle(`__${classe.nom}__`)
            .setDescription(`_${classe.description}_`)
            .setImage(classe.image)
            .addField("Gain par niveau", `❤️ ${classe.statistiques.hp} | ✨ ${classe.statistiques.mana} | ⚔️ ${classe.statistiques.attaque} |🛡️ ${classe.statistiques.armure} | 💠 ${classe.statistiques.armure}`)
            .addField("Compétences", "ci-dessous vous allez trouvé les différentes aptitudes et compétences que vous allez débloquer au fur et a mesure de votre level")

            classe.level.forEach(element => 
            {
                let gainAll = []
                if(element.passif.length != 0) element.passif.forEach(gain => gainAll.push( `**Nom : **${gain.nom}\n**Description: **${gain.description}\n`))
                else if(element.skill.length != 0)element.skill.forEach(gain => gainAll.push( `**Nom : **${gain.nom}\n**Description: **${gain.description}\n`))
                
                embed.addField(`🔰level : ${element.lvl}`, `${gainAll.join("").replace(/[,]/gm, "")}`)  
            })


            select.addComponents(selectMenu)
                
            await interaction.reply({ ephermal: true, content: '** **' })
            await interaction.deleteReply()
            await interaction.channel.send({embeds: [embed], components: [select]})
        
        }else await interaction.reply({content: 'Vous devez choisir une classe !' })
        
    }
}