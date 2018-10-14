import { HttpHeaders } from "@angular/common/http";
export class CommonSettings {
    headers=new HttpHeaders();

constructor(){

}

    getBaseUrl():any{
        return "http://localhost:53563/api/";
    }
    getHeaders():any
    {
        this.headers =this.headers.set('Content-Type','application/json');
        
        return this.headers;
    }
}
