
/*
const myCoolMenu = new MenuBuilder()
.addLabel('Combattant', {
    description: '', value: 'value-1', emoji: {
        name: '🛡️'
    }
})
.addLabel('Voleur', {
    description: '', value: 'value-2', emoji: {
        name: '🗡️'
    }
})
.addLabel('Mage', {
    description: '⚔️', value: 'value-3', emoji: {
        name: '🌌'
    }
})
.setMaxValues(1)
.setMinValues(1)
.setCustomID('cool-custom-id')
.setPlaceHolder('Choisisez une des classes pour voir sa description');

const myCombattant = new MenuBuilder()
.addLabel('LvlCombattant', {
    description: 'Compétence obtenable par niveau', value: 'value-1', emoji: {
        name: '📈'
    }
})
.addLabel('Paladin', {
    description: 'Voir l\'évolution du combattant en paladin', value: 'value-2', emoji: {
        name: '🛡️'
    }
})
.addLabel('Guerrier', {
    description: 'Voir l\'évolution du combattant en guerrier', value: 'value-3', emoji: {
        name: '⚔️'
    }
})
.setMaxValues(1)
.setMinValues(1)
.setCustomID('cool-custom-id')
.setPlaceHolder('Choisisez les renseignements que vous désirez');

const combattant = new MessageEmbed()
.setColor("#2980B9")
.addField("●▬▬▬▬▬▬▬▬▬▬:shield: Combattant ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes une classe polyvalente qui s'utilise en première ligne. Vous pouvez très bien être utilisé comme ''garde du corps'' voir comme un redoutable attaquant !")
.addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Stats lvl 0 ▬▬▬▬▬▬▬▬▬▬●", ":heart: 60HP | :shield: 2AR | :crossed_swords: 10AT | :sparkles: 20MA ")
.addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +10HP | :crossed_swords: +1AT | :shield: +0.5AR ")
.addField(":chart_with_upwards_trend: **Liste des attaques du combattant**", "?Lvl combattant")
.addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 15 entre ?Paladin ou ?Guerrier ")
.setImage("https://media.discordapp.net/attachments/834159801130942466/835881460053049344/15dcb473500369cb918a91c44122a270_1.png?width=1014&height=676")

const voleur = new MessageEmbed()
.setColor("#fe7b7b")
.addField("●▬▬▬▬▬▬▬▬▬▬:dagger: Voleur ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes l'inverse d'une classe ''resistante'', vous êtes même fragile...Mais vous avez   une grande agilité !")
.addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Stats lvl 0 ▬▬▬▬▬▬▬▬▬▬●", ":heart: 50HP | :shield: 1AR | :crossed_swords: 14AT | :sparkles: 20MA ")
.addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +5HP | :crossed_swords: +2AT | :shield: +0.5AR ")
.addField(":chart_with_upwards_trend: **Liste des attaques du voleur**", "?Lvl voleur")
.addField(":diamond_shape_with_a_dot_inside: **évolution**", "évolution à partir du niveau 15 entre ?Archer ou ?Assassin")
.setImage("https://i.pinimg.com/originals/4e/1b/c3/4e1bc397664b238556c617f88626438c.jpg")

const mage = new MessageEmbed()
.setColor("#01CDFE")
.addField("●▬▬▬▬▬▬▬▬▬▬:sparkles: Mage ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes un mage ! Vous êtes sur la deuxième ligne et pouvez être aussi bien fort pour ce qui est de soutenir votre équipe, ou bien pour infliger de gros dégâts !")
.addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Stats lvl 0 ▬▬▬▬▬▬▬▬▬▬●", ":heart: 40HP |:shield: 0AR | :crossed_swords: 14AT | :sparkles: 40MA ")
.addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +5HP | :crossed_swords: +1AT | :sparkles: +10MA ")
.addField(":chart_with_upwards_trend: **Liste des attaques du mage**", "?Lvl mage")
.addField(":diamond_shape_with_a_dot_inside: **évolution**", "évolution à partir du niveau 15 entre ?Sorcier ténébreux et ?Sorcier")
.setImage("https://p4.wallpaperbetter.com/wallpaper/590/887/619/fantasy-magic-artistic-dark-wallpaper-preview.jpg")

function menu(){
    MenusManager.sendMenu(message, new MessageEmbed().setColor("#5DADE2").addField("●▬▬▬▬▬▬▬▬▬▬:crossed_swords: Classe ▬▬▬▬▬▬▬▬▬▬●", ":shield: **Combattant**\n:dagger: **Voleur**\n:sparkles: **Mage**").setImage("https://www.1zoom.me/big2/72/219926-jugra.jpg"), { menu: myCoolMenu }).then(msg => {
      console.log(msg.id);
    message.channel.send('-',{ ephemeral: true });
  })
} 
if (command === 'menu') {
  menu()
}

MenusManager.on('MENU_CLICKED', (menu) => {
    if (menu.customID === 'cool-custom-id') {
        if (menu.values[0].toLowerCase() === 'value-1') {
            return menu.reply(combattant, {
                ephemeral: true
            });
        } else if  (menu.values[0].toLowerCase() === 'value-2')  {
            return menu.reply(voleur, {
                ephemeral: true
            });
        } else if (menu.values[0].toLowerCase() === 'value-3'){
            return menu.reply(mage, {
                ephemeral: true
            });
        } else {
            return menu.defer();
        }
    }
})*/


