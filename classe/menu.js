if(message.content.toLowerCase() === préfix + "help"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#5DADE2")
    .setTitle("**●▬▬▬▬▬▬▬▬:books: Sommaire ▬▬▬▬▬▬▬▬●**")
    //.addField("__:robot: La commande : ?Bot__","Les explications concernant l'utilité du bot et à quoi il sert. C'est simple comme bonjour.")
    .addField("__:blue_book: La commande : ?Contexte__","Le contexte du serveur. Rapide, simple, efficace.")
    .addField("__:robot: La commande : ?Bot__", "Explication du bot en quelques phrases.")
    .addField("__:speaking_head: La commande : ?Guide__", "C'est recommendé si vous désirez nous rejoindre au RP...D'ailleurs, n'hésitez pas à soliciter le staff si vous avez besoin d'aide. La commande vous explique étape par étape comment créer sa fiche.")
    .addField("__:bust_in_silhouette: La commande : ?Race__","Liste des races jouables.")
    .addField("__:crossed_swords: La commande : ?Classe__", "Liste des classes jouables.")
    .addField("__:scroll: La commande : ?Commande RP__", "Voir la liste des commandes inRP (le shop, vendre un item, etc)")
    .addField("__:chart_with_upwards_trend: La commande : ?Level__", "Comment on gagne des niveaux, comment on évolue, etc. Bref, comment fonctionne le PVE")
   
    .setImage("https://media.discordapp.net/attachments/937004556548706314/937004870827909140/unknown.png")
     message.channel.send({embeds: [help_embed]});
}

if(message.content.toLowerCase() === préfix + "commande rp"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#5DADE2")
    .setTitle("**●▬▬▬▬▬▬▬▬▬▬:scroll: Commande RP ▬▬▬▬▬▬▬▬▬▬●**")
    .addField("__:shopping_bags: Shop RP__", "``?Shop``\nMerci de faire vos achats uniquement lorsque votre personnage est dans un channel adapté (zone commercial par exemple).")
    .addField("__:house: Immobilier RP__", "``?Immobilier``\nBien que vous pouvez faire la commande dans le channel ''bot''(par exemple), inRP, seul une personne qui a le métier adapté, pourra vous faire prendre connaissance de la possibilité d'achat d'un bien (il ne peut mentir sur les prix)")
    .addField("__:money_with_wings: Vendre un item__", "``?Vendre [nom de votre item avec l'émoji au début]``\nMerci de faire la vente de l'item dans un channel adapté.")
    .addField("__:tools: Liste des métiers RP__", "``?Metier``\nPour avoir un métier.")
    .addField("__:moneybag: Donner de l'argent__", "``?Give [@Joueur] [quantitée de bronze] [quantitée d'argent] [quantitée d'or]``\nVous devez faire cette commande inRP en face à face de la personne à qui vous donner de l'argent.")
    message.channel.send({embeds: [help_embed]});
}

if(message.content.toLowerCase() === préfix + "metier"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#5DADE2")
    .setTitle("**●▬▬▬▬▬▬▬▬▬▬:tools: Métier ▬▬▬▬▬▬▬▬▬▬●**")
    .addField("__:crown: Liste des métiers__", "1-?Garde du royaume\n2-?Garde de la forêt magique\n3-?Garde terre aride\n4-?Guilde aventurier\n5-?Aubergiste\n6-?Agent immobilier magique\n7-SOON")
    .addField("__:scroll: Note__", "1-À la base, des métiers tell que ''bucheron'' ou 'pêcheur'' aurait dû être rajouté. Mais pour des raisons éconnomiques il a été décidé que les métiers serait juste un ''plus'' qui ne serait pas forcément un gros gain économique...Mais plus quelque chose qui permettrait de faire un peu plus de RP passif.\n2- Pour avoir un métier, cela se déroule inRP et il suffit juste de demander dans le channel question.\n3-Pour ce qui est des gardes ou de la guilde d'aventurier...Le bot ne stock pas votre progression, mais bien le staff via une petite grille d'excel. Le fondateur a considéré que pour le moment, c'était un ajout bien trop énergivore et qu'il y avait d'autres priorités...Néanmoins lorsque le serveur sera achevé à 100%, cet ajout pourra être effectué.")
    message.channel.send({embeds: [help_embed]});
}

