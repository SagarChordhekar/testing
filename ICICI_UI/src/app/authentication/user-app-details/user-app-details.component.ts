import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { AppDetailsService } from "../app-details/app-details.service";
import { Router } from "@angular/router";
import { MakerDetailsService } from "../maker-details/maker-details.service";
import { config } from "config";
import { UserAppDetailsService} from './user-app-details.service';

@Component({
  selector: "app-user-app-details",
  templateUrl: "./user-app-details.component.html",
  styleUrls: ["./user-app-details.component.css"]
})

export class UserAppDetailsComponent implements OnInit {
  tabSet: NgbTabset;
  public navbarOpen:boolean;
  updateRegisterData: FormGroup;
  dataOfUser: string;
  dataToDisplay;
  dataOfProductToDisplay: any;
  dataOfProduct: any;
  productData: any;
  productImage: string;
  dataOfService: any;
  serviceName: any;
  serviceImage: string;
  productName: string;
  selectedIndex1: any;
  summaryServiceImage: string;
  summaryServiceName: any;
  productvalue: string;
  serviceData: any;
  appData;
  appDetails: string;
  dataToShow: any;
  configURL = config.url;
  uatFile1: any;
  dataOfproject: any;
  productToDisplay: any;
  productId: any;
  serviceId: any;
  emailArray: any[];
  radiodata: any;
  uatFile3: any;
  displayTransactionReversal: any;
  transactionReversal: any;
  fileDataForReversal: { 'file': any; 'fileName': string; };
  uatFile: any;
  readyForProductionFlag;
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
  dataForService;
  radioVal;
  dataForRegister;
  dataForProject;
  projectId: any;
  fileData: any;
  productValue: any;
  hide:any;
  service_name:any;

  constructor(
    private fb: FormBuilder,
    private appservice: AppDetailsService,
    private makerDetailsService: MakerDetailsService,
    private router: Router,
    private  userAppDetailsService: UserAppDetailsService
  ) {}

