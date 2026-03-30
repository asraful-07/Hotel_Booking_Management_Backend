import { CheckinStatus } from "../../../generated/prisma/enums";

export interface ICreateCheckinPayload {
  reservationId: string;
  notes?: string;
}

export interface IUpdateCheckinStatusPayload {
  status: CheckinStatus;
}
