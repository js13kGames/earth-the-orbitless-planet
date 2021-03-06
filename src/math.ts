export const PI2 = 2 * Math.PI;
export const HALF_PI = Math.PI / 2;
export function clamp(val: number, min: number, max: number) {
  if (val < min) {
    return min;
  }
  if (val > max) {
    return max;
  }
  return val;
}

export function randRange(range: number[]) {
  return range[0] + Math.random() * (range[1] - range[0]);
}

export function randNeg(range) {
  return (Math.random() * 2 - 1) * range;
}

export function cross(x1: number, y1: number, x2: number, y2: number) {
  return x1 * y2 - x2 * y1;
}

export function dot(x1: number, y1: number, x2: number, y2: number) {
  return x1 * x2 + y1 * y2;
}

/**
 * https://en.wikipedia.org/wiki/Simple_harmonic_motion
 * This class is made with some helper function to compute the position x, position y, ...
 * And this class follow this formular: x = amplitute * cos(2 * PI * t / period + initial_phase)
 */
export class SimpleHarmonicMotion {
  public t: number;
  constructor(public amplitute: number, public period: number, initalPhase = 0) {
    this.t = this.period * initalPhase / PI2;
  }

  public process(dt: number) {
    this.t += dt;
    while (this.t > this.period) {
      this.t -= this.period;
    }
  }

  public getX(offsetTime: number = 0) {
    return this.amplitute * Math.cos(this.getPhase(offsetTime));
  }

  public getY(offsetTime: number = 0) {
    return this.amplitute * Math.sin(this.getPhase(offsetTime));
  }

  public getPhase(offsetTime: number = 0) {
    return PI2 * (this.t + offsetTime) / this.period;
  }
}
