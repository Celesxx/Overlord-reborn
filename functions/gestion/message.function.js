class MessageFunction 
{
    /**
     * @param {String} id
     * @param {Object} message
     * @param {Array} message
     */
    async editMessageById(id, message, embed)
    {
        let msg = await message.channel.messages.fetch(id)
        msg.edit({embeds: [embed]})
    }






    /**
     * @param {String} id
     * @param {Object} interaction
     * @param {Array} embed
    */
    async editMessageByIdInteraction(id, interaction, embed)
    {
        let msg = await interaction.channel.messages.fetch(id)
        msg.edit({embeds: [embed]})
    }




    /**
     * @param {String} id
     * @param {Object} interaction
     * @param {Array} buttons
    */
    async editMessageButtonsByIdInteraction(id, interaction, buttons)
    {
        let msg = await interaction.channel.messages.fetch(id)
        msg.edit({components: [buttons]})
    }


    /**
     * @param {String} id
     * @param {Object} interaction
     * @param {Array} buttons
    */
     async editMessageSelectFirstByIdInteraction(id, interaction, select)
     {
         let msg = await interaction.channel.messages.fetch(id)
         msg.components[0] = select
         await msg.edit({components: msg.components})
     }




    /**
     * @param {String} id
     * @param {Object} interaction
     * @param {Array} buttons
    */
    async editMessageComponentsByIdInteraction(id, interaction, buttons, select)
    {
        let msg = await interaction.channel.messages.fetch(id)
        await msg.edit({components: [buttons]})
        msg.components.unshift(select)
        await msg.edit({components: msg.components})
    }





    /**
     * @param {String} id
     */
    async getMessageById(id, message)
    {
        let msg = await message.channel.messages.fetch(id)
        return msg
    }



    /**
     * @param {String} id
     * @param {Object} interaction
    */
    async getMessageByIdInteraction(id, interaction)
    {
        let msg = await interaction.channel.messages.fetch(id)
        return msg
    }
    
}

module.exports = MessageFunction