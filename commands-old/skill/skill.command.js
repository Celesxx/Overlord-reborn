if(message.content.toLowerCase().startsWith(préfix + "+skillcreation"))
{
    try 
    {

        const file = message.attachments.first()?.url
        if (!file) console.log('Il manque le fichier json');

        const response = Promise.resolve(fetch(file))
        response.then(async response =>
        {
            if (!response.ok) message.channel.send('Une erreur est survenue',response.statusText,)

            const text = await response.text()

            if (text) 
            {
                data = JSON.parse(text)
                const skillFunction = new SkillFunction()

                let embed = new Discord.MessageEmbed()
                .setColor("#00ff00")
                .setTitle("Création du skill dans la bdd")

                for(const [key, value] of Object.entries(data))
                {
                    const response = await skillFunction.skillCreation(value)
 
                    if(response.state == false) embed.addField("Status", `${response.message}`)
                    else embed.addField(`${response.skill.nom}`, `${response.log}` )     
                }

                message.delete()
                message.channel.send({embeds: [embed]})
            }
        })
    } catch (error) 
    {
        console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
    }
}
