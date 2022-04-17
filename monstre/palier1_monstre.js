// Affichage
// function monstreAffichage(nom, couleur, image,niveau, hp, armure, passif, commandeAttaque, commandeDefense, commandeRecompense){

if(message.content === préfix + "Loup" || message.content === préfix + "loup"){
        var help_embed = new Discord.MessageEmbed()
        .setTitle("Loup")
        .setColor("#49b28b")
        .setImage("https://wallpaperaccess.com/full/522966.jpg")
        .addField(":abacus: Niveau","2")
        .addField(":heart: HP","40")
        .addField(":shield: Armure", "0")
        .addField(":beginner: Passif", "Aucun")
        .addField(":crossed_swords: Attaque", "Loup attaque")
        .addField(":shield: Défense", "Loup blocage [dégâts]")
        .addField(":moneybag: Récompense", "?Loup récompense [nombre de joueur]")
        message.channel.send(help_embed)
    
}

if(message.content === préfix + "Combattant mercenaire" || message.content === préfix + "combattant mercenaire"){
    monstreAffichage("Combattant mercenaire","#49b28b", "https://images-ext-1.discordapp.net/external/KeE0gYkEzEd5AHVLGrTiY70ZeOeo3G0sN3a1ROFLqKg/%3Fwidth%3D606%26height%3D676/https/media.discordapp.net/attachments/809083678222319636/860418152776728576/a6d2f2b9ad7afd13f1717f1528ce0154.jpg","4","80","3","Aucun","?CM attaque","?CM blocage [dégâts]", "?CM récompense [nombre de joueur]")
}

if(message.content === préfix + "Archer mercenaire" || message.content === préfix + "archer mercenaire"){
    monstreAffichage("Combattant mercenaire","#49b28b", "https://i.pinimg.com/originals/b6/64/6d/b6646d7c31fa4458703fc7a433de0c0d.jpg","3","50","1","Aucun","?AM attaque","?AM blocage [dégâts]", "?AM récompense [nombre de joueur]")
}



// Attaque 
// monstreAttaque(minAttaque, maxAttaque, couleur, CritiqueProbabilite, MauvaiseProbabilite, textEchec, couleurEchec, couleurCritique, degatBonus, texteAttaque, texteCritique){

if(message.content.toLowerCase() === préfix + "loup attaque"){
    monstreAttaque(12, 17, "#49b28b", 90, 10, "Le loup rate son attaque", "#ffffff", "#000000",1.5, "Le loup vous donne un coup de griffe", "Votre adversaire effectue un bluff et au lieu de vous griffer, se contente de vous mordre")
} 

if(message.content.toLowerCase() === préfix + "cm attaque"){
    monstreAttaque(13, 20, "#49b28b", 90, 10, "Le combattant se contente de vous insulter", "#ffffff", "#000000",1.6, "Le mercenaire vous donne un coup d'épée", "Vous pensiez recevoir un coup d'épée ...? Et bien non ! Car notre petit mercenaire vous lancera sans vous prévenir une jolie dague en direction de votre torse")
} 


if(message.content.toLowerCase() === préfix + "am attaque"){
    var min = 15;
    var max = 20; 
    id = message.author.id;
    var y = Math.floor(Math.random() * (max - min + 1) ) + min;
    var result = Math.floor((Math.random() * 100) + 1);
    if(result < 10){
    // Echec
    var help_embed = new Discord.MessageEmbed()
    .setColor("#ffffff")
    .setTitle("L'archer tire une flèche, mais cette dernière se prend un arbre...")
    }else if (result < 90){
        // Critique
        armure = 3
        if(armure >= bdd[id].ARtotal){
            armure = armure - bdd[id].ARtotal
        } else {
            armure = 0
        }
        multiple = 0.3*armure
        console.log(multiple)
        y = Math.floor(y * (1+multiple))

        var help_embed = new Discord.MessageEmbed()
        .setColor("#49b28b")
        .addField("L'acher vous tire une flèche magique ! Moins vous avez d'armure, plus l'attaque est puissante ! ", ":crossed_swords: " + y)
    }else if (result >= 90){
    // Critique
    y = Math.floor(y * 2)
    var help_embed = new Discord.MessageEmbed()
    .setColor("#000000")
    .addField("La précision de notre mercenaire aura eu raison de lui ! Il vous touche un point vital !", ":crossed_swords:" + y)
    } 
    message.channel.send(help_embed);

}


