// Maître archer 

if(message.content.toLowerCase() === préfix + "maître loup"){    
    id = message.author.id;
    if(bdd[id]){

            total = hpTotalWithArmor()
            armureHP = total.ARvisu/0.5
            armureHP = armureHP*5
            HP = Math.floor((total.HPvisu*0.7 + armureHP*0.3)*0.4);

            manaAT = total.MAvisu
            manaAT = manaAT/5
            AT = Math.floor((total.ATvisu*0.7 + manaAT*0.3)*0.7);
            
            arHP = total.HPvisu/10
            AR = Math.floor((total.ARvisu*0.7 +arHP*0.3)*0.2);
            identifiant = "Loup de " + bdd[id].prenom;
            var help_embed = new Discord.MessageEmbed()
            .setTitle(identifiant)
            .setColor("#ac6719")
            .setImage("https://wallpaperaccess.com/full/1941358.png")
            .addField(":abacus: Niveau",bdd[id].lvl)
            .addField(":heart: HP",HP)
            .addField(":shield: Armure", AR)
            .addField(":crossed_swords: Attaque", identifiant + " attaque")
            .addField(":shield: Défense",  identifiant + " blocage")
            .addField("Note", "Si le loup n'est pas mort à la fin du combat, merci de le supprimer : ``?supprimer " + identifiant + "``")
            message.channel.send(help_embed)
            liste_mobs[identifiant] = {
                at : AT,
                ar : AR,
                HP : HP,
                lvl : bdd[id].lvl
            }
            SaveMob()
    } else {
        message.channel.send("Tu n'es pas enregistré, ne crie pas sale enfant")
    }
}

