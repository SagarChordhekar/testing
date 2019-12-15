import {
  Component,
  OnInit
} from "@angular/core";
import {
  MyProfileService
} from "./profile.service";
import {
  ActivatedRoute, NavigationExtras
} from "@angular/router"; // ActivatedRoue is used to get the current associated components information.

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Router
} from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  ReactiveFormsModule
} from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  getAppResponse;
  queryparamProjectId: any;
  error: String;
  getAuditTrailResponse; //property declared for audit trail output binding
  timeLine: any = [];
  timeLineFinalArray: any; //This property is used for final time line display
  show = 2;
  hide = 2;
  dataValue;
  appResponseData = [];
  dataValueServices;
  serviceResponseData = [];
  userData;
  dataOfUser;
  username: any;
  organisationName: any;
  public navbarOpen: boolean;
  enableTransactionReversalFileProcessing: boolean;

  stopRequest: boolean = false;
  testingTab = false;
  initiateUATFlag: any = "false";
  activeTabName = 'tab2'
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
  datta: string;
  appData: any;
  descriptionValue: any;
  featureName: any;
  displayActivities: any[] = [{
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
  {
    activity: "DevOps: Running Tests",
    status: "code_checked_out FAILED"
  },
  {
    activity: "DevOps: Test Run Completed",
    status: "code_checked_out FAILED"
  },
  {
    activity: "DevOps: Recording Test Results",
    status: "code_checked_out FAILED"
  }
  ];
  communicationProtocolArray = [{
    name: "HTTP",
    value: "HTTP"
},
{
    name: "HTTPS",
    value: "HTTPS"
}
];
disableInput: any = true;
  serviceNameOfUser: any;
  clientCodeIPS: string;
  clientCode: string;
  clientCodeProfunds: string;
  readyForProductionFlag: string;
  showButton: boolean;
  summaryServiceName: any;
  valueD: any;
  updateProductionData:FormGroup;
  updateProductionDataiSurePay:FormGroup;
  prodFile1: any;
  prodFile2: any;
  dataOfProduction:any;
  prodFileName1: any;
  prodFileName2: any;
  httpCertificate: any;
  httpCertificatName: any;
  constructor(
    private myProfileService: MyProfileService,
    private router: Router,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.actRoute.queryParams.subscribe(params => {
      this.queryparamProjectId = params['projectId'];
      //   console.log("Project id fromQuery params using ActivatedRoute ->", this.queryparamProjectId);
      localStorage.setItem("projectId", this.queryparamProjectId);
    });

  }

  ngOnInit() {
    this.updateProductionData=this.fb.group({
      'hostNameProd':[],
      'prodIp':[],
      'prodPort':['443'],
      'serviceTimeOutProd1':[],
      'serviceUrlProd1':[],
      'serviceNameProd1':[],
      'httpCertificate':[],
      'prodFile1':[],
      'serviceTimeOutProd2':[],
      'serviceUrlProd2':[],
      'serviceNameProd2':[],
      'prodFile2':[]
    })
    this.updateProductionDataiSurePay =this.fb.group({
      'hostNameProd':[],
      'prodIp':[],
      'prodPort':['443'],
      'serviceTimeOutProd1':[],
      'serviceUrlProd1':[],
      'httpCertificate':[],
      'serviceNameProd1':[],
      'prodFile1':[],
      'serviceTimeOutProd2':[],
      'serviceUrlProd2':[],
      'serviceNameProd2':[],
      'prodFile2':[]
    })
    
    // changes made by sanchita
    this.readyForProductionFlag = localStorage.getItem("status");
    console.log("status--------", this.readyForProductionFlag);
    if (this.readyForProductionFlag == 'true') {
      this.showButton = true;

    }
    else {
      this.showButton = false;

    }

    var tabId = this.displayActivities[3].status.split("_").pop();
    this.stopRequest = false;
    //   console.log("Tab id ->", tabId);
    this.userData = localStorage.getItem("dataofUser");
    this.dataOfUser = JSON.parse(this.userData);
  
    this.serviceNameOfUser = this.dataOfUser[0].serviceName;
    this.enableTransactionReversalFileProcessing = this.dataOfUser[0].enableTransactionReversalFileProcessing
    this.clientCodeIPS = this.dataOfUser[0].clientCodeIPS;

    this.clientCodeProfunds = this.dataOfUser[0].clientCodeProfund;
    if (this.clientCodeIPS != "") {
      this.clientCode = this.clientCodeIPS;
    }
    else if (this.clientCodeProfunds != "") {
      this.clientCode = this.clientCodeProfunds;
    }

    localStorage.setItem("clientCode", this.clientCode);
 
    this.myProfileService.getApp(this.queryparamProjectId).then(async data => {
      this.getAppResponse = data;

      for (var i = 0; i < this.getAppResponse.length; i++) {
        if (
          this.dataOfUser[0].organisation === this.getAppResponse[i].orgName
        ) {
             for (var j = 0; j < this.getAppResponse[i].products.length; j++) {
            var productId = this.getAppResponse[i].products[0].productId;

            this.myProfileService.getProductById(productId).then(data => {
              this.dataValue = data;
              this.featureName = this.dataValue[0].serviceName;
              this.appResponseData.push(this.dataValue[0]);
              this.descriptionValue = this.dataValue[0].description;
            });
          }
        }
      }
      for (var i = 0; i < this.getAppResponse.length; i++) {
        for (
          var j = 0; j < this.getAppResponse[i].products[0].services.length; j++
        ) {
          var serviceId = this.getAppResponse[i].products[0].services[0]
            .serviceId;
            if (
            this.dataOfUser[0].organisation === this.getAppResponse[i].orgName
          ) {
            this.myProfileService.getServiceById(serviceId).then(data => {
              this.dataValueServices = data;
              this.serviceResponseData.push(this.dataValueServices[0]);
            });
          }
        }
      }

    });
    this.myProfileService.getAuditTrailByProjectId(this.queryparamProjectId).then(async data => {
      let lengthOfauditTrail = data.length;
      this.getAuditTrailResponse = data;
 
      for (let t = 0; t < lengthOfauditTrail; t++) {
         if (this.getAuditTrailResponse[t].status == "Draft") {
          let prepareTimeLineObject = [{
            "orgName": this.getAuditTrailResponse[t].orgName,
            "projectId": this.getAuditTrailResponse[t].projectId,
            "status": "API Specifications Uploaded",
            "timeStamp": this.getAuditTrailResponse[t].timeStamp
          },
          {
            "orgName": this.getAuditTrailResponse[t].orgName,
            "projectId": this.getAuditTrailResponse[t].projectId,
            "status": "Subscription Request Raised",
            "timeStamp": this.getAuditTrailResponse[t].timeStamp
          },
          {
            "orgName": this.getAuditTrailResponse[t].orgName,
            "projectId": this.getAuditTrailResponse[t].projectId,
            "status": "Subscription Request Approved",
            "timeStamp": this.getAuditTrailResponse[t].timeStamp
          },
          {
            "orgName": this.getAuditTrailResponse[t].orgName,
            "projectId": this.getAuditTrailResponse[t].projectId,
            "status": "Draft Project Created",
            "timeStamp": this.getAuditTrailResponse[t].timeStamp
          }
          ]
          await this.timeLine.push(prepareTimeLineObject);
            break;
        } else {
          let errorForTimeLine = {
            "orgName": this.getAuditTrailResponse[t].orgName,
            "projectId": this.getAuditTrailResponse[t].projectId,
            "status": "No status updated",

          }
          await this.timeLine.push(errorForTimeLine);
          break;
         }

      }
      for (let t = 0; t < lengthOfauditTrail; t++) {
         if (this.getAuditTrailResponse[t].status == "Ready for Transformation") {
           let prepareTimeLineObject2 = {
            "orgName": this.getAuditTrailResponse[t].orgName,
            "projectId": this.getAuditTrailResponse[t].projectId,
            "status": "Ready for Transformation",
            "timeStamp": this.getAuditTrailResponse[t].timeStamp
          }
          await this.timeLine[0].push(prepareTimeLineObject2);
           this.timeLineFinalArray = this.timeLine[0];
          break;
        }

      }
      for (let t = 0; t < lengthOfauditTrail; t++) {
 
        if (this.getAuditTrailResponse[t].status == "Ready for Deployment-SIT") {
          let prepareTimeLineObject2 = {
            "orgName": this.getAuditTrailResponse[t].orgName,
            "projectId": this.getAuditTrailResponse[t].projectId,
            "status": "Ready for Deployment-SIT",
            "timeStamp": this.getAuditTrailResponse[t].timeStamp
          }
          await this.timeLine[0].push(prepareTimeLineObject2);
           this.timeLineFinalArray = this.timeLine[0];
           break;
        }

      }
      for (let t = 0; t < lengthOfauditTrail; t++) {
  
        if (this.getAuditTrailResponse[t].status == "Ready for Deployment-UAT") {
          let prepareTimeLineObject2 = {
            "orgName": this.getAuditTrailResponse[t].orgName,
            "projectId": this.getAuditTrailResponse[t].projectId,
            "status": "Ready for Deployment-SIT",
            "timeStamp": this.getAuditTrailResponse[t].timeStamp
          }
          await this.timeLine[0].push(prepareTimeLineObject2);
          this.timeLineFinalArray = this.timeLine[0];
          break;
        }

      }

      for (let t = 0; t < lengthOfauditTrail; t++) {
   
        if (this.getAuditTrailResponse[t].status == "Ready for Production Request Initiated") {
          let prepareTimeLineObject2 = {
            "orgName": this.getAuditTrailResponse[t].orgName,
            "projectId": this.getAuditTrailResponse[t].projectId,
            "status": "Ready for Production Request Initiated",
            "timeStamp": this.getAuditTrailResponse[t].timeStamp
          }
          await this.timeLine[0].push(prepareTimeLineObject2);
          this.timeLineFinalArray = this.timeLine[0];
          break;
        }

      }
      for (let t = 0; t < lengthOfauditTrail; t++) {
   
        if (this.getAuditTrailResponse[t].status == "  Ready for Production Verified") {
          let prepareTimeLineObject2 = {
            "orgName": this.getAuditTrailResponse[t].orgName,
            "projectId": this.getAuditTrailResponse[t].projectId,
            "status": "  Ready for Production Verified",
            "timeStamp": this.getAuditTrailResponse[t].timeStamp
          }
          await this.timeLine[0].push(prepareTimeLineObject2);
          this.timeLineFinalArray = this.timeLine[0];
          return true;
        }

      }

    });

  }

  nextTab(msg) {
    console.log("Next Tab Parent: ", msg)
    this.testingTab = false;
    this.activeTabName = msg
  }

  fetchTabChange(event) {
    console.log("Active Id: ", event.nextId)
    this.activeTabName = event.nextId
  }

  recentApps = [{
    appName: "App Name",
    version: "Version",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "Active",
    clientCode: "xxxxxxxxxx"
  },
  {
    appName: "App Name",
    version: "Version",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "inActive",
    clientCode: "xxxxxxxxxx"
  },
  {
    appName: "App Name",
    version: "Version",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "Active",
    clientCode: "xxxxxxxxxx"
  },
  {
    appName: "App Name",
    version: "Version",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "inActive",
    clientCode: "xxxxxxxxxx"
  }
  ];

  recentActivity = [{
    date: "MM/DD/YYYY",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis."
  },
  {
    date: "MM/DD/YYYY",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis."
  },
  {
    date: "MM/DD/YYYY",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis."
  },
  {
    date: "MM/DD/YYYY",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero laboriosam dolor perspiciatis omnis exercitationem. Beatae, officia pariatur? Est cum veniam excepturi. Maiores praesentium, porro voluptas suscipit facere rem dicta, debitis."
  }
  ];

  recentServices = [{
    serviceName: "Service Name",
    version: "Version",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: "Active",
    clientCode: "xxxxxxxxxx"
  },
  {
    serviceName: "Service Name",
    version: "Version",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: "Inactive",
    clientCode: "xxxxxxxxxx"
  }
  ];
  mappingPage() {
    this.router.navigate(["/authentication/mapping"]);
  }
  toggleNavbar() {

  }
  goToOverView() {
    this.router.navigate(["/authentication/user-profile"]);
  }
  appPage(data) {
    //   console.log("dtata", data);
    this.appData = JSON.stringify(data);
    localStorage.setItem("appData", this.appData);

    this.router.navigate(['/authentication/userAppDetails']);
  }

  increaseShow() {
    this.show += 1;
  }

  decreaseShow() {
    this.show -= 1;
  }
  editProject( contentForProd) {
    this.modalService.open(contentForProd, { size: 'lg' });
    // this.fileUploadProjectName = data.projectId;
  }
  initiateProd(dataOFModal) {
    if(this.getAppResponse[0].products[0].services[0].hostNameProd == '' ||this.getAppResponse[0].products[0].services[0].prodIp== '' || this.getAppResponse[0].products[0].services[0].prodPort == '' ||  this.getAppResponse[0].products[0].services[0].communicationProtocol == '' || this.getAppResponse[0].products[0].services[0].prodFile1 == '' )
    {
      var id=this.getAppResponse[0].products[0].services[0].serviceId;
      this.myProfileService.getServiceById(id).then((data)=>{
        console.log("data",data);
        this.summaryServiceName=data[0].serviceName;
      })
      var contentForProd=contentForProd;
  this.editProject(dataOFModal);
   }
   else{
     
        this.initiateUATFlag = "true";
      alert("ICICI Bank Implementation Team has been notified.")

     let flagData={
                    "projectId":this.queryparamProjectId,
                    "status": "Ready for Production Request Initiated",
                    "event": null,
                    "username": this.username,
                    "orgName": this.organisationName

                  }
      this.myProfileService.updateProjectData(flagData).then(async data=>{
        console.log("Update data -> ",data)
      })
      this.myProfileService.getApp(this.queryparamProjectId).then(async data => {
      data[0].flag="Ready for prod deployment"
      console.log("Getting application details with flag -> ",data);
    });
   }
  
  }
 
 //changes by sanchita starts




  methodType(value) {
    //   console.log(`method ------${value}`);
      if (value == 'HTTP') {
        this.valueD=value;
                  this.disableInput = true
      } else {
        this.valueD=value;
          this.disableInput = false

      }

  }
  /**
   * @author Sanchtia 
   * @description This function will be used to update the production data of eCollection
   */
  productionDetails(data){
    console.log("data",data);
      
    if(this.summaryServiceName == 'ECollection Intimation' || this.summaryServiceName == 'ECollection with Remitter Validation' || this.summaryServiceName == 'ECollection with Remitter Validation in Intermediary Account')
  {
    if(this.valueD == 'HTTP'){
      this.dataOfProduction={
        'hostNameProd':data.hostNameProd,
        'prodIp':data.prodIp,
        'prodPort':data.prodPort,
        'serviceTimeOutProd1':data.serviceTimeOutProd1,
        'serviceUrlProd1':data.serviceUrlProd1,
        'communicationProtocol':this.valueD,
        'serviceNameProd1':data.serviceNameProd1,
       'prodFile1':this.prodFileName1
      }     
    }
    else{
      this.dataOfProduction={
        'hostNameProd':data.hostNameProd,
        'prodIp':data.prodIp,
        'prodPort':data.prodPort,
        'serviceTimeOutProd1':data.serviceTimeOutProd1,
        'serviceUrlProd1':data.serviceUrlProd1,
        'communicationProtocol':this.valueD,
        'serviceNameProd1':data.serviceNameProd1,
        'httpCertificate':this.httpCertificatName,
       'prodFile1':this.prodFileName1
      }
      console.log("this.dataOfProduction",this.dataOfProduction);
    }
    console.log("this.dataOfProduction",this.dataOfProduction);
  
    this.getAppResponse[0].products[0].services[0].hostNameProd=this.dataOfProduction.hostNameProd;
    this.getAppResponse[0].products[0].services[0].prodIp=this.dataOfProduction.prodIp;
    this.getAppResponse[0].products[0].services[0].prodPort=this.dataOfProduction.prodPort;
    this.getAppResponse[0].products[0].services[0].serviceNameInputProd=this.dataOfProduction.serviceNameProd1;
    this.getAppResponse[0].products[0].services[0].serviceTimeOutProd=this.dataOfProduction.serviceTimeOutProd1;
    this.getAppResponse[0].products[0].services[0].serviceURLProd= this.dataOfProduction.serviceUrlProd1;
    this.getAppResponse[0].products[0].services[0].prodFile1=this.dataOfProduction.prodFile1;
    this.myProfileService.putProjectData(this.getAppResponse[0]).then((data)=>{
      console.log("data",data);
      const formData: any = new FormData();
      formData.append('files',this.prodFile1);
      this.myProfileService.uploadFile(this.getAppResponse[0].projectId,formData).then((data)=>{
        console.log("---------",data);
      })

    })
    console.log("this.dataOfProduction---->",  this.getAppResponse);  
    this.modalService.dismissAll();
  }
  else {
    if(this.valueD == 'HTTP'){
      this.dataOfProduction={
        'hostNameProd':data.hostNameProd,
        'prodIp':data.prodIp,
        'prodPort':data.prodPort,
        'serviceTimeOutProd1':data.serviceTimeOutProd1,
        'serviceUrlProd1':data.serviceUrlProd1,
        'serviceNameProd1':data.serviceNameProd1,
        'communicationProtocol':this.valueD,
        'prodFile1':this.prodFileName1,
        'serviceTimeOutProd2':data.serviceTimeOutProd2,
        'serviceUrlProd2':data.serviceUrlProd2,
        'serviceNameProd2':data.serviceNameProd2,
        'prodFile2':this.prodFileName2
      }
      console.log("this.dataOfProduction",this.dataOfProduction);
    
    } 
    else{
      this.dataOfProduction={
        'hostNameProd':data.hostNameProd,
        'prodIp':data.prodIp,
        'prodPort':data.prodPort,
        'serviceTimeOutProd1':data.serviceTimeOutProd1,
        'serviceUrlProd1':data.serviceUrlProd1,
        'serviceNameProd1':data.serviceNameProd1,
        'communicationProtocol':this.valueD,
        'prodFile1':this.prodFileName1,
        'httpCertificate':this.httpCertificatName,
        'serviceTimeOutProd2':data.serviceTimeOutProd2,
        'serviceUrlProd2':data.serviceUrlProd2,
        'serviceNameProd2':data.serviceNameProd2,
        'prodFile2':this.prodFileName2
      }
      console.log("this.dataOfProduction",this.dataOfProduction);
    }
    this.getAppResponse[0].products[0].services[0].hostNameProd=this.dataOfProduction.hostNameProd;
    this.getAppResponse[0].products[0].services[0].prodIp=this.dataOfProduction.prodIp;
    this.getAppResponse[0].products[0].services[0].prodPort=this.dataOfProduction.prodPort;
    this.getAppResponse[0].products[0].services[0].serviceTimeOutProd=this.dataOfProduction.serviceTimeOutProd1;
    this.getAppResponse[0].products[0].services[0].serviceNameInputProd=this.dataOfProduction.serviceNameProd1;
    this.getAppResponse[0].products[0].services[0].serviceURLProd= this.dataOfProduction.serviceUrlProd1;
    this.getAppResponse[0].products[0].services[0].prodFile1=this.dataOfProduction.prodFile1;
    this.getAppResponse[0].products[0].services[0].serviceTimeOutProd2=this.dataOfProduction.serviceTimeOutProd2;
    this.getAppResponse[0].products[0].services[0].serviceNameInputProd2=this.dataOfProduction.serviceNameProd2;
    this.getAppResponse[0].products[0].services[0].serviceURLProd2= this.dataOfProduction.serviceUrlProd2;
    this.getAppResponse[0].products[0].services[0].prodFile2=this.dataOfProduction.prodFile2;
    this.myProfileService.putProjectData(this.getAppResponse[0]).then((data)=>{
      console.log("data",data);
      const formData: any = new FormData();
      formData.append('files',this.prodFile1);
      this.myProfileService.uploadFile(this.getAppResponse[0].projectId,formData).then((data)=>{
        console.log("---------",data);
        const formData1: any = new FormData();
        formData1.append('files',this.prodFile2);
        this.myProfileService.uploadFile(this.getAppResponse[0].projectId,formData1).then((data)=>{
          console.log("---------",data);   
        })
      })
    })
    console.log("this.dataOfProduction---->",  this.getAppResponse);  

    this.modalService.dismissAll();
  }
  }
  /**
   * @author Sanchita 
   * @description This function will be used to update the production Data of iSurePay
   */
  productionDetailsiSurePay(data){
    console.log("data",data);
    if(this.valueD == 'HTTP'){
      this.dataOfProduction={
        'hostNameProd':data.hostNameProd,
        'prodIp':data.prodIp,
        'prodPort':data.prodPort,
        'serviceTimeOutProd1':data.serviceTimeOutProd1,
        'serviceUrlProd1':data.serviceUrlProd1,
        'serviceNameProd1':data.serviceNameProd1,
        'communicationProtocol':this.valueD,
        'prodFile1':this.prodFileName1,
        'serviceTimeOutProd2':data.serviceTimeOutProd2,
        'serviceUrlProd2':data.serviceUrlProd2,
        'serviceNameProd2':data.serviceNameProd2,
        'prodFile2':this.prodFileName2
      }
      console.log("this.dataOfProduction",this.dataOfProduction);
    }
    else{
      this.dataOfProduction={
        'hostNameProd':data.hostNameProd,
        'prodIp':data.prodIp,
        'prodPort':data.prodPort,
        'serviceTimeOutProd1':data.serviceTimeOutProd1,
        'serviceUrlProd1':data.serviceUrlProd1,
        'serviceNameProd1':data.serviceNameProd1,
        'communicationProtocol':this.valueD,
        'prodFile1':this.prodFileName1,
        'serviceTimeOutProd2':data.serviceTimeOutProd2,
        'serviceUrlProd2':data.serviceUrlProd2,
        'serviceNameProd2':data.serviceNameProd2,
        'prodFile2':this.prodFileName2,
        'httpCertificate':this.httpCertificatName
      }
      console.log("this.dataOfProduction",this.dataOfProduction);
    }
    this.getAppResponse[0].products[0].services[0].hostNameProd=this.dataOfProduction.hostNameProd;
    this.getAppResponse[0].products[0].services[0].prodIp=this.dataOfProduction.prodIp;
    this.getAppResponse[0].products[0].services[0].prodPort=this.dataOfProduction.prodPort;
    this.getAppResponse[0].products[0].services[0].serviceTimeOutProd=this.dataOfProduction.serviceTimeOutProd1;
    this.getAppResponse[0].products[0].services[0].serviceNameInputProd=this.dataOfProduction.serviceNameProd1;
    this.getAppResponse[0].products[0].services[0].serviceURLProd= this.dataOfProduction.serviceUrlProd1;
    this.getAppResponse[0].products[0].services[0].prodFile1=this.dataOfProduction.prodFile1;
    this.getAppResponse[0].products[0].services[0].serviceTimeOutProd2=this.dataOfProduction.serviceTimeOutProd2;
    this.getAppResponse[0].products[0].services[0].serviceNameInputProd2=this.dataOfProduction.serviceNameProd2;
    this.getAppResponse[0].products[0].services[0].serviceURLProd2= this.dataOfProduction.serviceUrlProd2;
    this.getAppResponse[0].products[0].services[0].prodFile2=this.dataOfProduction.prodFile2;
    this.myProfileService.putProjectData(this.getAppResponse[0]).then((data)=>{
      console.log("data isure",data);
      const formData: any = new FormData();
      formData.append('files',this.prodFile1);
      this.myProfileService.uploadFile(this.getAppResponse[0].projectId,formData).then((data)=>{
        console.log("---------",data);
        const formData1: any = new FormData();
        formData1.append('files',this.prodFile2);
        this.myProfileService.uploadFile(this.getAppResponse[0].projectId,formData1).then((data)=>{
          console.log("---------",data);   
        })
      })
    })
    this.modalService.dismissAll();
  }
  /**
   * @author Sanchita 
   * @description This function to upload File 
   */
  prodUpload1() {
    $(document).ready(function() {
        $("#prodUpload1").trigger("click");
    })
}
/**
   * @author:kuldeep
   * @param:file upload event
   * @description:file name displayed in form field and file stored in prodFile1 variable.
   */
  prodUpload1Uploaded($event) {
    this.prodFile1 = $event.target.files[0];
    this.prodFileName1=$event.target.files[0].name;
     if(this.getAppResponse[0].productName == 'eCollections')
    {
      console.log("prodUpload1Uploaded :", $event.target.files[0].name)
      this.updateProductionData.controls['prodFile1'].setValue($event.target.files[0].name);    
    }
    else if(this.getAppResponse[0].productName == 'iSurePay'){
  this.updateProductionDataiSurePay.controls['prodFile1'].setValue($event.target.files[0].name);
    }
  
}
  /**
   * @author Sanchita 
   * @description This function to upload File 
   */
  prodUpload2() {
    $(document).ready(function() {
        $("#prodUpload2").trigger("click");
    })
}
/**
   * @author:kuldeep
   * @param:file upload event
   * @description:file name displayed in form field and file stored in prodFile1 variable.
   */
  prodUpload2Uploaded($event) {
    this.prodFile2 = $event.target.files[0];
    this.prodFileName2=$event.target.files[0].name;

    if(this.getAppResponse[0].productName == 'eCollections')
    {
 this.updateProductionData.controls['prodFile2'].setValue($event.target.files[0].name);    
    }
    else if(this.getAppResponse[0].productName == 'iSurePay'){
this.updateProductionDataiSurePay.controls['prodFile2'].setValue($event.target.files[0].name);
    }
 
}
httpsProdUpload1(){
  $(document).ready(function() {
    $("#httpsProdUpload1").trigger("click");
})
}
httpsUpload1Uploaded($event){
  this.httpCertificatName = $event.target.files[0];
    this.httpCertificatName=$event.target.files[0].name;

    if(this.getAppResponse[0].productName == 'eCollections')
    {
 this.updateProductionData.controls['httpCertificate'].setValue($event.target.files[0].name);    
    }
    else if(this.getAppResponse[0].productName == 'iSurePay'){
this.updateProductionDataiSurePay.controls['httpCertificate'].setValue($event.target.files[0].name);
    }

}
//changes by sanchita ends
  goToCreateApp() {
    var projectId;
    this.actRoute.queryParams.subscribe(params => {
      projectId = params['projectId'];
      console.log("projectId: ", projectId)
      let navigationExtras: NavigationExtras = {
        queryParams: { 'projectId': projectId }
      };
      this.router.navigate(['/create-app/createApp'], navigationExtras);
    });
  }

}