if(message.content === préfix + "classe"  || message.content === préfix + "Classe"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#5DADE2")
    .addField("●▬▬▬▬▬▬▬▬▬▬:crossed_swords: Classe ▬▬▬▬▬▬▬▬▬▬●", ":shield: **?Combattant**\n:dagger: **?Voleur**\n:sparkles: **?Mage**")
    .setImage("https://www.1zoom.me/big2/72/219926-jugra.jpg")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "combattant"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#2980B9")
    .addField("●▬▬▬▬▬▬▬▬▬▬:shield: Combattant ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes une classe polyvalente qui s'utilise en première ligne. Vous pouvez très bien être utilisé comme ''garde du corps'' voir comme un redoutable attaquant !")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Stats lvl 0 ▬▬▬▬▬▬▬▬▬▬●", ":heart: 60HP | :shield: 2AR | :crossed_swords: 10AT | :sparkles: 20MA ")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +10HP | :crossed_swords: +1AT | :shield: +0.5AR ")
    .addField(":chart_with_upwards_trend: **Liste des attaques du combattant**", "?Lvl combattant")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 15 entre ?Paladin ou ?Chevalier ")
    .setImage("https://media.discordapp.net/attachments/834159801130942466/835881460053049344/15dcb473500369cb918a91c44122a270_1.png?width=1014&height=676")
    message.channel.send(help_embed);
}



if(message.content.toLowerCase() === préfix + "lvl combattant"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#2980B9")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 1**", "**Vous obtenez une nouvelle compétence :** :crossed_swords: ``?Epee``\n"
    + "**Vous obtenez une nouvelle compétence :** :cyclone: ``?Regeneration de mana``\n**Vous obtenez une nouvelle compétence :** :cyclone: ``?Regeneration``\n**Vous obtenez une nouvelle compétence :** :cyclone: ``?Fuite``\n**Vous obtenez une nouvelle compétence :** :shield: ``?Roulade [Dégâts reçu]``")
    .addField(":sparkles: **LVL 3**", "**Vous obtenez une nouvelle compétence :** :shield: ``?CBlocage [Dégâts reçu]``")
    .addField(":sparkles: **LVL 7**", "**Vous obtenez une nouvelle compétence :** :crossed_swords: ``?Coup provocateur``")
    .addField(":sparkles: **LVL 12**","**Vous obtenez une passif ! (hors combat) :** Le travail paye ! Vous encaissez mieux les coups et physiquement il y a de fortes chances que vous ayez un summer body.")
    .addField(":sparkles: **LVL 15**", "**__Vous pouvez évoluer__**")
    .setFooter("Menu lvl combattant")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "mage"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#01CDFE")
    .addField("●▬▬▬▬▬▬▬▬▬▬:sparkles: Mage ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes un mage ! Vous êtes sur la deuxième ligne et pouvez être aussi bien fort pour ce qui est de soutenir votre équipe, ou bien pour infliger de gros dégâts !")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Stats lvl 0 ▬▬▬▬▬▬▬▬▬▬●", ":heart: 40HP |:shield: 0AR | :crossed_swords: 14AT | :sparkles: 40MA ")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +5HP | :crossed_swords: +1AT | :sparkles: +10MA ")
    .addField(":chart_with_upwards_trend: **Liste des attaques du mage**", "?Lvl mage")
    .addField(":diamond_shape_with_a_dot_inside: **évolution**", "évolution à partir du niveau 15 entre ?Sorcier ténébreux et ?Sorcier")
    .setImage("https://p4.wallpaperbetter.com/wallpaper/590/887/619/fantasy-magic-artistic-dark-wallpaper-preview.jpg")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl mage"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#01CDFE")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 1**", "**Vous obtenez une nouvelle compétence :** :crossed_swords: ``?Sort``\n"
    + "**Vous obtenez une nouvelle compétence :** :cyclone: ``?Regeneration de mana``\n**Vous obtenez une nouvelle compétence :** :cyclone: ``?Regeneration``\n**Vous obtenez une nouvelle compétence :** :cyclone: ``?Fuite``\n**Vous obtenez une nouvelle compétence :** :shield: ``?Roulade [Dégâts reçu]``")
    .addField(":sparkles: **LVL 3**", "**Vous obtenez une nouvelle compétence :** :shield: ``?MBlocage [Dégâts reçu]``")
    .addField(":sparkles: **LVL 7**", "**Une de vos compétences est amélioré :** :cyclone: ``?Regeneration de mana``")
    .addField(":sparkles: **LVL 12**", "**Vous obtenez une passif ! (hors combat) :** à force d'étudier, vous connaissez à peu près 95% des livres existant dans ce monde (seulement de nom et vaguement le contenu, cela ne veut pas dire que vous l'avez lut ! Loin de là !).")
    .addField(":sparkles: **LVL 15**", "**__Vous pouvez évoluer__**")
    .setFooter("Menu lvl mage")
    message.channel.send(help_embed);
}


if(message.content.toLowerCase() === préfix + "voleur"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#fe7b7b")
    .addField("●▬▬▬▬▬▬▬▬▬▬:dagger: Voleur ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes l'inverse d'une classe ''resistante'', vous êtes même fragile...Mais vous avez   une grande agilité !")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Stats lvl 0 ▬▬▬▬▬▬▬▬▬▬●", ":heart: 50HP | :shield: 1AR | :crossed_swords: 14AT | :sparkles: 20MA ")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +5HP | :crossed_swords: +2AT | :shield: +0.5AR ")
    .addField(":chart_with_upwards_trend: **Liste des attaques du voleur**", "?Lvl voleur")
    .addField(":diamond_shape_with_a_dot_inside: **évolution**", "évolution à partir du niveau 15 entre ?Archer ou ?Assassin")
    .setImage("https://i.pinimg.com/originals/4e/1b/c3/4e1bc397664b238556c617f88626438c.jpg")
    message.channel.send(help_embed);
}


