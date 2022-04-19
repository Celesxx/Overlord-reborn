 // const { Message } = require("discord.js");

function HPblocage(result, argumentUno){
    id = message.author.id;
    HP = bdd[id].HPactuel;
    if(argumentUno){
        bdd[id].HPactuel = bdd[id].HPactuel - result
    } else {
        bdd[id].HPactuel = bdd[id].HPactuel + bdd[id].ARactuel - result
    }
    if (HP < bdd[id].HPactuel){
        bdd[id].HPactuel = HP
    }
    if(!argumentUno){
        degat = result -  bdd[id].ARtotal
    } else {
        degat = result;
    }
    if(degat < 0){
        degat = 0
    }
    if(HP < 0){
        HP = 0
    }

    return HP;
}

function verifArgs(){
    if(args[0] > -99999){

    } else {
        return 0
    }
}
/// ALL


if(command === 'roulade'){
    id = message.author.id;
    if(bdd[id]){
        if(args[0]) { 
            armor = bdd[id].ARactuel
            if(args[1] == "perce"){
                numeroUno = true;
                armor = 0
            } else {
                numeroUno = false;
            }        var min = Math.floor(Math.min(args[0]*1.4));
            var max = Math.floor(Math.max(args[0]*1.7)); 
            var result = Math.floor(Math.random() * (max - min + 1) ) + min;
            var min = 0
            var max = 100
            var aleatoire = Math.floor(Math.random() * (max - min + 1) ) + min;
            /// BDD
            chance = 30
            if(bdd[id].classe === "archer" && bdd[id].lvl > 16){
                chance = 40

                at = bdd[id].ATtotal
                var min = Math.floor(Math.min(at*0.1));
                var max = Math.floor(Math.max(at*0.25)); 
                var attaque = Math.floor(Math.random() * (max - min + 1) ) + min;

                if(aleatoire < chance){
                    var y = new Discord.MessageEmbed()
                    .setColor("#f8a765")
                    .addField("**Défense**","**Vous esquivez l'attaque tout en tirant des flèches sur celui qui vous as attaqué**\n :bow_and_arrow: " + attaque)
                    .setImage("https://64.media.tumblr.com/45ae6f95891e4fdf4f0e4eb0d0b9a7be/c53bd0b03de16a09-7a/s500x750/aad77ff7a360fe3732d4a839ed8c6e6b30a75587.gif")
                } else {
                    HP = HPblocage(result, numeroUno)
                    Savebdd(); 
                    if(bdd[id].HPactuel <= 0){
                        message.member.setNickname(bdd[id].prenom + "  [☠️ KO]")
                    } else {
                        message.member.setNickname(bdd[id].prenom + " [❤️" + bdd[id].HPactuel + "] [🛡️"+bdd[id].ARactuel +"] [✨" + bdd[id].MAactuel + "]")
                    }
                    var y =new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .addField("**Défense**","**Votre roulade échoue...** \n|| :anger:-" + result + " + 🛡️ " + armor + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + bdd[id].HPactuel)
                    .setImage("https://i1.wp.com/www.animefeminist.com/wp-content/uploads/2018/10/6dc848b02d9417013345e6e92256f3b7.png?ssl=1")
                }
                message.channel.send({embeds: [y]});
            
            } else if (bdd[id].classe === "assassin"&& bdd[id].lvl > 16) {
                chance = 55;
                if(aleatoire < chance){
                    var y = new Discord.MessageEmbed()
                    .setColor("#ff4444")
                    .addField("**Défense**","**Vous esquivez l'attaque grâce à votre grande agilité.**")
                    .setImage("https://imgur.com/laNYqPN")
                } else {
                    HP = HPblocage(result, numeroUno)
                    Savebdd(); 
                    if(bdd[id].HPactuel <= 0){
                        message.member.setNickname(bdd[id].prenom + "  [☠️ KO]")
                    } else {
                        message.member.setNickname(bdd[id].prenom + " [❤️" + bdd[id].HPactuel + "] [🛡️"+bdd[id].ARactuel +"] [✨" + bdd[id].MAactuel + "]")
                    }
                    var y =new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .addField("**Défense**","**Votre roulade échoue...** \n|| :anger:-" + result + " + 🛡️ " + armor + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + bdd[id].HPactuel)
                    .setImage("https://i1.wp.com/www.animefeminist.com/wp-content/uploads/2018/10/6dc848b02d9417013345e6e92256f3b7.png?ssl=1")
                }
                message.channel.send({embeds: [y]});
            




            } else {
                if(aleatoire < chance){
                    var y = new Discord.MessageEmbed()
                    .setColor("#2ECC71")
                    .addField("**Défense**","**à l'aide d'une roulade, vous esquivez l'attaque ! Vous ne perdez aucun points de vie !**")
                    .setImage("https://i.pinimg.com/originals/5f/cb/47/5fcb4776ecf0ae14b93fac41e75d294f.gif")
                } else {
                    HP = HPblocage(result, numeroUno)
                    Savebdd(); 
                    if(bdd[id].HPactuel <= 0){
                        message.member.setNickname(bdd[id].prenom + "  [☠️ KO]")
                    } else {
                        message.member.setNickname(bdd[id].prenom + " [❤️" + bdd[id].HPactuel + "] [🛡️"+bdd[id].ARactuel +"] [✨" + bdd[id].MAactuel + "]")
                    }
                    var y =new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .addField("**Défense**","**Votre roulade échoue...** \n|| :anger:-" + result + " + 🛡️ " + armor + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + bdd[id].HPactuel)
                    .setImage("https://i1.wp.com/www.animefeminist.com/wp-content/uploads/2018/10/6dc848b02d9417013345e6e92256f3b7.png?ssl=1")
                }
                message.channel.send({embeds: [y]});
            } 

        }else{
            message.channel.send("Roule ailleurs, gros tas.")
        }
    }
}


