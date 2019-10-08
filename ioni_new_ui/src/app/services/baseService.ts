import { Observable } from "rxjs";
import { HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";


export class BaseService {

    protected url = environment.url;

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        })
      };
      
    constructor() {
        
      }
        
      
  
  }