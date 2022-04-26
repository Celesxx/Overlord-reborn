const { MessageEmbed } = require("discord.js")
const LogCombatFunction = require("../../functions/gestion/logCombat.function.js")

module.exports = 
{
    name: 'règle',
    description: "Afficher les différentes règles du serveur",
    run: (client, message, args) => 
    {
        message.channel.send("merci d'utiliser le préfix /règle")
    },
    options:
    [
        {
            name: "type",
            description: "afficher les règles rp ou global ?",
            type: "STRING",
            required: true,
            choices:
            [
                {
                    name: "rp",
                    value: "rp"
                },
                {
                    name: "global",
                    value: "global"
                }
            ]
        }
    ],
    runSlash: async (client, interaction) => 
    {   
        let type = interaction.options.get("type").value

        const rulesHrp = 
        [
            "Le spam est interdit ainsi que l'écriture en majuscule de façon abusif",

            "Vous devez parler dans le respect et rester courtois envers les autres",

            "N'hésitez pas à contacter le staff si vous avez la moindre question, cependant vérifier avant que la réponse n'ait pas été déjà posée !",

            "Vous avez le droit de poster une image dans le général, cependant cela doit rester occasionnel, il existe un channel média pour cela",

            "Si vous êtes nouveau, il est important de regarder les messages épinglés dans les salons et de lire parfois les annonces, nous ne mettons pas toujours à jour le règlement !",

            "Si vous trouvez que le staff n'est pas compétent, alors dites nous pourquoi tout en restant courtois",

            "Le NSFW est interdit sur le serveur",

            "Le lundi et le dimanche, le fondateur s'autorise à ignorer toutes questions.",
        ] 


        const rulesRp = 
        [
            "Merci de faire attention au fautes d'orthographe, nous ne demandons pas de faire aucune faute juste de faire attention !",

            "Essayé de détailler le plus possible vos message rp afin d'aider au maximum vos interlocuteurs dans leurs réponses",
            
            "Tout ce qui se passe inRP, reste inRP. N'allez pas insulter quelqu'un en HRP car il ne vous aime pas inRP. Cependant cela ne doit pas être abusif non plus, surtout si vous ne connaissez pas la personne !",
            
            "Le HRP, le MetaRP, no FearRP, le pain RP sont interdits ainsi que tout ce qui est en rapport",
            
            "Merci d'éviter les personnages de type DarkSasuke",
            
            "Il est STRICTEMENT interdit de tuer un personnage ou de faire toutes actions qui à pour conséquence la mort définitive, dans le pire des cas il tombe en état critique et/ou au bord de la mort. Vous devez attendre l'accord d'un staff avant de pouvoir vraiment l'achever. Seul un staff peut valider une mort",
                        
            "Le RPQ est interdit",
            
            "N'essayez pas de vous give de l'XP en cachette ou d'abuser de bugs du système, nous avons des logs",
                                                                        
            "Ne pas utiliser tupperbox pour des commandes de combat ! ",
            
            "Si vous mourrez avant le lvl 6 que cela soit en groupe ou en solo vous tombez dans le coma pendant 2 heures, cependant si vous tombez dans le coma 3 dans les dernières 12 heures, votre mort sera définitif "
            
        ]

        let i = 0
        let embed = new MessageEmbed()
        
        if(type == "global")
        {
            embed.setTitle("Règle du serveur")
            embed.setDescription("Voici les règles du serveur, merci de les lire très attentivement car tout manquement à ses règles entrainera des conséquences !")
            embed.addField("╔═══════◥◣◆◢◤═════════╗\n\t\t\t\t\t\t\tRègles HRP\n╚═══════◥◣◆◢◤═════════╝", "Les règles hrp sont des qui concerne en général le moment ou vous n'êtes pas en rp")
            for(const ruleHrp of rulesHrp) 
            {
                embed.addField(`📜 Règle #${i}`, ruleHrp)
                i++
            }
        }else if(type == "rp")
        {
            embed.addField("╔═══════◥◣◆◢◤═════════╗\n\t\t\t\t\t\t\tRègles RP\n╚═══════◥◣◆◢◤═════════╝", "Les règles rp sont des qui concerne le moment ou vous êtes en rp")
            for(const ruleRp of rulesRp) 
            {
                embed.addField(`📜 Règle #${i}`, ruleRp)
                i++
            }
        }       

        await interaction.reply({embeds: [embed]})
    }
}