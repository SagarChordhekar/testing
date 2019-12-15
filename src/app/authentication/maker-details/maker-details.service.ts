import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';
const baseUrl: string = config.url;

@Injectable()
export class MakerDetailsService {
  
    constructor(private http: HttpClient) { }

    getProjectDetails(projectId):Promise<any>{
        return new Promise((resolve,reject)=>{
            this.http.get(baseUrl + "project/?projectId"+ projectId)
            .pipe(map(Response => Response))
    
            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        })
    }

    getProductDetails(productId):Promise<any>{
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "product/?productId="+ productId)
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
getUserDetails():Promise<any>{
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "user")
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}

getServiceDetails(serviceId):Promise<any>{
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "service/?serviceId="+ serviceId)
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
getUser(username):Promise<any>{
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "user/?username="+ username)
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
approveUser(data):Promise<any>{
    return new Promise((resolve,reject)=>{
        console.log("response from aprrove User ",data);
        this.http.post(baseUrl + "user/approveByMaker", data)
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
}













