// Manages loading and switching between game scenes

import { BeachScene } from './beachScene.js';

export class SceneManager {
    constructor(game) {
        this.game = game;
        this.currentScene = null;
        this.scenes = {
            'beach': new BeachScene(game)
        };
        console.log("SceneManager initialized with scenes:", Object.keys(this.scenes));
    }

    loadScene(sceneName) {
        console.log(`Attempting to load scene: ${sceneName}`);
        if (this.scenes[sceneName]) {
            this.currentScene = this.scenes[sceneName];
            this.currentScene.load();
            console.log(`Scene ${sceneName} loaded successfully`);
        } else {
            console.error(`Scene ${sceneName} not found!`);
        }
    }

    update(deltaTime) {
        if (this.currentScene) {
            this.currentScene.update(deltaTime);
        }
    }

    render(ctx) {
        if (this.currentScene) {
            this.currentScene.render(ctx);
        } else {
            // Fallback if no scene is loaded
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, this.game.width, this.game.height);
            ctx.fillStyle = 'red';
            ctx.font = '24px Arial';
            ctx.fillText('No scene loaded!', 20, 50);
        }
    }
}