import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
import { Category } from 'src/app/BusinessObjects/category.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'
import { CommonSettings } from 'src/app/BusinessObjects/CommonSettings';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {  
  constructor(private _http: Http) { }
  
commonSettings=new CommonSettings();
headers=this.commonSettings.getHeaders();
url=this.commonSettings.getBaseUrl();
  //Get Category get method
  getAllCategories() {
    //const headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.get(this.url + "Category/GetCategory", { headers: this.headers })
      .pipe(catchError(this.errorHandler))
  };

  //Update category post method
  updateCategory(_category: Category) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post(this.url + "Category/UpdateCategory", _category, { headers: this.headers})
      .pipe(catchError(this.errorHandler))
  };

  //Add category post method
  addCategory(_category: Category) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post(this.url + "Category/AddCategory", _category,{ headers: this.headers})
      .pipe(catchError(this.errorHandler))
  };

  //Delete category post method
  deleteCategory(_category: Category) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post(this.url + "Category/DeleteCategory", _category,{ headers: this.headers})
      .pipe(catchError(this.errorHandler))
  };

  errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  };
}
