import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { CarCardComponent } from '../../../shared/components/car-card/car-card.component';
import { CarDataService, Car, CarFilter } from '../../../core/services/car-data.service';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatCardModule,
    CarCardComponent
  ],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  isLoading = true;
  
  // Filter properties
  searchQuery = '';
  filter: CarFilter = {};
  
  // Filter options
  brands: string[] = [];
  bodyTypes: string[] = [];
  fuelTypes: string[] = [];
  
  // Price range
  minPrice = 0;
  maxPrice = 200000;
  priceRange = [0, 200000];
  
  // Year range
  minYear = 2010;
  maxYear = 2024;
  yearRange = [2010, 2024];
  
  // View options
  viewMode: 'grid' | 'list' = 'grid';
  sortBy = 'featured';

  constructor(private carDataService: CarDataService) {}

  ngOnInit(): void {
    this.loadCars();
    this.loadFilterOptions();
  }

  loadCars(): void {
    this.isLoading = true;
    this.carDataService.getCars(this.filter).subscribe({
      next: (cars) => {
        this.cars = cars;
        this.filteredCars = this.applySearchFilter(cars);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading cars:', error);
        this.isLoading = false;
      }
    });
  }

  loadFilterOptions(): void {
    this.brands = this.carDataService.getBrands();
    this.bodyTypes = this.carDataService.getBodyTypes();
    this.fuelTypes = this.carDataService.getFuelTypes();
  }

  applyFilters(): void {
    this.filter = {
      brand: this.filter.brand,
      minPrice: this.priceRange[0],
      maxPrice: this.priceRange[1],
      minYear: this.yearRange[0],
      maxYear: this.yearRange[1],
      fuelType: this.filter.fuelType,
      transmission: this.filter.transmission,
      bodyType: this.filter.bodyType
    };
    
    this.loadCars();
  }

  applySearchFilter(cars: Car[]): Car[] {
    if (!this.searchQuery.trim()) {
      return cars;
    }
    
    const query = this.searchQuery.toLowerCase();
    return cars.filter(car =>
      car.brand.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query) ||
      car.location.toLowerCase().includes(query)
    );
  }

  onSearchChange(): void {
    this.filteredCars = this.applySearchFilter(this.cars);
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.filter = {};
    this.priceRange = [0, 200000];
    this.yearRange = [2010, 2024];
    this.loadCars();
  }

  sortCars(sortBy: string): void {
    this.sortBy = sortBy;
    
    switch (sortBy) {
      case 'price-low':
        this.filteredCars.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredCars.sort((a, b) => b.price - a.price);
        break;
      case 'year-new':
        this.filteredCars.sort((a, b) => b.year - a.year);
        break;
      case 'year-old':
        this.filteredCars.sort((a, b) => a.year - b.year);
        break;
      default: // featured
        this.filteredCars.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
        });
    }
  }

  get resultCount(): string {
    return `${this.filteredCars.length} car${this.filteredCars.length !== 1 ? 's' : ''} found`;
  }
}