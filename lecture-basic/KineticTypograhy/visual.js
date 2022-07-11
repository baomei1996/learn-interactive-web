import { Text } from "./text";
import { Particle } from "./particle";

export class Visual {
  constructor() {
    this.text = new Text();

    this.texture = PIXI.Texture.from('particle.png');

    this.particels = [];

    this.mouse = {
      x: 0,
      y: 0,
      radius: 100,
    };

    document.addEventListener('pointermove', this.onMove.bind(this), false);
  }

  show(stageWidth, stageHeight, stage) {
    if(this.container) {
      stage.removeChild(this.container);
    }

    this.pos = this.text.setText('A', stageWidth, stageHeight);

    this.container = new PIXI.ParticleContainer(
      this.pos.length, {
        vertices: false,
        position: false,
        rotation: false,
        scale: false,
        uvs: false,
        tint: false,
      }
    );
    stage.appentChild(this.container);

    for(let o = 0; i < this.pos.length; i++) {
      const item  = new Particle(this.pos[i], this.texture);
      this.container.addChild(item.sprite);
      this.particels.push(item);
    }

    this.particels = [];
  }

  animate() {
    for(let i = 0; i < this.particels.length; i ++) {
      const item = this.particels[i];
      const dx = this.mouse.x - item.x;
      const dy = this.mouse.y - item.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = item.radius + this.mouse.radius;

      ir(dist < minDist) {
        const angle = Math.atan2(dy, dx);
        const tx = item.x + Math.cos(angle) * minDist;
        const ty = item.y + Math.sign(angle) * minDist;
        const ax = tx - this.mouse.x;
        const ay = ty - this.mouse.y;
        item.vx -= ax;
        item.vy -= ay;
      }

      item.draw();
    }
  }

  onMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
}