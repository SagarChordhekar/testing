import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from "rxjs";

const baseUrl: string = config.url;
@Injectable({ providedIn: "root" })
export class UserAppDetailsService {
    dataObj;
    constructor(private http: HttpClient) { }

    /**
     * @author Sanchita
     * @param value 
     * @description function called to register user
     */


    uploadFile(projectId,file):Promise<any> {    
        console.log("file-----",file); 
        return new Promise((resolve,reject)=>{
            this.http.post(baseUrl + "file/upload_files?projectId="+projectId,file)
            .pipe(map(Response => Response))

            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }
}
