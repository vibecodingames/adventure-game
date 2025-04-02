// A simplified game implementation for testing

export class Game {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.width = 800;
        this.height = 600;
    }

    init() {
        console.log("Simple game initialization started");
        
        // Create canvas and add to document
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        
        console.log("Canvas created and added to document");
    }

    start() {
        console.log("Simple game started");
        this.render();
    }

    render() {
        // Clear the canvas
        this.ctx.fillStyle = 'darkblue';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw some text
        this.ctx.fillStyle = 'white';
        this.ctx.font = '30px Arial';
        this.ctx.fillText('Simple Game Running', 250, 200);
        
        // Draw a character
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(375, 300, 50, 100);
    }
}