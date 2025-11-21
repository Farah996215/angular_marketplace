import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Car } from './car-data.service';

export interface AdminStats {
  totalUsers: number;
  totalCars: number;
  pendingApprovals: number;
  totalRevenue: number;
  monthlyGrowth: number;
}

export interface SiteAnalytics {
  users: { month: string; count: number }[];
  cars: { month: string; count: number }[];
  revenue: { month: string; amount: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private users: User[] = [
    {
      id: 1,
      email: 'admin@automarket.com',
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1 (555) 000-0001',
      role: 'admin',
      createdAt: new Date('2024-01-01'),
      isActive: true
    },
    {
      id: 2,
      email: 'john.customer@email.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1 (555) 000-0002',
      role: 'customer',
      createdAt: new Date('2024-02-15'),
      isActive: true
    },
    {
      id: 3,
      email: 'sarah.seller@email.com',
      firstName: 'Sarah',
      lastName: 'Smith',
      phone: '+1 (555) 000-0003',
      role: 'seller',
      createdAt: new Date('2024-02-20'),
      isActive: true
    },
    {
      id: 4,
      email: 'mike.customer@email.com',
      firstName: 'Mike',
      lastName: 'Johnson',
      phone: '+1 (555) 000-0004',
      role: 'customer',
      createdAt: new Date('2024-03-01'),
      isActive: false
    }
  ];

  private pendingCars: Car[] = [
    {
      id: 101,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=500&q=80',
      brand: 'Toyota',
      model: 'Camry',
      year: 2022,
      price: 28000,
      mileage: 35000,
      fuelType: 'Hybrid',
      transmission: 'Automatic',
      bodyType: 'Sedan',
      color: 'Blue',
      location: 'Miami',
      isFeatured: false,
      isNew: false,
      description: 'Reliable hybrid sedan with excellent fuel economy.'
    },
    {
      id: 102,
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=500&q=80',
      brand: 'Ford',
      model: 'Mustang',
      year: 2023,
      price: 55000,
      mileage: 12000,
      fuelType: 'Petrol',
      transmission: 'Manual',
      bodyType: 'Coupe',
      color: 'Yellow',
      location: 'Dallas',
      isFeatured: false,
      isNew: true,
      description: 'American muscle car with powerful V8 engine.'
    }
  ];

  getAdminStats(): Observable<AdminStats> {
    const stats: AdminStats = {
      totalUsers: 1542,
      totalCars: 2876,
      pendingApprovals: 12,
      totalRevenue: 154200,
      monthlyGrowth: 12.5
    };
    return of(stats).pipe(delay(800));
  }

  getUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(600));
  }

  getPendingCars(): Observable<Car[]> {
    return of(this.pendingCars).pipe(delay(600));
  }

  getAllCars(): Observable<Car[]> {
    // This would combine approved and pending cars in a real app
    return of([...this.pendingCars]).pipe(delay(600));
  }

  getAnalytics(): Observable<SiteAnalytics> {
    const analytics: SiteAnalytics = {
      users: [
        { month: 'Jan', count: 1200 },
        { month: 'Feb', count: 1350 },
        { month: 'Mar', count: 1420 },
        { month: 'Apr', count: 1542 }
      ],
      cars: [
        { month: 'Jan', count: 2100 },
        { month: 'Feb', count: 2350 },
        { month: 'Mar', count: 2670 },
        { month: 'Apr', count: 2876 }
      ],
      revenue: [
        { month: 'Jan', amount: 120000 },
        { month: 'Feb', amount: 135000 },
        { month: 'Mar', amount: 142000 },
        { month: 'Apr', amount: 154200 }
      ]
    };
    return of(analytics).pipe(delay(800));
  }

  approveCar(carId: number): Observable<boolean> {
    this.pendingCars = this.pendingCars.filter(car => car.id !== carId);
    return of(true).pipe(delay(400));
  }

  rejectCar(carId: number): Observable<boolean> {
    this.pendingCars = this.pendingCars.filter(car => car.id !== carId);
    return of(true).pipe(delay(400));
  }

  updateUserStatus(userId: number, isActive: boolean): Observable<boolean> {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.isActive = isActive;
    }
    return of(true).pipe(delay(400));
  }

  deleteUser(userId: number): Observable<boolean> {
    this.users = this.users.filter(user => user.id !== userId);
    return of(true).pipe(delay(400));
  }
}