const Canvas = require('canvas')
const { registerFont } = require('canvas')
const { MessageAttachment }  = require('discord.js');

const CanvasFunction = require("./canvas.function.js")
const ProgressBarFunction = require("./progressBar.function.js")


class DesignCharacterFunction 
{

    /**
     * @param {Object} channel
     * @param {Object} data
     * @param {String} id
    */
    async displayCanvasLvlUp(channel, data, id)
    {
        try
        {
            registerFont('./assets/fonts/BigSpace.otf', { family: 'Big Space' })
        
            const canvas = Canvas.createCanvas(700, 250)
            const context = canvas.getContext('2d')

            let gradient = context.createLinearGradient(0, 0, 200, 0)
            gradient.addColorStop(0, '#2e2e2e')
            gradient.addColorStop(1, '#252525')

            let gradientMenu = context.createLinearGradient(0, 0, 200, 0)
            gradientMenu.addColorStop(0, '#121212')
            gradientMenu.addColorStop(1, '#171717')

            const canvasFunction = new CanvasFunction()

            await canvasFunction.roundRect(context, 0, 0, canvas.width, canvas.height, 30, gradient)
            await canvasFunction.roundRect(context, 10, 10, canvas.width - 20 , canvas.height - 20, 30, gradientMenu)


            //______________________________ text content ______________________________
            context.font = `35px Big Space`
            context.fillStyle = '#ffffff'
            context.fillText('Level up', canvas.width - 320, canvas.height / 3.5, canvas.width - 20, canvas.height - 20)

            context.font = `25px Big Space`
            context.fillText(`rank:`, canvas.width - 139, 40, canvas.width - 20, canvas.height - 20)
            if(data.rank[0] == "up") context.fillStyle = '#23ad00'
            else if(data.rank[0] == "down") context.fillStyle = '#ad0000'
            context.fillText(`#${data.rank[1]}`, canvas.width - 80, 40, canvas.width - 20, canvas.height - 20)

            context.fillStyle = '#c2c2c2'
            context.font = `25px Big Space`
            context.fillText(`Vos statistiques augmente`, canvas.width - 400, canvas.height / 2.2, canvas.width - 20, canvas.height - 20)
            context.font = `18px Big Space`
            context.fillStyle = '#23ad00'
            context.fillText(`Hp:`, canvas.width - 435, canvas.height / 1.7, 114, canvas.height - 20 )
            context.fillStyle = '#666666'
            context.fillText(`+${data.Hp}`, canvas.width - 405, canvas.height / 1.7, 114, canvas.height - 20 )
            context.fillStyle = '#23ad00'
            context.fillText(`Mag:`, canvas.width - 375, canvas.height / 1.7, canvas.width - 20, canvas.height - 20 )
            context.fillStyle = '#666666'
            context.fillText(`+${data.Mag}`, canvas.width - 335, canvas.height / 1.7, canvas.width - 20, canvas.height - 20 )
            context.fillStyle = '#23ad00'
            context.fillText(`Atk:`, canvas.width - 305, canvas.height / 1.7, canvas.width - 20, canvas.height - 20 )
            context.fillStyle = '#666666'
            context.fillText(`+${data.Atk}`, canvas.width - 270, canvas.height / 1.7, canvas.width - 20, canvas.height - 20 )
            context.fillStyle = '#23ad00'
            context.fillText(`Def:`, canvas.width - 240, canvas.height / 1.7, canvas.width - 20, canvas.height - 20 )
            context.fillStyle = '#666666'
            context.fillText(`+${data.Def}`, canvas.width - 205, canvas.height / 1.7, canvas.width - 20, canvas.height - 20 )
            context.fillStyle = '#23ad00'
            context.fillText(`Prot:`, canvas.width - 155, canvas.height / 1.7, canvas.width - 20, canvas.height - 20 )
            context.fillStyle = '#666666'
            context.fillText(`+${data.Pt}`, canvas.width - 110, canvas.height / 1.7, canvas.width - 20, canvas.height - 20 )
            //_____________________________________________________________________________
        
        


            //______________________________ progresse bar content ______________________________
            let progressbar = new ProgressBarFunction({x: canvas.width - 465, y: canvas.height - 70, width: 400, height: 35}, "#666666", 100, context, canvas)
            await progressbar.draw()
            progressbar = new ProgressBarFunction({x: canvas.width - 465, y: canvas.height - 70, width: 400, height: 35}, "#0083ad", data.percent, context, canvas)
            await progressbar.draw()

            context.fillStyle = '#c2c2c2'
            context.fillText(`${data.xp} xp`, canvas.width - 230, canvas.height - 47.3, canvas.width - 20, canvas.height - 20 )
            context.fillStyle = '#ffffff'
            context.fillText(`/`, canvas.width - 165, canvas.height - 46.8, canvas.width - 20, canvas.height - 20 )      
            context.fillText(`${data.xpNeed} xp`, canvas.width - 150, canvas.height - 46.8, canvas.width - 20, canvas.height - 20 ) 
            
            context.fillText(`level : ${data.lvl + 1}`, canvas.width - 440, canvas.height - 46.8, canvas.width - 20, canvas.height - 20)
            //_____________________________________________________________________________
        

            //______________________________ Image character ______________________________
            context.beginPath();
            context.arc(125, 125, 100, 0, Math.PI * 2, true);
            context.closePath();
            context.clip();
            // const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
            console.log("image : ", data.image)
            const avatar = await Canvas.loadImage(data.image.replace(/["]/gm,""));
            context.drawImage(avatar, 40, 30, 200, 200);
            //_____________________________________________________________________________

            const attachment = new MessageAttachment(canvas.toBuffer(), 'lvl-image.png');

            channel.send(`<@${id}>`).then(messge => messge.delete())
            channel.send({ files: [attachment] })
            // message.channel.send({ files: [attachment] })

        }catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
        }
    }













    /**
     * @param {Object} data
     * @param {String} id
    */
     async displayCanvasProfil(data, id, interaction)
     {
         try
         {
             registerFont('./assets/fonts/BigSpace.otf', { family: 'Big Space' })
         
             const canvas = Canvas.createCanvas(700, 1400)
             const context = canvas.getContext('2d')
 
             let gradient = context.createLinearGradient(0, 0, 200, 0)
             gradient.addColorStop(0, '#2e2e2e')
             gradient.addColorStop(1, '#252525')
 
             let gradientMenu = context.createLinearGradient(0, 0, 200, 0)
             gradientMenu.addColorStop(0, '#121212')
             gradientMenu.addColorStop(1, '#171717')
 
             const canvasFunction = new CanvasFunction()
 
             await canvasFunction.roundRect(context, 0, 0, canvas.width, canvas.height, 30, gradient)
             await canvasFunction.roundRect(context, 10, 10, canvas.width - 20 , canvas.height - 20, 30, gradientMenu)
 
 
             //______________________________ text content ______________________________
             context.font = `35px Big Space`
             context.fillStyle = '#ffffff'
             context.fillText('Level up', canvas.width - canvas.width - 130, canvas.height / 3.5, canvas.width - 20, canvas.height - 20)
 
             context.font = `25px Big Space`
             context.fillText(`rank:`, canvas.width - 139, 40, canvas.width - 20, canvas.height - 20)
            //  if(data.rank[0] == "up") context.fillStyle = '#23ad00'
            //  else if(data.rank[0] == "down") context.fillStyle = '#ad0000'
             context.fillText(`#1`, canvas.width - 80, 40, canvas.width - 20, canvas.height - 20)
 
             context.fillStyle = '#c2c2c2'
             context.font = `25px Big Space`
             context.fillText(`Vos statistiques augmente`, canvas.width - 400, canvas.height / 2.2, canvas.width - 20, canvas.height - 20)
             context.font = `18px Big Space`
             context.fillStyle = '#23ad00'
             context.fillText(`Hp:`, canvas.width - 400, canvas.height / 1.7, 114, canvas.height - 20 )
             context.fillStyle = '#666666'
             context.fillText(`+${data.Hp}`, canvas.width - 375, canvas.height / 1.7, 114, canvas.height - 20 )
             context.fillStyle = '#23ad00'
             context.fillText(`Mag:`, canvas.width - 335, canvas.height / 1.7, canvas.width - 20, canvas.height - 20 )
             context.fillStyle = '#666666'
             context.fillText(`+${data.Mag}`, canvas.width - 300, canvas.height / 1.7, canvas.width - 20, canvas.height - 20 )
             context.fillStyle = '#23ad00'
             context.fillText(`Atk:`, canvas.width - 260, canvas.height / 1.7, canvas.width - 20, canvas.height - 20 )
             context.fillStyle = '#666666'
             context.fillText(`+${data.Atk}`, canvas.width - 225, canvas.height / 1.7, canvas.width - 20, canvas.height - 20 )
             context.fillStyle = '#23ad00'
             context.fillText(`Def:`, canvas.width - 185, canvas.height / 1.7, canvas.width - 20, canvas.height - 20 )
             context.fillStyle = '#666666'
             context.fillText(`+${data.Def}`, canvas.width - 150, canvas.height / 1.7, canvas.width - 20, canvas.height - 20 )
             //_____________________________________________________________________________
         
         
 
 
             //______________________________ progresse bar content ______________________________
             let progressbar = new ProgressBarFunction({x: canvas.width - 465, y: canvas.height - 70, width: 400, height: 35}, "#666666", 100, context, canvas)
             await progressbar.draw()
             progressbar = new ProgressBarFunction({x: canvas.width - 465, y: canvas.height - 70, width: 400, height: 35}, "#0083ad", data.percent, context, canvas)
             await progressbar.draw()
 
             context.fillStyle = '#c2c2c2'
             context.fillText(`${data.xp} xp`, canvas.width - 230, canvas.height - 47.3, canvas.width - 20, canvas.height - 20 )
             context.fillStyle = '#ffffff'
             context.fillText(`/`, canvas.width - 165, canvas.height - 46.8, canvas.width - 20, canvas.height - 20 )      
             context.fillText(`${data.xpNeed} xp`, canvas.width - 150, canvas.height - 46.8, canvas.width - 20, canvas.height - 20 ) 
             
             context.fillText(`level : ${data.lvl + 1}`, canvas.width - 440, canvas.height - 46.8, canvas.width - 20, canvas.height - 20)
             //_____________________________________________________________________________
         
 
             //______________________________ Image character ______________________________
             context.beginPath();
             context.arc(125, 125, 100, 0, Math.PI * 2, true);
             context.closePath();
             context.clip();
             // const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
             console.log("image : ", data.image)
             const avatar = await Canvas.loadImage(data.image.replace(/["]/gm,""));
             context.drawImage(avatar, 40, 30, 200, 200);
             //_____________________________________________________________________________
 
             const attachment = new MessageAttachment(canvas.toBuffer(), 'lvl-image.png');
            //  interaction.send({files: [attachment]})
 
             return attachment
 
         }catch(error)
         {
             console.log(`An error append to the following path : ${__filename} with the following error : ${error} \nand the stack error is ${error.stack}`)
         }
     }
    
}

module.exports = DesignCharacterFunction