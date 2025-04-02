// Implementation of the dock scene shown in the image

import { Scene } from './scene.js';
import { NPC } from '../entities/npc.js';

export class DockScene extends Scene {
    constructor(game) {
        super(game);
        this.backgroundPath = '../assets/images/dock_night.png';
        
        // Add NPCs or other entities specific to this scene
        this.secondCharacter = new NPC(game, 400, 450, 'captain');
    }

    load() {
        super.load();
        
        // Add this scene's entities
        this.entities.push(this.secondCharacter);
        
        // Define interactive hotspots
        this.addHotspot(100, 400, 150, 100, 'dock', ['look', 'walk']);
        this.addHotspot(300, 300, 200, 150, 'shipwreck', ['look', 'walk']);
        this.addHotspot(600, 250, 150, 200, 'building', ['look', 'walk']);
        
        // Set player starting position
        this.game.player.setPosition(200, 450);
    }

    // Custom scene-specific logic
    onEnterBuilding() {
        this.game.sceneManager.loadScene('building');
    }
    
    onEnterShip() {
        this.game.sceneManager.loadScene('ship');
    }
}