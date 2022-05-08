

exports.monstreExist = (monstre, functionName) => 
{   
    return {
        state: false,
        message: `Le monstre ${monstre.nom} existe déja`,
        log: `The following monster ${monstre.nom} already exist.`,
        function: functionName,
        monstre: monstre,
    }
}

exports.monstreCreated = (monstre, functionName) => 
{   
    return {
        state: true,
        message: `La création du monstre ${monstre.nom} est une réussite !`,
        log: `The following monster ${monstre.nom} have been created.`,
        function: functionName,
        monstre: monstre,
    }
}

exports.playerExist = (player, functionName) => 
{   
    return {
        state: false,
        message: `Le player <@${player.id}> existe déja`,
        log: `The following player <@${player.id}> already exist.`,
        function: functionName,
        player: player,
    }
}

exports.playerCreated = (player, functionName) => 
{   
    return {
        state: true,
        message: `La création du player <@${player.id}> est une réussite !`,
        log: `The following player <@${player.id}> have been created.`,
        function: functionName,
        player: player,
    }
}

exports.skillExist = (skill, functionName) => 
{   
    return {
        state: false,
        message: `Le skill ${skill.nom} existe déja`,
        log: `The following skill ${skill.nom} already exist.`,
        function: functionName,
        skill: skill,
    }
}

exports.skillCreated = (skill, functionName) => 
{   
    return {
        state: true,
        message: `La création du skill ${skill.nom} est une réussite !`,
        log: `The following skill ${skill.nom} have been created.`,
        function: functionName,
        skill: skill,
    }
}

exports.zoneExist = (zone, functionName) => 
{   
    return {
        state: false,
        message: `Le zone ${zone.nom} existe déja`,
        log: `The following zone ${zone.nom} already exist.`,
        function: functionName,
        zone: zone,
    }
}

exports.zoneCreated = (zone, functionName) => 
{   
    return {
        state: true,
        message: `La création du zone ${zone.nom} est une réussite !`,
        log: `The following zone ${zone.nom} have been created.`,
        function: functionName,
        zone: zone,
    }
}


exports.logCombatExist = (logCombat, functionName) => 
{   
    return {
        state: false,
        message: `Le log de combat ${logCombat.combatId} existe déja`,
        log: `The following log of combat ${logCombat.combatId} already exist.`,
        function: functionName,
        logCombat: logCombat,
    }
}

exports.logCombatCreated = (logCombat, functionName) => 
{   
    return {
        state: true,
        message: `La création du log de combat ${logCombat.combatId} est une réussite !`,
        log: `The following log of combat ${logCombat.combatId} have been created.`,
        function: functionName,
        logCombat: logCombat,
    }
}

exports.contentError = (functionName, filename, err) =>
{
    return {
        state: false,
        message: `Une erreur est survenu`,
        log: `An error append in file : ${filename} with following function : ${functionName} with error : ${err} `,
    }
}




exports.shopExist = (shop, functionName) => 
{   
    return {
        state: false,
        message: `L'item ${shop.nomId} existe déja`,
        log: `The following item ${shop.nomId} already exist.`,
        function: functionName,
        shop: shop,
    }
}

exports.shopCreated = (shop, functionName) => 
{   
    return {
        state: true,
        message: `La création de l'item ${shop.nomId} est une réussite !`,
        log: `The following item ${shop.nomId} have been created.`,
        function: functionName,
        shop: shop,
    }
}



exports.bumpExist = (logBump, functionName) => 
{   
    return {
        state: false,
        message: `Le log bump de l'user ${logBump.userId} existe déja`,
        log: `The following user log of bump ${logBump.userId} already exist.`,
        function: functionName,
        logBump: logBump,
    }
}

exports.bumpCreated = (logBump, functionName) => 
{   
    return {
        state: true,
        message: `La création du log bump de l'user ${logBump.userId} est une réussite !`,
        log: `The following user log of bump${logBump.userId} have been created.`,
        function: functionName,
        logBump: logBump,
    }
}