if(command === 'pnjblocage'){
    id = message.author.id;
    
        var nombre = Math.floor((Math.random() * 100) + 1);
        /// BDD
        if(nombre <= 10){
            var min = Math.floor(Math.min(args[0]*0.8));
            var max = Math.floor(Math.max(args[0]*0.9)); 
            var result = Math.floor(Math.random() * (max - min + 1) ) + min;
            var min =  1.1;
            var max =  1.4;
            var crit = Math.floor(Math.random() * (max - min + 1) ) + min; 
            result = Math.floor(result * crit)
            var y =new Discord.MessageEmbed()
            .setColor("#E74C3C")
            .addField("**Défense**","**Le blocage est un echec! ** \n :anger:-" + result )
            .setImage("https://i1.wp.com/www.animefeminist.com/wp-content/uploads/2018/10/6dc848b02d9417013345e6e92256f3b7.png?ssl=1")
        } else if (nombre <= 90){
            var min = Math.floor(Math.min(args[0]*0.8));
            var max = Math.floor(Math.max(args[0]*0.9)); 
            var result = Math.floor(Math.random() * (max - min + 1) ) + min;
            var y =new Discord.MessageEmbed()
            .setColor("#888888")
            .addField("**Défense**","**Vous bloquez l'attaque difficilement et ne prenez qu'une partie des dégâts** \n :anger:-" + result)
            .setImage("https://wallpaperaccess.com/full/298290.jpg")
        } else {
            var min = Math.floor(Math.min(args[0]*0.8));
            var max = Math.floor(Math.max(args[0]*0.9)); 
            var result = Math.floor(Math.random() * (max - min + 1) ) + min;
            var min = 0.4;
            var max = 0.6;
            var crit = Math.floor(Math.random() * (max - min + 1) ) + min; 
            var y =new Discord.MessageEmbed()
            .setColor("#000000")
            .addField("**Défense**","**Vous bloquez l'attaque sans trop de soucis ! Réussite critique !** \n :anger:-" + result )
            .setImage("https://wallpaperaccess.com/full/298290.jpg")
        }
        message.channel.send({embeds: [y]});
    
}

/// Combattant

