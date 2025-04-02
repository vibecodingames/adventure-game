

// Implements the action verb interface at the bottom of the screen

export class ActionBar {
    constructor(game) {
        this.game = game;
        this.actions = [
            'Look at', 'Give', 'Pick up', 'Use',
            'Open', 'Push', 'Close', 'Talk to', 'Pull'
        ];
        this.selectedAction = 'Look at';
        this.height = 100;
        
        // Grid layout configuration
        this.actionGrid = {
            columns: 3,
            rows: 3,
            padding: 10,
            itemWidth: 80,
            itemHeight: 25
        };
        
        // Inventory grid configuration
        this.inventoryGrid = {
            columns: 4,
            padding: 5,
            itemSize: 50
        };
    }

    update(deltaTime) {
        // Check for action selection
    }

    render(ctx) {
        const barY = this.game.height - this.height;
        
        // Draw action bar background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, barY, this.game.width, this.height);
        
        // Draw action verbs grid
        this.renderActionGrid(ctx, barY);
        
        // Draw inventory items grid
        this.renderInventoryGrid(ctx, barY);
    }
    
    renderActionGrid(ctx, barY) {
        ctx.font = '16px Arial';
        
        const startX = 20;
        const startY = barY + 15;
        
        this.actions.forEach((action, index) => {
            const row = Math.floor(index / this.actionGrid.columns);
            const col = index % this.actionGrid.columns;
            
            const x = startX + col * (this.actionGrid.itemWidth + this.actionGrid.padding);
            const y = startY + row * (this.actionGrid.itemHeight + this.actionGrid.padding);
            
            // Draw action button background
            ctx.fillStyle = this.selectedAction === action ? 'rgba(100, 50, 150, 0.8)' : 'rgba(50, 50, 80, 0.6)';
            ctx.fillRect(x, y, this.actionGrid.itemWidth, this.actionGrid.itemHeight);
            
            // Draw action text
            ctx.fillStyle = this.selectedAction === action ? 'yellow' : 'white';
            ctx.fillText(action, x + 5, y + 18);
            
            // Draw border
            ctx.strokeStyle = this.selectedAction === action ? 'yellow' : 'purple';
            ctx.strokeRect(x, y, this.actionGrid.itemWidth, this.actionGrid.itemHeight);
        });
    }
    
    renderInventoryGrid(ctx, barY) {
        const startX = this.game.width - (this.inventoryGrid.itemSize + this.inventoryGrid.padding) * this.inventoryGrid.columns - 20;
        const startY = barY + 10;
        
        // Draw inventory section title
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText('Inventory', startX, startY - 5);
        
        // Draw inventory slots
        if (this.game.inventory && this.game.inventory.items) {
            this.game.inventory.items.forEach((item, index) => {
                const row = Math.floor(index / this.inventoryGrid.columns);
                const col = index % this.inventoryGrid.columns;
                
                const x = startX + col * (this.inventoryGrid.itemSize + this.inventoryGrid.padding);
                const y = startY + 10 + row * (this.inventoryGrid.itemSize + this.inventoryGrid.padding);
                
                // Draw item slot background
                ctx.fillStyle = 'rgba(50, 50, 50, 0.8)';
                ctx.fillRect(x, y, this.inventoryGrid.itemSize, this.inventoryGrid.itemSize);
                
                // Draw item sprite if available
                if (item.sprite) {
                    ctx.drawImage(item.sprite, x, y, this.inventoryGrid.itemSize, this.inventoryGrid.itemSize);
                } else {
                    // Placeholder
                    ctx.fillStyle = 'gray';
                    ctx.fillRect(x + 5, y + 5, this.inventoryGrid.itemSize - 10, this.inventoryGrid.itemSize - 10);
                    
                    // Draw item name as placeholder
                    ctx.fillStyle = 'white';
                    ctx.font = '12px Arial';
                    ctx.fillText(item.name || 'Item', x + 5, y + 30);
                }
                
                // Draw border
                ctx.strokeStyle = 'white';
                ctx.strokeRect(x, y, this.inventoryGrid.itemSize, this.inventoryGrid.itemSize);
            });
        }
        
        // Draw empty inventory slots if needed
        const totalSlots = 8; // Show 8 inventory slots total
        const emptySlots = totalSlots - (this.game.inventory?.items?.length || 0);
        
        for (let i = 0; i < emptySlots; i++) {
            const index = (this.game.inventory?.items?.length || 0) + i;
            const row = Math.floor(index / this.inventoryGrid.columns);
            const col = index % this.inventoryGrid.columns;
            
            const x = startX + col * (this.inventoryGrid.itemSize + this.inventoryGrid.padding);
            const y = startY + 10 + row * (this.inventoryGrid.itemSize + this.inventoryGrid.padding);
            
            // Draw empty slot
            ctx.fillStyle = 'rgba(30, 30, 30, 0.5)';
            ctx.fillRect(x, y, this.inventoryGrid.itemSize, this.inventoryGrid.itemSize);
            
            // Draw border
            ctx.strokeStyle = 'rgba(100, 100, 100, 0.5)';
            ctx.strokeRect(x, y, this.inventoryGrid.itemSize, this.inventoryGrid.itemSize);
        }
    }

    selectAction(action) {
        if (this.actions.includes(action)) {
            this.selectedAction = action;
            console.log(`Selected action: ${action}`);
        }
    }
    
    handleClick(x, y) {
        const barY = this.game.height - this.height;
        
        // Check if click is in action grid
        const startX = 20;
        const startY = barY + 15;
        
        this.actions.forEach((action, index) => {
            const row = Math.floor(index / this.actionGrid.columns);
            const col = index % this.actionGrid.columns;
            
            const actionX = startX + col * (this.actionGrid.itemWidth + this.actionGrid.padding);
            const actionY = startY + row * (this.actionGrid.itemHeight + this.actionGrid.padding);
            
            if (x >= actionX && x <= actionX + this.actionGrid.itemWidth &&
                y >= actionY && y <= actionY + this.actionGrid.itemHeight) {
                this.selectAction(action);
            }
        });
        
        // Check if click is in inventory grid
        // (Implement inventory item selection logic here)
    }
}