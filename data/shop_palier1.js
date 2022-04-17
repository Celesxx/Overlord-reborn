
if(command === "achat"){
    id = message.author.id;
    item = args.slice(0).join(' ');
    item = item.toLowerCase()
    if(args[0] == "potion" && bddShop.hasOwnProperty(item)){
        bronze = bddShop[item].Bronze 
        argent = bddShop[item].Argent 
        or = bddShop[item].Or 

        if( ( ( parseInt(bdd[id].pieceBronze) - bronze) < 0) || ( (parseInt(bdd[id].pieceArgent) - argent) < 0 ) || ( ( parseInt(bdd[id].pieceOr) - or )< 0 )){
            message.channel.send("Vous n'avez pas assez d'argent.")
        } else {
            bdd[id].pieceBronze = parseInt(bdd[id].pieceBronze) - bronze 
            bdd[id].pieceArgent = parseInt(bdd[id].pieceArgent) - argent
            bdd[id].pieceOr = parseInt(bdd[id].pieceOr) - or

            if(bdd[id].inventaire.hasOwnProperty(item)){
                bdd[id].inventaire[item] = parseInt(bdd[id].inventaire[item]) + 1;
                message.channel.send(":white_check_mark:")
                message.channel.send("Pour utiliser la potion : ?Boire [Nom de la potion]")
            } else {
                bdd[id].inventaire[item] = "1";
            }
        }
        Savebdd()
    } else if((!bdd[id].inventaire.hasOwnProperty(item) && bddShop.hasOwnProperty(item)) || bddShop[item].Type == "immobilier"){
            // Prix d'achat

            if(bddShop[item].Type == "immobilier"){
                bronzeAdonner = args[1]
                argentAdonner = args[2]
                orAdonner = args[3]
                if(bronzeAdonner > bdd[id].pieceBronze || argentAdonner > bdd[id].pieceArgent || orAdonner > bdd[id].pieceOr){
                    message.channel.send("Vous n'avez pas suffisament de pièces.")
                } else {
                    if(!orAdonner){
                        orAdonner = 0
                    }
                    bdd[id].pieceBronze = parseInt(bdd[id].pieceBronze) - bronzeAdonner 
                    bdd[id].pieceArgent = parseInt(bdd[id].pieceArgent) - argentAdonner
                    bdd[id].pieceOr = parseInt(bdd[id].pieceOr) - orAdonner

                    texte = "clé " + args[0]
                    bdd[id].inventaire[texte] = [bronzeAdonner, argentAdonner, orAdonner]
                }
            }else {
                bronze = bddShop[item].Bronze 
                argent = bddShop[item].Argent 
                or = bddShop[item].Or 
                // Affectation à la bdd du joueur (on lui soustrait le paiement)
                if( ( ( parseInt(bdd[id].pieceBronze) - bronze) < 0) || ( (parseInt(bdd[id].pieceArgent) - argent) < 0 ) || ( ( parseInt(bdd[id].pieceOr) - or )< 0 )){
                    message.channel.send("Vous n'avez pas assez d'argent.")
                } else {

                    bdd[id].pieceBronze = parseInt(bdd[id].pieceBronze) - bronze 
                    bdd[id].pieceArgent = parseInt(bdd[id].pieceArgent) - argent
                    bdd[id].pieceOr = parseInt(bdd[id].pieceOr) - or

                // Repartition des stats sur l'item
                    max_value = Math.floor(bddShop[item].MaxHP);
                    min_value = Math.floor(bddShop[item].MinHP);
                    result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                    HPitem = result 

                    max_value = Math.floor(bddShop[item].MaxAT);
                    min_value = Math.floor(bddShop[item].MinAT);
                    result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                    ATitem = result 

                    max_value = Math.floor(bddShop[item].MaxMA);
                    min_value = Math.floor(bddShop[item].MinMA);
                    result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                    MAitem = result 

                    max_value = Math.floor(bddShop[item].MaxAR);
                    min_value = Math.floor(bddShop[item].MinAR);
                    result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                    ARitem = result

                    // On lui ajoute à son inventaire
                    bdd[id].inventaire[item] = [HPitem, ARitem, ATitem, MAitem];

                    // On regarde le type de l'item et on la retire si elle est équipé au joueur
                    message.channel.send("Pour équiper votre achat ?Equiper [nom de l'item].")
                    message.channel.send("Si l'item est une potion, alors : ?[nom de la potion] (exemple ?Potion HP)")
                }
            }
            Savebdd()
            message.channel.send(":white_check_mark:")
            var channel = client.channels.cache.get('939189314779222043');
            channel.send('Commande : ' +  message.content + '\nID utilisateur : <@' + id +'>');
    } else {
        message.channel.send("Vous avez déjà l'item dans votre inventaire, ou bien vous avez mal écrit l'item.")
    }
}


