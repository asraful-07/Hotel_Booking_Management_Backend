export interface ICreatedRoomPayload {
  name: string;
  description?: string;
  price: number;
  capacity: number;
  roomTypeId: string;

  isAvailable?: boolean;

  // images
  images?: string[];

  // extra bed
  extraBedPrice?: number;
  maxExtraBed?: number;
}

export interface IUpdateRoomPayload {
  name?: string;
  description?: string;
  price?: number;
  capacity?: number;
  roomTypeId?: string;
  isAvailable?: boolean;
  images?: string[];
  extraBedPrice?: number;
  maxExtraBed?: number;
}
