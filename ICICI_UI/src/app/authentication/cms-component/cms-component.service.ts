import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from "rxjs";

const baseUrl: string = config.url;
@Injectable({ providedIn: "root" })

export class CMSComponentService {
    
    constructor(private http: HttpClient) { }
/**
 * @author Sanchita
 * @description This function will call the service to get the project details
 */
getUserDetails():Promise<any>{
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "user/")
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}

/**
 * @author Sanchita
 * @description This function will get the details of not approved user
 */
getDetailsOfNotApproved():Promise<any>{
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "user/?makerApproval=false")
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}



/**
 * @author Sanchita
 * @description This function will get the details of  approved user
 */
getDetailsOfApproved():Promise<any>{
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "user/?makerApproval='true'")
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}

getProjectbyId(projectId):Promise<any>{
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "project/?projectId="+projectId)
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}




getProductById(productId):Promise<any>{
return new Promise((resolve,reject)=>{
    this.http.get(baseUrl + "product/?productId="+productId)
    .pipe(map(Response => Response))

    .subscribe((response: any) => {
        resolve(response);
    }, reject);
})
}
getServiceById(serviceId):Promise<any>{
return new Promise((resolve,reject)=>{
    this.http.get(baseUrl + "service/?serviceId="+serviceId)
    .pipe(map(Response => Response))

    .subscribe((response: any) => {
        resolve(response);
    }, reject);
})
}

}