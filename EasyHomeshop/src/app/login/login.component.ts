import { Component, OnInit,NgModule } from '@angular/core';
import{MatInputModule} from '@angular/material';
import{Router} from '@angular/router';
import {UserLogin} from '../BusinessObjects/user-login';
import{FormBuilder,FormGroup,FormsModule,Validators,NgForm,} from '@angular/forms'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userModel=new UserLogin("","");
  displayLoader:boolean=false;
  loginForm:FormGroup;
  constructor(private router:Router,private fb:FormBuilder) {
this.loginForm=fb.group({
  'userName':[this.userModel.UserName,Validators.required],
  'password':[this.userModel.UserName]
})
    
   }
ngOnInit() {
}
  Login()
  {
    this.displayLoader=true;
    this.router.navigate(['/Category']);
  };
  Register()
  { this.displayLoader=true;
    this.router.navigate(['/Registration']);
  }

}
