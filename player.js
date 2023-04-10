export default class Player {
  #x;
  #y;
  #width;
  #height;
  #color;
  #moveLeft;
  #moveRight;
  #speed;

  constructor(x = 250, y = 660) {
    this.#x = x;
    this.#y = y;
    this.#width = 40;
    this.#height = 40;
    this.#color = '#FFAEAE';

    this.#speed = 2;

    this.#moveLeft = false;
    this.#moveRight = false;
  }

  move(direction) {
    switch (direction) {
      case 4:
        this.#moveLeft = true;
        break;
      case 2:
        this.#moveRight = true;
        break;
    }
  }

  stop(direction) {
    switch (direction) {
      case 4:
        this.#moveLeft = false;
        break;
      case 2:
        this.#moveRight = false;
        break;
    }
  }

  draw(ctx) {
    let x = this.#x;
    let y = this.#y;
    let width = this.#width;
    let height = this.#height;
    let color = this.#color;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  update() {
    if (this.#x <= 0) {
      this.#moveLeft = false;
    }
    if (this.#x >= 460) {
      this.#moveRight = false;
    }
    if (this.#moveLeft) this.#x -= this.#speed;
    if (this.#moveRight) this.#x += this.#speed;
  }

  speedUp(){
    this.#speed += 0.5;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }
}
