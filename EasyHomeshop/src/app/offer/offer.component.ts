import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators, NgForm, } from '@angular/forms'
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { OfferService } from 'src/app/Services/offer.service';
import { SpecialOffer } from '../BusinessObjects/SpecialOffer.model';
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  PageHeader = "Offer Details";
  displayedColumns: string[] = ['OfferTitle', 'OfferDetails', 'StartDate','EndDate','OfferImage','Action'];
  SpecialOffer_List: SpecialOffer[] = [];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  SpecialOffer = new SpecialOffer(null, null, null,null,null,null);
  OfferForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private _OfferService:OfferService) {
  }

  intialiseForm() {
    this.OfferForm = this.fb.group({
      'OfferTitle': [this.SpecialOffer.OfferTitle, Validators.required],
      'OfferDetails': [this.SpecialOffer.OfferDetails, Validators.required],
      'StartDate': [this.SpecialOffer.StartDate, Validators.required],
      'EndDate': [this.SpecialOffer.EndDate, Validators.required],
      'OfferImage': [this.SpecialOffer.OfferImage, Validators.required]
    })
  };
  ngOnInit() {
    this.intialiseForm();
    this.getAllOffer();
  };
  changeListener($event): void {
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.SpecialOffer.OfferImage = myReader.result;
    }
    myReader.readAsDataURL(file);
  };

  //Clear form
  cancel() {
    this.SpecialOffer.Id = null;
    this.SpecialOffer.OfferDetails = "";
    this.SpecialOffer.StartDate =null;
    this.SpecialOffer.EndDate = null;
    this.SpecialOffer.OfferTitle = "";
    this.SpecialOffer.OfferImage = "";
    this.OfferForm.markAsUntouched();
  };
  //Show details
  editOffer(_SpecialOffer) {
    this.SpecialOffer.Id = _SpecialOffer.Id;
    this.SpecialOffer.OfferDetails = _SpecialOffer.OfferDetails;
    this.SpecialOffer.StartDate = _SpecialOffer.StartDate;
    this.SpecialOffer.EndDate = _SpecialOffer.EndDate;
    this.SpecialOffer.OfferTitle = _SpecialOffer.OfferTitle;
    this.SpecialOffer.OfferImage = _SpecialOffer.OfferImage;

  };
  //Get Category List
  getAllOffer() {
    this._OfferService.getAllOffer()
      .subscribe(
      data => {
        this.SpecialOffer_List = data.json();
        this.dataSource = new MatTableDataSource<SpecialOffer>(this.SpecialOffer_List);
        this.dataSource.paginator = this.paginator;
      },
      error => console.log('Error', error)
      )
  };
  //Save Category
  SaveData() {
    if (this.SpecialOffer.Id == null) {
      this.addoffer();
    } else if (this.SpecialOffer.Id > 0) {
      this.updateOffer();
    }
  };
  //Update Category
  updateOffer() {
    this._OfferService.updateOffer(this.SpecialOffer)
      .subscribe(
      data => {
        var status=data.json();
        if(status=="success"){
          this.getAllOffer();
          this.cancel();
        }
      },
      error => console.log('Error', error)
      )
  };  
  //Add Category
  addoffer() {
    this._OfferService.addOffer(this.SpecialOffer)
      .subscribe(
      data => {
        var status=data.json();
        if(status=="success"){
          this.getAllOffer();
          this.cancel();
        }
      },
      error => console.log('Error', error)
      )
  };

  //Delete Category
  deleteOffer(_SpecialOffer) {
    this._OfferService.deleteOffer(_SpecialOffer)
      .subscribe(
      data => {
        var status=data.json();
        if(status=="success"){
          this.getAllOffer();
          this.cancel();
        }
      },
      error => console.log('Error', error)
      )
  };
};



