import { Order } from './order';
import { Review } from './review';
import { User } from './user';

export interface Game {
  translations: boolean;
  id?: number;
  name: string;
  slug: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  categories?: Category[];
  services?: Service[];
}

export interface Category {
  id: number;
  gameId: number;
  parentId?: number | null;
  name: string;
  slug: string;
  services: Service[];
  parent?: Category;
  children?: Category[];
}

export interface Service {
  id: number;
  gameId: number;
  categoryId: number;
  vendorId: number;
  name: string;
  description?: string;
  imageUrl?: string;
  basePrice: number;
  currency: string;
  status: ServiceStatus | string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  game?: Game;
  category?: Category;
  type: ServiceType;
  vendor?: User;
  orders?: Order[];
  reviews?: Review[];
}

export enum ServiceType {
  CURRENCY = 'CURRENCY',
  LEVELING = 'LEVELING',
  BOOSTING = 'BOOSTING',
  COACHING = 'COACHING',
  OTHER = 'OTHER',
}

export enum ServiceStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  UNPUBLISHED = 'UNPUBLISHED',
}