if(SuperArgs[0].toLowerCase() ==  '-loup' && SuperArgs[1].toLowerCase() == 'de' && SuperArgs[2] == bdd[message.author.id].prenom){    
    id = message.author.id;
    mobs = "Loup de " + bdd[id].prenom;
    if(!liste_mobs[mobs]){
        message.channel.send("Votre loup est mort ou n'a pas été invoqué.")
    } else {
        if(SuperArgs[3].toLowerCase() == 'blocage') {


            nbDegats = SuperArgs[4]
            var random = Math.floor((Math.random() * 100) + 1);
            if(nbDegats*1.2 < liste_mobs[mobs].HP){


                if(random <= 80) {
                    var max = Math.floor(nbDegats*0.95);
                    var min = Math.floor(nbDegats*0.85)
                    var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                    var result = Math.floor((Math.random() * 100) + 1);

                    var armure = liste_mobs[mobs].ar;
                    if(SuperArgs[5] == 'perce'){
                        armure = 0;
                    }
                    if(result <= 15){
                        //Il se mange un critique
                        degat = Math.floor(y*1.7)

                        HP = liste_mobs[mobs].HP
            
                        liste_mobs[mobs].HP = liste_mobs[mobs].HP + armure - degat
                        degatAvecArmure = degat
                        degat = degat-armure

                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#ffffff")
                        .addField("**Défense**","**Votre loup prend un coup critique ! ** \n|| :anger:-" + degatAvecArmure + " + 🛡️ " + armure + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + liste_mobs[mobs].HP)
                    }else if (result > 95){
                        // Blocage réussite critique
                        degat = Math.floor(y*0.5)
                        HP = liste_mobs[mobs].HP
            
                        liste_mobs[mobs].HP = liste_mobs[mobs].HP + armure - degat
                        degatAvecArmure = degat
                        degat = degat-armure
                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#000000")
                        .addField("**Défense**", "**Votre loup bloque parfaitement l'attaque !** \n|| :anger:-" + degatAvecArmure + " + 🛡️ " + armure + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + liste_mobs[mobs].HP)
                    } else {

                        degat = Math.floor(y)
                        HP = liste_mobs[mobs].HP

                        liste_mobs[mobs].HP = liste_mobs[mobs].HP + armure - degat
                        degatAvecArmure = degat
                        degat = degat-armure

                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#ac6719")
                        .addField("**Défense**","**Votre famillier vient à bloquer partiellement les dégâts** \n|| :anger:-" + degatAvecArmure + " + 🛡️ " + armure + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + liste_mobs[mobs].HP)
                    }
                    message.channel.send(help_embed);
                } else {
                    var max = Math.floor(nbDegats*1.5);
                    var min = Math.floor(nbDegats*1.3)
                    var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                    var result = Math.floor((Math.random() * 100) + 1);
                    var armure = liste_mobs[mobs].ar;
                    if(SuperArgs[5] == 'perce'){
                        armure = 0;
                    }


                    if(result < 65){
                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#ac6719")
                        .addField("**Défense**","**Votre famillier vient à esquiver l'attaque !**")
                    } else {
                        degat = Math.floor(y)
                        HP = liste_mobs[mobs].HP
    
                        liste_mobs[mobs].HP = liste_mobs[mobs].HP + armure - degat
                        degatAvecArmure = degat
                        degat = degat-armure
                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#ffffff")
                        .addField("**Défense**","**Votre famillier rate son esquive !** \n|| :anger:-" + degatAvecArmure + " + 🛡️ " + armure + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + liste_mobs[mobs].HP)
                    }
                    message.channel.send(help_embed)
                } 


            } else if(nbDegats < liste_mobs[mobs].HP) {


                    if(random <= 50) {
                        var max = Math.floor(nbDegats*0.95);
                        var min = Math.floor(nbDegats*0.85)
                        var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                        var result = Math.floor((Math.random() * 100) + 1);

                        var armure = liste_mobs[mobs].ar;
                        if(SuperArgs[5] == 'perce'){
                            armure = 0;
                        }
                        if(result <= 15){
                            //Il se mange un critique
                            degat = Math.floor(y*1.7)

                            HP = liste_mobs[mobs].HP
                
                            liste_mobs[mobs].HP = liste_mobs[mobs].HP + armure - degat
                            degatAvecArmure = degat
                            degat = degat-armure

                            var help_embed = new Discord.MessageEmbed()
                            .setColor("#ffffff")
                            .addField("**Défense**","**Votre loup prend un coup critique ! ** \n|| :anger:-" + degatAvecArmure + " + 🛡️ " + armure + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + liste_mobs[mobs].HP)
                        }else if (result > 95){
                            // Blocage réussite critique
                            degat = Math.floor(y*0.5)
                            HP = liste_mobs[mobs].HP
                
                            liste_mobs[mobs].HP = liste_mobs[mobs].HP + armure - degat
                            degatAvecArmure = degat
                            degat = degat-armure
                            var help_embed = new Discord.MessageEmbed()
                            .setColor("#000000")
                            .addField("**Défense**", "**Votre loup bloque parfaitement l'attaque !** \n|| :anger:-" + degatAvecArmure + " + 🛡️ " + armure + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + liste_mobs[mobs].HP)
                        } else {

                            degat = Math.floor(y)
                            HP = liste_mobs[mobs].HP

                            liste_mobs[mobs].HP = liste_mobs[mobs].HP + armure - degat
                            degatAvecArmure = degat
                            degat = degat-armure

                            var help_embed = new Discord.MessageEmbed()
                            .setColor("#ac6719")
                            .addField("**Défense**","**Votre famillier vient à bloquer partiellement les dégâts** \n|| :anger:-" + degatAvecArmure + " + 🛡️ " + armure + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + liste_mobs[mobs].HP)
                        }
                        message.channel.send(help_embed);
                } else {
                    var max = Math.floor(nbDegats*1.5);
                    var min = Math.floor(nbDegats*1.3)
                    var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                    var result = Math.floor((Math.random() * 100) + 1);
                    var armure = liste_mobs[mobs].ar;
                    if(SuperArgs[5] == 'perce'){
                        armure = 0;
                    }


                    if(result < 65){
                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#ac6719")
                        .addField("**Défense**","**Votre famillier vient à esquiver l'attaque !**")
                    } else {
                        degat = Math.floor(y)
                        HP = liste_mobs[mobs].HP
    
                        liste_mobs[mobs].HP = liste_mobs[mobs].HP + armure - degat
                        degatAvecArmure = degat
                        degat = degat-armure
                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#ffffff")
                        .addField("**Défense**","**Votre famillier rate son esquive !** \n|| :anger:-" + degatAvecArmure + " + 🛡️ " + armure + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + liste_mobs[mobs].HP)
                    }
                    message.channel.send(help_embed)
                } 


            } else {


                    if(random <= 20) {
                    var max = Math.floor(nbDegats*0.95);
                    var min = Math.floor(nbDegats*0.85)
                    var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                    var result = Math.floor((Math.random() * 100) + 1);

                    var armure = liste_mobs[mobs].ar;
                    if(SuperArgs[5] == 'perce'){
                        armure = 0;
                    }
                    if(result <= 15){
                        //Il se mange un critique
                        degat = Math.floor(y*1.7)

                        HP = liste_mobs[mobs].HP
            
                        liste_mobs[mobs].HP = liste_mobs[mobs].HP + armure - degat
                        degatAvecArmure = degat
                        degat = degat-armure

                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#ffffff")
                        .addField("**Défense**","**Votre loup prend un coup critique ! ** \n|| :anger:-" + degatAvecArmure + " + 🛡️ " + armure + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + liste_mobs[mobs].HP)
                    }else if (result > 95){
                        // Blocage réussite critique
                        degat = Math.floor(y*0.5)
                        HP = liste_mobs[mobs].HP
            
                        liste_mobs[mobs].HP = liste_mobs[mobs].HP + armure - degat
                        degatAvecArmure = degat
                        degat = degat-armure
                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#000000")
                        .addField("**Défense**", "**Votre loup bloque parfaitement l'attaque !** \n|| :anger:-" + degatAvecArmure + " + 🛡️ " + armure + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + liste_mobs[mobs].HP)
                    } else {

                        degat = Math.floor(y)
                        HP = liste_mobs[mobs].HP

                        liste_mobs[mobs].HP = liste_mobs[mobs].HP + armure - degat
                        degatAvecArmure = degat
                        degat = degat-armure

                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#ac6719")
                        .addField("**Défense**","**Votre famillier vient à bloquer partiellement les dégâts** \n|| :anger:-" + degatAvecArmure + " + 🛡️ " + armure + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + liste_mobs[mobs].HP)
                    }
                    message.channel.send(help_embed);
                } else {
                    var max = Math.floor(nbDegats*1.5);
                    var min = Math.floor(nbDegats*1.3)
                    var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                    var result = Math.floor((Math.random() * 100) + 1);
                    var armure = liste_mobs[mobs].ar;
                    if(SuperArgs[5] == 'perce'){
                        armure = 0;
                    }


                    if(result < 65){
                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#ac6719")
                        .addField("**Défense**","**Votre famillier vient à esquiver l'attaque !**")
                    } else {
                        degat = Math.floor(y)
                        HP = liste_mobs[mobs].HP
    
                        liste_mobs[mobs].HP = liste_mobs[mobs].HP + armure - degat
                        degatAvecArmure = degat
                        degat = degat-armure
                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#ffffff")
                        .addField("**Défense**","**Votre famillier rate son esquive !** \n|| :anger:-" + degatAvecArmure + " + 🛡️ " + armure + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + liste_mobs[mobs].HP)
                    }
                    message.channel.send(help_embed)
                } 
            }
            if(liste_mobs[mobs].HP <= 0){
                message.channel.send("Votre loup a péri...");
                delete liste_mobs[mobs]
            }

        } else if(SuperArgs[3] == 'attaque'){
            total = hpTotalWithArmor()    

            nbDegats =  liste_mobs[mobs].at

            var random = Math.floor((Math.random() * 100) + 1);
            var result = Math.floor((Math.random() * 100) + 1);
            
            armureHP = total.HPvisu/0.5
           HPmob =  Math.floor((total.HPvisu*0.7 + armureHP*0.3)*0.4)
           if(HPmob/1.5 < liste_mobs[mobs].HP){
                
                if(random <= 80) {
                    var nbBoucle = Math.floor((Math.random() * 5) + 1);
                    if(nbBoucle == 0){
                        nbBoucle = 1
                    }
                    texte = ""
                    while(nbBoucle != 0){
                        var max = Math.floor(nbDegats*0.9);
                        var min = Math.floor(nbDegats*0.7)
                        var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                        result = Math.floor((Math.random() * 100) + 1);
                        if(result <= 15){
                            y = Math.floor(y*1.5)
                        }else if (result > 90){
                            y = "C'est un echec..." 
                        } 

                        texte += "\n :crossed_swords:  " + y;
                        nbBoucle -= 1;
                    }
                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#ac6719")
                    .addField("**Attaque**","**Votre loup donne plusieurs coups de griffe !**"+ texte )
                    message.channel.send(help_embed);
            
    
    
                } else {
                    var max = Math.floor(nbDegats*1.4);
                    var min = Math.floor(nbDegats*1.2)
                    var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                    if(result <= 15){
                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#000000")
                        .addField("**Attaque**","**Votre loup mord la cible et l'empêche d'attaquer pour le prochain tour ! **\n :crossed_swords:  " + y)
                    } else if (result < 80){
                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#ac6719")
                        .addField("**Attaque**","**Votre loup mord la cible ! **\n :crossed_swords:  " + y )
                    } else {
                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#ffffff")
                        .setTitle("Le loup échoue son attaque...")
                    }
                    message.channel.send(help_embed)
                } 

            } else if(HPmob/2 < liste_mobs[mobs].HP){

                if(random <= 50) {
                    var nbBoucle = Math.floor((Math.random() * 5) + 1);
                    if(nbBoucle == 0){
                        nbBoucle = 1
                    }
                    texte = ""
                    while(nbBoucle != 0){
                        var max = Math.floor(nbDegats*0.9);
                        var min = Math.floor(nbDegats*0.7)
                        var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                        result = Math.floor((Math.random() * 100) + 1);
                        if(result <= 15){
                            y = Math.floor(y*1.5)
                        }else if (result > 90){
                            y = "C'est un echec..." 
                        } 

                        texte += "\n :crossed_swords:  " + y;
                        nbBoucle -= 1;
                    }
                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#ac6719")
                    .addField("**Attaque**","**Votre loup donne plusieurs coups de griffe !**"+ texte )
                    message.channel.send(help_embed);
    
                } else {
                    var max = Math.floor(nbDegats*1.4);
                    var min = Math.floor(nbDegats*1.2)
                    var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                    if(result <= 15){
                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#000000")
                        .addField("**Attaque**","**Votre loup mord la cible et l'empêche d'attaquer pour le prochain tour ! **\n :crossed_swords:  " + y)
                    } else if (result < 80){
                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#ac6719")
                        .addField("**Attaque**","**Votre loup mord la cible ! **\n :crossed_swords:  " + y )
                    } else {
                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#ffffff")
                        .setTitle("Le loup échoue son attaque...")
                    }
                    message.channel.send(help_embed)
                } 


            } else {
                if(random <= 30) {
                    var nbBoucle = Math.floor((Math.random() * 5) + 1);
                    if(nbBoucle == 0){
                        nbBoucle = 1
                    }
                    texte = ""
                    while(nbBoucle != 0){
                        var max = Math.floor(nbDegats*0.9);
                        var min = Math.floor(nbDegats*0.7)
                        var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                        result = Math.floor((Math.random() * 100) + 1);
                        if(result <= 15){
                            y = Math.floor(y*1.5)
                        }else if (result > 90){
                            y = "C'est un echec..." 
                        } 

                        texte += "\n :crossed_swords:  " + y;
                        nbBoucle -= 1;
                    }
                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#ac6719")
                    .addField("**Attaque**","**Votre loup donne plusieurs coups de griffe !**"+ texte )
                    message.channel.send(help_embed);
    
                } else {
                    var max = Math.floor(nbDegats*1.4);
                    var min = Math.floor(nbDegats*1.2)
                    var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                    if(result <= 15){
                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#000000")
                        .addField("**Attaque**","**Votre loup mord la cible et l'empêche d'attaquer pour le prochain tour ! **\n :crossed_swords:  " + y)
                    } else if (result < 80){
                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#ac6719")
                        .addField("**Attaque**","**Votre loup mord la cible ! **\n :crossed_swords:  " + y )
                    } else {
                        var help_embed = new Discord.MessageEmbed()
                        .setColor("#ffffff")
                        .setTitle("Le loup échoue son attaque...")
                    }
                    message.channel.send(help_embed)
                } 

            }

        } else {
            message.channel.send("erreur dans la commande ?")
        }
    }

}



