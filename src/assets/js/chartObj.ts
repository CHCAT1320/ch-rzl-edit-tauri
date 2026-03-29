// Chart object types for CRE format

export interface Meta {
  CREVersion: number;
  charter: string;
  illustrator: string;
  level: string;
  name: string;
  musician: string;
}

export interface Theme {
  backgroundColor: [number, number, number, number]; // RGBA
  noteColor: [number, number, number, number]; // RGBA
  effectsColor: [number, number, number, number]; // RGBA
}

export interface ChallengeTime {
  startTime: number;
  endTime: number;
  transTime: number;
}

export interface BpmEntry {
  time: number;
  bpm: number;
}

export interface LinePoint {
  time: number;
  x: number;
  color: [number, number, number, number]; // RGBA
  easeType: number;
  canvasIndex: number;
}

export interface Note {
  time: number;
  type: number;
  endTime?: number; // 触发hold/long note结束时间（可选）
  endCanvasIndex?: number; // hold/long note结束时对应的画布索引（可选）
}

export interface LineColor {
  startColor: [number, number, number, number]; // RGBA
  endColor: [number, number, number, number]; // RGBA
  startTime: number;
  endTime: number;
}

export interface Line {
  linePoints: LinePoint[];
  notes: Note[];
  lineColors: LineColor[];
}

export interface SpeedEvent {
  startTime: number;
  endTime: number;
  start: number;
  end: number;
}

export interface Canvas {
  moveXEvents: CameraEvent[];
  speedEvents: SpeedEvent[];
//   [key: string]: CameraEvent[] | SpeedEvent[] | any;
}

export interface CameraEvent {
  startTime: number;
  endTime: number;
  start: number;
  end: number;
  easeType: number;
}

export interface Camera {
  moveXEvents: CameraEvent[];
  scaleEvents: CameraEvent[];
  // Additional event arrays may exist (e.g., moveYEvents, rotateZEvents)
//   [key: string]: CameraEvent[] | any; // Allow for other event arrays or properties
}

export interface ChartObject {
  meta: Meta;
  themes: Theme[];
  challengeTimes: ChallengeTime[];
  bpmList: BpmEntry[];
  lines: Line[];
  canvases: Canvas[];
  camera: Camera;
}