if(message.content.toLowerCase() === préfix + "lvl voleur"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#fe7b7b")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 1**", "**Vous obtenez une nouvelle compétence :** :crossed_swords: ``?Dague``\n"
    + "**Vous obtenez une nouvelle compétence :** :cyclone: ``?Regeneration de mana``\n**Vous obtenez une nouvelle compétence :** :cyclone: ``?Regeneration``\n**Vous obtenez une nouvelle compétence :** :cyclone: ``?Fuite``\n**Vous obtenez une nouvelle compétence :** :shield: ``?Roulade [Dégâts reçu]``")
    .addField(":sparkles: **LVL 3**", "**Vous obtenez une nouvelle compétence :** :shield: ``?VBlocage [Dégâts reçu]``")
    .addField(":sparkles: **LVL 7**", "**Vous obtenez une nouvelle compétence :** :cyclone: ``?Fuite amélioré``")
    .addField(":sparkles: **LVL 12**", "**Vous obtenez une passif ! (hors combat) :** Vous gagnez en dextérité et êtes maintenant un vrai pickpoket (vous ne pouvez voler aucun item, simplement esthétique).")
    .addField(":sparkles: **LVL 15**", "**__Vous pouvez évoluer__**")
    .setFooter("Menu lvl voleur")
    message.channel.send(help_embed);
}


if(message.content.toLowerCase() === préfix + "paladin"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#1b6ea4")
    .addField("●▬▬▬▬▬▬▬▬▬▬:shield: Paladin ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution du combattant. Quelqu'un spécialisé dans la défense du groupe !")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +10HP | :crossed_swords: +1AT | :shield: +1AR | :sparkles: 5MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques du paladin**", "?Lvl paladin")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 30 entre ?Gardien ou ?Clerc")
    .setImage("https://c4.wallpaperflare.com/wallpaper/145/225/139/fantasy-art-dragon-shield-diablo-3-reaper-of-souls-wallpaper-preview.jpg")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl paladin"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#1b6ea4")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 16**", "**Une de vos compétences est amélioré :** :shield: ``?Cblocage [Dégâts reçu]``")
    .addField(":sparkles: **LVL 19**", "**Vous obtenez une nouvelle compétence :** :speaking_head: ``?Provocation``")
    .addField(":sparkles: **LVL 23**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime paladin``")
    .addField(":sparkles: **LVL 25**", "**Vous obtenez une passif ! (hors combat) :** Généralement (sauf exception), la présence du paladin laisse à croire que le groupe/son interlocuteur est plutôt en sécurité.")
    .addField(":sparkles: **LVL 27**", "**Une de vos compétences est amélioré :** :cyclone: ``?Regeneration``")
    .setFooter("Menu lvl paladin")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "chevalier"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#73c3f8")
    .addField("●▬▬▬▬▬▬▬▬▬▬:crossed_swords: Chevalier ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution du combattant. Quelqu'un de plutôt polyvalent !")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +15HP | :crossed_swords: +1AT | :shield: +0.5AR | :sparkles: 5MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques du chevalier**", "?Lvl chevalier")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 30 entre ?Berserk ou ?Duelliste")
    .setImage("https://p4.wallpaperbetter.com/wallpaper/265/611/760/knight-dark-souls-dark-souls-ii-artwork-fantasy-art-armor-sword-cape-video-games-heide-knight-wallpaper-preview.jpg")
    message.channel.send(help_embed);
}


if(message.content.toLowerCase() === préfix + "lvl chevalier"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#489ed7")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 16**", "**Une de vos compétences est amélioré :** :crossed_swords: ``?Epee``")
    .addField(":sparkles: **LVL 19**", "**Vous obtenez une nouvelle compétence :** :crossed_swords: ``?Coup etourdissant``")
    .addField(":sparkles: **LVL 23**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime chevalier``")
    .addField(":sparkles: **LVL 25**", "**Vous obtenez une passif ! (hors combat) :** En temps normal (sauf exception), vous êtes quelqu'un qui arrive à garder son sang-froid pour la plupart événements auquel il fait face (même en combat sauf face à la mort !).")
    .addField(":sparkles: **LVL 27**", "**Une de vos compétences est amélioré :** :cyclone: ``?Regeneration``")
    .setFooter("Menu lvl chevalier")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "archer"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#f8a765")
    .addField("●▬▬▬▬▬▬▬▬▬▬:bow: Archer ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution du voleur. Vous avez décidé de passer en deuxième ligne !")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +5HP | :crossed_swords: +2T | :shield: +0.5AR | :sparkles: 10MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques de l'archer**", "?Lvl archer")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 30 entre ?Maître archer ou ?Bombardier")
    .setImage("https://i.pinimg.com/originals/82/bb/33/82bb3334e8083bfae107211495d4314c.jpg")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl archer"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#f8a765")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 16**", "**Vous obtenez une nouvelle compétence :** :bow_and_arrow: ``?Tir``")
    .addField(":sparkles: **LVL 16**", "**Une de vos compétences est amélioré :** :shield: ``?Roulade``")
    .addField(":sparkles: **LVL 19**", "**Vous obtenez une nouvelle compétence :** :bow_and_arrow: ``?Tir perce armure``")
    .addField(":sparkles: **LVL 23**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime archer``")
    .addField(":sparkles: **LVL 25**", "**Vous obtenez une passif ! (hors combat) :** En temps normal (sauf exception), votre vue est bien meilleur qu'une personne autre que de la branche des archers !")
    .addField(":sparkles: **LVL 27**", "**Une de vos compétences est amélioré :** :mending_heart: ``?Bandage @pingDuJoueur``")
    .setFooter("Menu lvl archer")
    message.channel.send(help_embed);
}