/// Blocage 

// function monstreBlocage(degat, minBlocage, maxBlocage, couleur,critiqueProbabilite, mauvaiseProbabilite,textEchec,textBlocage,textCritique, critNegatif,bonusBlocage, couleurEchec, couleurCritique){
    if(command.toLowerCase() === 'cm'){
        if(args[0]){
        if(args[0].toLowerCase() === 'blocage'){
            monstreBlocage(args[1], 0.8, 0.9, "#49b28b",90, 10, "Heureusement pour vous, le combattant rate son blocage !","Le jeune homme bloquera l'attaque à l'aide de la lame de son épée, dommage pour vous !","Le mercenaire arrive miraculeusement à bloquer le coup ! Blocage critique !", 1.5,0.5, "#ffffff", "#000000")
        }
    }
        
    }

    if(command.toLowerCase() === 'am'){
        if(args[0]){
            if(args[0].toLowerCase() === 'blocage'){
                monstreBlocage(args[1], 0.9, 1.1, "#49b28b",95, 5, "Heureusement pour vous, l'archer rate son blocage !","Le jeune archer bloquera l'attaque à l'aide d'une de ses dagues, dommage pour vous !","L'archer arrive miraculeusement à bloquer le coup ! Blocage critique !", 1.5,0.5, "#ffffff", "#000000")
           }
                    
        }
    }

    if(command === 'loup'){
        if(args[0]){
            if(args[0] === 'blocage'){
                monstreBlocage(args[1], 0.9, 1.1, "#49b28b",95, 5, "Heureusement pour vous, le loup rate son blocage !","Le loup subira l'attaque. Sa chaire réduira au mieux qu'elle peu les dégâts.!","Le loup arrive à miraculeusement réduire les dégâts. ! Blocage critique !", 1.5,0.5, "#ffffff", "#000000")
            }            
        }
    }

    // Récompense
    if(command == "loup" ){
        if(args[0]){
            if(args[0].toLowerCase() === "récompense"){
                id = message.author.id;
                if(bdd[id]){
                    nbJoueur = args[1];
                    var max_value = Math.floor(35);
                    var min_value = Math.floor(30);
                    var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;

                    var max;
                    var min; 
                    var LvlLoup = 2;
                    var lvlJoueur = bdd[id].lvl;
                    var nombre;
                    if(lvlJoueur > LvlLoup){
                        nombre = lvlJoueur - LvlLoup; // 2
                        nombre =0.2*nombre;
                        nombre = 1 - nombre;
                        if(nombre < 0){
                            nombre = 0;
                        }
                    } else {
                        nombre = LvlLoup - lvlJoueur; // 2
                        nombre =  0.2*nombre;
                        nombre = 1 + nombre;
                    }
                    result = Math.floor(result*nombre);
                    xpActuel =  bdd[id].xp
                    if(nbJoueur == 1){
                        reducteur = 1
                    } else {
                        reducteur = nbJoueur*0.75
                    }
                    result/reducteur;
                    bdd[id].xp = Math.floor(bdd[id].xp + result/reducteur);

                    var pieceBronze;
                    var max_value = Math.floor(3);
                    var min_value = Math.floor(7);
                    var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                    result = Math.floor(result/reducteur);
                    pieceBronze = result;
                    bdd[id].pieceBronze = bdd[id].pieceBronze + pieceBronze

                    Savebdd();
                    verif(false)
                    message.channel.send("Bravo ! Vous avez gagné de l'experience. ")
                    message.channel.send("Vous gagnez aussi **" + result + "** pièces de bronze.")
                    var embed = new Discord.MessageEmbed()
                    .addField("Courbe d'XP",  xpActuel + " ---> " + bdd[id].xp)
                    message.channel.send(embed);
                    var channel = client.channels.cache.get('939189314779222043');
                    channel.send('Commande : ' +  message.content + '\nID utilisateur : <@' + id +'>');
            
                } else {
                    message.channel.send("récompense de rien du tout mon reuf.")
                }
            }
        }
    }

    if(command == "cm" ){
        if(args[0]){
            if(args[0].toLowerCase() === "récompense"){

                id = message.author.id;
                if(bdd[id]){
                    
                    nbJoueur = args[1]
                    if(!args[1]){
                        message.channel.send("écrit le nombre de joueur ! ")
                    } else {
                        var max_value = Math.floor(35);
                        var min_value = Math.floor(30);
                        var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;

                        var max;
                        var min; 
                        var LvlLoup = 4;
                        var lvlJoueur = bdd[id].lvl;
                        var nombre;
                        if(lvlJoueur > LvlLoup){
                            nombre = lvlJoueur - LvlLoup; // 2
                            nombre =0.2*nombre;
                            nombre = 1 - nombre;
                            if(nombre < 0){
                                nombre = 0;
                            }
                        } else {
                            nombre = LvlLoup - lvlJoueur; // 2
                            nombre =  0.2*nombre;
                            nombre = 1 + nombre;
                        }
                        result = Math.floor(result*nombre);
                        xpActuel =  bdd[id].xp
                        if(nbJoueur == 1){
                            reducteur = 1
                        } else {
                            reducteur = nbJoueur*0.75
                        }
                        bdd[id].xp = Math.floor(bdd[id].xp + result/reducteur);

                        var pieceBronze;
                        var max_value = Math.floor(35);
                        var min_value = Math.floor(30);
                        var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                        result = Math.floor(result/reducteur);                    
                        pieceBronze = result;

                        bdd[id].pieceBronze = bdd[id].pieceBronze + result;
                        Savebdd();
                        verif(false)
                        message.channel.send("Bravo ! Vous avez gagné de l'experience. ")
                        message.channel.send("Vous gagnez aussi **" + result + "** pièces de bronze.")
                        var embed = new Discord.MessageEmbed()
                        .addField("Courbe d'XP",  xpActuel + " ---> " + bdd[id].xp)
                        message.channel.send(embed);
                        var channel = client.channels.cache.get('939189314779222043');
                        channel.send('Commande : ' +  message.content + '\nID utilisateur : <@' + id +'>');
                    }
                } else {
                    message.channel.send("récompense de rien du tout mon reuf.")
                }
            }
        }
    }

    if(command == "am" ){
        if(args[0]){
            if(args[0].toLowerCase() === "récompense"){

                id = message.author.id;
                if(bdd[id]){
                    nbJoueur = args[1];
                    var max_value = Math.floor(35);
                    var min_value = Math.floor(30);
                    var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;

                    var max;
                    var min; 
                    var LvlLoup = 3;
                    var lvlJoueur = bdd[id].lvl;
                    var nombre;
                    if(lvlJoueur > LvlLoup){
                        nombre = lvlJoueur - LvlLoup; // 2
                        nombre =0.2*nombre;
                        nombre = 1 - nombre;
                        if(nombre < 0){
                            nombre = 0;
                        }
                    } else {
                        nombre = LvlLoup - lvlJoueur; // 2
                        nombre =  0.2*nombre;
                        nombre = 1 + nombre;
                    }
                    result = Math.floor(result*nombre);
                    xpActuel =  bdd[id].xp
                    if(nbJoueur == 1){
                        reducteur = 1
                    } else {
                        reducteur = nbJoueur*0.75
                    }
                    bdd[id].xp = Math.floor(bdd[id].xp + result/reducteur);

                    var pieceBronze;
                    var max_value = Math.floor(17);
                    var min_value = Math.floor(7);
                    var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                    result = Math.floor(result/reducteur);                
                    pieceBronze = result;

                    bdd[id].pieceBronze = bdd[id].pieceBronze + result;
                    Savebdd();
                    verif(false)
                    message.channel.send("Bravo ! Vous avez gagné de l'experience. ")
                    message.channel.send("Vous gagnez aussi **" + result + "** pièces de bronze.")
                    var embed = new Discord.MessageEmbed()
                    .addField("Courbe d'XP",  xpActuel + " ---> " + bdd[id].xp)
                    message.channel.send(embed);
                    var channel = client.channels.cache.get('939189314779222043');
                    channel.send('Commande : ' +  message.content + '\nID utilisateur : <@' + id +'>');
            
                } else {
                    message.channel.send("récompense de rien du tout mon reuf.")
                }
            }
                        
        }
    }


