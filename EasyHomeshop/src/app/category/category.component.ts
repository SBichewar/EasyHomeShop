import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../BusinessObjects/category.model';
import { FormBuilder, FormGroup, FormsModule, Validators, NgForm, } from '@angular/forms'
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CategoryServiceService } from 'src/app/Services/category-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  PageHeader = "Category Details";
  displayedColumns: string[] = ['Name', 'CatImage', 'Action'];
  Cat_List: Category[] = [];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  category = new Category(null, "", "");
  categoryForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private _CatService: CategoryServiceService) {
  };

  intialiseForm() {
    this.categoryForm = this.fb.group({
      'categoryName': [this.category.Name, Validators.required]
    })
  };

  ngOnInit() {
    this.intialiseForm();
    this.getCategoryList();
  };
  //Image Uplaod--
  changeListener($event): void {
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.category.CatImage = myReader.result;
    }
    myReader.readAsDataURL(file);
  };

  //Clear form
  cancel() {
    this.category.Id = null;
    this.category.Name = "";
    this.category.CatImage = "";
    this.categoryForm.markAsUntouched();
  };
  //Show details
  editCat(_category) {
    this.category.Id = _category.Id;
    this.category.Name = _category.Name;
    this.category.CatImage = _category.CatImage;

  };
  //Get Category List
  getCategoryList() {
    this._CatService.getAllCategories()
      .subscribe(
      data => {
        this.Cat_List = data.json();
        this.dataSource = new MatTableDataSource<Category>(this.Cat_List);
        this.dataSource.paginator = this.paginator;
      },
      error => console.log('Error', error)
      )
  };
  //Save Category
  SaveData() {
    if (this.category.Id == null) {
      this.addCategory();
    } else if (this.category.Id > 0) {
      this.updateCategory();
    }
  };
  //Update Category
  updateCategory() {
    this._CatService.updateCategory(this.category)
      .subscribe(
      data => {
        var status=data.json();
        if(status=="success"){
          this.getCategoryList();
          this.cancel();
        }
      },
      error => console.log('Error', error)
      )
  };  
  //Add Category
  addCategory() {
    this._CatService.addCategory(this.category)
      .subscribe(
      data => {
        var status=data.json();
        if(status=="success"){
          this.getCategoryList();
          this.cancel();
        }
      },
      error => console.log('Error', error)
      )
  };

  //Delete Category
  deleteCategory(_category) {
    this._CatService.deleteCategory(_category)
      .subscribe(
      data => {
        var status=data.json();
        if(status=="success"){
          this.getCategoryList();
          this.cancel();
        }
      },
      error => console.log('Error', error)
      )
  };
};



