export class SpriteCreator {
    constructor(game) {
        this.game = game;
        this.sprites = new Map();
        this.animations = new Map();
    }

    async createSprite(config) {
        const sprite = {
            image: new Image(),
            frameWidth: config.frameWidth || 32,
            frameHeight: config.frameHeight || 32,
            animations: {},
            currentAnimation: 'idle',
            currentFrame: 0,
            frameTimer: 0,
            scale: config.scale || 1,
            flip: false
        };

        return new Promise((resolve, reject) => {
            sprite.image.onload = () => {
                // Set up animations
                if (config.animations) {
                    Object.keys(config.animations).forEach(animName => {
                        const anim = config.animations[animName];
                        sprite.animations[animName] = {
                            frames: anim.frames,
                            frameRate: anim.frameRate || 12,
                            loop: anim.loop !== undefined ? anim.loop : true,
                            row: anim.row || 0
                        };
                    });
                }
                resolve(sprite);
            };

            sprite.image.onerror = () => {
                reject(new Error(`Failed to load sprite image: ${config.imagePath}`));
            };

            sprite.image.src = config.imagePath;
        });
    }

    updateSprite(sprite, deltaTime) {
        const animation = sprite.animations[sprite.currentAnimation];
        if (!animation) return;

        sprite.frameTimer += deltaTime;
        const frameDuration = 1000 / animation.frameRate;

        if (sprite.frameTimer >= frameDuration) {
            sprite.frameTimer = 0;
            sprite.currentFrame++;

            if (sprite.currentFrame >= animation.frames) {
                if (animation.loop) {
                    sprite.currentFrame = 0;
                } else {
                    sprite.currentFrame = animation.frames - 1;
                }
            }
        }
    }

    drawSprite(ctx, sprite, x, y, options = {}) {
        const animation = sprite.animations[sprite.currentAnimation];
        if (!animation || !sprite.image) return;

        const frameX = sprite.currentFrame * sprite.frameWidth;
        const frameY = animation.row * sprite.frameHeight;

        ctx.save();
        
        // Handle flipping
        if (sprite.flip) {
            ctx.scale(-1, 1);
            x = -x - sprite.frameWidth * sprite.scale;
        }

        // Handle rotation if specified
        if (options.rotation) {
            ctx.translate(x + sprite.frameWidth * sprite.scale / 2, 
                         y + sprite.frameHeight * sprite.scale / 2);
            ctx.rotate(options.rotation);
            x = -sprite.frameWidth * sprite.scale / 2;
            y = -sprite.frameHeight * sprite.scale / 2;
        }

        // Handle opacity
        if (options.opacity !== undefined) {
            ctx.globalAlpha = options.opacity;
        }

        // Draw shadow if enabled
        if (options.shadow) {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
        }

        // Draw the sprite
        ctx.drawImage(
            sprite.image,
            frameX, frameY,
            sprite.frameWidth, sprite.frameHeight,
            x, y,
            sprite.frameWidth * sprite.scale,
            sprite.frameHeight * sprite.scale
        );

        ctx.restore();
    }

    setAnimation(sprite, animationName) {
        if (sprite.currentAnimation !== animationName && 
            sprite.animations[animationName]) {
            sprite.currentAnimation = animationName;
            sprite.currentFrame = 0;
            sprite.frameTimer = 0;
        }
    }

    flipSprite(sprite, flip) {
        sprite.flip = flip;
    }
}