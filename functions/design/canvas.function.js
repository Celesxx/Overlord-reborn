class CanvasFunction 
{


    /**
     * @param {Object} data
     * @param {Number} x
     * @param {Number} y
     * @param {Number} w
     * @param {Number} h
     * @param {Number} radius
     * @param {Object} color
    */
    async roundRect(context, x, y, w, h, radius, color)
    {
        try
        {
            var r = x + w
            var b = y + h
            context.beginPath()
            context.fillStyle=color
            context.moveTo(x+radius, y)
            context.lineTo(r-radius, y)
            context.quadraticCurveTo(r, y, r, y+radius)
            context.lineTo(r, y+h-radius)
            context.quadraticCurveTo(r, b, r-radius, b)
            context.lineTo(x+radius, b)
            context.quadraticCurveTo(x, b, x, b-radius)
            context.lineTo(x, y+radius)
            context.quadraticCurveTo(x, y, x+radius, y)
            context.fill()
        
        }catch(error)
        {
            console.log(`An error append to the following path : ${__filename} with the following error : ${error}`)
        }

    }


}
module.exports = CanvasFunction