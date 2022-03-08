let platforms;
let player;
let cursors;
let stars;
let score = 0;
let scoreText;
let bombs;

export default class mainScene extends Phaser.Scene {

    preload() {
        this.load.image('sky', 'assets/sky2.png');
        this.load.image('ground', 'assets/platform2.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        this.add.image(400, 300, 'sky');

        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        player = this.physics.add.sprite(100, 450, 'dude');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.physics.add.collider(player, platforms)

        bombs = this.physics.add.group();
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(player, bombs, hitBomb, null, this);
        function hitBomb(player, bomb) {
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play('turn');
            gameOver = true;
        }

        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, collectStar, null, this);
        function collectStar(player, star) {
            star.disableBody(true, true);
            score += 10;
            scoreText.setText('Score: ' + score);
            if (stars.countActive(true) === 0) {
                stars.children.iterate(function (child) {
                    child.enableBody(true, child.x, 0, true, true);
                });
                let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
                let bomb = bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

            }
        }

        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    }

    update() {
        cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
    }

    /*     constructor() {
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
        } */
}