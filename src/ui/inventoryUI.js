// UI component for displaying inventory items

export class InventoryUI {
    constructor(game) {
        this.game = game;
        this.itemSize = 50;
        this.padding = 5;
    }

    update(deltaTime) {
        // Update animations or tooltips
    }

    render(ctx) {
        const barY = this.game.height - this.game.uiManager.actionBar.height;
        const startX = this.game.width - (this.itemSize + this.padding) * 4;
        
        // Draw inventory items
        this.game.inventory.items.forEach((item, index) => {
            const row = Math.floor(index / 4);
            const col = index % 4;
            const x = startX + col * (this.itemSize + this.padding);
            const y = barY + 10 + row * (this.itemSize + this.padding);
            
            // Draw item background
            ctx.fillStyle = 'rgba(50, 50, 50, 0.8)';
            ctx.fillRect(x, y, this.itemSize, this.itemSize);
            
            // Draw item sprite if available
            if (item.sprite) {
                ctx.drawImage(item.sprite, x, y, this.itemSize, this.itemSize);
            } else {
                // Placeholder
                ctx.fillStyle = 'gray';
                ctx.fillRect(x + 5, y + 5, this.itemSize - 10, this.itemSize - 10);
            }
            
            // Draw border
            ctx.strokeStyle = 'white';
            ctx.strokeRect(x, y, this.itemSize, this.itemSize);
        });
    }
}