if(command === 'epee'){
    id = message.author.id;
    if(bdd[id]){
        if(args[0]){
            attaque = args[0]
        } else {
            attaque = bdd[id].ATactuel;
        }
        if(!args[1]){
            if(bdd[id].lvl < 16){

                var nombre = Math.floor((Math.random() * 100) + 1);
            // attaque = bdd[id].ATactuel;
                var max_value = Math.floor(attaque*1.3);
                var min_value = Math.floor(attaque*1.1)
                var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                if(nombre < 15){
                var y = new Discord.MessageEmbed()
                .setColor("#ffffff")
                .setAuthor("Votre épée ne touche pas la cible")
                .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
            }else if(nombre < 90){
                var y = new Discord.MessageEmbed()
                .setColor("#e21700")
                .addField("**Attaque**","**Vous donnez un coup d'épée à votre adversaire, lui infligeant de gros dégâts** \n :crossed_swords:" + result)
                .setImage("https://img4.goodfon.com/wallpaper/nbig/4/c3/akame-ga-kill-anime-japanese-manga-sword-ken-blade-yuusha-bl.jpg")
                } else if (nombre < 101){
                result = Math.floor(result * 1.5);
                var y = new Discord.MessageEmbed()
                .setColor("#000000")
                .addField("**Attaque**","**Coup critique ! Vous lui infligez de gros dégâts** \n :crossed_swords: " + result)
                .setImage("https://img4.goodfon.com/wallpaper/nbig/4/c3/akame-ga-kill-anime-japanese-manga-sword-ken-blade-yuusha-bl.jpg")
                }
                message.channel.send({embeds: [y]});
            } else {
                var nombre = Math.floor((Math.random() * 100) + 1);
                var max_value = Math.floor(attaque*1.35);
                var min_value = Math.floor(attaque*1.15)
                var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                if(nombre < 10)
                    var y = new Discord.MessageEmbed()
                    .setColor("#ffffff")
                    .setAuthor("Votre épée ne touche pas la cible")
                    .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
                else if(nombre < 85){
                    var y = new Discord.MessageEmbed()
                    .setColor("#489ed7")
                    .addField("**Attaque**","**Vous donnez un coup d'épée à votre adversaire, lui infligeant de gros dégâts** \n :crossed_swords:" + result)
                    .setImage("https://c4.wallpaperflare.com/wallpaper/201/464/1022/fantasy-knight-armor-battle-wallpaper-preview.jpg")
                } else if (nombre < 101){
                    result = Math.floor(result * 1.5);
                    var y = new Discord.MessageEmbed()
                    .setColor("#000000")
                    .addField("**Attaque**","**Coup critique ! Vous lui infligez de gros dégâts** \n :crossed_swords: " + result)
                    .setImage("https://c4.wallpaperflare.com/wallpaper/201/464/1022/fantasy-knight-armor-battle-wallpaper-preview.jpg")
                }
                message.channel.send({embeds: [y]});
            }
        }            
    } else {
        message.channel.send("Tu n'es pas enregistré, Hara-kiri toi ta race")
    }
}

if(command === 'estoc'){    
    id = message.author.id;
    if(bdd[id]){
        if (bdd[id].MAactuel >= 10){
            var nombre = Math.floor((Math.random() * 100) + 1);
            attaque = bdd[id].ATactuel;
            var max_value = Math.floor(attaque*0.7);
            var min_value = Math.floor(attaque*0.45)
            var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
            id = message.author.id;
            ancienMana = bdd[id].MAactuel
            if(nombre < 15)
            var y = new Discord.MessageEmbed()
            .setColor("#ffffff")
            .setAuthor("Votre épée ne touche pas la cible")
            .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
            else if(nombre < 85){               
            bdd[id].MAactuel = bdd[id].MAactuel - 10
            var y = new Discord.MessageEmbed()
            .setColor("#e21700")
            .addField("**Attaque**","**Vous donnez un coup d'estoc à votre cible !** \n :crossed_swords: " + result + "\n :sparkles: -" + 10)
            .setImage("https://thumbs.gfycat.com/EllipticalMasculineFowl-size_restricted.gif")
            } else if (nombre < 101){
            result = Math.floor(result * 1.5);
            bdd[id].MAactuel = bdd[id].MAactuel - 10
            var y = new Discord.MessageEmbed()
            .setColor("#000000")
            .addField("**Attaque**","**Coup critique ! La pointe de votre épée touche un point sensible !** \n :crossed_swords: " + result + "\n :sparkles: -" + 10)
            .setImage("https://thumbs.gfycat.com/EllipticalMasculineFowl-size_restricted.gif")
            }
            nomRP()
            Savebdd()
            message.channel.send({embeds: [y]});
        } else {
            message.channel.send("Vous n'avez plus de mana")
        }
    } else {
        message.channel.send("Tu n'es pas enregistré, estoc toi le cul à la place")
    }
}

