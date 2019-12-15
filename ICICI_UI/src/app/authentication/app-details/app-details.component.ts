import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ViewChild
} from "@angular/core";
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
import {
  HttpClient
} from "@angular/common/http";
import {
  SignupService
} from "../signup/signup.service";
import {
  ToastrService
} from "ngx-toastr";
import {
  Router
} from "@angular/router";
import {
  FileUploader
} from "ng2-file-upload";
import * as CryptoJS from "crypto-js";
import {
  AppDetailsService
} from "./app-details.service";
import {
  NgxSpinnerService
} from "ngx-spinner";
import {
  NgbTabset
} from "@ng-bootstrap/ng-bootstrap";

const baseUrl: string = config.url;
import {
  config
} from "config";
const URL = "https://evening-anchorage-3159.herokuapp.com/api/";
@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.css']

})
export class AppDetailsComponent {
    notSelectedService:any=true
  serviceForm: FormGroup;
  default: string = 'SOAP Web Service';
  productValue: any;
  selectedIndex1: any;
  productvalue;
  private tabSet: NgbTabset;
  projectId: any;
  fileData: any;
  summaryProductDescription: any;
  directory: string;
  showICICIIntermediaryAccountNumber: boolean;
  activeId: string;
  valueD: any;
  interacc: any;
  ogacc: any;
  newerr: boolean;
  porterr: boolean;

  @ViewChild(NgbTabset) set content(content: NgbTabset) {
      this.tabSet = content;
  };
  file1;
  file2;
  selectedValue: string;
  httpsCertificate;
  uatPayUpdateURLFile;
  uatCustValidationURLFile;
  uatPaymentStatFile;
  livePayUpdateURLFile;
  liveCustValidationURLFile;
  livePaymentStatUploadedFile;
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;
  addRegisterData: FormGroup;
  configURL = config.url;
  communicationProtocolArray = [{
          name: "HTTP",
          value: "HTTP"
      },
      {
          name: "HTTPS",
          value: "HTTPS"
      }
  ];
  communicationProtocolArrayUat = [{
      name: "HTTP",
      value: "POST"
  }];
  encryptionMethodArray = [{
          name: "Yes",
          value: "Yes"
      },
      {
          name: "No",
          value: "No"
      }
  ];
  uploadOption = [{
    name: "Yes",
    value: "Yes"
},
{
    name: "No",
    value: "No"
}
];
  eodMisValuesArray=[{
      name:"Host to Host",value:"hostToHost"},
      {
          name:"Email",value:"email"},
          {
              name:"Both",value:"both"
  }]
  showForm;
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
 
