if(message.content.toLowerCase() === préfix + "je suis un chevalier"){    
    id = message.author.id;
    if(bdd[id]) {
        bdd[id].classe = "chevalier";
        message.channel.send(":white_check_mark:");
        Savebdd()
}
}

if(message.content.toLowerCase() === préfix + "je suis un paladin"){  
    if(bdd[id]) {  
        id = message.author.id;
        bdd[id].classe = "paladin";
        message.channel.send(":white_check_mark:");
        Savebdd()
    }
}

if(message.content.toLowerCase() === préfix + "je suis un assassin"){    
    if(bdd[id]) {
        id = message.author.id;
        bdd[id].classe = "assassin";
        message.channel.send(":white_check_mark:");
        Savebdd()
    }
}

if(message.content.toLowerCase() === préfix + "je suis un archer"){  
    if(bdd[id]) {  
        id = message.author.id;
        bdd[id].classe = "archer";
        message.channel.send(":white_check_mark:");
        Savebdd()
    }
}

if(message.content.toLowerCase() === préfix + "je suis un sorcier"){   
    if(bdd[id]) { 
        id = message.author.id;
        bdd[id].classe = "sorcier";
        message.channel.send(":white_check_mark:");
        Savebdd()
    }
}


if(message.content.toLowerCase() === préfix + "je suis un sorcier dark"){    
    if(bdd[id]) {
    id = message.author.id;
    bdd[id].classe = "sorcier_ténébreux";
    message.channel.send(":white_check_mark:");
    message.channel.send("~~putain de sasuke~~")
    Savebdd()
    }
}

if(message.content.toLowerCase() === préfix + "je suis un maître archer"){  
    if(bdd[id]) {  
        id = message.author.id;
        bdd[id].classe = "maître_archer";
        message.channel.send(":white_check_mark:");
        Savebdd()
    }
}


if(message.content.toLowerCase() === préfix + "je suis un bombardier"){  
    if(bdd[id]) {  
        id = message.author.id;
        bdd[id].classe = "bombardier";
        message.channel.send(":white_check_mark:");
        Savebdd()
    }
}