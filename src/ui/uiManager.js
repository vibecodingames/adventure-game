// Manages the game's user interface elements

import { ActionBar } from './actionBar.js';

export class UIManager {
    constructor(game) {
        this.game = game;
        this.actionBar = new ActionBar(game);
        this.dialogBox = null;
        this.showingDialog = false;
        console.log("UIManager initialized with ActionBar");
    }

    update(deltaTime) {
        // Update UI components
        this.actionBar.update(deltaTime);
    }

    render(ctx) {
        // Draw action bar at the bottom
        this.actionBar.render(ctx);
        
        // Render dialog box if active
        if (this.dialogBox && this.showingDialog) {
            this.dialogBox.render(ctx);
        }
    }

    showDialog(text, character) {
        console.log(`Showing dialog: ${text}`);
        this.dialogBox = {
            text,
            character,
            render: (ctx) => {
                // Draw dialog box
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(50, 50, 700, 150);
                ctx.strokeStyle = 'white';
                ctx.strokeRect(50, 50, 700, 150);
                
                // Draw text
                ctx.fillStyle = 'white';
                ctx.font = '18px Arial';
                ctx.fillText(this.dialogBox.text, 70, 90);
                
                // Draw character name if provided
                if (this.dialogBox.character) {
                    ctx.fillStyle = 'yellow';
                    ctx.fillText(this.dialogBox.character, 70, 70);
                }
            }
        };
        this.showingDialog = true;
    }

    hideDialog() {
        this.showingDialog = false;
    }
}