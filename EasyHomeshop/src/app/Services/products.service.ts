import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
import { Products } from 'src/app/BusinessObjects/products.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'
import { CommonSettings } from 'src/app/BusinessObjects/CommonSettings';
import { SubCategory } from '../BusinessObjects/subCat.model';

@Injectable({
  providedIn: 'root'
})
export class productsService {
  constructor(private _http:Http) {}

  commonSettings=new CommonSettings();
  headers=this.commonSettings.getHeaders();
  url=this.commonSettings.getBaseUrl();

   //Get Category get method
   getAllProducts() {    
    return this._http.get(this.url + "Products/ProductsList", { headers: this.headers })
      .pipe(catchError(this.errorHandler))
  };

    //Update product post method
    updateProducts(_product: Products) {
      return this._http.post(this.url + "Products/UpdateProducts", _product, { headers: this.headers})
        .pipe(catchError(this.errorHandler))
    };
  
    //Add products post method
    addProduct(_product: Products) {
      return this._http.post(this.url + "Products/AddProduct", _product,{ headers: this.headers})
        .pipe(catchError(this.errorHandler))
    };
  
    //Delete product post method
    deleteProduct(_product: Products) {
      return this._http.post(this.url + "Products/DeleteProduct", _product,{ headers: this.headers})
        .pipe(catchError(this.errorHandler))
    };
  errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  };


}