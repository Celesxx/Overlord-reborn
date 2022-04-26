const PlayerController = require('../../controllers/player.controller')

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

            if (classe === 'voleur') stat = {hp: [50, 50], magie: [30, 30], attaque: [14, 14], armure: [1, 1]}
            else if (classe === 'combattant') stat = {hp: [60, 60], magie: [20, 20], attaque: [10, 10], armure: [2, 2]}
            else if (classe === 'mage') stat = {hp: [40, 40], magie: [40, 40], attaque: [14, 14], armure: [0, 0]}

            if(race == "humain") stat.hp.push(1), stat.magie.push(1), stat.attaque.push(1), stat.armure.push(1)
            else if(race == "automate") stat.hp.push(1.05), stat.magie.push(0.95), stat.attaque.push(1.05), stat.armure.push(0.95)
            else if(race == "démon") stat.hp.push(0.9), stat.magie.push(1), stat.attaque.push(1.1), stat.armure.push(1)
            else if(race == "demi-beastman") stat.hp.push(1.15), stat.magie.push(0.85), stat.attaque.push(1), stat.armure.push(1)
            else if(race == "beastman") stat.hp.push(1.3), stat.magie.push(0.7), stat.attaque.push(1), stat.armure.push(1)
            else if(race == "demi-dragon") stat.hp.push(1.2), stat.magie.push(0.9), stat.attaque.push(0.95), stat.armure.push(0.95)
            else if(race == "elf") stat.hp.push(0.9), stat.magie.push(1.1), stat.attaque.push(1), stat.armure.push(1)
            else if(race == "nain") stat.hp.push(1.1), stat.magie.push(1), stat.attaque.push(0.8), stat.armure.push(1.1)
            else if(race == "liche") stat.hp.push(0.75), stat.magie.push(1.2), stat.attaque.push(1), stat.armure.push(1.05)
            else if(race == "nymphe") stat.hp.push(1), stat.magie.push(1.2), stat.attaque.push(0.9), stat.armure.push(0.9)
            else if(race == "gobelin") stat.hp.push(1), stat.magie.push(1), stat.attaque.push(0.9), stat.armure.push(1.1)
            else if(race == "lamia") stat.hp.push(0.9), stat.magie.push(1.2), stat.attaque.push(0.9), stat.armure.push(1)
            else if(race == "succube") stat.hp.push(1), stat.magie.push(1.1), stat.attaque.push(1), stat.armure.push(0.9)
            else if(race == "vampire") stat.hp.push(0.95), stat.magie.push(1.05), stat.attaque.push(1.05), stat.armure.push(0.95)
            else if(race == "ghoul") stat.hp.push(1.05), stat.magie.push(1), stat.attaque.push(1.05), stat.armure.push(0.9)

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
            else interaction.member.setNickname(data[0].prenom + " [❤️" + data[0].hp[0] + "] [🛡️"+data[0].armure[0] +"] [✨" + data[0].magie[0] + "]")
        
        }catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
        }
     }
}

module.exports = PlayerCreationFunction