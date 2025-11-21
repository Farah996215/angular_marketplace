import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthService } from '../../../core/services/auth.service';
import { CustomerService } from '../../../core/services/customer.service';
import { User } from '../../../core/models/user.model';
import { Car } from '../../../core/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  stats = {
    favorites: 0,
    purchases: 0,
    inquiries: 0
  };
  recentFavorites: Car[] = [];
  isLoading = true;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadDashboardData();
      }
    });
  }

  private loadDashboardData(): void {
    this.isLoading = true;
    
    // Load stats
    this.customerService.getDashboardStats().subscribe(stats => {
      this.stats = stats;
    });

    // Load recent favorites
    this.customerService.getFavoriteCars().subscribe(favorites => {
      this.recentFavorites = favorites.slice(0, 2); // Show only 2 recent favorites
      this.isLoading = false;
    });
  }

  getUserGreeting(): string {
    if (!this.currentUser) return 'Welcome!';
    
    const hour = new Date().getHours();
    if (hour < 12) return `Good morning, ${this.currentUser.firstName}!`;
    if (hour < 18) return `Good afternoon, ${this.currentUser.firstName}!`;
    return `Good evening, ${this.currentUser.firstName}!`;
  }

  getMemberSince(): string {
    if (!this.currentUser?.createdAt) return 'Recently';
    
    const joinDate = new Date(this.currentUser.createdAt);
    return joinDate.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  }
}