if(command === "vendre"){
    id = message.author.id;
    item = args.slice(0).join(' ');
    if(bdd[id].inventaire.hasOwnProperty(item) && bddShop.hasOwnProperty(item) || bddShop[item].Type == "immobilier"){
        if(bddShop[item].Type == "immobilier"){
            texte = "clé " + args[0]
            if(bdd[id].inventaire.hasOwnProperty(texte)){
                for(var i in bdd[id].inventaire[texte]){
                    var Bronze = bdd[id].inventaire[texte][0] 
                    var Argent = bdd[id].inventaire[texte][1] 
                    var Or = bdd[id].inventaire[texte][2]
                }
                Bronze = Bronze / 3
                Argent = Argent / 3
                Or = Or /3
                if(!Or){
                    Or = 0
                }
                bdd[id].pieceBronze = parseInt(bdd[id].pieceBronze) + parseInt(Bronze)
                bdd[id].pieceArgent = parseInt(bdd[id].pieceArgent) + parseInt(Argent)
                bdd[id].pieceOr = parseInt(bdd[id].pieceOr) + parseInt(Or)
                delete bdd[id].inventaire[texte];
            }
        }else {
            // Prix de revente
            
            bronze = Math.floor(bddShop[item].Bronze / 2);
            argent = Math.floor(bddShop[item].Argent / 2);
            or = Math.floor(bddShop[item].Or / 2);
            
            // Affectation à la bdd du joueur

            bdd[id].pieceBronze = parseInt(bdd[id].pieceBronze) + bronze 
            bdd[id].pieceArgent = parseInt(bdd[id].pieceArgent) + argent
            bdd[id].pieceOr = parseInt(bdd[id].pieceOr) + or

            delete bdd[id].inventaire[item];

            // On regarde le type de l'item et on la retire si elle est équipé au joueur

            if(bdd[id].arme.hasOwnProperty(item)){
                retirerArme(id)
                delete bdd[id].arme[item];
            } else if(bdd[id].casque.hasOwnProperty(item)){
                retirerCasque(id)
                delete bdd[id].casque[item];
            } else if (bdd[id].plastron.hasOwnProperty(item)){
                retirerPlastron(id)
                delete bdd[id].plastron[item];
            }
            message.channel.send("Yes.")
        }
        Savebdd()
        message.channel.send(":white_check_mark:")
    } else {
        message.channel.send("Vous n'avez pas l'item dans votre inventaire, ou bien vous l'avez mal écrit")
    }
}

if(command === "equiper"){
    id = message.author.id;
    if(bdd[id]){
        item = args.slice(0).join(' '); 
        if(!bdd[id].inventaire.hasOwnProperty(item) || bddShop[item].Type == "immobilier"){
            message.channel.send("Vous n'avez pas cet item dans votre inventaire")
        } else {
            type = bddShop[item].Type
            if(type === "plastron"){
                for(var test in bdd[id].plastron){
                    bdd[id].HPactuel = bdd[id].HPactuel - bdd[id].plastron[test][0]
                    bdd[id].ARactuel = bdd[id].ARactuel - bdd[id].plastron[test][1]
                    bdd[id].ATactuel = bdd[id].ATactuel - bdd[id].plastron[test][2]
                    bdd[id].MAactuel = bdd[id].MAactuel - bdd[id].plastron[test][3]
                    delete bdd[id].plastron[test]
                }
                value = bdd[id].inventaire[item]
                bdd[id].plastron[item] = value;
                ajoutArmure(id)
            } else if(type === "casque"){
                for(var test in bdd[id].casque){
                    bdd[id].HPactuel = bdd[id].HPactuel - bdd[id].casque[test][0]
                    bdd[id].ARactuel = bdd[id].ARactuel - bdd[id].casque[test][1]
                    bdd[id].ATactuel = bdd[id].ATactuel - bdd[id].casque[test][2]
                    bdd[id].MAactuel = bdd[id].MAactuel - bdd[id].casque[test][3]
                    delete bdd[id].casque[test]
                }
                value = bdd[id].inventaire[item]
                bdd[id].casque[item] = value;
                ajoutCasque(id)
            } else if(type === "arme") {
                for(var test in bdd[id].arme){
                    bdd[id].HPactuel = bdd[id].HPactuel - bdd[id].arme[test][0]
                    bdd[id].ARactuel = bdd[id].ARactuel - bdd[id].arme[test][1]
                    bdd[id].ATactuel = bdd[id].ATactuel - bdd[id].arme[test][2]
                    bdd[id].MAactuel = bdd[id].MAactuel - bdd[id].arme[test][3]
                    delete bdd[id].arme[test]
                }
                value = bdd[id].inventaire[item]
                bdd[id].arme[item] = value;
                ajoutArme(id)
                console.log(bdd[id].ATactuel)
            } else {
                message.channel.send("Il faut ping le fonda, il y a un problème.")
            }
            message.channel.send("Yes.")
            Savebdd()
            nomRP()
        }

    } else {
        message.channel.send("Équipe toi de ta fiche")
    }
    
}

