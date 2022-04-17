const { Message } = require("discord.js");

try{
if(command === 'setxp'){ 
  const ping = getUserFromMention(args[0])

  identifiant = ping;
  
  id = ping;
  xpActuel =  bdd[id].xp
  bdd[id].xp = parseInt(args[1],10);

  Savebdd();
  // inclure le ping !
  verif(true)
  var embed = new Discord.MessageEmbed()
  .addField("Courbe d'XP",  xpActuel + " ---> " + bdd[id].xp)
    message.channel.send(embed);

}
if(command === 'setlvl'){ 
  const ping = getUserFromMention(args[0])

  identifiant = ping;

  id = ping;

  bdd[id].lvl = parseInt(args[1],10);

  Savebdd();
  message.channel.send(":white_check_mark: ")
}

if(command === '54962'){ 
  const ping = getUserFromMention(args[0])

  identifiant = ping;

  id = ping;

  bdd[id].HPactuel = bdd[id].HPtotal
  Savebdd();
  nomRP()
}

if(command === 'ra'){ 
  id = message.author.id;
  total = hpTotalWithArmor()
  bdd[id].ATactuel = total.ATvisu
  bdd[id].ARactuel = total.ARvisu
  bdd[id].MAactuel = total.MAvisu
  bdd[id].HPactuel = total.HPvisu
  Savebdd();
}


function resetStatus(){
  total = hpTotalWithArmor()
  bdd[id].ATactuel = total.ATvisu;
  bdd[id].HPactuel = total.HPvisu
  bdd[id].ARactuel = total.ARvisu;
  bdd[id].MAactuel = total.MAvisu;
}



function verif(ping){
  
    do{
      if(ping){
        id = getUserFromMention(args[0])
      } else {
        id = message.author.id
      }
      level = levelxp(id);

      
      if(level < bdd[id].xp){
        levelActuel = bdd[id].lvl + 1
        var embed = new Discord.MessageEmbed()
        .addField("Vous avez gagnez un niveau !", "lvl " + bdd[id].lvl + " ---> " + "Level " + levelActuel + "\nPour attribuer vos points de compétences : ``?ptlevel``")
        .addField("Régénération des stats !", "Toutes vos stats ont été mises à jours...")

        message.channel.send(embed);

        bdd[id].lvl = bdd[id].lvl + 1
        verifPt(id)
        // Augmentatoin des stats de classes
        bdd[id].HP = bdd[id].HP + lvl[ bdd[id].classe + "_HP"] 
        bdd[id].MA =  bdd[id].MA + lvl[ bdd[id].classe + "_MA"] 
        bdd[id].AT =  bdd[id].AT + lvl[ bdd[id].classe + "_AT"] 
        bdd[id].AR =  bdd[id].AR + lvl[ bdd[id].classe + "_AR"] 
        actualisationTotal(id);
        bdd[id].ARactuel = bdd[id].ARtotal 
        bdd[id].MAactuel = bdd[id].MAtotal
        bdd[id].ATactuel = bdd[id].ATtotal 
        bdd[id].HPactuel = bdd[id].HPtotal
        ajoutArmure(id)
        Savebdd();
        palierLvl(id)
    } 
  }while(level < bdd[id].xp)

  if(id == message.author.id){nomRP(); }

}

function palierLvl(id){
  if(bdd[id].lvl == 15) {
      if(bdd[id].classe === "combattant"){
          message.channel.send("Pour devenir un chevalier ``?je suis un chevalier``\nPour devenir un paladin ``?je suis un paladin``\nAucun retour en arrière ne sera permis. Vous devez évoluer maintenant et pas plus tard !")
      } else if (bdd[id].classe === "voleur"){
          message.channel.send("Pour devenir un archer ``?je suis un archer``\nPour devenir un assassin ``?je suis un assassin``\nAucun retour en arrière ne sera permis. Vous devez évoluer maintenant et pas plus tard !")
      } else if(bdd[id].classe === "mage"){
        message.channel.send("Pour devenir un sorcier ``?je suis un sorcier``\nPour devenir un sorcier ténébreux ``?je suis un sorcier dark``\nAucun retour en arrière ne sera permis. Vous devez évoluer maintenant et pas plus tard !")
      }
  } else if (bdd[id].lvl == 16){
    bdd[id].ptPalier = 2;
  }

  if(bdd[id].lvl == 30) {
    if(bdd[id].classe === "combattant"){
        message.channel.send("Pour devenir un chevalier ``?je suis un chevalier``\nPour devenir un paladin ``?je suis un paladin``\nAucun retour en arrière ne sera permis. Vous devez évoluer maintenant et pas plus tard !")
    } else if (bdd[id].classe === "archer"){
        message.channel.send("Pour devenir un maître archer ``?je suis un maître archer``\nPour devenir un bombardier ``?je suis un bombardier``\nAucun retour en arrière ne sera permis. Vous devez évoluer maintenant et pas plus tard !")
    } else if(bdd[id].classe === "mage"){
      message.channel.send("Pour devenir un sorcier ``?je suis un sorcier``\nPour devenir un sorcier ténébreux ``?je suis un sorcier dark``\nAucun retour en arrière ne sera permis. Vous devez évoluer maintenant et pas plus tard !")
    }
} else if (bdd[id].lvl == 31){
  bdd[id].ptPalier = 3;
}

  


}

function ajoutArmure(id){
  ajoutPlastron(id);
  ajoutCasque(id);
  ajoutArme(id)
}

function retirerArme(id){
  id = id
   // HP , AR, AT, MA
    for(var i in bdd[id].arme){
      var HParme = bdd[id].arme[i][0];
      var ARarme = bdd[id].arme[i][1];
      var MAarme = bdd[id].arme[i][3];
      var ATarme = bdd[id].arme[i][2];
    } 
    if(!HParme && !ARarme && !MAarme && !ATarme){
      HParme = 0
      ARarme = 0
      MAarme = 0
      ATarme = 0
  }
  bdd[id].HPactuel = bdd[id].HPactuel -  HParme;
  bdd[id].ARactuel = bdd[id].ARactuel   - ARarme;
  bdd[id].ATactuel = bdd[id].ATactuel  - ATarme;
  bdd[id].MAactuel = bdd[id].MAactuel - MAarme;
  Savebdd();
  if(id == message.author.id){
    nomRP() 
  }
}
function retirerCasque(id){
 // HP , AR, AT, MA

 id = id
 for(var i in bdd[id].casque){

 }

   for(var i in bdd[id].casque){

     var HPcasque = bdd[id].casque[i][0];
     var ARcasque = bdd[id].casque[i][1];  
     var ATcasque = bdd[id].casque[i][2];
     var MAcasque = bdd[id].casque[i][3];

   }
   if(!HPcasque){
      HPcasque = 0
      ARcasque = 0
      ATcasque = 0
      MAcasque = 0
   }

 bdd[id].HPactuel = bdd[id].HPactuel - HPcasque 
 bdd[id].ARactuel = bdd[id].ARactuel - ARcasque 
 bdd[id].ATactuel = bdd[id].ATactuel - ATcasque 
 bdd[id].MAactuel = bdd[id].MAactuel - MAcasque 
 Savebdd();
 if(id == message.author.id){
   nomRP() 
 }
 
}
function retirerPlastron(id){
  id = id
  // HP , AR, AT, MA
   for(var i in bdd[id].plastron){
     var HPplastron = bdd[id].plastron[i][0];
     var ARplastron = bdd[id].plastron[i][1];
     var MAplastron = bdd[id].plastron[i][3];
     var ATplastron = bdd[id].plastron[i][2];
   } 
   if(!HPplastron){
     HPplastron = 0
     ARplastron = 0
     MAplastron = 0
     ATplastron = 0
 }
 bdd[id].HPactuel = bdd[id].HPactuel -  HPplastron;
 bdd[id].ARactuel = bdd[id].ARactuel  - ARplastron;
 bdd[id].ATactuel = bdd[id].ATactuel  - ATplastron;
 bdd[id].MAactuel = bdd[id].MAactuel - MAplastron;
 Savebdd();
 if(id == message.author.id){
   nomRP() 
 }
}


function ajoutArme(id){
  id = id
   // HP , AR, AT, MA
   if(bdd[id].arme){
      for(var i in bdd[id].arme){
          var HParme = bdd[id].arme[i][0];
          var ARarme = bdd[id].arme[i][1];
          var MAarme = bdd[id].arme[i][3];
          var ATarme = bdd[id].arme[i][2];
      } 

      if(!HParme && !ARarme && !MAarme && !ATarme){
        HParme = 0
        ARarme = 0
        MAarme = 0
        ATarme = 0
    }

      bdd[id].HPactuel = bdd[id].HPactuel -  HParme;
      bdd[id].ARactuel = bdd[id].ARactuel   - ARarme;
      bdd[id].ATactuel = bdd[id].ATactuel  - ATarme;
      bdd[id].MAactuel = bdd[id].MAactuel - MAarme;

   }
    for(var i in bdd[id].arme){
      var HParme = bdd[id].arme[i][0];
      var ARarme = bdd[id].arme[i][1];
      var MAarme = bdd[id].arme[i][3];
      var ATarme = bdd[id].arme[i][2];
    } 
    if(!HParme && !ARarme && !MAarme && !ATarme){
      HParme = 0
      ARarme = 0
      MAarme = 0
      ATarme = 0
  }
  bdd[id].HPactuel = bdd[id].HPactuel +  HParme;
  bdd[id].ARactuel = bdd[id].ARactuel   + ARarme;
  bdd[id].ATactuel = bdd[id].ATactuel  + ATarme;
  bdd[id].MAactuel = bdd[id].MAactuel + MAarme;
  Savebdd();
  if(id == message.author.id){
    nomRP() 
  }
}

function ajoutPlastron(id){
  id = id
  if(bdd[id].plastron){
    for(var i in bdd[id].plastron){
        var HPplastron = bdd[id].plastron[i][0];
        var ARplastron = bdd[id].plastron[i][1];
        var MAplastron = bdd[id].plastron[i][3];
        var ATplastron = bdd[id].plastron[i][2];
    } 

    if(!HPplastron && !ARplastron && !MAplastron && !ATplastron){
      HPplastron = 0
      ARplastron = 0
      MAplastron = 0
      ATplastron = 0
  }

    bdd[id].HPactuel = bdd[id].HPactuel -  HPplastron;
    bdd[id].ARactuel = bdd[id].ARactuel   - ARplastron;
    bdd[id].ATactuel = bdd[id].ATactuel  - ATplastron;
    bdd[id].MAactuel = bdd[id].MAactuel - MAplastron;

 }
   // HP , AR, AT, MA
    for(var i in bdd[id].plastron){
      var HPplastron = bdd[id].plastron[i][0];
      var ARplastron = bdd[id].plastron[i][1];
      var MAplastron = bdd[id].plastron[i][3];
      var ATplastron = bdd[id].plastron[i][2];
    } 
    if(!HPplastron){
      HPplastron = 0
      ARplastron = 0
      MAplastron = 0
      ATplastron = 0
  }
  bdd[id].HPactuel = bdd[id].HPactuel +  HPplastron;
  bdd[id].ARactuel = bdd[id].ARactuel   + ARplastron;
  bdd[id].ATactuel = bdd[id].ATactuel  + ATplastron;
  bdd[id].MAactuel = bdd[id].MAactuel + MAplastron;
  Savebdd();
  if(id == message.author.id){
    nomRP() 
  }
}
function ajoutCasque(id){
  // HP , AR, AT, MA

  id = id

  if(bdd[id].casque){
    for(var i in bdd[id].casque){
        var HPcasque = bdd[id].casque[i][0];
        var ARcasque = bdd[id].casque[i][1];
        var MAcasque = bdd[id].casque[i][3];
        var ATcasque = bdd[id].casque[i][2];
    } 

    if(!HPcasque && !ARcasque && !MAcasque && !ATcasque){
      HPcasque = 0
      ARcasque = 0
      MAcasque = 0
      ATcasque = 0
  }

    bdd[id].HPactuel = bdd[id].HPactuel -  HPcasque;
    bdd[id].ARactuel = bdd[id].ARactuel   - ARcasque;
    bdd[id].ATactuel = bdd[id].ATactuel  - ATcasque;
    bdd[id].MAactuel = bdd[id].MAactuel - MAcasque;

 }

  for(var i in bdd[id].casque){

  }

    for(var i in bdd[id].casque){

      var HPcasque = bdd[id].casque[i][0];
      var ARcasque = bdd[id].casque[i][1];  
      var ATcasque = bdd[id].casque[i][2];
      var MAcasque = bdd[id].casque[i][3];

    }
    if(!HPcasque){
       HPcasque = 0
       ARcasque = 0
       ATcasque = 0
       MAcasque = 0
    }

  bdd[id].HPactuel = bdd[id].HPactuel + HPcasque 
  bdd[id].ARactuel = bdd[id].ARactuel + ARcasque 
  bdd[id].ATactuel = bdd[id].ATactuel + ATcasque 
  bdd[id].MAactuel = bdd[id].MAactuel + MAcasque 
  Savebdd();
  if(id == message.author.id){
    nomRP() 
  }
  
}

if(command === 'test56'){
  id = message.author.id
  HPcasque = 0;
  for(var i in bdd[id].casque){
  }
}

function actualisationTotal(id){
  id = id
  // Stats total = Stats classe sans bonus de race* multiplicateur race
  bdd[id].HPtotal = Math.round(bdd[id].HP * bdd[id].Php)
  bdd[id].MAtotal = Math.round(bdd[id].MA * bdd[id].Pma)

  bdd[id].ARtotal = Math.round(bdd[id].AR * bdd[id].Par)
  /// total : 4
  var f = bdd[id].AR;
  var totalAR = bdd[id].AR * bdd[id].Par
  if(totalAR != f ){
          if(Math.round(totalAR) == f){
            bdd[id].ARtotal = f 
          } else {
            bdd[id].ARtotal = Math.round(totalAR)-0.5
          }
  }

  bdd[id].ATtotal = Math.round(bdd[id].AT * bdd[id].Par)

  // Prochainement + armure ? etc

}

function levelxp(id){
    id = id
    level = bdd[id].lvl 
  
    xplevel = lvl["lvl"+level];
  
    return xplevel; 
}

function verifPt(id){

  id = id
  palier = bdd[id].ptPalier
  bdd[id].ptStock = bdd[id].ptStock + lvl["palier" + palier]

}

  if(message.content === préfix + "xpattendre"){

    id = message.author.id
    
    level = bdd[id].lvl   
    
    mot = "lvl" + level

    message.channel.send(mot);

    xplevel = lvl[mot];

    message.channel.send(xplevel);
    
  }

  function hpTotalWithArmorUser(id){
    identifiant = id
    var casque = "";
    var i = 0;
    for(var test in bdd[identifiant].casque){
        casque = test + " : " + bdd[identifiant].casque[test]

      var HP = bdd[identifiant].casque[test][0] 
        var AR = bdd[identifiant].casque[test][1] 
        var AT = bdd[identifiant].casque[test][2]
        var MA = bdd[identifiant].casque[test][3]
    }

    var plastron = "";
    for(var test in bdd[identifiant].plastron){
      plastron = test + " : " + bdd[identifiant].plastron[test]
      
      var HPpa = bdd[identifiant].plastron[test][0] 
      var ARpa = bdd[identifiant].plastron[test][1] 
      var ATpa = bdd[identifiant].plastron[test][2]
      var MApa = bdd[identifiant].plastron[test][3]
    }


    var arme = "";
    for(var test in bdd[identifiant].arme){
      arme = test + " : " + bdd[identifiant].arme[test]
      
      var HPaa = bdd[identifiant].arme[test][0] 
      var ARaa = bdd[identifiant].arme[test][1] 
      var ATaa = bdd[identifiant].arme[test][2]
      var MAaa = bdd[identifiant].arme[test][3]
    }

    if(!HPaa && !ARaa && !ATaa && !MAaa ){
    var HPaa = 0
    var ARaa = 0
    var ATaa = 0
    var MAaa = 0
    }

    if(!HP && !AT && !AR && !MA){
    var HP = 0
    var AR = 0
    var AT = 0
    var MA = 0
    }

    if(!HPpa && !ARpa && !ATpa && !MApa){
    var HPpa =0
    var ARpa = 0
    var ATpa =0
    var MApa = 0
    }
    var HPvisu = bdd[identifiant].HPtotal + HP + HPpa + HPaa

    var ARvisu =  bdd[identifiant].ARtotal + AR + ARpa + ARaa
    var ATvisu =  bdd[identifiant].ATtotal + AT + ATpa + ATaa
  
    var MAvisu =  bdd[identifiant].MAtotal + MA + MApa + MAaa

    return {HPvisu, ARvisu, ATvisu, MAvisu, casque, plastron, arme};
}

  function hpTotalWithArmor(){
      identifiant = message.author.id
      var casque = "";
      var i = 0;
      for(var test in bdd[identifiant].casque){
          casque = test + " : " + bdd[identifiant].casque[test]

        var HP = bdd[identifiant].casque[test][0] 
          var AR = bdd[identifiant].casque[test][1] 
          var AT = bdd[identifiant].casque[test][2]
          var MA = bdd[identifiant].casque[test][3]
      }

      var plastron = "";
      for(var test in bdd[identifiant].plastron){
        plastron = test + " : " + bdd[identifiant].plastron[test]
        
        var HPpa = bdd[identifiant].plastron[test][0] 
        var ARpa = bdd[identifiant].plastron[test][1] 
        var ATpa = bdd[identifiant].plastron[test][2]
        var MApa = bdd[identifiant].plastron[test][3]
      }


      var arme = "";
      for(var test in bdd[identifiant].arme){
        arme = test + " : " + bdd[identifiant].arme[test]
        
        var HPaa = bdd[identifiant].arme[test][0] 
        var ARaa = bdd[identifiant].arme[test][1] 
        var ATaa = bdd[identifiant].arme[test][2]
        var MAaa = bdd[identifiant].arme[test][3]
      }

      if(!HPaa && !ARaa && !ATaa && !MAaa ){
      var HPaa = 0
      var ARaa = 0
      var ATaa = 0
      var MAaa = 0
      }

      if(!HP && !AT && !AR && !MA){
      var HP = 0
      var AR = 0
      var AT = 0
      var MA = 0
      }

      if(!HPpa && !ARpa && !ATpa && !MApa){
      var HPpa =0
      var ARpa = 0
      var ATpa =0
      var MApa = 0
      }
  
      var HPvisu = bdd[identifiant].HPtotal + HP + HPpa + HPaa

      var ARvisu =  bdd[identifiant].ARtotal + AR + ARpa + ARaa
      var ATvisu =  bdd[identifiant].ATtotal + AT + ATpa + ATaa
    
      var MAvisu =  bdd[identifiant].MAtotal + MA + MApa + MAaa

      return {HPvisu, ARvisu, ATvisu, MAvisu, casque, plastron, arme};
 }

 function hpTotalWithArmorProfile(){
  var casque = "";
  var i = 0;
  for(var test in bdd[identifiant].casque){
      casque = test + " : " + bdd[identifiant].casque[test]

    var HP = bdd[identifiant].casque[test][0] 
      var AR = bdd[identifiant].casque[test][1] 
      var AT = bdd[identifiant].casque[test][2]
      var MA = bdd[identifiant].casque[test][3]
  }

  var plastron = "";
  for(var test in bdd[identifiant].plastron){
    plastron = test + " : " + bdd[identifiant].plastron[test]
    
    var HPpa = bdd[identifiant].plastron[test][0] 
    var ARpa = bdd[identifiant].plastron[test][1] 
    var ATpa = bdd[identifiant].plastron[test][2]
    var MApa = bdd[identifiant].plastron[test][3]
  }


  var arme = "";
  for(var test in bdd[identifiant].arme){
    arme = test + " : " + bdd[identifiant].arme[test]
    
    var HPaa = bdd[identifiant].arme[test][0] 
    var ARaa = bdd[identifiant].arme[test][1] 
    var ATaa = bdd[identifiant].arme[test][2]
    var MAaa = bdd[identifiant].arme[test][3]
  }

  if(!HPaa && !ARaa && !ATaa && !MAaa ){
  var HPaa = 0
  var ARaa = 0
  var ATaa = 0
  var MAaa = 0
  }

  if(!HP && !AT && !AR && !MA){
  var HP = 0
  var AR = 0
  var AT = 0
  var MA = 0
  }

  if(!HPpa && !ARpa && !ATpa && !MApa){
  var HPpa =0
  var ARpa = 0
  var ATpa =0
  var MApa = 0
  }
  var HPvisu = bdd[identifiant].HPtotal + HP + HPpa + HPaa

  var ARvisu =  bdd[identifiant].ARtotal + AR + ARpa + ARaa
  var ATvisu =  bdd[identifiant].ATtotal + AT + ATpa + ATaa

  var MAvisu =  bdd[identifiant].MAtotal + MA + MApa + MAaa

  return {HPvisu, ARvisu, ATvisu, MAvisu, casque, plastron, arme};
}

  if(command === 'profile'){
    
     var identifiant = getUserFromMention(args[0])
      if (!identifiant){
        identifiant = message.author.id
      } 
      if(bdd[identifiant]){

        // Inventaire
        var inventaireComplet = "\n";
        
          inventaireComplet = "- ";
        for(const test in bdd[identifiant].inventaire){
          inventaireComplet = inventaireComplet + test + " : " + bdd[identifiant].inventaire[test] +"\n";
        }
        /*
        var HPTotal

        var casque = "";
        var i = 0;
        for(var test in bdd[identifiant].casque){
          casque = test + " : " + bdd[identifiant].casque[test]

          var HP = bdd[identifiant].casque[test][0] 
            var AR = bdd[identifiant].casque[test][1] 
            var AT = bdd[identifiant].casque[test][2]
            var MA = bdd[identifiant].casque[test][3]
        }

        var plastron = "";
        for(var test in bdd[identifiant].plastron){
          plastron = test + " : " + bdd[identifiant].plastron[test]
          
          var HPpa = bdd[identifiant].plastron[test][0] 
          var ARpa = bdd[identifiant].plastron[test][1] 
          var ATpa = bdd[identifiant].plastron[test][2]
          var MApa = bdd[identifiant].plastron[test][3]
        }


        var arme = "";
        for(var test in bdd[identifiant].arme){
          arme = test + " : " + bdd[identifiant].arme[test]
          
          var HPaa = bdd[identifiant].arme[test][0] 
          var ARaa = bdd[identifiant].arme[test][1] 
          var ATaa = bdd[identifiant].arme[test][2]
          var MAaa = bdd[identifiant].arme[test][3]
        }

        if(!HPaa && !ARaa && !ATaa && !MAaa ){
          var HPaa = 0
          var ARaa = 0
          var ATaa = 0
          var MAaa = 0
        }

        if(!HP && !AT && !AR && !MA){
          var HP = 0
          var AR = 0
          var AT = 0
          var MA = 0
        }

        if(!HPpa && !ARpa && !ATpa && !MApa){
          var HPpa =0
          var ARpa = 0
          var ATpa =0
          var MApa = 0
        }
        var HPvisu = bdd[identifiant].HPtotal + HP + HPpa + HPaa
  
        var ARvisu =  bdd[identifiant].ARtotal + AR + ARpa + ARaa
        var ATvisu =  bdd[identifiant].ATtotal + AT + ATpa + ATaa
      
        var MAvisu =  bdd[identifiant].MAtotal + MA + MApa + MAaa
        */
        test = hpTotalWithArmorProfile()
        HPvisu = test.HPvisu;
        ATvisu = test.ATvisu;
        ARvisu = test.ARvisu;
        MAvisu = test.MAvisu;
        var casque = test.casque;
        var plastron = test.plastron ;
        var arme = test.arme;

      const help_embed = new Discord.MessageEmbed()
      .setColor("#5DADE2")
      .addField(":bust_in_silhouette: "+ bdd[identifiant].nom + " " + bdd[identifiant].prenom, 
      ":beginner: Level : " + bdd[identifiant].lvl + " --- :abacus: XP : "  + bdd[identifiant].xp + "\n:pencil: Classe : " + bdd[identifiant].classe +"\n:heart: " +  HPvisu
      + " --- :shield: " + Math.round(ARvisu) + " --- :crossed_swords: " + ATvisu + " --- :sparkles: " + MAvisu
      + "\nPoint à attribuer : " + bdd[identifiant].ptStock + "\nRace : " + bdd[identifiant].race)
      .addField("●▬▬▬▬▬▬▬▬▬▬:ninja: Equipement ▬▬▬▬▬▬▬▬▬▬●", "Casque : " + casque + "\nPlastron : " +  plastron
      + "\nArme : " + arme)
      .addField("●▬▬▬▬▬▬▬▬▬▬:moneybag: Argent ▬▬▬▬▬▬▬▬▬▬●", ":third_place: Pièce en bronze : " + bdd[identifiant].pieceBronze + "\n:second_place: Pièce en argent : " + bdd[identifiant].pieceArgent
      + "\n:first_place: Pièce en or : " + bdd[identifiant].pieceOr)
      .addField("●▬▬▬▬▬▬▬▬▬▬:school_satchel: Inventaire ▬▬▬▬▬▬▬▬▬▬●", inventaireComplet)
      .setImage(bdd[identifiant].apparence)
      message.channel.send(help_embed);
      const chart = new QuickChart();
      var HP = Math.floor(bdd[identifiant].HPtotal/5)
      var AR = Math.floor(bdd[identifiant].ARtotal*2)
      var AT = Math.floor(bdd[identifiant].ATtotal)
      var MA = Math.floor(bdd[identifiant].MAtotal/5)
      //message.channel.send("HP = " + HP)
      //message.channel.send("AT = " + AT)
      var total = HP + AR + AT + MA;
      //message.channel.send("total =" + total)
      /*
      var pHP = HP*100/total 
      var pAR = AR*100/total 
      var pMA = MA*100/total 
      var pAT = AT*100/total
  */
      var pHP = HP
      var pAR = AR
      var pMA = MA
      var pAT = AT
    // message.channel.send("pHP = " + pHP)
      // message.channel.send("pAT = " + pAT)
      chart.setConfig({
        type: 'radar',
        data: {
          labels: [
            'Vitalité',
            'Armure',
            'Attaque',
            'Mana',
          ],
          datasets: [
            {
              label: 'Statistique de votre personnage',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              pointBackgroundColor: 'rgb(255, 99, 132)',
              data: [pHP, pAR, pAT, pMA],
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: 'Graphique',
          },
        }
        });
      const chartEmbed = {
        title: 'Statistique',
        description: '',
        image: {
          url: chart.getUrl(),
        },
      };
      message.channel.send({ embed: chartEmbed });
              
    }
  }

  // Regen mana et HP 


  if(message.content === préfix + "regen-MA"){

    id = message.author.id
    bdd[id].MA = bdd[id].MAtotal;
    Savebdd();
    message.channel.send("Oui");
    
  }


}catch(error){
  console.log(error)
}