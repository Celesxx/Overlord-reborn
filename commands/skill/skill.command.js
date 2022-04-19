if(message.content.toLowerCase().startsWith(préfix + "skillcreation"))
{
    const skillFunction = new SkillFunction()
    const result = Promise.resolve(skillFunction.skillCreation(message.content))
    result.then((response) => 
    {
        let embed = new Discord.MessageEmbed()
        .setColor("#49b28b")
        .setTitle("Création du skill dans la bdd")
        
        response.forEach( data =>
        {
            if(data.state == false)
            {
                embed.addField("raison", `${data.log}`)
            }else embed.addField(`${data.skill.nom}`, `${data.state}`)
        })
        message.channel.send({embeds : [embed]})
        
    })
}
