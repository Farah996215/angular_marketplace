import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { User, LoginCredentials, RegisterData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = this.getToken();
    const user = this.getUserFromStorage();
    
    if (token && user) {
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  // Simulate API call for registration
  register(userData: RegisterData): Observable<{ user: User; token: string }> {
    // Simulate API delay
    return of(null).pipe(
      delay(1500),
      map(() => {
        // Check if user already exists (simulate)
        const existingUsers = this.getUsersFromStorage();
        const userExists = existingUsers.some(user => user.email === userData.email);
        
        if (userExists) {
          throw new Error('User with this email already exists');
        }

        // Create new user
        const newUser: User = {
          id: Date.now(),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          role: userData.role,
          createdAt: new Date(),
          isActive: true
        };

        // Save to localStorage (simulate database)
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        // Generate fake token
        const token = this.generateToken(newUser);

        return { user: newUser, token };
      }),
      tap(({ user, token }) => {
        this.setAuthState(user, token);
      })
    );
  }

  // Simulate API call for login
  login(credentials: LoginCredentials): Observable<{ user: User; token: string }> {
    return of(null).pipe(
      delay(1000),
      map(() => {
        const users = this.getUsersFromStorage();
        const user = users.find(u => 
          u.email === credentials.email && 
          this.verifyPassword(credentials.password) // In real app, this would check hashed password
        );

        if (!user) {
          throw new Error('Invalid email or password');
        }

        if (!user.isActive) {
          throw new Error('Account is deactivated');
        }

        const token = this.generateToken(user);
        return { user, token };
      }),
      tap(({ user, token }) => {
        this.setAuthState(user, token);
        
        if (credentials.rememberMe) {
          localStorage.setItem('remember_me', 'true');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem('remember_me');
    
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === role;
  }

  private setAuthState(user: User, token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  private getUsersFromStorage(): User[] {
    const usersStr = localStorage.getItem('users');
    return usersStr ? JSON.parse(usersStr) : [];
  }

  private generateToken(user: User): string {
    // In a real app, this would be a JWT from the server
    return btoa(JSON.stringify({
      userId: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    }));
  }

  private verifyPassword(password: string): boolean {
    // In a real app, this would verify against hashed password
    // For demo purposes, we'll accept any password that's at least 8 chars
    return password.length >= 8;
  }

  // Update user profile
  updateProfile(updates: Partial<User>): Observable<User> {
    return of(null).pipe(
      delay(500),
      map(() => {
        const currentUser = this.currentUserSubject.value;
        if (!currentUser) {
          throw new Error('No user logged in');
        }

        const updatedUser = { ...currentUser, ...updates };
        
        // Update in localStorage
        const users = this.getUsersFromStorage();
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        
        if (userIndex !== -1) {
          users[userIndex] = updatedUser;
          localStorage.setItem('users', JSON.stringify(users));
        }

        // Update current state
        this.currentUserSubject.next(updatedUser);
        localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));

        return updatedUser;
      })
    );
  }

  // Check if token is valid (simplified)
  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const tokenData = JSON.parse(atob(token));
      return tokenData.exp > Date.now();
    } catch {
      return false;
    }
  }
  debugUsers(): void {
  const users = this.getUsersFromStorage();
  console.log('Registered Users:', users);
  console.log('Current Auth State:', {
    token: this.getToken(),
    user: this.getUser(),
    isAuthenticated: this.isAuthenticatedSubject.value
  });
}
}