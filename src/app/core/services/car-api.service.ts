import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ApiCar {
  Make_Name: string;
  Model_Name: string;
  Model_Year?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarApiService {
  // FREE API - No key required
  private apiUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles';

  constructor(private http: HttpClient) {}

  // Get car makes (brands)
  getCarMakes(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/getallmakes?format=json`).pipe(
      map(response => response.Results.slice(0, 20)), // Get first 20 brands
      catchError(error => {
        console.error('API Error:', error);
        return of(this.getFallbackMakes());
      })
    );
  }

  // Get models for a specific make
  getModelsByMake(make: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/GetModelsForMake/${make}?format=json`).pipe(
      map(response => response.Results.slice(0, 10)), // Get first 10 models
      catchError(error => {
        console.error('API Error:', error);
        return of(this.getFallbackModels(make));
      })
    );
  }

  // Convert to our app format
  convertToAppCar(apiCar: any, index: number, make: string = 'BMW'): any {
    return {
      id: index + 1,
      image: this.getCarImage(make, apiCar.Model_Name || 'Unknown'),
      brand: make,
      model: apiCar.Model_Name || 'Unknown Model',
      year: 2020 + (index % 4), // Generate years 2020-2023
      price: this.generatePrice(make),
      mileage: 10000 + (index * 5000),
      fuelType: ['Petrol', 'Diesel', 'Electric'][index % 3],
      transmission: ['Manual', 'Automatic'][index % 2],
      isFeatured: index < 2,
      isNew: index % 2 === 0
    };
  }

  private getCarImage(make: string, model: string): string {
    const carImages = [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=500&q=80'
    ];
    return carImages[Math.floor(Math.random() * carImages.length)];
  }

  private generatePrice(make: string): number {
    const basePrices: { [key: string]: number } = {
      'BMW': 65000,
      'Mercedes': 55000,
      'Audi': 45000,
      'Toyota': 35000,
      'Honda': 32000,
      'Ford': 30000
    };
    return basePrices[make] || 40000;
  }

  // Fallback data
  private getFallbackMakes() {
    return [
      { Make_Name: 'BMW' }, { Make_Name: 'Mercedes' }, { Make_Name: 'Audi' },
      { Make_Name: 'Toyota' }, { Make_Name: 'Honda' }, { Make_Name: 'Ford' }
    ];
  }

  private getFallbackModels(make: string) {
    const models: { [key: string]: any[] } = {
      'BMW': [
        { Model_Name: 'X5' }, { Model_Name: '3 Series' }, { Model_Name: '5 Series' },
        { Model_Name: 'X3' }, { Model_Name: '7 Series' }
      ],
      'Mercedes': [
        { Model_Name: 'C-Class' }, { Model_Name: 'E-Class' }, { Model_Name: 'S-Class' },
        { Model_Name: 'GLC' }, { Model_Name: 'GLE' }
      ],
      'Audi': [
        { Model_Name: 'A4' }, { Model_Name: 'A6' }, { Model_Name: 'Q5' },
        { Model_Name: 'Q7' }, { Model_Name: 'A3' }
      ]
    };
    return models[make] || [{ Model_Name: 'Unknown Model' }];
  }
}