const Shop = require('../models/shop.model.js')
const errorHelper = require('../helpers/error.helper')


class ShopController 
{
    constructor()
    {
        this.filename = "shop.controller.js"
        this.type = "shop"
    }



    // ----------------------------------------------------Create shop ---------------------------------------------------
    /**
     * @param {Object} data
    */
    async createShop(data) 
    {
        const functionName = "createShop"
        try
        {      
            const shop = new Shop(
            {
                nom: data.nom,
                nomId: data.nomId,
                type: data.type,
                unique: data.unique,
                exclusif: data.exclusif,
                statistique: data.statistique,
                regeneration: data.regeneration,
                effet: data.effet,
                description: data.description,
                image: data.image,
                price: data.price,
            })
        
            const shopCheck = await Shop.find({id : shop.id })
            if(shopCheck.length != 0) return errorHelper.shopExist(shop, functionName)

            const shopSave = await shop.save()
            return errorHelper.shopCreated(shopSave, functionName) 
                    
        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }








    // ----------------------------------------------------Get shop by id ---------------------------------------------------

    /**
     * @param {String} id
    */
    async getShopItemById(id) 
    {
        const functionName = "getShopItemById"
        try
        {     
            return await Shop.find({id : id},'-__v')

        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }



    




    // ----------------------------------------------------Get shop by id ---------------------------------------------------

    /**
     * @param {String} name
    */
    async getShopItemByName(name) 
    {
        const functionName = "getShopItemById"
        try
        {     
            return await Shop.find({nomId : name}, '-__v')

        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }







    // ----------------------------------------------------Get shop by type ---------------------------------------------------

    /**
     * @param {String} type
    */
     async getShopItemByType(type) 
     {
         const functionName = "getShopItemByType"
         try {return await Shop.find({type : type},'-_id -__v') }
         catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
     }







     // ----------------------------------------------------edit shop by id ---------------------------------------------------

    /**
     * @param {String} id
     * @param {Object} data
    */
     async editShopItemById(id, data) 
     {
         const functionName = "editShopItemById";
         try{ return await Shop.updateOne({id: id}, data, {new: true}) }
         catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
     }

}

module.exports = ShopController