if(message.content.toLowerCase() === préfix + "garde du royaume"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#5DADE2")
    .setTitle("**●▬▬▬▬▬▬▬:crossed_swords: Garde du royaume ▬▬▬▬▬▬▬●**")
    .addField("__:scroll: Description__", "La garde du royaume est exclusivement composé d'humain (possibilité de s'infiltrer dans la garde humaine). Elle a pour but de protéger ses congénères mais également de capturer les autres éspèces.")
    .addField("__:beginner: Hiérarchie__", "``1-Chef de la garde :`` Vous êtes un haut gradé de la garde du royaume. Vous pouvez donner des ordres aux autres gardes/décider du sort des prisonniers.\n``2-Sergent :`` Vous avez le droit de parler aux prisonniers sans en demander la permission.\n``3-Garde :`` Vous êtes un garde lambda\n``4-Recrue garde :`` Vous êtes en formation. C'est là où vous allez devoir faire beaucoup de rapports...")
    .addField("__:moneybag: Salaire__", "Fonctionnement par prime selon les actions et les rapports (par exemple, capturer une autre espèces/protéger un congénère)")
    .setImage("https://images6.alphacoders.com/405/thumb-1920-405091.jpg")
    message.channel.send({embeds: [help_embed]});
}

if(message.content.toLowerCase() === préfix + "garde de la forêt"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#5DADE2")
    .setTitle("**●▬▬▬▬▬:crossed_swords: Garde de la forêt ▬▬▬▬▬●**")
    .addField("__:scroll: Description__", "La garde de la forêt est une garde composée d'être vivant en lien avec la nature(elf, nymphe, lamia, beastman, etc). Elle a pour but de protéger ses congénères...Bien qu'elle regarde du mauvais oeil les autres espèces (humain, démon), elle évitera au plus possible les conflits. Les membres de cette garde sont également chargés de la protection de l'auberge inter-espèce.")
    .addField("__:beginner: Hiérarchie__", "``1-Chef de la garde forêstière :`` Vous êtes un haut gradé. Vous pouvez donner des ordres aux autres gardes.\n``2-Sergent :`` Vous êtes un haut gradé inférieur au chef de la garde.\n``3-Garde forêstier :`` Vous êtes un garde lambda\n``4-Recrue féérique :`` Vous êtes en formation.")
    .addField("__:moneybag: Salaire__", "Fonctionnement par prime selon les actions")
    .setImage("https://p4.wallpaperbetter.com/wallpaper/346/406/472/fantasy-art-elves-knight-astri-lohne-wallpaper-preview.jpg")
    message.channel.send({embeds: [help_embed]});
}

if(message.content.toLowerCase() === préfix + "garde terre aride"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#5DADE2")
    .setTitle("**●▬▬▬▬▬:crossed_swords: Garde des terres arides ▬▬▬▬▬●**")
    .addField("__:scroll: Description__", "Les gardes des terres arides sont uniquement composés des races les plus ''craintes'' par l'humanité.(Liche, ghoul, démon, vampire(rare)). Elle a pour but de protéger ses congénères et de tuer toutes personnes(qui ne sont pas de leurs races) qui entreraient sur les terres arides sans autorisations. Les races en lien avec la nature sont les seuls autorisés à s'y balader librement uniquement s'ils sont escortés par un garde.")
    .addField("__:beginner: Hiérarchie__", "``1-Chef de la garde aride :`` Vous êtes un haut gradé. Vous pouvez donner des ordres aux autres gardes.\n``2-Sergent :`` Vous êtes inférieur au chef des gardes tout en restant un haut gradé.\n``3-Garde aride :`` Vous pouvez escorter au grand maximum 3 autres personnes sauf demande exceptionnel à un haut gradé !\n``4-Recrue des terres arides:`` Vous êtes en formation. Vous ne pouvez escorter qu'une personne maximum.")
    .addField("__:moneybag: Salaire__", "Fonctionnement par prime selon les actions")
    .setImage("https://wallpaperaccess.com/full/2065540.jpg")
    message.channel.send({embeds: [help_embed]});
}

if(message.content.toLowerCase() === préfix + "guilde aventurier"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#5DADE2")
    .setTitle("**●▬▬▬▬▬:beginner: Guilde d'aventurier ▬▬▬▬▬●**")
    .addField("__:scroll: Description__", "La guilde d'aventurier est composé d'humain. Mais rien ne vous empêche de l'infiltrer en tant que vampire, elf, etc(il faut pouvoir cacher ses traits physiques !). Les aventuriers font principalement des missions d'extermination de monstre...")
    .addField("__:beginner: Hiérarchie__", "``1-Adamantite``\n``2-Orichalque``\n``3-Mithril``\n``4-Platine``\n``5-Or``\n``6-Argent``\n``7-Fer``\n``8-Cuivre``")
    .addField("__:moneybag: Salaire__", "À chaque palier hiérarchique atteint, un item aléatoire est donné")
    .addField("__:scroll: Note__", "Ce métier est le plus affecté par la note 3 de la commande ?métier voir c'est celui qui pose le plus problème. Si vous voulez profiter de l'expérience au maximum alors il va falloir attendre la fin du projet. Interdiction de se plaindre avant.")
    .addField("__:scroll: Note 2__", "Contrairement aux métiers comme ''garde'' où l'évolution est au mérite. Les aventuriers doivent remplir 10 quêtes de leur rang pour augmenter au prochain.")
    .setImage("https://static.wikia.nocookie.net/overlord8371/images/d/dc/Blue_Rose.jpg/revision/latest?cb=20180803234950&path-prefix=fr")
    message.channel.send({embeds: [help_embed]});
}