if(command === "boire"){
    id = message.author.id;
    if(bdd[id]){
        item = args.slice(0).join(' '); 
        if(!bdd[id].inventaire.hasOwnProperty(item)){
            message.channel.send("Tu n'as pas cette potion.")
        } else {
            if(bdd[id].inventaire[item] >= 1){
                if(bddShop[item].Type === "potionHP"){
                    var max_value = bddShop[item].MaxHP
                    var min_value = bddShop[item].MinHP
                    var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                    HPprecedent = bdd[id].HPactuel;
                    bdd[id].HPactuel = bdd[id].HPactuel + result;
                    for(var i in bdd[id].plastron){
                        var HPplastron = bdd[id].plastron[i][0];
                    }
                    for(var i in bdd[id].casque){
                        var HPcasque = bdd[id].casque[i][0];
                    }
                    for(var i in bdd[id].arme){
                        var HPcasque = bdd[id].arme[i][0];
                    }
                    if(!HPplastron){
                        var HPplastron = 0
                    }
                    if(!HPcasque){
                        var HPcasque = 0
                    }
                    if(!HParme){
                        var HParme = 0
                    }
        
                    HParmure = HPplastron + HPcasque + HParme;
                    if(bdd[id].HPactuel > bdd[id].HPtotal + HParmure){
                        bdd[id].HPactuel = bdd[id].HPtotal + HParmure;
                    }
                    var y = new Discord.MessageEmbed()
                        .setColor("#58D68D")
                        .addField("**Utilisation de potion d'HP**",":heartpulse: " + HPprecedent + " -----> " + ":heartpulse: " +bdd[id].HPactuel)
                        .setImage("https://static.wikia.nocookie.net/overlordmaruyama/images/4/4a/Minor_Healing_Potion.png/revision/latest/scale-to-width-down/250?cb=20150811062916")
                        message.channel.send(y);
                        bdd[id].inventaire[item] = bdd[id].inventaire[item]  - 1
                    Savebdd();
                } else {
                    var max_value = bddShop[item].MaxMA
                    var min_value = bddShop[item].MinMA
                    var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
                    MAprecedent = bdd[id].MAactuel;
                    bdd[id].MAactuel = bdd[id].MAactuel + result;
                    for(var i in bdd[id].plastron){
                        var MAplastron = bdd[id].plastron[i][3];
                    }
                    for(var i in bdd[id].casque){
                        var MAcasque = bdd[id].casque[i][3];
                    }
                    for(var i in bdd[id].arme){
                        var MAarme = bdd[id].arme[i][3];
                    }
                    if(!MAplastron){
                        var MAplastron = 0
                    }
                    if(!MAcasque){
                        var MAcasque = 0
                    }
                    if(!MAarme){
                        var MAarme = 0
                    }
         
        
                    MAarmure = MAplastron + MAcasque;
                    if(bdd[id].MAactuel > bdd[id].MAtotal + MAarmure){
                        bdd[id].MAactuel = bdd[id].MAtotal + MAarmure;
                    }
                    var y = new Discord.MessageEmbed()
                        .setColor("#58D68D")
                        .addField("**Utilisation de potion d'MA**","💙 " + MAprecedent + " -----> " + "💙 " +bdd[id].MAactuel)
                        .setImage("https://static.wikia.nocookie.net/overlordmaruyama/images/8/84/Overlord_EP05_031.png/revision/latest?cb=20150806120408")
                        message.channel.send(y);
                        bdd[id].inventaire[item] = bdd[id].inventaire[item]  - 1
                    Savebdd();
                }
                nomRP()
            } else {
                message.channel.send("Vous n'avez plus de potion : **" + item + "**")
            }
        }

    } else {
        message.channel.send("Boit ton sel.")
    }
}

 /// Retirer equipement 

