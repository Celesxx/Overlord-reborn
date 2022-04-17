const ping = getUserFromMention(args[0])
var vie ;
var attaqueJoueur;
var armureJoueur;
var mana;
try{ 
    if(command === 'enregistrement'){
        if (message.member.roles.cache.has("939189314582085637")) {

    if (args[3] === 'voleur'){
        vie = 50
        attaqueJoueur = 14
        armureJoueur = 1
        mana = 20
        classes = "voleur"
    }
    if (args[3] === 'combattant'){
        vie = 60
        attaqueJoueur = 10
        armureJoueur = 2
        mana = 20
        classes = "combattant"
    }

     if (args[3] === 'mage'){
        vie = 40
            attaqueJoueur = 14
            armureJoueur = 0
            mana = 40
            classes = "mage"

    }

    // La race 
    if(args[4] === 'humain'){
        raceChoisie = "humain"
        vieTotal = vie
        manaTotal = mana
        arTotal =armureJoueur
     atTotal = attaqueJoueur
     pourcentageAR  = 1
     pourcentageAT = 1
     pourcentageHP = 1
     pourcentageMA = 1
    }

    if(args[4] === 'automate'){
        raceChoisie = "automate"
        vieTotal = Math.floor(vie*1.05)
        manaTotal = Math.floor(mana*0.95)
        arTotal = Math.floor(armureJoueur*1.05)
     atTotal = Math.floor(attaqueJoueur*0.95)

     pourcentageAR  = 1.05
     pourcentageAT = 0.95
     pourcentageHP = 1.05
     pourcentageMA = 0.95
    }

    if(args[4] === 'démon'){
        raceChoisie = "démon"
        vieTotal =  Math.floor(vie*0.9)
        manaTotal = mana
        arTotal = armureJoueur
        atTotal =  Math.floor(attaqueJoueur*1.1)
        pourcentageAR  = 1
        pourcentageAT = 1.1
        pourcentageHP = 0.9
        pourcentageMA = 1
    }

    if(args[4] === 'beastman'){
        raceChoisie = "beastman"
        vieTotal =  Math.floor(vie*1.3)
        manaTotal =  Math.floor(mana*0.7)
        arTotal = armureJoueur
        atTotal = attaqueJoueur
        pourcentageAR  = 1
        pourcentageAT = 1
        pourcentageHP = 1.3
        pourcentageMA = 0.7
    }

    if(args[4] === 'demi-beastman'){
        raceChoisie = "demi-beastman"
        vieTotal =  Math.floor(vie*1.15)
        manaTotal =  Math.floor(mana*0.85)
        arTotal = armureJoueur
        atTotal = attaqueJoueur
        pourcentageAR  = 1
        pourcentageAT = 1
        pourcentageHP = 1.15
        pourcentageMA = 0.85
    }
    if(args[4] === 'demi-dragon'){
        raceChoisie = "demi-dragon"
        vieTotal =  Math.floor(vie*1.20)
        manaTotal =  Math.floor(mana*0.90)
        arTotal = Math.floor(armureJoueur*0.95)
        atTotal = Math.floor(attaqueJoueur*0.95)
        pourcentageAR  = 0.95
        pourcentageAT = 0.95
        pourcentageHP = 1.20
        pourcentageMA = 0.9
    }

    if(args[4] === 'elf'){
        raceChoisie = "elf"
        vieTotal =  Math.floor(vie*0.90)
        manaTotal = Math.floor(mana*1.10)
        arTotal = armureJoueur
        atTotal = attaqueJoueur
        pourcentageAR  = 1
        pourcentageAT = 1
        pourcentageHP = 0.9
        pourcentageMA = 1.1
    }

    if(args[4] === 'nain'){
        raceChoisie = "nain"
        vieTotal =  Math.floor(vie*1.1)
        manaTotal = mana
        arTotal =  Math.floor(armureJoueur*1.1)
        atTotal =  Math.floor(attaqueJoueur*0.8)
        pourcentageAR  = 1.1
        pourcentageAT = 0.8
        pourcentageHP = 1.1
        pourcentageMA = 1
    }

    if(args[4] === 'liche'){
        raceChoisie = "liche"
        vieTotal =  Math.floor(vie*0.75)
        manaTotal =  Math.floor(mana*1.2)
        arTotal =  Math.floor(armureJoueur*1.05)
        atTotal = attaqueJoueur
        pourcentageAR  = 1
        pourcentageAT = 1.05
        pourcentageHP = 0.75
        pourcentageMA = 1.2
    }

    if(args[4] === 'nymphe'){
        raceChoisie = "nymphe"
        vieTotal =  vie
        manaTotal =  Math.floor(mana*1.2)
        arTotal =  Math.floor(armureJoueur*0.9)
        atTotal = Math.floor(attaqueJoueur*0.9)
        pourcentageAR  = 0.9
        pourcentageAT = 0.9
        pourcentageHP = 1
        pourcentageMA = 1.2
    }


    if(args[4] === 'gobelin'){
        raceChoisie = "gobelin"
        vieTotal =  vie
        manaTotal =  mana
        arTotal =  Math.floor(armureJoueur*1.1)
        atTotal = Math.floor(attaqueJoueur*0.9)
        pourcentageAR  = 1.10
        pourcentageAT = 0.9
        pourcentageHP = 1
        pourcentageMA = 1
    }

    
    if(args[4] === 'lamia'){
        raceChoisie = "lamia"
        vieTotal =  Math.floor(vie*0.9)
        manaTotal =  Math.floor(mana*1.2)
        arTotal =  armureJoueur
        atTotal = Math.floor(attaqueJoueur*0.9)
        pourcentageAR  = 1
        pourcentageAT = 0.9
        pourcentageHP = 0.9
        pourcentageMA = 1.2
    }

    
    if(args[4] === 'succube'){
        raceChoisie = "succube"
        vieTotal =  vie
        manaTotal =  Math.floor(mana*1.1)
        arTotal =  Math.floor(armureJoueur*0.9)
        atTotal = attaqueJoueur
        pourcentageAR  = 0.9
        pourcentageAT = 1
        pourcentageHP = 1
        pourcentageMA = 1.1
    }

 

    
    if(args[4] === 'vampire'){
        raceChoisie = "vampire"
        vieTotal =  Math.floor(vie*0.95)
        manaTotal =  Math.floor(mana*1.05)
        arTotal =  Math.floor(armureJoueur*0.95)
        atTotal = Math.floor(attaqueJoueur*1.05)
        pourcentageAR  = 0.95
        pourcentageAT = 1.05
        pourcentageHP = 0.95
        pourcentageMA = 1.05
    }
 
   
    if(args[4] === 'ghoul'){
        raceChoisie = "ghoul"
        vieTotal =  Math.floor(vie*1.05)
        manaTotal =  mana
        arTotal =  Math.floor(armureJoueur*0.9)
        atTotal = Math.floor(attaqueJoueur*1.05)
        pourcentageAR  = 0.90
        pourcentageAT = 1.05
        pourcentageHP = 1.05
        pourcentageMA = 1
        console.log(arTotal)
    }

        bdd[ ping ]  =  {
            id : ping
            , prenom : args[1]
            , nom : args[2]
            , classe : classes
            , race : raceChoisie
            // Stats fixes sans bonus races + items + bla bla
            , AT : attaqueJoueur
            , AR : armureJoueur
            , HP : vie
            , MA : mana
            // Stats qui bouge
            , ATactuel : atTotal
            , ARactuel : arTotal
            , HPactuel : vieTotal 
            , MAactuel : manaTotal 
            // Stats actuel + Buff (potion, sort)
            , ATBuff : atTotal
            , ARBuff : arTotal
            , HPBuff : vieTotal 
            , MABuff : manaTotal 
            // Stats avec bonus
            , HPtotal : vieTotal 
            , MAtotal : manaTotal
            , ARtotal : arTotal
            , ATtotal : atTotal
            // Pourcentage bonus 
            , Par : pourcentageAR
            , Pat : pourcentageAT
            , Php : pourcentageHP
            , Pma : pourcentageMA
            , arme : {}
            , plastron : {}
            , casque : {}
            , inventaire : {

            }
            , pieceBronze : 0
            , pieceArgent : 0
            , pieceOr : 0
            , lvl : 1
            , xp : 0
            , ptGagner : 2
            , ptPalier : 1
            , ptStock : 0
            , apparence : args[5]

        }
        message.channel.send("Oui monsieur.");
        message.channel.send("<@" + ping + "> Lorsque tu voudras actualiser ton nomRP : ``?NomRP``")
        Savebdd()   
    } else {
        message.channel.send("https://youtu.be/2ffgD-Iusn8")
    }
}
} catch (E){
    console.log(E)
}

if(command === 'nomrp'){
    id = message.author.id;
    if(bdd[id]){
        message.member.setNickname(bdd[id].prenom + " [❤️" + bdd[id].HPactuel + "] [🛡️"+bdd[id].ARactuel +"] [✨" + bdd[id].MAactuel + "]")
        message.channel.send(":white_check_mark:")
    } else {
        message.channel.send("T'es complétement con ? Tu pensais vraiment que sans t'enregistrer tu allais avoir un nom RP ? (Non je rigole t'es pas con...Mais imagine quand même si le bot t'aurait réellement insulté ????)")
        message.member.roles.add("939783983787573268");
    }
}

function nomRP(){
    message.member.setNickname(bdd[id].prenom + " [❤️" + bdd[id].HPactuel + "] [🛡️"+bdd[id].ARactuel +"] [✨" + bdd[id].MAactuel + "]")
}

function nomRPUser(id){
    message.member.find(id).setNickname(bdd[id].prenom + " [❤️" + bdd[id].HPactuel + "] [🛡️"+bdd[id].ARactuel +"] [✨" + bdd[id].MAactuel + "]")
}