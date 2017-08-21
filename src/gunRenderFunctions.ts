// This file constains functions for prerendering purpose

import {HALF_PI, PI2} from "./math";

export interface IGunConfig {
  size: number;
  x?: number;
  y?: number;
}

/**
 * This color scheme got from here: http://www.colorcombos.com/color-schemes/7626/ColorCombo7626.html
 */
const colorScheme = [
  "#525564",
  "#74828F",
  "#96C0CE",
  "#BEB9B5",
  "#C25B56",
  "#FEF6EB",
];

function renderLv12GunBarrel(ctx: CanvasRenderingContext2D, config: IGunConfig) {
  const {size, x = 0, y = 0} = config;
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.fillStyle = colorScheme[3];
  ctx.fillRect(0, -size / 16, size / 2, size / 8);
  ctx.fillStyle = colorScheme[4];
  for (let i = 0, tx = size / 10, ts = size / 3; i < 3; ++i, tx += size / 10, ts -= size / 16) {
    ctx.fillRect(tx, -ts / 2, size / 24, ts);
  }
  ctx.beginPath();
  ctx.arc(size / 2, 0, size / 8, 0, PI2);
  ctx.fillStyle = colorScheme[2];
  ctx.fill();
  ctx.fillStyle = colorScheme[5];
  ctx.fillRect(-size / 16, -size / 8, size / 8, size / 4);
  ctx.restore();
}

export function renderPlayerGunLv1(ctx: CanvasRenderingContext2D, config: IGunConfig) {
  const {size, x = 0, y = size / 2} = config;
  ctx.save();
  ctx.translate(x, y);

  ctx.save();
  ctx.scale(1, 0.5);
  const d: Array<[boolean, string]> = [[false, colorScheme[2]], [true, colorScheme[1]]];
  for (const [reverse, color] of d) {
    ctx.beginPath();
    ctx.arc(size / 2, 0, size / 2, -Math.PI * 3 / 4, HALF_PI, reverse);
    ctx.fillStyle = color;
    ctx.fill();
  }
  ctx.restore();

  renderLv12GunBarrel(ctx, {size, x: size});

  ctx.restore();
}

export function renderPlayerGunLv2(ctx: CanvasRenderingContext2D, config: IGunConfig) {
  const {size, x = 0, y = size / 2} = config;
  ctx.save();
  ctx.translate(x, y);

  ctx.save();
  ctx.scale(1, 0.75);
  const d: Array<[boolean, string]> = [[false, colorScheme[2]], [true, colorScheme[1]]];
  for (const [reverse, color] of d) {
    ctx.beginPath();
    ctx.arc(size / 2, 0, size / 2, -Math.PI * 3 / 4, HALF_PI, reverse);
    ctx.fillStyle = color;
    ctx.fill();
  }
  ctx.restore();

  renderLv12GunBarrel(ctx, {size, x: size * 15 / 16, y: -size / 8});
  renderLv12GunBarrel(ctx, {size, x: size * 15 / 16, y: size / 8});

  ctx.restore();
}
