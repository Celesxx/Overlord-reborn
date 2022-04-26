const { MessageEmbed } = require("discord.js")

module.exports = 
{
    name: 'test',
    description: 'commande de test',
    run: (client, message, args) => {
        message.channel.send("validé !")
    },
    runSlash: async (client, interaction) => 
    {
        const races = 
        [
            {
                name: "●▬▬▬▬▬▬▬▬▬:skull: Liche :skull:▬▬▬▬▬▬▬▬▬●", 
                description: "**『Description』:** `blablabla description de la race` \n**『Bonus』:** `(les bonus de stat)` \n**『Attribut spécial』:** `j'ai pas encore réfléchit au particularité des races`",
                image: "https://i.pinimg.com/originals/5f/38/bf/5f38bf0b6aa88089a93170710d89b036.jpg"
            },

            {
                name: "●▬▬▬▬▬▬▬▬▬:vampire: Vampire :vampire:▬▬▬▬▬▬▬▬▬●", 
                description: "**『Description』:** `blablabla description de la race` \n**『Bonus』:** `(les bonus de stat)` \n**『Attribut spécial』:** `j'ai pas encore réfléchit au particularité des races`",
                image: "https://64.media.tumblr.com/ec2088f9983bf69593052a508681d0ca/tumblr_inline_nbar98iL2v1sl9avf.jpg"
            },
            {
                name: "●▬▬▬▬▬▬▬▬▬:person_bowing: Nain :person_bowing:▬▬▬▬▬▬▬▬▬●", 
                description: "**『Description』:** `blablabla description de la race` \n**『Bonus』:** `(les bonus de stat)` \n**『Attribut spécial』:** `j'ai pas encore réfléchit au particularité des races`",
                image: "http://i.imgur.com/DtYcfmJ.jpg"
            },

            {
                name: "●▬▬▬▬▬▬▬▬▬:elf: Elf :elf:▬▬▬▬▬▬▬▬▬●", 
                description: "**『Description』:** `blablabla description de la race` \n**『Bonus』:** `(les bonus de stat)` \n**『Attribut spécial』:** `j'ai pas encore réfléchit au particularité des races`",
                image: "https://i.ytimg.com/vi/YjdaupeXXIo/maxresdefault.jpg"
            },

            {
                name: "●▬▬▬▬▬▬▬▬▬:elf: Elf :elf:▬▬▬▬▬▬▬▬▬●", 
                description: "**『Description』:** `blablabla description de la race` \n**『Bonus』:** `(les bonus de stat)` \n**『Attribut spécial』:** `j'ai pas encore réfléchit au particularité des races`",
                image: "https://i.ytimg.com/vi/YjdaupeXXIo/maxresdefault.jpg"
            },

            {
                name: "●▬▬▬▬▬▬▬▬▬:elf: Elf :elf:▬▬▬▬▬▬▬▬▬●", 
                description: "**『Description』:** `blablabla description de la race` \n**『Bonus』:** `(les bonus de stat)` \n**『Attribut spécial』:** `j'ai pas encore réfléchit au particularité des races`",
                image: "https://i.ytimg.com/vi/YjdaupeXXIo/maxresdefault.jpg"
            },
        ]

         
        let embeds = []
        
        let embed = new MessageEmbed().setURL('https://race.com')
        .setColor("#5DADE2")
        .setTitle("Race existante")
        .setDescription("vous avez le choix d'une race blabla chacune avec des particularité blabla")

        for(const race of races) 
        {
            
            embed.addField(`${race.name}`, `${race.description}`)
            let embedImage = new MessageEmbed().setURL('https://race.com')
            .setImage(race.image)
            embeds.push(embed,embedImage)
        }

        await interaction.channel.send({embeds: embeds})
        await interaction.reply({ ephermal: true, content: '** **' })
        await interaction.deleteReply()
    }
}