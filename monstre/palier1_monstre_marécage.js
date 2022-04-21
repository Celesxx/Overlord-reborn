if(message.content === préfix + "1960"){
    var help_embed = new Discord.MessageEmbed()
    .setTitle("Roi des marécages")
    .setColor("#0D9237")
    .setImage("https://media.discordapp.net/attachments/939189314993139752/939632256165752922/NGdojIZ.png?width=923&height=675")
    .addField(":abacus: Niveau","è_é")
    .addField(":heart: HP","5000")
    .addField(":shield: Armure", "200")
    .addField(":beginner: Passif", "A t-il vraiment besoin d'un passif ?")
    .addField(":crossed_swords: Attaque", "?RM attaque")
    .addField(":shield: Défense", "?RM blocage [dégâts]")
    .addField(":moneybag: Récompense", "?RM récompense")
    message.channel.send(help_embed)
}

if(message.content.toLowerCase() === préfix + "monstre des marécages"){
    var help_embed = new Discord.MessageEmbed()
    .setTitle("Monstre des marécages")
    .setColor("#0D9237")
    .setImage("https://www.journalduparanormal.com/wp-content/uploads/2015/10/la-creature-des-marais.jpg")
    .addField(":abacus: Niveau","7")
    .addField(":heart: HP","90")
    .addField(":shield: Armure", "0")
    .addField(":beginner: Passif", "Lorsqu'il meurt : ?Mort monstre des marécages")
    .addField(":crossed_swords: Attaque", "?MM attaque")
    .addField(":shield: Défense", "?MM blocage [dégâts]")
    .addField(":moneybag: Récompense", "?MM récompense [nombre de joueur]")
    message.channel.send(help_embed)
}

if(message.content.toLowerCase() === préfix + "tigre des marécages"){
    var help_embed = new Discord.MessageEmbed()
    .setTitle("Tigre des marécages")
    .setColor("#0D9237")
    .setImage("http://st.gde-fon.com/wallpapers_original/437655_art_boloto_monstr_voda_les_chashha_tuman_1680x1050_www.Gde-Fon.com.jpg")
    .addField(":abacus: Niveau","9")
    .addField(":heart: HP","120")
    .addField(":shield: Armure", "5")
    .addField(":beginner: Passif", "Aucun")
    .addField(":crossed_swords: Attaque", "TM attaque")
    .addField(":shield: Défense", "TM blocage [dégâts]")
    .addField(":moneybag: Récompense", "?TM récompense [nombre de joueur]")
    message.channel.send(help_embed)
}

if(message.content.toLowerCase() === préfix + "petit arbros"){
    var help_embed = new Discord.MessageEmbed()
    .setTitle("Petit arbros")
    .setColor("#0D9237")
    .setImage("https://besthqwallpapers.com/Uploads/26-9-2017/21718/thumb2-monster-fantasy-art-forest-darkness.jpg")
    .addField(":abacus: Niveau","9")
    .addField(":heart: HP","100")
    .addField(":shield: Armure", "10")
    .addField(":beginner: Passif", "Aucun")
    .addField(":crossed_swords: Attaque", "?PA attaque")
    .addField(":shield: Défense", "?PA blocage [dégâts]")
    .addField(":moneybag: Récompense", "?PA récompense [nombre de joueur]")
    message.channel.send(help_embed)
}

if(message.content.toLowerCase() === préfix + "tortank"){
    var help_embed = new Discord.MessageEmbed()
    .setTitle("Tortank")
    .setColor("#0D9237")
    .setImage("https://media.discordapp.net/attachments/939189314993139752/939630879498698772/318dfa188093eef801ef750b09885d13.png?width=477&height=675")
    .addField(":abacus: Niveau","12")
    .addField(":heart: HP","130")
    .addField(":shield: Armure", "25")
    .addField(":beginner: Passif", "Aucun")
    .addField(":crossed_swords: Attaque", "?Tortank attaque")
    .addField(":shield: Défense", "?Tortank blocage [dégâts]")
    .addField(":moneybag: Récompense", "?Tortank récompense [nombre de joueur]")
    message.channel.send(help_embed)
}

