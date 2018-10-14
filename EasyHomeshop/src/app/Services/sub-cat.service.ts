import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
import { Category } from 'src/app/BusinessObjects/category.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'
import { CommonSettings } from 'src/app/BusinessObjects/CommonSettings';
import { SubCategory } from '../BusinessObjects/subCat.model';

@Injectable({
  providedIn: 'root'
})
export class SubCatService {
  constructor(private _http:Http) { }

  commonSettings=new CommonSettings();
  headers=this.commonSettings.getHeaders();
  url=this.commonSettings.getBaseUrl();

   //Get Category get method
   getAllSubCategories() {    
    return this._http.get(this.url + "SubCategory/GetSubCategory", { headers: this.headers })
      .pipe(catchError(this.errorHandler))
  };

    //Update category post method
    updateSubCategory(_Subcategory: SubCategory) {
      return this._http.post(this.url + "SubCategory/UpdateSubCategory", _Subcategory, { headers: this.headers})
        .pipe(catchError(this.errorHandler))
    };
  
    //Add category post method
    addSubCategory(_Subcategory: SubCategory) {
      return this._http.post(this.url + "SubCategory/AddSubCategory", _Subcategory,{ headers: this.headers})
        .pipe(catchError(this.errorHandler))
    };
  
    //Delete category post method
    deleteSubCategory(_Subcategory: SubCategory) {
      return this._http.post(this.url + "SubCategory/DeleteSubCategory", _Subcategory,{ headers: this.headers})
        .pipe(catchError(this.errorHandler))
    };

    getSubCategoryById(p_CatId:string){
      return this._http.get(this.url + "SubCategory/SubCategoryById",{ headers: this.headers,params:{'p_CatId':p_CatId} })
      .pipe(catchError(this.errorHandler))
    };

  errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  };
}
