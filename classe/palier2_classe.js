if(message.content.toLowerCase() === préfix + "provocation"){    
    id = message.author.id;
    if(bdd[id]){
        if (bdd[id].MAactuel >= 25){
            var nombre = Math.floor((Math.random() * 100) + 1);
            attaque = bdd[id].ATactuel;
            var max_value = Math.floor(1);
            var min_value = Math.floor(2)
            var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;

            var temps = 1;

            id = message.author.id; 
            ancienMana = bdd[id].MAactuel
            if(nombre < 20)
                var y = new Discord.MessageEmbed()
                .setColor("#ffffff")
                .setAuthor("Votre hurlement n'a aucun effet...")
                .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
            else if(nombre < 90){               
                bdd[id].MAactuel = bdd[id].MAactuel - 25
                var y = new Discord.MessageEmbed()
                .setColor("#e21700")
                .addField("**Sort de soutien**","**Vous provoquez l'ennemi via un hurlement **\n Vous affectez :busts_in_silhouette: " + result + " personnes pendant " + temps + " tour (sauf s'il fait autre chose qu'une attaque ciblé).")
                .setImage("https://media.discordapp.net/attachments/940551920332967976/940881363245101067/5072360-anime-armor-blonde-knight-orange-hair-ponytail-shield-sword-woman.png?width=663&height=469")
            } else if (nombre < 101){
                bdd[id].MAactuel = bdd[id].MAactuel - 25
                temps += 1
                var y = new Discord.MessageEmbed()
                .setColor("#000000")
                .addField("**Sort de soutien**","**Provocation critique !**\n Vous affectez :busts_in_silhouette: " + result + " personnes pendant " + temps + " tours (sauf s'il fait autre chose qu'une attaque ciblé).")
                .setImage("https://media.discordapp.net/attachments/940551920332967976/940881363245101067/5072360-anime-armor-blonde-knight-orange-hair-ponytail-shield-sword-woman.png?width=663&height=469")
             }
            nomRP()
            Savebdd()
            message.channel.send(y);
        } else {
            message.channel.send("Vous n'avez plus de mana")
        }
    } else {
        message.channel.send("Tu n'es pas enregistré, ne crie pas sale enfant")
    }
}

