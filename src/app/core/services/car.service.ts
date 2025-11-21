import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Car, CreateCarRequest } from '../models/car.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private readonly CARS_KEY = 'cars_data';
  private carsSubject = new BehaviorSubject<Car[]>(this.getCarsFromStorage());

  constructor(private authService: AuthService) {}

  getAvailableCars(): Observable<Car[]> {
    return this.carsSubject.asObservable().pipe(
      map(cars => cars.filter(car => car.isAvailable))
    );
  }

  getMyCars(): Observable<Car[]> {
    const currentUser = this.authService.getUser();
    if (!currentUser) return of([]);
    
    return this.carsSubject.asObservable().pipe(
      map(cars => cars.filter(car => car.sellerId === currentUser.id))
    );
  }

  addCar(carData: CreateCarRequest): Observable<Car> {
    const currentUser = this.authService.getUser();
    if (!currentUser) throw new Error('User not authenticated');

    return of(null).pipe(
      delay(1000),
      map(() => {
        const newCar: Car = {
          id: Date.now(),
          ...carData,
          sellerId: currentUser.id,
          sellerName: `${currentUser.firstName} ${currentUser.lastName}`,
          sellerPhone: currentUser.phone,
          images: ['assets/default-car.jpg'],
          isAvailable: true,
          createdAt: new Date()
        };

        const cars = this.getCarsFromStorage();
        cars.push(newCar);
        this.saveCarsToStorage(cars);
        this.carsSubject.next(cars);

        return newCar;
      })
    );
  }

  markAsSold(carId: number): Observable<Car> {
    return of(null).pipe(
      delay(500),
      map(() => {
        const cars = this.getCarsFromStorage();
        const carIndex = cars.findIndex(car => car.id === carId);
        
        if (carIndex === -1) throw new Error('Car not found');

        cars[carIndex].isAvailable = false;
        this.saveCarsToStorage(cars);
        this.carsSubject.next(cars);

        return cars[carIndex];
      })
    );
  }

  deleteCar(carId: number): Observable<void> {
    return of(null).pipe(
      delay(500),
      map(() => {
        const cars = this.getCarsFromStorage();
        const filteredCars = cars.filter(car => car.id !== carId);
        this.saveCarsToStorage(filteredCars);
        this.carsSubject.next(filteredCars);
      })
    );
  }

  private getCarsFromStorage(): Car[] {
    const carsStr = localStorage.getItem(this.CARS_KEY);
    return carsStr ? JSON.parse(carsStr) : [];
  }

  private saveCarsToStorage(cars: Car[]): void {
    localStorage.setItem(this.CARS_KEY, JSON.stringify(cars));
  }
}