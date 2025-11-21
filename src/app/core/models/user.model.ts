export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'customer' | 'seller' | 'admin';
  avatar?: string;
  createdAt: Date;
  isActive: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: 'customer' | 'seller';
  agreeToTerms: boolean;
}
export interface Car {
  id: number;
  image: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  isFeatured?: boolean;
  isNew?: boolean;
}