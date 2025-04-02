// Implementation of the beach scene

import { Scene } from './scene.js';

export class BeachScene extends Scene {
    constructor(game) {
        super(game);
        this.backgroundPath = 'assets/images/beach_background.png';
        console.log("Beach scene created with background path:", this.backgroundPath);
    }

    load() {
        super.load();
        
        // Define interactive hotspots
        this.addHotspot(100, 400, 150, 100, 'palm tree', ['look', 'walk']);
        this.addHotspot(300, 350, 200, 150, 'seashell', ['look', 'pick up']);
        this.addHotspot(600, 250, 150, 200, 'boat', ['look', 'walk']);
        
        // Set player starting position
        this.game.player.setPosition(200, 450);
        
        console.log("Beach scene loaded with", this.hotspots.length, "hotspots");
    }

    // Custom scene-specific interactions
    lookAtPalmTree() {
        this.game.uiManager.showDialog("A tall palm tree swaying in the ocean breeze.");
    }
    
    lookAtSeashell() {
        this.game.uiManager.showDialog("A beautiful seashell. It might be worth taking.");
    }
    
    pickUpSeashell() {
        if (!this.game.inventory.hasItem('seashell')) {
            const seashell = {
                name: 'seashell',
                description: 'A beautiful seashell from the beach.',
                sprite: null
            };
            
            // Load the sprite
            seashell.sprite = new Image();
            seashell.sprite.src = 'assets/images/seashell_item.png';
            
            this.game.inventory.addItem(seashell);
            this.game.uiManager.showDialog("You picked up the seashell.");
            
            // Remove the hotspot so it can't be picked up again
            this.hotspots = this.hotspots.filter(h => h.name !== 'seashell');
        }
    }
    
    lookAtBoat() {
        this.game.uiManager.showDialog("An old fishing boat. Looks like it's still in use.");
    }
}