if(message.content.toLowerCase() === préfix + "assassin"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#ff4444")
    .addField("●▬▬▬▬▬▬▬▬▬▬:dagger: Assassin ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution du voleur. Vous êtes très fragile...Mais faites terriblement mal au cible individuel !")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +5HP | :crossed_swords: +2T | :shield: +1AR | :sparkles: 5MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques de l'assassin**", "?Lvl assassin")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 30 entre ?Samouraï ou ?Prédateur")
    .setImage("https://images2.alphacoders.com/888/thumb-1920-888554.jpg")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl assassin"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#ff4444")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 16**", "**Une de vos compétences est amélioré :** :shield: ``?Roulade``")
    .addField(":sparkles: **LVL 19**", "**Vous obtenez une nouvelle compétence :** :cyclone: ``?Camouflage``")
    .addField(":sparkles: **LVL 23**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime assassin``")
    .addField(":sparkles: **LVL 25**", "**Vous obtenez une passif ! (hors combat) :** Lorsque vous le désirez, vous pouvez devenir légèrement transparant mais vous oblige à rester statique. Autant vous dire que vous pouvez facilement vous fondre dans le décor ! (mais vous n'êtes pas invisible, attention)")
    .addField(":sparkles: **LVL 27**", "**Une de vos compétences est amélioré :** :dagger: ``?Coup fatal``")
    .setFooter("Menu lvl assassin")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "sorcier"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#6fd9f2")
    .addField("●▬▬▬▬▬▬▬▬▬▬:blue_heart: Sorcier ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution du mage. vous avez le plus de mana et êtes bien plus endurant que vos cousins les sorciers ténébreux")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +5HP | :crossed_swords: +1T | :shield: +0.5AR | :sparkles: 15MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques du sorcier**", "?Lvl sorcier")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 30 entre ?Archimage ou ?Élu")
    .setImage("https://a-static.besthdwallpaper.com/chemin-de-l-exil-mage-fond-d-ecran-1920x1080-23840_48.jpg")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl sorcier"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#6fd9f2")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 16**", "**Vous obtenez une nouvelle compétence :** ::heartpulse: ``?Heal @pingDuJoueur``")
    .addField(":sparkles: **LVL 19**", "**Vous obtenez une nouvelle compétence :** :fire: ``?Boule de feu``")
    .addField(":sparkles: **LVL 23**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime Sorcier``")
    .addField(":sparkles: **LVL 25**", "**Vous obtenez une passif ! (hors combat) :** Vous êtes cappable d'invoquer une aura autours d'une personne pour calmer ses esprits(si elle a subit un choc par exemple). Plus la personne est haut level, plus ça peu prendre du temps...Et surtout, si la personne a un niveau supérieur au votre, ça ne fonctionnera pas.")
    .addField(":sparkles: **LVL 27**", "**Une de vos compétences est amélioré :** :cyclone: ``?Regeneration de mana``")
    .setFooter("Menu lvl sorcier")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "sorcier ténébreux"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#098aa9")
    .addField("●▬▬▬▬▬▬▬▬▬▬:black_heart: Sorcier ténébreux ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution du mage. Vous êtes peut-être peu endurant contrairement à vos cousins les sorciers...Mais vous au moins, vous savez faire mal !")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +5HP | :crossed_swords: +2T | :shield: +0.5AR | :sparkles: 10MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques du sorcier ténébreux**", "?Lvl sorcier ténébreux")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 30 entre ?Nécromancien ou ?Être maudit")
    .setImage("http://sepsis.s.e.pic.centerblog.net/b1ea4142.jpg")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl sorcier ténébreux"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#098aa9")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 16**", "**Vous obtenez une nouvelle compétence :** ::heartpulse: ``?Heal @pingDuJoueur``")
    .addField(":sparkles: **LVL 19**", "**Vous obtenez une nouvelle compétence :** :fire: ``?Boule de feu``")
    .addField(":sparkles: **LVL 23**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime Sorcier T``")
    .addField(":sparkles: **LVL 25**", "**Vous obtenez une passif ! (hors combat) :** Si une personne a 10 levels de moins que vous, vous êtes cappable de l'hyponitser pendant quelques secondes pour lui demander de répondre à une de vos questions (bien 1h de cooldown). L'hypnose est visible et vous demande de poser 2 doigt sur le front d'une personne. N'oubliez pas que vous ne pouvez pas connaître le lvl d'un autre joueur...Deviner le palier oui, mais pas le niveau !")
    .addField(":sparkles: **LVL 27**", "**Une de vos compétences est amélioré :** :cyclone: ``?Regeneration de mana``")
    .addField(":scroll: **Note**", "Les sorts ''heal'' et ''boule de feu'' ne sont pas les mêmes que ceux du sorcier !")
    .setFooter("Menu lvl sorcier ténébreux")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "berserk"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#346586")
    .addField("●▬▬▬▬▬▬▬▬▬▬:shield: :crossed_swords: Berserk ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution du chevalier. Vous êtes une classe basée sur la ''survie'' et probablement celle qui fait le plus de dégâts parmi tous les combattants. Une classe fortement conseillé pour les joueurs solitaires ou bien qui cherche à avoir leur indépendance en combat.")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +20HP | :crossed_swords: +3AT | :shield: +1AR | :sparkles: 5MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques du berserk**", "?Lvl berserk")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 45 en ??")
    .setImage("https://i.pinimg.com/originals/6e/eb/ef/6eebeffcc2a604a05b0a142ea82b7729.jpg")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl berserk"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#346586")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 31**", "**Votre compétence a été amélioré et a maintenant un vol de vie intégré :**  :crossed_swords: ``?Epee``")
    .addField(":sparkles: **LVL 33**", "**Vous obtenez une passif ! (hors combat) :** Vous êtes la classe la plus ''bestialle'' qui soit. Votre présence peut-être confondue avec un monstre ou une créature que l'on pourrait trouver dans des donjon à haut risques.")
    .addField(":sparkles: **LVL 35**", "**Vous obtenez une nouvelle compétence :** :speaking_head: ``?Hurlement hostile``")
    .addField(":sparkles: **LVL 37**", "**Vous obtenez une nouvelle compétence :** :shield: ``?BParade``")
    .addField(":sparkles: **LVL 39**", "**Vous obtenez une passif ! (hors combat) :** Naturellement, la violence et la vue des cadavres ne vous atteints que très peu. Vous pouvez être difficilement traumatisé de ce côté-là.")
    .addField(":sparkles: **LVL 41**", "**Vous obtenez une nouvelle compétence :** :crossed_swords: ``?BSéisme``")
    .addField(":sparkles: **LVL 43**", "**Vous obtenez une nouvelle compétence :** :heartpulse: ``?Hurlement régénérateur``")
    .addField(":sparkles: **LVL 44**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime Berserk``")
    .setFooter("Menu lvl berserk")
    message.channel.send(help_embed);
}