if(message.content.toLowerCase() === préfix + "coup provocateur"){    
    id = message.author.id;
    if(bdd[id]){
        if (bdd[id].MAactuel >= 15){
            var nombre = Math.floor((Math.random() * 100) + 1);
            attaque = bdd[id].ATactuel;
            var max_value = Math.floor(attaque*0.8);
            var min_value = Math.floor(attaque*0.55)
            var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
            id = message.author.id;
            ancienMana = bdd[id].MAactuel
            if(nombre < 20)
                var y = new Discord.MessageEmbed()
                .setColor("#ffffff")
                .setAuthor("Vous ratez votre coup provocateur...")
                .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
            else if(nombre < 90){               
                bdd[id].MAactuel = bdd[id].MAactuel - 15
                var y = new Discord.MessageEmbed()
                .setColor("#e21700")
                .addField("**Attaque**","**Vous donnez un coup le crâne de votre adversaire et le provoquez pendant 1 tour(sauf s'il fait autre chose qu'une attaque ciblé)** \n :crossed_swords: " + result + "\n :sparkles: -" + 15)
                .setImage("https://wallpaperaccess.com/full/1106858.jpg")
            } else if (nombre < 101){
                result = Math.floor(result * 1.5);
                bdd[id].MAactuel = bdd[id].MAactuel - 15
                var y = new Discord.MessageEmbed()
                .setColor("#000000")
                .addField("**Attaque**","**C'est un coup critique ! La cible est provoqué pendant 2 tours ! ** \n :crossed_swords: " + result + "\n :sparkles: -" + 15)
                .setImage("https://wallpaperaccess.com/full/1106858.jpg")
            }
            nomRP()
            Savebdd()
            message.channel.send({embeds: [y]});
        } else {
            message.channel.send("Vous n'avez plus de mana")
        }
    } else {
        message.channel.send("Tu n'es pas enregistré, ne me provoque pas")
    }
}

if(command === 'hp-'){
    id = message.author.id;
    if(args[0]){
        test = verifArgs()
        if(test != 0){
            bdd[id].HPactuel = bdd[id].HPactuel - args[0]
            Savebdd()
            nomRP()
        }
    }
}

if(command === 'hp+'){
    id = getUserFromMention(args[0]);
    if (message.member.roles.cache.has("939189314582085637")) {
        if(args[0]){
            test = verifArgs()
            if(test != 0){
                bdd[id].HPactuel = bdd[id].HPactuel - args[1]
                Savebdd()
                nomRP()
            }
        }
    } else {    
        message.channel.send("https://images-ext-1.discordapp.net/external/jR49NRZPIOT-c4ny6jxXHaYvzcf2iDMRS3p0MtNBFRc/%3Fc%3DVjFfZGlzY29yZA%26ver%3D0126/https/media.tenor.com/wOCOTBGZJyEAAAPo/chikku-neesan-girl-hit-wall.mp4")
    }
}


