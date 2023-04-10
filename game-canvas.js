import Player from './player.js';
import Box from './box.js';
import Info from './info.js';
import Item from './item.js'

export default class GameCanvas {
  #obj;
  #ctx;
  #tid;
  #player;
  #boxes;
  #items;
  #info;
  #gameover;
  #levelUp;
  #level;
  #levelAppearCount;
  #gameTime;
  #score;

  #createBoxDelay;
  #maxDelay;
  #createItemDelay;
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
    this.#createItemDelay = 300;
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
    this.#items = [];

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

  createItem() {
    let x = Math.floor(Math.random() * 480);
    let speed = 3;

    if(this.#boxes.length!=0){
      speed = this.#boxes[this.#boxes.length-1].speed;
    }
    
    this.#items.push(new Item(x, speed += 0.5));
  }

  paint() {
    if (this.#levelAppearCount != 0) {
      this.#ctx.drawImage(this.#levelUp, 165, 150, 200, 150);
      this.#levelAppearCount--;
    }

    this.#info.draw(this.#ctx, this.#level, this.#gameTime, this.#score);
    this.#player.draw(this.#ctx);
    for (let box of this.#boxes) {
      box.draw(this.#ctx);
    }

    for(let item of this.#items){
      item.draw(this.#ctx);
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

  isAdded() {
    for (let item of this.#items) {
      if (
        item.y + item.height >= 660 &&
        this.#player.x < item.x + item.width &&
        this.#player.x + this.#player.width > item.x
      ) {
        return true;
      }
    }
    return false;
  }

  update() {


    if(this.isAdded()){
      this.#items.shift();
      this.#player.speedUp();
      this.#score += 2;
    }

    this.#levelUpTime++;

    if (Math.floor(this.#levelUpTime % 500) == 0) {
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
    
    this.#createItemDelay--;
    
    if (this.#createItemDelay == 0) {
      this.createItem();
      this.#createItemDelay = 300;
    }
    
    for (let item of this.#items) {
      item.update();
      if (item.endCheck(this.#obj.height)) {
        this.#items.shift();
      }
    }

    this.#ctx.clearRect(0, 0, 500, 700);
  }

  run() {
    setInterval(() => {
        this.#gameTime++;
    }, 1000);
    this.#tid = setInterval(() => {
      if (this.isCollision()) {
        this.#ctx.drawImage(this.#gameover, 130, 100);
        return;
      }
      this.update();
      this.paint();
    }, 17);
  }
}
