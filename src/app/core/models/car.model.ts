export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  description: string;
  images: string[];
  sellerId: number;
  sellerName: string;
  sellerPhone: string;
  isAvailable: boolean;
  createdAt: Date;
  location: string;
}

export interface CreateCarRequest {
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  description: string;
  location: string;
}