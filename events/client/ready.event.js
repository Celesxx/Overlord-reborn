module.exports = 
{
    name: 'ready',
    once: true,
    async execute(client){
        console.log(`Server status : bot is ready !`)

        const devGuild = await client.guilds.cache.get('939189314531758100')
        devGuild.commands.set(client.commands.map(cmd => cmd))
    }
}