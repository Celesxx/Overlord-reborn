const { performance } = require('perf_hooks');

class PerformanceFunction 
{

    constructor()
    {
        this.startTime;
        this.endTime;
    }

    async startCaculTime()
    {
        this.startTime = performance.now()
    }


    async endCaculTime()
    {
        this.endTime = performance.now()
        return { start: this.startTime, end: this.endTime }
    }
    
}

module.exports = PerformanceFunction