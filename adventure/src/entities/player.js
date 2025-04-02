// Player character class

export class Player {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = 50;
        this.height = 100;
        this.sprite = null;
        this.targetX = null;
        this.targetY = null;
        this.speed = 2;
        this.direction = 'right'; // 'left' or 'right'
        this.isMoving = false;
        
        // Load player sprite
        this.loadSprite();
    }

    loadSprite() {
        this.sprite = new Image();
        this.sprite.src = 'assets/images/player.png';
        console.log("Loading player sprite from:", this.sprite.src);
        
        // Make sure the sprite is loaded
        this.sprite.onload = () => {
            console.log("Player sprite loaded successfully");
        };
        
        this.sprite.onerror = (e) => {
            console.error("Failed to load player sprite:", e);
        };
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        console.log(`Player position set to: ${x}, ${y}`);
    }

    moveTo(x, y) {
        // Don't move if clicking in UI area
        const uiBarY = this.game.height - 100; // Assuming UI height is 100px
        if (y >= uiBarY) return;
        
        this.targetX = x;
        this.targetY = y;
        this.isMoving = true;
        
        // Set direction based on target position
        this.direction = x < this.x ? 'left' : 'right';
        
        console.log(`Moving to: ${x}, ${y}`);
    }

    update(deltaTime) {
        if (this.isMoving && this.targetX !== null && this.targetY !== null) {
            // Calculate distance to target
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > this.speed) {
                // Move towards target
                const ratio = this.speed / distance;
                this.x += dx * ratio;
                this.y += dy * ratio;
            } else {
                // Reached target
                this.x = this.targetX;
                this.y = this.targetY;
                this.isMoving = false;
                this.targetX = null;
                this.targetY = null;
            }
        }
    }

    render(ctx) {
        if (this.sprite && this.sprite.complete) {
            // Draw player sprite
            ctx.save();
            
            // Flip the sprite if facing left
            if (this.direction === 'left') {
                ctx.scale(-1, 1);
                ctx.drawImage(
                    this.sprite,
                    -this.x - this.width / 2,
                    this.y - this.height,
                    this.width,
                    this.height
                );
            } else {
                ctx.drawImage(
                    this.sprite,
                    this.x - this.width / 2,
                    this.y - this.height,
                    this.width,
                    this.height
                );
            }
            
            ctx.restore();
        } else {
            // Fallback if sprite not loaded
            ctx.fillStyle = 'red';
            ctx.fillRect(
                this.x - this.width / 2,
                this.y - this.height,
                this.width,
                this.height
            );
        }
    }
}