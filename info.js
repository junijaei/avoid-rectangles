export default class Info {
  #color;

  constructor() {
    this.#color = 'black';
  }

  draw(ctx, level, time, score) {
    ctx.font = '1.2em "Pixel intv"';
    ctx.fillStyle = this.#color;
    ctx.fillText(`Level : ${level}`, 380, 30);
    ctx.fillText(`Time : ${time}`, 380, 60);
    ctx.fillText(`Score : ${score}`, 20, 30);
  }
}
