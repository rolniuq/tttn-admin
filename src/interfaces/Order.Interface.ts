export interface OrderDocument {
  _id: string;
  comment: string;
  status: string;
  shipFee: number;
  requiredDate: Date;
  total: number;
  infoGuest: {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
  },
  details: [
    {
      product: string;
      quantity: number;
      size: string;
      price: number;
    }
  ]
}