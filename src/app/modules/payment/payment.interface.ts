export interface ICreatePaymentPayload {
  reservationId: string;
  amount: number;
  currency?: string;
  paymentMethod?: "SSL" | "CARD";
}

export interface IPaymentResponse {
  status: string;
  redirectUrl?: string;
  transactionId?: string;
  message?: string;
}
