if(message.content === préfix + "Arabe" || message.content === préfix + "arabe"){
    var result = Math.floor((Math.random() * 100) + 1);
    if(result < 15){
        text = "Pourquoi quand tu vois un alien sur une moto faut pas rigoler ? || Parce que c'est peut-être la tienne. ||"
    }  else if (result < 30) {
        text ="Un alien se promène avec sa petite amie. Cette dérnière marche sur une pierre et tombe. Un autre alien les voie au loin et dit ''Tu as fait tomber tes papiers.''"
    } else if (result < 45) {
        text = "starloasz et Morz sont sur un vaisseau. Qui saute en premier ? || Le vaisseau. ||"
    } else if (result < 60) {
        text = "Pourquoi il n'y a pas de piscine en iskatishia ? || Car tous ceux qui savent nager sont déjà sur terre. ||"
    } else if (result < 75) {
        text = "Qu'est ce qui distingue la France des autres pays aliens ? || C'est le seul pays peuplé d'alien qui n'est pas en guerre. ||"
    } else if (result < 90) {
        text = "Qu'est-ce qu'un alien sans bras ? || Un alien de confiance. ||"
    } else if (result < 101) {
        text = "Quatre aliens sont dans une Citroën, ils ont un accident et meurt, morale de l'histoire : || Vous n'imaginez pas tout ce que Citroën peu faire pour vous. ||"
    }
    message.channel.send(text)
}