if(command === 'cblocage'){
    id = message.author.id;
    if(bdd[id]){
        if(args[0]){
            armor = bdd[id].ARactuel
            if(args[1] == "perce"){
                numeroUno = true;
                armor = 0
            } else {
                numeroUno = false;
            }
            if(bdd[id].lvl < 16) {
                var nombre = Math.floor((Math.random() * 100) + 1);
                /// BDD
                if(nombre < 10){
                    var min = Math.floor(Math.min(args[0]*0.8));
                    var max = Math.floor(Math.max(args[0]*0.9)); 
                    var result = Math.floor(Math.random() * (max - min + 1) ) + min;
                    var min =  1.2;
                    var max =  1.4;
                    min = 130
                    max = 160
                    var crit = Math.floor(Math.random() * (max - min + 1)  + min); 
                    if(crit > 160){
                        crit = 160;
                    }
                    result = Math.floor(result * crit)
                    result = Math.floor(result / 100);
                    HP = HPblocage(result, numeroUno)
                    var y =new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .addField("**Défense**","**Le blocage est un echec! ** \n|| :anger:-" + result + " + 🛡️ " + armor + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + bdd[id].HPactuel)
                    .setImage("https://i1.wp.com/www.animefeminist.com/wp-content/uploads/2018/10/6dc848b02d9417013345e6e92256f3b7.png?ssl=1")
                } else if (nombre < 90){
                    var min = Math.floor(Math.min(args[0]*0.8));
                    var max = Math.floor(Math.max(args[0]*0.9)); 
                    var result = Math.floor(Math.random() * (max - min + 1) ) + min;
                    HP = HPblocage(result, numeroUno)
                    var y =new Discord.MessageEmbed()
                    .setColor("#888888")
                    .addField("**Défense**","**Vous bloquez l'attaque difficilement et ne prenez qu'une partie des dégâts** \n|| :anger:-" + result + " + 🛡️ " + armor + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + bdd[id].HPactuel)
                    .setImage("https://wallpaperaccess.com/full/298290.jpg")
                } else {
                    var min = Math.floor(Math.min(args[0]*0.8));
                    var max = Math.floor(Math.max(args[0]*0.9)); 
                    var result = Math.floor(Math.random() * (max - min + 1) ) + min;
                    var min = 0.4;
                    var max = 0.6;
                    min = 40
                    max = 60 
                    var crit = Math.floor(Math.random() * (max - min + 1) ) + min; 
                    result = Math.floor(result * crit)
                    result = Math.floor(result/100)
                    HP = HPblocage(result, numeroUno)
                    var y =new Discord.MessageEmbed()
                    .setColor("#000000")
                    .addField("**Défense**","**Vous bloquez l'attaque sans trop de soucis ! Réussite critique !** \n|| :anger:-" + result + " + 🛡️ " + armor + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + bdd[id].HPactuel)
                    .setImage("https://wallpaperaccess.com/full/298290.jpg")
                }
                message.channel.send({embeds: [y]});
                Savebdd();
            } else {
                var nombre = Math.floor((Math.random() * 100) + 1);
                /// BDD
                if(nombre < 10){
                    var min = Math.floor(Math.min(args[0]*0.7));
                    var max = Math.floor(Math.max(args[0]*0.85)); 
                    var result = Math.floor(Math.random() * (max - min + 1) ) + min;
                    var min =  110;
                    var max =  140;
                    var crit = Math.floor(Math.random() * (max - min + 1) ) + min; 
                    if(crit > 140){
                        crit = 140;
                    }
                    result = Math.floor(result * crit)
                    result = Math.floor(result / 100);
                    HP = HPblocage(result, numeroUno)
                    var y =new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .addField("**Défense**","**Le blocage est un echec! ** \n|| :anger:-" + result + " + 🛡️ " + armor + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + bdd[id].HPactuel)
                    .setImage("https://i1.wp.com/www.animefeminist.com/wp-content/uploads/2018/10/6dc848b02d9417013345e6e92256f3b7.png?ssl=1")
                } else if (nombre <= 95){
                    var min = Math.floor(Math.min(args[0]*0.7));
                    var max = Math.floor(Math.max(args[0]*0.85)); 
                    var result = Math.floor(Math.random() * (max - min + 1) ) + min;
                    HP = HPblocage(result, numeroUno)
                    var y =new Discord.MessageEmbed()
                    .setColor("#1b6ea4")
                    .addField("**Défense**","**Vous bloquez l'attaque difficilement et ne prenez qu'une partie des dégâts** \n|| :anger:-" + result + " + 🛡️ " + armor + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + bdd[id].HPactuel)
                    .setImage("https://c4.wallpaperflare.com/wallpaper/534/856/998/fantasy-knight-armor-fight-wallpaper-preview.jpg")
                } else {
                    var min = Math.floor(Math.min(args[0]*0.7));
                    var max = Math.floor(Math.max(args[0]*0.85)); 
                    var result = Math.floor(Math.random() * (max - min + 1) ) + min;
                    var min = 40;
                    var max = 60;
                    var crit = Math.floor(Math.random() * (max - min + 1) ) + min; 
                    result = Math.floor(result * crit)
                    result = Math.floor(result / 100);
                    HP = HPblocage(result, numeroUno)
                    var y =new Discord.MessageEmbed()
                    .setColor("#000000")
                    .addField("**Défense**","**Vous bloquez l'attaque sans trop de soucis ! Réussite critique !** \n|| :anger:-" + result + " + 🛡️ " + armor + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + bdd[id].HPactuel)
                    .setImage("https://c4.wallpaperflare.com/wallpaper/534/856/998/fantasy-knight-armor-fight-wallpaper-preview.jpg")
                }
                message.channel.send({embeds: [y]});
            }
            if(bdd[id].HPtotal <= 0){
                message.member.setNickname(bdd[id].prenom + "  [☠️ KO]")
            } else {
                message.member.setNickname(bdd[id].prenom + " [❤️" + bdd[id].HPactuel + "] [🛡️"+bdd[id].ARactuel +"] [✨" + bdd[id].MAactuel + "]")
            }
        } else {
            message.channel.send("Le nombre.")
        }
    }else{
        message.channel.send("Tu veux te protéger contre quoi ? Ton cerveau sale merde")
    }
}

