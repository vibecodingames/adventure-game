// NPC character class

export class NPC {
    constructor(game, x, y, name) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 100;
        this.name = name;
        this.sprite = null;
        
        // Load NPC sprite
        this.loadSprite();
    }

    loadSprite() {
        this.sprite = new Image();
        this.sprite.src = `assets/images/${this.name}.png`;
        
        // Fallback if specific sprite not available
        this.sprite.onerror = () => {
            console.warn(`Sprite for ${this.name} not found, using default`);
            this.sprite.src = 'assets/images/npc_default.png';
        };
    }

    update(deltaTime) {
        // NPCs could have idle animations or movement patterns
    }

    render(ctx) {
        if (this.sprite && this.sprite.complete) {
            // Draw NPC sprite
            ctx.drawImage(
                this.sprite,
                this.x - this.width / 2,
                this.y - this.height,
                this.width,
                this.height
            );
        } else {
            // Fallback if sprite not loaded
            ctx.fillStyle = 'blue';
            ctx.fillRect(
                this.x - this.width / 2,
                this.y - this.height,
                this.width,
                this.height
            );
        }
    }
}