if(message.content.toLowerCase() === préfix + "duelliste"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#73c3f8")
    .addField("●▬▬▬▬▬▬▬▬▬▬:shield: :crossed_swords: Duelliste ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution du chevalier. Vous êtes la classe la plus polyvalente qui existe parmis les combattants !")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +15HP | :crossed_swords: +2AT | :shield: +1.5AR | :sparkles: 10MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques du duelliste**", "?Lvl duelliste")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 45 en ??")
    .setImage("https://images7.alphacoders.com/934/934064.jpg")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl duelliste"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#73c3f8")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 31**", "**Votre compétence a été amélioré.**  :crossed_swords: ``?Epee``")
    .addField(":sparkles: **LVL 33**", "**Vous obtenez une passif ! (hors combat) :** Votre présence laisse croire aux fameux bretteurs ou ''héro'' que l'on retrouve dans les contes de fantasy...")
    .addField(":sparkles: **LVL 35**", "**Vous obtenez une nouvelle compétence :** :crossed_swords: ``?Estoc``")
    .addField(":sparkles: **LVL 37**","**Votre compétence a été amélioré.**  :crossed_swords: ``?Coup etourdissant``")
    .addField(":sparkles: **LVL 39**", "**Vous obtenez une passif ! (hors combat) :**  Vous pouvez donner une allumette à une seule et unique personne. lorsqu'elle reçoit des dégâts, vous en serez au courant (mais ne connaissez pas sa géolocalisation !)")
    .addField(":sparkles: **LVL 41**", "**Vous obtenez une nouvelle compétence :** :heart_on_fire: ``?Armement``")
    .addField(":sparkles: **LVL 43**", "**Vous obtenez une nouvelle compétence :** :crossed_swords: ``?Combo``")
    .addField(":sparkles: **LVL 44**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime Duelliste``")
    .setFooter("Menu lvl duelliste")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "gardien"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#1b6ea4")
    .addField("●▬▬▬▬▬▬▬▬▬▬:shield: Gardien ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution du paladin. Vous êtes la classe la plus résistante de tous les combattants !")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +25HP | :crossed_swords: +1AT | :shield: +1.5AR | :sparkles: 5MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques du gardien**", "?Lvl gardien")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 45 en ??")
    .setImage("https://images.wallpapersden.com/image/download/black-knight-eternals-art-2020_a21ubWaUmZqaraWkpJRmbmdlrWZmZWg.jpg")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl gardien"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#1b6ea4")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 31**", "**Votre compétence a été amélioré.**  :shield: ``?CBlocage [Dégâts reçu]``")
    .addField(":sparkles: **LVL 33**", "**Vous obtenez une passif ! (hors combat) :** Lorsque vous bousculez quelqu'un, vous ne vous en rendez même plus compte...")
    .addField(":sparkles: **LVL 35**", "**Vous obtenez une nouvelle compétence :** :shield: ``?Esprit tenace``")
    .addField(":sparkles: **LVL 37**","**Votre compétence a été amélioré.**  :speaking_head: ``?Provocation``")
    .addField(":sparkles: **LVL 39**", "**Vous obtenez une passif ! (hors combat) :**  Vous êtes cappable de reconnaître les HP d'une personne au simple coup d'oeil ! (et donc, savoir s'il est resistant)")
    .addField(":sparkles: **LVL 41**", "**Vous obtenez une nouvelle compétence :** :shield: ``?CInterception [Dégâts reçu par l'alliée]``")
    .addField(":sparkles: **LVL 43**", "**Vous obtenez une nouvelle compétence :** :shield: ``?Mur d'acier [Dégâts reçu]``")
    .addField(":sparkles: **LVL 44**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime gardien``")
    .setFooter("Menu lvl gardien")
    message.channel.send(help_embed);
}


if(message.content.toLowerCase() === préfix + "clerc"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#1d8fd9")
    .addField("●▬▬▬▬▬▬▬▬▬▬:shield: Clerc ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution du paladin. Vous êtes une classe résistante et qui est spécialisé dans le support !")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +20HP | :crossed_swords: +1AT | :shield: +1.5AR | :sparkles: 10MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques du clerc**", "?Lvl clerc")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 45 en ??")
    .setImage("https://media.discordapp.net/attachments/918139711338475522/945402918557859850/9a5fe6488054a20da6c5be9908d9bfde.png?width=462&height=676")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl clerc"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#1d8fd9")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 31**", "**Votre compétence a été amélioré.**  :shield: ``?CBlocage [Dégâts reçu]``")
    .addField(":sparkles: **LVL 33**", "**Vous obtenez une passif ! (hors combat) :**Vous savez reconnaître quelqu'un qui est mentalement en danger ou qui a besoin d'aide au premier regard")
    .addField(":sparkles: **LVL 35**", "**Vous obtenez une nouvelle compétence :** :bust_in_silhouette: :shield: ``?Protection [@Joueur alliée]``")
    .addField(":sparkles: **LVL 37**","**Votre compétence a été amélioré.**  :speaking_head: ``?Provocation``")
    .addField(":sparkles: **LVL 39**", "**Vous obtenez une passif ! (hors combat) :**   Vous pouvez donner une allumette à une seule et unique personne. Vous pouvez connaître constament sa géolocalisation ! (mais vous ne savez pas si elle se blesse ou si elle est en danger).")
    .addField(":sparkles: **LVL 41**", "**Vous obtenez une nouvelle compétence :** :shield: ``?CInterception [Dégâts reçu par l'alliée]``")
    .addField(":sparkles: **LVL 43**", "**Vous obtenez une nouvelle compétence :** :heartpulse: ``?Célébration``")
    .addField(":sparkles: **LVL 44**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime clerc``")
    .setFooter("Menu lvl clerc")
    message.channel.send(help_embed);
}


