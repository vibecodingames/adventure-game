// Handles user input (mouse clicks, keyboard)

export class InputManager {
    constructor(game) {
        this.game = game;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMouseDown = false;
        
        // Bind event listeners
        this.bindEvents();
        console.log("InputManager initialized");
    }

    bindEvents() {
        const canvas = this.game.canvas;
        
        // Mouse move
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
            
            // Update cursor based on what's under it
            this.updateCursor();
        });
        
        // Mouse down
        canvas.addEventListener('mousedown', (e) => {
            const rect = canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
            
            this.isMouseDown = true;
            this.handleClick();
        });
        
        // Mouse up
        canvas.addEventListener('mouseup', () => {
            this.isMouseDown = false;
        });
        
        console.log("Event listeners bound to canvas");
    }

    updateCursor() {
        const uiBarY = this.game.height - 100; // Assuming UI height is 100px
        
        if (this.mouseY >= uiBarY) {
            // Mouse is over UI
            this.game.canvas.style.cursor = 'pointer';
        } else {
            // Mouse is over game scene
            const scene = this.game.sceneManager.currentScene;
            if (!scene) return;
            
            const hotspot = scene.getHotspotAt(this.mouseX, this.mouseY);
            
            if (hotspot) {
                this.game.canvas.style.cursor = 'pointer';
            } else {
                this.game.canvas.style.cursor = 'default';
            }
        }
    }

    handleClick() {
        const uiBarY = this.game.height - 100; // Assuming UI height is 100px
        
        if (this.mouseY >= uiBarY) {
            // Click on UI
            this.handleUIClick();
        } else {
            // Click on game scene
            this.handleSceneClick();
        }
    }

    handleUIClick() {
        console.log("UI clicked");
        // We'll implement this later
    }

    handleSceneClick() {
        const scene = this.game.sceneManager.currentScene;
        if (!scene) return;
        
        const hotspot = scene.getHotspotAt(this.mouseX, this.mouseY);
        
        if (hotspot) {
            console.log(`Clicked on hotspot: ${hotspot.name}`);
            // For now, just move to the hotspot
            this.game.player.moveTo(hotspot.x + hotspot.width/2, hotspot.y + hotspot.height);
        } else {
            // Walk to clicked location if no hotspot
            console.log(`Walking to: ${this.mouseX}, ${this.mouseY}`);
            this.game.player.moveTo(this.mouseX, this.mouseY);
        }
    }
}