import { Component, OnInit } from '@angular/core';
import { MakerComponentService } from './maker-component.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-maker-component',
  templateUrl: './maker-component.component.html',
  styleUrls: ['./maker-component.component.css']
})
export class MakerComponentComponent implements OnInit {
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
    private makerService: MakerComponentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.makerService.getDetailsOfNotApproved().then(async data => {
      this.dataOfNewRequests = data;
      // console.log("New Request data -> ", this.dataOfNewRequests);
      this.numberOfRequests = this.dataOfNewRequests.length;
      // console.log("Total Number of Request -> ", this.numberOfRequests);
      
    });
  
    this.makerService.getDetailsOfApproved().then(async data => {
      this.dataOfApprovedRequest = data;
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
