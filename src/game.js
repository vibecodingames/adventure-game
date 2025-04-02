// Main game class that manages the game loop and states

import { SceneManager } from './scenes/sceneManager.js';
import { UIManager } from './ui/uiManager.js';
import { InputManager } from './input/inputManager.js';
import { Player } from './entities/player.js';
import { Inventory } from './inventory/inventory.js';
import { ActionManager } from './actions/actionManager.js';
import { SpriteCreator } from './utils/spriteCreator.js';

export class Game {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.width = 800;
        this.height = 600;
        this.lastTime = 0;
        this.running = false;
        this.debug = true; // Set to true to see hotspots and debug info
    }

    init() {
        console.log("Game initialization started");
        
        // Create canvas and add to document
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        
        // Draw initial screen to confirm rendering works
        this.ctx.fillStyle = 'darkblue';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Game is initializing...', 20, 50);

        // Initialize game components
        this.sceneManager = new SceneManager(this);
        this.uiManager = new UIManager(this);
        this.inputManager = new InputManager(this);
        this.player = new Player(this);
        this.inventory = new Inventory();
        this.actionManager = new ActionManager(this);

        // Load initial scene
        this.sceneManager.loadScene('beach');
    }

    start() {
        console.log("Game started");
        this.running = true;
        this.lastTime = performance.now();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop(timestamp) {
        // Calculate delta time
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        // Update game state
        this.update(deltaTime);
        
        // Render the game
        this.render();

        // Continue the game loop
        if (this.running) {
            requestAnimationFrame(this.gameLoop.bind(this));
        }
    }

    update(deltaTime) {
        this.sceneManager.update(deltaTime);
        this.player.update(deltaTime);
        this.uiManager.update(deltaTime);
    }

    // In the render method, add some debugging

    render() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Render the current scene
        this.sceneManager.render(this.ctx);
        
        // Render the player
        this.player.render(this.ctx);
        
        // Render the UI
        this.uiManager.render(this.ctx);
        
        // Debug info
        if (this.debug) {
            this.ctx.fillStyle = 'white';
            this.ctx.font = '14px Arial';
            this.ctx.fillText(`Debug: Game running at ${Math.round(1000 / (performance.now() - this.lastTime))} FPS`, 10, 20);
        }
    }
}