// MAGE

if(command === 'sort'){
    id = message.author.id;
    if(bdd[id]){
        if (bdd[id].MAactuel > 5){
            var nombre = Math.floor((Math.random() * 100) + 1);
            attaque = bdd[id].ATtotal;
            var max_value = Math.floor(attaque*1.3);
            var min_value = Math.floor(attaque*1)
            var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
            if(nombre < 10)
            var y = new Discord.MessageEmbed()
            .setColor("#ffffff")
            .setAuthor("Vous n'arrivez pas à utiliser un sort")
            .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
            else if(nombre < 90){
            var y = new Discord.MessageEmbed()
            .setColor("#e21700")
            .addField("**Attaque**","**Vous tirez une boule magique en direction de votre adversaire !** \n :crossed_swords: " + result + "\n :sparkles: -" + 5)
            .setImage("https://i.redd.it/gd4qew4o1zh61.jpg")
            bdd[id].MAactuel = bdd[id].MAactuel - 5
            } else if(nombre < 101){
            result = Math.floor(result * 1.5);
            var y = new Discord.MessageEmbed()       
            .setColor("#000000")
            .addField("**Attaque**","**Coup critique ! Vous infligez d'important dégâts** \n :crossed_swords: " + result + "\n :sparkles: -" + 5)
            .setImage("https://i.redd.it/gd4qew4o1zh61.jpg")
            bdd[id].MAactuel = bdd[id].MAactuel - 5
            }
            Savebdd();
            nomRP()
        } else{
            y = "Il vous manque du mana";
        }
        message.channel.send({embeds: [y]});
    } else {
        message.channel.send("gne gne gne je suis un sorcier. Whoawwwwwwwwww!  Bientôt finit ces conneries ?")
    }
}

