import { Component, OnInit } from "@angular/core";
import { MakerService } from "./maker-page.service";
import { MyProfileService } from "../profile/profile.service";
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';

import { Router } from "@angular/router";
@Component({
  selector: "app-maker-page",
  templateUrl: "./maker-page.component.html",
  styleUrls: ["./maker-page.component.css"]
})
export class MakerPageComponent implements OnInit {
  getAppResponse;
  public navbarOpen:boolean;
  checkListTab:boolean=true;
  show = 2;
  dataValue;
  appResponseData = [];
  dataValueServices;
  serviceResponseData = [];
  dataOfNewRequests;
  dataOfApprovedRequest;
  numberOfRequests;
  dataOfApprovedRequests;

 
  recentActivity = [
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
  gotData: string;
  newData = [];
  dataOfProject: any;
  dataOfUser: string;
  dataofProjectFromService: string;
  dataOFUSER: string;
  listOfProductionInitiatedRequest=[];
  constructor(
    private myProfileService: MyProfileService,
    private makerService: MakerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.makerService.getDetailsOfNotApproved().then(async data => {
      this.dataOfNewRequests = data;
      console.log("New Request data -> ", this.dataOfNewRequests);
      this.numberOfRequests = this.dataOfNewRequests.length;
      // console.log("Total Number of Request -> ", this.numberOfRequests);
      
    });
  
    this.makerService.getDetailsOfApproved().then(async data => {
      this.dataOfApprovedRequest = data;
      for(let j=0;j<this.dataOfApprovedRequest.length;j++){

        // console.log("Extract Project Id -> ",this.dataOfApprovedRequest[j].projectId);
        if(this.dataOfApprovedRequest[j].projectId!=undefined || this.dataOfApprovedRequest[j].projectId!=null ){

        this.makerService.getProjectbyId(this.dataOfApprovedRequest[j].projectId).then(data => {
         if(data[0].status!=undefined && data[0].status!=null && data[0].status=="Ready for Production Request Initiated"){
         this.listOfProductionInitiatedRequest.push(data[0]);
        //  console.log("Track Iteration -> ",this.listOfProductionInitiatedRequest.length);
         
         }else if(this.dataOfApprovedRequest[j].projectId==undefined || this.dataOfApprovedRequest[j].projectId==null ){
          // console.log("Status undefined  returning false beacuse status undefined");  
         }else{
          // console.log("Status else condition");  
         }
        });
      }else{
        // console.log("Project id is undefined ,Return  false");
        
      }

      }
     
      for (var i = 0; i < this.dataOfApprovedRequest.length; i++) {
        var value = this.dataOfApprovedRequest[i].makerApproval;
        // console.log(this.dataOfApprovedRequest[i].makerApproval);
        if (value === "true") {
          this.newData.push(this.dataOfApprovedRequest[i]);
        }
      }
      this.newData.reverse();
      // console.log("--------------newData", this.newData);
    }).catch(e=>{
      // console.log("print error -> ",e);
    })
  }

  moveToProd(projectId){
    alert(projectId)
    // console.log("Project Id has been received",projectId);
    if(projectId!=null){
      this.checkListTab=false;
      this.router.navigate(["/authentication/Checker"]);
    }

  }
  moreDetails(data) {
    console.log("Received args",data);
    this.gotData = data;
    this.dataOFUSER = JSON.stringify(this.gotData);
    localStorage.setItem("userDetails", this.dataOFUSER);
    // console.log("----------", this.gotData);
    this.makerService.getProjectbyId(this.gotData["projectId"]).then(data => {
      this.dataOfProject = data[0].projectId;
      localStorage.setItem("projectId", this.dataOfProject);

      this.router.navigate(["/authentication/makerDetails"]);
    });
  }
  toggleNavbar(){}
  increaseShow() {
    this.show += 10;
  }

  decreaseShow() {
    this.show -= 10;
  }
}