  ngOnInit() {
    this.readyForProductionFlag=localStorage.getItem("status");
    console.log("ready for production---------",this.readyForProductionFlag);
    this.appDetails = localStorage.getItem("appData");
    this.appData = JSON.parse(this.appDetails);
    this.productName = localStorage.getItem("productName");
    this.serviceName = localStorage.getItem("serviceName");
    console.log("data", this.appData);
    this.serviceData = JSON.parse(this.serviceName);
    this.dataForService = this.serviceData;
    this.dataOfUser = localStorage.getItem("dataofUser");
    this.dataToShow = JSON.parse(this.dataOfUser);
    this.dataToDisplay = this.dataToShow[0];
    this.displayTransactionReversal=this.dataToShow[0].enableTransactionReversalFileProcessing;
    console.log("data1", this.dataToDisplay);

    this.makerDetailsService
      .getProjectDetails(this.dataToDisplay.projectId)
      .then(data => {
        this.dataOfProductToDisplay = data;
        console.log("User app details for servide details -> ", this.dataOfProductToDisplay);
        for (var i = 0; i < this.dataOfProductToDisplay.length; i++) {
          if (
            this.dataOfProductToDisplay[i].projectId ===
            this.dataToDisplay.projectId
          ) {
            this.productToDisplay = this.dataOfProductToDisplay[i];
            //Hide and show Uat file 
            // if(this.productToDisplay.products[0].services[0].uatFile1){
            //   this.hide=false
            // }else{
            //   this.hide=true
            // }
            console.log("Total data in app details", this.productToDisplay);
            console.log("retry attempts property->",   this.productToDisplay.products[0].services[0].uatFile1);
            this.productId = this.dataOfProductToDisplay[
              i
            ].products[0].productId;
            this.serviceId = this.dataOfProductToDisplay[
              i
            ].products[0].services[0].serviceId;
            console.log("serviceId", this.serviceId);
            this.makerDetailsService
              .getProductDetails(this.productId)
              .then(data => {
                this.dataOfProduct = data;
                console.log("this.dataOfProduct", data);
                this.productData = this.dataOfProduct[0].productName;
                this.productImage =
                  config.url + "Images/Products/" + data[0].fileName;
                console.log("---------------", this.serviceId);
                this.makerDetailsService
                  .getServiceDetails(this.serviceId)
                  .then(data => {
                    this.dataOfService = data;
                    console.log("-----------------", this.dataOfService);
                    this.serviceName = data[0].serviceName;
                    this.serviceImage =
                      config.url + "Images/Services/" + data[0].fileName;
                  });
              });
          } else {
            console.log("let it go");
          }
        }

        // this.makerDetailsService
        //   .getProductDetails(
        //     this.dataOfProductToDisplay[0].products[0].productId
        //   )
        //   .then(data => {
        //     this.dataOfProduct = data;

        //     this.productData = this.dataOfProduct[0].productName;
        //     this.productImage =
        //       this.configURL +
        //       "Images/Products/" +
        //       this.dataOfProduct[0].fileName;
        //   });
        this.makerDetailsService
          .getServiceDetails(
            this.dataOfProductToDisplay[0].products[0].services[0].serviceId
          )
          .then(data => {
            this.dataOfService = data;
            this.serviceName = this.dataOfService[0].serviceName;

            this.serviceImage =
              this.configURL +
              "Images/Services/" +
              this.dataOfService[0].fileName;
          });
        if (
          this.productToDisplay.products[0].services[0].ackReciept !==
          "undefined"
        ) {
          // this.emailArray = this.productToDisplay.products[0].services[0].emails;
          // if (this.emailArray.length > 0) {
          //   for (var k = 0; k < this.emailArray.length; k++) {
          //     (<FormArray>this.updateRegisterData.get("emails")).push(
          //       this.setInsertedEmails(this.emailArray[k].email)
          //     );
          //   }
          // }
          console.log("check inside user register object->",this.updateRegisterData);
          console.log("this.dataToDisplay.organization:", this.dataToDisplay);

          //Compare service name and show browse to upload
          this.service_name=this.dataToDisplay.serviceName;
          console.log("Service name -->",this.service_name);
          this.updateRegisterData.controls["firstName"].setValue(
            this.dataToDisplay.firstName
          );
          this.updateRegisterData.controls["lastName"].setValue(
            this.dataToDisplay.lastName
          );
          this.updateRegisterData.controls["organization"].setValue(
            this.dataToDisplay.organisation
          );
          this.updateRegisterData.controls["email"].setValue(
            this.dataToDisplay.email
          );
          this.updateRegisterData.controls["username"].setValue(
            this.dataToDisplay.username
          );
          this.updateRegisterData.controls["phoneNumber"].setValue(
            this.dataToDisplay["phoneNumber"]
          );
          this.updateRegisterData.controls["bankAccountNumber"].setValue(
            this.dataToDisplay.bankAccountNumber
          );
          this.updateRegisterData.controls["poolAccountNumber"].setValue(
            this.dataToDisplay.poolAccountNumber
          );
          this.updateRegisterData.controls["webServiceType"].setValue(
            this.productToDisplay.products[0].services[0].webServiceType
          );
          // changes by sanchita
          this.updateRegisterData.controls["communicationProtocol"].setValue(
            this.productToDisplay.products[0].services[0].communicationProtocol
          );
          

          this.updateRegisterData.controls["encryptionMethod"].setValue(
            this.productToDisplay.products[0].services[0].encryptionMethod
          );
          this.updateRegisterData.controls["uatPort"].setValue(
            this.productToDisplay.products[0].services[0].uatPort
          );
          this.updateRegisterData.controls["uatIp"].setValue(
            this.productToDisplay.products[0].services[0].uatIp
          );
          // this.updateRegisterData.controls["hostNameUat"].setValue(
          //   this.productToDisplay.products[0].services[0].hostNameUat
          // );
          // this.updateRegisterData.controls["hostNameProd"].setValue(
          //   this.productToDisplay.products[0].services[0].hostNameProd
          // );
          this.updateRegisterData.controls["uatPassword"].setValue(
            this.productToDisplay.products[0].services[0].uatPassword
          );
          this.updateRegisterData.controls["uatFile1"].setValue(
            this.productToDisplay.products[0].services[0].uatFile1
          );
          this.updateRegisterData.controls["uatFile2"].setValue(
            this.productToDisplay.products[0].services[0].uatFile2
          );
          this.updateRegisterData.controls["uatFile3"].setValue(
            this.productToDisplay.products[0].services[0].uatFile3
          );
          this.updateRegisterData.controls["prodIp"].setValue(
            this.productToDisplay.products[0].services[0].prodIp
          );
          this.updateRegisterData.controls["communicationProtocol"].setValue(
            this.productToDisplay.products[0].services[0].communicationProtocol
          );
           // Change
          //  this.updateRegisterData.controls["serviceNameInputUAT"].setValue(
          //   this.productToDisplay.products[0].services[0].serviceNameInputUAT
          // );
          // change
          this.updateRegisterData.controls["prodPort"].setValue(
            this.productToDisplay.products[0].services[0].prodPort
          );
          this.updateRegisterData.controls["prodPassword"].setValue(
            this.productToDisplay.products[0].services[0].prodPassword
          );
          this.updateRegisterData.controls["prodSecret"].setValue(
            this.productToDisplay.products[0].services[0].prodSecret
          );
          this.updateRegisterData.controls["prodUsername"].setValue(
            this.productToDisplay.products[0].services[0].prodUsername
          );
          this.updateRegisterData.controls["prodFile1"].setValue(
            this.productToDisplay.products[0].services[0].prodFile1
          );
          this.updateRegisterData.controls["retryAttempts"].setValue(
            this.productToDisplay.products[0].services[0].retryAttempts
          );
          this.updateRegisterData.controls["actionOnNoRes"].setValue(
            this.productToDisplay.products[0].services[0].actionOnNoRes
          );
          this.updateRegisterData.controls["firstNameBusinessSpoc"].setValue(
            this.dataToDisplay.firstNameBusinessSpoc
          );
          this.updateRegisterData.controls["lastNameBusinessSpoc"].setValue(
            this.dataToDisplay.lastNameBusinessSpoc
          );
          this.updateRegisterData.controls["mobileNumberBusinessSpoc"].setValue(
            this.dataToDisplay.mobileNumberBusinessSpoc
          );
          this.updateRegisterData.controls["emailIdBusinessSpoc"].setValue(
            this.dataToDisplay.emailIdBusinessSpoc
          );
          this.updateRegisterData.controls["firstNameITSpoc"].setValue(
            this.dataToDisplay.firstNameITSpoc
          );
          this.updateRegisterData.controls["lastNameITSpoc"].setValue(
            this.dataToDisplay.lastNameITSpoc
          );
          this.updateRegisterData.controls["mobileNumberITSpoc"].setValue(
            this.dataToDisplay.mobileNumberITSpoc
          );
          this.updateRegisterData.controls["emailIdITSpoc"].setValue(
            this.dataToDisplay.emailIdITSpoc
          );
        } else {
          this.updateRegisterData.controls["firstName"].setValue(
            this.dataToDisplay.firstName
          );
          this.updateRegisterData.controls["lastName"].setValue(
            this.dataToDisplay.lastName
          );
          this.updateRegisterData.controls["organization"].setValue(
            this.dataToDisplay.organization
          );
          this.updateRegisterData.controls["email"].setValue(
            this.dataToDisplay.email
          );
          this.updateRegisterData.controls["username"].setValue(
            this.dataToDisplay.username
          );
          this.updateRegisterData.controls["phoneNumber"].setValue(
            this.dataToDisplay.phoneNumber
          );
          this.updateRegisterData.controls["bankAccountNumber"].setValue(
            this.dataToDisplay.bankAccountNumber
          );
          this.updateRegisterData.controls["poolAccountNumber"].setValue(
            this.dataToDisplay.poolAccountNumber
          );
          this.updateRegisterData.controls["webServiceType"].setValue(
            this.productToDisplay.products[0].services[0].webServiceType
          );
          this.updateRegisterData.controls["communicationProtocol"].setValue(
            this.productToDisplay.products[0].services[0].communicationProtocol
          );
          this.updateRegisterData.controls["messageFormat"].setValue(
            this.productToDisplay.products[0].services[0].messageFormat
          );
          this.updateRegisterData.controls["emails"].setValue(
            this.productToDisplay.products[0].services[0].emails
          );
          this.updateRegisterData.controls["encryptionMethod"].setValue(
            this.productToDisplay.products[0].services[0].encryptionMethod
          );
          this.updateRegisterData.controls["uatPort"].setValue(
            this.productToDisplay.products[0].services[0].uatPort
          );
          this.updateRegisterData.controls["uatIp"].setValue(
            this.productToDisplay.products[0].services[0].uatIp
          );
          this.updateRegisterData.controls["prodIp"].setValue(
            this.productToDisplay.products[0].services[0].prodIp
          );
          this.updateRegisterData.controls["prodPort"].setValue(
            this.productToDisplay.products[0].services[0].prodPort
          );
          this.updateRegisterData.controls["retryAttempts"].setValue(
            this.productToDisplay.products[0].services[0].retryAttempts
          );

          this.updateRegisterData.controls["actionOnNoRes"].setValue(
            this.productToDisplay.products[0].services[0].actionOnNoRes
          );

          this.updateRegisterData.controls["firstNameBusinessSpoc"].setValue(
            this.dataToDisplay.firstNameBusinessSpoc
          );
          
         
          this.updateRegisterData.controls["firstNameBusinessSpoc"].setValue(
            this.dataToDisplay.firstNameBusinessSpoc
          );
          this.updateRegisterData.controls["lastNameBusinessSpoc"].setValue(
            this.dataToDisplay.lastNameBusinessSpoc
          );
          this.updateRegisterData.controls["mobileNumberBusinessSpoc"].setValue(
            this.dataToDisplay.mobileNumberBusinessSpoc
          );
          this.updateRegisterData.controls["emailIdBusinessSpoc"].setValue(
            this.dataToDisplay.emailIdBusinessSpoc
          );
          this.updateRegisterData.controls["firstNameITSpoc"].setValue(
            this.dataToDisplay.firstNameITSpoc
          );
          this.updateRegisterData.controls["lastNameITSpoc"].setValue(
            this.dataToDisplay.lastNameITSpoc
          );
          this.updateRegisterData.controls["mobileNumberITSpoc"].setValue(
            this.dataToDisplay.mobileNumberITSpoc
          );
          this.updateRegisterData.controls["emailIdITSpoc"].setValue(
            this.dataToDisplay.emailIdITSpoc
          );
        }


        this.productName = localStorage.getItem("productName");
      });

    this.updateRegisterData = this.fb.group({
      serviceNameInput:[''],
      emails: this.fb.array([]),
      appName: [""],
      appVersion: [""],
      modeOffered: [""],
      txnPerday: [""],
      txnLimit: [""],
      reqParameter: [""],
      amountField: [""],
      ackReciept: [""],
      firstName: [""],
      lastName: [""],
      organization: [""],
      email: [""],
      username: [""],
      phoneno: [""],
      password: [""],
      confirmPassword: [""],
      bankAccountNumber: [""],
      poolAccountNumber: [""],
      webServiceType: [""],
      communicationProtocol: [""],
      httpCertificate: [{ value: "", disabled: true }],
      encryptionMethod: [""],
      uatIp: [""],
      uatPort: [""],
      uatSecret: [""],
      uatUsername: [""],
      uatPassword: [""],
      uatFile:[""],
      uatFile1: [{ value: "", disabled: true }],
      uatFile2: [{ value: "", disabled: true }],
      uatFile3: [{ value: "", disabled: true }],
      uatURL1: [{ value: "", disabled: true }],
      uatURL2: [{ value: "", disabled: true }],
      retryAttempts: [""],
      actionOnNoRes: [""],
      prodIp: [""],
      prodUsername: [""],
      transactionReversal:[''],
      prodPort: [""],
      prodSecret: [""],
      prodPassword: [""],
      prodFile1:[{ value: "", disabled: true }],
      prodFile2:[{ value: "", disabled: true }],
      prodFile3:[{ value: "", disabled: true }],
      prodURL1: [{ value: "", disabled: true }],
      prodURL2: [{ value: "", disabled: true }],
      messageFormat: [""],
      uatPayUpdateURL: [{ value: "", disabled: true }],
      uatCustValidationURL: [{ value: "", disabled: true }],
      uatPaymentStat: [{ value: "", disabled: true }],
      checksumReq: [""],
      livePayUpdateURL: [{ value: "", disabled: true }],
      liveCustValidationURL: [{ value: "", disabled: true }],
      livePaymentStat: [{ value: "", disabled: true }],
      phoneNumber: [""],
      firstNameBusinessSpoc: [""],
      lastNameBusinessSpoc: [""],
      mobileNumberBusinessSpoc: [""],
      emailIdBusinessSpoc: [""],
      firstNameITSpoc: [""],
      lastNameITSpoc: [""],
      mobileNumberITSpoc: [""],
      emailIdITSpoc: [""],
      uploadTransactionReversal2:['']
    });
  }
  addbusinessEmail(): FormGroup {
    return this.fb.group({
      email: [""]
    });
  }
  uatUpload2() {
    $(document).ready(function () {
      $("#uatUpload2").trigger("click");
    })
  }
  uatUpload2Uploaded($event) {
    this.transactionReversal = $event.target.files[0];
    this.updateRegisterData.controls['uatFile2'].setValue($event.target.files[0].name);
    // console.log("uatUpload2Uploaded :", $event.target.files[0].name)
  }
  addbusinessSpocEmail(): void {
    (<FormArray>this.updateRegisterData.get("emails")).push(
      this.addbusinessEmail()
    );
  }
  removebusinessSpocEmail(ifConditionGroupIndex: number): void {
    (<FormArray>this.updateRegisterData.get("emails")).removeAt(
      ifConditionGroupIndex
    );
  }
  uatUpload3() {
    $(document).ready(function () {
      $("#uatUpload2").trigger("click");
    })
  }
  uploadTransactionReversal2(){
    $(document).ready(function () {
      $("#uploadTransactionReversal2").trigger("click");
    })
  }
  uatUpload() {
    $(document).ready(function () {
      $("#uatUpload").trigger("click");
    })
  }
  toggleNavbar(){ 
  }
  uatUploadUploaded($event){
    this.uatFile = $event.target.files[0]
    this.updateRegisterData.controls['uatFile'].setValue($event.target.files[0].name);
    // console.log("uatUpload1Uploaded :", $event.target.files[0].name)
  }
  uploadTransactionReversal2Event($event){
    this.uatFile3 = $event.target.files[0]
    this.updateRegisterData.controls['uploadTransactionReversal2'].setValue($event.target.files[0].name);
    // console.log("uatUpload1Uploaded :", $event.target.files[0].name);
    const formData: any = new FormData();
    formData.append('files',this.uatFile3);
    this.appservice.uploadFile(this.dataToDisplay.projectId, formData).then((data) => {
      // console.log("data of file", data);
  })
  }
  uatUpload3Uploaded($event) {
    this.uatFile3 = $event.target.files[0]
    this.updateRegisterData.controls['uatFile3'].setValue($event.target.files[0].name);
    // console.log("uatUpload1Uploaded :", $event.target.files[0].name)
  }

  submitDetails(details) {
    // console.log("projectId",this.dataToDisplay.projectId);
    const formData1: any = new FormData();
    formData1.append("files", this.transactionReversal);
          this.userAppDetailsService.uploadFile(this.dataToDisplay.projectId, formData1).then((data) => {
            // console.log("data of file", data);
          });
    // console.log("details", details);

    this.router.navigate(["/authentication/mapping"]);
  }
  uatUpload1Uploaded($event) {
    this.uatFile1 = $event.target.files[0];
    this.updateRegisterData.controls["uatFile1"].setValue(
      $event.target.files[0].name
    );
    // console.log("uatUpload1Uploaded :", $event.target.files[0].name);
  }
  uatUpload1() {
    $(document).ready(function() {
      $("#uatUpload1").trigger("click");
    });
  }
  setInsertedEmails(email): FormGroup {
    return this.fb.group({
      email: [email]
    });
  }
}
