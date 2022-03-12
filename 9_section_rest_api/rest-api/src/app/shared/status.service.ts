import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private statusUrl = '/api/status';

  constructor(
    private http: HttpClient
  ) {}

  getStatus(): Observable<any> {
    return this.http.get(this.statusUrl);
  }
}
