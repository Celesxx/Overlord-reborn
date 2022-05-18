require("dotenv").config();

module.exports = 
{
    name: 'ready',
    once: true,
    async execute(client){
        
        const devGuild = await client.guilds.cache.get(process.env.GUILD_ID);
        let fetch = await devGuild.commands.fetch()
        let commands = client.commands.map(cmd => cmd)
        await devGuild.commands.set(client.commands.map(cmd => cmd))
        // for(const [key, value] of fetch)
        // {
        //     for(const command of commands) 
        //     {
        //         if(command.name == value.name) 
        //         {
        //             await devGuild.commands.edit(key, command)
        //             break
        //         }
        //     }
        //     console.log(`Server status : commande ${value.name} with id ${key} was updated`)
        // }

        console.log(`Server status : bot is ready !`)
    }
}