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
     * @param {Object} message
     * @param {Array} message
     */
     async editMessageByIdInteraction(id, interaction, embed)
     {
         let msg = await interaction.channel.messages.fetch(id)
         msg.edit({embeds: [embed]})
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