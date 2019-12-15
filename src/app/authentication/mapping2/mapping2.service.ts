import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from "config";
const baseUrl: string = config.url;


@Injectable()
export class mapping2Service {
    constructor(private http: HttpClient) { }



    /**
     * @author Suchheta
     * @param value {projectId}
     * @description function to get File Data
     */

    getFileDataByProjectId(projectId): Promise<any> {

        return new Promise((resolve, reject) => {

            this.http.get(baseUrl + "file/?projectId=" + projectId)
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject)
        })
    }


    /**
    * @author Suchheta
    * @param value { productId}
    * @description function to get File Data
    */


    getFileDataByFlowId(flowId): Promise<any> {

        return new Promise((resolve, reject) => {

            this.http.get(baseUrl + "file/?flowId=" + flowId)
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject)
        })
    }


    /**
    * @author Suchheta
    * @param value {params, fileName, username, orgName}
    * @description function to post the YAML Data
    */


   postYamlData(yamlObject): Promise<any> {

    return new Promise((resolve, reject) => {
        this.http.post(baseUrl + "file/ui/yaml", yamlObject)
            .pipe(map(Response => Response))
            .subscribe((response: any) => {
                resolve(response);
            }, reject)

    })
}
   



    /**
    * @author Suchheta
    * @param value { mappedObj, fileName, clientName, username, orgName}
    * @description function to post the ESQL Data
    */

   postESQL(esqlObject): Promise<any> {

    console.log("esqlObject", esqlObject)
  
    return new Promise((resolve, reject) => {

        this.http.post(baseUrl + "file/ui/esql" , esqlObject)
            .pipe(map(Response => Response))
            .subscribe((response: any) => {
                resolve(response);
            }, reject)
    })

}
/**
        * @author Sagar Chordhekar
        * @param value {mappingDataObject}
        * @description function to bind mapping data with project
        */
       postSaveMappingData(mappingdataObject): Promise<any> {
        console.log("mappingdataObject =====>", mappingdataObject)
        return new Promise((resolve, reject) => {
            this.http.post(baseUrl + "mappingdata/", mappingdataObject)
                .pipe(map(Response => Response))
                .subscribe((response: any) => {
                    resolve(response);
                }, reject)

        })

    }

    getMappingSourceData(templateName): Promise<any>{

        console.log ("Inside getMappingSourceData");
        console.log ("templateName = ", templateName);

        return new Promise((resolve, reject) =>{

            this.http.get(baseUrl + "mappingdata/source/?templateName="+templateName)
                      .pipe(map(Response => Response ))
                      .subscribe((response: any) => {
                        resolve(response);
                    }, reject)
        } )
    }


    postMappingData(mappingObject): Promise<any>{

        console.log(" postMappingData ");
  
    return new Promise((resolve, reject) => {

        this.http.post(baseUrl + "mapping/" , mappingObject)
            .pipe(map(Response => Response))
            .subscribe((response: any) => {
                resolve(response);
            }, reject)
    })

    }

    getMappingData(projectId): Promise<any>{

        console.log("getMappingData");

        return new Promise((resolve,reject) => {

            this.http.get(baseUrl + "mappingdata/?projectId="+projectId)
            .pipe(map(Response => Response ))
            .subscribe((response: any) => {
              resolve(response);
          }, reject)

        })
    }
  

    getUserDataByName(username):Promise<any>{
        return new Promise((resolve,reject)=>{
            this.http.get(baseUrl + "user/?username="+ username)
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


getProjectData(projectId):Promise<any>{
    
    return new Promise((resolve,reject) => {

        this.http.get(baseUrl + "project/?projectId="+projectId)
        .pipe(map(Response => Response ))
        .subscribe((response: any) => {
          resolve(response);
      }, reject)

    })
}
getServiceDetails(serviceId):Promise<any>{
    
    return new Promise((resolve,reject) => {

        this.http.get(baseUrl + "service/?serviceId="+serviceId)
        .pipe(map(Response => Response ))
        .subscribe((response: any) => {
          resolve(response);
      }, reject)

    })
}

}

