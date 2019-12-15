import { Component, ChangeDetectionStrategy } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  ReactiveFormsModule
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationExtras } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "./login.service";
import { NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";
import { config } from "../../../../config";
import * as CryptoJS from "crypto-js";
import * as bcrypt from "bcryptjs";
import { ThrowStmt } from "@angular/compiler";
declare var $: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [NgbCarouselConfig],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  // formGroup of login
  pageUrl = config.pageUrl;
  encyptedData;
  encryptSecretKey = "ICICI2218";
  addLoginData: FormGroup;
  resetLoginData: FormGroup;
  // variables to check login
  dataObj;
  resetObj;
  loginform;
  recoverform;
  response;
  username: any;
  loggedUserName: any;
  password: any;
  showNavigationIndicators = true;
  orgainsationName;
  isMobileResolution: boolean;
  role;
  responseForAdmin;
  userData;
  getAllUsers = [];
  imageData;
  roles = [
    {
      name: "Customer",
      value: "Customer"
    },
    {
      name: "checker",
      value: "checker"
    },
    {
      name: "maker",
      value: "maker"
    },
    {
      name: "CMS_Ops",
      value: "CMS_Ops"
    }
  ];
  slides = [
    {
      img: "assets/images/1280_iXpress Logo_V2-23 (1).jpg",
      description:
        "iXpress Connect – A new way of Banking! Engage yourself in the revolutionary way of getting on-boarded for API based solutions and make your journey quick yet simple and seamless. iXpress Connect provides you a self-service platform to ‘design & develop’ and ‘test & try’ on the fly. Make changes, see what best suits your requirements with full freedom and go live when you are ready. Banking with ICICI, now at your fingertips."
    },
    { img: "assets/images/iXC_1-2-3.JPG" },
    {
      img: "assets/images/eCollection.png"
    },
    {
      img: "assets/images/iSurePay.png"
    }
    // { img: "assets/images/ecol1.png" },
    // { img: "assets/images/ecol2.png" },
    // { img: "assets/images/ecol3.png" },
    // { img: "assets/images/ecol4.png" },
    // { img: "assets/images/isure1.png" },
    // { img: "assets/images/isure2.png" }
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
  public slideConfig = {
    dots: false,
    infinite: false,
    speed: 300,
    nextArrow: '<div class="loginnav-btn next-slide"></div>',
    prevArrow: '<div class="loginnav-btn prev-slide"></div>',
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
  data: string;
  productvalue: string;
  dataOfUserToSend;
  public navbarOpen: boolean;
  code: string;
  cap = false;

  constructor(
    Config: NgbCarouselConfig,
    private fb: FormBuilder,
    public loginService: LoginService,
    private http: HttpClient,
    private router: Router,
    public toastr: ToastrService
  ) {
    Config.interval = 10000;
    Config.wrap = true;
    Config.keyboard = true;
    Config.showNavigationIndicators = true;
    this.addLoginData = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      selectRole: ["", [Validators.required]]
    });
    this.resetLoginData = this.fb.group({
      username: ["", [Validators.required]]
      // 'newPassword': ['', [Validators.required]],
      // 'confirmPassword': ['', [Validators.required, confirmPasswordValidator]]
    });
    // code to change background for responsiveness
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }
  /**
   * @author Sanchita
   * @description reset between login and forgotPassword form
   */
  showRecoverForm() {
    $(document).ready(function() {
      $("#loginform").hide();
      $("#recoverform").show();
    });
    this.addLoginData.reset();
    this.resetLoginData.reset();
  }
  /**
   * @author Sanchita
   * @param value {username,password}
   * @description function called to login the user and perform some actions based on it
   */
  // loginData(value) {
  //   this.username = value.username;
  //   this.password = value.password;
  //   this.dataObj = {
  //     'username': this.username,
  //     'password': this.password
  //   };

  //   this.loginService.userDetails(this.dataObj.username).then((data) => {
  //     this.userData=data;
  //   if(this.userData.length === 0){
  //     this.toastr.error("Please Enter valid Username and Password")
  //   }
  //     else if (this.userData[0].makerApproval === false) {
  //       this.toastr.info("Wating for Approval!");
  //       this.addLoginData.reset();
  //     }
  //     else if (this.userData[0].roles[0] === "checker") {
  //       this.role = this.userData[0].roles[0];
  //       console.log("-------",this.role);
  //       this.loginService.login(this.dataObj).then((data) => {
  //         this.responseForAdmin = data;
  //         if (this.responseForAdmin.message == "Login Successful.") {
  //           this.router.navigate(['/authentication/Maker']);
  //           this.toastr.success("Logged In Successfully");
  //           localStorage.setItem("username",this.dataObj.username);
  //         }
  //         else if(this.responseForAdmin.message == "Username or password is incorrect"){
  //           this.toastr.error("Username or password is incorrect")
  //         }
  //         else if(this.username === "" || this.password === "") {
  //           this.toastr.error("Please Enter Username and Password");
  //           this.addLoginData.reset();
  //         }
  //         else if( this.username != ""  && this.password === ""){
  //           this.toastr.error("Please Enter Password");
  //           this.addLoginData.reset();
  //         }
  //         else if( this.username === ""  && this.password != ""){
  //           this.toastr.error("Please Enter Username");
  //           this.addLoginData.reset();
  //         }

  //       })
  //     }
  //     else if ( this.userData[0].roles[0] === "CMS_Ops") {
  //       this.role = this.userData[0].roles[0];
  //       this.loginService.login(this.dataObj).then((data) => {
  //         this.responseForAdmin = data;
  //         if (this.responseForAdmin.message == "Login Successful.") {
  //           this.router.navigate(['/authentication/production']);
  //           this.toastr.success("Logged In Successfully");
  //           localStorage.setItem("username",this.dataObj.username);
  //         }
  //         else if(this.responseForAdmin.message == "Username or password is incorrect"){
  //           this.toastr.error("Username or password is incorrect")
  //         }
  //         else if(this.username === "" || this.password === "") {
  //           this.toastr.error("Please Enter Username and Password");
  //           this.addLoginData.reset();
  //         }
  //         else if( this.username != ""  && this.password === ""){
  //           this.toastr.error("Please Enter Password");
  //           this.addLoginData.reset();
  //         }
  //         else if( this.username === ""  && this.password != ""){
  //           this.toastr.error("Please Enter Username");
  //           this.addLoginData.reset();
  //         }
  //       })
  //     }
  //     else if ( this.userData[0].roles[0] === "maker") {
  //       this.role = this.userData[0].roles[0];
  //       this.loginService.login(this.dataObj).then((data) => {
  //         this.responseForAdmin = data;
  //         if (this.responseForAdmin.message == "Login Successful.") {
  //           this.router.navigate(['/authentication/makerPage']);
  //           this.toastr.success("Logged In Successfully");
  //           localStorage.setItem("username",this.dataObj.username);
  //         }
  //         else if(this.responseForAdmin.message == "Username or password is incorrect"){
  //           this.toastr.error("Username or password is incorrect")
  //         }
  //         else if(this.username === "" || this.password === "") {
  //           this.toastr.error("Please Enter Username and Password");
  //           this.addLoginData.reset();
  //         }
  //         else if( this.username != ""  && this.password === ""){
  //           this.toastr.error("Please Enter Password");
  //           this.addLoginData.reset();
  //         }
  //         else if( this.username === ""  && this.password != ""){
  //           this.toastr.error("Please Enter Username");
  //           this.addLoginData.reset();
  //         }
  //       })
  //     }
  //     else if (this.userData[0].makerApproval === "true"   && this.userData[0].roles[0] != "checker") {
  //       this.role =this.userData[0].roles[0];
  //       this.loginService.login(this.dataObj).then((data) => {

  //         this.response = data;
  //         if (this.response.message == "Login Successful.") {

  //             // this.router.navigate(['/authentication/Profile']);
  //             this.router.navigate(['/authentication/user-profile']);
  //             this.dataOfUserToSend=JSON.stringify(this.userData);
  //             localStorage.setItem("dataofUser",this.dataOfUserToSend);
  //             localStorage.setItem("adminLogin", this.role);
  //             localStorage.setItem("username", value.username);
  //             this.toastr.success("Logged In Successfully");
  //           }
  //           else if(this.response.message == ""){
  //             this.toastr.error("Please Enter Username and Password")
  //           }
  //         else if(this.username === "" || this.password === ""){
  //           this.toastr.error("Please Enter Username and Password");
  //           this.addLoginData.reset();
  //         }
  //         else if( this.username != ""  && this.password === ""){
  //           this.toastr.error("Please Enter Password");
  //           this.addLoginData.reset();
  //         }
  //         else if( this.username === ""  && this.password != ""){
  //           this.toastr.error("Please Enter Username");
  //           this.addLoginData.reset();
  //         }
  //       })
  //   }

  // }
  //   )
  //   }

  /**
   * @author Sanchita
   * @param value {username,password}
   * @description function called to login the user and perform some actions based on it
   */
  loginData(value) {
    var rolePresent = false;
    this.username = value.username;
    this.password = value.password;
    this.dataObj = {
      username: this.username,
      password: this.password
    };

    this.loginService.userDetails(this.dataObj.username).then(data => {
      this.userData = data;
      if (this.userData.length === 0) {
        this.toastr.error("Please Enter valid Username and Password");
      } else if (this.userData[0].makerApproval === false) {
        this.toastr.info("Wating for Approval!");
        this.addLoginData.reset();
        this.addLoginData.controls["selectRole"].setValue("");
      }
      if (this.userData[0].roles.length == 0) {
        rolePresent = true;
      }
      for (var i = 0; i < this.userData[0].roles.length; i++) {
        console.log("roles: ", value.selectRole, this.userData[0].roles[i]);
        if (value.selectRole == this.userData[0].roles[i]) {
          rolePresent = true;
          break;
        }
      }
      if (rolePresent == true) {
        if (value.selectRole == "checker") {
          this.loginService.login(this.dataObj).then(data => {
            this.responseForAdmin = data;
            if (this.responseForAdmin.message == "Login Successful.") {
              this.router.navigate(["/authentication/Maker"]);
              this.toastr.success("Logged In Successfully", "", {
                timeOut: 2000
              });
              localStorage.setItem("username", this.dataObj.username);
            } else if (
              this.responseForAdmin.message ==
              "Username or password is incorrect"
            ) {
              this.toastr.error("Username or password is incorrect", "", {
                timeOut: 3000
              });
            } else if (this.username === "" || this.password === "") {
              this.toastr.error("Please Enter Username and Password", "", {
                timeOut: 3000
              });
              this.addLoginData.reset();
              this.addLoginData.controls["selectRole"].setValue("");
            } else if (
              (this.username != "" && this.password === "",
              "",
              { timeOut: 3000 })
            ) {
              this.toastr.error("Please Enter Password");
              this.addLoginData.reset();
              this.addLoginData.controls["selectRole"].setValue("");
            } else if (this.username === "" && this.password != "") {
              this.toastr.error("Please Enter Username", "", { timeOut: 3000 });
              this.addLoginData.reset();
              this.addLoginData.controls["selectRole"].setValue("");
            }
          });
        } else if (value.selectRole === "maker") {
          this.loginService.login(this.dataObj).then(data => {
            this.responseForAdmin = data;
            if (this.responseForAdmin.message == "Login Successful.") {
              this.router.navigate(["/maker/home"]);
              this.toastr.success("Logged In Successfully");
              localStorage.setItem("username", this.dataObj.username);
            } else if (
              this.responseForAdmin.message ==
              "Username or password is incorrect"
            ) {
              this.toastr.error("Username or password is incorrect");
            } else if (this.username === "" || this.password === "") {
              this.toastr.error("Please Enter Username and Password");
              this.addLoginData.reset();
              this.addLoginData.controls["selectRole"].setValue("");
            } else if (this.username != "" && this.password === "") {
              this.toastr.error("Please Enter Password");
              this.addLoginData.reset();
              this.addLoginData.controls["selectRole"].setValue("");
            } else if (this.username === "" && this.password != "") {
              this.toastr.error("Please Enter Username");
              this.addLoginData.reset();
              this.addLoginData.controls["selectRole"].setValue("");
            }
          });
        } else if (value.selectRole === "CMS_Ops") {
          this.loginService.login(this.dataObj).then(data => {
            this.responseForAdmin = data;
            if (this.responseForAdmin.message == "Login Successful.") {
              this.router.navigate(["/cms/production"]);
              this.toastr.success("Logged In Successfully");
              localStorage.setItem("username", this.dataObj.username);
            } else if (
              this.responseForAdmin.message ==
              "Username or password is incorrect"
            ) {
              this.toastr.error("Username or password is incorrect");
            } else if (this.username === "" || this.password === "") {
              this.toastr.error("Please Enter Username and Password");
              this.addLoginData.reset();
              this.addLoginData.controls["selectRole"].setValue("");
            } else if (this.username != "" && this.password === "") {
              this.toastr.error("Please Enter Password");
              this.addLoginData.reset();
              this.addLoginData.controls["selectRole"].setValue("");
            } else if (this.username === "" && this.password != "") {
              this.toastr.error("Please Enter Username");
              this.addLoginData.reset();
              this.addLoginData.controls["selectRole"].setValue("");
            }
          });
        } else if (
          this.userData[0].makerApproval === "true" &&
          value.selectRole != "checker"
        ) {
          this.role = this.userData[0].roles[0];
          this.loginService.login(this.dataObj).then(data => {
            this.response = data;
            if (this.response.message == "Login Successful.") {
              this.router.navigate(["/authentication/user-profile"]);
              this.dataOfUserToSend = JSON.stringify(this.userData);
              localStorage.setItem("dataofUser", this.dataOfUserToSend);
              localStorage.setItem("adminLogin", this.role);
              localStorage.setItem("username", value.username);
              this.toastr.success("Logged In Successfully", "", {
                timeOut: 2000
              });
            } else if (this.response.message == "") {
              this.toastr.error("Please Enter Username and Password", "", {
                timeOut: 3000
              });
            } else if (this.username === "" || this.password === "") {
              this.toastr.error("Please Enter Username and Password", "", {
                timeOut: 3000
              });
              this.addLoginData.reset();
              this.addLoginData.controls["selectRole"].setValue("");
            } else if (this.username != "" && this.password === "") {
              this.toastr.error("Please Enter Password", "", { timeOut: 3000 });
              this.addLoginData.reset();
              this.addLoginData.controls["selectRole"].setValue("");
            } else if (this.username === "" && this.password != "") {
              this.toastr.error("Please Enter Username", "", { timeOut: 3000 });
              this.addLoginData.reset();
              this.addLoginData.controls["selectRole"].setValue("");
            }
          });
        }
      } else {
        this.toastr.info(
          value.selectRole + " Role is not present for the user!"
        );
        this.addLoginData.reset();
        this.addLoginData.controls["selectRole"].setValue("");
      }
      //   else if (this.userData[0].roles[0] === "checker") {
      //     this.role = this.userData[0].roles[0];
      //     this.loginService.login(this.dataObj).then((data) => {
      //       this.responseForAdmin = data;
      //       if (this.responseForAdmin.message == "Login Successful.") {
      //         this.router.navigate(['/authentication/Maker']);
      //         this.toastr.success("Logged In Successfully","",{timeOut:2000});
      //         localStorage.setItem("username",this.dataObj.username);
      //       }
      //       else if(this.responseForAdmin.message == "Username or password is incorrect"){
      //         this.toastr.error("Username or password is incorrect","",{timeOut:3000})
      //       }
      //       else if(this.username === "" || this.password === "") {
      //         this.toastr.error("Please Enter Username and Password","",{timeOut:3000});
      //         this.addLoginData.reset();
      //       }
      //       else if( this.username != ""  && this.password === "","",{timeOut:3000}){
      //         this.toastr.error("Please Enter Password");
      //         this.addLoginData.reset();
      //       }
      //       else if( this.username === ""  && this.password != ""){
      //         this.toastr.error("Please Enter Username","",{timeOut:3000});
      //         this.addLoginData.reset();
      //       }

      //     })
      //   }
      //   else if ( this.userData[0].roles[0] === "CMS_Ops") {
      //     this.role = this.userData[0].roles[0];
      //     this.loginService.login(this.dataObj).then((data) => {
      //       this.responseForAdmin = data;
      //       if (this.responseForAdmin.message == "Login Successful.") {
      //         this.router.navigate(['/cms/production']);
      //         this.toastr.success("Logged In Successfully");
      //         localStorage.setItem("username",this.dataObj.username);
      //       }
      //       else if(this.responseForAdmin.message == "Username or password is incorrect"){
      //         this.toastr.error("Username or password is incorrect")
      //       }
      //       else if(this.username === "" || this.password === "") {
      //         this.toastr.error("Please Enter Username and Password");
      //         this.addLoginData.reset();
      //       }
      //       else if( this.username != ""  && this.password === ""){
      //         this.toastr.error("Please Enter Password");
      //         this.addLoginData.reset();
      //       }
      //       else if( this.username === ""  && this.password != ""){
      //         this.toastr.error("Please Enter Username");
      //         this.addLoginData.reset();
      //       }
      //     })
      //   }
      //   else if ( this.userData[0].roles[0] === "maker") {
      //     this.role = this.userData[0].roles[0];
      //     this.loginService.login(this.dataObj).then((data) => {
      //       this.responseForAdmin = data;
      //       if (this.responseForAdmin.message == "Login Successful.") {
      //         this.router.navigate(['/maker/home']);
      //         this.toastr.success("Logged In Successfully");
      //         localStorage.setItem("username",this.dataObj.username);
      //       }
      //       else if(this.responseForAdmin.message == "Username or password is incorrect"){
      //         this.toastr.error("Username or password is incorrect")
      //       }
      //       else if(this.username === "" || this.password === "") {
      //         this.toastr.error("Please Enter Username and Password");
      //         this.addLoginData.reset();
      //       }
      //       else if( this.username != ""  && this.password === ""){
      //         this.toastr.error("Please Enter Password");
      //         this.addLoginData.reset();
      //       }
      //       else if( this.username === ""  && this.password != ""){
      //         this.toastr.error("Please Enter Username");
      //         this.addLoginData.reset();
      //       }
      //     })
      //   }

      //   else if (this.userData[0].makerApproval === "true"   && this.userData[0].roles[0] != "checker") {
      //     this.role =this.userData[0].roles[0];
      //     this.loginService.login(this.dataObj).then((data) => {

      //       this.response = data;
      //       if (this.response.message == "Login Successful.") {
      //           this.router.navigate(['/authentication/user-profile']);
      //           this.dataOfUserToSend=JSON.stringify(this.userData);
      //           localStorage.setItem("dataofUser",this.dataOfUserToSend);
      //           localStorage.setItem("adminLogin", this.role);
      //           localStorage.setItem("username", value.username);
      //           this.toastr.success("Logged In Successfully","",{timeOut:2000});
      //         }
      //         else if(this.response.message == ""){
      //           this.toastr.error("Please Enter Username and Password","",{timeOut:3000})
      //         }
      //       else if(this.username === "" || this.password === ""){
      //         this.toastr.error("Please Enter Username and Password","",{timeOut:3000});
      //         this.addLoginData.reset();
      //       }
      //       else if( this.username != ""  && this.password === ""){
      //         this.toastr.error("Please Enter Password","",{timeOut:3000});
      //         this.addLoginData.reset();
      //       }
      //       else if( this.username === ""  && this.password != ""){
      //         this.toastr.error("Please Enter Username","",{timeOut:3000});
      //         this.addLoginData.reset();
      //       }
      //     })
      // }
    });
  }

  /**
   * @author Kuldeep Narvekar
   * @param value {username,newPassword,confirmPassword}
   * @description Send Reset Password Link from Email
   */
  loginResetData(value) {
    console.log("value: ", value);
    this.resetObj = {
      username: value.username,
      pageUrl: this.pageUrl + "authentication/reset?username="
    };
    this.loginService.loginResetLink(this.resetObj).then(data => {
      this.response = data;
      this.toastr.info("Link has been sent to your Registered Email Id");
      // this.loginform = !this.loginform;
      // this.recoverform = !this.recoverform;
      // console.log("this.loginform: ",this.loginform,this.recoverform)
      this.ngOnInit();
    });
  }
  /**
   * @author Sanchita
   * @description  Function called on back button
   */
  backButton() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }
  ngOnInit() {
    localStorage.clear();
    $(document).ready(function() {
      $("#loginform").show();
      $("#recoverform").hide();
    });
    this.createCaptcha();
    this.addLoginData.reset();
    this.resetLoginData.reset();
    //   this.loginService.getProductsData().then((data)=>{
    //     this.imageData=data;
    // })
    this.productvalue = localStorage.getItem("productData");
    this.addLoginData.controls["selectRole"].setValue("");
  }
  slickInit(e) {
    // console.log('slick initialized');
  }

  breakpoint(e) {
    // console.log('breakpoint');
  }

  afterChange(e) {
    // console.log('afterChange');
  }

  beforeChange(e) {
    // console.log('beforeChange');
  }
  createCaptcha() {
    // var code;
    //clear the contents of captcha div first
    document.getElementById("captcha").innerHTML = "";
    var charsArray =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";

    var lengthOtp = 6;
    var captcha = [];

    for (var i = 0; i < lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array

      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 90;
    canv.height = 40;
    var ctx = canv.getContext("2d");
    ctx.font = "20px Times New Roman";
    ctx.strokeText(captcha.join(""), 0, 30);
    // ctx.fillText(charsArray.split("").join(' '), 0, 110);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    this.code = captcha.join("");
    document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
    // console.log(code)
  }

  capCheck(calValue) {
    // console.log(calValue)
    if (calValue != this.code) {
      this.cap = true;
      this.createCaptcha();
      console.log(this.cap);
    } else {
      console.log("not match");
      this.cap = false;
    }
  }
}
/**
 * @author Sanchita
 * @param value
 * @description  custom validator to check if password and confirmPassword is same
 */
export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }
  const password = control.parent.get("newPassword");
  const confirmPassword = control.parent.get("confirmPassword");
  if (!password || !confirmPassword) {
    return null;
  }
  if (confirmPassword.value === "") {
    return null;
  }
  if (password.value === confirmPassword.value) {
    return null;
  }
  return { passwordsNotMatching: true };
};