if(command === 'mblocage'){
    id = message.author.id;
    if(bdd[id]){
        if(args[0]){
            armor = bdd[id].ARactuel
            if(args[1] == "perce"){
                numeroUno = true;
                armor = 0
            } else {
                numeroUno = false;
            }
            
            if(bdd[id].MAactuel > 10){
                /// BDD
                var nombre = Math.floor((Math.random() * 100) + 1);
                //HP = HPblocage(result, numeroUno)
                id = message.author.id;
                ancienMana = bdd[id].MAactuel
                bdd[id].MAactuel = bdd[id].MAactuel - 10
                // MANA AVANT
                if(nombre < 5 ){
                var min = Math.floor(Math.min(args[0]*0.8));
                var max = Math.floor(Math.max(args[0]*0.95)); 
                var result = Math.floor(Math.random() * (max - min + 1) ) + min;
                var min = 130;
                var max = 150;
                var crit = Math.floor(Math.random() * (max - min + 1) ) + min; 
                if(crit > 140){
                    crit = 140;
                }
                result = Math.floor(result * crit)
                result = Math.floor(result / 100);
                HP = HPblocage(result, numeroUno)
                var y =new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .addField("**Défense**","**Le blocage est un echec !** \n|| :anger:-" + result + " + 🛡️ " + armor + " = -" + degat +"||\n ❤️ " + HP + "-----> ❤️ " + bdd[id].HPactuel + "\n ✨ " + ancienMana + " -----> ✨ " + bdd[id].MAactuel)
                    .setImage("https://i1.wp.com/www.animefeminist.com/wp-content/uploads/2018/10/6dc848b02d9417013345e6e92256f3b7.png?ssl=1")
                } else if (nombre < 95) {
                    var min = Math.floor(Math.min(args[0]*0.8));
                    var max = Math.floor(Math.max(args[0]*0.95)); 
                    var result = Math.floor(Math.random() * (max - min + 1) ) + min;
                    HP = HPblocage(result, numeroUno)
                    var y =new Discord.MessageEmbed()
                    .setColor("#888888")
                    .addField("**Défense**","**Vous bloquez l'attaque en utilisant une partie de votre mana** \n|| :anger:-" + result + " + 🛡️ " + armor + " = -" + degat +"||\n ❤️ " + HP + "-----> ❤️ " + bdd[id].HPactuel + "\n ✨ " + ancienMana + " -----> ✨ " + bdd[id].MAactuel)
                    .setImage("https://media.discordapp.net/attachments/809083678222319636/862718371324887091/654f8de005da61e3045be2a40c32113e.jpg")
                } else {
                    var min = Math.floor(Math.min(args[0]*0.8));
                    var max = Math.floor(Math.max(args[0]*0.95)); 
                    var result = Math.floor(Math.random() * (max - min + 1) ) + min;
                    var min = 40;
                    var max = 60;
                    var crit = Math.floor(Math.random() * (max - min + 1) ) + min; 
                    result = Math.floor(result * crit)
                    result = Math.floor(result / 100);
                    HP = HPblocage(result, numeroUno)
                    var y =new Discord.MessageEmbed()
                    .setColor("#000000")
                    .addField("**Défense**","**Réussite critique ! Votre blocage est formidable.** \n|| :anger:-" + result + " + 🛡️ " + armor + " = -" + degat +"||\n ❤️ " + HP + "-----> ❤️ " + bdd[id].HPactuel + "\n ✨ " + ancienMana + " -----> ✨ " + bdd[id].MAactuel)
                    .setImage("https://media.discordapp.net/attachments/809083678222319636/862718371324887091/654f8de005da61e3045be2a40c32113e.jpg")
                }
                message.channel.send({embeds: [y]});


                Savebdd();
                nomRP()
                if(bdd[id].HPtotal < 0){
                    message.member.setNickname(bdd[id].prenom + "  [☠️ KO]")
                } else {
                    message.member.setNickname(bdd[id].prenom + " [❤️" + bdd[id].HPactuel + "] [🛡️"+bdd[id].ARactuel +"] [✨" + bdd[id].MAactuel + "]")
                }
            } else {
                message.channel.send("Vous n'avez plus de mana.");
            }
                        
        } else {
            message.channel.send("Un nombre !")
        }
    } else {
        message.channel.send("??????????????????????????????")
    }
}

// VOLEUR 
if(command === 'dague'){
    id = message.author.id;
    if(!args[0]){
        if(bdd[id]){
            var nombre = Math.floor((Math.random() * 100) + 1);
            id = message.author.id;
            attaque = bdd[id].ATactuel;
            var max_value = Math.floor(attaque*1.4);
            var min_value = Math.floor(attaque*1.1)
            var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
            if(nombre < 15)
            var y = new Discord.MessageEmbed()
            .setColor("#ffffff")
            .setAuthor("Votre épée ne touche pas la cible")
            .setImage("https://i.kym-cdn.com/photos/images/original/000/911/028/14e.jpg")
            else if(nombre < 85){
            var y = new Discord.MessageEmbed()
            .setColor("#e21700")
            .addField("**Attaque**","**Vous vous rapprochez de votre adversaire avant de lui placer un grand coup de dague** \n :crossed_swords:" + result)
            .setImage("https://theglobalcoverage.com/wp-content/uploads/2021/01/images-11-1200x720.jpeg")
            } else if (nombre < 101){
            result = Math.floor(result * 1.5);
            var y = new Discord.MessageEmbed()
            .setColor("#000000")
            .addField("**Attaque**","**Coup critique ! Vous lui infligez de gros dégâts** \n :crossed_swords:" + result)
            .setImage("https://theglobalcoverage.com/wp-content/uploads/2021/01/images-11-1200x720.jpeg")
            }
            message.channel.send({embeds: [y]});
        } else {
            message.channel.send("plante toi, sur le champs.")
        }
    }
}

