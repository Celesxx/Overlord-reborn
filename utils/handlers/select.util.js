const { promisify } = require('util')
const { glob } = require('glob')
const pGlob = promisify(glob)

module.exports = async client => 
{
    (await pGlob(`${process.cwd()}/selects/*/*.js`)).map(async (selectFile) =>
    {
        const select = require(selectFile)

        if(!select.name) return console.log(`_____________⚠️ Erreur ⚠️_____________\nServer status : select non-chargée => pas de nom\nServer status: fichier =>  ${selectFile}\n____________________________________`)
        
        console.log(`Server status : select chargée  => ${select.name}`)

        client.selects.set(select.name, select)

    })
}

