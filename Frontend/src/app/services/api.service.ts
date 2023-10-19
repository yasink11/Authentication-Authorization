import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users> {
    return this.http.get<Users>('https://localhost:7167/api/Users');
}
}