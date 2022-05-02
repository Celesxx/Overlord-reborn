module.exports = 
{
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction){
        if(interaction.isCommand())
        {
            const cmd = client.commands.get(interaction.commandName)
            if(!cmd) return interaction.reply("Cette commande n'existe pas")

            console.log(`Server status : ${interaction.member.user.username} à utilisé la commande => ${interaction.commandName} ${interaction.options._hoistedOptions.map(option => { return option.value }).join(" ").replace(",", "")} `)
            cmd.runSlash(client, interaction)
        
        } else if(interaction.isButton())
        {
            const btn = client.buttons.get(interaction.customId)
            if(!btn) return interaction.reply("Ce bouton n'existe pas")
            btn.runSlash(client, interaction)

        } else if(interaction.isSelectMenu())
        {
            const btn = client.selects.get(interaction.customId)
            if(!btn) return interaction.reply("Ce select n'existe pas")
            btn.runSlash(client, interaction)
        }
    }
}