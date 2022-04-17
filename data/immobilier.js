if(message.content.toLowerCase() === préfix + "immobilier" ){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#ffd100")
    .addField(":house: **Où acheter un bâtiment ?**", "``Pour acheter un bâtiment vous devrez demander à un ''agent immobilier magique(voir liste des métiers)'', il rajoutera entre 3 et 5% du prix du bien que vous voulez. Mettez un ''?'' avant le bâtiment pour avoir plus d'informations sur ce dernier.``")
    .addField(":book: **Information supplémentaire**", "Un bâtiment est indestructible (protégé par une barrière magique). Vous pouvez bannir X ou Y personne l'empêchant donc de rentrer à l'intérieur du dit batiment acheté (seul le propriétaire en est autorisé). Si quelqu'un abuse de l'indestructibilité du batîment (en soit...Qui se cacherait comme une fouine H24 qu'il y aurait un problème), alors la barrière peut-être temporairement retirée sous demande au staff.\nIl est à noter qu'on ne peut-être propriétaire de 2 batîments en même temps(le prix de revente d'un batiment est 4 fois moins chère que son prix initial !).")
    .addField(":scroll: **Liste des bâtiments**", "1-Cabane\n2-Maison\n3-Donjon\n4-Île volante")
    .setFooter("Menu immobilier")
     message.channel.send(help_embed);
}


if(message.content.toLowerCase() === préfix + "cabane"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#01782b")
    .setTitle(":house_abandoned: Cabane")
    .addField(":moneybag: __**Prix**__","4000 pièces de bronze et 250 pièces d'argent")
    .addField(":credit_card: __**Achat**__","?Achat cabane [nombre de pièces de bronze] [nombre de pièces d'argent].")
    .addField(":money_with_wings: __**Revente**__","?Vendre cabane")
    .addField(":scroll: __**Description**__", "Cette petite cabane est d'une taille plutôt moderne sans pour autant être considéré comme ''grande''. La cabane se trouvera dans une catégorie de channel de zone extérieure(exemple : dans la forêt).")
    .setImage("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9ed11ce8-4d93-4212-b784-3954b8dd2658/d57ks7u-37fe0a17-5b30-44aa-852b-3d53baf8a718.jpg/v1/fill/w_900,h_637,q_75,strp/forest_shack_01_by_gregor_kari_d57ks7u-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjM3IiwicGF0aCI6IlwvZlwvOWVkMTFjZTgtNGQ5My00MjEyLWI3ODQtMzk1NGI4ZGQyNjU4XC9kNTdrczd1LTM3ZmUwYTE3LTViMzAtNDRhYS04NTJiLTNkNTNiYWY4YTcxOC5qcGciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.JBKzzjCapEP8Tvb78bOf7c6PR3DPIQWG_6-Hbcyi_Jw")
     message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "maison"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#009f39")
    .setTitle(":house: Maison")
    .addField(":moneybag: __**Prix**__","7000 pièces de bronze et 500 pièces d'argent")
    .addField(":credit_card: __**Achat**__","?Achat maison [nombre de pièces de bronze] [nombre de pièces d'argent]")
    .addField(":money_with_wings: __**Revente**__","?Vendre maison")
    .addField(":scroll: __**Description**__", "Enfin quelque chose de concret ! Cette maison est beaucoup plus spacieuse que la cabane...Vous pouvez facilement y faire cohabiter 4 personnes ! Si vous l'achetez, alors le channel apparaîtra dans une zone civilisé. Au royaume humain si vous le pouvez ou alors dans les villages existants des autres races(beastman, elf).")
    .setImage("https://www.wallpapermaiden.com/wallpaper/19027/download/1600x900/anime-house-forest-clouds-scenic-grass.jpg")
     message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "donjon"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#009f6f")
    .setTitle(":house_with_garden: Donjon")
    .addField(":moneybag: __**Prix**__","30000 pièces de bronze, 2500 pièces d'argent et 200 pièces d'or")
    .addField(":credit_card: __**Achat**__","?Achat donjon [nombre de pièces de bronze] [nombre de pièces d'argent] [nombre de pièces d'or]")
    .addField(":money_with_wings: __**Revente**__","Un donjon ne peut pas être vendu...Mais il peut-être détruit ! Lors de son achat, 3 clés sont distribués à une, deux, ou trois personnes(logique)). Pour détruire le donjon, les 3 clés doivent être rassemblés.")
    .addField(":scroll: __**Description**__", "Un donjon est un gigantesque temple qui est généralement utilisé pour les clans ou les factions. Vous avez de la place pour facilement 20 personnes. À son achat, vous débloquez une catégorie de channel !")
    .setImage("https://images3.alphacoders.com/958/958230.jpg")
     message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "île volante"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#6aa895")
    .setTitle(":bank: Ancien temple")
    .addField(":moneybag: __**Prix**__","20000 pièces de bronze, 1000 pièces d'argent et 200 pièces d'or")
    .addField(":credit_card: __**Achat**__","?Achat île volante [nombre de pièces de bronze] [nombre de pièces d'argent] [nombre de pièces d'or]")
    .addField(":money_with_wings: __**Revente**__","?Vendre île")
    .addField(":scroll: __**Description**__", "Petite île volante sur laquelle se trouve un manoir. L'île est accessible par un portail. Généralement l'île volante est acheté pour les petites factions souhaitons une grande proximité... Il est à noter que toutes les îles volantes se trouvent dans la même région ! Et étrangement...Seuls les joueurs peuvent s'acquérir une île volante.")
    .setImage("http://4everstatic.com/images/850xX/dessins/anime-et-fantasy/ile-volant-182050.jpg")
     message.channel.send(help_embed);
}