  communicationProtocolProduction: any;
  disableInput: any = true;
  isError: any;
  productData: any;
  serviceData: any;
  dropdownData = [];
  summaryProductImage;
  summaryProductName;
  summaryServiceImage;
  summaryServiceName;
  selectedIndex;
  serviceName;
  productName;
  dataForService;
  radioVal = 'yes';
  dataForRegister;
  dataForProject;
  displayAddition: Boolean = true;
  checkedId = 'bankAccount';
  imageValue;
  dataFormatted: any[];
  exp = 'appDetails'
  userDetailsTab = true;
  serviceDetailsTab = true;
  appDetailsTab = false;
  uatFile1;
  uatFile2;
  prodFile1;
  prodFile2;
  flowName;
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
      enableTransactionReversalFileProcessing: any;
      enableEODMISforthisClient: any;
  };
  webServiceTypeArray = [{
          name: "SOAP Web Service",
          value: "SOAP Web Service"
      },
      {
          name: "REST API - JSON",
          value: "REST API - JSON"
      },
      {
          name: "REST API - XML",
          value: "REST API - XML"
      }
  ]


  public slideConfig = {
      dots: false,
      infinite: false,
      speed: 300,
      nextArrow: '<div class="homenav-btn next-slide"></div>',
      prevArrow: '<div class="homenav-btn prev-slide"></div>',
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,

      responsive: [{
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
  navbarOpen = false;
  selectedLevel: any;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private spinner: NgxSpinnerService,
      public toastr: ToastrService, public signupservice: SignupService, private appservice: AppDetailsService) {
      //   this.serviceForm = new FormGroup({
      //     webServiceType: new FormControl(null)
      // });
      // this.serviceForm.controls['webServiceType'].setValue(this.default, {onlySelf: true});

  }

  ngOnInit() {
      this.productvalue = localStorage.getItem("productData");
      this.productName = localStorage.getItem("productName");
      this.serviceName = localStorage.getItem("serviceName");

      this.serviceData = JSON.parse(this.serviceName);
      this.dataForService = this.serviceData;
    //   console.log("------------>", this.dataForService);
    //   console.log("------------>", this.productvalue);

      this.productValue = JSON.parse(this.productvalue);
      if (this.productValue !== undefined && this.productValue !== null && this.productValue !== '') {
          this.showForm = this.productValue.productName;
      }
    //   console.log("serviceData", this.serviceData.serviceName);
      this.flowName = this.serviceData.serviceName;
    //   console.log("productValue", this.productValue);
      this.selectedIndex = this.productValue.productId
      this.selectedIndex1 = this.serviceData.serviceId
      this.appservice.getProducts().then((data) => {
          this.spinner.show();
          this.productData = data;

          this.spinner.hide();
      })

      this.appservice.getService().then((data) => {
          for (var i = 0; i < data.length; i++) {
              this.imageValue = data[i].fileName;
            //   console.log("Image ", this.imageValue)
          }
      })
      if (this.dataForService.serviceName === "ECollection with Two Level Validation at Bank and Client’s End" || this.dataForService.serviceName === "ECollection with Remitter Validation in Intermediary Account") {
          this.showICICIIntermediaryAccountNumber = true;
      } else {
          this.showICICIIntermediaryAccountNumber = false;
      }
      this.onPageLoadProductData(this.productValue);
      this.onPageLoadServiceData(this.serviceData);
  }
  keyPressAlpha(event) {
    //   console.log(event.keyCode)
    var key = event.keyCode;
    return ((key >= 65 && key <= 90) || key == 8);
  };
  keyPress(event: any) {
    //   console.log("number", event.target.value.length);
      const pattern = /^[6-9][0-9]{8}$/;
      let result = pattern.test(event.target.value);
    //   console.log("result", result);
      if (result) {
          this.isError = ""
      } else if (event.target.value.length > 9) {
          this.isError = ""
      } else {
          this.isError = "Please enter valid mobile number"
      }
      // console.log("validation---",event.keyCode);
      // if(event.keyCode==48 || event.keyCode==49||event.keyCode==50||event.keyCode==51||event.keyCode==52||event.keyCode==53){
      //   this.isError="First digit should not be 0,1,2,3,4,5";
      // }

      // let inputChar = String.fromCharCode(event.charCode);
      // if (event.keyCode != 8 && !pattern.test(inputChar)) {
      //   console.log("error")
      //   event.preventDefault();
      // }
  }
  nextTab(tabName) {
    //   console.log("exp: ", this.exp)
    if(this.summaryServiceName != ''){
      if (tabName == 'userDetails') {
          this.appDetailsTab = true;
          this.userDetailsTab = false;
      } else if (tabName == 'serviceDetails') {
          this.appDetailsTab = true;
          this.userDetailsTab = true;
          this.serviceDetailsTab = false;
      }
      this.exp = tabName
    } else {
      var value = confirm("Please select a flow before going to next Tab");
      console.log("Not allowed")
    }
  }

  backTab(tabName) {
    //   console.log("exp: ", this.exp)
      if (tabName == 'appDetails') {
          this.appDetailsTab = true;
          this.userDetailsTab = false;
      } else if (tabName == 'serviceDetails') {
          this.appDetailsTab = true;
          this.userDetailsTab = true;
          this.serviceDetailsTab = false;
      }
      this.exp = tabName
  }

  uatUpload1() {
      $(document).ready(function() {
          $("#uatUpload1").trigger("click");
      })
  }

  uatUpload2() {
      $(document).ready(function() {
          $("#uatUpload2").trigger("click");
      })
  }

  prodUpload1() {
      $(document).ready(function() {
          $("#prodUpload1").trigger("click");
      })
  }

  prodUpload2() {
      $(document).ready(function() {
          $("#prodUpload2").trigger("click");
      })
  }

  httpsUpload1() {
      $(document).ready(function() {
          $("#httpsUpload1").trigger("click");
      })
  }
  httpsProdUpload1() {
      $(document).ready(function() {
          $("#httpsProdUpload1").trigger("click");
      })
  }
  uatPayUpdateURL() {
      $(document).ready(function() {
          $("#uatPayUpdateURL").trigger("click");
      })
  }
  uatCustValidationURL() {
      $(document).ready(function() {
          $("#uatCustValidationURL").trigger("click");
      })
  }
  uatPaymentStat() {
      $(document).ready(function() {
          $("#uatPaymentStat").trigger("click");
      })
  }
  livePayUpdateURL() {
      $(document).ready(function() {
          $("#livePayUpdateURL").trigger("click");
      })
  }
  liveCustValidationURL() {
      $(document).ready(function() {
          $("#liveCustValidationURL").trigger("click");
      })
  }
  livePaymentStat() {
      $(document).ready(function() {
          $("#livePaymentStat").trigger("click");
      })
  }

  ngAfterViewInit() {
    //   console.log(this.tabSet);
  }

  /**
   * @author:kuldeep
   * @param:file upload event
   * @description:file name displayed in form field and file stored in uatFile1 variable.
   */
  uatUpload1Uploaded($event) {
      this.uatFile1 = $event.target.files[0]
      this.addRegisterData.controls['uatFile1'].setValue($event.target.files[0].name);
    //   console.log("uatUpload1Uploaded :", $event.target.files[0].name)
  }

  /**
   * @author:kuldeep
   * @param:file upload event
   * @description:file name displayed in form field and file stored in uatFile1 variable.
   */
  uatUpload2Uploaded($event) {
      this.uatFile2 = $event.target.files[0]
      this.addRegisterData.controls['uatFile2'].setValue($event.target.files[0].name);
    //   console.log("uatUpload2Uploaded :", $event.target.files[0].name)
  }

  /**
   * @author:kuldeep
   * @param:file upload event
   * @description:file name displayed in form field and file stored in prodFile1 variable.
   */
  prodUpload1Uploaded($event) {
      this.prodFile1 = $event.target.files[0]
      this.addRegisterData.controls['prodFile1'].setValue($event.target.files[0].name);
    //   console.log("prodUpload1Uploaded :", $event.target.files[0].name)
  }

  /**
   * @author:kuldeep
   * @param:file upload event
   * @description:file name displayed in form field and file stored in prodFile1 variable.
   */
  prodUpload2Uploaded($event) {
      this.prodFile2 = $event.target.files[0]
      this.addRegisterData.controls['prodFile2'].setValue($event.target.files[0].name);
    //   console.log("prodUpload2Uploaded :", $event.target.files[0].name);


  }
  /**
   * @author Kuldeep
   * @param $event {file data}
   * @description This function will capture the file data of http certificate 
   */
  httpsUpload1Uploaded($event) {
      this.httpsCertificate = $event.target.files[0]
      this.addRegisterData.controls['httpCertificate'].setValue($event.target.files[0].name);
    //   console.log("httpsUpload1Uploaded :", $event.target.files[0].name)
  }
  uatPayUpdateURLUploaded($event) {
      this.uatPayUpdateURLFile = $event.target.files[0]
      this.addRegisterData.controls['uatPayUpdateURL'].setValue($event.target.files[0].name);
    //   console.log("uatPayUpdateURL :", $event.target.files[0].name)
  }
  uatCustValidationURLUploaded($event) {
      this.uatCustValidationURLFile = $event.target.files[0]
      this.addRegisterData.controls['uatCustValidationURL'].setValue($event.target.files[0].name);
    //   console.log("uatCustValidationURLUploaded :", this.uatCustValidationURLFile)
  }
  uatPaymentStatUploaded($event) {
      this.uatPaymentStatFile = $event.target.files[0]
      this.addRegisterData.controls['uatPaymentStat'].setValue($event.target.files[0].name);
    //   console.log("uatPaymentStatUploaded :", this.uatPaymentStatFile)
  }
  livePayUpdateURLUploaded($event) {
      this.livePayUpdateURLFile = $event.target.files[0]
      this.addRegisterData.controls['livePayUpdateURL'].setValue($event.target.files[0].name);
    //   console.log("livePayUpdateURLUploaded :", this.livePayUpdateURLFile)
  }
  liveCustValidationURLUploaded($event) {
      this.liveCustValidationURLFile = $event.target.files[0]
      this.addRegisterData.controls['liveCustValidationURL'].setValue($event.target.files[0].name);
    //   console.log("liveCustValidationURLUploaded :", this.liveCustValidationURLFile)
  }
  livePaymentStatUploaded($event) {
      this.livePaymentStatUploadedFile = $event.target.files[0]
      this.addRegisterData.controls['livePaymentStat'].setValue($event.target.files[0].name);
    //   console.log("livePaymentStatUploaded :", this.livePaymentStatUploadedFile)
  }
  addbusinessEmail(): FormGroup {
      return this.fb.group({
          'email': ['']
      });
  }

  addbusinessSpocEmail(): void {
      this.displayAddition = false;
      ( < FormArray > this.addRegisterData.get('emails')).push(this.addbusinessEmail());
  }

  removebusinessSpocEmail(ifConditionGroupIndex: number): void {
      ( < FormArray > this.addRegisterData.get('emails')).removeAt(ifConditionGroupIndex);
  }
  onPageLoadProductData(data) {
    console.log("onPageLoadProductData: ");
      this.selectedIndex = data.productId;
      let pdata = data
      let ddData = []
      this.summaryProductImage = config.url + "Images/Products/" + data.fileName;
    //   console.log("check product this.summaryProductImage------->", this.summaryProductImage);

      this.summaryProductName = data.productName;
      if(this.summaryProductName == 'eCollections'){
        if(this.flowName == 'ECollection with Remitter Validation in Intermediary Account'){
          this.addRegisterData = this.fb.group({
            // 'emails': this.fb.array([
            //     this.addbusinessEmail()
            // ]),
            'organization': ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&']+$/)]],
            'iciciAccNo': ['',[Validators.required,Validators.pattern(/^[0-9]{12}$/)]],
            'poolAccNo': [''],
            'accountManagerName': ['', [ Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
            'mobileNumberAM': ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
            'emailIdAM': ['', [ Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
            'firstNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            'lastNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            'mobileNumberBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
            'emailIdBusinessSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
            'firstNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            'lastNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            'mobileNumberITSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
            'emailIdITSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
            'webServiceType': [''],
            'communicationProtocol': [''],
            'checksumControl': [''],
            'encryptionMethod': [''],
            'hostNameUat': [''],
            'uatIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
            'uatPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
            'httpCertificate': [''],
            'serviceTimeOutUAT': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
            'serviceURLUAT': ['',[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
            'serviceNameInputUAT': [''],
            'uatFile1': [''],
            'retryAttempts': [''],
            'actionOnNoRes': [''],
            'hostNameProd': [''],
            'prodIp': ['', [Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
            'prodPort': ['443', [ Validators.pattern(/^[0-9]{3,4}$/)]],
            'httpProdCertificate': [''],  
            'serviceTimeOutProd': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
            'serviceURLProd': ['',[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
            'serviceNameInputProd': [''],
            'prodFile1': ['']
            
            // 'messageFormat': [''],
            // 'uatPayUpdateURL': [''],
            // 'uatCustValidationURL': [''],
            // 'uatPaymentStat': [''],
            // 'checksumReq': [''],
            // 'livePayUpdateURL': [''],
            // 'liveCustValidationURL': [''],
            // 'livePaymentStat': [''],
            // 'uatFile2': [''],
            // 'prodFile2': [''],
            // 'uatURL1': [''],
            // 'uatURL2': [''],
            // 'prodURL1': [''],
            // 'prodURL2': [''],
            // 'eodMISValue':['']
        })
        } 
        else if(this.flowName == 'ECollection with Two Level Validation at Bank and Client’s End'){
          this.addRegisterData = this.fb.group({
            // 'emails': this.fb.array([
            //     this.addbusinessEmail()
            // ]),
            'organization': ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&']+$/)]],
            'iciciAccNo': ['',[Validators.required,Validators.pattern(/^[0-9]{12}$/)]],
            'poolAccNo': [''],
            'accountManagerName': ['', [ Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
            'mobileNumberAM': ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
            'emailIdAM': ['', [ Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
            'firstNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            'lastNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            'mobileNumberBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
            'emailIdBusinessSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
            'firstNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            'lastNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
            'mobileNumberITSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
            'emailIdITSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
            'webServiceType': [''],
            'communicationProtocol': [''],
            'checksumControl': [''],
            'encryptionMethod': [''],
            'hostNameUat': [''],
            'uatIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
            'uatPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
            'httpCertificate': [''],
            'serviceTimeOutUAT': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
            'serviceURLUAT': ['',[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
            'serviceNameInputUAT': [''],
            'serviceNameInputUAT2': [''],
            'uatFile1': [''],
            'retryAttempts': [''],
            'actionOnNoRes': [''],
            'hostNameProd': [''],
            'prodIp': ['', [Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
            'prodPort': ['443', [Validators.pattern(/^[0-9]{3,4}$/)]],
            'httpProdCertificate': [''],  
            'serviceTimeOutProd': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
            'serviceURLProd': ['',[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
            'serviceNameInputProd': [''],
            'serviceNameInputProd2': [''],
            'prodFile1': [''],
            'uatFile2': [''],
            'serviceTimeOutUAT2':[],
            'serviceURLUAT2':[],
            'prodFile2': [''],
            'serviceTimeOutProd2':[],
            'serviceURLProd2':[]
            
            // 'messageFormat': [''],
            // 'uatPayUpdateURL': [''],
            // 'uatCustValidationURL': [''],
            // 'uatPaymentStat': [''],
            // 'checksumReq': [''],
            // 'liveCustValidationURL': [''],
            // 'livePaymentStat': [''],
            // 'uatURL1': [''],
            // 'uatURL2': [''],
            // 'prodURL1': [''],
            // 'prodURL2': [''],
            // 'eodMISValue':['']
        })
      }
        else {
        this.addRegisterData = this.fb.group({
          // 'emails': this.fb.array([
          //     this.addbusinessEmail()
          // ]),
          'organization': ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&']+$/)]],
          'iciciAccNo': ['',[Validators.required,Validators.pattern(/^[0-9]{12}$/)]],
          'accountManagerName': ['', [ Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'mobileNumberAM': ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdAM': ['', [ Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'firstNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'lastNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'mobileNumberBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdBusinessSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'firstNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'lastNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'mobileNumberITSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdITSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'webServiceType': [''],
          'communicationProtocol': [''],
          'checksumControl': [''],
          'encryptionMethod': [''],
          'hostNameUat': [''],
          'uatIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
          'uatPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
          'httpCertificate': [''],
          'serviceTimeOutUAT': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
          'serviceURLUAT': ['',[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
          'serviceNameInputUAT': [''],
          'uatFile1': [''],
          'retryAttempts': [''],
          'actionOnNoRes': [''],
          'hostNameProd': [''],
          'prodIp': ['', [Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
          'prodPort': ['443', [ Validators.pattern(/^[0-9]{3,4}$/)]],
          'httpProdCertificate': [''],  
          'serviceTimeOutProd': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
          'serviceURLProd': ['',[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
          'serviceNameInputProd': [''],
          'prodFile1': [''],
          // 'messageFormat': [''],
          // 'uatPayUpdateURL': [''],
          // 'uatCustValidationURL': [''],
          // 'uatPaymentStat': [''],
          // 'checksumReq': [''],
          // 'liveCustValidationURL': [''],
          // 'livePaymentStat': [''],
          // 'uatURL1': [''],
          // 'uatURL2': [''],
          // 'prodURL1': [''],
          // 'prodURL2': [''],
          // 'eodMISValue':['']
      })
    }
      } else {
        this.addRegisterData = this.fb.group({
          // 'emails': this.fb.array([
          //     this.addbusinessEmail()
          // ]),
          'organization': ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&']+$/)]],
          'iciciAccNo': ['',[Validators.required,Validators.pattern(/^[0-9]{12}$/)]],
          'accountManagerName': ['', [ Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'mobileNumberAM': ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdAM': ['', [ Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'firstNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'lastNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'mobileNumberBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdBusinessSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'firstNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'lastNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'mobileNumberITSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdITSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'webServiceType': [''],
          'isure_communication_protocol': [''],
          'checksumControl': [''],
          'encryptionMethod': [''],
          'txnPerday': [''],
          'reqParameter': [''],
          'hostNameUat': [''],
          'uatIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
          'uatPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
          'httpCertificate': [''],
          'serviceTimeOutUAT': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
          'serviceURLUAT': ['',[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
          'serviceNameInputUAT1': [''],
          'uatFile1': [''],
          'serviceNameInputUAT2': [''],
          'uatFile2': [''],
          'hostNameProd': [''],
          'prodIp': ['', [Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
          'prodPort': ['443', [ Validators.pattern(/^[0-9]{3,4}$/)]],
          'httpProdCertificate': [''],
          'serviceTimeOutProd': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
          'serviceURLProd': ['',[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
          'serviceNameInputProd1': [''],
          'prodFile1': [''],
          'serviceNameInputProd2': [''],
          'prodFile2': [''],
          'serviceTimeOutUAT2':[],
          'serviceURLUAT2':[],
          'serviceTimeOutProd2':[],
          'serviceURLProd2':[]

      })
      }
      this.addRegisterData.controls["uatPort"].setValue(
        '443'
    );
    //   console.log("check product name------->", this.summaryProductName);
    //   console.log("description", data.description);
      this.summaryProductDescription = data.description;
      this.appservice.getService().then(async (data) => {
          this.spinner.show();
          this.serviceData = data;
          for (var i = 0; i < this.serviceData.length; i++) {
              if (pdata.productId === this.serviceData[i].productId) {
                  ddData.push(this.serviceData[i]);
              }
          }
          this.dropdownData = ddData
          this.dataFormatted = [];
          var j = -1;

          for (var i = 0; i < this.dropdownData.length; i++) {
              if (i % 4 == 0) {
                  j++;
                  this.dataFormatted[j] = [];
                  this.dataFormatted[j].push(this.dropdownData[i]);
              } else {
                  this.dataFormatted[j].push(this.dropdownData[i]);
              }
          }
        //   console.log("---dataFormatted check point---", this.dataFormatted)
          this.spinner.hide();
      });

  }
  open2Accordian() {
      this.activeId = "ngb-panel-1";
  }
  data(data) {
      this.productValue = data;
      var value = confirm("Would you like to change your product selection?");
      console.log("iSurePay Selected: ",data.productName)
    //   console.log("value", value);
      if (value === true) {
          this.selectedIndex = data.productId;
          let pdata = data
          let ddData = []
          this.summaryProductImage = config.url + "Images/Products/" + data.fileName;
          this.summaryProductName = data.productName;
          this.summaryProductDescription = data.description;
          this.selectedIndex1 = ''
          this.summaryServiceImage = ''
          this.summaryServiceName = ''
          this.appservice.getService().then(async (data) => {
              this.spinner.show();
              this.serviceData = data;
              for (var i = 0; i < this.serviceData.length; i++) {
                  if (pdata.productId === this.serviceData[i].productId) {
                      ddData.push(this.serviceData[i]);
                  }
              }
              this.dropdownData = ddData
              this.dataFormatted = [];
              var j = -1;

              for (var i = 0; i < this.dropdownData.length; i++) {
                  if (i % 4 == 0) {
                      j++;
                      this.dataFormatted[j] = [];
                      this.dataFormatted[j].push(this.dropdownData[i]);
                  } else {
                      this.dataFormatted[j].push(this.dropdownData[i]);
                  }
              }
              this.spinner.hide();
          });
      } else if (value === false) {

      }

  }
  toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
  }
  onPageLoadServiceData(value) {
      this.selectedIndex1 = value.serviceId;
      this.summaryServiceImage = config.url + "Images/Services/" + value.fileName;
      this.summaryServiceName = value.serviceName;
  }

  // data2(value) {
  //   var dataValue = confirm("Do you want to change selection of Service for " + this.productValue.productName + "?")
  //   if (dataValue === true) {
  //     this.selectedIndex1 = value.serviceId;
  //     this.summaryServiceImage = config.url + "Images/Services/" + value.fileName;
  //     this.summaryServiceName = value.serviceName;
  //   }
  //   else if (dataValue === false) {
  //   }
  // }
  data2(value) {
      if (this.summaryServiceImage == '') {
          var dataValue = confirm(
              "Do you want to select this Service for " +
              this.productValue.productName +
              "?"
          );
      } else {
          var dataValue = confirm(
              "Do you want to change selection of Service for " +
              this.productValue.productName +
              "?"
          );
      }
      if (dataValue === true) {
          this.selectedIndex1 = value.serviceId;
          this.summaryServiceImage =
              config.url + "Images/Services/" + value.fileName;
          this.summaryServiceName = value.serviceName;
      } else if (dataValue === false) {}
      if (this.summaryServiceName == "ECollection with Two Level Validation at Bank and Client’s End" || this.summaryServiceName === "ECollection with Remitter Validation in Intermediary Account") {
        this.showICICIIntermediaryAccountNumber = true;
    } else {
        this.showICICIIntermediaryAccountNumber = false;
    }

    if(this.summaryProductName == 'eCollections'){
      if(this.summaryServiceName == 'ECollection with Remitter Validation in Intermediary Account'){
        this.addRegisterData = this.fb.group({
          // 'emails': this.fb.array([
          //     this.addbusinessEmail()
          // ]),
          'organization': ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&']+$/)]],
          'iciciAccNo': ['',[Validators.required,Validators.pattern(/^[0-9]{12}$/)]],
          'poolAccNo': [''],
          'accountManagerName': ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'mobileNumberAM': ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdAM': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'firstNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'lastNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'mobileNumberBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdBusinessSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'firstNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'lastNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'mobileNumberITSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdITSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'webServiceType': [''],
          'communicationProtocol': [''],
          'checksumControl': [''],
          'encryptionMethod': [''],
          'hostNameUat': ['',[Validators.required,Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
          'uatIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
          'uatPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
          'httpCertificate': [''],
          'serviceTimeOutUAT': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
          'serviceURLUAT': ['',[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
          'serviceNameInputUAT': [''],
          'uatFile1': [''],
          'retryAttempts': [''],
          'actionOnNoRes': [''],
          'hostNameProd': ['',[Validators.required,Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
          'prodIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
          'prodPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
          'httpProdCertificate': [''],  
          'serviceTimeOutProd': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
          'serviceURLProd': ['',[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
          'serviceNameInputProd': [''],
          'prodFile1': [''],
          // 'messageFormat': [''],
          // 'uatPayUpdateURL': [''],
          // 'uatCustValidationURL': [''],
          // 'uatPaymentStat': [''],
          // 'checksumReq': [''],
          // 'livePayUpdateURL': [''],
          // 'liveCustValidationURL': [''],
          // 'livePaymentStat': [''],
          // 'uatFile2': [''],
          // 'prodFile2': [''],
          // 'uatURL1': [''],
          // 'uatURL2': [''],
          // 'prodURL1': [''],
          // 'prodURL2': [''],
          // 'eodMISValue':['']
      })
      } 
      else if(this.summaryServiceName == 'ECollection with Two Level Validation at Bank and Client’s End'){
        this.addRegisterData = this.fb.group({
          // 'emails': this.fb.array([
          //     this.addbusinessEmail()
          // ]),
          'organization': ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&']+$/)]],
          'iciciAccNo': ['',[Validators.required,Validators.pattern(/^[0-9]{12}$/)]],
          'poolAccNo': [''],
          'accountManagerName': ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
          'mobileNumberAM': ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdAM': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'firstNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'lastNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'mobileNumberBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdBusinessSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'firstNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'lastNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
          'mobileNumberITSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
          'emailIdITSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
          'webServiceType': [''],
          'communicationProtocol': [''],
          'checksumControl': [''],
          'encryptionMethod': [''],
          'hostNameUat': ['',[Validators.required,Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
          'uatIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
          'uatPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
          'httpCertificate': [''],
          'serviceTimeOutUAT': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
          'serviceURLUAT': ['',[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
          'serviceNameInputUAT': [''],
          'serviceNameInputUAT2': [''],
          'uatFile1': [''],
          'retryAttempts': [''],
          'actionOnNoRes': [''],
          'hostNameProd': ['',[Validators.required,Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
          'prodIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
          'prodPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
          'httpProdCertificate': [''],  
          'serviceTimeOutProd': [''],
          'serviceURLProd': ['',[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
          'serviceNameInputProd': [''],
          'serviceNameInputProd2': [''],
          'prodFile1': [''],
          'uatFile2': [''],
          'prodFile2': [''],
          'serviceTimeOutUAT2':[''],
          'serviceURLUAT2':[],
          'serviceTimeOutProd2':[''],
          'serviceURLProd2':[''],
          // 'messageFormat': [''],
          // 'uatPayUpdateURL': [''],
          // 'uatCustValidationURL': [''],
          // 'uatPaymentStat': [''],
          // 'checksumReq': [''],
          // 'liveCustValidationURL': [''],
          // 'livePaymentStat': [''],
          // 'uatURL1': [''],
          // 'uatURL2': [''],
          // 'prodURL1': [''],
          // 'prodURL2': [''],
          // 'eodMISValue':['']
      })
    }
      else {
      this.addRegisterData = this.fb.group({
        // 'emails': this.fb.array([
        //     this.addbusinessEmail()
        // ]),
        'organization': ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&']+$/)]],
        'iciciAccNo': ['',[Validators.required,Validators.pattern(/^[0-9]{12}$/)]],
        'accountManagerName': ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
        'mobileNumberAM': ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
        'emailIdAM': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
        'firstNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        'lastNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        'mobileNumberBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        'emailIdBusinessSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
        'firstNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        'lastNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        'mobileNumberITSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        'emailIdITSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
        'webServiceType': [''],
        'communicationProtocol': [''],
        'checksumControl': [''],
        'encryptionMethod': [''],
        'hostNameUat': ['',[Validators.required,Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
        'uatIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
        'uatPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
        'httpCertificate': [''],
        'serviceTimeOutUAT': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
        'serviceURLUAT': ['',[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
        'serviceNameInputUAT': [''],
        'uatFile1': [''],
        'retryAttempts': [''],
        'actionOnNoRes': [''],
        'hostNameProd': ['',[Validators.required,Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
        'prodIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
        'prodPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
        'httpProdCertificate': [''],  
        'serviceTimeOutProd': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
        'serviceURLProd': ['',[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
        'serviceNameInputProd': [''],
        'prodFile1': [''],
        // 'messageFormat': [''],
        // 'uatPayUpdateURL': [''],
        // 'uatCustValidationURL': [''],
        // 'uatPaymentStat': [''],
        // 'checksumReq': [''],
        // 'liveCustValidationURL': [''],
        // 'livePaymentStat': [''],
        // 'uatURL1': [''],
        // 'uatURL2': [''],
        // 'prodURL1': [''],
        // 'prodURL2': [''],
        // 'eodMISValue':['']
    })
  }
    } else {
      this.addRegisterData = this.fb.group({
        // 'emails': this.fb.array([
        //     this.addbusinessEmail()
        // ]),
        'organization': ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9][ a-zA-Z0-9&']+$/)]],
        'iciciAccNo': ['',[Validators.required,Validators.pattern(/^[0-9]{12}$/)]],
        'accountManagerName': ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,}$/)]],
        'mobileNumberAM': ['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],
        'emailIdAM': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
        'firstNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        'lastNameBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        'mobileNumberBusinessSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        'emailIdBusinessSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
        'firstNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        'lastNameITSpoc': ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2,}$/)]],
        'mobileNumberITSpoc': ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        'emailIdITSpoc': ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9]([a-zA-Z0-9_\.]{1,})?[a-zA-Z0-9])@([a-zA-Z0-9]([a-zA-Z0-9\-]{1,})?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,4})?$/)]],
        'webServiceType': [''],
        'isure_communication_protocol': [''],
        'checksumControl': [''],
        'encryptionMethod': [''],
        'txnPerday': [''],
        'reqParameter': [''],
        'hostNameUat': ['',[Validators.required,Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
        'uatIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
        'uatPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
        'httpCertificate': [''],
        'serviceTimeOutUAT': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
        'serviceURLUAT': ['',[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
        'serviceNameInputUAT1': [''],
        'uatFile1': [''],
        'serviceNameInputUAT2': [''],
        'uatFile2': [''],
        'hostNameProd': ['',[Validators.required,Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
        'prodIp': ['', [Validators.required,Validators.pattern(/^\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b$/)]],
        'prodPort': ['443', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
        'httpProdCertificate': [''],
        'serviceTimeOutProd': ['',[Validators.pattern(/^[0-9]{0,}$/)]],
        'serviceURLProd': ['',[Validators.pattern(/^(https?:\/\/(?:www\.|(?!www))+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/)]],
        'serviceNameInputProd1': [''],
        'prodFile1': [''],
        'serviceNameInputProd2': [''],
        'prodFile2': [''],
        // changes
        'serviceTimeOutUAT2':[],
        'serviceURLUAT2':[],
        'serviceTimeOutProd2':[],
        'serviceURLProd2':[],
        
    })
    }
    this.addRegisterData.controls["uatPort"].setValue(
      '443'
  );
  }
  webServiceTypeFunction(value) {
    //   console.log("value--------", value);

      if (value == "SOAP Web Service") {
          this.communicationProtocolArrayUat = [{
              name: "HTTP",
              value: "POST"
          }]
      } else if (value == "REST API - JSON" || value == "REST API - XML") {
          this.communicationProtocolArrayUat = [{
                  name: "POST",
                  value: "POST"
              },

              {
                  name: "GET",
                  value: "GET"
              }
          ]
      }

  }

  noAccountSubmission(details) {
      alert("Thank You for Subscription.This information will help for Lead Generation !");
    //   console.log("data", details);
  }

  submitDetails(details) {
console.log('details',details);
      alert("Subscription Submitted Successfully!");
    //   console.log("details", details);
      this.dataForRegister = {
          'firstName': details.firstName,
          'lastName': details.lastName,
          'organisation': details.organization,
          'email': details.email,
          'phoneNumber': details.phoneno,
          'have_an_ICICI_account': this.radioVal,
          'bankAccountNumber': details.iciciAccNo,
          'poolAccountNumber': details.poolAccNo
      }
    //   console.log("details.email-----", details.emails);
    //   console.log("emails length ====>", details.emails.length)
      //changes made on 2-Nov
      // if (details.emails.length) {
      //     for (var i = 0; i < details.emails.length; i++) {
      //         if (details.emails[i].email == '') {
      //             details.emails.splice(i, 1);
      //         }
      //     }
      // }
    //   console.log("details.email-----", details.emails);
      if (this.summaryProductName === "eCollections") {
        this.dataForProject = {
              "products": [{
                  "productId": this.productValue.productId,
                  "services": [{
                      "serviceId": this.selectedIndex1,
                      "webServiceType": details.webServiceType,
                      "communicationProtocol": details.communicationProtocol,
                      "emails": details.emails,
                      "httpCertificate": details.httpCertificate,
                      "encryptionMethod": details.encryptionMethod,
                      "checksumControl": details.checksumControl,
                      "uatIp": details.uatIp,
                      "uatPort": details.uatPort,
                      "uatSecret": details.uatSecret,
                      "uatUsername": details.uatUsername,
                      "uatPassword": details.uatPassword,
                      "retryAttempts": details.retryAttempts,
                      "actionOnNoRes": details.actionOnNoRes,
                      "prodIp": details.prodIp,
                      "prodUsername": details.prodUsername,
                      "prodPort": details.prodPort,
                      "prodSecret": details.prodSecret,
                      "prodPassword": details.prodPassword,
                      "uatFile1": details.uatFile1,
                      "uatFile2": details.uatFile2,
                      "prodFile1": details.prodFile1,
                      "prodFile2": details.prodFile2,
                      "uatURL1": details.uatURL1,
                      "uatURL2": details.uatURL2,
                      "prodURL1": details.prodURL1,
                      "prodURL2": details.prodURL2,
                      "hostNameUat": details.hostNameUat,
                      "hostNameProd": details.hostNameProd,
                      'serviceNameInputUAT': details.serviceNameInputUAT,
                      'serviceNameInputProd': details.serviceNameInputProd,
                      'serviceURLUAT': details.serviceURLUAT,
                      'serviceTimeOutUAT': details.serviceTimeOutUAT,
                      'serviceURLProd': details.serviceURLProd,
                      'serviceTimeOutProd': details.serviceTimeOutProd,
                      'serviceTimeOutUAT2':details.serviceTimeOutUAT2,
                      'serviceNameInputProd2': details.serviceNameInputProd2,
                      'serviceURLUAT2':details.serviceURLUAT2,
                      'serviceTimeOutProd2':details.serviceTimeOutProd2,
                      'serviceURLProd2':details.serviceURLProd2,
                  }]
              }],
              "productName": this.productValue.productName,
              // "version": details.appVersion,
              // "username": details.username,
              "orgName": details.organization
          }
      } else if (this.productValue.productName === "iSurePay") {

          this.dataForProject = {
              "products": [{
                  "productId": this.productValue.productId,
                  "ackReciept": details.ackReciept,
                  "modeOffered": details.modeOffered,
                 
                 
                  "amountField": details.amountField,
                  "services": [{
                    "txnPerday": details.txnPerday,
                    'hostNameUat':details.hostNameUat,
                    "reqParameter": details.reqParameter,
                      "serviceId": this.selectedIndex1,
                      "webServiceType": details.webServiceType,
                      "messageFormat": details.messageFormat,
                      "emails": details.emails,
                      "encryptionMethod": details.encryptionMethod,
                      "uatIp": details.uatIp,
                      "uatPort": details.uatPort,
                      "checksumControl": details.checksumControl,
                      "httpCertificate": details.httpCertificate,
                      "uatPayUpdateURL": details.uatPayUpdateURL,
                      "uatCustValidationURL": details.uatCustValidationURL,
                      "uatPaymentStat": details.uatPaymentStat,
                      'isure_communication_protocol':details.isure_communication_protocol,
                      "prodIp": details.prodIp,
                      'methodType':this.valueD,
                      "prodPort": details.prodPort,
                      "livePayUpdateURL": details.livePayUpdateURL,
                      "liveCustValidationURL": details.liveCustValidationURL,
                      "livePaymentStat": details.livePaymentStat,
                      "uatFile1": details.uatFile1,
                      "uatFile2": details.uatFile2,
                      "prodFile1": details.prodFile1,
                      "prodFile2": details.prodFile2,
                      "uatURL1": details.uatURL1,
                      "uatURL2": details.uatURL2,
                      "prodURL1": details.prodURL1,
                      "prodURL2": details.prodURL2,
                      "communicationProtocolProduction": this.communicationProtocolProduction,
                      'serviceNameInputUAT': details.serviceNameInputUAT,
                      'serviceURLUAT': details.serviceURLUAT,
                      'serviceTimeOutUAT': details.serviceTimeOutUAT,
                      'serviceNameInputProd': details.serviceNameInputProd,
                      'serviceURLProd': details.serviceURLProd,
                      'serviceTimeOutProd': details.serviceTimeOutProd,
                      'serviceTimeOutUAT2':details.serviceTimeOutUAT2,
              'serviceURLUAT2':details.serviceURLUAT2,
           'serviceNameInputUAT2':details.serviceNameInputUAT2,
        'serviceTimeOutProd2':details.serviceTimeOutProd2,
        'serviceURLProd2':details.serviceURLProd2,
                  }]
              }],
              "productName": this.productValue.productName,
              "orgName": details.organization
          }
      }
      console.log("this.data", this.dataForProject);

      this.appservice.projectData(this.dataForProject).then((data) => {
        //   console.log("data of project", data);
          this.projectId = data["projectId"];
        //   console.log("projectId---------->", this.projectId);


          this.dataForRegister = {
              'organisation': details.organization,
              'email': details.emailIdBusinessSpoc,
              'username': details.emailIdBusinessSpoc,
              'have_an_ICICI_account': this.radioVal,
              'bankAccountNumber': details.iciciAccNo,
              'poolAccountNumber': details.poolAccNo,
              'projectId': this.projectId,
              'productName': this.productValue.productName,
              'serviceName': this.summaryServiceName,
              'firstNameBusinessSpoc': details.firstNameBusinessSpoc,
              'lastNameBusinessSpoc': details.lastNameBusinessSpoc,
              'mobileNumberBusinessSpoc': details.mobileNumberBusinessSpoc,
              'emailIdBusinessSpoc': details.emailIdBusinessSpoc,
              'firstNameITSpoc': details.firstNameITSpoc,
              'lastNameITSpoc': details.lastNameITSpoc,
              'mobileNumberITSpoc': details.mobileNumberITSpoc,
              'emailIdITSpoc': details.emailIdITSpoc,
              'businessSpocUsername': details.emailIdBusinessSpoc,
              'itSpocUsername': details.emailIdITSpoc,
              'accountManagerName':details.accountManagerName,
              'mobileNumberAM':details.mobileNumberAM,
              'emailIdAM':details.emailIdAM
          }
        //   console.log("this.dataforRegister", this.dataForRegister);
          this.appservice.registerData(this.dataForRegister).then((data) => {
            //   console.log("Inside register data api call---", data);
              if (this.flowName === "ECollection with Two Level Validation at Bank and Client’s End" || this.productName === "iSurePay") {
                  const formData1: any = new FormData();
                //   console.log("in isurePay------------------");
                  const formData2: any = new FormData();
                  var fileInformation = {
                      docPath: '/Confirmation/' + this.projectId + '/',
                      projectId: this.projectId,
                      docName: this.uatFile1.name,
                      orgName: details.organization,
                      username: details.email
                  }
                  formData1.append("files", this.uatFile1);
                  this.appservice.uploadFile(this.projectId, formData1).then((data) => {
                    //   console.log("file 1---------------", this.uatFile1)
                    //   console.log("data of file", data);

                      var fileInformation = {
                          docPath: '/Verification/',
                          projectId: this.projectId,
                          docName: this.uatFile1.name,
                          orgName: details.organization,
                          username: details.email

                      }
                    //   console.log("file 2---------------", this.uatFile2)
                      formData2.append("files", this.uatFile2);
                      this.appservice.uploadFile(this.projectId, formData2).then((data) => {
                        //   console.log("data of file", data);
                      })
                  })
                  if (this.prodFile1 === "" && this.prodFile2 === "") {

                  } else {
                      formData1.append("files", this.prodFile1);
                      this.appservice.uploadFile(this.projectId, formData1).then((data) => {
                        //   console.log("file 1---------------", this.prodFile1)
                        //   console.log("data of file", data);
                          var fileInformation = {
                              docPath: '/Verification/',
                              projectId: this.projectId,
                              docName: this.uatFile1.name,
                              orgName: details.organization,
                              username: details.email

                          }
                        //   console.log("file 2---------------", this.prodFile2)
                          formData2.append("files", this.prodFile2);
                          this.appservice.uploadFile(this.projectId, formData2).then((data) => {
                            //   console.log("data of file", data);
                          })
                      })
                  }
              } else {
                  const formData: any = new FormData();
                  formData.append('files', this.uatFile1);
                //   console.log("this.proejctId", this.projectId);
                  this.appservice.uploadFile(this.projectId, formData).then((data) => {
                    //   console.log("data of file", data);
                  })
                  if (this.prodFile1 === "") {

                  } else {
                      const formData: any = new FormData();
                      formData.append('files', this.prodFile1);
                    //   console.log("this.proejctId", this.projectId);
                      this.appservice.uploadFileProd(this.projectId, formData).then((data) => {
                        //   console.log("data of file", data);
                      })
                  }
              }

              // })
          })
      })
    //   this.dataOfApproval = {
    //     projectId: this.projectId,
    //     makerApproval: "",
    //     status: "API Specification Uploaded",
    //     username: details.emailIdBusinessSpoc,
    //     createdBy: details.emailIdBusinessSpoc,
    //     clientCodeProfund: details.clientCodeProfund,
    //     formatCodeProfund: details.formatCodeProfund,
    //     clientCodeIPS: details.clientCodeIPS,
    //     formatCodeIPS: details.formatCodeIPS,
    //     orgName: details.organization,
    //     IFSCCode: details.IFSCCode,
    //     enableTransactionReversalFileProcessing: "",
    //     enableEODMISforthisClient: ""
    // };
    // console.log("Importatnt Object for status update--->", this.dataOfApproval);

    // this.appservice.approveUser(this.dataOfApproval).then(async (data) => {
    //     console.log("final output for first ever status update :", data);

    // })
      this.router.navigate(['/authentication/Home']);
  }
  selected(methodType) {
    //   console.log(`method ------${methodType}`);
  }
  methodProdType(value) {
    //   console.log(`method ------${value}`);
      this.communicationProtocolProduction = value
      if (value == 'HTTP') {
          this.disableInput = true
      } else {
          this.disableInput = false

      }
  }
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
  onSelect(checkedValue, id) {
    //   console.log("Testing arguments passed in onSelect method--", id);
    //   console.log("Value--------> ", checkedValue.type);
    //   console.log("ID1---------->", id, checkedValue.target.value)
      this.checkedId = id;
      this.radioVal = checkedValue.target.value;
    //   console.log("ID--------------------->", this.radioVal)
  }
  interaccval(interacc){
    // taking value of interacc number
  //  console.log(interacc) 
   this.interacc =interacc
  }
  originalaccval(ogacc){
    // console.log(ogacc)
    // taking value of originalacc number

    this.ogacc=ogacc;
   
 }
  accCheck(){
     //checking both account number
    //  console.log(this.interacc)
    //  console.log(this.ogacc)
     
    if(this.interacc===this.ogacc){
    
      //newerr is for setting errors
      this.newerr=true;
      
      
    }
    else{
      this.newerr=false;
      
    }
   }

   portRange(pno){
    
    //to check reserved port number
    // console.log(pno)
    if((pno >= 8050) && (pno <= 8150) ){
      // console.log("error")
      this.porterr=true;


    }
    else{
      this.porterr=false;
      
    }
    
   }


}