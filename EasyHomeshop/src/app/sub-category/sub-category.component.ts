import { Component, OnInit ,NgModule,ViewChild} from '@angular/core';
import{Router} from '@angular/router';
import {Category} from '../BusinessObjects/category.model';
import{FormBuilder,FormGroup,FormsModule,Validators,NgForm,} from '@angular/forms'
import{MatPaginator,MatTableDataSource} from '@angular/material';
import { SubCategory } from '../BusinessObjects/subCat.model';
import { SubCatService } from 'src/app/Services/sub-cat.service';
import { CategoryServiceService } from 'src/app/Services/category-service.service';
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  subCategory=new SubCategory(null,"","",null,null);
  subCategoryForm:FormGroup;
  Sub_Cat_List:SubCategory[]=[];
  Cat_List:Category[]=[];
  displayedColumns: string[] = ['CatName','Name', 'SubCatImage', 'Action'];
  dataSource;
  categoryForm:FormGroup;
    constructor(private router:Router,private fb:FormBuilder,private _subCatService:SubCatService,private _catService:CategoryServiceService) {     
      
     };  
  PageHeader="Sub Cat Details";  
  image:"";  
  @ViewChild(MatPaginator) paginator:MatPaginator; 

  ngOnInit() {
    this.intialiseForm();
    this.getCategoryList();
    this.getSubCategoryList();
  }
  intialiseForm() {
    this.subCategoryForm = this.fb.group({
      'subCategoryName': [this.subCategory.Name, Validators.required],
      'categoryId':[this.subCategory.CatId, Validators.required]
    })
  };
  //Image Uplaod--
  changeListener($event) : void {
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();  
    myReader.onloadend = (e) => {
      this.subCategory.SubCatImage = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  //Clear form
  cancel() {
    this.subCategory.Id = null;
    this.subCategory.CatId=null;
    this.subCategory.Name = "";
    this.subCategory.SubCatImage = "";
   
  };
  editSubCat(_Subcategory) {
    this.subCategory.Id = _Subcategory.Id;
    this.subCategory.Name = _Subcategory.Name;
    this.subCategory.SubCatImage = _Subcategory.SubCatImage;
    this.subCategory.CatId=_Subcategory.CatId;

  };
  SaveData() {
    if (this.subCategory.Id == null) {
      this.addCategory();
    } else if (this.subCategory.Id > 0) {
      this.updateCategory();
    }
  };
  //Get Category List
  getSubCategoryList() {
    this._subCatService.getAllSubCategories()
      .subscribe(
      data => {
        this.Sub_Cat_List = data.json();
        if(this.Sub_Cat_List.length>0){
          this.Sub_Cat_List.forEach(subcatlistobj => {
            this.Cat_List.forEach(catlistobj => {
              if(subcatlistobj.CatId==catlistobj.Id){
                subcatlistobj.CatName=catlistobj.Name;
              }
            });            
          });
        }
        this.dataSource = new MatTableDataSource<SubCategory>(this.Sub_Cat_List);
        this.dataSource.paginator = this.paginator;
      },
      error => console.log('Error', error)
      )
  };

  //Get Category List
  getCategoryList() {
    this._catService.getAllCategories()
      .subscribe(
      data => {
        this.Cat_List = data.json();        
      },
      error => console.log('Error', error)
      )
  };

updateCategory() {
  this._subCatService.updateSubCategory(this.subCategory)
    .subscribe(
    data => {
      var status=data.json();
      if(status=="success"){
        this.getSubCategoryList();
        this.cancel();
      }
    },
    error => console.log('Error', error)
    )
};  
//Add Category
addCategory() {
  this._subCatService.addSubCategory(this.subCategory)
    .subscribe(
    data => {
      var status=data.json();
      if(status=="success"){
        this.getSubCategoryList();
        this.cancel();
      }
    },
    error => console.log('Error', error)
    )
};
//Delete Category
deleteSubCategory(_Subcategory) {
  this._subCatService.deleteSubCategory(_Subcategory)
    .subscribe(
    data => {
      var status=data.json();
      if(status=="success"){
        this.getSubCategoryList();
        this.cancel();
      }
    },
    error => console.log('Error', error)
    )
};
}

