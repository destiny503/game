export default class mainScene extends Phaser.Scene {

    constructor() {
        super('mainScene')
  
        this.ground
        this.platform
        this.player
        this.cursor
    }
  
    preload() {
        this.load.image('sky', 'assets/sky.png')
        this.load.image('ground', 'assets/ground.png')
        this.load.image('platform', 'assets/platform.png')
        this.load.spritesheet('player', 'assets/player/player.png', {frameWidth: 32, frameHeight: 32})
    }
  
    create() {
        this.add.image(400, 300, 'sky')
  
        this.ground = this.physics.add.staticGroup()
        this.ground.create(400, 600, 'ground')
  
        this.platform = this.physics.add.staticGroup()
        this.platform.create(200, 350, 'platform')
        this.platform.create(50, 500, 'platform')
        this.platform.create(50, 500, 'platform')
        this.platform.create(50, 500, 'platform')
  
        this.player = this.physics.add.sprite(100, 100, 'player')
        this.player.setCollideWorldBounds(true)
        this.player.setBounce(0.2)
  
        this.cursor = this.input.keyboard.createCursorKeys()
  
        this.physics.add.collider(this.player, this.platform)
        this.physics.add.collider(this.player, this.ground)
    }
  
    update() {
        if (this.cursor.left.isDown) {
            this.player.setVelocityX(-160)
        } else if (this.cursor.right.isDown) {
            this.player.setVelocityX(160)
        } else {
            this.player.setVelocityX(0)
        }
  
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330)
        }
    }
  }