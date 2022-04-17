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
        msg.edit(embed)
    }





    /**
     * @param {String} id
     */
    async getMessageById(id, message)
    {
        let msg = await message.channel.messages.fetch(id)
        return msg
    }
    
}

module.exports = MessageFunction