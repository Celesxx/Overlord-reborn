const { MessageEmbed } = require("discord.js")


module.exports = 
{
    name: 'garde',
    description: "Permet d'afficher le job de garde",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser la commande /garde")
    },
    runSlash: async (client, interaction) => 
    {   

        let embed = new MessageEmbed()
        .setTitle("Garde du royaume")
        .setDescription("> _La garde est le bras armé du royaume, c'est lui qui fait office de police au sein du royaume et assure la sécurité au sein de la ville. Leurs missions peuvent être diverse et peuvent parfois les amener hors du royaume_")
        .addField("📜 description du poste", "Travailler dans la garde c'est faire passer la vie des citoyens au-dessus de la sienne et surtout savoir obéir aux ordres sans poser de question ! Si vous êtes motivé aller au poste de garde et demander à passer les entretiens, car oui il y aura des examens !")
        .addField("🔰 Capitaine", "**Description:** Vous êtes le capitaine de la garde et c'est vous qui avez toute autorité pour gérer toutes les forces impériales du royaume, vous ne recevez vos ordres que de votre roi\n**Salaire:** 2 pièce d'argent et 10% d'experience par jour")
        .addField("🔰 Lieutenant", "**Description:** Vous êtes un des lieutenant de la garde, vous avez à votre disposition plusieurs escouades \n**Salaire:** 1 pièce d'argent, 50 bronze et 8% d'experience par jour")
        .addField("🔰 Sergent", "**Description:** Vous êtes un sergent de la garde, vous avez à votre disposition une escouade d'une dizaine de garde \n**Salaire:** 1 pièce d'argent et 5% d'experience par jour ")
        .addField("🔰 Garde", "**Description:** Vous êtes un garde du royaume intégré dans une escouade supervisé par un sergent  \n**Salaire:** 50 bronze et 3% d'experience par jour ")
        .addField("🔰 Rookie", "**Description:** Vous êtes un rookie venant tout juste d'intégrer la garde, vous devez faire vos preuves !\n**Salaire:** 10 bronze et 1% d'experience par jour")
        .addField("💰 Encaisser son salaire", "**commande :** /salaire-garde")
        .setImage("https://cdn.discordapp.com/attachments/951928506021998652/980677325177892874/fu6fe7r20o471.jpg")

        await interaction.reply({embeds: [embed]})

    }
}