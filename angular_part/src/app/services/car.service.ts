import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Car {
  id: number;
  name: string;
  description: string;
  price_per_day: string;
  image?: string;
  specifications: CarSpecifications;
  is_available: boolean;
}

export interface CarSpecifications {
  engine: string;
  fuelType?: string;
  transmission?: string;
  seats?: number;
  features?: string[];
}


@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://127.0.0.1:8000/api/cars/';

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  getCar(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}${id}/`);
  }
}
