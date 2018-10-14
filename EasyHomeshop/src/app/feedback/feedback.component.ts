import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from '../BusinessObjects/Feedback.model';
import { FormBuilder, FormGroup, FormsModule, Validators, NgForm, } from '@angular/forms'
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FeedBackService } from 'src/app/Services/feedbacks.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  PageHeader = "FeedBack Details";
  displayedColumns: string[] = ['Name', 'Comment', 'Action'];
  FeedBack_List: Feedback[] = [];
  DateNew:Date=null;
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  feedback = new Feedback(null, "", "");
  feedbackForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private _FeedBackService:FeedBackService) {
  };

  intialiseForm() {
    this.feedbackForm = this.fb.group({
      'feedbackName': [this.feedback.Name, Validators.required],
      'feedbackComment': [this.feedback.Comment, Validators.required]
    })
  };
  ngOnInit() {
    this.intialiseForm();
    this.getFeedBackList();
  };

  //Clear form
  cancel() {
    this.feedback.Id = null;
    this.feedback.Name = "";
    this.feedback.Comment = "";
    this.feedbackForm.markAsUntouched();
  };
  //Show details
  editFeedback(_FeedBack) {
    this.feedback.Id = _FeedBack.Id;
    this.feedback.Name = _FeedBack.Name;
    this.feedback.Comment = _FeedBack.Comment;

  };
  //Get Category List
  getFeedBackList() {
    this._FeedBackService.getAllFeedBack()
      .subscribe(
      data => {
        this.FeedBack_List = data.json();
        this.dataSource = new MatTableDataSource<Feedback>(this.FeedBack_List);
        this.dataSource.paginator = this.paginator;
      },
      error => console.log('Error', error)
      )
  };
  //Save Category
  SaveData() {
    if (this.feedback.Id == null) {
      this.addFeedback();
    } else if (this.feedback.Id > 0) {
      this.updateFeedback();
    }
  };
  //Update Category
  updateFeedback() {
    this._FeedBackService.updateFeedBack(this.feedback)
      .subscribe(
      data => {
        var status=data.json();
        if(status=="success"){
          this.getFeedBackList();
          this.cancel();
        }
      },
      error => console.log('Error', error)
      )
  };  
  //Add Category
  addFeedback() {
    this._FeedBackService.addFeedBack(this.feedback)
      .subscribe(
      data => {
        var status=data.json();
        if(status=="success"){
          this.getFeedBackList();
          this.cancel();
        }
      },
      error => console.log('Error', error)
      )
  };

  //Delete Category
  deleteFeedback(_category) {
    this._FeedBackService.deleteFeedBack(_category)
      .subscribe(
      data => {
        var status=data.json();
        if(status=="success"){
          this.getFeedBackList();
          this.cancel();
        }
      },
      error => console.log('Error', error)
      )
  };
};



