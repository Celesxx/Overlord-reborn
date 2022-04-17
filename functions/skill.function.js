const SkillController = require('../controllers/skill.controller')

class SkillFunction 
{
    /**
     * @param {String} message
    */
    async skillCreation(message)
    {
        try
        {
            let data = JSON.parse(message.slice(15))
            let result = []
            for(const skill in data)
            {
                const skillController = new SkillController()
                const skillFunction = await skillController.createSkill(data[skill])
                result.push(skillFunction)
            }
            return result

        } catch(error)
        {
            console.log(`error : ${error}`)
        }
    }
}

module.exports = SkillFunction