if(message.content.toLowerCase() === préfix + "aubergiste"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#5DADE2")
    .setTitle("**●▬▬▬▬▬:cookie: aubergiste ▬▬▬▬▬●**")
    .addField("__:scroll: Description__", "Vous êtes membre d'une auberge inter-espèce. Vous devez principalement louer des chambres et servir à manger...Les prix affichés à l'auberge ne sont pas fixes !")
    .addField("__:beginner: Hiérarchie__", "``1-Gérant de l'auberge``\n``2-Aubergiste``")
    .addField("__:moneybag: Salaire__", "Selon vos ventes.")
    .setImage("https://images2.alphacoders.com/110/1107572.png")
    message.channel.send({embeds: [help_embed]});
}

if(message.content.toLowerCase() === préfix + "agent immobilier magique"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#5DADE2")
    .setTitle("**●▬▬▬▬▬:briefcase: agent immobilier magique ▬▬▬▬▬●**")
    .addField("__:scroll: Description__", "Votre job est simple...Vendre des biens immobiliers magiques à d'autres joueurs et uniquement d'autres joueurs !(le pourquoi du comment sera expliqué lors du ''recrutement'').")
    .addField("__:beginner: Hiérarchie__", "``1-Agent immobilier magique``")
    .addField("__:moneybag: Salaire__", "Selon vos ventes.")
    message.channel.send({embeds: [help_embed]});
}


if(message.content.toLowerCase() === préfix + "guide"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#5DADE2")
    .addField("__:shopping_bags: Guide RP Description__", "Bienvenue dans le guide ! Ici, vous aurez une liste d'info supplémentaires à savoir pour remplir sa fiche (ou du moins, pour les plus prudents ou ceux qui ont peur de ne pas comprendre le bot...). Dans ce guide nous n'allons pas partir sur de l'optimisation, mais juste créer un personnage par plaisir et qu'il soit un minimum cohérent. Le serveur ne se veut pas compétitif/à horreur des gens qui jouent à qui a le personnage le plus fort(enfaite c'est juste le fonda). Apprenez à être humble, si vous êtes la pour là pour faire le personnages avec les meilleurs stats...Partez donc sur un vrai MMO.")
    .setTitle("**●▬▬▬▬▬▬▬▬▬▬:scroll: Guide ▬▬▬▬▬▬▬▬▬▬●**")
    .addField("__:bust_in_silhouette: Choisir sa race__", "Ici, vous avez vue que les caractéristiques peuvent varier selon les races...Je le dit et le repète, vous n'avez rien à calculer le bot fait tous automatiquement ! Donc choisisez juste la race que vous appréciez (par son passif ou bien son ésthétique). Ce n'est pas plus comppliqué que ça et rien ne vous interdit de faire un nain assassin(mélanger résistance et dégâts), ça pourrait même être très drôle.")
    .addField("__:crossed_swords: Choisir sa classe__", "Au début, vous avez le choix entre voleur, combattant ou mage. Il faut savoir que les évolutions ont des sous branches et vous permettent de vous spécialiser...Mais pour faire simple. Combattant sera une classe qui pourra se spécialiser dans la défense ou bien quelque chose de polyvalent mélangeant attaque ou défense. Voleur pourra soit devenir un attaquant à distance, soit quelqu'un qui fait beaucoup de dégâts (mais ils sont fragiles, et ici quand vous mourez...C'est cya). Et pour finir mage, attaquant à distance qui a des attaques de zones, et peut-être même des invocations dans le futur. Bref, choissisez ce qui vous plairas !")
    .addField("__:scroll: Histoire__", "Pour l'histoire et pour vous donner une précision du contexte...À la fin de votre rédaction, votre personnage perdra du jour au lendemain ses forces, voir pire encore, toutes les personnes que vous connaissiez semble vous avoir oubliés. Du côté de votre connaissance, elle est revenu à quelque chose de banale (autant dire que si vous étiez un sorcier, votre QI a maintenant baissé). Après que votre fiche sera validé, votre personnage devra obligatoirement affronter un monstre ressemblant à une ghoul (c'est pour vous aider à utiliser le bot), donc n'enfermez pas votre personnage dans un channel s'il vous plaît. ( Note : Merci de ne pas faire un personnage avec un passé ''grandiose'' ou avec une grande force dans le passé, merci).") 
    message.channel.send({embeds: [help_embed]});
}


