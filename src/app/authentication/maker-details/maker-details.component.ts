
// import { Component, OnInit } from '@angular/core';
import { Component, ViewChild, ViewContainerRef, OnInit } from "@angular/core";
import { NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { MakerDetailsService } from "./maker-details.service";
import { config } from "config";
import { Router } from "@angular/router";

@Component({
  selector: "app-maker-details",
  templateUrl: "./maker-details.component.html",
  styleUrls: ["./maker-details.component.css"]
})
export class MakerDetailsComponent implements OnInit {
  private tabSet: NgbTabset;
  public navbarOpen:boolean;


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
  addRegisterData: FormGroup;
  productName: string;
  makerData: any;
  checkedId = "bankAccount";
  radioVal: any;
  show = "econ";
  dataOfUser;
  valueUsed = [];
  productEmail;
  dataToDisplay;
  ifscCodes:any;
  dataOfProductToDisplay;
  // productData: any;
  serviceName: any;
  serviceImage: string;
  productImage: string;
  displayAddition: boolean;
  dataOfProduct;
  dataOfService;
  obj: { username: any; makerApproval: string };
  dataOfApproval: {
    projectId: string;
    makerApproval: string;
    status: string;
    username: string;
    createdBy: string;
    clientCodeProfund: string;
    formatCodeProfund: string;
    clientCodeIPS: string;
    formatCodeIPS: string;
    orgName: string;
    IFSCCode: any;
    enableTransactionReversalFileProcessing:any;
    enableEODMISforthisClient:any;
  };
  userDetails: any;
  dataOfproject: string;
  dataOfProjecttoDisplay: any;
  dataOFUSER: string;
  username: string;
  serviceId: any;
  productId: any;
  productToDisplay;
  eodMIS;
  transReversal: boolean = false;
  @ViewChild(NgbTabset) set content(content: NgbTabset) {
    this.tabSet = content;
  }

  constructor(
    private fb: FormBuilder,
    private makerDetailsService: MakerDetailsService,
    private router: Router
  ) {
    this.addRegisterData = this.fb.group({
    
  emails: this.fb.array([this.addbusinessEmail()]),
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
  phoneNumber: [""],
  password: [""],
  confirmPassword: [""],
  bankAccountNumber: [""],
  poolAccountNumber: [""],
  webServiceType: [""],
  communicationProtocol: [""],
  httpCertificate: [""],
  encryptionMethod: [""],
  uatIp: [""],
  uatPort: [""],
  uatSecret: [""],
  uatUsername: [""],
  uatPassword: [""],
  retryAttempts: [""],
  retryInterval: [""],
  prodIp: [""],
  prodUsername: [""],
  prodPort: [""],
  prodSecret: [""],
  prodPassword: [""],
  messageFormat: [""],
  uatPayUpdateURL: [""],
  uatCustValidationURL: [""],
  uatPaymentStat: [""],
  // 'checksumReq':[''],
  livePayUpdateURL: [""],
  liveCustValidationURL: [""],
  livePaymentStat: [""],
  clientCodeProfund: [""],
  formatCodeProfund: [""],
  clientCodeIPS: [""],
  formatCodeIPS: [""],
  clientcodeProfunds: [""],
  formatcodeProfunds: [""],
  ifscCode: [""]
});
  }

  ngAfterViewInit() {}

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.dataOfproject = localStorage.getItem("projectId");
    // console.log("this.projectId", this.dataOfproject);
    this.dataOFUSER = localStorage.getItem("userDetails");
    this.dataToDisplay = JSON.parse(this.dataOFUSER);
    this.makerDetailsService
      .getProjectDetails(this.dataOfproject)
      .then(data => {
        // console.log(this.dataToDisplay);
        this.dataOfProductToDisplay = data;

        // console.log("------------>", this.dataOfProductToDisplay);
        for (var i = 0; i < this.dataOfProductToDisplay.length; i++) {
          if (this.dataOfproject === this.dataOfProductToDisplay[i].projectId) {
            this.productToDisplay = this.dataOfProductToDisplay[i];
            // console.log("got data", this.productToDisplay);
            // this.productEmail = this.productToDisplay.products[0].services[0].emails.length;
            // console.log("productEmail", this.productEmail);
            this.productId = this.dataOfProductToDisplay[
              i
            ].products[0].productId;
            this.serviceId = this.dataOfProductToDisplay[
              i
            ].products[0].services[0].serviceId;
            // console.log("serviceId", this.serviceId);
            this.makerDetailsService
              .getProductDetails(this.productId)
              .then(data => {
                this.dataOfProduct = data;
                // console.log("this.dataOfProduct", data);
                this.productName = this.dataOfProduct[0].productName;
                this.productImage =
                  config.url + "Images/Products/" + data[0].fileName;
                // console.log("---------------", this.serviceId);
                this.makerDetailsService
                  .getServiceDetails(this.serviceId)
                  .then(data => {
                    this.dataOfService = data;
                    // console.log("-----------------", this.dataOfService);
                    this.serviceName = data[0].serviceName;
                    this.serviceImage =
                      config.url + "Images/Services/" + data[0].fileName;
                  });
              });
          } else {
            // console.log("let it go");
          }
        }
        // console.log(
        //   "this.dataOfProductToDisplay[0].products[0].services[0]: ",
        //   this.dataOfProductToDisplay
        // );
        if (
          this.dataOfProductToDisplay[0].products[0].services[0].ackReciept !==
          "undefined"
        ) {
          this.addRegisterData.patchValue({
            firstName: this.dataToDisplay.firstName,
            lastName: this.dataToDisplay.lastName,
            organization: this.dataToDisplay.organisation,
            email: this.dataToDisplay.email,
            username: this.dataToDisplay.username,
            phoneNumber: this.dataToDisplay.phoneNumber,
            bankAccountNumber: this.dataToDisplay.bankAccountNumber,
            poolAccountNumber: this.dataToDisplay.poolAccountNumber,
            webServiceType: this.dataOfProductToDisplay[0].products[0]
              .services[0].webServiceType,
            messageFormat: this.dataOfProductToDisplay[0].products[0]
              .services[0].messageFormat,
            " emails": this.dataOfProductToDisplay[0].products[0].services[0]
              .emails[0].email,
            encryptionMethod: this.dataOfProductToDisplay[0].products[0]
              .services[0].encryptionMethod,
            uatIp: this.dataOfProductToDisplay[0].products[0].services[0].uatIp,
            uatPort: this.dataOfProductToDisplay[0].products[0].services[0]
              .uatPort,
            prodIp: this.dataOfProductToDisplay[0].products[0].services[0]
              .prodIp,
            prodPort: this.dataOfProductToDisplay[0].products[0].services[0]
              .prodPort
          });
        } else if (
          this.dataOfProductToDisplay[0].products[0].services[0].ackReciept ===
          ""
        ) {
          this.addRegisterData.patchValue({
            firstName: this.dataToDisplay.firstName,
            lastName: this.dataToDisplay.lastName,
            organization: this.dataToDisplay.organisation,
            email: this.dataToDisplay.email,
            username: this.dataToDisplay.username,
            phoneNumber: this.dataToDisplay.phoneNumber,
            bankAccountNumber: this.dataToDisplay.bankAccountNumber,
            poolAccountNumber: this.dataToDisplay.poolAccountNumber,
            webServiceType: this.dataOfProductToDisplay[0].products[0]
              .services[0].webServiceType,
            communicationProtocol: this.dataOfProductToDisplay[0].products[0]
              .services[0].communicationProtocol,
            uatIp: this.dataOfProductToDisplay[0].products[0].services[0].uatIp,
            uatPort: this.dataOfProductToDisplay[0].products[0].services[0]
              .uatPort,
            uatSecret: this.dataOfProductToDisplay[0].products[0].services[0]
              .uatSecret,
            uatUsername: this.dataOfProductToDisplay[0].products[0].services[0]
              .uatUsername,
            uatPassword: this.dataOfProductToDisplay[0].products[0].services[0]
              .uatPassword,
            prodIp: this.dataOfProductToDisplay[0].products[0].services[0]
              .prodIp,
            prodUsername: this.dataOfProductToDisplay[0].products[0].services[0]
              .prodUsername,
            prodPort: this.dataOfProductToDisplay[0].products[0].services[0]
              .prodPort,
            prodSecret: this.dataOfProductToDisplay[0].products[0].services[0]
              .prodSecret,
            prodPassword: this.dataOfProductToDisplay[0].products[0].services[0]
              .prodPassword,
            retryAttempts: this.dataOfProductToDisplay[0].products[0]
              .services[0].retryAttempts,
            retryInterval: this.dataOfProductToDisplay[0].products[0]
              .services[0].retryInterval
          });
        }

        // this.productName = localStorage.getItem("productName");
      });
  }

  
  addbusinessSpocEmail() {
    this.displayAddition = false;
    (<FormArray>this.addRegisterData.get("emails")).push(
      this.addbusinessEmail()
    );
  }

  checkBoxvalue1(event) {
    this.eodMIS = event.target.checked;
    // console.log("event.target------",this.eodMIS);
  }
  checkBoxvalue2(event) {
    this.transReversal = event.target.checked;
    // console.log("event.target------",this.transReversal);

  }
  approveData(value) {
    console.log("------>>>>>>",value);
    
      this.dataOfApproval = {
        projectId: this.dataToDisplay.projectId,
        makerApproval: "true",
        status: "Subscription Request Approved",
        username: this.dataToDisplay.email,
        createdBy: this.username,
        clientCodeProfund: value.clientCodeProfund,
        formatCodeProfund: value.clientCodeProfund,
        clientCodeIPS: value.clientCodeIPS,
        formatCodeIPS: value.clientCodeIPS,
        IFSCCode:value.ifscCode,
        orgName: this.dataToDisplay.organisation,
        enableTransactionReversalFileProcessing:this.transReversal,
        enableEODMISforthisClient:this.eodMIS
      };
    

    // console.log (" this.dataOfApproval = ",  this.dataOfApproval)
    this.makerDetailsService.approveUser(this.dataOfApproval).then(data => {
      // console.log("data", data);
      this.router.navigate(["/authentication/Maker"]);
    });
  }

  removebusinessSpocEmail(ifConditionGroupIndex: number): void {
    (<FormArray>this.addRegisterData.get("emails")).removeAt(
      ifConditionGroupIndex
    );
  }
  toggleNavbar(){
    
  }
  addbusinessEmail(): FormGroup {
    return this.fb.group({
      email: [""]
    });
  }
  onSelect(checkedValue, id) {
    // console.log("Value ", checkedValue.type);
    // console.log("ID1", id, checkedValue.target.value);
    this.checkedId = id;
    this.radioVal = checkedValue.target.value;
    // console.log("ID ", this.checkedId);
  }
  change(value) {
    this.show = value;
  }
  ifscCode(event){
    this.ifscCodes=event.target.value;
    // console.log("value-------", this.ifscCodes);
  }
  rejectData(value) {
    // console.log("------", this.dataToDisplay);
    this.dataOfApproval = {
      projectId: this.dataToDisplay.projectId,
      makerApproval: "false",
      status: "Subscription Request Rejected",
      username: this.dataToDisplay.email,
      createdBy: this.username,
      clientCodeProfund: value.clientCodeProfund,
      formatCodeProfund: "",
      clientCodeIPS: "",
      formatCodeIPS: "",
      IFSCCode: value.ifscCode,
      orgName: this.dataToDisplay.organisation,
      enableTransactionReversalFileProcessing:this.transReversal,
      enableEODMISforthisClient:this.eodMIS
    };
    // console.log("Reject------", this.dataOfApproval);

    this.makerDetailsService.approveUser(this.dataOfApproval).then(data => {
      // console.log("data", data);
      this.router.navigate(["/authentication/Maker"]);
    });
  }
}