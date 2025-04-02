// Manages the player's inventory items

export class Inventory {
    constructor() {
        this.items = [];
        this.maxItems = 8;
        console.log("Inventory initialized");
    }

    addItem(item) {
        if (this.items.length < this.maxItems) {
            this.items.push(item);
            console.log(`Added item to inventory: ${item.name}`);
            return true;
        }
        console.log("Inventory full, can't add item");
        return false;
    }

    removeItem(itemName) {
        const index = this.items.findIndex(item => item.name === itemName);
        if (index !== -1) {
            const item = this.items.splice(index, 1)[0];
            console.log(`Removed item from inventory: ${itemName}`);
            return item;
        }
        console.log(`Item not found in inventory: ${itemName}`);
        return null;
    }

    hasItem(itemName) {
        return this.items.some(item => item.name === itemName);
    }

    getItem(itemName) {
        return this.items.find(item => item.name === itemName);
    }
}