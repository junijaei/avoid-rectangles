export default class Item {
  #x;
  #y;
  #width;
  #height;
  #color;
  #speed;
  #colorArr;

  constructor(x = 0, speed = 4) {
    this.#x = x;
    this.#y = 0;
    this.#width = 15;
    this.#height = 15;
    this.#colorArr = ['#9933FF', '#FFCCFF', '#CC99FF'];
    
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
    let colorIndex = Math.floor(Math.random() * 3);
    let color = this.#colorArr[colorIndex];

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