if(message.content.toLowerCase() === préfix + "tir rapide"){
    id = message.author.id;
        if(bdd[id]){
            if(bdd[id].lvl > 36){
                if(bdd[id].MAactuel >= 100){

                    var nbBoucle = Math.floor((Math.random() * 5) + 1);
                    if(nbBoucle == 0 || nbBoucle == 1 || nbBoucle == 2){
                        nbBoucle = 3
                    }
                    texte = ""
                    nbDegats = bdd[id].ATactuel

                    ancienMana = bdd[id].MAactuel
                    bdd[id].MAactuel = bdd[id].MAactuel - 100

                    while(nbBoucle != 0){
                        var max = Math.floor(nbDegats*0.85);
                        var min = Math.floor(nbDegats*0.6)
                        var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                        result = Math.floor((Math.random() * 100) + 1);
                        if(result <= 10){
                            y = Math.floor(y*1.5)
                        }else if (result > 85){
                            y = "C'est un echec..." 
                        } 

                        texte += "\n :crossed_swords:  " + y;
                        nbBoucle -= 1;
                    }
                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#ac6719")
                    .setImage("https://media.discordapp.net/attachments/918139711338475522/952530496938725466/TIR_ANDRAAZ.gif")
                    .addField("**Attaque**","**Vous venez à tirer une rafale de flèche sur la même cible !**"+ texte + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                    message.channel.send(help_embed);
                } else {
                    message.channel.send("Il vous manque du mana.")
                }

            }else {
                message.channel.send("Vous n'avez pas le niveau.")
            }
        } else {
            message.channel.send("Ayayaya, sur le champs.")
        }
    
}

if(message.content.toLowerCase() === préfix + "enchainement"){    
    id = message.author.id;
    if(bdd[id]){
        if (bdd[id].lvl >= 31 && bdd[id].classe == "maître_archer"){
            if (bdd[id].MAactuel >= 70){
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
                    .setAuthor("Vous ratez votre cible..")
                    .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
                else if(nombre < 90){               
                    bdd[id].MAactuel = bdd[id].MAactuel - 70
                    var y = new Discord.MessageEmbed()
                    .setColor("#ac6719")
                    .addField("**Attaque**","**Vous venez à tirer une flèche sur votre adversaire. S'il meurt...Vous pouvez attaquer une seconde fois !** \n :crossed_swords: " + result + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                    .setImage("https://c.tenor.com/OesYtM2euNUAAAAC/anime-arrow.gif")
                } else if (nombre < 101){
                    result = Math.floor(result * 1.5);
                    bdd[id].MAactuel = bdd[id].MAactuel - 70
                    var y = new Discord.MessageEmbed()
                    .setColor("#000000")
                    .addField("**Attaque**","**C'est un coup critique ! La cible est provoqué pendant 2 tours ! ** \n :crossed_swords: " + result + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                    .setImage("https://c.tenor.com/OesYtM2euNUAAAAC/anime-arrow.gif")
                }
                nomRP()
                Savebdd()
                message.channel.send(y);
            } else {
                message.channel.send("Vous n'avez plus de mana")
            }
        }
    } else {
        message.channel.send("Tu n'es pas enregistré, ne me provoque pas")
    }
}

if(message.content.toLowerCase() === préfix + "fumée empoisonante"){    
    id = message.author.id;
    if(bdd[id]){
        if (bdd[id].lvl >= 31 && bdd[id].classe == "maître_archer"){
            if(bdd[id].MAactuel >= 120){

                var nbBoucle = Math.floor((Math.random() * 3) + 1);
                if(nbBoucle == 0 || nbBoucle == 1){
                    nbBoucle = 2
                }

                var nbJoueur = Math.floor((Math.random() * 5) + 1);
                if(nbJoueur == 0 || nbJoueur == 1 || nbJoueur == 2){
                    nbJoueur = 3
                }
                texte = ""
                nbDegats = bdd[id].ATactuel

                ancienMana = bdd[id].MAactuel
                bdd[id].MAactuel = bdd[id].MAactuel - 120
                result = Math.floor((Math.random() * 100) + 1);
                if(result <= 15 ){
                    // Echec
                } else {
                    nbTour = nbBoucle
                    i = 1
                    while(nbJoueur != 0){
                        texte += "------------Dégâts sur le joueur numéro "+ i +"------------\n"
                        nbBoucle = nbTour
                        while(nbBoucle != 0){
                            var max = Math.floor(nbDegats*0.6);
                            var min = Math.floor(nbDegats*0.4)
                            var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
    
                            texte += ":cloud: :crossed_swords:  " + y + "\n";
                            nbBoucle -= 1;
                        }
                        i++
                        nbJoueur--
                    }
                    
                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#ac6719")
                    .setImage("https://media.discordapp.net/attachments/918139711338475522/952533099592417350/gasss.gif")
                    .addField("**Attaque**","**Vous venez à envoyer une fumée toxique sur vos adversaires, et cela pendant **``"+ nbTour + "`` **tours. Si c'est un monstre, alors mettez le mot ''perce'' après le nombre de ses dégâts pour ainsi ne pas prendre en compte son armure. Si c'est un joueurs...Faites de-même ! D'ailleurs, vous pouvez soit faire tous les blocages du poison comme ça vous êtes débarassés...Soit le faire une fois à chaque tours.**\n" + texte + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                    message.channel.send(help_embed);
                }
            } else {
                message.channel.send("Il vous manque du mana.")
            }
        }
    } else {
        message.channel.send("Tu n'es pas enregistré, ne me provoque pas")
    }
}

if(message.content.toLowerCase() === préfix + "ultime maître archer"){    
    id = message.author.id;
    if(bdd[id]){
        if (bdd[id].lvl >= 44 && bdd[id].classe == "maître_archer"){

            if (talkedRecently3.has(message.author.id)) {
                message.channel.send("Merci d'attendre 24h.");
            } else {
                if (bdd[id].MAactuel > 200){

                    var max_value = Math.floor(bdd[id].ATactuel*2.8);
                    var min_value = Math.floor(bdd[id].ATactuel*2.5)
                    var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                    
                    ancienMana = bdd[id].MAactuel
                    var nombre = Math.floor((Math.random() * 100) + 1);

                    var max_value = Math.floor(bdd[id].ATactuel*2.2);
                    var min_value = Math.floor(bdd[id].ATactuel*1.8)
                    var result2 = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;

                    if(nombre < 5){
                        verif = false;
                        var y = new Discord.MessageEmbed()
                        .setColor("#ffffff")
                        .setAuthor("Votre ultime ne fonctionne pas...")
                        .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
                    } else if (nombre < 95){
                        verif = true 
                        bdd[id].MAactuel = bdd[id].MAactuel - 200

                        var y = new Discord.MessageEmbed()
                        .setColor("#ac6719")
                        .addField("**Ultime du maître archer**","**Vous venez à tirer une flèche qui fait une brochette ! Le premier ennemi reçoit de gros dégâts**\n :bow_and_arrow: " + result + "\n**Puis une fois que la flèche ait traversé son corps, elle atteri sur une adversaire de la deuxième ligne (S'il n'y a pas de 'deuxième ligne', alors la flèche ne touche personne).**\n :bow_and_arrow: " + result2 + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                        .setImage("https://media.discordapp.net/attachments/951928506021998652/952547321059610734/Letsgooo.gif")
                    } else {
                        bdd[id].MAactuel = bdd[id].MAactuel - 200
                        verif = true 
                        var max_value = Math.floor(bdd[id].ATactuel*3);
                        var min_value = Math.floor(bdd[id].ATactuel*2.7)
                        var result2 = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;

                        var max_value = Math.floor(bdd[id].ATactuel*2.6);
                        var min_value = Math.floor(bdd[id].ATactuel*2.3)
                        var result2 = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;

                        var y = new Discord.MessageEmbed()
                        .setColor("#000000")
                        .addField("**Ultime de l'archer**","**Coup critique ! Vous venez à tirer une flèche qui fait une brochette ! Le premier ennemi reçoit de gros dégâts**\n :bow_and_arrow: " + result + "\nPuis une fois que la flèche ait traversé son corps, elle atteri sur une adversaire de la deuxième ligne (S'il n'y a pas de 'deuxième ligne', alors la flèche ne touche personne).\n :bow_and_arrow: " + result2 + "\n:sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                        .setImage("hhttps://media.discordapp.net/attachments/951928506021998652/952547321059610734/Letsgooo.gif")
                    }
                    message.channel.send(y);
                    nomRP()
                    Savebdd()
                    if(verif){
                        talkedRecently3.add(message.author.id);
                        setTimeout(() => {
                        // Removes the user from the set after a minute
                        talkedRecently3.delete(message.author.id);
                        }, 86400000 );
                    }
                } else {
                    message.channel.send("Vous n'avez pas assez de mana...")
                }
            }
        }
    } else {
        message.channel.send("Tu n'es pas enregistré, ne crie pas sale enfant")
    }
}

/// Bombardier

if(message.content.toLowerCase() === préfix + "lance flamme"){    
    id = message.author.id;
    if(bdd[id]){
        if (bdd[id].lvl >= 37 && bdd[id].classe == "bombardier"){
            ancienMana = bdd[id].MAactuel
            if(bdd[id].MAactuel >= 140){
                result = Math.floor((Math.random() * 100) + 1);
                texte = "";
                nbDegats = bdd[id].ATactuel
                if(result <= 10 ){
                    var y = new Discord.MessageEmbed()
                    var y = new Discord.MessageEmbed()
                    .setColor("#ffffff")
                    .setAuthor("Vous ratez votre cible..")
                    .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
                } else if (result <= 90) {
                    bdd[id].MAactuel = bdd[id].MAactuel - 140    
                    var max = Math.floor(4);
                    var min = Math.floor(3)
                    var nbEnnemis = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                    tour = nbEnnemis
                    i = 1;
                    while(tour !=0){
                        texte += "------------Dégâts sur le joueur numéro "+ i +"------------\n"

                        var max = Math.floor(nbDegats*0.85);
                        var min = Math.floor(nbDegats*0.6)
                        var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));

                        texte += ":boom: **" + y + "**\n";
                        nbBoucle -= 1;
                        
                        tour -= 1
                        i++
                    }

                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#e95715")
                    .setImage("https://images-ext-1.discordapp.net/external/DxxBlGGpb1DgGTeZOpSK9PEJ5qyXmzUFKQM1tDow7lw/https/realtimevfx.com/uploads/default/original/3X/7/2/72f4f257a3460e3bb092409faa92ecd189c34d30.gif")
                    .addField("**Attaque**","**coup critique ! Vous venez à bruler vos adversaires qui se trouvent sur la première ligne, infligeant des dégâts à** ``"+ nbEnnemis +"`` **ennemis qui sont côtes à côtes.**\n" + texte + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                    message.channel.send(help_embed);
                } else {
                    // Critique ! Dégâts qui augmente
                    bdd[id].MAactuel = bdd[id].MAactuel - 140    
                    var max = Math.floor(4);
                    var min = Math.floor(3)
                    var nbEnnemis = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                    tour = nbEnnemis
                    i = 1;
                    while(tour !=0){
                        texte += "------------Dégâts sur le joueur numéro "+ i +"------------\n"

                        var max = Math.floor(nbDegats*1.1);
                        var min = Math.floor(nbDegats*0.90)
                        var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));

                        texte += ":boom: **" + y + "**\n";
                        nbBoucle -= 1;
                        
                        tour -= 1
                        i++
                    }

                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#000000")
                    .setImage("https://images-ext-1.discordapp.net/external/DxxBlGGpb1DgGTeZOpSK9PEJ5qyXmzUFKQM1tDow7lw/https/realtimevfx.com/uploads/default/original/3X/7/2/72f4f257a3460e3bb092409faa92ecd189c34d30.gif")
                    .addField("**Attaque**","**Vous venez à bruler vos adversaires qui se trouvent sur la première ligne, infligeant des dégâts à** ``"+ nbEnnemis +"`` **ennemis qui sont côtes à côtes.**\n" + texte + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                    message.channel.send(help_embed);
                }
                Savebdd()
            } else {
                message.channel.send("Il vous manque du mana.")
            }
        }
    } else {
        message.channel.send("Tu n'es pas enregistré, ne me provoque pas")
    }
}

if(message.content.toLowerCase() === préfix + "bombardement"){    
    id = message.author.id;
    if(bdd[id]){
        if (bdd[id].lvl >= 41 && bdd[id].classe == "bombardier"){
            ancienMana = bdd[id].MAactuel
            if(bdd[id].MAactuel >= 140){
                result = Math.floor((Math.random() * 100) + 1);
                texte = "";
                nbDegats = bdd[id].ATactuel
                if(result <= 10 ){
                    var y = new Discord.MessageEmbed()
                    var y = new Discord.MessageEmbed()
                    .setColor("#ffffff")
                    .setAuthor("Vous ratez votre cible..")
                    .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
                } else if (result <= 90) {
                    bdd[id].MAactuel = bdd[id].MAactuel - 160    
                    var max = Math.floor(4);
                    var min = Math.floor(3)
                    var nbEnnemis = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                    tour = nbEnnemis
                    i = 1;
                    while(tour !=0){
                        texte += "------------Dégâts sur le joueur numéro "+ i +"------------\n"

                        var max = Math.floor(nbDegats*0.75);
                        var min = Math.floor(nbDegats*0.5)
                        var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));

                        texte += ":boom: **" + y + "**\n";
                        nbBoucle -= 1;
                        
                        tour -= 1
                        i++
                    }

                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#e95715")
                    .setImage("https://media0.giphy.com/media/JgCcipB19TL7ptEQ1I/giphy.gif?cid=790b7611706c7431c7eaa4922863c1abc5ad8cf36c88b0b1&rid=giphy.gif&ct=g")
                    .addField("**Attaque**","**Vous venez à lancer des explosifs sur vos adversaires qui se trouvent sur la deuxième ligne(distance), infligeant des dégâts à** ``"+ nbEnnemis +"`` **ennemis qui sont côtes à côtes.**\n" + texte + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                    message.channel.send(help_embed);
                } else {
                    // Critique ! Dégâts qui augmente
                    bdd[id].MAactuel = bdd[id].MAactuel - 160    
                    var max = Math.floor(4);
                    var min = Math.floor(3)
                    var nbEnnemis = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));
                    tour = nbEnnemis
                    i = 1;
                    while(tour !=0){
                        texte += "------------Dégâts sur le joueur numéro "+ i +"------------\n"

                        var max = Math.floor(nbDegats*0.95);
                        var min = Math.floor(nbDegats*0.8)
                        var y = Math.min(Math.floor(Math.random() * (max - min + 1)  + min));

                        texte += ":boom: **" + y + "**\n";
                        nbBoucle -= 1;
                        
                        tour -= 1
                        i++
                    }

                    var help_embed = new Discord.MessageEmbed()
                    .setColor("#000000")
                    .setImage("https://media0.giphy.com/media/JgCcipB19TL7ptEQ1I/giphy.gif?cid=790b7611706c7431c7eaa4922863c1abc5ad8cf36c88b0b1&rid=giphy.gif&ct=g")
                    .addField("**Attaque**","**Coup critique ! Vous venez à lancer des explosifs sur vos adversaires qui se trouvent sur la deuxième ligne(distance), infligeant des dégâts à** ``"+ nbEnnemis +"`` **ennemis qui sont côtes à côtes.**\n" + texte + "\n :sparkles: " + ancienMana + " -----> :sparkles: " +  bdd[id].MAactuel)
                    message.channel.send(help_embed);
                }
                Savebdd()
            } else {
                message.channel.send("Il vous manque du mana.")
            }
        }
    } else {
        message.channel.send("Tu n'es pas enregistré, ne me provoque pas")
    }
}

if(message.content.toLowerCase() === préfix + "tourelle"){    
    id = message.author.id;
    if(bdd[id]){

            total = hpTotalWithArmor()
            armureHP = total.ARvisu/0.5
            armureHP = armureHP*5
            HP = Math.floor((total.HPvisu*0.4 + armureHP*0.6)*0.4);

            manaAT = total.MAvisu
            manaAT = manaAT/5
            AT = Math.floor((total.ATvisu*0.4 + manaAT*0.6)*0.7);
            
            arHP = total.HPvisu/10
            AR = Math.floor((total.ARvisu*0.4 +arHP*0.6)*0.2);
            identifiant = "Tourelle de " + bdd[id].prenom;
            var help_embed = new Discord.MessageEmbed()
            .setTitle(identifiant)
            .setColor("#e95715")
            .setImage("https://media.discordapp.net/attachments/951928506021998652/954702453343936512/e19L1N-wXKuk1gs20Yt9fE5RCSXL_vGSrk2jk2thGI4.png?width=435&height=676")
            .addField(":abacus: Niveau",bdd[id].lvl)
            .addField(":heart: HP",HP)
            .addField(":shield: Armure", AR)
            .addField(":crossed_swords: Attaque", identifiant + " attaque")
            .addField(":shield: Défense",  identifiant + " blocage")
            .addField("Note", "1-La tourelle se place en deuxième ligne. Mais rien ne vous empêches de l'invoquer en première ligne.\n2-Si la tourelle n'est pas morte à la fin du combat, merci de le supprimer : ``?supprimer " + identifiant + "``")
            message.channel.send(help_embed)
            liste_mobs[identifiant] = {
                at : AT,
                ar : AR,
                HP : HP,    
                lvl : bdd[id].lvl
            }
            SaveMob()
    } else {
        message.channel.send("Tu n'es pas enregistré, ne crie pas sale enfant")
    }
}

function SaveMob(){
    fs.writeFile("./bdd/stockage_mobs.json", JSON.stringify(liste_mobs,null,4), (err) =>{
        if (err) message.channel.send("une erreur est survenue")
  
    })
  }