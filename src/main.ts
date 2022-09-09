import { init, GameLoop, loadImage, Pool } from 'kontra';
import { initUnitSpriteSheets } from './component/spriteSheet';
import PlasmaGun from './weapon/PlasmaGun';
import Game from './controller/Game';
import { appendUpgradeWeapon } from './controller/Button';
import Upgrade from './domain/Upgrade';
import PASSIVES from './data/upgrade/passive';
import User from './domain/User';
import WEAPONS from './data/upgrade/weapons';
import TitleScene from './title';
import Particle from './domain/Particle';
import EndScene from './end';
import scene from './controller/Scene';

export const TOWER_POSITION = 100;

export const particles = Pool({
  // @ts-ignore
  create: Particle,
});

const { canvas } = init();

Promise.all([
  loadImage('assets/tower.png'),
  loadImage('assets/slime.png'),
  loadImage('assets/slime2.png'),
  loadImage('assets/slime3.png'),
  loadImage('assets/plasma.png'),
  loadImage('assets/smoke.png'),
  loadImage('assets/cannon.png'),
  loadImage('assets/ground.png'),
  loadImage('assets/bat.png'),
  loadImage('assets/golem.png'),
]).then(() => {
  const sceneManager = scene();
  let passiveUpgrades: Upgrade[] = [];
  let user: User;
  let currentGame: Game;

  const init = () => {
    user = new User({
      name: 'jackie',
      image: 'assets/tower.png',
      weapons: [new PlasmaGun()],
      resource: 20,
      life: 100,
    });
    passiveUpgrades = PASSIVES.map((passive) => new Upgrade(user, passive));
    WEAPONS.forEach((weapon) => {
      appendUpgradeWeapon(weapon, () => {
        const w = new weapon.weaponClass();
        user.addWeapon(w);
        user.setResource(-1 * weapon.resourceNeeded);
      });
    });
    const game = new Game(user, canvas);
    currentGame = game;
    currentGame.start();
    return game;
  };

  const setGameScene = () => sceneManager.set(init());
  sceneManager.set(TitleScene(setGameScene));

  initUnitSpriteSheets();

  const loop = GameLoop({
    update: (dt) => {
      if (user?.getIsDead()) {
        sceneManager.set(EndScene(currentGame, setGameScene));
      }
      sceneManager.update(dt);
      particles.update();
      passiveUpgrades.forEach((upgrade) => upgrade.update());
    },
    render: () => {
      sceneManager.render();
      particles.render();
    },
  });
  loop.start();
});