if(message.content.toLowerCase() === préfix + "ultime paladin"){    
    id = message.author.id;
    if(bdd[id]){
        if (talkedRecently3.has(message.author.id)) {
            message.channel.send("Merci d'attendre 12h.");
        } else {
            if (bdd[id].MAactuel >= 50){

                total = hpTotalWithArmor()
                HPmax = total.HPvisu;
                HPancien = bdd[id].HPactuel
                equart = HPmax - HPancien 

                var nombre = Math.floor((Math.random() * 100) + 1);

            
                var max_value = Math.floor(equart*0.7);
                var min_value = Math.floor(equart*0.45)
                var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;

                ancienMana = bdd[id].MAactuel
                if(nombre < 5)
                    var y = new Discord.MessageEmbed()
                    .setColor("#ffffff")
                    .setAuthor("Votre ultime ne fonctionne pas...")
                    .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
                else if(nombre < 90){               
                    bdd[id].MAactuel = bdd[id].MAactuel - 50
                    bdd[id].HPactuel = bdd[id].HPactuel + result
                    var y = new Discord.MessageEmbed()
                    .setColor("#1b6ea4")
                    .addField("**Ultime du paladin**","**Vous régénérer une grande partie des HP manquants contre une petite quantitée de mana.**\n ❤️ " + HPancien + " -----> ❤️ " + bdd[id].HPactuel + "\n:sparkles: "+ ancienMana +" -----> :sparkles: " + bdd[id].MAactuel)
                    .setImage("https://i.pinimg.com/originals/86/e3/ef/86e3ef2fa76864edc307bcbe31cb4a4a.gif")
                } else if (nombre < 101){
                    var y = new Discord.MessageEmbed()
                    .setColor("#000000")
                    .addField("**Ultime du paladin**","**C'est un critique ! Vous régénérer une grande partie des HP manquants sans perdre un seul mana**\n ❤️ " + HPancien + " -----> ❤️ " + bdd[id].HPactuel)
                    .setImage("https://i.pinimg.com/originals/86/e3/ef/86e3ef2fa76864edc307bcbe31cb4a4a.gif")
                }
                nomRP()
                Savebdd()
        
                message.channel.send(y);
            } else {
            
                total = hpTotalWithArmor()
                HPmax = total.HPvisu;
                HPancien = bdd[id].HPactuel
                equart = HPmax - HPancien 

                var nombre = Math.floor((Math.random() * 100) + 1);

            
                var max_value = Math.floor(equart*0.7);
                var min_value = Math.floor(equart*0.4)
                var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;

                ancienAT = bdd[id].ATactuel
                if(nombre < 5)
                    var y = new Discord.MessageEmbed()
                    .setColor("#ffffff")
                    .setAuthor("Votre ultime ne fonctionne pas...")
                    .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
                    else if(nombre < 90){               
                        bdd[id].ATactuel = Math.floor(bdd[id].ATactuel/1.5)

                        bdd[id].HPactuel = bdd[id].HPactuel + result
                        var y = new Discord.MessageEmbed()
                        .setColor("#1b6ea4")
                        .addField("**Ultime du paladin**","**Vous régénérer une grande partie des HP manquants contre une partie de votre attaque jusqu'à la fin du combat (à la fin du combat, faites : ?RA)**\n ❤️ " + HPancien + " -----> ❤️ " + bdd[id].HPactuel + "\n:crossed_swords: "+ ancienAT +" -----> :crossed_swords: " + bdd[id].ATactuel)
                        .setImage("https://i.pinimg.com/originals/86/e3/ef/86e3ef2fa76864edc307bcbe31cb4a4a.gif")
                    } else if (nombre < 101){
                        var y = new Discord.MessageEmbed()
                        .setColor("#000000")
                        .addField("**Ultime du paladin**","**C'est un critique ! Vous régénérer une grande partie des HP manquants sans rien perdre**\n ❤️ " + HPancien + " -----> ❤️ " + bdd[id].HPactuel)
                        .setImage("https://i.pinimg.com/originals/86/e3/ef/86e3ef2fa76864edc307bcbe31cb4a4a.gif")
                    }
                nomRP()
                Savebdd()
                message.channel.send(y);
            }
            talkedRecently3.add(message.author.id);
            setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently3.delete(message.author.id);
             }, 43200000);
        
        }
    } else {
        message.channel.send("Tu n'es pas enregistré, ne crie pas sale enfant")
    }
}

// Chevalier


if(message.content.toLowerCase() === préfix + "coup etourdissant"){    
    id = message.author.id;
    if(bdd[id]){
        if (bdd[id].MAactuel >= 20){
            var nombre = Math.floor((Math.random() * 100) + 1);
            attaque = bdd[id].ATactuel;
            var max_value = Math.floor(attaque*0.7);
            var min_value = Math.floor(attaque*0.5)
            var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
            id = message.author.id;
            ancienMana = bdd[id].MAactuel
            if(nombre < 20)
                var y = new Discord.MessageEmbed()
                .setColor("#ffffff")
                .setAuthor("Vous ratez votre coup provocateur...")
                .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
            else if(nombre < 90){               
                bdd[id].MAactuel = bdd[id].MAactuel - 20
                var y = new Discord.MessageEmbed()
                .setColor("#489ed7")
                .addField("**Attaque**","**Vous étourdisser la cible lui faisant passer son tour ! (Si vous voulez étourdir la même cible au prochain tour, alors il faudra attendre 3 tours minimum)** \n :crossed_swords: " + result + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                .setImage("http://haruhichan.com/wp-content/uploads/tatsumi-haruhichan.gif")
            } else if (nombre < 101){
                result = Math.floor(result * 1.5);
                bdd[id].MAactuel = bdd[id].MAactuel - 20
                var y = new Discord.MessageEmbed()
                .setColor("#000000")
                .addField("**Attaque**","**C'est un coup critique ! La cible prend bien plus de dégâts que cela devait l'être et passe son tours (même règles des 3 tours)** \n :crossed_swords: " + result + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                .setImage("http://haruhichan.com/wp-content/uploads/tatsumi-haruhichan.gif")
            }
            nomRP()
            Savebdd()
            message.channel.send(y);
        } else {
            message.channel.send("Vous n'avez plus de mana")
        }
    } else {
        message.channel.send("Tu n'es pas enregistré, étourdit toi")
    }
}


if(message.content.toLowerCase() === préfix + "ultime chevalier"){    
    id = message.author.id;
    if(bdd[id]){
        if (talkedRecently3.has(message.author.id)) {
            message.channel.send("Merci d'attendre 12h.");
        } else {
            var max_value = Math.floor(bdd[id].ATactuel*1.5);
            var min_value = Math.floor(bdd[id].ATactuel*1.2)
            var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;


            var y = new Discord.MessageEmbed()
            .setColor("#489ed7")
            .addField("**Ultime du chevalier**","**Voici donc une compétence qui a 100% de chance de se lancer et qui ne coûte pas une pierre....Votre attaque est imblocable !**\n :crossed_swords: " + result )
            .setImage("https://i.imgur.com/4k1JOyQ.gif")
            message.channel.send(y);

            talkedRecently3.add(message.author.id);
            setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently3.delete(message.author.id);
             }, 43200000);
        
        }
    } else {
        message.channel.send("Tu n'es pas enregistré, ne crie pas sale enfant")
    }
}


