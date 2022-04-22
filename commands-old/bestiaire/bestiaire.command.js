if(message.content.toLowerCase().startsWith(préfix + "+monstrecreation"))
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
                const bestiaireFunction = new BestiaireFunction()

                let embed = new Discord.MessageEmbed()
                .setColor("#00ff00")
                .setTitle("Création de monstre dans la bdd")

                for(const [key, value] of Object.entries(data))
                {
                    // console.log("key : ", key)
                    // console.log(value)
                    const response = await bestiaireFunction.monstreCreation(value)
 
                    if(response.state == false) embed.addField("Status", `${response.message}`)
                    else embed.addField(`${response.monstre.nom}`, `${response.log}` )
                           
                    
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
