import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../services/car.service';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarsDetailsComponent implements OnInit {
  car!: Car;
  userEmail: string = 'user@example.com'; // Заменишь позже на реального пользователя
  bookingMessage: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<Car>(`http://127.0.0.1:8000/api/cars/${id}/`).subscribe({
      next: (data) => this.car = data,
      error: (err) => console.error('Ошибка загрузки данных', err)
    });
  }

  bookCar(): void {
    const body = {
      user_email: this.userEmail,
      car_id: this.car.id
    };

    this.http.post('http://localhost:8000/api/rental-request/', body).subscribe({
      next: () => this.bookingMessage = 'Request Successfully sent!',
      error: () => this.bookingMessage = 'Error during sending request'
    });
  }
}
