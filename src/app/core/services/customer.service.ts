import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Car } from '../models/user.model';

export interface Purchase {
  id: number;
  car: Car;
  purchaseDate: Date;
  price: number;
  status: 'completed' | 'pending' | 'cancelled';
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  // Simulate getting user's favorite cars
  getFavoriteCars(): Observable<Car[]> {
    const favorites: Car[] = [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=500&q=80',
        brand: 'BMW',
        model: 'X5',
        year: 2023,
        price: 65000,
        mileage: 15000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        isFeatured: true,
        isNew: true
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=500&q=80',
        brand: 'Mercedes',
        model: 'C-Class',
        year: 2022,
        price: 45000,
        mileage: 22000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        isFeatured: true,
        isNew: false
      }
    ];
    
    return of(favorites).pipe(delay(500));
  }

  // Simulate getting user's purchases
  getPurchases(): Observable<Purchase[]> {
    const purchases: Purchase[] = [
      {
        id: 1,
        car: {
          id: 3,
          image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=500&q=80',
          brand: 'Audi',
          model: 'A4',
          year: 2021,
          price: 38000,
          mileage: 30000,
          fuelType: 'Diesel',
          transmission: 'Automatic'
        },
        purchaseDate: new Date('2024-01-15'),
        price: 37500,
        status: 'completed'
      }
    ];
    
    return of(purchases).pipe(delay(500));
  }

  // Simulate getting dashboard stats
  getDashboardStats(): Observable<{ favorites: number; purchases: number; inquiries: number }> {
    return of({
      favorites: 2,
      purchases: 1,
      inquiries: 3
    }).pipe(delay(300));
  }
}