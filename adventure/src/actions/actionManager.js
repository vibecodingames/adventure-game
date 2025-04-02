// Handles game actions and interactions

export class ActionManager {
    constructor(game) {
        this.game = game;
        console.log("ActionManager initialized");
    }

    performAction(action, target) {
        console.log(`Performing action: ${action} on ${target.name}`);
        
        // For now, just show a dialog
        this.game.uiManager.showDialog(`You tried to ${action.toLowerCase()} the ${target.name}.`);
    }
}