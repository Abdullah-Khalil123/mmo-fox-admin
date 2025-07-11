import { Service } from './game';
import { Order } from './order';
import { Review } from './review';

export interface User {
  id: number;
  email: string;
  password: string;
  role: Role;
  name?: string;
  balance: number;
  services: Service[];
  orders: Order[];
  vendorOrders: Order[];
  reviewsWritten: Review[];
  reviewsReceived: Review[];
}

export enum Role {
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR',
  ADMIN = 'ADMIN',
}
