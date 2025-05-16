import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private historyUrl = 'http://localhost:8000/api/rentals/history/';
  private deleteUrl = 'http://localhost:8000/api/rentals/delete/';

  constructor(private http: HttpClient) { }

  getRentalHistory(): Observable<any> {
    return this.http.get(this.historyUrl);
  }

  deleteRental(id: number): Observable<any> {
    return this.http.post(`${this.deleteUrl}${id}/`, {});
  }
}
