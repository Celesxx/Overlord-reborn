const ShopController = require('../../controllers/shop.controller')

class ShopFunction 
{




    /**
     * @param {Object} data
    */
    async shopCreation(data)
    {
        try
        {
            const shopController = new ShopController()
            return await shopController.createShop(data)

        } catch(error) { console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`) }
    }






    /**
     * @param {String} id
    */
    async getShopItemById(id)
    {
        try
        {
            const shopController = new ShopController()
            return await shopController.getShopItemById(id)

        }catch(error) { console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`) }
    }







    /**
     * @param {String} type
    */
    async getShopItemByType(type)
    {
        try
        {
            const shopController = new ShopController()
            return await shopController.getShopItemByType(type)

        }catch(error) { console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`) }
    }







    /**
     * @param {String} name
    */
    async getShopItemByName(name)
    {
        try
        {
            const shopController = new ShopController()
            return await shopController.getShopItemByName(name)

        }catch(error) { console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`) }
    }
      


    /**
     * @param {String} id
     * @param {Object} data
    */
    async editShopItemById(id, data)
    {
        try
        {
            const shopController = new ShopController()
            return await shopController.editShopItemById(id, data)
        
        }catch(error) { console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`) }
    }

}

module.exports = ShopFunction