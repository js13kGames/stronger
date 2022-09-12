import { imageAssets, init, initPointer, Scene, Sprite, Text } from 'kontra';
import Ground from './domain/Ground';
import { $ } from './util';

let TitleScene = (onStart: () => void) => {
  init();
  initPointer();

  let title = Text({
    x: 350,
    y: 90,
    font: '48px Monospace',
    text: 'STRONGER',
    textAlign: 'center',
    color: '#fff',
  });

  let subtitle = Text({
    x: 350,
    y: 140,
    font: '36px Monospace',
    text: '(What does kill you)',
    textAlign: 'center',
    color: '#aaa',
  });

  let ground = new Ground();
  let tower = Sprite({
    image: imageAssets['images/tower.png'],
    x: 240,
    y: 110,
    scaleX: 4,
    scaleY: 4,
    render() {
      let ctx = this.context as CanvasRenderingContext2D;
      if (!this.image) return;
      ctx.drawImage(this.image, 0, 0);
      ctx.scale(-1, 1);
      ctx.translate(-12, 0);
      ctx.drawImage(this.image, 0, 0);
    },
  });

  let scene = Scene({
    id: 'title',
    objects: [title, subtitle, ground.bg, ...ground.sprites, tower],
    onShow() {
      let startButton = document.createElement('button');
      startButton.classList.add('start-button');
      startButton.innerText = 'START';
      startButton.onclick = onStart;
      $('#app')?.appendChild(startButton);
    },
    onHide() {
      $('.start-button')?.remove();
    },
  });

  return scene;
};

export default TitleScene;
