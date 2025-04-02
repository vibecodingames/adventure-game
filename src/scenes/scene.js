// Base class for all game scenes

export class Scene {
    constructor(game) {
        this.game = game;
        this.background = null;
        this.hotspots = [];
        this.entities = [];
    }

    load() {
        console.log("Loading scene assets");
        // Load scene assets
        if (this.backgroundPath) {
            this.background = new Image();
            this.background.src = this.backgroundPath;
            console.log(`Loading background from: ${this.backgroundPath}`);
            
            this.background.onload = () => {
                console.log("Background loaded successfully");
            };
            
            this.background.onerror = (e) => {
                console.error("Failed to load background:", e);
            };
        }
    }

    addHotspot(x, y, width, height, name, actions) {
        this.hotspots.push({
            x, y, width, height, name, actions
        });
        console.log(`Added hotspot: ${name} at (${x}, ${y})`);
    }

    getHotspotAt(x, y) {
        return this.hotspots.find(hotspot => 
            x >= hotspot.x && x <= hotspot.x + hotspot.width &&
            y >= hotspot.y && y <= hotspot.y + hotspot.height
        );
    }

    update(deltaTime) {
        // Update all entities in the scene
        this.entities.forEach(entity => entity.update(deltaTime));
    }

    render(ctx) {
        // Draw background
        if (this.background && this.background.complete) {
            ctx.drawImage(this.background, 0, 0, this.game.width, this.game.height);
        } else {
            // Fallback if background not loaded
            ctx.fillStyle = 'darkblue';
            ctx.fillRect(0, 0, this.game.width, this.game.height);
            
            // Draw some text to show something is working
            ctx.fillStyle = 'white';
            ctx.font = '24px Arial';
            ctx.fillText('Scene background loading...', 20, 50);
        }

        // Draw entities
        this.entities.forEach(entity => entity.render(ctx));

        // Debug: draw hotspots
        if (this.game.debug) {
            ctx.strokeStyle = 'red';
            this.hotspots.forEach(hotspot => {
                ctx.strokeRect(hotspot.x, hotspot.y, hotspot.width, hotspot.height);
                ctx.fillStyle = 'white';
                ctx.font = '12px Arial';
                ctx.fillText(hotspot.name, hotspot.x, hotspot.y - 5);
            });
        }
    }
}