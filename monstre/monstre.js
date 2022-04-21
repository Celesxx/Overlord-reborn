const { MessageManager } = require("discord.js");

function monstreAffichage(nom, couleur, image,niveau, hp, armure, passif, commandeAttaque, commandeDefense, commandeRecompense){
    var help_embed = new Discord.MessageEmbed()
    .setTitle(nom)
    .setColor(couleur)
    .setImage(image)
    .addField(":abacus: Niveau",niveau)
    .addField(":heart: HP",hp)
    .addField(":shield: Armure", armure)
    .addField(":beginner: Passif", passif)
    .addField(":crossed_swords: Attaque", commandeAttaque)
    .addField(":shield: Défense", commandeDefense)
    .addField(":moneybag: Récompense", commandeRecompense)
    message.channel.send(help_embed)
}

function monstreAttaque(minAttaque, maxAttaque, couleur, CritiqueProbabilite, MauvaiseProbabilite, textEchec, couleurEchec, couleurCritique, degatBonus, texteAttaque, texteCritique){
    var min = minAttaque;
    var max = maxAttaque; 
    var y = Math.floor(Math.random() * (max - min + 1) ) + min;
    var result = Math.floor((Math.random() * 100) + 1);
    if(result <= MauvaiseProbabilite){
    // Echec
    var help_embed = new Discord.MessageEmbed()
    .setColor(couleurEchec)
    .setTitle(textEchec)
    }else if (result >= CritiqueProbabilite){
    // Critique
    y = Math.floor(y * degatBonus)
    var help_embed = new Discord.MessageEmbed()
    .setColor(couleurCritique)
    .addField(texteCritique, ":crossed_swords:" + y)
    } else {
    // Dégat normaux
    var help_embed = new Discord.MessageEmbed()
    .setColor(couleur)
    .addField(texteAttaque, ":crossed_swords:" + y)
    }
    message.channel.send(help_embed);

}

function monstreBlocage(degat, minBlocage, maxBlocage, couleur,critiqueProbabilite, mauvaiseProbabilite,textEchec,textBlocage,textCritique, critNegatif,bonusBlocage, couleurEchec, couleurCritique){
    var max = Math.floor(degat*maxBlocage);
    var min = Math.floor(degat*minBlocage)
    //message.channel.send(max + " " + min)
    var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
    var result = Math.floor((Math.random() * 100) + 1);
    if(result <= mauvaiseProbabilite){
    y = Math.floor(y*critNegatif)
    var help_embed = new Discord.MessageEmbed()
    .setColor(couleurEchec)
    .addField(textEchec, ":anger: " + y)
    }else if (result >= critiqueProbabilite){
    y = Math.floor(y*bonusBlocage)
    var help_embed = new Discord.MessageEmbed()
    .setColor(couleurCritique)
    .addField(textCritique, ":anger: " + y)
    } else {
    var help_embed = new Discord.MessageEmbed()
    .setColor(couleur)
    .addField(textBlocage, ":anger: " + y)
    }
    message.channel.send(help_embed);
}

function monstreEsquive(degat, minBlocage, maxBlocage, couleur,proba, textReussite, textEchec, couleurEchec){
    var max = Math.floor(degat*maxBlocage);
    var min = Math.floor(degat*minBlocage)
    //Calcule si ça fail
    var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
    var result = Math.floor((Math.random() * 100) + 1);
    if(result <= proba){
    // il réussit
        var help_embed = new Discord.MessageEmbed()
        .setColor(couleur)
        .addField(textReussite, ":anger: " + y)
    }else if (result > proba){
        var help_embed = new Discord.MessageEmbed()
        .setColor(couleurEchec)
        .addField(textEchec, ":anger: " + y)
    } 
    message.channel.send(help_embed);
}

if(message.content === préfix + "Ghoul fragile"){
    monstreAffichage("Ghoul","#C0392B", "https://animeamateur.files.wordpress.com/2016/04/kabaneri_3.png","-2","20","Aucun","?Ghoul attaque","?Ghoul blocage [dégâts]", "?RecompenseGhoul")
}

if(message.content === préfix + "Ghoul attaque"){
    monstreAttaque(5,8,"#C0392B",80,2,"**La ghoul vous donne un coup critique !**", "**La ghoul vous griffe !**")
}

if(command === 'ghoul'){
    if(args[0] == "blocage"){
    monstreBlocage(0.3,0.95,"#C0392B",20,1.2,"**La ghoul tente de bloquer votre attaque**", "**C'est un echec pour notre ghoul...Son blocage rate**", "-" + args[1])
    }
}



function monstreBlocage(degat, minBlocage, maxBlocage, couleur,critiqueProbabilite, mauvaiseProbabilite,textEchec,textBlocage,textCritique, critNegatif,bonusBlocage, couleurEchec, couleurCritique){
    var max = Math.floor(degat*maxBlocage);
    var min = Math.floor(degat*minBlocage)
    //message.channel.send(max + " " + min)
    var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
    var result = Math.floor((Math.random() * 100) + 1);
    if(result <= mauvaiseProbabilite){
    y = Math.floor(y*critNegatif)
    var help_embed = new Discord.MessageEmbed()
    .setColor(couleurEchec)
    .addField(textEchec, ":anger: " + y)
    }else if (result >= critiqueProbabilite){
    y = Math.floor(y*bonusBlocage)
    var help_embed = new Discord.MessageEmbed()
    .setColor(couleurCritique)
    .addField(textCritique, ":anger: " + y)
    } else {
    var help_embed = new Discord.MessageEmbed()
    .setColor(couleur)
    .addField(textBlocage, ":anger: " + y)
    }
    message.channel.send(help_embed);
}


if(message.content === préfix + "RecompenseGhoul" || message.content === préfix + "recompenseGhoul" || message.content === préfix + "Recompenseghoul"){
    id = message.author.id;
    if(bdd[id]){
        xpActuel =  bdd[id].xp
        console.log("ici")
        bdd[id].xp = bdd[id].xp + 101;
        Savebdd();
        verif()
        message.channel.send("Bravo ! Vous avez gagné de l'experience. C'est le ''tutoriel'', donc pour cette fois, on vous offre 1 niveau...\n Lorsque vous gagnez un niveau, selon votre classe vous allez gagner des points bonus dans certaines statistiques de manière automatique. Néanmoins, vous n'êtes pas dépendant du système ! Car vous gagnez aussi des points qui sont à attribuer manuellement !")
        var embed = new Discord.MessageEmbed()
        .addField("Courbe d'XP",  xpActuel + " ---> " + bdd[id].xp)
        message.channel.send({embeds: [embed]});
        message.channel.send('Commande : ' +  message.content + '\nID utilisateur : <@' + id +'>');

    } else {
        message.channel.send("récompense de rien du tout mon reuf.")
    }
}



