import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h2>CleanTrack Login</h2>
          <p>Waste Management System</p>
        </div>
        
        <form (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              [(ngModel)]="credentials.email"
              name="email"
              required
              placeholder="Enter your email"
              class="form-control"
            />
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              [(ngModel)]="credentials.password"
              name="password"
              required
              placeholder="Enter your password"
              class="form-control"
            />
          </div>
          
          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>
          
          <button class="login-btn" (click)="onSubmit()" [disabled]="isLoading">
            <span *ngIf="!isLoading">🔐 Login</span>
            <span *ngIf="isLoading">🔄 Logging in...</span>
          </button>

          <button class="cancel-btn" *ngIf="isLoading" (click)="cancelLogin()">
            Cancel
          </button>
        </form>
        
        <div class="login-footer">
          <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
        
        <div class="demo-accounts">
          <h4>Demo Accounts:</h4>
          <div class="demo-account">
            <strong>Admin:</strong> admin@cleantrack.com / admin123
          </div>
          <div class="demo-account">
            <strong>Official:</strong> juan@barangay.gov / official123
          </div>
          <div class="demo-account">
            <strong>Resident:</strong> pedro@email.com / resident123
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    :host {
      --green: #1a7a4a;
      --green-mid: #25a366;
      --green-neon: #39e07a;
      --dark: #0d1f14;
      --dark-2: #162a1e;
      --text: #e8f0eb;
      --text-muted: #8aab97;
      --white: #f9fdf9;
      --danger: #e85c3a;
      --warning: #f0a500;
      --radius: 16px;
    }

    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--dark);
      padding: 20px;
      font-family: 'DM Sans', sans-serif;
      position: relative;
    }
    
    .login-card {
      background: var(--dark-2);
      border: 1px solid rgba(57, 224, 122, 0.15);
      border-radius: 24px;
      box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5);
      padding: 48px;
      width: 100%;
      max-width: 440px;
      position: relative;
      overflow: hidden;
    }

    .login-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(57,224,122,0.5), transparent);
    }
    
    .login-header {
      text-align: center;
      margin-bottom: 32px;
    }
    
    .login-header h2 {
      font-family: 'Syne', sans-serif;
      color: var(--white);
      margin-bottom: 8px;
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    
    .login-header p {
      color: var(--text-muted);
      margin: 0;
      font-size: 14px;
      font-weight: 300;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: var(--text-muted);
      font-weight: 500;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .form-control {
      width: 100%;
      padding: 14px 18px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      font-size: 0.9rem;
      transition: border-color 0.2s, box-shadow 0.2s;
      box-sizing: border-box;
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      outline: none;
    }
    
    .form-control:focus {
      border-color: rgba(57, 224, 122, 0.4);
      box-shadow: 0 0 0 3px rgba(57, 224, 122, 0.08);
      background: rgba(255,255,255,0.06);
    }
    
    .form-control::placeholder {
      color: var(--text-muted);
    }
    
    .error-message {
      background: rgba(232, 92, 58, 0.1);
      border: 1px solid rgba(232, 92, 58, 0.2);
      color: var(--danger);
      padding: 14px;
      border-radius: 10px;
      margin-bottom: 20px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    
    .login-btn {
      width: 100%;
      padding: 16px;
      background: var(--green-neon);
      color: var(--dark);
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      font-family: 'DM Sans', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .login-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 16px 40px rgba(57, 224, 122, 0.4);
    }
    
    .login-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .cancel-btn {
      width: 100%;
      padding: 12px;
      background: transparent;
      color: var(--text-muted);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 12px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
      font-family: 'DM Sans', sans-serif;
      margin-top: 12px;
    }

    .cancel-btn:hover {
      border-color: rgba(255,255,255,0.35);
      background: rgba(255,255,255,0.05);
    }
    
    .login-footer {
      text-align: center;
      margin-top: 28px;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    
    .login-footer p {
      color: var(--text-muted);
      font-size: 0.85rem;
      margin: 0;
    }
    
    .login-footer a {
      color: var(--green-neon);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }
    
    .login-footer a:hover {
      color: var(--green-light);
    }
    
    .demo-accounts {
      margin-top: 24px;
      padding: 20px;
      background: rgba(57, 224, 122, 0.05);
      border: 1px solid rgba(57, 224, 122, 0.15);
      border-radius: 12px;
      font-size: 0.75rem;
    }
    
    .demo-accounts h4 {
      margin: 0 0 12px 0;
      color: var(--green-neon);
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .demo-account {
      margin-bottom: 8px;
      color: var(--text-muted);
      line-height: 1.4;
    }
    
    .demo-account strong {
      color: var(--text);
    }

    .cancel-btn {
      width: 100%;
      padding: 12px;
      background: transparent;
      color: var(--text-muted);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 12px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
      font-family: 'DM Sans', sans-serif;
      margin-top: 12px;
    }

    .cancel-btn:hover {
      border-color: rgba(255,255,255,0.35);
      background: rgba(255,255,255,0.05);
    }

    /* Loading state */
    .login-btn.loading {
      position: relative;
      color: transparent;
    }

    .login-btn.loading::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      top: 50%;
      left: 50%;
      margin-left: -8px;
      margin-top: -8px;
      border: 2px solid var(--dark);
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoginComponent {
  credentials: LoginRequest = {
    email: '',
    password: ''
  };
  
  errorMessage = '';
  isLoading = false;
  private loginTimeout: any; // Add this property

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  cancelLogin(): void {
    console.log('Cancelling login...');
    this.isLoading = false;
    this.errorMessage = '';
    clearTimeout(this.loginTimeout); // Clear timeout if exists
  }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    console.log('=== LOGIN ATTEMPT START ===');
    console.log('Credentials:', this.credentials);
    console.log('Backend URL:', 'http://localhost:5000/api/users/login');

    // Quick connection test
    console.log('Testing backend connection...');
    fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.credentials)
    }).then(response => {
      console.log('Backend response status:', response.status);
      console.log('Backend response headers:', response.headers);
      
      if (!response.ok) {
        console.log('Response not OK:', response.status, response.statusText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response.json();
    }).then(data => {
      console.log('Login successful via fetch:', data);
      console.log('=== LOGIN SUCCESS ===');
      this.handleLoginSuccess(data);
    }).catch(error => {
      console.error('=== LOGIN ERROR ===');
      console.error('Error type:', error.name);
      console.error('Error message:', error.message);
      console.error('Full error:', error);
      this.handleLoginError(error);
    });

    // Add timeout to prevent infinite loading
    this.loginTimeout = setTimeout(() => {
      if (this.isLoading) {
        console.log('=== LOGIN TIMEOUT ===');
        this.isLoading = false;
        this.errorMessage = 'Login request timed out. Please check your connection and try again.';
      }
    }, 10000); // 10 second timeout
  }

  handleLoginSuccess(response: any): void {
    clearTimeout(this.loginTimeout);
    console.log('Login successful:', response);
    console.log('User object:', response.user);
    this.isLoading = false;
    
    // Store user info and token
    if (response.token && response.user) {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('current_user', JSON.stringify(response.user));
      
      // Redirect based on user role
      const user = response.user;
      console.log('User role:', user.role);
      
      if (user.role === 'RESIDENT') {
        console.log('Redirecting to resident dashboard');
        this.router.navigate(['/resident']);
      } else {
        console.log('Redirecting to admin dashboard');
        this.router.navigate(['/admin']);
      }
    } else {
      this.errorMessage = 'Invalid response from server. Please try again.';
    }
  }

  handleLoginError(error: any): void {
    clearTimeout(this.loginTimeout);
    console.error('Login error:', error);
    this.isLoading = false;
    
    // Better error handling
    if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED') || error.message.includes('NetworkError')) {
      this.errorMessage = 'Cannot connect to server. Please ensure the backend is running on port 5000.';
      console.error('NETWORK ERROR - Backend might be down');
    } else if (error.message.includes('HTTP 401')) {
      this.errorMessage = 'Invalid credentials. Please check your email and password.';
      console.error('AUTHENTICATION ERROR - Invalid credentials');
    } else if (error.message.includes('HTTP 500')) {
      this.errorMessage = 'Server error. Please try again later.';
      console.error('SERVER ERROR - Backend issue');
    } else if (error.message.includes('CORS')) {
      this.errorMessage = 'CORS error. Please check backend configuration.';
      console.error('CORS ERROR - Backend CORS issue');
    } else {
      this.errorMessage = error.message || 'Login failed. Please try again.';
      console.error('UNKNOWN ERROR:', error);
    }
  }
}
