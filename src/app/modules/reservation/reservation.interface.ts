import { ReservationStatus } from "../../../generated/prisma/enums";

export interface IReservationServiceItem {
  serviceId: string;
  quantity?: number;
}

export interface ICreateReservationPayload {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;

  adults?: number;
  children?: number;
  roomsBooked?: number;
  extraBed?: number;

  services?: IReservationServiceItem[];
}

export interface IUpdateReservationStatusPayload {
  status: ReservationStatus;
}