if(message.content === préfix + "Petite plaine" || message.content === préfix + "petite plaine") {
    
    var A = 0; 
    var B = 0; 
    var C = 0; 
    var max_value = Math.floor(2);
    var min_value = Math.floor(1)
    var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
    while(result!=0){  
        var random = Math.floor((Math.random() * 100) + 1);
        if(random < 70){
            A++ // Loup
        } else if (random <= 80){
            B++ // Mercenaire cac
        } else {
            C++ // Mercenaire dist
        }
        result--;
    } 
    var mes = new Discord.MessageEmbed()
    .addField("Vous appercevez des silhouettes se rapprocher de vous...", ":wolf: **Loup**\nEffectif : " + A + "\n:crossed_swords: **Combattant mercenaire**\nEffectif : " + B + "\n:bow_and_arrow: **Archer mercenaire**\nEffectif : " + C + "\n```Passif du groupe``` ``1- Si l'archer est accompagné d'un loup ou d'un combattant, alors il se place en deuxième ligne.``\n``2- Il faut faire d'abord le ciblage et ensuite l'attaque exceptionnellement. Pour l'acher, c'est uniquement le joueur pris par le ciblage qui fait la commande d'attaque de l'archer.``")
    .setColor("#49b28b")
    .setImage("https://wallpaperaccess.com/full/522966.jpg")
    message.channel.send(mes);

}

