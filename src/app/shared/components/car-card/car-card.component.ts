import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

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
  isNew?  : boolean;
}
@Component({
  selector: 'app-car-card',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss'
})
export class CarCardComponent {
  @Input() car!: Car;
  isFavorite=false;
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
  formatPrice(price: number): string {
    return 'DT' + price.toLocaleString();
  }
  formatMileage(mileage: number): string {
    return mileage.toLocaleString() + ' km';
  }
}