// Archer 

if(message.content.toLowerCase() === préfix + "tir perce armure"){    
    id = message.author.id;
    if(bdd[id]){
        if (bdd[id].MAactuel >= 40){
            var nombre = Math.floor((Math.random() * 100) + 1);
            attaque = bdd[id].ATactuel;
            var max_value = Math.floor(attaque*1.5);
            var min_value = Math.floor(attaque*1.2)
            var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
            id = message.author.id;
            ancienMana = bdd[id].MAactuel
            if(nombre < 15)
                var y = new Discord.MessageEmbed()
                .setColor("#ffffff")
                .setAuthor("Vous ratez  votre cible...")
                .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
            else if(nombre < 95){               
                bdd[id].MAactuel = bdd[id].MAactuel - 40
                var y = new Discord.MessageEmbed()
                .setColor("#f8a765")
                .addField("**Attaque**","**Vous tirez une flèche sur une cible et transpercez son armure.** \n :crossed_swords: " + result + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                .setImage("https://www.nautiljon.com/images/description/00/07/1543596772591_image.jpg")
            } else if (nombre < 101){
                result = Math.floor(result * 1.5);
                bdd[id].MAactuel = bdd[id].MAactuel - 40
                var y = new Discord.MessageEmbed()
                .setColor("#000000")
                .addField("**Attaque**","**C'est un coup critique ! Votre cible cubit de lourds dégâts en plus que cela pénètre son armure !** \n :crossed_swords: " + result + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                .setImage("https://www.nautiljon.com/images/description/00/07/1543596772591_image.jpg")
            }
            nomRP()
            Savebdd()
            message.channel.send(y);
        } else {
            message.channel.send("Vous n'avez plus de mana")
        }
    } else {
        message.channel.send("Perce toi le fion")
    }
}


if(message.content.toLowerCase() === préfix + "ultime archer"){    
    id = message.author.id;
    if(bdd[id]){
        if (talkedRecently3.has(message.author.id)) {
            message.channel.send("Merci d'attendre 12h.");
        } else {
            if (bdd[id].MAactuel > 50){

                var max_value = Math.floor(bdd[id].ATactuel*1.4);
                var min_value = Math.floor(bdd[id].ATactuel*1.1)
                var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                ancienMana = bdd[id].MAactuel
                var nombre = Math.floor((Math.random() * 100) + 1);

                if(nombre < 5){
                    verif = false;
                    var y = new Discord.MessageEmbed()
                    .setColor("#ffffff")
                    .setAuthor("Votre ultime ne fonctionne pas...")
                    .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
                } else if (nombre < 95){
                    verif = true 
                    bdd[id].MAactuel = bdd[id].MAactuel - 50

                    var y = new Discord.MessageEmbed()
                    .setColor("#f8a765")
                    .addField("**Ultime de l'archer**","**Vous tirez une pluie de flèche qui touche tous les ennemis qu'importe leur position !**\n :bow_and_arrow: " + result + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                    .setImage("https://media.discordapp.net/attachments/939980293253759036/941035102044028998/tenor_2.gif")

                } else {
                    bdd[id].MAactuel = bdd[id].MAactuel - 50
                    verif = true 
                    var max_value = Math.floor(bdd[id].ATactuel*1.4);
                    var min_value = Math.floor(bdd[id].ATactuel*1.1)
                    var result2 = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;

                    var y = new Discord.MessageEmbed()
                    .setColor("#f8a765")
                    .addField("**Ultime de l'archer**","**Coup critique ! VVous tirez deux pluies de flèches qui touche tous les ennemis qu'importe leur position !**\n :bow_and_arrow: " + result  + "\n :bow_and_arrow: " + result2 + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                    .setImage("https://media.discordapp.net/attachments/939980293253759036/941035102044028998/tenor_2.gif")
                }
                message.channel.send(y);
                nomRP()
                Savebdd()
                if(verif){
                    talkedRecently3.add(message.author.id);
                    setTimeout(() => {
                    // Removes the user from the set after a minute
                    talkedRecently3.delete(message.author.id);
                    }, 43200000);
                }
            } else {
                message.channel.send("Vous n'avez pas assez de mana...")
            }
        }
    } else {
        message.channel.send("Tu n'es pas enregistré, ne crie pas sale enfant")
    }
}

if(command === "bandage"){    
    id = message.author.id;
    if(bdd[id]){
        if (bdd[id].MAactuel >= 30){
            if(args[0]) {
                joueur = getUserFromMention(args[0]);
            } else {
                joueur = id;
            }
            HPancien = bdd[joueur].HPactuel;
            total = hpTotalWithArmorUser(joueur)
            HPmax = total.HPvisu;
            equart = HPmax - HPancien 

            var nombre = Math.floor((Math.random() * 100) + 1);

        
            var max_value = Math.floor(40);
            var min_value = Math.floor(20);
            var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;


            ancienMana = bdd[joueur].MAactuel
            
            if(nombre < 15)
                var y = new Discord.MessageEmbed()
                .setColor("#ffffff")
                .setAuthor("Vous ratez  votre sort...")
                .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
            else if(nombre < 101){               
                bdd[id].MAactuel = bdd[id].MAactuel - 30
                bdd[joueur].HPactuel = bdd[joueur].HPactuel + result;
                if(bdd[joueur].HPactuel > total.HPvisu){
                    bdd[joueur].HPactuel = total.HPvisu
                }
                var y = new Discord.MessageEmbed()
                .setColor("#f8a765")
                .addField("**Sort de soins**","**Vous appliquez un bandage enchanté sur "+ bdd[id].prenom + ". Cela lui redonne un peu de HP et le guérit de tout poison ou saignement.** \n :mending_heart: " + result + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                .setImage("https://wallpaperaccess.com/full/6042596.jpg")
            } 

            nomRP()
            Savebdd()
            message.channel.send(y);
        } else {
            message.channel.send("Vous n'avez plus de mana")
        }
    } else {
        message.channel.send("bande.")
    }
}
if(command === 'tir'){
    id = message.author.id;
    if(!args[0]){
        if(bdd[id]){
            // Archer normal
            var image = "https://cache.desktopnexus.com/thumbseg/1696/1696589-bigthumbnail.jpg"
            var couleur = "#e21700"
            var autreFleche = false
            var boom = false
            if(bdd[id].lvl >= 31 && bdd[id].classe == "maître_archer"){
                image = "https://a-static.besthdwallpaper.com/pixiv-fantasia-anime-girl-bow-arrow-wallpaper-2048x1536-83113_26.jpg"
                couleur = "#ac6719"
                var nombre = Math.floor((Math.random() * 100) + 1);
                if(nombre >= 90){
                    autreFleche = true;
                }
            } else if (bdd[id].lvl >= 31 && bdd[id].classe == "bombardier"){
                image = "https://c4.wallpaperflare.com/wallpaper/573/405/184/kantai-collection-archer-anime-girls-ponytail-wallpaper-preview.jpg"
                couleur = "#e95715"
                var nombre = Math.floor((Math.random() * 100) + 1);
                if(nombre >= 90){
                    boom = true;
                }
            }


            var nombre = Math.floor((Math.random() * 100) + 1);
            id = message.author.id;
            attaque = bdd[id].ATactuel;
            var max_value = Math.floor(attaque*1.4);
            var min_value = Math.floor(attaque*1.1)
            var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
            if(nombre < 15){
                boom = false;
                autreFleche = false;
                var y = new Discord.MessageEmbed()
                .setColor("#ffffff")
                .setAuthor("Votre flèche ne touche pas la cible")
                .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
         } else if(nombre < 85){
                var y = new Discord.MessageEmbed()
                .setColor(couleur)
                .addField("**Attaque**","**Vous envoyez une flèche sur votre cible** \n :bow_and_arrow:" + result)
                .setImage(image)
            } else if (nombre < 101){
                result = Math.floor(result * 1.5);
                var y = new Discord.MessageEmbed()
                .setColor("#000000")
                .addField("**Attaque**","**Coup critique ! Vous lui infligez de gros dégâts** \n :bow_and_arrow:" + result)
                .setImage(image)
            }
            message.channel.send(y);
            if(autreFleche){
                var max_value = Math.floor(result*0.7);
                var min_value = Math.floor(result*0.4);
                var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                var y = new Discord.MessageEmbed()
                .setColor("#000000")
                .addField("**Attaque bonus**","**Après avoir tiré votre première flèche, vous réussisez à en envouyer une autre sur la même cible !** \n :bow_and_arrow:" + result)
                message.channel.send(y)
            }else if(boom){
                var max_value = Math.floor(result*0.4);
                var min_value = Math.floor(result*0.2);
                var result1 = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                var max_value = Math.floor(result*0.4);
                var min_value = Math.floor(result*0.2);
                var result2 = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;

                var y = new Discord.MessageEmbed()
                .setColor("#000000")
                .addField("**Attaque bonus**","**Votre flèche va exploser et infliger des dégâts perces armures à la cible à gauche et à droite de votre cible d'origine.** \n **Cible à gauche :shield: :boom:**``" + result1 + "``\n**Cible à droite :shield: :boom:**``" + result2 + "\n``**Note :** Si la cible est seule...Alors personne ne prend des dégâts. Tout comme si la cible n'a pas d'adversaire à sa gauche (avant elle) ou bien à sa droite, alors là aussi, ça ne fera pas de dégâts.")
                message.channel.send(y)
            }
        } else {
            message.channel.send("plante toi, sur le champs.")
        }
    }
}
// Assassin 

if(message.content.toLowerCase() === préfix + "camouflage"){    
    id = message.author.id;
    if(bdd[id]){
        if(bdd[id].MAactuel < 40){
            message.channel.send("vous n'avez pas assez de mana.")
        } else {
            ancienMana = bdd[id].MAactuel
            bdd[id].MAactuel = bdd[id].MAactuel - 40
            var y = new Discord.MessageEmbed()
            .setColor("#ff4444")
            .setTitle("Vous vous disimulez dans l'obscurité petit à petit...")
            .setDescription("Pendant 3 tours grand max, personne ne peus vous attaquer (sauf une attaque de zone). Si vous attaquez vous sortez de votre invisibilité\n:sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
            .setImage("https://vignette.wikia.nocookie.net/swordartonline/images/2/24/SAO_E06.png/revision/latest?cb=20140328034307")
            message.channel.send(y);
            Savebdd()
            nomRP()
        }

        
    } else {
        message.channel.send("Tu n'es pas enregistré, cache toi ailleurs")
    }
}


if(message.content.toLowerCase() === préfix + "ultime assassin"){    
    id = message.author.id;
    if(bdd[id]){
        if (talkedRecently3.has(message.author.id)) {
            message.channel.send("Merci d'attendre 12h.");
        } else {
            if (bdd[id].MAactuel > 50){
                ancienMana = bdd[id].MAactuel
                var nombre = Math.floor((Math.random() * 100) + 1);

                if(nombre < 5){
                    verif = false;
                    var y = new Discord.MessageEmbed()
                    .setColor("#ffffff")
                    .setAuthor("Votre ultime ne fonctionne pas...")
                    .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
                } else if (nombre < 101){
                    verif = true 
                    bdd[id].MAactuel = bdd[id].MAactuel - 50

                    var y = new Discord.MessageEmbed()
                    .setColor("#ff4444")
                    .addField("**Ultime de 'l'assassin**","**Compétence uniquement utilisable lorsque l'on reçoit une attaque. Elle permet d'esquiver l'attaque grâce à un déplacement instantané.**\n:sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                    .setImage("https://38.media.tumblr.com/9447d9e8393d246bbdea9e97520ad021/tumblr_nbu3riTwxZ1rgxltgo1_500.gif")

                } 
                message.channel.send(y);
                nomRP()
                Savebdd()
                if(verif){
                    talkedRecently3.add(message.author.id);
                    setTimeout(() => {
                    // Removes the user from the set after a minute
                    talkedRecently3.delete(message.author.id);
                    }, 43200000);
                }
            } else {
                message.channel.send("Vous n'avez pas assez de mana...")
            }
        }
    } else {
        message.channel.send("Tu n'es pas enregistré, cache toi")
    }
}

if(message.content.toLowerCase() === préfix + "coup fatal"){    
    id = message.author.id;
    if(bdd[id]){
        if (bdd[id].MAactuel >= 25){
            var nombre = Math.floor((Math.random() * 100) + 1);
            attaque = bdd[id].ATactuel;
            var max_value = Math.floor(attaque*2.1);
            var min_value = Math.floor(attaque*1.8)
            var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
            id = message.author.id;
            ancienMana = bdd[id].MAactuel
            if(nombre < 65)
                var y = new Discord.MessageEmbed()
                .setColor("#ffffff")
                .setAuthor("Vous ratez  votre cible...")
                .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
            else if(nombre < 101){               
                bdd[id].MAactuel = bdd[id].MAactuel - 25;
                var y = new Discord.MessageEmbed()
                .setColor("#ff4444")
                .addField("**Attaque**","**Vous donnez un coup de sabre dans un point vital de votre cible** \n :crossed_swords: " + result + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                .setImage("https://64.media.tumblr.com/d0bb21ba12720d57a19b127ea2c84856/tumblr_nwn4efVryq1rvr6u1o9_400.gif")
            } 
            nomRP()
            Savebdd()
            message.channel.send(y);
        } else {
            message.channel.send("Vous n'avez plus de mana")
        }
    } else {
        message.channel.send("No")
    }
}

// Sorcier


if(command === "heal"){    
    id = message.author.id;
    if(bdd[id]){
        if(bdd[id].lvl > 15){
            if (bdd[id].MAactuel >= 40){
                if(args[0]) {
                    joueur = getUserFromMention(args[0]);
                } else {
                    joueur = id;
                }
                HPancien = bdd[joueur].HPactuel;
                total = hpTotalWithArmorUser(joueur)
                HPmax = total.HPvisu;
                equart = HPmax - HPancien 
                if(bdd[id].classe == "sorcier"){
                    equart = equart*0.15
                    couleur = "#6fd9f2"
                } else {
                    equart = equart*0.07
                    couleur = "#098aa9"
                }

                var nombre = Math.floor((Math.random() * 100) + 1);
                var max_value = Math.floor(70);
                var min_value = Math.floor(50);
                var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                result = Math.floor(result + equart)
    
                ancienMana = bdd[joueur].MAactuel
                
                if(nombre < 15)
                    var y = new Discord.MessageEmbed()
                    .setColor("#ffffff")
                    .setAuthor("Vous ratez  votre sort...")
                    .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
                else if(nombre < 101){               
                    bdd[id].MAactuel = bdd[id].MAactuel - 40
                    bdd[joueur].HPactuel = Math.floor(bdd[joueur].HPactuel + result);
                    if(bdd[joueur].HPactuel > total.HPvisu){
                        bdd[joueur].HPactuel = Math.floor(total.HPvisu)
                    }
                    var y = new Discord.MessageEmbed()
                    .setColor(couleur)
                    .addField("**Sort de soins**","**Vous appliquez un sort de soins sur "+ bdd[id].prenom + ". Cela lui redonne des HP.** \n :mending_heart: " + result + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                    .setImage("https://i.pinimg.com/736x/54/38/c5/5438c5e35e49f4b6d591d67b45df7bab--mtg-art-character-ideas.jpg")
                } 
    
                nomRP()
                Savebdd()
                message.channel.send(y);
            } else {
                message.channel.send("Vous n'avez plus de mana")
            }
        }
    } else {
        message.channel.send("Soigne ta débilité.")
    }
}


if(message.content.toLowerCase() === préfix + "boule de feu"){    
    id = message.author.id;
    if(bdd[id]){
        if(bdd[id].lvl > 26){
            if (bdd[id].MAactuel >= 60){

                if(bdd[id].classe == "sorcier"){
                    var max_value = Math.floor(bdd[id].ATactuel * 1.95);
                    var min_value = Math.floor(bdd[id].ATactuel * 1.7);
                    var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                    couleur = "#6fd9f2"
                    echec =  10
                } else {

                    var max_value = Math.floor(bdd[id].ATactuel * 2.2);
                    var min_value = Math.floor(bdd[id].ATactuel * 1.9);
                    var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                    couleur = "#098aa9"
                    echec = 30
                }
                var nombre = Math.floor((Math.random() * 100) + 1);

                ancienMana = bdd[id].MAactuel
                if(nombre < echec){
                    var y = new Discord.MessageEmbed()
                    .setColor("#ffffff")
                    .setAuthor("Vous ratez  votre sort...")
                    .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
              
                }else if(nombre < 101){               
                    bdd[id].MAactuel = bdd[id].MAactuel - 60
                    var y = new Discord.MessageEmbed()
                    .setColor(couleur)
                    .addField("**Attaque**","**Vous envoyez une boule de feu sur la cible**\n:fire: " + result +"\n:sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                    .setImage("https://images-ext-1.discordapp.net/external/QL8E4FehJTpNwa-ZD4iIMItvCBOM4fehBw2eHmN64ss/https/c.tenor.com/Z3rVgwzJj2wAAAAC/fire-todoroki.gif")
                } 
                message.channel.send(y);
                nomRP()
                Savebdd()
            } else {
                message.channel.send("Vous n'avez plus de mana")
            }
        }
    } else {
        message.channel.send("Soigne ta débilité.")
    }
}

// Sorcier 


if(message.content.toLowerCase() === préfix + "ultime sorcier"){    
    id = message.author.id;
    if(bdd[id]){
        if (talkedRecently3.has(message.author.id)) {
            message.channel.send("Merci d'attendre 12h.");
        } else {

            total = hpTotalWithArmor()
            MAmax = total.MAvisu;
            MAancien = bdd[id].MAactuel
            equart = MAmax - MAancien 

            var nombre = Math.floor((Math.random() * 100) + 1);

        
            var max_value = Math.floor(equart*0.65);
            var min_value = Math.floor(equart*0.4)
            var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
            if(nombre < 5){
                var y = new Discord.MessageEmbed()
                .setColor("#ffffff")
                .setAuthor("Votre ultime ne fonctionne pas...")
                .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
        }else if(nombre < 101){               
                bdd[id].MAactuel = bdd[id].MAactuel + result
                var y = new Discord.MessageEmbed()
                .setColor("#1b6ea4")
                .addField("**Ultime du sorcier**","**Vous régénérez une grande partie de vos manas manquants**\n :sparkles: "+ MAancien +" -----> :sparkles: " + bdd[id].MAactuel)
                .setImage("https://c.tenor.com/sekIq9ecmKUAAAAd/overlord-bunny.gif")
            } 
            nomRP()
            Savebdd()
            message.channel.send(y);
            
            talkedRecently3.add(message.author.id);
            setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently3.delete(message.author.id);
             }, 43200000);
        
        }
    } else {
        message.channel.send("Tu n'es pas enregistré, ne crie pas sale enfant")
    }
}


if(message.content.toLowerCase() === préfix + "ultime sorcier t"){    
    id = message.author.id;
    if(bdd[id]){
        if(bdd[id].MAactuel > 50){
            if (talkedRecently3.has(message.author.id)) {
                message.channel.send("Merci d'attendre 12h.");
            } else {

                MAancien = bdd[id].MAactuel

                var nombre = Math.floor((Math.random() * 100) + 1);
                var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                if(nombre < 10){
                    var y = new Discord.MessageEmbed()
                    .setColor("#ffffff")
                    .setAuthor("Votre ultime ne fonctionne pas...")
                    .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
                }else if(nombre < 101){               
                    bdd[id].MAactuel = bdd[id].MAactuel - 50
                    var y = new Discord.MessageEmbed()
                    .setColor("#098aa9")
                    .addField("**Ultime du sorcier ténébreux**","**Cible jusqu'à 3 entités maximum ! (ne leur consomme pas de tour d'attaque). Elles vont l'une après l'autre attaquer un de leur camarade aléatoirement. Si la cible est seule et qu'elle est un monstre, elle s'attaque toute seul. Si c'est un joueur, alors rien ne se passe.**\n :sparkles: "+ MAancien +" -----> :sparkles: " + bdd[id].MAactuel)
                    .setImage("https://thumbs.gfycat.com/MadeupUnhealthyAllosaurus-max-1mb.gif")
                } 
                nomRP()
                Savebdd()
                message.channel.send(y);
                
                talkedRecently3.add(message.author.id);
                setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently3.delete(message.author.id);
                }, 43200000);
            
            }
        } else {
            message.channel.send("Manque de mana")
        }
    } else {
        message.channel.send("Tu n'es pas enregistré, ne crie pas sale enfant")
    }
}