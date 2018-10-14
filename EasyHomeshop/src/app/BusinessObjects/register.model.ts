export class UserRegistration {
    constructor(
       public  FirstName:string,
       public  LastName:string,
       public  Email:string,
       public  Mobile:string,
       public  Password:string,
       public  Address:{
           AddressLineOne:string,
           AddressLineTwo:string,
           State:number,
           City:number,
           PinCode:number
       }
    ){}
}