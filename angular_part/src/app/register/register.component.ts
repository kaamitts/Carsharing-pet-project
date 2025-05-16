import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service'; // Импортируем AuthService

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    phone: '',
    password: '',
    rePassword: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {

    console.log('Password:', this.user.password);
    console.log('RePassword:', this.user.rePassword);
    
    if (this.user.password !== this.user.rePassword) {
      alert('Passwords do not match');
      return;
    }

    this.authService.register(
      this.user.name,
      this.user.email,
      this.user.phone,
      this.user.password,
      this.user.rePassword
    ).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        console.error('Registration failed:', err);
        alert('Registration failed: ' + (err.message || 'Unknown error'));
      }
    });
  }
}
