module.exports = 
{
    name: 'test',
    description: 'commande de test',
    run: (client, message, args) => {
        message.channel.send("validé !")
    },
    runSlash: (client, interaction) => 
    {
        interaction.reply("validé !")
    }
}