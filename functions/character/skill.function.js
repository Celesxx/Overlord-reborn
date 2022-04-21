const SkillController = require('../../controllers/skill.controller')

class SkillFunction 
{
    /**
     * @param {String} data
    */
    async skillCreation(data)
    {
        try
        {
            const skillController = new SkillController()
            return await skillController.createSkill(data)

        } catch(error)
        {
            console.log(`error : ${error}`)
        }
    }
}

module.exports = SkillFunction