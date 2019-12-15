import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
import { Observable } from "rxjs";

const baseUrl: string = config.url;
@Injectable({ providedIn: "root" })

export class AppStatusService {
    
    constructor(private http: HttpClient) { }
/**
 * @author Sanchita
 * @description This function will call the service to get the project details
 */
getProjectById(projectId):Promise<any>{
    console.log("projectId",projectId);
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl +"project/Id?projectId="+projectId)
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
getAuditTrailById(projectId):Promise<any>{
    return new Promise((resolve,reject)=>{
        this.http.get(baseUrl + "project/getAudit?projectId="+projectId)
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
postSitData(data):Promise<any>{
    return new Promise((resolve,reject)=>{
        this.http.post(baseUrl + "ping",data)
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
initiateSIT(data):Promise<any>{
    return new Promise((resolve,reject)=>{
        this.http.post(baseUrl + "project/initiateSIT",data)
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
initiateUAT(data):Promise<any>{
    return new Promise((resolve,reject)=>{
        this.http.post(baseUrl + "project/initiateUAT",data)
        .pipe(map(Response => Response))

        .subscribe((response: any) => {
            resolve(response);
        }, reject);
    })
}
getService(serviceId): Promise<any> {
    return new Promise((resolve, reject) => {
        this.http.get(baseUrl + "service/?serviceId="+serviceId)
            .pipe(map(Response => Response))

            .subscribe((response: any) => {
                resolve(response);
            }, reject);
    });
}
/**
 * @author Sanchita
 * @description This function will be used to check the api
 */
getApiDetails(serviceName,clientCode): Promise<any> {
    console.log("--------",serviceName);
    console.log("----",clientCode);
    return new Promise((resolve, reject) => {
        this.http.get(baseUrl + "ping/?serviceName="+serviceName+"&clientCode="+clientCode)
            .pipe(map(Response => Response))

            .subscribe((response: any) => {
                resolve(response);
            }, reject);
    });
}
/**
 * @author Sanchita 
 * @description This function will be used for initiating UAT
 */
postUAT(data):Promise<any>{
    return new Promise ((resolve,reject)=>{
        this.http.get(baseUrl +"project/initiateUAT",data).pipe(map(Response=>Response))
        .subscribe((response:any)=>{
            resolve(response);
        },reject);
        })
}
}
