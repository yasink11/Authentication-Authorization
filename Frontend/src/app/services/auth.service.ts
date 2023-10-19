import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService} from '@auth0/angular-jwt'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "https://localhost:7167/api/Users/"
  private userPayload:any;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload=this.decodeToken();
   }

  signUp(user: any){
    debugger;
    return this.http.post<any>(`${this.baseUrl}register`, user)
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }


  login(user: any) {
    return this.http.post<any>(`${this.baseUrl}authentication`, user)
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  decodeToken(){
    const jwtHelper=new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getFullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }








}
