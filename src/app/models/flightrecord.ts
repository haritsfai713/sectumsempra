export interface FlightRecord {
  _id: string;
  time_boot_ms: number;
  pitch: number;
  roll: number;
  yaw: number;
  rollspeed: number;
  pitchspeed: number;
  yawspeed: number;
  airspeed: number;
  groundspeed: number;
  heading: number;
  throtlle: number;
  alt: number;
  climb: number;
  __v: number;
}
