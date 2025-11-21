import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: User | null = null;
  isLoading = false;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.createForm();
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.populateForm(user);
      }
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-()]+$/)]],
    });
  }

  private populateForm(user: User): void {
    this.profileForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone
    });
    
    // Disable form initially
    this.profileForm.disable();
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    
    if (this.isEditing) {
      this.profileForm.enable();
      // Keep email disabled as it shouldn't be changed easily
      this.profileForm.get('email')?.disable();
    } else {
      this.profileForm.disable();
      // Re-populate form with original values if cancelled
      if (this.currentUser) {
        this.populateForm(this.currentUser);
      }
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.currentUser) {
      this.isLoading = true;
      
      const updates = {
        firstName: this.profileForm.get('firstName')?.value,
        lastName: this.profileForm.get('lastName')?.value,
        phone: this.profileForm.get('phone')?.value
      };

      this.authService.updateProfile(updates).subscribe({
        next: (updatedUser) => {
          this.isLoading = false;
          this.isEditing = false;
          this.profileForm.disable();
          
          this.snackBar.open('Profile updated successfully!', 'Close', {
            duration: 3000,
            panelClass: 'success-snackbar'
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.snackBar.open('Failed to update profile. Please try again.', 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.profileForm.controls).forEach(key => {
      this.profileForm.get(key)?.markAsTouched();
    });
  }

  getAvatarInitials(): string {
    if (!this.currentUser) return 'U';
    return (this.currentUser.firstName[0] + this.currentUser.lastName[0]).toUpperCase();
  }

  getMemberSince(): string {
    if (!this.currentUser?.createdAt) return 'Recently';
    
    const joinDate = new Date(this.currentUser.createdAt);
    return joinDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}