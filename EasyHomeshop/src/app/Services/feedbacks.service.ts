
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
import { Category } from 'src/app/BusinessObjects/category.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'
import { CommonSettings } from 'src/app/BusinessObjects/CommonSettings';
import { Feedback } from '../BusinessObjects/Feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedBackService {
  constructor(private _http: Http) { }
  
commonSettings=new CommonSettings();
headers=this.commonSettings.getHeaders();
url=this.commonSettings.getBaseUrl();
  //Get Category get method
  getAllFeedBack() {
    //const headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.get(this.url + "Feedback/GetFeedback", { headers: this.headers })
      .pipe(catchError(this.errorHandler))
  };

  //Update category post method
  updateFeedBack(_Feedback: Feedback) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post(this.url + "Feedback/UpdateFeedback", _Feedback, { headers: this.headers})
      .pipe(catchError(this.errorHandler))
  };

  //Add category post method
  addFeedBack(_Feedback: Feedback) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post(this.url + "Feedback/AddFeedback", _Feedback,{ headers: this.headers})
      .pipe(catchError(this.errorHandler))
  };

  //Delete category post method
  deleteFeedBack(_Feedback: Feedback) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post(this.url + "Feedback/DeleteFeedback", _Feedback,{ headers: this.headers})
      .pipe(catchError(this.errorHandler))
  };

  errorHandler(error: HttpErrorResponse) {
    return throwError(error)
  };
}
