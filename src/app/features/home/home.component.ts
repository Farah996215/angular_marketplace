import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { CarCardComponent } from '../../shared/components/car-card/car-card.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CarApiService } from '../../core/services/car-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatButtonModule,
    MatIconModule,
    CarCardComponent,
    FooterComponent,
    HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredCars: any[] = [];
  isLoading = true;
  apiError = false;

  constructor(private carApiService: CarApiService) {}

  ngOnInit(): void {
    this.loadFeaturedCars();
  }

  loadFeaturedCars(): void {
  this.isLoading = true;
  this.apiError = false;

  // Use the FREE NHTSA API
  this.carApiService.getModelsByMake('BMW').subscribe({
    next: (apiModels: any[]) => {
      if (apiModels && apiModels.length > 0) {
        this.featuredCars = apiModels.map((model, index) => 
          this.carApiService.convertToAppCar(model, index, 'BMW')
        );
      } else {
        this.loadMockCars();
      }
      this.isLoading = false;
    },
    error: (error) => {
      console.error('API Error:', error);
      this.apiError = true;
      this.isLoading = false;
      this.loadMockCars();
    }
  });
}

  private loadMockCars(): void {
    this.featuredCars = [
      {
        id: 1,
        image: 'https://media.lesechos.com/api/v1/images/view/6519354c292322486a2ebc4c/1280x720/0902247010374-web-tete.jpg',
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
        isFeatured: true,
        isNew: true
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
        isFeatured: true,
        isNew: true
      }
    ];
  }
  
}