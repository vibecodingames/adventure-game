import { Game } from './game.js';

window.onload = function() {
    console.log("Window loaded, initializing game...");
    try {
        const game = new Game();
        game.init();
        game.start();
        console.log("Game started successfully");
    } catch (error) {
        console.error("Error initializing game:", error);
        document.body.innerHTML = '<div style="color: white; padding: 20px;">Error starting game. Check console for details.</div>';
    }
};