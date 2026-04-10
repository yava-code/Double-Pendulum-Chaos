/** Physics constants for the double pendulum simulation */
export interface PendulumParams {
  l1: number;   // length of arm 1 (px)
  l2: number;   // length of arm 2 (px)
  m1: number;   // mass of bob 1
  m2: number;   // mass of bob 2
  g: number;    // gravitational acceleration
}

/** A single point in the angle-vs-time graph */
export interface GraphPoint {
  time: number;
  angle1: number;
  angle2: number;
}

/** A 2D position used for trail rendering */
export interface TrailPoint {
  x: number;
  y: number;
}
