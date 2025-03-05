import Phaser from 'phaser';

class TankScene extends Phaser.Scene {
  constructor() {
    super('TankScene');
  }

  preload() {
    this.load.image('fish1', 'assets/sprites/fluffel-fin.png');
    this.load.image('background', 'assets/backgrounds/retro-aqua-pod.png');
  }

  create() {
    this.add.image(400, 300, 'background');
    const fish = this.physics.add.sprite(100, 100, 'fish1');
    fish.setVelocity(50, 50);
    fish.setBounce(1).setCollideWorldBounds(true);
  }

  update() {
    // Add feeding or animation logic here
  }
}

export default TankScene;