if(message.content.toLowerCase() === préfix + "bot"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#5DADE2")
    .setTitle("**●▬▬▬▬▬▬▬▬▬▬:robot: Bot ▬▬▬▬▬▬▬▬▬▬●**")
    .addField("1. L'Utilité en règle général","Le bot ici présent est un vrai couteau suisse. Il aide pour les combats, pour vous attribuer des statistiques et qu'il y ait aucune triche(car le fairplay on sait comment ça finit). Vous offres des commandes et des attaques spéciaux exclusifs qui ne feront pas les mêmes dégâts si un autre joueur les utilise. Et en plus de cela si vous faites du ''PVE'', alors il vous attribuera __automatiquement__ de l'experience.")
    .addField("2. Et si je ne comprends rien ?", "Alors il suffit simplement de ping un staff, on se fera un plaisir de vous prendre en privée dans un chanel ou bien limite en voc pour vous expliquer ce que vous ne comprenez pas. __Tous le monde à sa place ici.__")
    .addField("3. Je pourrais avoir des explications sur le bot ?", "Négatif, n'essayez surtout pas de demander à ce qu'on vous fasse ce style de bot ou voir même de parler juste de programmation avec son créateur (Sauf si vous vous appelez Zelgius). Non pas qu'il ne vous aime pas, mais qu'il c'est trop pris la tête dans le passé pour des histoires de merdes.")
     message.channel.send({embeds: [help_embed]});
}

if(message.content.toLowerCase() === préfix + "level"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#5DADE2")
    .setTitle("**●▬▬▬▬▬▬▬▬▬▬:chart_with_upwards_trend: Level ▬▬▬▬▬▬▬▬▬▬●**")
    .addField("1. Explication des niveaux","Lorsque vous gagnez un niveau, votre classe vous offres des points de statistiques automatiquement...Mais pas que ! Vous devez vous même attribuer des points à votre personnage via une petite commande qui vous demandera d'être écrite. Rien de compliqué car tout est automatisé.")
    .addField("2. Comment gagner de l'expérience et donc des niveaux", "Pour cela, rien de bien compliqué. Soit vous tuez des monstres, soit vous compléter des quêtes liée à votre faction. Facile non ?")
    .addField("3. Système anti-triche", "Je le préviens ici, mais inutile de faire une commande de loot d'XP en MP au bot. Si vous le faites en dehors du channel, le bot me préviendra et je vous détruirais purement et simplement. Des bisous.")
     message.channel.send({embeds: [help_embed]});
}

if(message.content.toLowerCase() === préfix + "contexte"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#5DADE2")
    .addField("**●▬▬▬▬▬▬▬▬:map: Contexte ▬▬▬▬▬▬▬▬▬●**", "Dans ce monde incarnez un fier humain, bravant les dangers avec son glaive de combattant ou encore un vampire, vivez aussi l'aventure en tant qu'automate pourquoi pas...Bref, la liste est longue et vous pourrez la rallongez autant que vous le désirez. Mais par dessus la race que vous incarnerez, vous aurez aussi le choix entre divers classes. Assassin, mage, archer, etc...Il est difficile de lister les champs de possibilités que cela soit pour les races ou les classes. Mais soyez sûre d'une seule chose, à Overlord, vous n'êtes pas prêt de vous ennuyer.")
    .setImage("https://media.discordapp.net/attachments/937004556548706314/937011423056363561/overload-anime-party-art.png?width=1201&height=676")
    message.channel.send({embeds: [help_embed]})
}

if(message.content.toLowerCase() === préfix + "race"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#5DADE2")
    .addField("**●▬▬▬▬▬▬▬▬▬▬▬▬▬▬:bust_in_silhouette: Race ▬▬▬▬▬▬▬▬▬▬▬▬▬▬●**",":person_pouting: **?Humain**\n:robot: **?Automate**\n:japanese_ogre: **?Démon**\n:cat: **?Beastman**\n:singer: **?Demi-Beastman**\n:elf: **?Elf**\n:person_bowing: **?Nain**\n:skull: **?Liche**\n:smiling_imp: **?Ghoul**\n:woman_elf: **?Nymphe**\n:vampire: **?Vampire**\n:japanese_goblin: **?Gobelin**\n:mermaid: **?Lamia**\n:dragon_face: **?Demi-dragon**\n:tongue: **?Succube**\n\n:page_facing_up: **Note :** Les bonus et malus sont attribués automatiquement par le bot, vous n'avez aucun calcul à faire.\n:page_facing_up: **Note 2 :** Partez du principe que les humains représente 80% de la population. D'ailleurs, les origines de chaqu'unes' éspèces sont très flous et incohérants si ce n'est inexistant...\n:page_facing_up: **Note 3 :** Là où se déroule le RP, seul les humains ont un Royaume. Les autres races vivent généralement dans de petits villages....Mais rien n'empêche certaines races en camouflant leurs particularités physique, de s'infiltrer dans le royaume ou la guilde d'aventurier.")
    message.channel.send({embeds: [help_embed]})
}

