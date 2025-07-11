import { Service } from './game';
import { Order } from './order';
import { User } from './user';

export interface Review {
  id: number;
  userId: number;
  serviceId: number;
  vendorId: number;
  orderId?: number;
  rating: number;
  comment?: string;
  createdAt: string;
  user?: User;
  service?: Service;
  vendor?: User;
  order?: Order;
}
