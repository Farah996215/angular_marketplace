import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    // Material Modules
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // Navigation items
  navItems = [
    { label: 'Home', path: '/' },
    { label: 'Browse Cars', path: '/cars' },
    { label: 'Sell Your Car', path: '/sell' }
  ];

  // Auth state
  currentUser: User | null = null;
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to auth state changes
    this.authService.currentUser$.subscribe((user: User | null) => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    });
  }

  getUserInitials(): string {
    if (!this.currentUser) return 'U';
    return (this.currentUser.firstName[0] + this.currentUser.lastName[0]).toUpperCase();
  }

  getUserDisplayName(): string {
    if (!this.currentUser) return 'User';
    return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
  }

  logout(): void {
    this.authService.logout();
  }

  getDashboardRoute(): string {
    if (!this.currentUser) return '/signin';
    
    switch (this.currentUser.role) {
      case 'admin':
        return '/admin';
      case 'seller':
        return '/seller/dashboard';
      case 'customer':
        return '/customer/dashboard';
      default:
        return '/';
    }
  }

  getDashboardLabel(): string {
    if (!this.currentUser) return 'Dashboard';
    
    switch (this.currentUser.role) {
      case 'admin':
        return 'Admin Panel';
      case 'seller':
        return 'Seller Dashboard';
      case 'customer':
        return 'My Profile';
      default:
        return 'Dashboard';
    }
  }
}