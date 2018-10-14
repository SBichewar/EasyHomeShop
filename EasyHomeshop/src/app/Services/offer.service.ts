import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
import { Category } from 'src/app/BusinessObjects/category.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'
import { CommonSettings } from 'src/app/BusinessObjects/CommonSettings';
import { SpecialOffer } from '../BusinessObjects/SpecialOffer.model';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  constructor(private _http: Http) { }
  
commonSettings=new CommonSettings();
headers=this.commonSettings.getHeaders();
url=this.commonSettings.getBaseUrl();  

  getAllOffer() {
    //const headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.get(this.url + "SpecialOffer/GetSpecialOffer", { headers: this.headers })
      .pipe(catchError(this.errorHandler))
  };

  //Update category post method
  updateOffer(_SpecialOffer: SpecialOffer) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post(this.url + "SpecialOffer/UpdateSpecialOffer", _SpecialOffer, { headers: this.headers})
      .pipe(catchError(this.errorHandler))
  };

  //Add category post method
  addOffer(_SpecialOffer: SpecialOffer) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post(this.url + "SpecialOffer/AddSpecialOffer", _SpecialOffer,{ headers: this.headers})
      .pipe(catchError(this.errorHandler))
  };

  //Delete category post method
  deleteOffer(_SpecialOffer: SpecialOffer) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post(this.url + "SpecialOffer/GetSpecialOffer", _SpecialOffer,{ headers: this.headers})
      .pipe(catchError(this.errorHandler))
  };

  errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  };
}
