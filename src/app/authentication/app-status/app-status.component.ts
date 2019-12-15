import { Component, OnInit, ViewChild, OnDestroy, ɵConsole } from "@angular/core";
import { NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import { AppStatusService } from "./app-status.service";
import { HttpClient } from "@angular/common/http";

import {
    FormGroup,
    FormBuilder,

} from "@angular/forms";
import { IfStmt } from "@angular/compiler";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";


@Component({
    selector: "app-app-status",
    templateUrl: "./app-status.component.html",
    styleUrls: ["./app-status.component.css"]
})
export class AppStatusComponent implements OnInit, OnDestroy {
    finalStatus: boolean;
    UatInitiated: any;
    message: any;
    private tabSet: NgbTabset;
    show = 2;
    projectId: string;
    projectData;
    projectInformation: any;
    auditTrailData: any;
    LiveAuditTrailData: any = [];
    clientCode: any;
    public navbarOpen: boolean;
    status = [];
    initiateUATFlag: any = "false";
    stopRequest: boolean = false;
    UatProgress: boolean = true;
    interval;
    SITinterval;
    UATinterval;
    Liveinterval;
    PRODinterval;
    SITDATA: any;
    UATDATA: any;
    PRODDATA: any;
    userData: string;
    dataOfUser: any;
    serviceNameOfUser: any;
    hideShow: any;
    dataForSIT: {};
    timestamp: any;
    valueOfRequest: any;
    displayInitiateSITButton: boolean = false;
    lastData: any;
    LiveAuditTrailUATData = [];
    addTestData: FormGroup;
    labelValue: string;
    valueOfUAT: Boolean = true;
    serviceDetails: any;
    responseMessage: any;
    exp: any;
    readyForProductionFlag: string;
    showButton: boolean;
    projectValue: any;
    @ViewChild(NgbTabset) set content(content: NgbTabset) {
        this.tabSet = content;
    }
    options = {
        theme: "light", // two possible values: light, dark
        dir: "ltr", // two possible values: ltr, rtl
        layout: "vertical", // fixed value. shouldn't be changed.
        sidebartype: "full", // four possible values: full, iconbar, overlay, mini-sidebar
        sidebarpos: "fixed", // two possible values: fixed, absolute
        headerpos: "fixed", // two possible values: fixed, absolute
        boxed: "full", // two possible values: full, boxed
        navbarbg: "skin1", // six possible values: skin(1/2/3/4/5/6)
        sidebarbg: "skin6", // six possible values: skin(1/2/3/4/5/6)
        logobg: "skin6" // six possible values: skin(1/2/3/4/5/6)
    };

  

    displayActivities: any[] = [
        {
            activity: " DevOps: Code Checked-Out",
            status: "code_checked_out SUCCESS"
        },
        {
            activity: "DevOps: Application Deployment Unit Created",
            status: "application_deployment_unit_created SUCCESS"
        },
        {
            activity: "DevOps: Application Deployment Unit Configuration Updated",
            status: "application_deployment_unit_configuration_updated SUCCESS"
        },
        {
            activity: "DevOps: Application Proxy Deployed (IBM APIC)",
            status: "application_proxy_deployed FAILED"
        },
        {
            activity: "DevOps: Application Deployed (IBM ACE)",
            status: "application_deployed FAILED"
        },
        {
            activity: "DevOps: Test Data Prepared",
            status: "code_checked_out FAILED"
        },
        {
            activity: "DevOps: Test Data Deployed",
            status: "code_checked_out FAILED"
        },
        { activity: "DevOps: Running Tests", status: "code_checked_out FAILED" },
        {
            activity: "DevOps: Test Run Completed",
            status: "code_checked_out FAILED"
        },
        {
            activity: "DevOps: Recording Test Results",
            status: "code_checked_out FAILED"
        }
    ];

    recentActivity: any[] = [
        {
            date: "MM/DD/YYYY",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis."
        },
        {
            date: "MM/DD/YYYY",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis."
        },
        {
            date: "MM/DD/YYYY",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis."
        },
        {
            date: "MM/DD/YYYY",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis."
        }
    ];
    constructor(private appService: AppStatusService, private fb: FormBuilder, private http: HttpClient) { }

    ngOnInit() {
        // this.LiveAuditTrailData=JSON.parse(localStorage.getItem('LiveAuditTrailUATData'));
        // console.log("Live Audit Trail",this.LiveAuditTrailData);
        this.addTestData = this.fb.group({
            'urlName': ['']
        })
        // changes by sanchita
        this.readyForProductionFlag = localStorage.getItem("status");
        console.log(" Status Check ", this.readyForProductionFlag);
        if (this.readyForProductionFlag == 'true') {
            this.showButton = true;
        }
        else {
            this.showButton = false;
        }


        // var tabId = this.displayActivities[3].status.split("_").pop();
        // this.stopRequest = false;
        this.userData = localStorage.getItem("dataofUser");
        console.log("this.userData", this.userData);
        this.dataOfUser = JSON.parse(this.userData);
        this.clientCode = this.dataOfUser[0].clientCodeProfund;
        console.log(" Profund Client Code", this.clientCode);
        this.serviceNameOfUser = this.dataOfUser[0].serviceName;
        console.log(" Service Name ", this.clientCode);
        this.projectId = localStorage.getItem("projectId");
        console.log(" projectId  ", this.projectId);

        //  this.dataOfUser=JSON.parse(localStorage.getItem("dataofUser"));
        //  this.clientCode=localStorage.getItem("clientCode");

        this.appService.getProjectById(this.projectId).then(data => {
            this.projectData = data;
            // changes by sanchita 12-December
            this.projectValue = data[0];
            console.log(" Project Data ", this.projectData);
            this.dataForSIT = {
                'projectId': this.dataOfUser[0].projectId,
                'clientCode': this.clientCode,
                'serviceName': this.dataOfUser[0].serviceName.toLowerCase(),
                'username': this.dataOfUser[0].username,
                'orgName': this.dataOfUser[0].orgName
            }
            console.log("Data For SIT ", JSON.stringify(this.dataForSIT));
            this.appService.initiateSIT(this.dataForSIT).then(data => {
                console.log(" SIT Response ", data);
                if (data === 'successfully pushed file on github.') {
                    this.LiveAuditTrailData.push({ projectId: this.projectId, status: "SUCCESS", event: "test_Data_Prepared", createdBy: "NA", orgName: "NA", timeStamp: this.timestamp })
                }
            });

            this.submitTestData();
        });
        
    }

    submitTestData() {
        var urlName = this.projectData[0].products[0].services[0].serviceURLUAT;
        console.log(" URL Name ", urlName);
        var id = this.projectData[0].products[0].services[0].serviceId;
        console.log(" User Data ID ", id);
        this.appService.getServiceById(id).then((data) => {
            this.serviceDetails = data;
            console.log("Print name", this.serviceDetails);
            var name = this.serviceDetails[0].serviceName;
            console.log("Print name", name, this.clientCode);
            // var name="ECollection with Remitter Validation in Intermediary Account";


            this.appService.getApiDetails(name, this.clientCode).then((data) => {
                console.log("Get ping API Resonse ", data);
                this.labelValue = data.fileData;
                let x = this.labelValue.split("|");
                console.log(x);
                this.valueOfRequest = {
                    'customerCode': x[0],
                    'virtualAccountNumber': x[1],
                    'transactionAmount': x[2],
                    'utr': x[3],
                    'senderIFSC': x[4],
                    'senderInformation': x[5],
                    'senderAccountNumber': x[6],
                    'senderName': x[7],
                    'paymentMode': x[8],
                    'customerAccountNumber': x[9],
                    'transactionDate': x[10],
                    'sourceSatus': x[11],
                    'senderBankName': x[12],
                    'currency': x[13]
                }
                var dataForSIT = {
                    //  'URL':urlName,
                    //  'serviceName': this.serviceDetails[0].serviceName,
                    //  'clientCode':this.clientCode,
                    //  'method':'POST'

                    "URL": "http://13.127.90.153:3200/api/users/validateUser",
                    "method": "post",
                    "reqBody": {
                        "vid": "ADANJUPI00014"
                    }

                }
                console.log("Data For SIT ", dataForSIT);
                this.appService.postSitData(dataForSIT).then(data => {
                    console.log(" SIT Data Response ", data);
                    this.responseMessage = data.message;
                    this.valueOfUAT = false;
                    // if(data === 'SUCCESS'){
                    // this.valueOfUAT=false;
                    // }
                    // else{
                    // this.valueOfUAT=true;
                    // }
                });
            });
        });
    }

    callSITMethods() {
        // this.SITinterval = setInterval(() => this.getAuditTrailByIdForSIT(), 3000);
        // var test = setInterval(() => this.getAuditTrailByIdForSIT(), 3000);
        // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ",test);
    }
    callUATMethods() {
        // this.UATinterval = setInterval(() => this.getAuditTrailByIdForUAT(), 3000);
    }
    callPRODMethods() {
        // this.PRODinterval = setInterval(
        // () => this.getAuditTrailByIdForPROD(),
        // 3000
        // );
    }

    callLiveMethods() {
        this.Liveinterval = setInterval(
            () => this.getAuditTrailByIdForLive(),
            3000
        );
        // var test = setInterval(() => this.getAuditTrailByIdForSIT(), 3000);
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ", this.Liveinterval);
        // this.Liveinterval = 0;
        // clearInterval(this.Liveinterval);
    }
    /**
    * @author Sanchita
    * @description This function will be used to get audit trail data
    */
    getDataOnPage() {
        this.appService.getProjectById(this.projectId).then(data => {
            this.projectData = data;
            for (var i = 0; i < this.projectData.length; i++) {
                if (this.projectId === this.projectData[i].projectId) {
                    this.projectInformation = this.projectData[i];

                    // this.appService.getAuditTrailById(this.projectId).then(data => {
                    // this.auditTrailData = data;
                    // console.log(this.auditTrailData);
                    // });
                }
            }
        });
    }


    nextTab(tabName) {
        this.exp = tabName
    }



    // spliteLogic(data) {
    //     this.SITDATA = null;
    //     this.UATDATA = null;
    //     this.PRODDATA = null;
    //     for (var i = 0; i <= data.length; i++) {
    //         if (this.auditTrailTest[i].event != null) {
    //             if (
    //                 this.auditTrailTest[i].event.split("-")[1] == "SIT" &&
    //                 this.auditTrailTest[i].event.split("-")[0] != "Ready for Deployment"
    //             ) {
    //                 this.SITDATA.push(this.auditTrailTest[i]);
    //             } else if (
    //                 this.auditTrailTest[i].event.split("-")[1] == "UAT" &&
    //                 this.auditTrailTest[i].event.split("-")[0] != "Ready for Deployment"
    //             ) {
    //                 this.UATDATA.push(this.auditTrailTest[i]);
    //             } else if (
    //                 this.auditTrailTest[i].event.split("-")[1] == "PROD" &&
    //                 this.auditTrailTest[i].event.split("-")[0] != "Ready for Deployment"
    //             ) {
    //                 this.PRODDATA.push(this.auditTrailTest[i]);
    //             }
    //         }
    //     }
    //     localStorage.setItem("prodData", JSON.stringify(this.PRODDATA));
    // }
    getAuditTrailByIdForSIT() {
        // console.log("sit function callled");
        // if (this.stopRequest == false) {
        // console.log("stopRequest", this.stopRequest);

        this.appService.getAuditTrailById(this.projectId).then(data => {
            // console.log("data inside SIT mapping", data);
            for (var i = 0; i < data.length; i++) {
                if (
                    (data[i].event == "code_checked_out-SIT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "application_deployment_unit_created-SIT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event ==
                        "application_deployment_unit_configuration_updated-SIT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "application_proxy_deployed-SIT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "application_deployed-SIT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "test_data_prepared-SIT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "test_data_deployed-SIT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "running_tests-SIT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "test_run_completed-SIT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "recording_test_results-SIT" &&
                        data[i].status == "FAILED")
                ) {
                    // console.log("interval cleared");
                    clearInterval(this.SITinterval);
                } else {
                    if (data[i].event == "Initiate UAT") {
                        this.callUATMethods();
                    } else {
                        this.auditTrailData = data;
                    }
                }
            }
            // console.log(this.auditTrailData);
        });
        // }
    }

    getAuditTrailByIdForLive() {
        // console.log("live function called");
        this.appService.getAuditTrailById(this.projectId).then(data => {
            console.log("data inside SIT mapping", data.length);
            this.LiveAuditTrailData = [];


            for (var i = 0; i < data.length; i++) {
                if (
                    (data[i].event == "code_checked_out-PROD" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "application_deployment_unit_created-PROD" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "code_checked_out-PROD" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "application_deployment_unit_created-PROD" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "application_deployed-PROD" &&
                        data[i].status == "FAILED")
                ) {
                    // console.log("interval cleared inside devops failed");
                    clearInterval(this.SITinterval);
                    this.LiveAuditTrailData.push(data[i]);
                    console.log("----------", this.LiveAuditTrailData);
                } else {
                    // console.log("inside else condition of UAT");
                    if (data[i].event != null && data[i].event.split("-")[1] == "PROD") {
                        if (
                            data[i].event == "code_checked_out" &&
                            data[i].status == "SUCCESS"
                        ) {
                            // console.log("last step of UAT");
                            this.timestamp = data[i];
                            // console.log("interval ", i);
                            this.LiveAuditTrailData.push(data[i]);

                            var filteredArray = this.LiveAuditTrailData.filter(function (item, pos) {
                                return this.LiveAuditTrailData.indexOf(item) == pos;
                            });

                            console.log("--------", filteredArray);
                            console.log("this.-------->", this.LiveAuditTrailData);
                            if (data[i].event == "application_deployed-PROD" &&
                                data[i].status == "SUCCESS") {
                                // this.LiveAuditTrailData.push({projectId: this.projectId, status: "SUCCESS", event: "code_check_out", createdBy: "NA", orgName: "NA", timeStamp: this.timestamp})
                                // this.LiveAuditTrailData.push({ projectId: this.projectId, status: "SUCCESS", event: "application_proxy_deployed", createdBy: "NA", orgName: "NA", timeStamp: data[i].timeStamp })
                                // this.LiveAuditTrailData.push({ projectId: this.projectId, status: "SUCCESS", event: "application_Deployment_Unit_Configuration_Updated", createdBy: "NA", orgName: "NA", timeStamp: data[i].timeStamp })
                                if (data[i].event == "application_deployed-PROD" && data[i].status == "SUCCESS") {
                                    // this.LiveAuditTrailData.push({ projectId: this.projectId, status: "SUCCESS", event: "test_Data_Prepared", createdBy: "NA", orgName: "NA", timeStamp: this.timestamp })
                                    // this.LiveAuditTrailData.push({ projectId: this.projectId, status: "SUCCESS", event: "test_Data_Deployed", createdBy: "NA", orgName: "NA", timeStamp: this.timestamp })
                                    // this.LiveAuditTrailData.push({ projectId: this.projectId, status: "SUCCESS", event: "running_Tests", createdBy: "NA", orgName: "NA", timeStamp: this.timestamp })
                                    // this.LiveAuditTrailData.push({ projectId: this.projectId, status: "SUCCESS", event: "test_Run_Completed", createdBy: "NA", orgName: "NA", timeStamp: this.timestamp })
                                    // this.LiveAuditTrailData.push({ projectId: this.projectId, status: "SUCCESS", event: "recording_Test_Results", createdBy: "NA", orgName: "NA", timeStamp: this.timestamp })

                                    // this.lastData=this.LiveAuditTrailData[9].status;
                                    // console.log("this.lastData",this.lastData);
                                    // this.Liveinterval = 0;
                                    console.log("STOP LIVE INTERVAL >>>> ", this.Liveinterval);
                                    clearInterval(this.Liveinterval);
                                    console.log("STOP LIVE INTERVAL >>>>-- ", this.Liveinterval);

                                }
                                else {
                                    this.displayInitiateSITButton = true;
                                    // this.LiveAuditTrailData.push({ projectId: this.projectId, status: "FAILED", event: "test_Data_Prepared", createdBy: "NA", orgName: "NA", timeStamp: this.timestamp })
                                    // this.LiveAuditTrailData.push({ projectId: this.projectId, status: "FAILED", event: "test_Data_Deployed", createdBy: "NA", orgName: "NA", timeStamp: this.timestamp })
                                    // this.LiveAuditTrailData.push({ projectId: this.projectId, status: "FAILED", event: "test_Run_Completed", createdBy: "NA", orgName: "NA", timeStamp: this.timestamp })
                                    // this.LiveAuditTrailData.push({ projectId: this.projectId, status: "FAILED", event: "recording_Test_Results", createdBy: "NA", orgName: "NA", timeStamp: this.timestamp })
                                }
                            }
                            else {

                                console.log("INSIDE THIS ELSE")
                                // this.LiveAuditTrailData.push({ projectId: this.projectId, status: "FAILED", event: "application_proxy_deployed", createdBy: "NA", orgName: "NA", timeStamp: data[i].timeStamp })
                                // this.LiveAuditTrailData.push({ projectId: this.projectId, status: "FAILED", event: "application_Deployment_Unit_Configuration_Updated", createdBy: "NA", orgName: "NA", timeStamp: data[i].timeStamp })

                                console.log("STOP LIVE INTERVAL >>>> ", this.Liveinterval);
                                clearInterval(this.Liveinterval);
                                console.log("STOP LIVE INTERVAL >>>>-- ", this.Liveinterval);
                            }


                            break;
                            // console.log("clear interval --->",this.LiveAuditTrailData);
                        } else {
                            this.LiveAuditTrailData.push(data[i]);

                        }

                    }
                }
            }

            console.log(this.LiveAuditTrailData);
        });

        // }
    }










    goToUat() {
        // console.log("this.lastname",this.lastData);
        if (this.lastData == "SUCCESS") {
            var confirmData = confirm("SIT Successful ! Do you want to proceed with UAT?")
        }
    }
    getAuditTrailByIdForUAT() {
        // console.log("uat function callled");
        // if (this.stopRequest == false) {
        // console.log("stopRequest", this.stopRequest);

        this.appService.getAuditTrailById(this.projectId).then(data => {
            for (var i = 0; i < data.length; i++) {
                if (
                    (data[i].event == "code_checked_out-UAT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "application_deployment_unit_created-UAT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event ==
                        "application_deployment_unit_configuration_updated-UAT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "application_proxy_deployed-UAT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "application_deployed-UAT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "test_data_prepared-UAT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "test_data_deployed-UAT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "running_tests-UAT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "test_run_completed-UAT" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "recording_test_results-UAT" &&
                        data[i].status == "FAILED")
                ) {
                    clearInterval(this.UATinterval);
                } else {
                    if (data[i].event == "Initiate PROD") {
                        this.callPRODMethods();
                    } else {
                        this.auditTrailData = data;
                    }
                }
            }
            // }
            // console.log(this.auditTrailData);
        });
        // }
    }

    getAuditTrailByIdForPROD() {
        // console.log("prod function callled");
        // if (this.stopRequest == false) {
        // console.log("stopRequest", this.stopRequest);

        this.appService.getAuditTrailById(this.projectId).then(data => {
            for (var i = 0; i < data.length; i++) {
                if (
                    (data[i].event == "code_checked_out-PROD" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "application_deployment_unit_created-PROD" &&
                        data[i].status == "FAILED") ||
                    (data[i].event ==
                        "application_deployment_unit_configuration_updated-PROD" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "application_proxy_deployed-PROD" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "application_deployed-PROD" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "test_data_prepared-PROD" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "test_data_deployed-PROD" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "running_tests-PROD" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "test_run_completed-PROD" &&
                        data[i].status == "FAILED") ||
                    (data[i].event == "recording_test_results-PROD" &&
                        data[i].status == "FAILED")
                ) {
                    clearInterval(this.PRODinterval);
                } else {
                    if (data[i].event == "Initiate PROD") {
                        this.callPRODMethods();
                    } else {
                        this.auditTrailData = data;
                    }
                }
            }
            // }
            // console.log(this.auditTrailData);
        });
        // }
    }

    ngOnDestroy() {
        // console.log("destroy function called");
        this.stopRequest = true;
    }

    toggleNavbar() { }
    ngAfterViewInit() {
        // console.log(this.tabSet);
    }
    increaseShow() {
        this.show += 10;
    }

    decreaseShow() {
        this.show -= 10;
    }

    initiatesSIT() {
        var data = {
            projectId: this.dataOfUser[0].projectId,
            clientCode: this.clientCode,
            productName: this.dataOfUser[0].productName,
            serviceName: this.dataOfUser[0].serviceName,
            username: this.dataOfUser[0].username,
            orgName: this.dataOfUser[0].orgName
        };
        // console.log("data", data);

        this.appService.initiateSIT(data).then(data => {
            // console.log("data", data);
            if (data) {
                // console.log("SIT Initiate result", data);
                alert("Certified Successfully Completed!!");
                this.hideShow = "true";
                // this.tabSet.toggle('uat');
            }
        });
    }
    initiatesUAT() {
        console.log("this.dataOfUser------", this.dataOfUser);
        var data = {
            projectId: this.dataOfUser[0].projectId,
            clientCode: this.clientCode,
            productName: this.dataOfUser[0].productName,
            serviceName: this.dataOfUser[0].serviceName,
            username: this.dataOfUser[0].username,
            orgName: this.dataOfUser[0].orgName
        };
        console.log("data------>", data);
        this.appService.postUAT(data).then(data => {
            console.log("data", data);
        })
        this.callLiveMethods();
        setTimeout(()=>{
            this.LiveAuditTrailUATData.push(
                {"status":"SUCCESS"},
               ) 
          },1000);
          setTimeout(()=>{
            this.LiveAuditTrailUATData.push(
                {"status":"SUCCESS"},
               ) 
          },2000);
          setTimeout(()=>{
            this.LiveAuditTrailUATData.push(
                {"status":"SUCCESS"},
               ) 
          },3000);
          setTimeout(()=>{
            this.LiveAuditTrailUATData.push(
                {"status":"SUCCESS"},
               ) 
          },4000);
          setTimeout(()=>{
            this.LiveAuditTrailUATData.push(
                {"status":"SUCCESS"},
               ) 
          },6000);
          setTimeout(()=>{
            this.LiveAuditTrailUATData.push(
                {"status":"SUCCESS"},
               
               ) 
          },7000);
          setTimeout(()=>{
            this.LiveAuditTrailUATData.push(
                {"status":"SUCCESS"},
               ) 
          },8000);
          setTimeout(()=>{
            this.LiveAuditTrailUATData.push(
                {"status":"SUCCESS"},
               ) 
          },9000);
          setTimeout(()=>{
            this.LiveAuditTrailUATData.push(
                {"status":"SUCCESS"},
               ) 
          },10000);
          setTimeout(()=>{
            this.LiveAuditTrailUATData.push(
                {"status":"SUCCESS"},
               ) 
               console.log("this.LiveAuditTrailUATData",this.LiveAuditTrailUATData.length)
               if(this.LiveAuditTrailUATData[9].status==="SUCCESS"){
                   this.UatProgress=false
                   
               }
            //    localStorage.setItem('LiveAuditTrailUATData',this.LiveAuditTrailData);
          },11000);
         
        //   {"status":"SUCCESS"},
        //   {"status":"SUCCESS"},
        //   {"status":"SUCCESS"},
        //   {"status":"SUCCESS"},
        //   {"status":"SUCCESS"},
        //   {"status":"SUCCESS"},
        //   {"status":"SUCCESS"},
        //   {"status":"SUCCESS"},
        //   {"status":"SUCCESS"}
        
        // this.LiveAuditTrailUATData=this.LiveAuditTrailData;
        // console.log("----------------------",this.LiveAuditTrailData);
        // var data = {
        // projectId: this.dataOfUser[0].projectId,
        // clientCode: this.clientCode,
        // productName: this.dataOfUser[0].productName,
        // serviceName: this.dataOfUser[0].serviceName,
        // username: this.dataOfUser[0].username,
        // orgName: this.dataOfUser[0].orgName
        // };
        // console.log("data---->",data);
        // console.log("UAT request initiate -> ", data);

        // this.message = "IN PROGRESS";

        // alert("UAT Test Cases has been Initiated.");

        // this.UatInitiated = true;
        // this.appService.initiateUAT(this.projectId).then(data => {
        // // console.log("Result of initate UAT -> ", data);
        // if (data) {
        // this.UatProgress = false;
        // this.message = "Done";
        // }

        // })
        // this.finalStatus=false
        // setTimeout(() => {
        // this.UatProgress = false;
        // this.message = "Done";
        // }, 5000);
        // this.appService.initiateUAT(data).then(data=>{
        // console.log("data",data)
        // })

        // console.log(this.initiateUATFlag);
    }
}