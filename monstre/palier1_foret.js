
if(message.content.toLowerCase() === préfix + "gobelin solitaire"){
    var help_embed = new Discord.MessageEmbed()
    .setTitle("Gobelin solitaire")
    .setColor("#1df863")
    .setImage("https://gettotext.com/deutsch/wp-content/uploads/2021/07/Goblin-Slayer-Machtigste-Monster-Rangliste-ScreenRant.jpg")
    .addField(":abacus: Niveau","15")
    .addField(":heart: HP","150")
    .addField(":shield: Armure", "0")
    .addField(":crossed_swords: Attaque", "?GS attaque")
    .addField(":shield: Défense", "?GS esquive [dégâts]")
    .addField(":moneybag: Récompense", "?GS récompense [nombre de joueur]")
    message.channel.send(help_embed)
}

if(message.content.toLowerCase() === préfix + "arbros"){
    var help_embed = new Discord.MessageEmbed()
    .setTitle("Arbros")
    .setColor("#1df863")
    .setImage("https://media.discordapp.net/attachments/918139711338475522/940246051686858762/slawomir-maniak-sci-fi-fantasy-rotspawn-creature-art-images.png?width=641&height=469")
    .addField(":abacus: Niveau","17")
    .addField(":heart: HP","130")
    .addField(":shield: Armure", "20")
    .addField(":crossed_swords: Attaque", "?A attaque")
    .addField(":shield: Défense", "?A blocage [dégâts]")
    .addField(":moneybag: Récompense", "?A récompense [nombre de joueur]")
    message.channel.send(help_embed)
}

if(message.content.toLowerCase() === préfix + "gigantesque hibou"){
    var help_embed = new Discord.MessageEmbed()
    .setTitle("Gigantesque hibou")
    .setColor("#1df863")
    .setImage("https://preview.redd.it/l1hi7um1wtl01.png?width=640&crop=smart&auto=webp&s=0da98a3fefe358a3a8b997d3b1e32e790406f9ad")
    .addField(":abacus: Niveau","18")
    .addField(":heart: HP","320")
    .addField(":shield: Armure", "5")
    .addField(":crossed_swords: Attaque", "?GH attaque")
    .addField(":shield: Défense", "?GH blocage [dégâts]")
    .addField(":moneybag: Récompense", "?GH récompense [nombre de joueur]")
    message.channel.send(help_embed)
}

if(message.content.toLowerCase() === préfix + "géant"){
    var help_embed = new Discord.MessageEmbed()
    .setTitle("Géant")
    .setColor("#1df863")
    .setImage("https://c4.wallpaperflare.com/wallpaper/698/215/599/fantasy-creature-dark-forest-wallpaper-thumb.jpg")
    .addField(":abacus: Niveau","30")
    .addField(":heart: HP","500")
    .addField(":shield: Armure", "0")
    .addField(":crossed_swords: Attaque", "?G attaque")
    .addField(":shield: Défense", "?Aucune")
    .addField(":moneybag: Récompense", "?G récompense [nombre de joueur]")
    message.channel.send(help_embed)
}




if(message.content.toLowerCase() === préfix + "gs attaque"){
    var min = 20;
    var max = 40; 
    var y = Math.floor(Math.random() * (max - min + 1) ) + min;

    // poison 
    var min = 10;
    var max = 15; 
    var poison = Math.floor(Math.random() * (max - min + 1) ) + min;

    var result = Math.floor((Math.random() * 100) + 1);
    if(result <= 10){
        // Echec
        var help_embed = new Discord.MessageEmbed()
        .setColor("#ffffff")
        .setTitle("Le gobelin rate son attaque")
    }else if (result <= 90){
        // Critique
        var help_embed = new Discord.MessageEmbed()
        .setColor("#1df863")
        .addField("Le gobelin réussit à vous toucher !", ":crossed_swords:" + y + "\n **En plus de cela, il vous inflige du poison pendant 3 tours (si vous recevez encore une fois du poison, les dégâts ne change pas...Mais le compteur est remit à 3 !) **\n:microbe: " + poison + "\n__Note :__ perdre des points de vie par le poison :__ ``?HP- [nombre]``")
    } else {
        // Dégat normaux
        var help_embed = new Discord.MessageEmbed()
        .setColor("#000000")
        .addField("Le gobelin réussit à vous toucher de manière critique !", ":crossed_swords:" + y + "\n **En plus de cela, il vous inflige du poison pendant 3 tours. Étant un coup critique, si la nouvelle valeure(celle-ci) est plus bléssante que l'ancienne. Alors vous appliquerez ces dégâts de poison à partir de maintenant.** \n:microbe: " + poison)
    }
    message.channel.send(help_embed);
} 

