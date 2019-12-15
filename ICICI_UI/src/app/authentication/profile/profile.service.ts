import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from "rxjs";

const baseUrl: string = config.url;
@Injectable({ providedIn: "root" })

export class MyProfileService {
    
    constructor(private http: HttpClient) { }
    /**
 * @author Khetaram
 * @description This method will update data in the project details
 */
updateProjectData(data):Promise<any> {
    console.log("Received data inside  update method -> ",data);
    return new Promise((resolve,reject)=>{
        this.http.put(baseUrl + "project",data)
        .pipe(map(Response => Response))
        .subscribe((res:any)=>{
            console.log("Update response from app server -> ",res);
            resolve(res);
        },reject);

    })

}
/**
 * @author Sanchita
 * @description This function will call the service to get the project details
 */
getApp(projectId):Promise<any> {
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "project/?projectId="+projectId)
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
/**
 * @author Sanchita
 * @description This function will call the service to get the product details by id
 */
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
getAuditTrailByProjectId(projectId):Promise<any>{
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "project/getAudit?projectId="+projectId)
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            console.log("service response ",response)
            resolve(response);
        }, reject);
    })
}
putProjectData(data):Promise<any>{
    console.log("data------->",data);
    return new Promise((resolve,reject)=>{
        this.http.put(baseUrl + "project",data)
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
           
            resolve(response);
        }, reject);
    })
}
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