import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

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
  bodyType: string;
  color: string;
  location: string;
  isFeatured: boolean;
  isNew: boolean;
  description?: string;
  features?: string[];
}

export interface CarFilter {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarDataService {
  private cars: Car[] = [
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
      bodyType: 'SUV',
      color: 'Black',
      location: 'New York',
      isFeatured: true,
      isNew: true,
      description: 'Luxury SUV with premium features and excellent performance.',
      features: ['Leather Seats', 'Sunroof', 'Navigation', 'Backup Camera']
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
      bodyType: 'Sedan',
      color: 'White',
      location: 'Los Angeles',
      isFeatured: true,
      isNew: false,
      description: 'Elegant sedan with advanced technology and comfort features.',
      features: ['Premium Sound', 'LED Lights', 'Climate Control']
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=500&q=80',
      brand: 'Audi',
      model: 'A4',
      year: 2023,
      price: 42000,
      mileage: 8000,
      fuelType: 'Diesel',
      transmission: 'Automatic',
      bodyType: 'Sedan',
      color: 'Gray',
      location: 'Chicago',
      isFeatured: true,
      isNew: true,
      description: 'Sporty sedan with quattro all-wheel drive and luxury interior.',
      features: ['Quattro AWD', 'Virtual Cockpit', 'Apple CarPlay']
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=500&q=80',
      brand: 'Tesla',
      model: 'Model 3',
      year: 2023,
      price: 52000,
      mileage: 5000,
      fuelType: 'Electric',
      transmission: 'Automatic',
      bodyType: 'Sedan',
      color: 'Red',
      location: 'San Francisco',
      isFeatured: true,
      isNew: true,
      description: 'Fully electric vehicle with autopilot and premium features.',
      features: ['Autopilot', 'Glass Roof', 'Supercharging']
    },
    {
      id: 5,
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
      description: 'Reliable hybrid sedan with excellent fuel economy.',
      features: ['Hybrid Engine', 'Safety Sense', 'Spacious Interior']
    },
    {
      id: 6,
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
      description: 'American muscle car with powerful V8 engine and sporty design.',
      features: ['V8 Engine', 'Sport Mode', 'Premium Audio']
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=500&q=80',
      brand: 'Honda',
      model: 'CR-V',
      year: 2022,
      price: 32000,
      mileage: 28000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'SUV',
      color: 'Silver',
      location: 'Seattle',
      isFeatured: false,
      isNew: false,
      description: 'Practical SUV with spacious interior and reliable performance.',
      features: ['Honda Sensing', 'Flexible Seating', 'All-Wheel Drive']
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=500&q=80',
      brand: 'Porsche',
      model: '911',
      year: 2023,
      price: 120000,
      mileage: 3000,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      bodyType: 'Coupe',
      color: 'White',
      location: 'Las Vegas',
      isFeatured: true,
      isNew: true,
      description: 'Iconic sports car with exceptional performance and luxury.',
      features: ['Sport Chrono', 'Premium Package', 'Performance Exhaust']
    }
  ];

  getCars(filter?: CarFilter): Observable<Car[]> {
    let filteredCars = [...this.cars];
    
    if (filter) {
      if (filter.brand) {
        filteredCars = filteredCars.filter(car => 
          car.brand.toLowerCase().includes(filter.brand!.toLowerCase())
        );
      }
      
      if (filter.minPrice) {
        filteredCars = filteredCars.filter(car => car.price >= filter.minPrice!);
      }
      
      if (filter.maxPrice) {
        filteredCars = filteredCars.filter(car => car.price <= filter.maxPrice!);
      }
      
      if (filter.minYear) {
        filteredCars = filteredCars.filter(car => car.year >= filter.minYear!);
      }
      
      if (filter.maxYear) {
        filteredCars = filteredCars.filter(car => car.year <= filter.maxYear!);
      }
      
      if (filter.fuelType) {
        filteredCars = filteredCars.filter(car => car.fuelType === filter.fuelType);
      }
      
      if (filter.transmission) {
        filteredCars = filteredCars.filter(car => car.transmission === filter.transmission);
      }
      
      if (filter.bodyType) {
        filteredCars = filteredCars.filter(car => car.bodyType === filter.bodyType);
      }
    }
    
    return of(filteredCars).pipe(delay(500)); // Simulate API delay
  }

  getCarById(id: number): Observable<Car | undefined> {
    const car = this.cars.find(c => c.id === id);
    return of(car).pipe(delay(300));
  }

  getBrands(): string[] {
    return [...new Set(this.cars.map(car => car.brand))].sort();
  }

  getBodyTypes(): string[] {
    return [...new Set(this.cars.map(car => car.bodyType))].sort();
  }

  getFuelTypes(): string[] {
    return [...new Set(this.cars.map(car => car.fuelType))].sort();
  }
}