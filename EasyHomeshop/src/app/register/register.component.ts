import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material';
import { Router } from '@angular/router';
import { UserLogin } from '../BusinessObjects/user-login';
import { FormBuilder, FormGroup, FormsModule, Validators, NgForm, } from '@angular/forms'
import { UserRegistration } from 'src/app/BusinessObjects/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registration = new UserRegistration("", "", "", "","", { AddressLineOne: "", AddressLineTwo: "", City: null, State: null, PinCode: null })
  registationForm: FormGroup;
  constructor(private _fb: FormBuilder, private router: Router) { }
  test=[{Id:1,Name:'test1'},{Id:2,Name:'test2'}];
  ngOnInit() {
    this.initializeForm();
  }
  //Intialize form
  initializeForm() {
    this.registationForm = this._fb.group({
      'firstName': [this.registration.FirstName, Validators.required],
      'lastName': [this.registration.LastName, Validators.required],
      'email': [this.registration.Email, Validators.required],
      'phone': [this.registration.Mobile, Validators.required],
      'password': [this.registration.Password, Validators.required],
      'confirmPassword': ["", Validators.required],
      'addressOne': [this.registration.Address.AddressLineOne, Validators.required],
      'addresstwo': [""],
      'state': [this.registration.Address.State, Validators.required],
      'city': [this.registration.Address.City, Validators.required],
      'pinCode': [this.registration.Address.PinCode, Validators.required],
    });
  };

  //Clear form
  ClearForm() {
    this.registration.FirstName = "";
    this.registration.LastName = "";
    this.registration.Email= "";
    this.registration.Mobile= "";
    this.registration.Password="";
    this.registration.Address.AddressLineOne = "";
    this.registration.Address.AddressLineTwo = "";
    this.registration.Address.State = null;
    this.registration.Address.City = null;
    this.registration.Address.PinCode = null;
  };

  Cancel(){
    this.router.navigate(['/Login']);
  }


}
