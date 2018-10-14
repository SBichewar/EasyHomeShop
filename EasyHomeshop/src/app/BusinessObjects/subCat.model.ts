import { Category } from '../BusinessObjects/category.model';
export class SubCategory {
    constructor(
       public  Id:number,
       public  Name:string,
       public  SubCatImage:string,
       public  CatId:number,
       public  CatName:string
    ){}
}