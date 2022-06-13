//==================================================================================
//Copier coller les lignes de sheet dans var str = ``;
let str = `Petit anneau de vitalité	anneau-vs	-	false	true	true	true	true	10	0	0,00%	0,00%	0	-	-	-	-	-	-	-	100	100	0			
Anneau de vitalité	anneau-vm	-	false	true	true	true	true	20	0	0,00%	0,00%	0	-	-	-	-	-	-	-	400	100	3			
Grand anneau de vitalité	anneau-vl	-	false	true	true	true	true	40	0	0,00%	0,00%	0	-	-	-	-	-	-	-	1600	100	15			
Anneau de vitalité suprême	anneau-vx	-	false	true	true	true	true	60	0	0,00%	0,00%	0	-	-	-	-	-	-	-	4800	100	47			
Petit anneau de mana	anneau-ms	-	false	true	true	true	true	0	20	0,00%	0,00%	0	-	-	-	-	-	-	-	120	20	1			
Anneau de mana	anneau-mm	-	false	true	true	true	true	0	40	0,00%	0,00%	0	-	-	-	-	-	-	-	480	80	4			
Grand anneau de mana	anneau-ml	-	false	true	true	true	true	0	60	0,00%	0,00%	0	-	-	-	-	-	-	-	1440	40	14			
Anneau de mana suprême	anneau-mx	-	false	true	true	true	true	0	80	0,00%	0,00%	0	-	-	-	-	-	-	-	3840	40	38			
Petit anneau de resistance	anneau-rs	-	false	true	true	true	true	0	0	2,00%	0,00%	0	-	-	-	-	-	-	-	240	40	2			
Anneau de resitance	anneau-rm	-	false	true	true	true	true	0	0	4,00%	0,00%	0	-	-	-	-	-	-	-	960	60	9			
Grand anneau de resitance	anneau-rl	-	false	true	true	true	true	0	0	6,00%	0,00%	0	-	-	-	-	-	-	-	2880	80	28			
Anneau de mana resitance	anneau-rx	-	false	true	true	true	true	0	0	8,00%	0,00%	0	-	-	-	-	-	-	-	7680	80	76			
Petit anneau de protection	anneau-ps	-	false	true	true	true	true	0	0	0,00%	2,00%	0	-	-	-	-	-	-	-	240	40	2			
Anneau de protection	anneau-pm	-	false	true	true	true	true	0	0	0,00%	4,00%	0	-	-	-	-	-	-	-	960	60	9			
Grand anneau de protection	anneau-pl	-	false	true	true	true	true	0	0	0,00%	6,00%	0	-	-	-	-	-	-	-	2880	80	28			
Anneau de mana protection	anneau-px	-	false	true	true	true	true	0	0	0,00%	8,00%	0	-	-	-	-	-	-	-	7680	80	76			
Petit anneau de force	anneau-fs	-	false	true	true	true	true	0	0	0,00%	0,00%	4	-	-	-	-	-	-	-	240	40	2			
Anneau de force	anneau-fm	-	false	true	true	true	true	0	0	0,00%	0,00%	8	-	-	-	-	-	-	-	960	60	9			
Grand anneau de force	anneau-fl	-	false	true	true	true	true	0	0	0,00%	0,00%	16	-	-	-	-	-	-	-	3840	40	38			
Anneau de force suprême	anneau-fx	-	false	true	true	true	true	0	0	0,00%	0,00%	25	-	-	-	-	-	-	-	12000	100	19			`
//==================================================================================
//max 31

function unObjet(str)
{
    var tabStr = str.split("\t");
    // if(tabStr.length != 21){ //Car sinon ça peut tout décaler  'n'
    //     return "";
    // }
    var json = `
    "${tabStr[0]}": 
    {
        "nom": "${tabStr[0] != "-" ? tabStr[0] : ""}",
        "nomId": "${tabStr[1] != "-" ? tabStr[1] : ""}",
        "type": "${tabStr[2] != "-" ? tabStr[2] : ""}",
        "unique": ${tabStr[3] != "-" ? tabStr[3] : tabStr[3] == VRAI ? true : tabStr[3] == FAUX ? false : ""},
        "exclusif":
        {
            "combattant": ${tabStr[4] != "-" ? tabStr[4] : tabStr[4] == VRAI ? true : tabStr[4] == FAUX ? false : ""},
            "voleur": ${tabStr[5] != "-" ? tabStr[5] : tabStr[5] == VRAI ? true : tabStr[5] == FAUX ? false : ""},
            "mage": ${tabStr[6] != "-" ? tabStr[6] : tabStr[6] == VRAI ? true : tabStr[6] == FAUX ? false : ""},
            "archer": ${tabStr[7] != "-" ? tabStr[7] : tabStr[7] == VRAI ? true : tabStr[7] == FAUX ? false : ""}
        },
        "statistique": 
        {
            "hp": ${tabStr[8] != "-" ? tabStr[8] : "0"},
            "mana": ${tabStr[9] != "-" ? tabStr[9] : "0"},
            "defensePhysique": ${tabStr[10] != "-" ? tabStr[10].replace(/[%]/gm, "").replace(/[,]/gm, ".") : "0"},
            "defenseMagique": ${tabStr[11] != "-" ? tabStr[11].replace(/[%]/gm, "").replace(/[,]/gm, ".") : "0"},
            "degat": ${tabStr[12] != "-" ? tabStr[12] : "0"},
            "penetration": ${tabStr[13] != "-" ? tabStr[13].replace(/[%]/gm, "").replace(/[,]/gm, ".") : "0"},
            "critique": ${tabStr[14] != "-" ? tabStr[14].replace(/[%]/gm, "").replace(/[,]/gm, ".") : "0"}
        },
        "soins":
        {
            "hp": ${tabStr[15] != "-" ? tabStr[15] : "0"},
            "mana": ${tabStr[16] != "-" ? tabStr[16] : "0"}
        },
        "effet": "${tabStr[17] != "-" ? tabStr[17] : ""}",
        "description": "${tabStr[18] != "-" ? tabStr[18] : ""}",
        "image": "${tabStr[19] != "-" ? tabStr[19] : ""}",
        "price": [${tabStr[20] != "-" ? tabStr[20] : "0"}, ${tabStr[21] != "-" ? tabStr[21] : "0"}, ${tabStr[22] != "-" ? tabStr[22] : "0"} ]
    }`
    return json;
}
//==================================================================================

async function itemToJson(str)
{
    base = "{"
    let rows = str.split("\n");
    for(row of rows)
    {
        let obj = await unObjet(row)
        
        if(obj == "")
        {
            continue;
        }
        base+= obj+",";
    }

    base+="\n}"
    return base
}

Promise.resolve(itemToJson(str))
.then(result => 
{
    console.log(result)
})
//Possibilité de mettre le res dans un txt avec
// node zelgius.js > res.txt