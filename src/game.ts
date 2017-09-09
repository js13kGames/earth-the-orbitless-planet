import ctx, {celm, scrheight, scrwidth} from "./canvas";
import {emit, Events, listeners} from "./EventListener";
import Player from "./Player";
import SpatialHashMap from "./SpatialHashMap";

export const storageName = "etop-data";
export interface ISavedData {
  highscore: number;
  lastGunLevel?: number;
  lastStage?: number;
}

export interface ISessionData {
  isLose: boolean;
  lastScore: number;
}

export let player: Player = null;
export let dt: number = null;
export let shm: SpatialHashMap = null;

export const enum GameState {
  mainmenu,
  ingame,
}

export let gameState: number = GameState.mainmenu;
export function changeGameStage(x: number) {
  gameState = x;
}

export function newPlayer() {
  player = new Player();
}

export let score = 0;
let nextLiveUp = 500000;

export function increaseScore(s: number) {
  score += s;
  if (score >= nextLiveUp) {
    nextLiveUp += 500000;
    ++player.live;
  }
}

export function resetScore() {
  score = 0;
  nextLiveUp = 100000;
}

let lastTime = Date.now();
let isPause = false;
window.onkeydown = (e) => {
  if (e.which === 80 /* P */) {
    isPause = !isPause;
  }
  e.preventDefault();
};

export function gameloop() {
  requestAnimationFrame(gameloop);
  dt = Math.min((Date.now() - lastTime) / 1000, 0.02);
  lastTime = Date.now();
  if (isPause) {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("PAUSE", scrwidth / 2, scrheight / 2);
    return;
  }
  celm.width ^= 0;
  shm = new SpatialHashMap();  // clear the map every frame
  emit(Events.process);
  emit(Events.collisionCheck);
  for (let i = Events.render; i <= Events.last_render; ++i) {
    emit(i);
  }
  emit(Events.clean);
}
