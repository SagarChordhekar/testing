import { Component, OnInit } from '@angular/core';
import { MyProfileService } from "../profile/profile.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  getAppResponse;
  getAuditTrailResponse; //property declared for audit trail output binding
  show = 2;
  hide = 2;
  dataValue;
  appResponseData = [];
  dataValueServices;
  serviceResponseData = [];
  userData;
  dataOfUser;
  public navbarOpen:boolean;

  stopRequest: boolean = false;

  initiateUATFlag: any = "false";

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
  serviceName:any;
  appData: any;
  setFlag: string;
  
  constructor(
    private myProfileService: MyProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    this.stopRequest = false;
    this.userData = localStorage.getItem("dataofUser");
    this.dataOfUser = JSON.parse(this.userData);
    console.log("Logged In User Details -> ", this.dataOfUser[0].projectId);
    this.myProfileService.getApp(this.dataOfUser[0].projectId).then(async data => {
      this.getAppResponse = data;
      // Changes by sanchita
      if(this.getAppResponse[0].status === "Ready for Production Request Initiated"){
        this.setFlag="true";
        localStorage.setItem("status",this.setFlag);
      }
      else{
        this.setFlag="false";
        localStorage.setItem("status",this.setFlag);
      }
      console.log("Api response for particular projectId -> ",this.getAppResponse);
      var serviceId = this.getAppResponse[0].products[0].services[0].serviceId;
      // console.log("Extract Servide ID -> ",serviceId)
      this.myProfileService.getServiceById(serviceId).then(data => {
        this.serviceName = data[0].serviceName;
        // console.log("Finding Service Name for displaying service name-> ", this.serviceName);
      });
     
    });
  
  }
  

  mappingPage() {
    this.router.navigate(["/authentication/mapping"]);
  }
  toggleNavbar() {
  }
  appPage(data) {
    // console.log("dtata", data);
    this.appData = JSON.stringify(data);
    localStorage.setItem("appData", this.appData);

    this.router.navigate(['/authentication/userAppDetails']);
  }

  increaseShow() {
    this.show += 1;
  }

  decreaseShow() {
    this.show -= 1  ;
  }
  initiateProd() {
    this.initiateUATFlag = "true";
    alert("ICICI Bank Implementation Team has been notified.")
    // console.log(this.initiateUATFlag);
    
  }
}
