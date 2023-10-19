import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { faHome, faShoppingCart, faBox, faUsers, faFileText, faLink } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public users:any=[];
  public role:string="";
  public fullName:string="";
  
  constructor(
    private api: ApiService,
    private authService:AuthService,
    private userStore:UserStoreService) {
  
    }
  
  ngOnInit() {
    this.api.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    });

    this.userStore.getFullNameStore()
    .subscribe(val=>{
      const fullNameFromToken=this.authService.getFullNameFromToken();
      this.fullName=val || fullNameFromToken
    });

    this.userStore.getRoleFromeStore().subscribe(val=>{
      const roleFromToken = this.authService.getFullNameFromToken();
      this.role=val || roleFromToken;
    })
  }


  logOut(){
    this.authService.signOut();
  }
}
