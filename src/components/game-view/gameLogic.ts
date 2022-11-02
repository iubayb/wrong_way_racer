import { Assets } from "@pixi/assets";
import {
  Application,
  Sprite,
  Container,
  Texture,
  AnimatedSprite,
} from "pixi.js";
import { GAME_ASSETS, MAX_MOVMENT } from "assets";

const Keyboard = require("pixi.js-keyboard");
type CarPosition =
  | "CENTER"
  | "CENTER_TO_LEFT"
  | "CENTER_TO_RIGHT"
  | "LEFT"
  | "LEFT_TO_CENTER"
  | "RIGHT"
  | "RIGHT_TO_CENTER";

let CarStatus: CarPosition = "CENTER";

const enemyTypes: {
  type: "CENTER" | "LEFT" | "RIGHT";
  carType: "enemy" | "enemy_left" | "enemy_right";
}[] = [
  { type: "RIGHT", carType: "enemy_right" },
  { type: "CENTER", carType: "enemy" },
  { type: "LEFT", carType: "enemy_left" },
];

let currentEnemy: { sprite: Sprite; type: "CENTER" | "LEFT" | "RIGHT" };
let explosion: any;
// centerEnemy: Sprite;

export const LoadAssets = (app: Application) => {
  GAME_ASSETS.forEach(({ name, url }) => {
    Assets.add(name, url);
  });
  const texturesPromise = Assets.load(GAME_ASSETS.map((item) => item.name));
  texturesPromise.then((textures) => {
    const sky = Sprite.from(textures.sky);
    sky.width = app.screen.width;
    sky.height = app.screen.height / 2;
    sky.zIndex = 1;
    sky.name = "sky";

    const road = new Sprite(textures.road);
    road.width = app.screen.width;
    road.height = app.screen.height / 2;
    road.y = app.screen.height - road.height;
    road.zIndex = 3;
    road.name = "road";

    const mountain_fade = new Sprite(textures.mountain_fade);
    mountain_fade.width = app.screen.width;
    mountain_fade.zIndex = 2;

    const mountain_left = new Sprite(textures.mountain_left);
    mountain_left.scale.x = 0.1;
    mountain_left.scale.y = 0.1;

    const mountain_right = new Sprite(textures.mountain_right);
    mountain_right.scale.x = 0.05;
    mountain_right.scale.y = 0.05;

    const sideroad_left = new Sprite(textures.sideroad_left);
    sideroad_left.scale.x = 0.04;
    sideroad_left.scale.y = 0.04;

    const sideroad_right = new Sprite(textures.sideroad_right);
    sideroad_right.scale.x = 0.1;
    sideroad_right.scale.y = 0.1;

    const containerLeft = new Container();
    containerLeft.y = app.screen.height / 2;
    containerLeft.x = app.screen.width / 15;

    containerLeft.name = "containerLeft";
    containerLeft.addChild(mountain_left);
    containerLeft.addChild(sideroad_left);
    const containerRight = new Container();
    containerRight.addChild(sideroad_right);
    containerRight.addChild(mountain_right);
    containerRight.y = app.screen.height / 2;
    containerRight.x = app.screen.width / 1.3;
    containerRight.name = "containerRight";

    mountain_fade.width = app.screen.width;
    mountain_fade.zIndex = 2;

    const car_center = new Sprite(textures.car);

    car_center.scale.x = 0.5;
    car_center.scale.y = 0.5;
    car_center.y = app.screen.height;
    car_center.x = app.screen.width / 2;
    car_center.anchor.set(0.5, 1.15);
    car_center.zIndex = 4;
    car_center.name = "car";

    currentEnemy = { sprite: new Sprite(textures.enemy), type: "CENTER" };

    explosion = new AnimatedSprite([
      textures.explosion_spritesheet,
      textures.explosion_spritesheet1,
      textures.explosion_spritesheet2,
      textures.explosion_spritesheet3,
      textures.explosion_spritesheet4,
      textures.explosion_spritesheet5,
    ]);
    explosion.scale.x = 0.3;
    explosion.scale.y = 0.3;
    explosion.name = "explosion";

    explosion.x = app.screen.width / 2;
    explosion.y = app.screen.height / 2;
    explosion.anchor.set(0.5);
    explosion.animationSpeed = 0.5;
    explosion.play();

    app.stage.addChild(sky);
    app.stage.addChild(mountain_fade);
    app.stage.addChild(road);
    app.stage.addChild(car_center);
    app.stage.addChild(containerLeft);
    app.stage.addChild(containerRight);

    StartAnimations(app);
  });
};

