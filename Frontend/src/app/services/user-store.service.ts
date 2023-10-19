import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
private fullName$ = new BehaviorSubject<string>("")
private role$ = new BehaviorSubject<string>("")

  constructor() { }

  public getRoleFromeStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    this.role$.next(role)
  }

  public getFullNameStore(){
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(fullName:string){
    this.fullName$.next(fullName)
  }
}
