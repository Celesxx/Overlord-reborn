if(command === '='){
    
    number_1 = args[0];
    comparateur = args[1];
    number_2 = args[2];

    if(comparateur == '+'){
        resultat = Math.floor(parseInt(number_1) + parseInt(number_2))
    } else if (comparateur == '/'){
        resultat = Math.floor(parseInt(number_1) / parseInt(number_2))
    } else if (comparateur == '-'){
        resultat = Math.floor(parseInt(number_1) - parseInt(number_2))
    } else {
        resultat = "comparateur introuvable";
    }
    message.channel.send(resultat)
  }