export const StartAnimations = (app: Application) => {
  let count: number = 0.4;
  let firstTime = false;

  const car: Sprite = app.stage.getChildByName("car");
  const containerRight: Container = app.stage.getChildByName("containerRight");
  const containerLeft: Container = app.stage.getChildByName("containerLeft");

  const road: Sprite = app.stage.getChildByName("road");

  setInterval(() => {
    if (!firstTime) firstTime = true;
    let enemy = currentEnemy.sprite;
    let typeNum = Math.floor(Math.random() * 3);
    const type = enemyTypes[typeNum];
    enemy.texture = Assets.get(type.carType) as Texture;
    enemy.scale.x = 0.08;
    enemy.scale.y = 0.08;
    enemy.y = road.height;
    enemy.x = app.screen.width / 2 - 25;
    enemy.anchor.set(0.5, 1.1);
    enemy.zIndex = 4;
    enemy.name = "enemy";

    currentEnemy = {
      sprite: enemy,
      type: type.type,
    };

    app.stage.addChild(currentEnemy.sprite);
  }, 3000);

  setInterval(() => {
    //Delete old container
    app.stage.removeChild(containerLeft);
    app.stage.removeChild(containerRight);
    containerLeft.y = app.screen.height / 2;
    containerLeft.x = app.screen.width / 12;

    containerRight.y = app.screen.height / 2;
    containerRight.x = app.screen.width / 0.8;
    app.stage.addChild(containerLeft);
    app.stage.addChild(containerRight);
  }, 25000);

  let up = true;
  app.ticker.add(() => {
    if (count > 0.4) {
      up = false;
    }
    if (count < 0.395) {
      up = true;
    }
    if (up) {
      count += 0.05;
      car.y += Math.sin(count);
    } else {
      count += 0.3;
      car.y -= Math.sin(count);
    }
    containerRight.y += 0.08;
    containerRight.x += 0.05;

    containerLeft.y += 0.08;
    containerLeft.x -= 0.08;

    if (currentEnemy) {
      const { sprite, type } = currentEnemy;
      switch (type) {
        case "CENTER":
          sprite.y += 1.8;
          sprite.x += 0.4;
          sprite.scale.x += 0.0045;
          sprite.scale.y += 0.0045;
          break;
        case "LEFT":
          sprite.y += 1.9;
          sprite.x += 2.1;
          sprite.scale.x += 0.0045;
          sprite.scale.y += 0.0045;
          break;
        case "RIGHT":
          sprite.y += 1.9;
          sprite.x -= 1.9;
          sprite.scale.x += 0.0045;
          sprite.scale.y += 0.0045;
          break;
        default:
          break;
      }
      if (isCollision(sprite, car) && firstTime) {
        app.stage.removeChild(sprite);
        app.stage.addChild(explosion);
        setTimeout(() => {
          app.stage.removeChild(explosion);
          app.stage.addChild(car);
        }, 1000);
      }
    }
    InputChecker(app);
    CheckStatus(app);
  });
};

export const InputChecker = (app: Application) => {
  Keyboard.update();
  if (Keyboard.isKeyDown("ArrowLeft")) {
    ChangeStatus("LEFT");
  }
  if (Keyboard.isKeyDown("ArrowRight")) {
    ChangeStatus("RIGHT");
  }
};

let MovmentCounter = 0;

const CheckStatus = (app: Application) => {
  const car: Sprite = app.stage.getChildByName("car");

  switch (CarStatus) {
    case "CENTER_TO_LEFT":
      if (MovmentCounter === 0) {
        car.texture = Assets.get("car_right") as Texture;
      }
      MovmentCounter += 0.2;
      if (MovmentCounter >= MAX_MOVMENT) {
        MovmentCounter = 0;
        CarStatus = "LEFT";
      }
      car.x -= MovmentCounter;
      break;
    case "CENTER_TO_RIGHT":
      if (MovmentCounter === 0) {
        car.texture = Assets.get("car_left") as Texture;
      }
      MovmentCounter += 0.2;
      if (MovmentCounter >= MAX_MOVMENT) {
        MovmentCounter = 0;
        CarStatus = "RIGHT";
      }
      car.x += MovmentCounter;
      break;
    case "RIGHT_TO_CENTER":
      if (MovmentCounter === 0) {
        car.texture = Assets.get("car") as Texture;
      }
      MovmentCounter += 0.2;
      if (MovmentCounter >= MAX_MOVMENT) {
        MovmentCounter = 0;
        CarStatus = "CENTER";
      }
      car.x -= MovmentCounter;
      break;
    case "LEFT_TO_CENTER":
      if (MovmentCounter === 0) {
        car.texture = Assets.get("car") as Texture;
      }
      MovmentCounter += 0.2;
      if (MovmentCounter >= MAX_MOVMENT) {
        MovmentCounter = 0;
        CarStatus = "CENTER";
      }
      car.x += MovmentCounter;
      break;
    default:
      break;
  }
};

const ChangeStatus = (dir: "LEFT" | "RIGHT") => {
  if (dir === "LEFT") {
    switch (CarStatus) {
      case "CENTER":
        CarStatus = "CENTER_TO_LEFT";
        break;
      case "RIGHT":
        CarStatus = "RIGHT_TO_CENTER";
        break;
      default:
        break;
    }
  } else {
    switch (CarStatus) {
      case "CENTER":
        CarStatus = "CENTER_TO_RIGHT";
        break;
      case "LEFT":
        CarStatus = "LEFT_TO_CENTER";
        break;
      default:
        break;
    }
  }
};

function isCollision(object1: Sprite, object2: Sprite) {
  const bounds1 = object1.getBounds();
  const bounds2 = object2.getBounds();

  return (
    bounds1.x < bounds2.x + bounds2.width / 1.5 &&
    bounds1.x + bounds1.width / 1.5 > bounds2.x &&
    bounds1.y < bounds2.y + bounds2.height / 1.5 &&
    bounds1.y + bounds1.height / 1.5 > bounds2.y
  );
}