if(message.content.toLowerCase() === préfix + "nécromancien"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#0b4a87")
    .addField("●▬▬▬▬▬▬▬▬▬:book: Nécromancien ▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution du sorcier ténébreux. Une classe qui se base sur des ''invocations'', mais qui consomme énormément de mana.")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +5HP | :crossed_swords: +2AT | :shield: +1AR | :sparkles: 25MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques du nécromancien**", "?Lvl nécromancien")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 45 en ??")
    .setImage("https://images6.alphacoders.com/106/thumb-1920-1065654.png")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl nécromancien"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#0b4a87")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 31**", "**Vous obtenez une nouvelle compétence :** :bust_in_silhouette: ``?Invocation chevalier``")
    .addField(":sparkles: **LVL 33**", "**Vous obtenez une passif ! (hors combat) :** Vous êtes une hérésie de ce monde, il est difficile pour n'importe qui de vous faire confiance si l'on ne vous connais pas.")
    .addField(":sparkles: **LVL 35**", "**Vous obtenez une nouvelle compétence :** :no_entry_sign: ``?Destruction [chevalier ou archer]``")
    .addField(":sparkles: **LVL 37**", "**Vous obtenez une nouvelle compétence :** :o: ``?Ciblage d'invocation``")
    .addField(":sparkles: **LVL 39**", "**Vous obtenez une passif ! (hors combat) :** Vous pouvez parler avec les morts (joueurs) et même donner la possibilité à quelqu'un de parler à un mort pour une petite durée (il faut un contact physique avec le nécromancien). Si le joueur est mort il y a plus de 3 semaines, alors cela est impossible.")
    .addField(":sparkles: **LVL 41**", "**Vous obtenez une nouvelle compétence :** :bust_in_silhouette: ``?Pilier du nécromancien``")
    .addField(":sparkles: **LVL 43**", "**Vous obtenez une nouvelle compétence :** :bust_in_silhouette: ``?Invocation archer``")
    .addField(":sparkles: **LVL 44**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime nécromancien``")
    .setFooter("Menu lvl nécromancien")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "être maudit"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#20374c")
    .addField("●▬▬▬▬▬▬▬▬▬:book: Être maudit ▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution du sorcier ténébreux. Contrairement au nécromancien, vous n'êtes pas un ''invocateur''. Vous êtes là pour faire des dégâts et infliger des malus à vos adversaires.")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +5HP | :crossed_swords: +3AT | :shield: +1AR | :sparkles: 20MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques du être maudit**", "?Lvl être maudit")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 45 en ??")
    .setImage("https://hdfondsdecran.com/image/201609/2389/trone-rayon-necromancien.jpg")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl être maudit"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#20374c")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 31**", "**Votre compétence a été amélioré.** :fire: ``?Boule de feu``")
    .addField(":sparkles: **LVL 33**", "**Vous obtenez une passif ! (hors combat) :** Vous êtes une hérésie de ce monde, il est difficile pour n'importe qui de vous faire confiance si l'on ne vous connais pas.")
    .addField(":sparkles: **LVL 35**", "**Vous obtenez une nouvelle compétence :** :face_in_clouds: ``?Confusion``")
    .addField(":sparkles: **LVL 37**", "**Vous obtenez une nouvelle compétence :** :warning: ``?Réduction attaque [@Ping si joueur]``")
    .addField(":sparkles: **LVL 39**", "**Vous obtenez une passif ! (hors combat) :** Lorsque des mobs ou des personnes meurent proches de vous (dans la même catégorie de channel). Vous en êtes informé mais ne connaissez pas le tueur ni même ''qui est mort''.")
    .addField(":sparkles: **LVL 41**", "**Vous obtenez une nouvelle compétence :** :warning: ``?Brise armure [@ping si joueur]``")
    .addField(":sparkles: **LVL 43**", "**Vous obtenez une nouvelle compétence :** :warning: ``?Vol de mana [@ping joueur]``")
    .addField(":sparkles: **LVL 44**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime être maudit``")
    .setFooter("Menu lvl être maudit")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "archimage"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#00cdfd")
    .addField("●▬▬▬▬▬▬▬▬▬▬:book: Archimage ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution du sorcier. Vous êtes la classe des sorciers la plus polyvalente ! Il ne faut surtout pas vous sous-estimer.")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +10HP | :crossed_swords: +2AT | :shield: +0.5AR | :sparkles: 25MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques de l'Archimage**", "?Lvl archimage")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 45 en ??")
    .setImage("https://wallpaperaccess.com/full/3464413.jpg")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl archimage"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#00cdfd")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 31**", "**Votre compétence a été amélioré.** :crossed_swords: ``?Sort``")
    .addField(":sparkles: **LVL 33**", "**Vous obtenez une passif ! (hors combat) :** Vous êtes le plus amène à être capable de faire de terribles découvertes.")
    .addField(":sparkles: **LVL 35**", "**Vous obtenez une nouvelle compétence :** :low_brightness: ``?Localisation``")
    .addField(":sparkles: **LVL 37**", "**Vous obtenez une nouvelle compétence :** :crossed_swords: ``?Slash``")
    .addField(":sparkles: **LVL 39**", "**Vous obtenez une passif ! (hors combat) :** Vous avez la capacité de déduire le niveau des joueurs et des monstres simplement en les regardant.")
    .addField(":sparkles: **LVL 41**", "**Votre compétence a été amélioré.** :cyclone: ``?Regeneration de mana``")
    .addField(":sparkles: **LVL 43**", "**Vous obtenez une nouvelle compétence :** :bust_in_silhouette: ``?Petit ange``")
    .addField(":sparkles: **LVL 44**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime Archimage``")
    .setFooter("Menu lvl archimage")
    message.channel.send(help_embed);
}