if(message.content.toLowerCase() === préfix + "succube"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#bf1579")
    .setImage("https://c4.wallpaperflare.com/wallpaper/878/753/173/evelynn-evelynn-league-of-legends-league-of-legends-demon-girls-succubus-hd-wallpaper-preview.jpg")
    .addField("**●▬▬▬▬▬▬▬▬▬▬▬:tongue: Succube ▬▬▬▬▬▬▬▬▬▬▬●**","Vous êtes proche des démons...On dit même souvent qu'ils sont leur 'cousins'(même traits physique). Néanmoins, il y a quelques différences entre une 'succube' et 'un démon'. Le ou la succube ont la capacité de faire un 'pacte' avec une seule personne. Chaque démon à sa méthode pour créer un 'lien' avec le futur contractant. Lorsque cela est fait, les deux membres liés par le pacte, pourront ressentir 20 à 30% des émotions de son contractant (donc ressentir lorsqu'il a peur, lorsqu'il est heureux, etc). Néanmoins, plus les deux sont séparés l'un de l'autre sur le long terme, plus ils vont naturellement avoir un 'manque' en eux. Le grand avantage du pacte, empêche les deux contractants de se blesser 'volontairement'(sans être affecté par une magie).\n**●▬▬▬▬▬▬▬▬▬▬:bar_chart: Caractéristique ▬▬▬▬▬▬▬▬▬●**\n+10% en mana, mais -10% en armure.\n**●▬▬▬▬▬▬▬▬▬▬:bust_in_silhouette: Âge maximum ▬▬▬▬▬▬▬▬▬●**\n150 ans")
    message.channel.send({embeds: [help_embed]})
}

if(message.content.toLowerCase() === préfix + "humain"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#F9E79F")
    .setImage("https://images5.alphacoders.com/495/495418.jpg")
    .addField("**●▬▬▬▬▬▬▬▬▬▬▬:person_pouting: Humain ▬▬▬▬▬▬▬▬▬▬▬●**","Vous êtes l'une des races les plus présentes d'Overlord. On ne peut pas dire que vous êtes uniques...Néanmoins, peut-être arriverez vous à sortir du lot ?\n**●▬▬▬▬▬▬▬▬▬▬:bar_chart: Caractéristique ▬▬▬▬▬▬▬▬▬●**\nVous n'avez aucun bonus ni malus, en soit...Le risque 0.\n**●▬▬▬▬▬▬▬▬▬▬:bust_in_silhouette: Âge maximum ▬▬▬▬▬▬▬▬▬●**\n80 ans")
    message.channel.send({embeds: [help_embed]})
}

if(message.content.toLowerCase() === préfix + "lamia"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#ff00be")
    .setImage("https://wallpapercave.com/wp/wp9177441.jpg")
    .addField("**●▬▬▬▬▬▬▬▬▬▬▬:mermaid: Lamia ▬▬▬▬▬▬▬▬▬▬▬●**","Bien qu'elles nage mieux dans l'eau que les autres races, les lamias ne peuvent vivre sous l'eau. C'est une race qui est comme toutes les autres discriminés et qui peut difficilement s'infiltrer chez les humains. Lorsque la Lamia atteint une classe du palier 3, on dit que les écailles de sa queue changeraient de couleur.\n**●▬▬▬▬▬▬▬▬▬▬:bar_chart: Caractéristique ▬▬▬▬▬▬▬▬▬●**\n+20% en mana, mais -10% en attaque et en HP\n**●▬▬▬▬▬▬▬▬▬▬:bust_in_silhouette: Âge maximum ▬▬▬▬▬▬▬▬▬●**\n60 ans")
    message.channel.send({embeds: [help_embed]})
}

if(message.content.toLowerCase() === préfix + "gobelin"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#6aa84f")
    .setImage("https://media.discordapp.net/attachments/938735718048620575/940978313990660166/unknown.png")
    .addField("**●▬▬▬▬▬▬▬▬▬▬▬:japanese_goblin: Gobelin ▬▬▬▬▬▬▬▬▬▬▬●**","Bien que la plupart des gobelins soit considérés comme des monstres, il est dit que certains ont réussit à quitter ''leur groupe'' avec une lucidité hors du commun, mais également une facilité à s'exprimer à autrui. Néanmoins et vous vous en doutez...Toutes les races à l'exceptions des gobelins ne croient pas à un seul mot à ces histoires et préfèrent les tuer à vue. Les gobelins ''lucides'' sont donc très rares et ont une durée de vie plutôt courte.\n**●▬▬▬▬▬▬▬▬▬▬:bar_chart: Caractéristique ▬▬▬▬▬▬▬▬▬●**\n+10% d'armure en plus, et -10% d'attaque\n**●▬▬▬▬▬▬▬▬▬▬:bust_in_silhouette: Âge maximum ▬▬▬▬▬▬▬▬▬●**\n40 ans")
    message.channel.send({embeds: [help_embed]})
}