if(message.content.toLowerCase() === préfix + "a attaque"){
    var min = 30;
    var max = 40; 
    var y = Math.floor(Math.random() * (max - min + 1) ) + min;

    
    var min = 10;
    var max = 20; 
    var malus = Math.floor(Math.random() * (max - min + 1) ) + min;

    var result = Math.floor((Math.random() * 100) + 1);
    if(result <= 10){
        // Echec
        var help_embed = new Discord.MessageEmbed()
        .setColor("#ffffff")
        .setTitle("L'arbros rate son attaque")
    }else if (result >= 90){
        // Critique
        var help_embed = new Discord.MessageEmbed()
        .setColor("#000000")
        .setImage("https://cdn.discordapp.com/attachments/918139711338475522/940246051686858762/slawomir-maniak-sci-fi-fantasy-rotspawn-creature-art-images.png")
        .addField("Attaque spécial de l'arbros", "**L'arbros décide de vous attraper avec ses grandes branches(comme un calin). Vous perdez à chaque tour **``" + malus + "`` **d'HP(ne prend pas en compte l'armure). Pour vous en défaire, soit quelqu'un doit attaquer l'arbros, soit utilisez la commande ** ``?fuite arbros.``")
    } else {
        // Dégat normaux
        var help_embed = new Discord.MessageEmbed()
        .setColor("#1df863")
        .addField("L'arbros sauvage décide de vous donner un coup", ":crossed_swords:" + y)
    }
    message.channel.send(help_embed);
} 

if(message.content.toLowerCase() === préfix + "fuite arbros"){


    var result = Math.floor((Math.random() * 100) + 1);
    if(result <= 50){
        // Echec
        var help_embed = new Discord.MessageEmbed()
        .setColor("#ffffff")
        .setTitle("Vous n'arrivez pas à échapper à l'arbros et perdez des points de vie.")
    }else if (result <= 101){
        // Critique
        var help_embed = new Discord.MessageEmbed()
        .setColor("#000000")
        .setTitle("Bravo, l'arbros vous as relaché !")
    } 
    message.channel.send(help_embed);
} 

if(message.content.toLowerCase() === préfix + "gh attaque"){
    var min = 35;
    var max = 45; 
    var y = Math.floor(Math.random() * (max - min + 1) ) + min;

    var result = Math.floor((Math.random() * 100) + 1);
    if(result <= 15){
        // Echec
        var help_embed = new Discord.MessageEmbed()
        .setColor("#ffffff")
        .setTitle("L'hibou rate son attaque")
    }else if (result >= 85){
        // Critique
        y = Math.floor(y*1.1);
        var help_embed = new Discord.MessageEmbed()
        .setColor("#000000")
        .setImage("https://i.ytimg.com/vi/OQeB6KsoEVU/maxresdefault.jpg")
        .addField("Le gigantesque hibou vous envoie une rafale de vent qui vous déstabilise", ":crossed_swords:" + y + "\n Vous ne pourrez bloquer la prochaine attaque du prochain tour.")
    } else {
        // Dégat normaux
        var help_embed = new Discord.MessageEmbed()
        .setColor("#1df863")
        .addField("L'hibou vous fonce dessus et vous donne un coup d'aile.", ":crossed_swords:" + y)
    }
    message.channel.send(help_embed);
} 

if(message.content.toLowerCase() === préfix + "g attaque"){
    var min = 60;
    var max = 90; 
    var y = Math.floor(Math.random() * (max - min + 1) ) + min;

    var result = Math.floor((Math.random() * 100) + 1);
    if(result <= 10){
        // Echec
        var help_embed = new Discord.MessageEmbed()
        .setColor("#ffffff")
        .setTitle("Le géant rate son attaque")
    }else if (result >= 90){
        // Critique
        y = Math.floor(y * 1.3);
        var help_embed = new Discord.MessageEmbed()
        .setColor("#000000")
        .addField("Le géant vous donne un coup de pied comme une personne lambda qui jouerait au foot.", ":crossed_swords:" + y)
    } else {
        // Dégat normaux
        var help_embed = new Discord.MessageEmbed()
        .setColor("#1df863")
        .addField("Le géant essaye de vous donner un coup de main", ":crossed_swords:" + y)
    }
    message.channel.send(help_embed);
} 


