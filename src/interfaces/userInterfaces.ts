import type { Shift } from "./authInterfaces";

export interface NewUser {
  name: string;
  shift: Shift;
  pin: string;
}

export interface UpdateUser {
  name?: string;
  shift?: Shift;
  pin?: string;
}
