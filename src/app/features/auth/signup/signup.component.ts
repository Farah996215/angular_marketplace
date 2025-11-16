import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { RegisterData } from '../../../core/models/user.model'; 

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatRadioModule, 
    MatCheckboxModule, 
    MatIconModule,
    MatStepperModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.createForm();
  }
  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      role: ['customer', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      ]],
      confirmPassword: ['', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }
  private passwordMatchValidator(g: FormGroup) {
    const password=g.get('password')?.value;
    const confirmPassword=g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get personalInfo() {
    return this.signupForm.get('firstName')?.valid &&
           this.signupForm.get('lastName')?.valid &&
           this.signupForm.get('email')?.valid &&
           this.signupForm.get('phone')?.valid;
  }

  get passwordValid() {
    return this.signupForm.get('password')?.valid &&
           this.signupForm.get('confirmPassword')?.valid;
  }

  onSubmit(): void {
    if(this.signupForm.valid) {
      this.isLoading = true;
      const formDate: RegisterData = this.signupForm.value;
      // Simulate an API call
      setTimeout(() => {
        console.log('Registration data:', formDate);
        this.isLoading = false;
        this.router.navigate(['/signin']);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.signupForm.controls).forEach(key => {
      this.signupForm.get(key)?.markAsTouched();
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

}
