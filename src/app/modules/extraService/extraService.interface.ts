export type ServiceType = "PER_NIGHT" | "PER_PERSON";

export interface ICreateServicePayload {
  name: string;
  price: number;
  type: ServiceType;
  isActive?: boolean;
}

export interface IUpdateServicePayload {
  name?: string;
  price?: number;
  type?: "PER_NIGHT" | "PER_PERSON";
  isActive?: boolean;
}