if(message.content.toLowerCase() === préfix + "élu"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#56f2e5")
    .addField("●▬▬▬▬▬▬▬▬▬▬:book: Élu ▬▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution du sorcier. Vous êtes le meilleur support et en plus de cela, la classe qui a le plus de mana (mais vous allez en avoir besoin) !")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +5HP | :crossed_swords: +1AT | :shield: +1AR | :sparkles: 30MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques de l'Élu**", "?Lvl élu")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 45 en ??")
    .setImage("https://media.discordapp.net/attachments/939980293253759036/948148826886254592/staff-mage-blonde-anime-girl-long-hair-1280x800-wallpx.com_1.jpg?width=1083&height=677")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl élu"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#56f2e5")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 31**", "**Votre compétence a été amélioré.** :heartpulse: ``?Soins``")
    .addField(":sparkles: **LVL 33**", "**Vous obtenez une passif ! (hors combat) :** Vous êtes une lumière pour énormément de monde. Votre présence réduit le stress et la férocité de nombreuses personnes.")
    .addField(":sparkles: **LVL 35**", "**Vous obtenez une nouvelle compétence :** :heartpulse: ``?Barrière @Joueur``")
    .addField(":sparkles: **LVL 37**", "**Vous obtenez une nouvelle compétence :** :heartpulse: ``?Soins de zone``")
    .addField(":sparkles: **LVL 39**", "**Vous obtenez une passif ! (hors combat) :** Vous pouvez voir un de vos amis(et uniquement amis) à travers un miroir. 5minutes par personne maximum ! (et par jour).")
    .addField(":sparkles: **LVL 41**", "**Vous obtenez une nouvelle compétence :** :heartpulse: ``?Dissipation @joueur``")
    .addField(":sparkles: **LVL 43**", "**Vous obtenez une nouvelle compétence :** :bust_in_silhouette: ``?Petit ange``")
    .addField(":sparkles: **LVL 44**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime Élu``")
    .setFooter("Menu lvl élu")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "bombardier"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#e95715")
    .addField("●▬▬▬▬▬▬▬▬▬:bow_and_arrow: Bombardier ▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution de l'archer. Vous êtes le roi en terme de dégâts de zone. Dès qu'il faut faire le ménage parmi les nuisibles, c'est vous le chef !")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +5HP | :crossed_swords: +3AT | :shield: +1AR | :sparkles: 20MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques du bombardier**", "?Lvl bombardier")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 45 en ??")
    .setImage("https://i.pinimg.com/originals/a3/71/fd/a371fd640281371de0b4993085926ea2.jpg")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl bombardier"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#e95715")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 31**", "**Votre compétence a été amélioré.** :crossed_swords: ``?Tir``")
    .addField(":sparkles: **LVL 33**", "**Vous obtenez une passif ! (hors combat) :** Vos oreilles sont très résistantes. On pourrait crier dans vos oreilles que cela n'aurait aucun effet sur vos tympans.")
    .addField(":sparkles: **LVL 35**", "**Vous obtenez une nouvelle compétence :** :crossed_swords: ``?Explosion``")
    .addField(":sparkles: **LVL 37**", "**Vous obtenez une nouvelle compétence :** :crossed_swords: ``?Lance flamme``")
    .addField(":sparkles: **LVL 39**", "**Vous obtenez une passif ! (hors combat) :** Vous avez une très bonne ouïe ce qui vous permet d'entendre le moindre bruit là où vous êtes. (donc si un assassin tente de vous surprendre, cela ne fonctionnera pas).")
    .addField(":sparkles: **LVL 41**", "**Vous obtenez une nouvelle compétence :** :crossed_swords: ``?Bombardement``")
    .addField(":sparkles: **LVL 43**", "**Vous obtenez une nouvelle compétence :** :bust_in_silhouette:  ``?Tourelle``")
    .addField(":sparkles: **LVL 44**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime Bombardier``")
    .setFooter("Menu lvl bombardier")
    message.channel.send(help_embed);
}


if(message.content.toLowerCase() === préfix + "maître archer"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#ac6719")
    .addField("●▬▬▬▬▬▬▬▬▬:bow_and_arrow: Maître archer ▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution de l'archer. La crème de la crème et qui plus est polyvalent, alternant sur des dégâts de cible unique, ou bien via des compétences de poison.")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +10HP | :crossed_swords: +4AT | :shield: +0.5AR | :sparkles: 15MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques du maître archer**", "?Lvl maître archer")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 45 en ??")
    .setImage("https://images-ext-2.discordapp.net/external/VVSPfgE6jPoP5j0OYLXCn4ebPnIpUhzvBOmxWWsaoic/https/i.pinimg.com/originals/80/27/10/802710d278ac8d7cf25daf11b77fc13b.jpg")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl maître archer"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#ac6719")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 31**", "**Votre compétence a été amélioré.** :crossed_swords: ``?Tir``")
    .addField(":sparkles: **LVL 33**", "**Vous obtenez une passif ! (hors combat) :** Vous avez de très bon yeux ! Au point qu'ils ne sont plus trop sensible aux changement brutals de couleur.")
    .addField(":sparkles: **LVL 35**", "**Vous obtenez une nouvelle compétence :** :crossed_swords: ``?Enchaînement``")
    .addField(":sparkles: **LVL 37**", "**Vous obtenez une nouvelle compétence :** :crossed_swords: ``?Tir rapide``")
    .addField(":sparkles: **LVL 39**", "**Vous obtenez une passif ! (hors combat) :** Vous pouvez voir dans le noir.")
    .addField(":sparkles: **LVL 41**", "**Vous obtenez une nouvelle compétence :** :crossed_swords: ``?Fumée empoisonante``")
    .addField(":sparkles: **LVL 43**", "**Vous obtenez une nouvelle compétence :** :bust_in_silhouette:  ``?Maître loup``")
    .addField(":sparkles: **LVL 44**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime Maître archer``")
    .setFooter("Menu lvl bombardier")
    message.channel.send(help_embed);
}


