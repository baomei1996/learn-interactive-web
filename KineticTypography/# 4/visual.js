import { Text } from "./text.js";
import { Partice } from "./particle.js"; 

export class Visual {
  constructor() {
    this.text = new Text();

    this.particles = [];

    this.mouse = {
      x: 0, 
      y: 0,
      radius: 100
    }

    document.addEventListener('pointermove', this.onMove.bind(this), false);
  }

  show(stageWidth, stageHeight) {
    this.pos = this.text.setText('W', 20, stageWidth, stageHeight);
    this.posTotal = this.pos.length - 1;
  }

  animate(ctx) {
    if (!this.pos) {
      return;
    }

    for(let i = 0; i < 10; i++) {
      const myPos = this.pos[(Math.random() * this.posTotal) | 0];
      this.particles.push(new Partice(myPos, this.getColor()));
    }

    for(let i = 0; i < this.particles.length; i++) {
      const item = this.particles[i];
      if(item.radius <= 1) {
        this.particles.splice(i, 1);
      }

      const dx = this.mouse.x - item.x;
      const dy = this.mouse.y = item.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = item.radius + this.mouse.radius;

      if(dist < minDist) {
        item.progress += 100;
      }

      item.draw(ctx)
    }
  }

  getColor() {
    return "#ff0000";
  }

  onMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
}