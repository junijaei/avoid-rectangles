import Player from './player.js';
import Box from './box.js';
import Info from './info.js';

export default class GameCanvas {
  #obj;
  #ctx;
  #tid;
  #player;
  #boxes;
  #info;
  #gameover;
  #levelUp;
  #level;
  #levelAppearCount;
  #levelValue;
  #gameTime;
  #score;

  #createBoxDelay;
  #maxDelay;
  #levelUpTime;

  constructor() {
    this.#obj = document.createElement('canvas');
    document.body.append(this.#obj);
    this.#obj.tabIndex = 0;
    this.#obj.width = 500;
    this.#obj.height = 700;
    this.#obj.focus();
    this.#ctx = this.#obj.getContext('2d');
    this.#tid = null;
    this.#maxDelay = 30;
    this.#createBoxDelay = this.#maxDelay;
    this.#level = 1;
    this.#levelUpTime = 0;
    this.#levelAppearCount = 0;
    this.#gameTime = 0;
    this.#score = 0;

    this.#gameover = document.getElementById('gameover');
    this.#levelUp = document.getElementById('level-up');

    this.#player = new Player();
    this.#boxes = [];
    this.#info = new Info();

    this.body = null;

    this.#obj.onkeydown = this.keyDownHandler.bind(this);
    this.#obj.onkeyup = this.keyUpHandler.bind(this);
  }

  keyDownHandler(e) {
    switch (e.keyCode) {
      case 37:
        this.#player.move(4); // 서
        break;
      case 39:
        this.#player.move(2); // 동
        break;
    }
  }

  keyUpHandler(e) {
    switch (e.keyCode) {
      case 37:
        this.#player.stop(4); // 서
        break;
      case 39:
        this.#player.stop(2); // 동
        break;
    }
  }

  createBox() {
    let x = Math.floor(Math.random() * 480);
    this.#boxes.push(new Box(x, 3 + this.#level * 0.5));
  }

  paint() {
    if (this.#levelAppearCount != 0) {
      console.log('img');
      this.#ctx.drawImage(this.#levelUp, 165, 150, 200, 150);
      this.#levelAppearCount--;
    }

    this.#info.draw(this.#ctx, this.#level, this.#gameTime, this.#score);
    this.#player.draw(this.#ctx);
    for (let box of this.#boxes) {
      box.draw(this.#ctx);
    }
  }

  isCollision() {
    for (let box of this.#boxes) {
      if (
        box.y + box.height >= 660 &&
        this.#player.x < box.x + box.width &&
        this.#player.x + this.#player.width > box.x
      ) {
        return true;
      }
    }
    return false;
  }

  update() {
    if (this.isCollision()) {
      this.#ctx.drawImage(this.#gameover, 130, 100);
      return;
    }

    this.#levelUpTime++;

    if (Math.floor(this.#levelUpTime % 500) == 0) {
      console.log('levelup');
      this.#level++;
      this.#maxDelay -= 5;
      this.#boxes.forEach((box) => (box.speed += 0.5));
      this.#levelAppearCount = 50;
    }

    this.#player.update();

    this.#createBoxDelay--;

    if (this.#createBoxDelay == 0) {
      this.createBox();
      this.#createBoxDelay = this.#maxDelay;
    }
    for (let box of this.#boxes) {
      box.update();
      if (box.endCheck(this.#obj.height)) {
        this.#boxes.shift();
        this.#score++;
      }
    }
    this.#ctx.clearRect(0, 0, 500, 700);
  }

  run() {
    setInterval(() => {
      if (!this.isCollision()) {
        this.#gameTime++;
      }
    }, 1000);
    this.#tid = setInterval(() => {
      this.update();
      this.paint();
    }, 17);
  }
}
