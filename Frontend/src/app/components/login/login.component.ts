import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from 'src/app/services/user-store.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm;
  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  public resetPasswordEmail:string;
  public isValidEmail:boolean;


  constructor(
    private fb :FormBuilder,
    private authService:AuthService,
    private router:Router,
    private toast: NgToastService,
    private userStore:UserStoreService,
    private resetService:ResetPasswordService
    ) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin(){
    if(this.loginForm.valid){
        console.log(this.loginForm.value)
        this.authService.login(this.loginForm.value).subscribe({
          next:(res)=>{
            console.log(res.message)
            this.loginForm.reset();
            this.authService.storeToken(res.token);
            const tokenPayload = this.authService.decodeToken();
            this.userStore.setFullNameForStore(tokenPayload.name);
            this.userStore.setRoleForStore(tokenPayload.role);
            this.toast.success({detail:"SUCCESS",summary:res.message,duration:3000});
            this.router.navigate(['dashboard'])
          },
          error:(err)=>{
            this.toast.error({detail:"ERROR",summary:"Something when wrong!",duration:3000});
            console.log(err)
          }
        })
    }else{
      alert("Form is invalid!")
    }
  }

  checkValidEmail(event:string){
    const value = event;
    const pattern=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail=pattern.test(value);
    return this.isValidEmail;
  }

  confirmToSend(){
    if(this.checkValidEmail(this.resetPasswordEmail)){
      console.log(this.resetPasswordEmail);
   

      this.resetService.sendResetPasswordLink(this.resetPasswordEmail).subscribe({
        next:(res)=>{
          this.toast.success({
            detail:'Success',
            summary:'Reset Success!',
            duration:3000
          })
          this.resetPasswordEmail="";
          const buttonRef = document.getElementById("closeBtn");
          buttonRef?.click();
        },
        error:(err)=>{
          this.toast.error({
            detail:'ERROR',
            summary:'Something went wrong!',
            duration:3000
          })
        }
      })
    }
  }


}
