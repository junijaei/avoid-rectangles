export default class Box {
  #x;
  #y;
  #width;
  #height;
  #color;
  #speed;
  #colorArr;

  constructor(x = 0, speed = 3) {
    this.#x = x;
    this.#y = 0;
    this.#width = 20;
    this.#height = 20;
    this.#colorArr = ['#AEFFBE', '#AEFFD4', '#C9FFAE', '#AEFFDF'];
    let colorIndex = Math.floor(Math.random() * 4);
    this.#color = this.#colorArr[colorIndex];
    this.#speed = speed;
  }

  move() {
    this.#y += this.#speed;
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
    this.#y += this.#speed;
  }

  endCheck(size) {
    if (this.#y >= size) {
      return true;
    }
    return false;
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

  speedUp() {
    this.#speed += 0.5;
  }
}
