import { User } from 'next-auth';
import { Service } from './game';
import { Review } from './review';

export interface Order {
  id: number;
  serviceId: number;
  customerId: number;
  vendorId: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalPrice: number;
  currency: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  promoCodeId?: number;
  // promoCode?: PromoCode;
  // options?: OrderOption[];
  review?: Review;
  service?: Service;
  customer?: User;
  vendor?: User;
}

export enum OrderStatus {
  NEW = 'NEW',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}
