import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
const baseUrl: string = config.url;
@Injectable()
export class ChangePasswordService {
    constructor(private http: HttpClient) { }
    /** 
     * @author Sanchita
     * @description function to change password if the user wants to change
     * 
     */
    changePassword(value): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + "user/changePassword", value)
                .pipe(map(Response => Response))

                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}