if(command === "plaine") {  
    if(args[0]) {
        var A = 0; 
        var B = 0; 
        var C = 0; 
        nbJoueur = args[0] 
        nbMaxJoueur = parseInt(nbJoueur) + 1
        var min_value = Math.floor(parseInt(nbJoueur));
        var max_value = Math.floor(parseInt(nbMaxJoueur))
        var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;

        while(result!=0){  
            var random = Math.floor((Math.random() * 100) + 1);
            if(random < 50){
                A++ // Loup
            } else if (random <= 70){
                B++ // Mercenaire cac
            } else {
                C++ // Mercenaire dist
            }
            result--;
        } 
        var mes = new Discord.MessageEmbed()
        .addField("Vous appercevez des silhouettes se rapprocher de vous...", ":wolf: **Loup**\nEffectif : " + A + "\n:crossed_swords: **Combattant mercenaire**\nEffectif : " + B + "\n:bow_and_arrow: **Archer mercenaire**\nEffectif : " + C + "\n```Passif du groupe``` ``1- Si l'archer est accompagné d'un loup ou d'un combattant, alors il se place en deuxième ligne.``")
        .setColor("#49b28b")
        .setImage("https://wallpaperaccess.com/full/522966.jpg")
        message.channel.send(mes);
    } else {
        message.channel.send("Il faut mettre un nombre la con de ta race.")
    }

}