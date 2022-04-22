const { promisify } = require('util')
const { glob } = require('glob')
const pGlob = promisify(glob)

module.exports = async client => 
{
    (await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async (commandFile) =>
    {
        const cmd = require(commandFile)

        if(!cmd.name) return console.log(`_____________⚠️ Erreur ⚠️_____________\nServer status : command non-chargée => pas de nom\nServer status: fichier =>  ${commandFile}\n____________________________________`)
        else if(!cmd.description) return console.log(`_____________⚠️ Erreur ⚠️_____________\nServer status : command non-chargée => pas de description\nServer status: fichier =>  ${commandFile}\n____________________________________`)
        
        console.log(`Server status : commande chargée  => ${cmd.name}`)

        client.commands.set(cmd.name, cmd)

    })
}

