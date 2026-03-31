export interface ICreateReviewPayload {
  roomId: string;
  rating: number;
  comment?: string;
}

export interface IUpdateReviewPayload {
  rating?: number;
  comment?: string;
}