if(command === 'vblocage'){
    id = message.author.id;
    if(bdd[id]){
        if(args[0]){
            armor = bdd[id].ARactuel
            if(args[1] == "perce"){
                numeroUno = true;
                armor = 0
            } else {
                numeroUno = false;
            }

            test = verifArgs()
            if(test != 0){
                var nombre = Math.floor((Math.random() * 100) + 1);
                var min = Math.floor(Math.min(args[0]*0.85));
                var max = Math.floor(Math.max(args[0]*0.95)); 
                var result = Math.floor(Math.random() * (max - min + 1) ) + min;
                if(nombre <= 20 ){
                    min = 120;
                    max = 160;
                    var crit = Math.floor(Math.random() * (max - min + 1) ) + min; 
                    if(crit > 160){
                        crit = 160;
                    }
                    result = Math.floor(result * crit)
                    result = Math.floor(result / 100);
                    HP = HPblocage(result, numeroUno)
                    var y =new Discord.MessageEmbed()
                    .setColor("#E74C3C")
                    .addField("**Défense**","**Le blocage est un echec !** \n|| :anger:-" + result + " + 🛡️ " + armor + " = -" + degat +"||\n ❤️ " + HP + "-----> ❤️ " + bdd[id].HPactuel)
                    .setImage("https://i1.wp.com/www.animefeminist.com/wp-content/uploads/2018/10/6dc848b02d9417013345e6e92256f3b7.png?ssl=1")
                } else if (nombre < 90){
                    HP = HPblocage(result, numeroUno)
                    var y =new Discord.MessageEmbed()
                    .setColor("#888888")
                    .addField("**Défense**","**Dû à votre faible force, vous bloquez l'attaque avec plus ou moins de difficulté.** \n|| :anger:-" + result + " + 🛡️ " + armor + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + bdd[id].HPactuel)
                    .setImage("https://qph.fs.quoracdn.net/main-qimg-723f7f14b9ecf6e904e951c99b737e2a")
                } else {
                    var min = 40;
                    var max = 60;
                    var crit = Math.floor(Math.random() * (max - min + 1) ) + min; 
                    result = Math.floor(result * crit)
                    result = Math.floor(result / 100);
                    HP = HPblocage(result, numeroUno)
                    var y =new Discord.MessageEmbed()
                    .setColor("#000000")
                    .addField("**Défense**","**Défense critique ! Vous bloquez l'attaque sans difficulté.** \n|| :anger:-" + result + " + 🛡️ " + armor + " = -" + degat +"||\n ❤️ " + HP + " -----> ❤️ " + bdd[id].HPactuel)
                    .setImage("https://qph.fs.quoracdn.net/main-qimg-723f7f14b9ecf6e904e951c99b737e2a")
                }
                Savebdd();
                message.channel.send({embeds: [y]});
                if(bdd[id].HPtotal <= 0){
                    message.member.setNickname(bdd[id].prenom + "  [☠️ KO]")
                } else {
                    message.member.setNickname(bdd[id].prenom + " [❤️" + bdd[id].HPactuel + "] [🛡️"+bdd[id].ARactuel +"] [✨" + bdd[id].MAactuel + "]")
                }
            } else {
                message.channel.send("Le nombre ! ")
            }
        } else {
            message.channel.send("Il faut un nombre.")
        }
    }else{
        message.channel.send("Protège toi de ta débilité")
    }
}