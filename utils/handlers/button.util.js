const { promisify } = require('util')
const { glob } = require('glob')
const pGlob = promisify(glob)

module.exports = async client => 
{
    (await pGlob(`${process.cwd()}/buttons/*/*.js`)).map(async (btnFile) =>
    {
        const btn = require(btnFile)

        if(!btn.name) return console.log(`_____________⚠️ Erreur ⚠️_____________\nServer status : bouton non-chargée => pas de nom\nServer status: fichier =>  ${btnFile}\n____________________________________`)
        
        console.log(`Server status : bouton chargée  => ${btn.name}`)

        client.buttons.set(btn.name, btn)

    })
}

