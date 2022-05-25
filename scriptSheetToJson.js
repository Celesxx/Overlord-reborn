//==================================================================================
//Copier coller les lignes de sheet dans var str = ``;
var str = `petit démon sanguinaire	démon-cs	2	8	150	7	20	taverne	60	25	55	15	15	10	20	0	2	1	-1	fonce sur vous et vous assène un violent coup d'épée infligeant	lève son épée bien haut avant de vous assèner un énorme coup d'épée infligeant de lourd dégat 	-80	30	15	30	hurle de toute ses forces d'un crie démoniaque d'une grande puissance causant en vous un frisson de terreur, ce qui embrouille votre perception du combat et vous oblige à frapper en priorité le démond pendant ce tour et le prochain		10	0	1	1	1	-1	hurle de toute ses forces d'un crie démoniaque causant en vous un frisson de terreur, ce qui embrouille votre perception du combat et vous oblige à frapper en priorité le démond pendant ce tour et le prochain	20	45	10	20	10	5	1	-1	50 bronze	60 bronze			25	50	Un guerrier démon prêt à vous découper d'une rare violence	https://media.discordapp.net/attachments/951928506021998652/977590180649259018/73d094d94343fdf4720e0ba6e7aeabea.gif	https://media.discordapp.net/attachments/951928506021998652/977589971793879130/8ed862883a12ecaac7175809022035eefa405e97_hq.gif	https://cdn.discordapp.com/attachments/951928506021998652/977589972762755092/giphy.gif	https://cdn.discordapp.com/attachments/951928506021998652/977589972183961630/370r.gif	https://media.discordapp.net/attachments/951928506021998652/977589974465667152/telechargement.gif`
//==================================================================================




//==================================================================================
//retourne l'objet de spawn
function spawn(zone,drop){
    var tabZone = zone.split(",");
    var tabDrop = drop.split(",");
    var tabObj = [];
    for(var k =0;k<tabZone.length;k++){
        tabObj.push(`{"zone":"${tabZone[k]}","drop":${tabDrop[k]}}`);
    }
    return tabObj.join(",");
}
//==================================================================================
//Retourne le nombre de gold en se basant sur une case du sheet
function gold(val,type){
    if(val.includes(type)){ 
        var tabVal = val.split(",");
        for(e of tabVal){
            if(e.includes(type)){
                var tabE = e.split(" ");
                return tabE[0];
            }
        }
    }
    return 0; 
}
//==================================================================================
//Prend un résultats et le formate pour match avec l'écriture array en JSON
function makeArray(str){
    if(str != ""){ 
        var strTab = str.split(',');
        if(strTab.length == 1){
            return '"'+str+'"'; // Return si qu'un élément
        }
        return strTab.join('","'); //Return si plusieurs éléments
    }
    return str; //Return si vide
}
//==================================================================================
//Un monstre
function unObjet(str){
    var tabStr = str.split("\t");
    if(tabStr.length != 54){ //Car sinon ça peut tout décaler  'n'
        return "";
    }
    var json = `
    "${tabStr[1]}": {
        "nom": "${tabStr[0]}", 
        "nomId": "${tabStr[1]}",
        "image": "${tabStr[49]}",
        "imageAttaque": "${tabStr[50]}",
        "imageCritique": "${tabStr[51]}",
        "imageSkill": "${tabStr[52]}",
        "imageMiss": "${tabStr[53]}",
        "description": "${tabStr[48]}",
        "lvl": ${tabStr[3]},
        "hp": [${tabStr[4]}, ${tabStr[5]}],
        "armure": ${tabStr[6]},
        "spawn": [${spawn(tabStr[7],tabStr[8])}],
        "position": ${tabStr[2]},
        "attaque": 
        {
            "description": "${tabStr[19]}",
            "descriptionCrit": "${tabStr[20]}",
            "degat": [${tabStr[9]}, ${tabStr[10]}],
            "crit": [${tabStr[11]}, ${tabStr[12]}],
            "miss": ${tabStr[13]},
            "penetration": ${tabStr[14]},
            "poison": ${tabStr[15]},
            "level": [${tabStr[16]},${tabStr[17]},${tabStr[18]}]
        },
        "attaqueSpecial": 
        [{
            "activation": ${tabStr[22]},
            "description": "${tabStr[33]}",
            "repeat": [${tabStr[28]}, ${tabStr[29]}],
            "degatBonus": ${tabStr[21]},
            "crit":
            {
                "description": "${tabStr[25]}",
                "activation": ${tabStr[23]},
                "degatBonus": ${tabStr[24]}
            },
            "miss": ${tabStr[27]},
            "level": [${tabStr[30]},${tabStr[31]},${tabStr[32]}]
        }],
        "blocage": 
        {
            "degat": [${tabStr[34]},${tabStr[35]}],
            "crit": [${tabStr[36]}, ${tabStr[37]}],
            "miss": ${tabStr[38]},
            "level": [${tabStr[39]},${tabStr[40]},${tabStr[41]}]
        },
        "loot": 
        {
            "gold":
            {
                "bronze": [${gold(tabStr[42],"bronze")},${gold(tabStr[43],"bronze")}],
                "argent": [${gold(tabStr[42],"argent")},${gold(tabStr[43],"argent")}],
                "or": [${gold(tabStr[42],"or")},${gold(tabStr[43],"or")}]
            },
            "item": 
            { 
                "chance": [${tabStr[44]}], 
                "loot": [${makeArray(tabStr[45])}]
            },
            "xp": [${tabStr[46]},${tabStr[47]}]
        }
    }`;
    return json;
}
//==================================================================================

base = "{";
var rows = str.split("\n");
for(row of rows){
    var obj = unObjet(row)
    if(obj == ""){
        continue;
    }
    base+= obj+",";
}
base+="\n}";
console.log(base); 
//Possibilité de mettre le res dans un txt avec
// node zelgius.js > res.txt