import { Component, OnInit } from '@angular/core';
import { CarService, Car } from '../services/car.service';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  imports: [CommonModule, RouterModule] 
})
export class CarsComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe(data => {
      this.cars = data;
    });
  }
}
