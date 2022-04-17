

if(command === "combat") {
    var nomMob = args[0]
    if(monstre.hasOwnProperty(nomMob)){

        identifiant = nomMob + "_" + monstre.id;

        var help_embed = new Discord.MessageEmbed()
        .setTitle(identifiant)
        .setColor("#1df863")
        .setImage(monstre.monstre.image)
        .addField(":abacus: Niveau","lvl")
        .addField(":heart: HP",monstre.monstre.hp)
        .addField(":shield: Armure", monstre.monstre.armure)
        .addField(":crossed_swords: Attaque", monstre.monstre.attaque)
        .addField(":shield: Défense", monstre.monstre.armure)
        .addField("Note", "Pour attaquer le monstre ?[compétence] " + identifiant)
        message.channel.send(help_embed)
        liste_mobs[identifiant] = {
            hp : monstre.monstre.hp,
            armure : monstre.monstre.armure
        }
        monstre.id = monstre.id + 1
        SaveMob()
        SaveId()
    } else {
      //  message.channel.send("le monstre n'existe pas")
    }
}


if(command === 'test-epee'){
    mobs = args[0]
    if(liste_mobs.hasOwnProperty(mobs)){
            hpAncien = liste_mobs[mobs].hp
            var max_value = Math.floor(20*1.3);
            var min_value = Math.floor(10*1.1)
            var result = Math.floor(Math.random() * (max_value - min_value + 1) ) + min_value;
            hpMob = hpAncien - result 
            liste_mobs[mobs].hp = hpMob
            var y = new Discord.MessageEmbed()
            .setColor("#ffffff")
            .addField("Attaque " , hpAncien + " ----> " + hpMob)
            message.channel.send(y);
            SaveMob()
        }
}

function SaveId(){
    fs.writeFile("./monstre.json", JSON.stringify(monstre,null,4), (err) =>{
        if (err) message.channel.send("une erreur est survenue")
  
    })
  }

