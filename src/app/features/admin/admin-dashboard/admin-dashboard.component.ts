import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { AdminService, AdminStats, SiteAnalytics } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  stats: AdminStats | null = null;
  analytics: SiteAnalytics | null = null;
  isLoading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    
    this.adminService.getAdminStats().subscribe(stats => {
      this.stats = stats;
    });

    this.adminService.getAnalytics().subscribe(analytics => {
      this.analytics = analytics;
      this.isLoading = false;
    });
  }

  getGrowthClass(growth: number): string {
    return growth >= 0 ? 'positive' : 'negative';
  }

  formatCurrency(amount: number): string {
    return '$' + amount.toLocaleString();
  }
}