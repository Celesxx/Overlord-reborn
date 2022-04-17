const Skill = require('../models/skill.model.js')
const errorHelper = require('../helpers/error.helper')

class SkillController 
{
    constructor()
    {
        this.filename = "skill.controller.js"
        this.type = "skill"
    }

    // ----------------------------------------------------Create Skill ---------------------------------------------------
    /**
     * @param {Object} data
    */
    async createSkill(data) 
    {
        const functionName = "createSkill"
        try
        {      
            const skill = new Skill(
            {
                nom: data.nom,
                image: data.image,
                description: data.description, 
                attaque: data.attaque,
                defense: data.defense,
                target: data.target,
            })
        
            const skillCheck = await Skill.find({nom : skill.nom })
            if(skillCheck.length != 0) return errorHelper.skillExist(skill, functionName)

            const skillSave = await skill.save()
            return errorHelper.skillCreated(skillSave, functionName) 
                    
        }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
    }



    // ----------------------------------------------------Get skill by name ---------------------------------------------------

    /**
     * @param {String} skill
    */
     async getSkillByName(skill) 
     {
         const functionName = "getSkillByName";
         try
         {     
            const skillGet = await Skill.find({nom : skill},'-_id -__v')
            return skillGet
                     
         }catch(error) { return errorHelper.contentError(functionName, this.filename, error) }
     }
}

module.exports = SkillController







