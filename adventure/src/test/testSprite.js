import { SpriteCreator } from '../utils/spriteCreator.js';

class TestSprite {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 800;
        this.canvas.height = 600;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.spriteCreator = new SpriteCreator({ width: 800, height: 600 });
        this.init();
    }

    async init() {
        try {
            this.testSprite = await this.spriteCreator.createSprite({
                imagePath: './assets/sprites/character.png',
                frameWidth: 32,
                frameHeight: 32,
                scale: 3,
                animations: {
                    idle: {
                        frames: 4,
                        frameRate: 8,
                        row: 0,
                        loop: true
                    },
                    walk: {
                        frames: 6,
                        frameRate: 12,
                        row: 1,
                        loop: true
                    }
                }
            });
            
            this.animate();
        } catch (error) {
            console.error('Failed to load sprite:', error);
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, 800, 600);
        
        // Draw background
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(0, 0, 800, 600);
        
        // Update and draw sprite
        this.spriteCreator.updateSprite(this.testSprite, 16);
        this.spriteCreator.drawSprite(this.ctx, this.testSprite, 400, 300, {
            shadow: true
        });
        
        // Toggle animation every 3 seconds
        const time = Math.floor(Date.now() / 3000);
        this.spriteCreator.setAnimation(
            this.testSprite, 
            time % 2 === 0 ? 'idle' : 'walk'
        );
        
        requestAnimationFrame(() => this.animate());
    }
}

// Start the test when the page loads
window.onload = () => new TestSprite();