if(message.content.toLowerCase() === préfix + "vampire"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#f20d0d")
    .setImage("https://a-static.besthdwallpaper.com/halloween-vampire-wallpaper-1920x1080-24094_48.jpg")
    .addField("**●▬▬▬▬▬▬▬▬▬▬:vampire: Vampire ▬▬▬▬▬▬▬▬▬▬●**","Vous êtes moins mal vue que les ghouls car vous vous contentez de boire du sang...Mais restez néanmoins pas mal discriminé. Vous ne craignez pas la lumière bien que vous préférez la nuit et vous ne pouvez transformer personne en vampire(pour le moment).\n**●▬▬▬▬▬▬▬▬▬▬:bar_chart: Caractéristique ▬▬▬▬▬▬▬▬▬●**\nMoins 5% en vitalité et armure. Mais +5% en attaque et dans le mana\n**●▬▬▬▬▬▬▬▬▬▬:bust_in_silhouette: Âge maximum ▬▬▬▬▬▬▬▬▬●**\n300 ans")
    message.channel.send({embeds: [help_embed]})
}

if(message.content.toLowerCase() === préfix + "nymphe"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#B8C8AD")
    .setImage("https://wallpaperaccess.com/full/3857683.jpg")
    .addField("**●▬▬▬▬▬▬▬▬▬▬▬:woman_elf: Nymphe ▬▬▬▬▬▬▬▬▬▬▬●**","L'une des races les plus rares du monde. Ce sont des elfes aux yeux de couleurs argentés qui sont souvent décrites comme les ''plus belles femmes du mondes''. Bien qu'apprécié par un grand nombre, leur rareté fait qu'elles sont souvents amenés à finir dans des commerces d'esclaves...\n**●▬▬▬▬▬▬▬▬▬▬:bar_chart: Caractéristique ▬▬▬▬▬▬▬▬▬●**\nVous gagnez 20% de mana, mais perdez 10% d'armure et 10% d'attaque\n**●▬▬▬▬▬▬▬▬▬▬:bust_in_silhouette: Âge maximum ▬▬▬▬▬▬▬▬▬●**\n130 ans (mais leur beauté est si grande, qu'il est difficile de dicerner l'âge d'une nymphe...)")
    message.channel.send({embeds: [help_embed]})
}

if(message.content.toLowerCase() === préfix + "automate" ){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#717D7E")
    .setImage("https://static.wikia.nocookie.net/overlord8371/images/5/55/Overlord_III_EP01_026.png/revision/latest/scale-to-width-down/1000?cb=20180713235232&path-prefix=fr")
    .addField("**●▬▬▬▬▬▬▬▬▬▬:robot: Automate ▬▬▬▬▬▬▬▬▬▬●**","Factuellement, vous êtes d'apparence humaine, mais l'intérieur n'est que machine. Il n'existe que très peu de model qui existe encore à ce jour dans Overlord...Cela se compte même sur le bout des doigts ! Il est d'ailleurs à noter que la plupart peuvent éprouver des sentiments...De réels sentiments.\nL'automate a de nature un désir d'avoir un maître et de veiler sur lui. Voyez cela comme une quête ''secondaire'' qui doit être remplie le plus tôt possible. Plus cela fait du temps que l'Automate n'a pas de maître, plus ses sentiments disparaissent jusqu'à le transformer en coquille vide...À l'inverse et une fois que l'Automate a un maître, ses émotions peuvent s'épanouir et parfois malheureusement, devenir dangereux pour l'entourage du dit ''maître''.")
    .addField("**Suite**", "Néanmoins ce sont des cas rares, et la plupart du temps cela se passe très bien.\n Il est d'ailleurs à noter que l'Automate est capable de manger et de boire des aliments communs à l'humain, il en ressent même les saveurs...Néanmoins, il peut très bien vivre sans manger ni boire, cela n'est pas une obligation.\n**●▬▬▬▬▬▬▬▬▬▬:bar_chart: Caractéristique ▬▬▬▬▬▬▬▬▬●**\n+5% dans la vitalité et l'armure. -5% dans le mana et l'attaque\n**●▬▬▬▬▬▬▬▬▬▬:bust_in_silhouette: Âge maximum ▬▬▬▬▬▬▬▬▬●**\n700 ans")
    message.channel.send({embeds: [help_embed]})
}

