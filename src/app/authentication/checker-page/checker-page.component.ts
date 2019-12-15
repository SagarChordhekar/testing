import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbTabset } from "@ng-bootstrap/ng-bootstrap";
import {
  ActivatedRoute
} from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { CheckerDetailsService } from "./checker-details.service"
@Component({
  selector: "app-checker-page",
  templateUrl: "./checker-page.component.html",
  styleUrls: ["./checker-page.component.css"]
})
export class CheckerPageComponent implements OnInit {
  tabSet: NgbTabset;
  public navbarOpen:boolean;
  queryparamProjectId:any;
  projectName:any;
  projectVersion:any;
  productName:any;
  clientName:any;
  initiateUATFlag:any;
  radioValueArray=['Yes','No'];

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
  displayActivities = [
    { activity: " DevOps: Code Checked-Out" },
    { activity: "DevOps: Application Deployment Unit Created" },
    { activity: "DevOps: Application Deployment Unit Configuration Updated" },
    { activity: "DevOps: Application Proxy Deployed (IBM APIC)" },
    { activity: "DevOps: Application Deployed (IBM ACE)" },
    { activity: "DevOps: Test Data Prepared" },
    { activity: "DevOps: Test Data Deployed" },
    { activity: "DevOps: Running Tests" },
    { activity: "DevOps: Test Run Completed" },
    { activity: "DevOps: Recording Test Results" }
  ];
  displayList = [
    { data: "Profunds configuration done" },
    { data: "IPS configuration done" },
    { data: "iCore configuration" },
    { data: "UAT testing completed successfully" },
    { data: "All necessary details provided are correct" },
    { data: "Tag mapping done correctly" },
    { data: "Live port opening" },
    { data: "IP whitelisting" },
    { data: "Legal documentation completed" }
  ];
  constructor(
    private actRoute: ActivatedRoute,
    private checkerDetailsService: CheckerDetailsService,
    ) {
      this.actRoute.queryParams.subscribe(params => {
        this.queryparamProjectId = params['projectId'];
        console.log("Project id fromQuery params using ActivatedRoute ->", this.queryparamProjectId);
    });
    }
  toggleNavbar(){
  }
  
  ngOnInit() {
    this.checkerDetailsService
    .getProjectDetails(this.queryparamProjectId)
    .then(data => {
      this.productName=data[0].productName;
      this.projectName=data[0].projectName;
      this.clientName=data[0].orgName;
      this.projectVersion=data[0].version;
     console.log("checker page data render -> ",data[0]);

    })
    let user_details=JSON.parse(localStorage.getItem('dataofUser'));
    console.log("user_details",user_details);
    console.log("user_details",user_details[0].organisation);
  }
  submitProductionDetails() {
    this.initiateUATFlag = "true";
    console.log(this.initiateUATFlag);
    let user_details=JSON.parse(localStorage.getItem('dataofUser'));
    console.log("user_details",user_details[0].username);
   let flagData={
                  "projectId":this.queryparamProjectId,
                  "status": "Ready for Production Verified",
                  "event": null,
                  "username": user_details[0].username,
                  "orgName": user_details[0].organisation

                }
                console.log("Update data -> ",flagData);

    this.checkerDetailsService.updateProjectData(flagData).then(async data=>{
      console.log("Update data in checker page-> ",data);

    })
    alert("Production details verified.")
    // this.myProfileService.getApp(this.queryparamProjectId).then(async data => {
    //   data[0].flag="Ready for prod deployment"
    //   console.log("Getting application details with flag -> ",data);
    // });

}
  valChange(index,$event){

    if(index=="1"){
      console.log("Test value -> ",index,$event.target.value);

    }else if(index=="2"){
      console.log("Test value -> ",index,$event.target);

    }else if(index=="3"){
      
    }else if(index=="4"){
      
    }else if(index=="5"){
      
    }else if(index=="6"){
      
    }else if(index=="7"){
      
    }else if(index=="8"){
      
    }
  }

}
