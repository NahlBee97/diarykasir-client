export interface NewUser {
  name: string;
  shift: string;
  password: string;
}

export interface UpdateUser {
  name?: string;
  shift?: string;
}

export interface SetPassword {
  password: string;
  confirmPassword: string;
}
