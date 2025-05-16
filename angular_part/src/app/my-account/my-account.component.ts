import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { RentalService } from '../services/rental.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-account',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  user: any;
  rentals: any[] = [];
  private deleteUrl = 'http://localhost:8000/api/rentals/delete/';

  constructor(private authService: AuthService, private rentalService: RentalService,private http: HttpClient ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadRentalHistory();
  }
  loadUserData(): void {
    this.authService.getCurrentUser().subscribe({
      next: (userData) => {
        console.log('User Data:', userData); 
        this.user = userData;
      },
      error: (err) => console.error(err)
    });
  }
  

  loadRentalHistory(): void {
    this.rentalService.getRentalHistory().subscribe({
      next: (data) => {
        console.log('История бронирований:', data.results);
        this.rentals = data.results;
      },
      error: (err) => console.error(err)
    });
  }
  
  deleteRental(id: number): void {
    const token = localStorage.getItem('access_token');
    this.http.post(`${this.deleteUrl}${id}/`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: () => {
        console.log(`Rental ${id} deleted successfully.`);
        this.loadRentalHistory(); 
      },
      error: (err: any) => console.error('Error during delete:', err)
    });
  }
  
}
