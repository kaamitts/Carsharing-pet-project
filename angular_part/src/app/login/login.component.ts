import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit() {
    this.errorMessage = ''; 
    this.authService.login(this.credentials.email, this.credentials.password).subscribe({
      next: () => {
        this.router.navigate(['/cars']);
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }
}