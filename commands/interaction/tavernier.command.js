const { MessageEmbed } = require("discord.js")


module.exports = 
{
    name: 'tavernier',
    description: "Permet d'afficher le job tavernier",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser la commande /tavernier")
    },
    runSlash: async (client, interaction) => 
    {   

        let embed = new MessageEmbed()
        .setTitle("Tavernier")
        .setDescription("> _Le job tavernier permet de rencontrer du monde dans la taverne, prendre leurs commandes et surtout récolter des informations. Plus vous travailler dur plus vous gagnerez d'argent ! _")
        .addField("🔰 La gérante", "> _Comme chacun pourra le constater dès son entrée dans l'auberge, Aspasia sa gêrante est une automate, et aussi étrange que cela puisse paraître, elle travail seule. De part son design il est facilement devinable qu'il s'agit d'un très vieux modèles, bien souvent inexpressives, il arrive cependant souvent qu'elle soit prise d'excès de colères lorsque l'on parle mal de son auberge, et inversement, elle sera très joyeuse en recevant des compliment. Il n'est pas rare qu'elle engage des personnes pour l'aider, mais attention, elle est intransigeante et tiens à ce que tout soit parfait au delà de sa propre vie, possédant une culture surdéveloppé, il se raconte qu'elle aurait réponse à toutes les questions imaginable grâce à son vécue et à toutes les histoires qu'elle a entendue._")
        .addField("📜 description du poste", "votre boulot consiste à servir les clients principalement, de les écouter et de récolter des informations afin de pouvoir plus facilement répondre à leurs questions si jamais ils en ont. (Minimum 2 heures par jours dans la taverne)")
        .addField("💰 Salaire", "Vous gagnez 50% des gains pour chaques boisson vendue")
        .addField("💰 Encaisser l'argent", "**commande :** /vente-taverne")
        .setImage("https://media.discordapp.net/attachments/951928506021998652/971057011393441812/unknown.png")

        await interaction.reply({embeds: [embed]})

    }
}