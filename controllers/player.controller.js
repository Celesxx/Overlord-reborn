const Player = require('../models/player.model.js')
const errorHelper = require('../helpers/error.helper')


class PlayerController 
{
    constructor()
    {
        this.filename = "player.controller.js"
        this.type = "player"
    }

    // ----------------------------------------------------Create Mob ---------------------------------------------------
    /**
     * @param {Object} data
    */
    async createPlayer(data) 
    {
        const functionName = "createPlayer"
        try
        {      
            const player = new Player(
            {
                id: data.id,
                prenom: data.prenom,
                nom: data.nom,
                classe: data.classe,
                race: data.race,
                description: data.description,
                image: data.image,
                lvl: data.lvl, 
                xp : data.xp, 
                hp: data.hp,
                magie: data.magie,
                attaque: data.attaque,
                armure: data.armure,
                money: data.money,
                attribut: data.attribut,
                attributPalier: data.attributPalier,
                equipement: data.equipement,
                inventaire: data.inventaire,
                skill: data.skill,
            })
        
            const playerCheck = await Player.find({nom : player.nom })
            if(playerCheck.length != 0) return errorHelper.playerExist(player, functionName)

            const playerSave = await player.save()
            return errorHelper.playerCreated(playerSave, functionName) 
                    
        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }








    // ----------------------------------------------------Get player by id ---------------------------------------------------

    /**
     * @param {String} id
    */
    async getPlayerById(id) 
    {
        const functionName = "getPlayerById";
        try
        {     
        const getPlayer = await Player.find({id : id},'-_id -__v')
        return getPlayer
                    
        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }






    // ----------------------------------------------------Get player by id ---------------------------------------------------

    /**
     * @param {String} id
    */
    async getPlayerStatForRankById(id) 
    {
        const functionName = "getPlayerStatForRankById";
        try
        {     
            const getPlayer = await Player.find({}).select('id lvl xp')
            return getPlayer
                    
        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }
 






     // ----------------------------------------------------edit player by id ---------------------------------------------------

    /**
     * @param {String} id
     * @param {Object} data
    */
     async editPlayerById(id, data) 
     {
         const functionName = "editPlayerById";
         try
         {    
            const player = await Player.updateOne({id: id}, data, {new: true})
            return player
                     
         }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
     }

}

module.exports = PlayerController







