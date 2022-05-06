const PlayerController = require('../../controllers/player.controller')
const classBdd = require('../../bdd/classe.json')



class PlayerCreationFunction 
{


    /**
     * @param {Object} data
     * @param {String} id
    */
    async playerCreation(id, nom, prenom, race, classe, image)
    {
        try
        {
            let stat = {}
            
            let statistique = classBdd[classe].statistiques
            let [hp , mana, attaque, armure, protection] = [statistique.hp, statistique.mana, statistique.attaque, statistique.armure, statistique.protection]
            stat = {hp: [hp, hp], magie: [mana, mana], attaque: [attaque, attaque], armure: [armure, armure], protection: [protection, protection]}

            if(race == "humain") stat.hp.push(1), stat.magie.push(1), stat.attaque.push(1), stat.armure.push(1), stat.protection.push(1)
            else if(race == "automate") stat.hp.push(1.05), stat.magie.push(0.90), stat.attaque.push(1.05), stat.armure.push(0.95), stat.protection.push(1.05)
            else if(race == "beastman") stat.hp.push(1.3), stat.magie.push(0.7), stat.attaque.push(1), stat.armure.push(1), stat.protection.push(1)
            else if(race == "elf") stat.hp.push(0.9), stat.magie.push(1.1), stat.attaque.push(1), stat.armure.push(0.95), stat.protection.push(1.05)
            else if(race == "nymphe") stat.hp.push(0.9), stat.magie.push(1.2), stat.attaque.push(0.9), stat.armure.push(0.90), stat.protection.push(1.1)
            else if(race == "nain") stat.hp.push(1.1), stat.magie.push(1), stat.attaque.push(0.8), stat.armure.push(1.1), stat.protection.push(1)
            else if(race == "vampire") stat.hp.push(0.95), stat.magie.push(1.05), stat.attaque.push(1.05), stat.armure.push(0.95), stat.protection.push(1)
            else if(race == "liche") stat.hp.push(0.75), stat.magie.push(1.2), stat.attaque.push(1), stat.armure.push(1.05), stat.protection.push(1)
            else if(race == "démon") stat.hp.push(1.3), stat.magie.push(0.7), stat.attaque.push(1.1), stat.armure.push(1), stat.protection.push(0.9)

            let newData = 
            {
                id: id,
                prenom : prenom,
                nom: nom,
                race: race,
                classe: classe,
                hp: stat.hp,
                magie: stat.magie,
                attaque: stat.attaque,
                armure: stat.armure,
                protection: stat.protection,
                image: image,
            }

            const playerController = new PlayerController()
            return await playerController.createPlayer(newData)

        } catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
        }
    }






    /**
     * @param {String} id
    */
    async getPlayerById(id)
    {
        try
        {
            const playerController = new PlayerController()
            return await playerController.getPlayerById(id)
        }catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
        }
    }





    /**
     * @param {String} id
    */
    async getPlayerStatForRankById(id)
    {
        try
        {
            const playerController = new PlayerController()
            return await playerController.getPlayerStatForRankById(id)
        }catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
        }
    }



    


    /**
     * @param {String} id
     * @param {Object} data
    */
     async editPlayerById(id, data)
     {
         try
         {
            const playerController = new PlayerController()
            return await playerController.editPlayerById(id, data)
         }catch(error)
         {
             console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
         }
     }




    /**
     * @param {String} id
    */
    async setNameRp(interaction, id)
    {
        try
        {
            const playerCreationFunction = new PlayerCreationFunction()
            let data = await playerCreationFunction.getPlayerById(id)
            if(data[0].hp[0] <= 0 ) interaction.member.setNickname(bdd[user].prenom + "  [☠️ KO]")
            else interaction.member.setNickname(data[0].prenom + " [❤️" + data[0].hp[0] + "] [✨" + data[0].magie[0] + "]")
        
        }catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
        }
    }
}

module.exports = PlayerCreationFunction