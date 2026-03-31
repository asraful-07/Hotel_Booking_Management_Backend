import { UserRole } from "../../../generated/prisma/enums";

export interface IUpdateUserPayload {
  name?: string;
  phone?: string;
  image?: string;
}

export interface IUpdateUserRolePayload {
  userId: string;
  role: UserRole;
}

export interface ICreateManagerPayload {
  name: string;
  email: string;
  password: string;
}