/// Blocage

if(command === 'gs'){
    if(args[0].toLowerCase() === 'esquive'){
            degat = args[1]
            // Pourcentage blocage
            var min = Math.floor(Math.min(degat*1.2));
            var max = Math.floor(Math.max(degat*1.4)); 
            var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
            armure = 0
            var result = Math.floor((Math.random() * 100) + 1);
            if(result < 65){
                //Il se mange un critique
                var help_embed = new Discord.MessageEmbed()
                .setColor("#000000")
                .setImage("http://ramenparados.com/wp-content/uploads/2018/12/Goblin-Slayer-03.jpg")
                .setTitle("Le gobelin réussit à esquiver votre attaque. Vous êtes vraiment nul.")
            }else if (result < 101){
                // Blocage réussite critique
                var help_embed = new Discord.MessageEmbed()
                .setColor("#ffffff")
                .addField("Le gobelin solitaire ne réussit pas à esquiver l'attaque",":anger: " + y + " || = " + y + " - :shield:" + armure+ " || ")
            } 
            message.channel.send(help_embed);
    } else if(args[0].toLowerCase() === "récompense"){
            id = message.author.id;
            if(bdd[id]){
                if(!args[1]){
                    message.channel.send("met le nombre de joueur.")
                } else {
                nbJoueur = args[1];
                var max_value = Math.floor(35);
                var min_value = Math.floor(30);
                var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;

                var max;
                var min; 
                var LvlLoup = 15;
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
                var max_value = Math.floor(35);
                var min_value = Math.floor(20);
                var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                result = Math.floor(result/reducteur);
                pieceBronze = result;

                var pieceArgent;
                var max_value = Math.floor(1);
                var min_value = Math.floor(0);
                var argent = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                argent = Math.floor(argent/reducteur);

                bdd[id].pieceArgent = bdd[id].pieceArgent + argent
                bdd[id].pieceBronze = bdd[id].pieceBronze + pieceBronze
     
                Savebdd();
                verif(false)
                message.channel.send("Bravo ! Vous avez gagné de l'experience. ")
                message.channel.send("Vous gagnez aussi **" + pieceBronze + "** pièces de bronze et **" + argent + "** pièces d'argent.")
                var embed = new Discord.MessageEmbed()
                .addField("Courbe d'XP",  xpActuel + " ---> " + bdd[id].xp)
                message.channel.send({embeds: [embed]});
                var channel = client.channels.cache.get('939189314779222043');
                channel.send('Commande : ' +  message.content + '\nID utilisateur : <@' + id +'>');
            }
            } else {
                message.channel.send("récompense de rien du tout mon reuf.")
            }
        }
}

