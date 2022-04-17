class progressBar 
{

    constructor(dimension, color, percentage, context, canvas)
    {
        ({x: this.x, y: this.y, width: this.w, height: this.h} = dimension)
        this.color = color
        this.percentage = percentage / 100
        this.p
        this.context = context
        this.canvasWidth = canvas.width
        this.canvasHeight = canvas.height
    }
    
    static clear(){ context.clearRect(0, 0, this.canvasWidth, this.canvasHeight) }
    
    draw()
    {
        this.p = this.percentage * this.w
        if(this.p <= this.h)
        {
            this.context.beginPath()
            this.context.arc(this.h / 2 + this.x, this.h / 2 + this.y, this.h / 2, Math.PI - Math.acos((this.h - this.p) / this.h), Math.PI + Math.acos((this.h - this.p) / this.h))
            this.context.save()
            this.context.scale(-1, 1)
            this.context.arc((this.h / 2) - this.p - this.x, this.h / 2 + this.y, this.h / 2, Math.PI - Math.acos((this.h - this.p) / this.h), Math.PI + Math.acos((this.h - this.p) / this.h))
            this.context.restore()
            this.context.closePath()
        }else 
        {
            this.context.beginPath()
            this.context.arc(this.h / 2 + this.x, this.h / 2 + this.y, this.h / 2, Math.PI / 2, 3 / 2 *Math.PI)
            this.context.lineTo(this.p - this.h + this.x, 0 + this.y)
            this.context.arc(this.p - (this.h / 2) + this.x, this.h / 2 + this.y, this.h / 2, 3 / 2 * Math.PI, Math.PI / 2)
            this.context.lineTo(this.h / 2 + this.x, this.h + this.y)
            this.context.closePath()
        }

        this.context.fillStyle = this.color
        this.context.fill()
    }
    
    showWholeProgressBar()
    {
        this.context.beginPath()
        this.context.arc(this.h / 2 + this.x, this.h / 2 + this.y, this.h / 2, Math.PI / 2, 3 / 2 * Math.PI)
        this.context.lineTo(this.w - this.h + this.x, 0 + this.y)
        this.context.arc(this.w - this.h / 2 + this.x, this.h / 2 + this.y, this.h / 2, 3 / 2 *Math.PI, Math.PI / 2)
        this.context.lineTo(this.h / 2 + this.x, this.h + this.y)
        this.context.lineWidth="8"
        this.context.strokeStyle = gradient
        this.context.stroke()
        this.context.closePath()
    }
    
    get PPercentage() { return this.percentage * 100 }
    
    set PPercentage(x) { this.percentage = x / 100 }
    
}
module.exports = progressBar