if(message.content.toLowerCase() === préfix + "démon" ){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#C0392B")
    .setImage("https://i.ytimg.com/vi/YjdaupeXXIo/maxresdefault.jpg")
    .addField("**●▬▬▬▬▬▬▬▬▬:japanese_ogre: Démon ▬▬▬▬▬▬▬▬▬●**","Une race qui est de nature impulsif. Bien entendue...Il existe des exceptions. C'est probablement l'une des races qui se fait le plus discriminer car tout le monde est à peu près d'accord pour dire qu'ils ne sont que de vulgaires emmerdeurs qui dans l'histoire de Overlord, ont eu la réputation de prôner la violence lorsqu'il fallait trouver la solution à un problème. Physiquement, ils ont des cornes, une queue et des ailes bien qu'ils ne peuvent pas voler (au minimum l'une des 3 caractéristiques !). D'ailleurs, tout comme les demi-dragons, les démons ont une préférence pour la viande (loup, sanglier, etc)...Néanmoins ils ne sont pas des mangeurs d'humains !\n**●▬▬▬▬▬▬▬▬▬▬:bar_chart: Caractéristique ▬▬▬▬▬▬▬▬▬●**\nVous avez 10% d'attaque en plus, et 10% d'HP en moins.\n**●▬▬▬▬▬▬▬▬▬▬:bust_in_silhouette: Âge maximum ▬▬▬▬▬▬▬▬▬●**\n150 ans")
    message.channel.send({embeds: [help_embed]})
}

if(message.content.toLowerCase() === préfix + "beastman"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#DC7633")
    .setImage("https://mangas-origines.fr/wp-content/uploads/WP-manga/data/manga_5f9c2ef415ab9/8efa85017908d904bb688e54ad9b7637/003.jpg")
    .addField("**●▬▬▬▬▬▬▬▬▬▬:person_pouting: Beastman ▬▬▬▬▬▬▬▬▬▬▬●**","Environ 80% animal et 20% humain, vous être étrangement plus résistant que d'autres. Il existe un nombre incalculables de beastmans, ou du moins...Autant qu'il existe d'animal. Le beastman peut se nourrir de nourriture humaine, mais également de ce que sa ''race'' animal a l'habitude de manger.\n**●▬▬▬▬▬▬▬▬▬▬:bar_chart: Caractéristique ▬▬▬▬▬▬▬▬▬●**\nVous avez 30% d'HP en plus et 30% de magie en moins.\n**●▬▬▬▬▬▬▬▬▬▬:bust_in_silhouette: Âge maximum ▬▬▬▬▬▬▬▬▬●**\n90 ans")
    message.channel.send({embeds: [help_embed]})
}

if(message.content.toLowerCase() === préfix + "demi-beastman"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#F4D03F")
    .setImage("https://i.imgur.com/QGB5ori.jpg")
    .addField("**●▬▬▬▬▬▬▬▬▬:cat: Demi-Beastman ▬▬▬▬▬▬▬▬▬●**","Le mélange d'ADN entre un humain et un beastman...Vous avez donc la moitié des avantages et des malus des beastmans.\n**●▬▬▬▬▬▬▬▬▬▬:bar_chart: Caractéristique ▬▬▬▬▬▬▬▬▬●**\nVous avez 15% d'HP en plus et 15% de magie en moins.\n**●▬▬▬▬▬▬▬▬▬▬:bust_in_silhouette: Âge maximum ▬▬▬▬▬▬▬▬▬●**\n85 ans")
    message.channel.send({embeds: [help_embed]})
}

if(message.content.toLowerCase() === préfix + "demi-dragon"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#bf2222")
    .setImage("http://wallpapers.filehostia.com/wp-content/uploads/2020/09/xdti3vK56lXdaEptj4Z3HmbpOZvQ5YBNScsmf1X6AfE.png")
    .addField("**●▬▬▬▬▬▬▬▬▬:dragon_face: Demi-dragon ▬▬▬▬▬▬▬▬▬●**","On ne connaît vraiment pas leurs origines...D'ailleurs, aucun dragon n'a jamais été vue dans Overlord et même les plus anciennes liches pourront vous approuver ces dires...Parfois elles ont une queue, parfois des ailes(inutilisables), voir même une peau écailleuse. Il est d'ailleurs possible qu'elle ait ses 3 caractéristiques en même temps (au minimum une). Cette race est détesté par pure racisme par les humains, mais par les autres races elle passe comme une éspèce lambda qui n'apporte ni bien ni mal...D'ailleurs, tout comme il est dit dans la description des démons, les demi-dragons préfèrent manger \n**●▬▬▬▬▬▬▬▬▬▬:bar_chart: Caractéristique ▬▬▬▬▬▬▬▬▬●**\nVous avez 20% d'HP en plus, 10% de mana en moins, 5% d'attaque en moins et 5% dearmure en moins.\n**●▬▬▬▬▬▬▬▬▬▬:bust_in_silhouette: Âge maximum ▬▬▬▬▬▬▬▬▬●**\n140 ans")
    message.channel.send({embeds: [help_embed]})
}

