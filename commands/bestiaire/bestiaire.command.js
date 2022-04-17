if(message.content.toLowerCase().startsWith(préfix + "monstrecreation"))
{
    const bestiaireFunction = new BestiaireFunction()
    const result = Promise.resolve(bestiaireFunction.monstreCreation(message.content))
    result.then((response) => 
    {
        let embed = new Discord.MessageEmbed()
        .setColor("#49b28b")
        .setTitle("Création de monstre dans la bdd")
        response.forEach( data =>
        {
            if(data.state == false)
            {
                embed.addField("Status", `${data.message}`)
            }else embed.addField(`${data.monstre.nom}`, `${data.log}` )
            
            
        })
        message.channel.send(embed)
        
    })
}