if(message.content.toLowerCase() === préfix + "prédateur"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .addField("●▬▬▬▬▬▬▬▬▬:dagger: Prédateur ▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution de l'assassin. Vous êtes et disant les termes, un monstre en terme de dégâts à cible unique. Vous êtes fait pour détruire une seule et unique personne ce qui est autant un point positif qu'un point négatif...Car oui, votre gros problème est sur la défense. Autant dire que sans groupe, vous êtes fragile.")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +10HP | :crossed_swords: +4AT | :shield: +1.5AR | :sparkles: 5MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques du bombardier**", "?Lvl prédateur")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 45 en ??")
    .setImage("http://cdn.wallpaperhi.com/2559x1600/20140226/paintings%20landscapes%20assassin%20illustrations%20fantasy%20art%20digital%20art%20artwork%20drawings%20shinobi%20airbrushed%20christian%20quinot_www.wallpaperhi.com_65.jpg")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl prédateur"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 31**", "**Votre compétence a été amélioré.** :crossed_swords: ``?Dague``")
    .addField(":sparkles: **LVL 33**", "**Vous obtenez une passif ! (hors combat) :** Vous pouvez difficilement vous balader dans des endroits civiliser sans qu'en vous prennent pour un voleur et qu'en essaye donc de vous 'stopper'...")
    .addField(":sparkles: **LVL 35**", "**Vous obtenez une nouvelle compétence (utilisable avant n'importe quel blocage) :** :shield: ``?Transparance``")
    .addField(":sparkles: **LVL 37**", "**Votre compétence a été amélioré.** :crossed_swords: ``?Coup fatal``")
    .addField(":sparkles: **LVL 39**", "**Vous obtenez une passif ! (hors combat) :** Vous êtes capable de déduire l'attaque des monstres et des joueurs rien qu'en les regardant")
    .addField(":sparkles: **LVL 41**", "**Vous obtenez une nouvelle compétence :** :drop_of_blood: ``?Saignement``")
    .addField(":sparkles: **LVL 43**", "**Vous obtenez une nouvelle compétence :** :o:  ``?Marquage``")
    .addField(":sparkles: **LVL 44**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime Prédateur``")
    .setFooter("Menu lvl prédateur")
    message.channel.send(help_embed);
}


if(message.content.toLowerCase() === préfix + "samouraï"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#9f2121")
    .addField("●▬▬▬▬▬▬▬▬▬:dagger: Samouraï ▬▬▬▬▬▬▬▬▬●", "Vous êtes l'évolution de l'assassin. Contrairement à votre confrère le ''prédateur'', vos compétences sont moins offensifs/destructrices...Vous êtes disant le ''plus polyvalent''.")
    .addField("●▬▬▬▬▬▬▬▬▬▬:abacus: Bonus par lvl ▬▬▬▬▬▬▬▬▬●", ":heart: +10HP | :crossed_swords: +4AT | :shield: +1AR | :sparkles: 10MA")
    .addField(":chart_with_upwards_trend: **Liste des attaques du samouraï**", "?Lvl samouraï")
    .addField(":diamond_shape_with_a_dot_inside: **Évolution**", "Évolution à partir du niveau 45 en ??")
    .setImage("https://i.pinimg.com/564x/a1/31/f1/a131f10069fbef1154a4eaf5dfe1d51e.jpg")
    message.channel.send(help_embed);
}

if(message.content.toLowerCase() === préfix + "lvl samouraï"){
    var help_embed = new Discord.MessageEmbed()
    .setColor("#9f2121")
    .setDescription("```Voici ce que vous pourrez gagner à chaque étape```")
    .addField(":sparkles: **LVL 31**", "**Votre compétence a été amélioré.** :crossed_swords: ``?Dague``")
    .addField(":sparkles: **LVL 33**", "**Vous obtenez une passif ! (hors combat) :** Vous pouvez difficilement vous balader dans des endroits civiliser sans qu'en vous prennent pour un voleur et qu'en essaye donc de vous 'stopper'...")
    .addField(":sparkles: **LVL 35**", "**Vous obtenez une nouvelle compétence :** :shield: :crossed_swords: ``?Propulsion`` et ``?Lancer de dague``")
    .addField(":sparkles: **LVL 37**", "**Vous obtenez une nouvelle compétence :** :crossed_swords: ``Attaque célèste``")
    .addField(":sparkles: **LVL 39**", "**Vous obtenez une passif ! (hors combat) :** Aucune passif de détéction ou de géolocalisation ne fonctionne sur vous !")
    .addField(":sparkles: **LVL 41**", "**Vous obtenez une nouvelle compétence :** :drop_of_blood: ``?Poison``")
    .addField(":sparkles: **LVL 43**", "**Vous obtenez une nouvelle compétence :** :crossed_swords:  ``?Assassinat``")
    .addField(":sparkles: **LVL 44**", "**Vous obtenez une nouvelle compétence :** :crown: ``?Ultime Maître assassin``")
    .setFooter("Menu lvl maître assassin")
    message.channel.send(help_embed);
}








