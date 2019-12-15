import { Component, OnInit , ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChangePasswordService } from './change-password.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers:[ToastrService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent implements OnInit {
  // formGroup variables
  addChangeData: FormGroup;
  // variables 
  dataObj;
  recoverform:boolean;
  slides = [
    {
      img: "assets/images/1280_iXpress Logo-07.png",
      description:
        "iXpress Connect – A new way of Banking! Engage yourself in the revolutionary way of getting on-boarded for API based solutions and make your journey quick yet simple and seamless. iXpress Connect provides you a self-service platform to ‘design & develop’ and ‘test & try’ on the fly. Make changes, see what best suits your requirements with full freedom and go live when you are ready. Banking with ICICI, now at your fingertips."
    },
    { img: "assets/images/iXC_1-2-3.JPG" },
    { img: "assets/images/ecol1.png" },
    { img: "assets/images/ecol2.png" },
    { img: "assets/images/ecol3.png" },
    { img: "assets/images/ecol4.png" },
    { img: "assets/images/isure1.png" },
    { img: "assets/images/isure2.png" }
  ];
  options = {
    theme: 'light', // two possible values: light, dark
    dir: 'ltr', // two possible values: ltr, rtl
    layout: 'vertical', // fixed value. shouldn't be changed.
    sidebartype: 'full', // four possible values: full, iconbar, overlay, mini-sidebar
    sidebarpos: 'fixed', // two possible values: fixed, absolute
    headerpos: 'fixed', // two possible values: fixed, absolute
    boxed: 'full', // two possible values: full, boxed
    navbarbg: 'skin1', // six possible values: skin(1/2/3/4/5/6)
    sidebarbg: 'skin6', // six possible values: skin(1/2/3/4/5/6)
    logobg: 'skin6' // six possible values: skin(1/2/3/4/5/6)
  };
  public slideConfig = {
    dots: false,
    infinite: false,
    speed: 300,
    nextArrow:'<div class="loginnav-btn next-slide"></div>',
    prevArrow:'<div class="loginnav-btn prev-slide"></div>',
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  response;
  username: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  constructor(Config: NgbCarouselConfig,private fb: FormBuilder, private http: HttpClient, public changePasswordService: ChangePasswordService, private router: Router, private toastr: ToastrService) {
    Config.interval = 10000;
    Config.wrap = true;
    Config.keyboard = true;
    Config.showNavigationIndicators = true;
    this.addChangeData = this.fb.group({
      'oldPassword': ['', Validators.required],
      'newPassword': ['', Validators.required],
      'confirmPassword': ['', [Validators.required, confirmPasswordValidator]]
    })
  }
  /**
     * @author Sanchita
     * @param value {username,oldPassword,newPassword,confirmPassword}
     * @description changes password of existing user
     */
  changeData(value) {
    console.log("value",value);
    this.dataObj = {
      'username':this.username,
      'oldPassword': value.oldPassword,
      'newPassword': value.newPassword,
      'confirmPassword':value.confirmPassword
     
    }
    this.changePasswordService.changePassword(this.dataObj).then((data) => {
      this.response = data;
      console.log("this.responseData",this.response);
      if (this.response.message === "oldPassword is incorrect.") {
        this.toastr.error("UserName or Password is incorrect");
        
      }
      else {
        this.toastr.success("Password changed sucessfully");
        this.router.navigate(['/authentication/login'])
      }
    })
  }
  /**
     * @author Sanchita
     * @param value 
     * @description Back Button click
     */
  backButton() {
    this.router.navigate(['/ProjectData/ProjectManagement']);
  }
  ngOnInit() {
     this.username=localStorage.getItem("username");
     console.log("this.username",this.username);

  }
}
/**
   * @author Sanchita
   * @param value 
   * @description  custom validator to check if password and confirmPassword is same 
   */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }
  const password = control.parent.get('newPassword');
  const confirmPassword = control.parent.get('confirmPassword');
  if (!password || !confirmPassword) {
    return null;
  }
  if (confirmPassword.value === '') {
    return null;
  }
  if (password.value === confirmPassword.value) {
    return null;
  }
  return { 'passwordsNotMatching': true };
};