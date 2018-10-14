import { Component, OnInit ,NgModule,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {Products} from '../BusinessObjects/products.model';
import { FormBuilder,FormGroup,FormsModule,Validators,NgForm,} from '@angular/forms'
import { MatPaginator,MatTableDataSource} from '@angular/material';
import { SubCategory } from '../BusinessObjects/subCat.model';
import { SubCatService } from 'src/app/Services/sub-cat.service';
import { CategoryServiceService } from 'src/app/Services/category-service.service';
import {  productsService } from 'src/app/Services/products.service';
import { Category } from '../BusinessObjects/category.model';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products=new Products(null,"","",null,null,null,null,null,null,null);
  productsForm:FormGroup;
  Sub_Cat_List:SubCategory[]=[];
  Cat_List:Category[]=[];
  product_List:Products[]=[];
  displayedColumns: string[] = ['category','subcategory','ProductName','productdiscription','productweight','productprice','productImage','Action'];

  dataSource;
    constructor(private router:Router,private fb:FormBuilder,private _productService:productsService,private _catService:CategoryServiceService,private _subCatService:SubCatService) {     
      
     };  
  PageHeader="Product Details";  
  image:"";  
  @ViewChild(MatPaginator) paginator:MatPaginator; 

  ngOnInit() {
     this.intialiseForm();
     this.getCategoryList();
    // this.getSubCategoryList();
  }
  intialiseForm() {
    this.productsForm = this.fb.group({
      'productName': [this.products.Name, Validators.required],
      'productId':[this.products.Id, Validators.required],
      'categoryId':[this.products.CatId],
      'subcategoryId':[this.products.SubCatId],
      'productweight':[this.products.Weight,Validators.required],
      'productdiscription':[this.products.Description,Validators.required],
      'productprice':[this.products.Price,Validators.required]
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
      this.products.Image = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  //Clear form
  cancel() {
    this.products.Id = null;
    this.products.CatId=null;
    this.products.Name = "";
    this.products.Image = "";
    this.products.Price=null;
    this.products.Description="";
    this.products.Weight=null;
    this.products.SubCatId=null;
  };
  editProduct(_poducts) {
    this.products.Id = _poducts.Id;
    this.products.Name = _poducts.Name;
    this.products.Image = _poducts.Image;
    this.products.CatId=_poducts.CatId;
    this.products.SubCatId=_poducts.SubCatId;
    this.products.Description = _poducts.Description;
    this.products.Weight=_poducts.Weight;
    this.products.Price=_poducts.Price;
  };
  SaveData() {
    if (this.products.Id == null) {
      this.addProducts();
    } else if (this.products.Id > 0) {
      this.updateproducts();
    }
  };

    //Get Category List
    getCategoryList() {
      this._catService.getAllCategories()
        .subscribe(
        data => {
          this.Cat_List = data.json(); 
           this.getSubCategoryList();    
        },
        error => console.log('Error', error)
        )
    };
  //get Sub Category List
  getSubCategoryList(){this._subCatService.getAllSubCategories()
    .subscribe(
    data => {
      this.Sub_Cat_List = data.json(); 
      this.getproductList();        
    },
    error => console.log('Error', error)
    )
  };
  

//Get All Products

getproductList(){
  this._productService.getAllProducts()
  .subscribe(
    data=>{
      this.product_List=data.json();  
      if(this.product_List.length>0){
        this.product_List.forEach(product_Listlistobj => {
          this.Cat_List.forEach(catlistobj => {
            if(product_Listlistobj.CatId==catlistobj.Id){
              product_Listlistobj.CatName=catlistobj.Name;
            }
          });
          this.Sub_Cat_List.forEach(Subcatlistobj => {
            if(product_Listlistobj.SubCatId==Subcatlistobj.Id){
              product_Listlistobj.SubCatName=Subcatlistobj.Name;
            }
          });             
        });
      }    
this.dataSource = new MatTableDataSource<Products>(this.product_List);
this.dataSource.paginator = this.paginator;
    },
    error => console.log('Error', error)
  )
}
test($event){
    this.getSubCategoryListById($event);
  }
  getSubCategoryListById(p_CatId){
     this._subCatService.getSubCategoryById(p_CatId)
     .subscribe(
       data=>{
         this.Sub_Cat_List=data.json();
       },
       error => console.log('Error', error)
     )
     //alert(this.Sub_Cat_List);
  }
updateproducts() {
  this._productService.updateProducts(this.products)
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
//Add Product
addProducts() {
  this._productService.addProduct(this.products)
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
deleteproduct(_poducts) {
  this._productService.deleteProduct(_poducts)
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
}