if(command === 'mm'){
    if(args[0].toLowerCase() === 'blocage'){
            degat = args[1]
            // Pourcentage blocage
            var max = Math.floor(degat*0.95);
            var min = Math.floor(degat*0.90)
            var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
            var result = Math.floor((Math.random() * 100) + 1);

            var armure = 0;
            ancienY = y;
            y = y - armure
            if(result <= 10){
                //Il se mange un critique
                y = Math.floor(y*1.5)
                var help_embed = new Discord.MessageEmbed()
                .setColor("#ffffff")
                .addField("Le monstre des marécages prend un coup critique !", ":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
            }else if (result > 95){
                // Blocage réussite critique
                y = Math.floor(y*0.5)
                var help_embed = new Discord.MessageEmbed()
                .setColor("#000000")
                .addField("Le monstre des marécages réussit par chance à bien bloquer le coup",":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
            } else {
                var help_embed = new Discord.MessageEmbed()
                .setColor("#0D9237")
                .addField("Le monstre des marécages essaye de bloquer avec sa mince couche de peau", ":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
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
            var LvlLoup = 7;
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
            var max_value = Math.floor(22);
            var min_value = Math.floor(18);
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
            message.channel.send({embeds: [embed]});
            var channel = client.channels.cache.get('939189314779222043');
            channel.send('Commande : ' +  message.content + '\nID utilisateur : <@' + id +'>');
        }
        } else {
            message.channel.send("récompense de rien du tout mon reuf.")
        }
    }
}

if(command === 'tm'){
    if(args[0].toLowerCase() === 'blocage'){
            degat = args[1]
            // Pourcentage blocage
            var max = Math.floor(degat*0.90);
            var min = Math.floor(degat*0.85)
            var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
            var result = Math.floor((Math.random() * 100) + 1);

            var armure = 5;
            ancienY = y;
            y = y - armure

            if(result <= 10){
                //Il se mange un critique
                y = Math.floor(y*1.5)
                var help_embed = new Discord.MessageEmbed()
                .setColor("#ffffff")
                .addField("le tigre des marécages prend un coup critique !", ":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
            }else if (result > 95){
                // Blocage réussite critique
                y = Math.floor(y*0.5)
                var help_embed = new Discord.MessageEmbed()
                .setColor("#000000")
                .addField("Le tigre des marécages bloque parfaite l'attaque",":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
            } else {
                var help_embed = new Discord.MessageEmbed()
                .setColor("#0D9237")
                .addField("Le monstre bloque une partie des dégâts", ":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
            }
            message.channel.send(help_embed);
    }else if(args[0].toLowerCase() === "récompense"){
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
            var LvlLoup = 9;
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
            var max_value = Math.floor(27);
            var min_value = Math.floor(22);
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
            message.channel.send({embeds: [embed]});
            var channel = client.channels.cache.get('939189314779222043');
            channel.send('Commande : ' +  message.content + '\nID utilisateur : <@' + id +'>');
        }
        } else {
            message.channel.send("récompense de rien du tout mon reuf.")
        }
    }
}

if(command === 'pa'){
    if(args[0].toLowerCase() === 'blocage'){
            degat = args[1]
            // Pourcentage blocage
            var max = Math.floor(degat*0.90);
            var min = Math.floor(degat*0.85)
            var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
            var result = Math.floor((Math.random() * 100) + 1);
            var armure = 12;
            ancienY = y;
            y = y - armure
            if(result <= 10){
                //Il se mange un critique
                y = Math.floor(y*1.5)
                var help_embed = new Discord.MessageEmbed()
                .setColor("#ffffff")
                .addField("le petit arbros prend un coup critique !",  ":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
            }else if (result > 95){
                // Blocage réussite critique
                y = Math.floor(y*0.5)
                var help_embed = new Discord.MessageEmbed()
                .setColor("#000000")
                .addField("Le petit arbros bloque parfaite l'attaque grâce à ses grands bras.",  ":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
            } else {
                var help_embed = new Discord.MessageEmbed()
                .setColor("#0D9237")
                .addField("Le petit arbros bloque partiellement les dégâts...",  ":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
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
            var LvlLoup = 10;
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
            var max_value = Math.floor(27);
            var min_value = Math.floor(22);
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
            message.channel.send({embeds: [embed]});
            var channel = client.channels.cache.get('939189314779222043');
            channel.send('Commande : ' +  message.content + '\nID utilisateur : <@' + id +'>');
        }
        } else {
            message.channel.send("récompense de rien du tout mon reuf.")
        }
    }
}

if(command === 'tortank'){
    if(args[0]){
        if(args[0].toLowerCase() === 'blocage'){
                degat = args[1]
                // Pourcentage blocage
                var max = Math.floor(degat*0.90);
                var min = Math.floor(degat*0.80)
                var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                var result = Math.floor((Math.random() * 100) + 1);

                var armure = 25;
                ancienY = y;
                y = y - armure

                if(result <= 10){
                    //Il se mange un critique
                    y = Math.floor(y*1.5)
                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#ffffff")
                    .addField("le tortank reçoit un coup létal !", ":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
                }else if (result > 90){
                    // Blocage réussite critique
                    y = Math.floor(y*0.5)
                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#000000")
                    .addField("La carapace du tortank bloque parfaitement les dégâts",  ":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
                } else {
                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#0D9237")
                    .addField("Le tortank ne bouge pas et se contente de subir...",  ":anger: " + y + " || = " + ancienY + " - :shield:" + armure+ " || ")
                }
                message.channel.send(help_embed);

        }  else if(args[0].toLowerCase() === "récompense"){
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
                    var LvlLoup = 12;
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
                    var max_value = Math.floor(27);
                    var min_value = Math.floor(22);
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


if(message.content.toLowerCase() === préfix + "mort monstre des marécages"){
    var min = 20;
    var max = 40; 
    var y = Math.floor(Math.random() * (max - min + 1) ) + min;

    var result = Math.floor((Math.random() * 100) + 1);
    if(result <= 70){
        // Echec
        var help_embed = new Discord.MessageEmbed()
        .setColor("#ffffff")
        .setTitle("Le monstre n'explose pas...Vous pouvez prendre votre récompense.")
    }else {
        var help_embed = new Discord.MessageEmbed()
        .setColor("#000000")
        .addField("Pour une raison inconnue, le monstre explose et vous envoie de l'acide transperçant votre armure. (Pour utiliser son blocage sans prendre en compte l'armure. ?[Commande blocage] [dégâts] perce", ":crossed_swords:" + y)
    }
    message.channel.send(help_embed);

} 

if(message.content.toLowerCase() === préfix + "mm attaque"){
        var min = 30;
        var max = 40; 
        var y = Math.floor(Math.random() * (max - min + 1) ) + min;

        var result = Math.floor((Math.random() * 100) + 1);
        if(result <= 10){
            // Echec
            var help_embed = new Discord.MessageEmbed()
            .setColor("#ffffff")
            .setTitle("Le monstre des marécages rate son attaque")
        }else if (result >= 90){
            // Critique
            y = Math.floor(y * 1.5)
            var help_embed = new Discord.MessageEmbed()
            .setColor("#000000")
            .addField("Le monstre réussit à vous modre la jambe !", ":crossed_swords:" + y)
        } else {
            // Dégat normaux
            var help_embed = new Discord.MessageEmbed()
            .setColor("#0D9237")
            .addField("Le monstre vous donne un coup de griffe", ":crossed_swords:" + y)
        }
        message.channel.send(help_embed);
} 

if(message.content.toLowerCase() === préfix + "pa attaque"){
    var min = 32;
    var max = 42; 
    var y = Math.floor(Math.random() * (max - min + 1) ) + min;

    var result = Math.floor((Math.random() * 100) + 1);
    if(result <= 10){
        // Echec
        var help_embed = new Discord.MessageEmbed()
        .setColor("#ffffff")
        .setTitle("Le petit arbros rate son attaque")
    }else if (result >= 90){
        // Critique
        y = Math.floor(y * 1.5)
        var help_embed = new Discord.MessageEmbed()
        .setColor("#000000")
        .addField("Le petit arbros vous donne un violent coup critique", ":crossed_swords:" + y)
    } else {
        // Dégat normaux
        var help_embed = new Discord.MessageEmbed()
        .setColor("#0D9237")
        .addField("Le petit arbros (qui fait votre taille) vous inflige de petit dégâts", ":crossed_swords:" + y)
    }
    message.channel.send(help_embed);
} 


if(message.content.toLowerCase() === préfix + "tm attaque"){
    var min = 35;
    var max = 45; 
    var y = Math.floor(Math.random() * (max - min + 1) ) + min;

    var result = Math.floor((Math.random() * 100) + 1);
    if(result <= 10){
        // Echec
        var help_embed = new Discord.MessageEmbed()
        .setColor("#ffffff")
        .setTitle("Le tigre des marécages rate son attaque")
    }else if (result >= 90){
        // Critique
        y = Math.floor(y * 1.5)
        var help_embed = new Discord.MessageEmbed()
        .setColor("#000000")
        .addField("Le tigre des marécages vous mord le bras !", ":crossed_swords:" + y)
    } else {
        // Dégat normaux
        var help_embed = new Discord.MessageEmbed()
        .setColor("#0D9237")
        .addField("Le tigre des marécages vous griffe", ":crossed_swords:" + y)
    }
    message.channel.send(help_embed);
} 

if(message.content.toLowerCase() === préfix + "tortank attaque"){
    var min = 13;
    var max = 20; 
    var y = Math.floor(Math.random() * (max - min + 1) ) + min;

    var result = Math.floor((Math.random() * 100) + 1);
    if(result <= 10){
        // Echec
        var help_embed = new Discord.MessageEmbed()
        .setColor("#ffffff")
        .setTitle("Le tortank rate son attaque")
    }else if (result >= 90){
        // Critique
        var special = Math.floor((Math.random() * 100) + 1);
        y = Math.floor(y * 1.5)
        if(special > 70){
            y = y*0.7; 
            var help_embed = new Discord.MessageEmbed()
            .setColor("#000000")
            .addField("Le tortank vous mord et vous paralyse pendant un tours !", ":crossed_swords:" + y) 
            .setImage("https://media.discordapp.net/attachments/939189314993139759/939990322275037274/318dfa188093eef801ef750b09885d13.jpg?width=477&height=675")
        } else {
            var help_embed = new Discord.MessageEmbed()
            .setColor("#000000")
            .addField("Le tortank vous donne un coup de queue !", ":crossed_swords:" + y) 
        }
    } else {
        // Dégat normaux
        var help_embed = new Discord.MessageEmbed()
        .setColor("#0D9237")
        .addField("Le gigantesque lézard vous donne un coup de tête", ":crossed_swords:" + y)
    }
    message.channel.send(help_embed);
} 





if(message.content.toLowerCase() === préfix + "petit marécage") {
    var A = 0; 
    var B = 0; 
    var C = 0; 
    var D = 0;
    var max_value = Math.floor(2);
    var min_value = Math.floor(1)
    var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
    while(result!=0){  
        var random = Math.floor((Math.random() * 100) + 1);
        if(random < 50){
            A++ // Monstre des marécages
        } else if (random <= 70){
            B++ // Tigre des marécages
        } else if(random <= 90) {
            C++ // Petit arbros
        } else {
            D++ // tortank
        }
        
        result--;
    } 
    var mes = new Discord.MessageEmbed()
    .addField("Vous appercevez des silhouettes se rapprocher de vous...", "<:lacreaturedesmarais_1:940161909666250762> **Monstre des marécages**\nEffectif : " + A + "\n<:437655_art_boloto_monstr_voda_le:940160200407662592> **Tigre des marécages**\nEffectif : " + B + "\n<:thumb2monsterfantasyartforestdar:940160766030544978> **Petit arbros**\nEffectif : " + C + "\n<:318dfa188093eef801ef750b09885d13:940159184278781992> **Tortank**\nEffectif : " + D +"\n```Passif du groupe``` ``Ce n'est pas une passive...Mais sachez que tous les mobs sont sur la première ligne. Ici, que de la bagarre.``")
    .setColor("#0D9237")
    .setImage("https://media.discordapp.net/attachments/939189314993139759/939992782045589524/4cDDKpxpygnxUbgY38rS8enDcFI.png")
    message.channel.send(mes);

}

if(command === "petit") {
    if(args[0] === "marécage"){
        if(args[1]){
            var A = 0; 
            var B = 0; 
            var C = 0; 
            var D = 0;
            nbJoueur = args[1] 
            nbMaxjoueur = 1 + parseInt(nbJoueur)
            var max_value = Math.floor(nbMaxjoueur);
            var min_value = Math.floor(nbJoueur)
            var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
            while(result!=0){  
                var random = Math.floor((Math.random() * 100) + 1);
                if(random < 50){
                    A++ // Monstre des marécages
                } else if (random <= 70){
                    B++ // Tigre des marécages
                } else if(random <= 90) {
                    C++ // Petit arbros
                } else {
                    D++ // tortank
                }
                result--;
            } 
            var mes = new Discord.MessageEmbed()
            .addField("Vous appercevez des silhouettes se rapprocher de vous...", "<:lacreaturedesmarais_1:940161909666250762> **Monstre des marécages**\nEffectif : " + A + "\n<:437655_art_boloto_monstr_voda_le:940160200407662592> **Tigre des marécages**\nEffectif : " + B + "\n<:thumb2monsterfantasyartforestdar:940160766030544978> **Petit arbros**\nEffectif : " + C + "\n<:318dfa188093eef801ef750b09885d13:940159184278781992> **Tortank**\nEffectif : " + C +"\n```Passif du groupe``` ``Ce n'est pas une passive...Mais sachez que tous les mobs sont sur la première ligne. Ici, que de la bagarre.``")
            .setColor("#0D9237")
            .setImage("https://media.discordapp.net/attachments/939189314993139759/939992782045589524/4cDDKpxpygnxUbgY38rS8enDcFI.png")
            message.channel.send(mes);
        }
    }
}