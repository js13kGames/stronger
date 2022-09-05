import Unit, { UnitProps } from './Unit';

export const enum EnemySpeed {
  FAST = -3,
  SLOW = -0.75,
  NORMAL = -1.5,
}

export const enum EnemyName {
  G1 = 'G1',
  G2 = 'G2',
  G3 = 'G3',
  A1 = 'A1',
}

const enemyNameToPropsMap: Record<EnemyName, Omit<UnitProps, 'x' | 'y'>> = {
  [EnemyName.G1]: {
    HP: 8,
    name: EnemyName.G1,
    speed: EnemySpeed.NORMAL,
    width: 32,
    height: 32,
    soulPoint: 1,
    attackPower: 2,
    attackRange: 5,
    defensePower: 0,
    fireCooltime: 5,
    spriteAnimationKey: 'slime',
  },
  [EnemyName.G2]: {
    HP: 7,
    name: EnemyName.G1,
    speed: EnemySpeed.FAST,
    width: 20,
    height: 20,
    soulPoint: 2,
    attackPower: 3,
    attackRange: 5,
    defensePower: 0,
    fireCooltime: 5,
    spriteAnimationKey: 'slime2',
  },
  [EnemyName.G3]: {
    HP: 34,
    name: EnemyName.G1,
    speed: EnemySpeed.SLOW,
    width: 40,
    height: 40,
    soulPoint: 5,
    attackPower: 8,
    attackRange: 5,
    defensePower: 0,
    fireCooltime: 5,
    spriteAnimationKey: 'slime3',
  },
  [EnemyName.A1]: {
    HP: 8,
    name: EnemyName.G1,
    speed: EnemySpeed.FAST,
    width: 32,
    height: 32,
    soulPoint: 3,
    attackPower: 3,
    attackRange: 50,
    defensePower: 3,
    fireCooltime: 5,
    spriteAnimationKey: 'slime',
  },
};

const mapEnemyNameToProps = (v: EnemyName) => enemyNameToPropsMap[v];

type EnemyProps = {
  name: EnemyName;
  x: number;
  y: number;
};

export default class Enemy extends Unit {
  constructor({ name, x, y }: EnemyProps) {
    const unitProps = mapEnemyNameToProps(name);
    super({ x, y, ...unitProps });
  }
}