if(message.content.toLowerCase() === préfix + "elf"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#82E0AA")
    .setImage("http://i.imgur.com/DtYcfmJ.jpg")
    .addField("**●▬▬▬▬▬▬▬▬▬▬▬▬:elf: Elf ▬▬▬▬▬▬▬▬▬▬▬▬●**","Probablement l'une des races avec le plus d'ego. Vous êtes fragile, mais avez plus de mana que la normal. La plupart des elfs sont végétarrien.\n**●▬▬▬▬▬▬▬▬▬▬:bar_chart: Caractéristique ▬▬▬▬▬▬▬▬▬●**\n-10% de vitalité total /\ +10% de mana total.\n**●▬▬▬▬▬▬▬▬▬▬:bust_in_silhouette: Âge maximum ▬▬▬▬▬▬▬▬▬●**\n150 ans")
    message.channel.send({embeds: [help_embed]})
}

if(message.content.toLowerCase() === préfix + "nain"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#B2BABB")
    .setImage("https://64.media.tumblr.com/ec2088f9983bf69593052a508681d0ca/tumblr_inline_nbar98iL2v1sl9avf.jpg")
    .addField("**●▬▬▬▬▬▬▬▬▬:person_bowing: Nain ▬▬▬▬▬▬▬▬▬▬●**","Alors oui, vous êtes plus petit que la moyenne et serait probablement moins classe que vos amis les humains. Mais au moins vous êtes résistant !\n**●▬▬▬▬▬▬▬:bar_chart: Caractéristique ▬▬▬▬▬▬▬●**\nVous avez 10% d'armure et de vie en plus, mais en contrepartie un malus de 20% d'attaque.\n**●▬▬▬▬▬▬▬▬▬▬:bust_in_silhouette: Âge maximum ▬▬▬▬▬▬▬▬▬●**\n130 ans")
    message.channel.send({embeds: [help_embed]})
}

if(message.content.toLowerCase() === préfix + "liche"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#6C3483")
    .setImage("https://i.pinimg.com/originals/5f/38/bf/5f38bf0b6aa88089a93170710d89b036.jpg")
    .addField("**●▬▬▬▬▬▬▬▬▬:skull: Liche ▬▬▬▬▬▬▬▬▬▬●**","Vous êtes un squelette d'un donjon qui est revenu à la vie...C'est étrange dit comme ça, mais c'est pourtant bien la réalité. Au final vous êtes comme un humain, mais ''squelettique'' et qui a la capacité de prendre l'apparence d'un humain une fois par jour ! (pour une durée de 6h max)\n**●▬▬▬▬▬▬▬:bar_chart: Caractéristique ▬▬▬▬▬▬▬●**\n-25% d'HP, +5% d'armure et +20% de mana\n**●▬▬▬▬▬▬▬▬▬▬:bust_in_silhouette: Âge maximum ▬▬▬▬▬▬▬▬▬●**\n700 ans")
    message.channel.send({embeds: [help_embed]})
}

if(message.content.toLowerCase() === préfix + "ghoul"){
    const help_embed = new Discord.MessageEmbed()
    .setColor("#CB4335")
    .setImage("https://pbs.twimg.com/media/DhMhl7WXcAAMVq0.jpg")
    .addField("**●▬▬▬▬▬▬▬▬▬:smiling_imp: Ghoul ▬▬▬▬▬▬▬▬▬▬●**","Après qu'un donjon se soit mal terminé, les survivants transmettairent une drôle de maladie qui créèrent les premières ghouls. Des êtres aux tendances cannibales et qui se nourrisse exclusivement de bipède(les autres races) ou bien de monstres de donjon. Donc n'allez surement pas leur proposé des légumes ou bien des fruits car ils pourraient en vomir. le temps passera et finalement le ''virus'' dipsaraîtra, néanmoins, cela n'empêche que les ghouls procréèrent et il est donc possible dans croiser dans votre vie. Sachez qu'elles sont très mal vue(autant que les démons)...Ce qui est normal. Physiquement on les reconnait par leurs yeux à l'apparence si ''étranges'', et si l'on garde bien et en vue de leur régime alimentaire...Ils ont aussi des ''crocs'' qui leur permettent de déchirer la chaire sans difficulté.\n**●▬▬▬▬▬▬▬:bar_chart: Caractéristique ▬▬▬▬▬▬▬●**\n-10% d'armure, mais un bonus de 5% sur la vitalité et les dégâts.\n**●▬▬▬▬▬▬▬▬▬▬:bust_in_silhouette: Âge maximum ▬▬▬▬▬▬▬▬▬●**\n100 ans")
    message.channel.send({embeds: [help_embed]})
}