if(command === 'a'){
    if(args[0].toLowerCase() === 'blocage'){
            degat = args[1]
            // Pourcentage blocage
            var max = Math.floor(degat*0.80);
            var min = Math.floor(degat*0.70)
            var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
            var armure = 20;
            ancienY = y;
            y = y - armure
            if(y < 0){
                y = 0
            }

            var result = Math.floor((Math.random() * 100) + 1);
            if(result <= 10){
                //Il se mange un critique
                y = Math.floor(y*1.5)
                var help_embed = new Discord.MessageEmbed()
                .setColor("#ffffff")
                .addField("l'arbros prend un coup critique !",  ":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
            }else if (result > 95){
                // Blocage réussite critique
                y = Math.floor(y*0.5)
                var help_embed = new Discord.MessageEmbed()
                .setColor("#000000")
                .addField("L'arbros bloque parfaitement l'attaque.",  ":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
            } else {
                var help_embed = new Discord.MessageEmbed()
                .setColor("#1df863")
                .addField("L'arbros met ses branches en avant et bloque une partie des dégâts.",  ":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
            }
            message.channel.send(help_embed);
    } else if(args[0].toLowerCase() === "récompense"){
        id = message.author.id;
        if(bdd[id]){
            if(!args[1]){
                message.channel.send("met le nombre de joueur.")
            } else {
            nbJoueur = args[1];
            var max_value = Math.floor(35);
            var min_value = Math.floor(30);
            var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;

            var max;
            var min; 
            var LvlLoup = 17;
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
            var max_value = Math.floor(30);
            var min_value = Math.floor(20);
            var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
            result = Math.floor(result/reducteur);
            pieceBronze = result;

            var pieceArgent;
            var max_value = Math.floor(2);
            var min_value = Math.floor(0);
            var argent = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
            argent = Math.floor(argent/reducteur);

            bdd[id].pieceArgent = bdd[id].pieceArgent + argent
            bdd[id].pieceBronze = bdd[id].pieceBronze + pieceBronze

            Savebdd();
            verif(false)
            message.channel.send("Bravo ! Vous avez gagné de l'experience. ")
            message.channel.send("Vous gagnez aussi **" + pieceBronze + "** pièces de bronze et **" + argent + "** pièces d'argent.")
            var embed = new Discord.MessageEmbed()
            .addField("Courbe d'XP",  xpActuel + " ---> " + bdd[id].xp)
            message.channel.send({embeds: [embed]});
            var channel = client.channels.cache.get('939189314779222043');
            channel.send('Commande : ' +  message.content + '\nID utilisateur : <@' + id +'>');
        }
        } else {
            message.channel.send("récompense de rien du tout mon reuf.")
        }
}}

if(command === 'gh'){
    id = message.author.id
    if(bdd[id]){
        if(args[0].toLowerCase() === 'blocage'){
                degat = args[1]
                // Pourcentage blocage
                var max = Math.floor(degat*0.90);
                var min = Math.floor(degat*0.85)
                var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                var armure = 20;
                ancienY = y;
                y = y - armure
                if(y < 0){
                    y = 0
                }

                var result = Math.floor((Math.random() * 100) + 1);
                if(result <= 10){
                    //Il se mange un critique
                    y = Math.floor(y*1.5)
                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#ffffff")
                    .addField("Le grand hibou prend un critique !",  ":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
                }else if (result > 95){
                    // Blocage réussite critique
                    y = Math.floor(y*0.5)
                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#000000")
                    .setTitle("L'hibou esquive l'attaque !")
                } else {
                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#1df863")
                    .addField("L'hibou bloque difficilement l'attaque.",  ":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
                }
                message.channel.send(help_embed);
        } else if(args[0].toLowerCase() === "récompense"){
            id = message.author.id;
            if(bdd[id]){
                if(!args[1]){
                    message.channel.send("met le nombre de joueur.")
                } else {
                nbJoueur = args[1];
                var max_value = Math.floor(35);
                var min_value = Math.floor(30);
                var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;

                var max;
                var min; 
                var LvlLoup = 18;
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
                var max_value = Math.floor(35);
                var min_value = Math.floor(20);
                var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                result = Math.floor(result/reducteur);
                pieceBronze = result;

                var pieceArgent;
                var max_value = Math.floor(1);
                var min_value = Math.floor(0);
                var argent = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                argent = Math.floor(argent/reducteur);

                bdd[id].pieceArgent = bdd[id].pieceArgent + argent
                bdd[id].pieceBronze = bdd[id].pieceBronze + pieceBronze
    
                Savebdd();
                verif(false)
                message.channel.send("Bravo ! Vous avez gagné de l'experience. ")
                message.channel.send("Vous gagnez aussi **" + pieceBronze + "** pièces de bronze et **" + argent + "** pièces d'argent.")
                var embed = new Discord.MessageEmbed()
                .addField("Courbe d'XP",  xpActuel + " ---> " + bdd[id].xp)
                message.channel.send({embeds: [embed]});
                var channel = client.channels.cache.get('939189314779222043');
                channel.send('Commande : ' +  message.content + '\nID utilisateur : <@' + id +'>');
            }
            } else {
                message.channel.send("récompense de rien du tout mon reuf.")
            }
        }
    }
}

if(command === 'g'){
    id = message.author.id; 
    if(bdd[id]){
        if(args[0].toLowerCase() === 'blocage'){
                degat = args[1]
                // Pourcentage blocage
                var max = Math.floor(degat*0.90);
                var min = Math.floor(degat*0.85)
                var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                var armure = 5;
                ancienY = y;
                y = y - armure
                if(y < 0){
                    y = 0
                }
                var result = Math.floor((Math.random() * 100) + 1);
                if(result <= 10){
                    //Il se mange un critique
                    y = Math.floor(y*1.5)
                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#ffffff")
                    .addField("Le grand hibou prend un critique !",  ":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
                }else if (result > 95){
                    // Blocage réussite critique
                    y = Math.floor(y*0.5)
                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#000000")
                    .setTitle("L'hibou esquive l'attaque !")
                } else {
                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#1df863")
                    .addField("L'hibou bloque difficilement l'attaque.",  ":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
                }
                message.channel.send(help_embed);
        } else if(args[0].toLowerCase() === "récompense"){
            id = message.author.id;
            if(bdd[id]){
                if(!args[1]){
                    message.channel.send("met le nombre de joueur.")
                } else {
                nbJoueur = args[1];
                var max_value = Math.floor(35);
                var min_value = Math.floor(30);
                var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;

                var max;
                var min; 
                var LvlLoup = 30;
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
                var max_value = Math.floor(20);
                var min_value = Math.floor(10);
                var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                result = Math.floor(result/reducteur);
                pieceBronze = result;

                bdd[id].pieceArgent = bdd[id].pieceArgent + pieceBronze

                Savebdd();
                verif(false)
                message.channel.send("Bravo ! Vous avez gagné de l'experience. ")
                message.channel.send("Vous gagnez aussi **" + result + "** pièces d'argent'.")
                var embed = new Discord.MessageEmbed()
                .addField("Courbe d'XP",  xpActuel + " ---> " + bdd[id].xp)
                message.channel.send({embeds: [embed]});
                var channel = client.channels.cache.get('939189314779222043');
                channel.send('Commande : ' +  message.content + '\nID utilisateur : <@' + id +'>');
            }
            } else {
                message.channel.send("Aucune récompense si tu n'as pas fait ta fiche.")
            }
        }
    }
}   

    
if(message.content.toLowerCase() === préfix + "petite forêt") {
    
    var A = 0; 
    var B = 0; 
    var C = 0; 
    var max_value = Math.floor(2);
    var min_value = Math.floor(1)
    var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
    while(result!=0){  
        var random = Math.floor((Math.random() * 100) + 1);
        if(random < 50){
            A++ // Gobelin solitaire
        } else if (random <= 75){
            B++ // Arbros
        } else {
            C++ // Gigantesque hibou
        }
        result--;
    } 
    var mes = new Discord.MessageEmbed()
    .addField("Vous appercevez des silhouettes se rapprocher de vous...", "<:goblinsolo:943198243238588456> **Goblin solitaire**\nEffectif : " + A + "\n<:Discord_Emote_Maker:943199436857806858> **Arbros**\nEffectif : " + B + "\n<:Hibou:943197675757641818> **Gigantesque hibou**\nEffectif : " + C + "\n```Passif du groupe``` ``Dans la petite forêt, vous ne pouvez tomber sur aucun géant...``")
    .setColor("#1df863")
    .setImage("https://fantasy.bnf.fr/fr/albums/imaginaire-foret/img/introtablette.jpg")
    message.channel.send(mes);

}

if(command === "forêt") {
        if(args[0]){
            var A = 0; 
            var B = 0; 
            var C = 0; 
            var D = 0;
            nbJoueur = args[0] 
            nbMaxjoueur = 1 + parseInt(nbJoueur)
            var max_value = Math.floor(nbMaxjoueur);
            var min_value = Math.floor(nbJoueur)
            var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
            while(result!=0){  
                var random = Math.floor((Math.random() * 100) + 1);
                if(random < 20){
                    A++ // Monstre des marécages
                } else if (random <= 50){
                    B++ // Tigre des marécages
                } else if(random <= 95) {
                    C++ // Petit arbros
                } else {
                    D++ // tortank
                }
                result--;
            } 
            var mes = new Discord.MessageEmbed()
            .addField("Vous appercevez des silhouettes se rapprocher de vous...", "<:goblinsolo:943198243238588456> **Goblin solitaire**\nEffectif : " + A + "\n<:Discord_Emote_Maker:943199436857806858> **Arbros**\nEffectif : " + B + "\n<:Hibou:943197675757641818> **Gigantesque hibou**\nEffectif : " + C + "\n<:gant:943198641017978891>  **Géant**\nEffectif : " + D +"\n```Passif du groupe``` ``Dans cette forêt, vous tombez sur moins de goblin que dans la petite forêt, et il existe un faible pourcentage de malchance de tomber sur un géant...``")
            .setColor("#1df863")
            .setImage("https://fantasy.bnf.fr/fr/albums/imaginaire-foret/img/introtablette.jpg")
            message.channel.send(mes);
        }
}
