import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Pipe, PipeTransform } from '@angular/core';
import * as jspdf from 'jspdf';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { mapping2Service } from './../mapping2/mapping2.service'
import 'jspdf-autotable';
import { config } from "config";


@Component({
  selector: 'app-mapping4',
  templateUrl: './mapping4.component.html',
  styleUrls: ['./mapping4.component.css'],
  providers: [mapping2Service]
})
export class Mapping4Component implements OnInit {


  source = [];
  requestData = [];
  requestDataSource = [];
  requestDataTarget = [];
  //file
  targetFileName;
  sourceFileName;
  //pagination
  p: number = 1;
  //Add Data
  addModalData: FormGroup

  itemsForUrgency = ['Optional', 'Mandatory'];
  dataTypeValue = [];

  //Edit Data
  editModalData: FormGroup
  editParameter;
  sourceNameEdit;
  sfieldNameEdit;
  sdataTypeEdit;
  targetNameEdit;
  tfieldNameEdit;
  tdataTypeEdit;
  urgencyNameEdit;
  descriptionNameEdit;
  targetMethod;
  sourceMethod;
  //Reset
  resetButtonClick;
  resetButtonId;
  resetId

  //Target Data
  targetProjectId
  fileDataByProjectId = [];
  targetPath
  fields = [];
  levelFieldKey = [];
  levelFieldKeyNested = [];
  extractedData = {};
  combinedDataAfterExtraction = [];
  splitData = [];
  sourceFlowId;
  fileDataByFlowId;
  sourcePath;
  sourceFields
  extractedDataSource
  combinedDataAfterExtractionSource = [];
  splitDataSource
  demoArray = [];
  onClickData;
  targetName;
  fieldsSource;
  filedsTarget;
  dataForEsql = [];
  valueForEsqlSource;
  valueForEsqlTarget;
  jsonStructure = [];
  dataWithNoDirectRow = [];

  //Response

  resetButtonClickResponse
  resetButtonIdResponse
  targetNameResponse
  onClickDataResponse
  resetIdResp
  responseDataForResponse = [];
  editParameterResp
  sourceNameEditResp
  sfieldNameEditResp
  sdataTypeEditResp
  targetNameEditResp
  tfieldNameEditResp
  tdataTypeEditResp
  urgencyNameEditResp
  descriptionNameEditResp


  //phase 1

  projectIdData = [];
  requestDataICICI = [];
  responseDataICICI = [];
  sourceFieldsResponse
  extractedDataSourceResponse
  combinedDataAfterExtractionSourceResponse = [];

  responseDataSource = [];
  responseDataTarget = []
  outputData = [];
  responseData = [];
  dataWithDirectRowNo = [];
  finalDataForEsql = {};


  //yaml request
  requestDataFiltered = [];
  requestLayout = [];
  requestProperty = [];
  requestPropertyNonArray = [];
  requestExtraction = [];
  requestPropNonArray2 = []
  finalRequest = []
  finalRequestWithoutArray = [];
  finalRequestLayout = {}
  finalRequest2 = [];





  //yaml response
  responseDataFiltered = [];
  responseLayout = [];
  responseProperty = [];
  responsePropertyNonArray = [];
  responseExtraction = [];
  responsePropNonArray2 = []
  responseRequest = []
  finalResponseWithoutArray = [];
  finalResponseLayout = {}
  finalResponse2 = [];
  finalResponse = {};

  //modal
  descriptionNameRequest
  descriptionNameResponse
  fsizeICICIRequest
  dataTypeICICIRequest
  descriptionICICIRequest
  dataTypeClientRequest
  dataTypeClientResponse
  dataTypeICICIResponse
  fsizeICICIResponse
  urgencyNameICICIResponse


  //ngOnInit
  projectId
  url

  requestDataBefore = [];
  responseDataBefore = [];


  //PART - 2/ FILE -2

  requestData2Before = [];
  responseData2Before = [];
  // source = [];
  requestData2 = [];
  requestDataSource2 = [];

  sourceMethod2;


  fileDataByProjectId2 = [];

  splitData2 = [];

  sourcePath2;
  sourceFields2
  extractedDataSource2
  combinedDataAfterExtractionSource2 = [];

  dataForEsql2 = [];
  fieldDefinitionsResponse2 = [];
  dataForEsqlResponse2 = [];
  dataForEsqlResponse2FundTransfer = [];
  dataWithNoDirectRow2 = [];
  dataForEsqlRequest2 = [];
  fieldDefinitionsRequest2 = [];



  //Response

  resetButtonClickResponse2


  requestDataICICI2 = [];
  responseDataICICI2 = [];
  sourceFieldsResponse2
  extractedDataSourceResponse2
  combinedDataAfterExtractionSourceResponse2 = [];

  responseDataSource2 = [];
  responseDataTarget2 = []
  // outputData = [];
  responseData2 = [];
  dataWithDirectRowNo2 = [];
  finalDataForEsql2 = {};
  finalDataForEsql2FundTransfer = {};


  fieldDefinitionsResponse = [];
  dataForEsqlResponse = [];
  //yaml request
  requestDataFiltered2 = [];
  requestLayout2 = [];
  requestProperty2 = [];
  requestPropertyNonArray2 = [];
  requestExtraction2 = [];
  requestPropNonArray22 = []
  finalRequest12 = []
  finalRequestWithoutArray2 = [];

  finalRequest22 = [];
  fieldDefinitionsRequest = [];



  //yaml response
  responseDataFiltered2 = [];
  responseLayout2 = [];
  responseProperty2 = [];
  responsePropertyNonArray2 = [];
  responseExtraction2 = [];
  responsePropNonArray22 = []

  finalResponseWithoutArray2 = [];
  finalResponse22 = [];
  finalResponse12 = {};

  //modal

  descriptionNameResponse2
  fsizeICICIRequest2
  dataTypeICICIRequest2
  descriptionICICIRequest2
  dataTypeClientRequest2
  dataTypeClientResponse2
  dataTypeICICIResponse2
  fsizeICICIResponse2
  urgencyNameICICIResponse2
  productName;
  serviceName;
  username;
  organisation;
  clientCode;
  webServiceType;
  serviceUrl;
  poolAccountNumber;
  ifscCode;


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

  navbarOpen = false;

  serviceId;
  clientCodeIPS;
  clientCodeProfunds;
  txnReversal;


  constructor(private mapping4Service: mapping2Service, private modalService: NgbModal,
    private fb: FormBuilder, private router: Router, private http: HttpClient,
    private _route: ActivatedRoute, public toastr: ToastrService) { }

  // ngOnInit() {

  //  /
  //   // this.projectId = "ProjectID156";
  //   // //temporary
  //   // this.getClientFileService(this.projectId);
  //   this.getICICIRequestResponseData2();
  //   //temporary


  //   this._route.params.subscribe((params) => {

  //     this.projectId = params['projectId'];

  //     this.productName = params["productName"];
  //     this.serviceName = params["serviceName"];
  //     this.username = params['username'];
  //     this.organisation = params['org']
  //     this.clientCode = params['clientCode']
  //     this.webServiceType = params['webServiceType'];
  //     this.serviceUrl = params['serviceUrl']
  //     this.poolAccountNumber = params['accountNumber'];
  //     this.ifscCode = params['ifscCode'];


  //     this.getClientFileService(this.projectId);
  //     this.getClientFileService2(this.projectId);
  //   })
  // }

  ngOnInit() {

    console.log("---------- Mapping 2 values----------")
    this.requestData2Before = [];
    this.responseData2Before = [];
    this.requestDataBefore = [];
    this.responseDataBefore = [];
    this.getICICIRequestResponseData();
    this.getICICIRequestResponseData2();
    this.projectId = localStorage.getItem("projectId");



    // this.getICICIRequestResponseData();
    this.mapping4Service.getProjectData(this.projectId).then((data) => {
      console.log("Mapping getProjectData = ", data)
      this.productName = data[0].productName
      this.serviceId = data[0].products[0].services[0].serviceId;
      this.webServiceType = data[0].products[0].services[0].webServiceType;
      this.serviceUrl = data[0].products[0].services[0].serviceURLUAT

      console.log("this.webServiceType = ", this.webServiceType)
      this.mapping4Service.getServiceDetails(this.serviceId).then((data) => {
        this.serviceName = data[0].serviceName;
        // console.log("Mapping getServiceDetails = ", data);
        // console.log("this.serviceName", this.serviceName);

        this.mapping4Service.getUserDetails().then((data) => {

          console.log("getUserDetails() = ", data)
          for (var i = 0; i < data.length; i++) {
            if (this.projectId == data[i].projectId) {

              console.log("data[i] = ", data[i])
              this.mapping4Service.getUserDataByName(data[i].username).then((data) => {
                console.log("getUserDataByName = ", data);

                this.username = data[0].username;
                this.organisation = data[0].organisation;

                this.clientCodeIPS = data[0].clientCodeIPS;

                this.clientCodeProfunds = data[0].clientCodeProfund;

                this.txnReversal = data[0].enableTransactionReversalFileProcessing;

                this.poolAccountNumber = data[0].poolAccountNumber;

                this.ifscCode = data[0].ifscCode;

                if (this.clientCodeIPS != undefined) {
                  this.clientCode = this.clientCodeIPS;
                }
                else if (this.clientCodeProfunds != undefined) {
                  this.clientCode = this.clientCodeProfunds;
                }

                console.log("this.projectId = ", this.projectId);
                console.log(" this.productName = ", this.productName)
                console.log("this.serviceName = ", this.serviceName)
                console.log("this.username = ", this.username)
                console.log("this.organisation = ", this.organisation)
                console.log("this.poolAccountNumber = ", this.poolAccountNumber)
                console.log("this.ifscCode = ", this.ifscCode)
                console.log("Mapping 2 clientCode = ", this.clientCode)
                console.log(" this.serviceUrl = ", this.serviceUrl)

                this.getClientFileService(this.projectId);
                this.getClientFileService2(this.projectId);

              })
            }
          }
        })
      })
    })

  }
  getICICIRequestResponseData() {
    console.log("Inside getICICIRequestResponseData")
    var service = "ECollection with Two Level Validation at Bank and Client’s End"
    this.mapping4Service.getMappingSourceData(service).then((data) => {
      console.log("Data = ", data);
      this.requestDataICICI = data[0].request;
      this.responseDataICICI = data[0].response


    })
  }
  /**
      * @author Sucheta
      * @param flowId
      * @description This function is called for the source value
      */

  getClientFileService(projectId) {

    //Actual

    this.mapping4Service.getFileDataByProjectId(projectId).then(async (data) => {
      console.log("this.getFileDataByProjectId", data);
      this.fileDataByProjectId.push(data[0])
      await this.segregateSourceRequestData(this.fileDataByProjectId)
      await this.segregateSourceResponseData(this.fileDataByProjectId)

    })

  }


  /**
     * @author Sucheta
     * @param sourceArray
     * @description This function is called to segregate the sourceArray Data
     */

  segregateSourceRequestData(sourceRequestArray) {
    console.log("sourceRequestArray = ", sourceRequestArray)
    console.log("============== Inside Source segregate Client RequestData =============")
    var dataLength = sourceRequestArray.length;
    console.log("dataLength = ", dataLength)

    for (var h = 0; h < dataLength; h++) {
      var operationsLength = sourceRequestArray[h].operations.length
      for (var j = 0; j < operationsLength; j++) {
        this.sourceMethod = sourceRequestArray[h].operations[j].method
        this.sourcePath = sourceRequestArray[h].operations[j].path

        console.log(" this.sourcePath = ", this.sourcePath)
        this.sourceFields = sourceRequestArray[h].operations[j].fields
        console.log("fields = ", this.sourceFields)
        for (var k = 0; k < this.sourceFields.length; k++) {


          console.log("========== abc ===========")

          this.extractedDataSource = this.nestedSegregationSource(this.sourceFields[k]);

          // var commaData = this.splitComma(this.extractedData);

          var keyData = Object.keys(this.extractedDataSource);
          var valueData = Object.values(this.extractedDataSource)
          console.log("keyData = ", keyData)
          console.log("valueData = ", valueData)


          for (var w = 0; w < keyData.length; w++) {
            this.combinedDataAfterExtractionSource.push({ key: keyData[w], value: valueData[w] })
          }
          console.log(" this.combinedDataAfterExtraction = ", this.combinedDataAfterExtractionSource)

        }
        var inc = 1;
        for (var q = 0; q < this.combinedDataAfterExtractionSource.length; q++) {

          var x = this.combinedDataAfterExtractionSource[q].key;
          var splitted = x.split(".");
          console.log(" ------- splitted --------- = ", splitted)
          var splitLength = splitted.length
          if (splitted[splitLength - 1] == "type") {

            this.splitData.push(splitted[splitLength - 2])

            this.requestDataSource.push({
              id: inc, sourceName: this.sourcePath, sfieldName: splitted[splitLength - 2],
              sdataType: this.combinedDataAfterExtractionSource[q].value
            })
            inc++;
          }

        }
        console.log("(((((((  this.requestDataSource", this.requestDataSource);
        this.requestDataBefore = this.sortSourceTargetData(this.requestDataSource, this.requestDataICICI)
      }

    }

    this.requestData = this.removeDup(this.requestDataBefore);

    console.log("-------  LAST requestData Data = ", this.requestData)
  }


  /**
   * @author : Suucheta A Shrivastava
   * @description : Remove duplicates
   * @param Array
   */

  removeDup(something) {
    return something.reduce(function (prev, ele) {
      var found = prev.find(function (fele) {
        return ele.sfieldName === fele.sfieldName && ele.sdataType === fele.sdataType;
      });
      if (!found) {
        prev.push(ele);
      }
      return prev;
    }, []);
  }

  /**
      * @author : Sucheta
      * @param data
      * @description: This function consist code of flatten the json
      */
  segregateSourceResponseData(sourceResponseArray) {

    console.log("============== segregateSourceResponseData=============")
    var dataLength = sourceResponseArray.length;
    console.log("dataLength = ", dataLength)

    for (var h = 0; h < dataLength; h++) {
      var responsesLength = sourceResponseArray[h].operations.length
      for (var j = 0; j < responsesLength; j++) {
        // this.sourceMethod = sourceResponseArray[h].operations[j].method
        // this.sourcePath = sourceResponseArray[h].operations[j].path
        // this.projectIdData[0].operations[0].responses[0]['200']
        // this.sourceMethod = "post"
        // this.sourcePath = "/trasaction";

        // console.log(" this.sourcePath = ", this.sourcePath)

        this.sourceFieldsResponse = sourceResponseArray[h].operations[j].responses
        // console.log("responses = ", this.sourceFieldsResponse)
        for (var k = 0; k < this.sourceFieldsResponse.length; k++) {


          console.log("========== koue ===========")
          var key = Object.keys(this.sourceFieldsResponse[k]);
          // console.log ()
          // this.extractedDataSourceResponse = this.nestedSegregationSource(this.sourceFieldsResponse[k][key[0]]);
          this.extractedDataSourceResponse = this.nestedSegregationSource(this.sourceFieldsResponse[k]);

          // var commaData = this.splitComma(this.extractedData);

          var keyData = Object.keys(this.extractedDataSourceResponse);
          var valueData = Object.values(this.extractedDataSourceResponse)
          console.log("keyData = ", keyData)
          console.log("valueData = ", valueData)


          for (var w = 0; w < keyData.length; w++) {
            this.combinedDataAfterExtractionSourceResponse.push({ key: keyData[w], value: valueData[w] })
          }
          console.log(" this.combinedDataAfterExtractionSource Response = ", this.combinedDataAfterExtractionSourceResponse)

        }
        var inc = 1;
        for (var q = 0; q < this.combinedDataAfterExtractionSourceResponse.length; q++) {

          var x = this.combinedDataAfterExtractionSourceResponse[q].key;
          var splitted = x.split(".");
          // console.log(" ------- splitted --------- = ", splitted)
          var splitLength = splitted.length
          if (splitted[splitLength - 1] == "type") {

            this.splitData.push(splitted[splitLength - 2])

            this.responseDataSource.push({
              id: inc, sourceName: this.sourcePath, sfieldName: splitted[splitLength - 2],
              sdataType: this.combinedDataAfterExtractionSourceResponse[q].value
            })
            inc++;
          }

        }
        console.log("responseDataSource = ", this.responseDataSource);
        this.responseDataBefore = this.sortSourceTargetData(this.responseDataSource, this.responseDataICICI)
      }

    }

    this.responseData = this.removeDup(this.responseDataBefore)


    console.log("-------  LAST response Data = ", this.responseData)
  }

  /**
       * @author Sucheta
       * @description This function is called for the icici values
       */
  getICICIRequestResponseData2() {
    console.log("Inside getICICIRequestResponseData2")
    var service = "ECollection with Two Level Validation at Bank and Client’s End"
    this.mapping4Service.getMappingSourceData(service).then((data) => {
      console.log("Data = ", data);
      this.requestDataICICI2 = data[0].request;
      this.responseDataICICI2 = data[0].response


    })
  }
  /**
      * @author Sucheta
      * @description This function is called for the client values
      */

  getClientFileService2(projectId) {

    //Actual

    this.mapping4Service.getFileDataByProjectId(projectId).then(async (data) => {
      console.log("this.getFileDataByProjectId", data);
      this.fileDataByProjectId2.push(data[1])
      await this.segregateSourceRequestData2(this.fileDataByProjectId2)
      await this.segregateSourceResponseData2(this.fileDataByProjectId2)

    })

  }


  /**
     * @author Sucheta
     * @param sourceArray
     * @description This function is called to segregate the sourceArray Data
     */

  segregateSourceRequestData2(sourceRequestArray) {

    console.log("sourceRequestArray = ", sourceRequestArray)
    console.log("============== Inside Source segregate Client RequestData 2=============")
    var dataLength = sourceRequestArray.length;
    console.log("dataLength = ", dataLength)

    for (var h = 0; h < dataLength; h++) {
      var operationsLength = sourceRequestArray[h].operations.length
      for (var j = 0; j < operationsLength; j++) {
        this.sourceMethod2 = sourceRequestArray[h].operations[j].method
        this.sourcePath2 = sourceRequestArray[h].operations[j].path

        console.log(" this.sourcePath2 = ", this.sourcePath2)
        this.sourceFields2 = sourceRequestArray[h].operations[j].fields
        console.log("fields = ", this.sourceFields2)
        for (var k = 0; k < this.sourceFields2.length; k++) {


          console.log("========== abc ===========")

          this.extractedDataSource2 = this.nestedSegregationSource(this.sourceFields2[k]);

          // var commaData = this.splitComma(this.extractedData);

          var keyData = Object.keys(this.extractedDataSource2);
          var valueData = Object.values(this.extractedDataSource2)
          console.log("keyData = ", keyData)
          console.log("valueData = ", valueData)


          for (var w = 0; w < keyData.length; w++) {
            this.combinedDataAfterExtractionSource2.push({ key: keyData[w], value: valueData[w] })
          }
          console.log(" this.combinedDataAfterExtraction = ", this.combinedDataAfterExtractionSource2)

        }
        var inc = 1;
        for (var q = 0; q < this.combinedDataAfterExtractionSource2.length; q++) {

          var x = this.combinedDataAfterExtractionSource2[q].key;
          var splitted = x.split(".");
          console.log(" ------- splitted --------- = ", splitted)
          var splitLength = splitted.length
          if (splitted[splitLength - 1] == "type") {

            this.splitData2.push(splitted[splitLength - 2])

            this.requestDataSource2.push({
              id: inc, sourceName: this.sourcePath2, sfieldName: splitted[splitLength - 2],
              sdataType: this.combinedDataAfterExtractionSource2[q].value
            })
            inc++;
          }

        }
        console.log("(((((((  this.requestDataSource2", this.requestDataSource2);
        this.requestData2Before = this.sortSourceTargetData(this.requestDataSource2, this.requestDataICICI2)
      }

    }

    this.requestData2 = this.removeDup(this.requestData2Before);

    console.log("-------  LAST requestData2 Data = ", this.requestData2)
  }


  /**
      * @author : Sucheta
      * @param data
      * @description: This function consist code of flatten the json
      */
  segregateSourceResponseData2(sourceResponseArray) {

    console.log("============== segregateSourceResponseData=============")
    var dataLength = sourceResponseArray.length;
    console.log("dataLength = ", dataLength)

    for (var h = 0; h < dataLength; h++) {
      var responsesLength = sourceResponseArray[h].operations.length
      for (var j = 0; j < responsesLength; j++) {
        // this.sourceMethod2 = sourceResponseArray[h].operations[j].method
        // this.sourcePath2 = sourceResponseArray[h].operations[j].path
        // this.projectIdData[0].operations[0].responses[0]['200']
        // this.sourceMethod2 = "post"
        // this.sourcePath2 = "/trasaction";

        // console.log(" this.sourcePath2 = ", this.sourcePath2)

        this.sourceFieldsResponse2 = sourceResponseArray[h].operations[j].responses
        // console.log("responses = ", this.sourceFieldsResponse2)
        for (var k = 0; k < this.sourceFieldsResponse2.length; k++) {


          console.log("========== koue ===========")
          var key = Object.keys(this.sourceFieldsResponse2[k]);
          // console.log ()
          // this.extractedDataSourceResponse2 = this.nestedSegregationSource(this.sourceFieldsResponse2[k][key[0]]);
          this.extractedDataSourceResponse2 = this.nestedSegregationSource(this.sourceFieldsResponse2[k]);

          // var commaData = this.splitComma(this.extractedData);

          var keyData = Object.keys(this.extractedDataSourceResponse2);
          var valueData = Object.values(this.extractedDataSourceResponse2)
          console.log("keyData = ", keyData)
          console.log("valueData = ", valueData)


          for (var w = 0; w < keyData.length; w++) {
            this.combinedDataAfterExtractionSourceResponse2.push({ key: keyData[w], value: valueData[w] })
          }
          console.log(" this.combinedDataAfterExtractionSource2 Response = ", this.combinedDataAfterExtractionSourceResponse2)

        }
        var inc = 1;
        for (var q = 0; q < this.combinedDataAfterExtractionSourceResponse2.length; q++) {

          var x = this.combinedDataAfterExtractionSourceResponse2[q].key;
          var splitted = x.split(".");
          // console.log(" ------- splitted --------- = ", splitted)
          var splitLength = splitted.length
          if (splitted[splitLength - 1] == "type") {

            this.splitData2.push(splitted[splitLength - 2])

            this.responseDataSource2.push({
              id: inc, sourceName: this.sourcePath2, sfieldName: splitted[splitLength - 2],
              sdataType: this.combinedDataAfterExtractionSourceResponse2[q].value
            })
            inc++;
          }

        }
        console.log("responseDataSource2 = ", this.responseDataSource2);
        this.responseData2Before = this.sortSourceTargetData(this.responseDataSource2, this.responseDataICICI2)
      }

    }


    this.responseData2 = this.removeDup(this.responseData2Before);


    console.log("-------  LAST response Data2 = ", this.responseData2)
  }



  /**
  * @author : Sucheta
  * @param data
  * @description: This function consist code of flatten the json
  */
  nestedSegregationSource(data) {


    var result = {};
    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        for (var i = 0, l = cur.length; i < l; i++)
          recurse(cur[i], prop + "[" + i + "]");
        if (l == 0)
          result[prop] = [];
      } else {
        var isEmpty = true;
        for (var p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? prop + "." + p : p);
        }
        if (isEmpty && prop)
          result[prop] = {};
      }
    }
    recurse(data, "");


    console.log("********** Result ************* = ", result)
    return result;


  }


  /**
     * @author Sucheta
     * @description This function will be called to merge responseDataSource and responseDataTarget
     */
  sortSourceTargetData(clientData, iciciData) {
    this.outputData = [];
    console.log("source", clientData);
    console.log("target", iciciData);
    let arr3 = [];

    //sucheta combine array

    let combinedArray = [];
    var largerLength;
    if (clientData.length >= iciciData.length) {
      largerLength = clientData.length;
    }
    else {
      largerLength = iciciData.length
    }


    for (var q = 0; q < largerLength; q++) {
      // console.log("Inside for loop of q");

      if (clientData[q] == undefined && clientData[q] == undefined && iciciData[q] != undefined) {
        console.log("Inside first outputData")

        this.outputData.push({
          id: q + 1,
          sourceName: "",
          sfieldName: "",
          sdataType: "",
          targetName: iciciData[q].targetName,
          tfieldName: iciciData[q].tfieldName,
          tdataType: iciciData[q].tdataType,
          tfieldSize: iciciData[q].tfieldSize,
          urgencyName: iciciData[q].urgencyName,
          descriptionName: iciciData[q].descriptionName,
          directRowNo: "",
          expectedValue: null,
          sourceFieldPath: "-",
          sourceFieldName: "-",
          tfieldNameMapping: "-",
          datatypeVerified: "-",
          backgroundColor: "true"

        })
      }
      else if (iciciData[q] == undefined && clientData[q] != undefined) {
        console.log("Inside 2nd OutputData")

        this.outputData.push({

          id: q + 1,
          sourceName: clientData[q].sourceName,
          sfieldName: clientData[q].sfieldName,
          sdataType: clientData[q].sdataType,
          targetName: "",
          tfieldName: "",
          tdataType: null,
          tfieldSize: "",
          urgencyName: "",
          descriptionName: null,
          directRowNo: "",
          expectedValue: null,
          sourceFieldPath: "-",
          sourceFieldName: "-",
          tfieldNameMapping: "-",
          datatypeVerified: "-",
          backgroundColor: "true"

        })
      }
      else {
        console.log("Inside else of outputData")
        this.outputData.push({

          id: q + 1,
          sourceName: clientData[q].sourceName,
          sfieldName: clientData[q].sfieldName,
          sdataType: clientData[q].sdataType,
          targetName: iciciData[q].targetName,
          tfieldName: iciciData[q].tfieldName,
          tdataType: iciciData[q].tdataType,
          tfieldSize: iciciData[q].tfieldSize,
          urgencyName: iciciData[q].urgencyName,
          descriptionName: iciciData[q].descriptionName,
          directRowNo: "",
          expectedValue: null,
          sourceFieldPath: "-",
          sourceFieldName: "-",
          tfieldNameMapping: "-",
          datatypeVerified: "-",
          backgroundColor: "true"

        })
      }
    }

    console.log("========  END of OutputData = ", this.outputData)
    //sucheta ends



    return this.outputData;
  }

  /**
  * @author : Suchheta
  * @description: flatten the json.
  */
  nestedSegregation(data) {


    var result = {};
    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        for (var i = 0, l = cur.length; i < l; i++)
          recurse(cur[i], prop + "[" + i + "]");
        if (l == 0)
          result[prop] = [];
      } else {
        var isEmpty = true;
        for (var p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? prop + "." + p : p);
        }
        if (isEmpty && prop)
          result[prop] = {};
      }
    }
    recurse(data, "");


    console.log("********** Result ************* = ", result)
    return result;


  }




  /**
  * @author : Suchheta
  * @description: Create and download PDF.
  */
  capture() {

    var doc = new jspdf('l', 'pt', 'a4');

    var cols = [{ title: 'Id', dataKey: 'id' },
    { title: 'ICICI Resolved Path', dataKey: 'sourceName' }, { title: 'ICICI Field Name', dataKey: 'sfieldName' },
    { title: 'Source Data Type', dataKey: 'sdataType' }, { title: 'Client Field  Path', dataKey: 'targetName' },
    { title: 'Client Field Technical Name', dataKey: 'tfieldName' }, { title: 'Target Data Type', dataKey: 'tdataType' }, { title: 'Condition', dataKey: 'urgencyName' },
    { title: 'Description', dataKey: 'descriptionName' }, { title: 'Field Row No.', dataKey: 'directRowNo' },
    { title: 'Client Field Path', dataKey: 'sourceFieldPath' }, { title: 'ICICI Field Name', dataKey: 'tfieldNameMapping' }, { title: 'Source Field Name', dataKey: 'sourceFieldName' },
    { title: 'Data Type Verified', dataKey: 'datatypeVerified' }]

    var tableData = [];
    for (var i = 0; i < this.requestData.length; i++) {
      tableData.push({
        'id': this.requestData[i].id, 'sourceName': this.requestData[i].sourceName, 'sfieldName': this.requestData[i].sfieldName, 'sdataType': this.requestData[i].sdataType,
        'targetName': this.requestData[i].targetName, 'tfieldName': this.requestData[i].tfieldName, 'tdataType': this.requestData[i].tdataType, 'urgencyName': this.requestData[i].urgencyName,
        'descriptionName': this.requestData[i].descriptionName, 'directRowNo': this.requestData[i].directRowNo, 'sourceFieldPath': this.requestData[i].sourceFieldPath,
        'sourceFieldName': this.requestData[i].sourceFieldName, 'tfieldNameMapping': this.requestData[i].tfieldNameMapping, 'datatypeVerified': this.requestData[i].datatypeVerified, 'backgroundColor': this.requestData[i].backgroundColor
      })
    }
    for (var i = 0; i < this.responseData.length; i++) {
      tableData.push({
        'id': this.responseData[i].id, 'sourceName': this.responseData[i].sourceName, 'sfieldName': this.responseData[i].sfieldName, 'sdataType': this.responseData[i].sdataType,
        'targetName': this.responseData[i].targetName, 'tfieldName': this.responseData[i].tfieldName, 'tdataType': this.responseData[i].tdataType, 'urgencyName': this.responseData[i].urgencyName,
        'descriptionName': this.responseData[i].descriptionName, 'directRowNo': this.responseData[i].directRowNo, 'sourceFieldPath': this.responseData[i].sourceFieldPath,
        'sourceFieldName': this.responseData[i].sourceFieldName, 'tfieldNameMapping': this.responseData[i].tfieldNameMapping, 'datatypeVerified': this.responseData[i].datatypeVerified, 'backgroundColor': this.responseData[i].backgroundColor
      })
    }
    console.log("tableData = ", tableData)
    doc.autoTable(cols, tableData, {


    })

    doc.save("table.pdf");

    var blob = doc.output("blob");
    window.open(URL.createObjectURL(blob));

  }

  /**
   * @author : Sucheta
   * @description : Navbar for ui
   */

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  /**
   * @author : Sucheta
   * @description : Mapping for Request
   */
  enterDirectRowNumberRequest(data, event) {
    console.log("Inside enterDirectRowNumberRequest", event)
    console.log("data = ", data);
    if (data.sfieldName != undefined && event != undefined && event != null && event != "") {
      for (var q = 0; q < this.requestData.length; q++) {
        if (this.requestData[q].sfieldName == data.sfieldName && event != undefined && event != null) {
          if (this.requestData[event - 1].sdataType != "array") {
            if (this.requestData[event - 1].sdataType != "object") {

              this.requestData[q].directRowNo = event;
              this.requestData[q].sourceFieldPath = this.requestData[event - 1].sourceName;
              this.requestData[q].sourceFieldName = this.requestData[event - 1].sfieldName;
              this.requestData[q].datatypeVerified = this.requestData[event - 1].sdataType;
              this.requestData[q].tfieldNameMapping = this.requestData[q].tfieldName;

              // if (this.requestData[q].tdataType == this.requestData[event - 1].sdataType) {

              //     this.requestData[q].backgroundColor = "true"
              // }
              // else {
              //     this.requestData[q].backgroundColor = "false"
              // }
              var targetDatatype = (this.requestData[q].tdataType)
              var sourceDatatype = (this.requestData[event - 1].sdataType)

              // if ((targetDatatype.includes("varchar") && (sourceDatatype == "string" || sourceDatatype == "number")) || (sourceDatatype.includes("varchar") && (targetDatatype == "string" || targetDatatype == "number"))) {

              //   this.requestData[q].backgroundColor = "true"
              // }
              // else {
              //   this.requestData[q].backgroundColor = "false"
              // }
              console.log("final requestData = ", this.requestData[q])
            }
            else {

              alert(" Cannot map to an object")
            }
          }
          else {
            alert("Cannot map to an array")
          }
        }
      }
    }

    else {

      alert("To clear , please click on delete button !")

    }
  }
  /**
   * @author :  Sucheta
   * @description : Clear value of Request
   * @param data
   *
   */

  deleteValueRequest(data) {
    for (var q = 0; q < this.requestData.length; q++) {
      if (this.requestData[q].sfieldName == data.sfieldName) {

        this.requestData[q].directRowNo = "";
        this.requestData[q].sourceFieldPath = "-";
        this.requestData[q].sourceFieldName = "-";
        this.requestData[q].datatypeVerified = "-";
        this.requestData[q].tfieldNameMapping = "-"
        this.requestData[q].backgroundColor = "true"
        console.log("final requestData = ", this.requestData[q])
      }

    }


  }
  /**
* @author :  Sucheta
* @description : Mapping for Response
* @param :  data, event
*/
  enterDirectRowNumberResponse(data, event) {
    console.log("Inside enterDirectRowNumberResponse", event)
    console.log("data = ", data);

    if (data.sfieldName != undefined && event != undefined && event != null && event != "") {


      for (var q = 0; q < this.responseData.length; q++) {
        if (this.responseData[q].sfieldName == data.sfieldName && event != undefined && event != null) {
          if (this.responseData[event - 1].sdataType != "array") {
            if (this.responseData[event - 1].sdataType != "object") {


              this.responseData[q].directRowNo = event;
              this.responseData[q].sourceFieldPath = this.responseData[event - 1].sourceName;
              this.responseData[q].sourceFieldName = this.responseData[event - 1].sfieldName;
              this.responseData[q].datatypeVerified = this.responseData[event - 1].sdataType;
              this.responseData[q].tfieldNameMapping = this.responseData[q].tfieldName;
              if (this.responseData[q].tdataType != null) {


                // if ((this.responseData[q].tdataType.includes("varchar") && (this.responseData[event - 1].sdataType == "string" || this.responseData[event - 1].sdataType == "number")) || (this.responseData[event - 1].sdataType.includes("varchar") && (this.responseData[q].tdataType == "string" || this.responseData[q].tdataType == "number"))) {

                //   this.responseData[q].backgroundColor = "true"
                // }
                // else {
                //   this.responseData[q].backgroundColor = "false"
                // }
              }
              console.log("final responsedata = ", this.responseData[q])
            }
            else {
              alert("Cannot map to an object")
            }

          }
          else {
            alert("Cannot map to an array")
          }
        }

      }
    }
    else {
      alert("To clear , please click on delete button !")
    }

  }

  /**
   * @author : Sucheta
   * @description : Clear the Response data
   *
   */
  deleteValueResponse1(data) {

    for (var q = 0; q < this.responseData.length; q++) {
      if (this.responseData[q].sfieldName == data.sfieldName) {

        this.responseData[q].directRowNo = "";
        this.responseData[q].tfieldNameMapping = "-";
        this.responseData[q].sourceFieldPath = "-";
        this.responseData[q].sourceFieldName = "-";
        this.responseData[q].datatypeVerified = "-";

        this.responseData[q].backgroundColor = "true"
        console.log("final responsedata = ", this.responseData[q])
      }

    }
  }

  /**
  * @author : Suchheta
  * @description: Reset Function for Request.
  */
  allowMappingRequest: boolean = false;
  resetButton(resetIdValue) {
    this.allowMappingRequest = false;

    for (var k = 0; k < this.requestData.length; k++) {
      if (resetIdValue == this.requestData[k].id) {
        this.allowMappingRequest = true;
        break;
      }
      else {
        this.allowMappingRequest = false;
      }

    }


    console.log("this.resetButtonClick", this.resetButtonClick);

    if (this.allowMappingRequest == true) {



      for (var i = 0; i < this.requestData.length; i++) {

        if (this.requestData[i].sfieldName === this.resetButtonClick && this.resetButtonClick != undefined) {
          this.requestData[i].directRowNo = resetIdValue;
          this.requestData[i].sourceFieldPath = this.requestData[resetIdValue - 1].sourceName;
          this.requestData[i].sourceFieldName = this.requestData[resetIdValue - 1].sfieldName
          this.requestData[i].datatypeVerified = this.requestData[resetIdValue - 1].sdataType;
          this.requestData[i].tfieldNameMapping = this.requestData[i].tfieldName;
          if (this.requestData[i].sdataType != this.requestData[resetIdValue - 1].tdataType) {
            this.requestData[i].backgroundColor = "false"
          }
          else {
            this.requestData[i].backgroundColor = "true";
          }
        }


      }
    }
    else {
      alert("Mapping not allowed. Incorrect Number");
    }
    this.resetId = null;
    console.log("this.requestData", this.requestData);

    this.modalService.dismissAll();

  }

  /**
     * @author : Suchheta
     * @description: Reset Function for Response.
     */


  resetButtonResponse(resetIdValue) {


    console.log("this.resetButtonClick Response", this.resetButtonClickResponse);
    for (var i = 0; i < this.responseData.length; i++) {
      if (this.responseData[i].sfieldName === this.resetButtonClickResponse && this.resetButtonClickResponse != undefined) {
        this.responseData[i].directRowNo = resetIdValue;
        this.responseData[i].sourceFieldPath = this.responseData[resetIdValue - 1].sourceName;
        this.responseData[i].sourceFieldName = this.responseData[resetIdValue - 1].sfieldName
        this.responseData[i].datatypeVerified = this.responseData[resetIdValue - 1].sdataType
        this.responseData[i].tfieldNameMapping = this.responseData[i].tfieldName;
        if (this.responseData[i].sdataType != this.responseData[resetIdValue - 1].tdataType) {
          this.responseData[i].backgroundColor = "false"
        }
        else {
          this.responseData[i].backgroundColor = "true";
        }
      }
    }
  }

  /**
   * @author : Sucheta
   * @description : description in ICICI request modal
   * @params : index,data,modal
   */



  descriptionRequest(a, data, iRequest) {

    this.modalService.open(iRequest, { size: 'sm' });
    this.descriptionICICIRequest = data.descriptionName
    this.fsizeICICIRequest = data.tfieldSize;
    this.dataTypeICICIRequest = data.tdataType
  }


  /**
   * @author : Sucheta
   * @description :
   * @param a
   * @param data
   * @param iResponse
   */

  detailsClientRequest(a, data, clientReq) {
    this.modalService.open(clientReq, { size: 'sm' });
    this.dataTypeClientRequest = data.sdataType

  }


  /**
   * @author : Sucheta
   * @description : description in response modal
   * @params : index, data, modal
   */

  descriptionResponse(a, data, iResponse) {

    this.modalService.open(iResponse, { size: 'sm' });
    this.descriptionNameResponse = data.descriptionName
    this.dataTypeICICIResponse = data.tdataType;
    this.fsizeICICIResponse = data.tfieldSize
    this.urgencyNameICICIResponse = data.urgencyName
  }

  /**
   * @author : Sucheta
   * @description : description in response modal
   * @params : index, data, modal
   */


  detailsClientResponse(a, data, clientResponse) {

    this.modalService.open(clientResponse, { size: 'sm' });
    this.dataTypeClientResponse = data.sdataType

  }


  /**
   *
   * @param data
   */

  enterExpectedValueRequest(data, event) {

    console.log("Inside enterExpectedValueRequest = ,event", event)
    for (var i = 0; i < this.requestData.length; i++) {
      if (this.requestData[i].sfieldName === data.sfieldName) {
        this.requestData[i].expectedValue = event;
      }
    }
  }


  /**
   *
   * @param data
   */

  enterExpectedValueResponse(data, event) {

    console.log("Inside enterExpectedValueResponse = ,event", event)
    for (var i = 0; i < this.responseData.length; i++) {
      if (this.responseData[i].sfieldName === data.sfieldName) {
        this.responseData[i].expectedValue = event;
      }
    }
  }


  // PART - 2/ FILE -2  starts


  /**
   *
   * @param data
   */

  enterExpectedValueRequest2(data, event) {

    console.log("Inside enterExpectedValueRequest2 = ,event", event)
    for (var i = 0; i < this.requestData2.length; i++) {
      if (this.requestData2[i].sfieldName === data.sfieldName) {
        this.requestData2[i].expectedValue = event;
      }
    }
  }


  /**
   *
   * @param data
   */

  enterExpectedValueResponse2(data, event) {

    console.log("Inside enterExpectedValueResponse2 = ,event", event)
    for (var i = 0; i < this.responseData2.length; i++) {
      if (this.responseData2[i].sfieldName === data.sfieldName) {
        this.responseData2[i].expectedValue = event;
      }
    }
  }

  /**
   * @author : Sucheta
   * @description : Mapping for Request
   */
  enterDirectRowNumberRequest2(data, event) {
    console.log("Inside enterDirectRowNumberRequest2", event)
    console.log("data = ", data);
    if (data.sfieldName != undefined && event != undefined && event != null && event != "") {
      for (var q = 0; q < this.requestData2.length; q++) {
        if (this.requestData2[q].sfieldName == data.sfieldName && event != undefined && event != null) {
          if (this.requestData2[event - 1].sdataType != "array") {
            if (this.requestData2[event - 1].sdataType != "object") {

              this.requestData2[q].directRowNo = event;
              this.requestData2[q].sourceFieldPath = this.requestData2[event - 1].sourceName;
              this.requestData2[q].sourceFieldName = this.requestData2[event - 1].sfieldName;
              this.requestData2[q].datatypeVerified = this.requestData2[event - 1].sdataType;
              this.requestData2[q].tfieldNameMapping = this.requestData2[q].tfieldName;

              // if (this.requestData[q].tdataType == this.requestData[event - 1].sdataType) {

              //     this.requestData[q].backgroundColor = "true"
              // }
              // else {
              //     this.requestData[q].backgroundColor = "false"
              // }
              var targetDatatype = (this.requestData2[q].tdataType)
              var sourceDatatype = (this.requestData2[event - 1].sdataType)

              // if ((targetDatatype.includes("varchar") && (sourceDatatype == "string" || sourceDatatype == "number")) || (sourceDatatype.includes("varchar") && (targetDatatype == "string" || targetDatatype == "number"))) {

              //   this.requestData2[q].backgroundColor = "true"
              // }
              // else {
              //   this.requestData2[q].backgroundColor = "false"
              // }

              console.log("final requestData2 = ", this.requestData2[q])
            }
            else {

              alert(" Cannot map to an object")
            }
          }
          else {
            alert("Cannot map to an array")
          }
        }
      }
    }

    else {

      alert("To clear , please click on delete button !")

    }
  }
  /**
   * @author :  Sucheta
   * @description : Clear value of Request
   * @param data
   *
   */

  deleteValueRequest2(data) {
    for (var q = 0; q < this.requestData2.length; q++) {
      if (this.requestData2[q].sfieldName == data.sfieldName) {

        this.requestData2[q].directRowNo = "";
        this.requestData2[q].sourceFieldPath = "-";
        this.requestData2[q].sourceFieldName = "-";
        this.requestData2[q].datatypeVerified = "-";
        this.requestData2[q].tfieldNameMapping = "-"
        this.requestData2[q].backgroundColor = "true"
        console.log("final requestData2 = ", this.requestData2[q])
      }

    }


  }
  /**
* @author :  Sucheta
* @description : Mapping for Response
* @param :  data, event
*/
  enterDirectRowNumberResponse2(data, event) {
    console.log("Inside enterDirectRowNumberResponse", event)
    console.log("data = ", data);

    if (data.sfieldName != undefined && event != undefined && event != null && event != "") {


      for (var q = 0; q < this.responseData2.length; q++) {
        if (this.responseData2[q].sfieldName == data.sfieldName && event != undefined && event != null) {
          if (this.responseData2[event - 1].sdataType != "array") {
            if (this.responseData2[event - 1].sdataType != "object") {


              this.responseData2[q].directRowNo = event;
              this.responseData2[q].sourceFieldPath = this.responseData2[event - 1].sourceName;
              this.responseData2[q].sourceFieldName = this.responseData2[event - 1].sfieldName;
              this.responseData2[q].datatypeVerified = this.responseData2[event - 1].sdataType;
              this.responseData2[q].tfieldNameMapping = this.responseData2[q].tfieldName;
              if (this.responseData2[q].tdataType != null) {


                // if ((this.responseData2[q].tdataType.includes("varchar") && (this.responseData2[event - 1].sdataType == "string" || this.responseData2[event - 1].sdataType == "number")) || (this.responseData2[event - 1].sdataType.includes("varchar") && (this.responseData2[q].tdataType == "string" || this.responseData2[q].tdataType == "number"))) {

                //   this.responseData2[q].backgroundColor = "true"
                // }
                // else {
                //   this.responseData2[q].backgroundColor = "false"
                // }
              }
              console.log("final responsedata2 = ", this.responseData2[q])
            }
            else {
              alert("Cannot map to an object")
            }

          }
          else {
            alert("Cannot map to an array")
          }
        }

      }
    }
    else {
      alert("To clear , please click on delete button !")
    }

  }

  /**
   * @author : Sucheta
   * @description : Clear the Response data
   *
   */
  deleteValueResponse12(data) {

    for (var q = 0; q < this.responseData2.length; q++) {
      if (this.responseData2[q].sfieldName == data.sfieldName) {

        this.responseData2[q].directRowNo = "";
        this.responseData2[q].tfieldNameMapping = "-";
        this.responseData2[q].sourceFieldPath = "-";
        this.responseData2[q].sourceFieldName = "-";
        this.responseData2[q].datatypeVerified = "-";

        this.responseData2[q].backgroundColor = "true"
        console.log("final responsedata2 = ", this.responseData2[q])
      }

    }
  }

  /**
   * @author : Sucheta
   * @description : description in ICICI request modal
   * @params : index,data,modal
   */



  descriptionRequest2(a, data, iRequest) {

    this.modalService.open(iRequest, { size: 'sm' });
    this.descriptionICICIRequest2 = data.descriptionName
    this.fsizeICICIRequest2 = data.tfieldSize;
    this.dataTypeICICIRequest2 = data.tdataType
  }


  /**
   * @author : Sucheta
   * @description :
   * @param a
   * @param data
   * @param iResponse
   */

  detailsClientRequest2(a, data, clientReq) {
    this.modalService.open(clientReq, { size: 'sm' });
    this.dataTypeClientRequest2 = data.sdataType

  }


  /**
   * @author : Sucheta
   * @description : description in response modal
   * @params : index, data, modal
   */

  descriptionResponse2(a, data, iResponse) {

    this.modalService.open(iResponse, { size: 'sm' });
    this.descriptionNameResponse2 = data.descriptionName
    this.dataTypeICICIResponse2 = data.tdataType;
    this.fsizeICICIResponse2 = data.tfieldSize
    this.urgencyNameICICIResponse2 = data.urgencyName
  }

  /**
   * @author : Sucheta
   * @description : description in response modal
   * @params : index, data, modal
   */


  detailsClientResponse2(a, data, clientResponse) {

    this.modalService.open(clientResponse, { size: 'sm' });
    this.dataTypeClientResponse2 = data.sdataType

  }




  //  PART -2 / FILE -2 ends


  /**
   * @author : Sucheta
   * @description : Open Modal for target Url
   *
   */


  getClientUrl(clientUrlOpen) {
    this.modalService.open(clientUrlOpen, { size: 'lg' });

  }

  /**
* @author : Sucheta
* @description : Submit the data for Mapping.
*/
  submitForMapping() {


    var clientUrl = this.serviceUrl;
    // expectedValues  for Part -1
    var expectObjRequest = [];
    var expectObjResponse = [];

    for (var u = 0; u < this.requestData.length; u++) {

      if (this.requestData[u].expectedValue !== null) {
        var result = {};
        var key = this.requestData[u].sourceFieldName
        var value = this.requestData[u].expectedValue
        result[key] = value

        expectObjRequest.push(result);

      }

    }

    console.log("expectObjRequest = ", expectObjRequest)

    for (var t = 0; t < this.responseData.length; t++) {

      if (this.responseData[t].expectedValue !== null) {
        var result = {};
        var key1 = this.responseData[t].sourceFieldName
        var value1 = this.responseData[t].expectedValue

        result[key1] = value1;

        expectObjResponse.push(result);

      }

    }
    console.log("expectObjResponse = ", expectObjResponse)


    //ExpectedValue - part -2

    // expectedValues  for Part -1
    var expectObjRequest2 = [];
    var expectObjResponse2 = [];

    for (var w = 0; w < this.requestData2.length; w++) {

      if (this.requestData2[w].expectedValue !== null) {
        var result = {};
        var key = this.requestData[w].sourceFieldName
        var value = this.requestData[w].expectedValue
        result[key] = value

        expectObjRequest2.push(result);

      }

    }

    console.log("expectObjRequest = ", expectObjRequest2)

    for (var p = 0; p < this.responseData.length; p++) {

      if (this.responseData2[p].expectedValue !== null) {
        var result = {};
        var key1 = this.responseData2[p].sourceFieldName
        var value1 = this.responseData2[p].expectedValue

        result[key1] = value1;

        expectObjResponse2.push(result);

      }

    }
    console.log("expectObjResponse = ", expectObjResponse2)



    this.url = null
    console.log("clientUrl = ", clientUrl)
    this.modalService.dismissAll();
    var mandatoryFlag: boolean = false;
    console.log("-------------  Inside Submit  ----------")
    console.log("responseData = ", this.responseData)
    for (var i = 0; i < this.responseData.length; i++) {
      if (this.responseData[i].urgencyName != "") {

        if (this.responseData[i].urgencyName.includes("Mandatory") && (this.responseData[i].sourceFieldName == "-")) {

          mandatoryFlag = false;

          i = this.responseData.length;
          console.log("Inside mandatory false")
        }
        else {
          mandatoryFlag = true

        }

      }

    }

    if (mandatoryFlag == true) {

      this.getFlattenStructure1(this.requestData, this.responseData, clientUrl);




    }
    else {
      alert("Please Map all the Mandatory Response fields")
    }


    var mandatoryFlag2: boolean = false;
    console.log("-------------  Inside Submit  ----------")
    console.log("responseData2 = ", this.responseData2)
    for (var i = 0; i < this.responseData2.length; i++) {
      if (this.responseData2[i].urgencyName != "") {

        if (this.responseData2[i].urgencyName.includes("Mandatory") && (this.responseData2[i].sourceFieldName == "-")) {

          mandatoryFlag2 = false;

          i = this.responseData2.length;
          console.log("Inside mandatory false")
        }
        else {
          mandatoryFlag2 = true

        }

      }

    }

    if (mandatoryFlag2 == true) {

      this.getFlattenStructure12();



    }
    else {
      alert("Please Map all the Mandatory Response fields")
    }

    // this.router.navigate(['/authentication/appStatus']);
  }



  /**
   * @author : Suucheta A Shrivastava
   * @description : Remove duplicates
   * @param Array
   */

  removeDupFieldDefinitions(something) {
    return something.reduce(function (prev, ele) {
      var found = prev.find(function (fele) {
        return ele.fieldName === fele.fieldName && ele.fieldType === fele.fieldType;
      });
      if (!found) {
        prev.push(ele);
      }
      return prev;
    }, []);
  }

  /**
  * @author Sanchita
  * @param data
  * @description This function is used to get the json structure for esql generation
  */

  getFlattenStructure1(requestData, responseData, clientUrl) {
    console.log("this.requestData", data);

    this.dataForEsql = [];
    this.dataWithDirectRowNo = [];
    this.dataWithNoDirectRow = [];

    console.log(" this.combinedDataAfterExtractionSource = ", this.combinedDataAfterExtractionSource)
    for (var i = 0; i < this.requestData.length; i++) {
      if (this.requestData[i].directRowNo !== "") {
        this.dataWithDirectRowNo.push(this.requestData[i]);
      }
      else {
        this.dataWithNoDirectRow.push(this.requestData[i]);
      }
    }
    console.log("this.dataWithDirectRowNo = ", this.dataWithDirectRowNo)
    let array1 = []
    this.requestDataICICI.forEach((itm, i) => {
      array1.push(Object.assign({}, itm, this.combinedDataAfterExtractionSource[i]));
    });
    console.log("array1 = ", array1)


    //field Definitions



    //fieldDefinitions ----------
    for (var y = 0; y < this.dataWithDirectRowNo.length; y++) {
      for (var u = 0; u < this.combinedDataAfterExtractionSource.length; u++) {
        if (this.combinedDataAfterExtractionSource[u].key.includes(this.dataWithDirectRowNo[y].sourceFieldName)) {

          for (var a = 0; a < this.combinedDataAfterExtractionSource.length; a++) {
            //new ----------------
            if (this.combinedDataAfterExtractionSource[a].value == "array") {
              var aSplit = this.combinedDataAfterExtractionSource[u].key.split(".");
              console.log("aSplit = ", aSplit)
              var splitted1 = aSplit[0];

              console.log("splitted1 = ", splitted1)

              var value11 = splitted1

              if (this.combinedDataAfterExtractionSource[a].key.includes(value11)) {

                var newArray = this.combinedDataAfterExtractionSource[a].key.split(".");
                var newValue = newArray[newArray.length - 2]

                var splitted = newValue.split(".");
                console.log(" ------- splitted Response--------- = ", splitted)
                var responseValue = newArray[0]
                var newValue2 = newArray[1]

                console.log("New newValue2  = ", newValue2)
                this.fieldDefinitionsRequest.push({
                  "fieldName": newValue,
                  "fieldType": "Array",
                  "format": "JSON",
                  "preset": "source"
                })

                a = this.combinedDataAfterExtractionSource.length;
                u = this.combinedDataAfterExtractionSource.length;
                console.log("ESQL Request field definitions ends")
              }
            }

            //new  ends ---------------

          }

        }
      }
    }
    // fieldDefinitions ends

    //remove duplicate field definitions

    this.fieldDefinitionsRequest = this.removeDupFieldDefinitions(this.fieldDefinitionsRequest)

    //remove duplicate field definitions ends






    //field Definition ends

    for (var i = 0; i < this.dataWithDirectRowNo.length; i++) {
      // console.log("Inside 1")
      for (var j = 0; j < this.combinedDataAfterExtractionSource.length; j++) {

        // console.log("Inside 2")
        var x = this.combinedDataAfterExtractionSource[j].key;
        if (x !== undefined) {


          var splitted = x.split(".");

          // console.log("Slippeted = ", splitted)
          for (var t = 0; t < splitted.length; t++) {
            var data = splitted[t];

            // console.log("Inside if , this.dataWithDirectRowNo[i].sourceFieldName = ", this.dataWithDirectRowNo[i].sourceFieldName)
            if (this.dataWithDirectRowNo[i].sourceFieldName === splitted[t] && this.dataWithDirectRowNo[i].datatypeVerified === this.combinedDataAfterExtractionSource[j].value) {

              var sourceJson = this.combinedDataAfterExtractionSource[j].key;
              var val = sourceJson.replace(".type", "");
              this.dataForEsql.push({
                'source': val,
                'target': this.dataWithDirectRowNo[i].tfieldName,
                'operation': ""
              })
            }

          }
        }

      }
    }


    console.log(" this.dataForEsql = ", this.dataForEsql)

    this.finalDataForEsql = {
      "sourceType": "JSON",
      "targetType": "DFDL",
      "fieldDefinitions": this.fieldDefinitionsRequest,
      "fields": this.dataForEsql
    }

    var finalEsqlObject = {
      "mappedObj": this.finalDataForEsql,
      "templateName": config.templateNameEsql,
      "fileName": config.fileNameEsql_Scene_4_Request_1,
      "clientName": "abc",
      "username": this.username,
      "orgName": this.organisation,
      "productName": this.productName,
      "serviceName": "ecollection with remitter validation at bank and client's end",
      "projectId": this.projectId,
      "clientCode": this.clientCode,
      "fileCount": 1,
      "serializationFormat": this.webServiceType,
      "accountNo": this.poolAccountNumber,
      "IFSCCode": this.ifscCode,
      "basePath": "/ecollection/" + this.clientCode,
      "path": "/validation",
      "txnReversal": "No",

    }

    console.log("finalEsqlObject", JSON.stringify(finalEsqlObject))

    this.mapping4Service.postESQL(finalEsqlObject).then((dataEsql) => {

      console.log("response dataEsql = ", dataEsql)

      this.toastr.success("Response for ESQL :" + dataEsql.message);
      this.getFlattenStructureResponse1(requestData, responseData, clientUrl);
    })
  }


  /**
  * @author Sucheta
  * @param data
  * @description This function is used to get the json structure for esql generation
  */

  getFlattenStructureResponse1(requestData, responseData, clientUrl) {
    console.log(" getFlattenStructureResponse1 ");

    this.dataForEsqlResponse = [];
    this.dataWithDirectRowNo = [];
    this.dataWithNoDirectRow = [];

    for (var i = 0; i < this.responseData.length; i++) {
      if (this.responseData[i].directRowNo !== "") {
        this.dataWithDirectRowNo.push(this.responseData[i]);
      }
      else {
        this.dataWithNoDirectRow.push(this.responseData[i]);
      }
    }
    console.log("this.dataWithDirectRowNo = ", this.dataWithDirectRowNo)

    //fieldDefinitions ----------



    //new fieldDefinitions -------------


    //fieldDefinitions ----------


    for (var y = 0; y < this.dataWithDirectRowNo.length; y++) {

      for (var u = 0; u < this.combinedDataAfterExtractionSourceResponse.length; u++) {
        if (this.combinedDataAfterExtractionSourceResponse[u].key.includes(this.dataWithDirectRowNo[y].sourceFieldName)) {
          // console.log("!!######    if   ######## = ")
          for (var a = 0; a < this.combinedDataAfterExtractionSourceResponse.length; a++) {

            //new -----

            if (this.combinedDataAfterExtractionSourceResponse[a].value == "array") {
              var aSplit = this.combinedDataAfterExtractionSourceResponse[u].key.split(".");
              console.log("aSplit = ", aSplit)
              var splitted1 = aSplit[1];

              console.log("splitted1 = ", splitted1)

              var value11 = splitted1


              if (this.combinedDataAfterExtractionSourceResponse[a].key.includes(value11)) {


                var newArray = this.combinedDataAfterExtractionSourceResponse[a].key.split(".");
                var newValue = newArray[newArray.length - 2]


                var splitted = newValue.split(".");
                console.log(" ------- splitted Response--------- = ", splitted)
                var responseValue = newArray[0]
                var newValue2 = newArray[1]
                console.log("newValue2 = ", newValue2)
                console.log("New newValue2  = ", newValue2)
                this.fieldDefinitionsResponse.push({
                  "fieldName": newValue2,
                  "fieldType": "Array",
                  "format": "JSON",
                  "preset": "source"
                })

                a = this.combinedDataAfterExtractionSourceResponse.length;
                u = this.combinedDataAfterExtractionSourceResponse.length;
                console.log("ESQL Response field definitions ends")
              }
            }

          }

        }
      }
      console.log(" this.fieldDefinitionsResponse = ", this.fieldDefinitionsResponse)
    }



    //new FieldDefinitions ------------

    //remove dup field definitions -

    this.fieldDefinitionsResponse = this.removeDupFieldDefinitions(this.fieldDefinitionsResponse)




    for (var i = 0; i < this.dataWithDirectRowNo.length; i++) {
      // console.log("Inside 1")
      for (var j = 0; j < this.combinedDataAfterExtractionSourceResponse.length; j++) {

        // console.log("Inside 2")
        var x = this.combinedDataAfterExtractionSourceResponse[j].key;
        if (x !== undefined) {


          var splitted = x.split(".");

          // console.log("Slippeted = ", splitted)
          for (var t = 0; t < splitted.length; t++) {
            var data = splitted[t];

            if (this.dataWithDirectRowNo[i].sourceFieldName === splitted[t] && this.dataWithDirectRowNo[i].datatypeVerified === this.combinedDataAfterExtractionSourceResponse[j].value && this.dataWithDirectRowNo[i].tfieldName == "RejectionReason") {
              var sourceJson = this.combinedDataAfterExtractionSourceResponse[j].key;
              var val = sourceJson.replace(".type", "");
              this.dataForEsqlResponse.push({
                'source': this.dataWithDirectRowNo[i].tfieldName,
                'target': val,
                'operation': "coalesce"
              })
            }

            else if (this.dataWithDirectRowNo[i].sourceFieldName === splitted[t] && this.dataWithDirectRowNo[i].datatypeVerified === this.combinedDataAfterExtractionSourceResponse[j].value && this.dataWithDirectRowNo[i].tfieldName !== "RejectionReason") {
              var sourceJson = this.combinedDataAfterExtractionSourceResponse[j].key;
              var val = sourceJson.replace(".type", "");
              this.dataForEsqlResponse.push({
                'source': this.dataWithDirectRowNo[i].tfieldName,
                'target': val,
                'operation': ""
              })
            }
          }
        }

      }
    }


    console.log(" this.dataForEsqlResponse , Response= ", this.dataForEsqlResponse)

    this.finalDataForEsql = {
      "sourceType": "JSON",
      "targetType": "DFDL",
      "fieldDefinitions": this.fieldDefinitionsResponse,
      "fields": this.dataForEsqlResponse
    }



    var finalEsqlObject = {
      "mappedObj": this.finalDataForEsql,
      "templateName": config.templateNameEsql,
      "fileName": config.fileNameEsql_Scene_4_Response_1,
      "clientName": "abc",
      "username": this.username,
      "orgName": this.organisation,
      "productName": this.productName,
      "serviceName": "ecollection with remitter validation at bank and client's end",
      "projectId": this.projectId,
      "clientCode": this.clientCode,
      "fileCount": 2,
      "serializationFormat": this.webServiceType,
      "accountNo": this.poolAccountNumber,
      "IFSCCode": this.ifscCode,
      "basePath": "/ecollection/" + this.clientCode,
      "path": "/validation",
      "txnReversal": "No",
    }
    console.log("finalEsqlObject , Response", JSON.stringify(finalEsqlObject))

    this.mapping4Service.postESQL(finalEsqlObject).then((dataEsql) => {

      console.log("response dataEsql = ", dataEsql)

      this.toastr.success("Response for ESQL :" + dataEsql.message);
    })
  }


  /**
   *
   * @author : Sucheta
   * @param requestD
   * @param responseD
   * @param clientUrl
   */
  async yamlCreation(clientUrl) {
    var flattenData =
    {

      "description": "",
      "title": "test",
      "ibmName": "test",
      "targetUrl": "http://example.com/operation-name",
      "targetUrlDescription": "The URL of the target service",
      "basePath": "/ecollection",
      "path": "/transaction",
      "operations": [
        {
          "operationId": null,
          "path": "/transaction",
          "method": "post",
          "fields": [
            {
              "Virtual Account Number Verification IN": {
                "type": "array",
                "items": {
                  "properties": {
                    "Client Code": {
                      "type": "string"
                    },
                    "Virtual Account Number": {
                      "type": "string"
                    },
                    "Transaction Amount": {
                      "type": "number"
                    },
                    "UTR number": {
                      "type": "string"
                    },
                    "Sender Name": {
                      "type": "string"
                    },
                    "Date": {
                      "type": "string"
                    },
                    "Sender IFSC_Code": {
                      "type": "string"
                    },
                    "Remitter Account Number": {
                      "type": "string"
                    },
                    "Mode": {
                      "type": "string"
                    },
                    "Status": {
                      "type": "string"
                    },
                    "sender to receiver information": {
                      "type": "string"
                    }
                  },
                  "type": "object"
                }
              }
            }
          ],
          "responses": [
            {
              "200": {
                "Virtual Account Number Verification OUT": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "Client Code": {
                        "type": "string"
                      },
                      "Virtual Account Number": {
                        "type": "string"
                      },
                      "Transaction Amount": {
                        "type": "number"
                      },
                      "UTR number": {
                        "type": "string"
                      },
                      "Sender Name": {
                        "type": "string"
                      },
                      "Date": {
                        "type": "string"
                      },
                      "Sender IFSC_Code": {
                        "type": "string"
                      },
                      "Remitter Account Number": {
                        "type": "string"
                      },
                      "Mode": {
                        "type": "string"
                      },
                      "Status": {
                        "type": "string"
                      },
                      "Reject Reason": {
                        "type": "string"
                      }
                    },
                    "type": "object"
                  }
                }
              }
            }
          ]
        }
      ]

    }



    console.log("combinedDataAfterExtractionSource = ", this.combinedDataAfterExtractionSource);

    var combArray = [];
    this.combinedDataAfterExtractionSource.forEach((item, index) => {

      combArray.push({ ['"' + item.key + '"']: item.value })
    })
    console.log("combArray = ", combArray)
    var unflattenValue = this.unflatten(combArray[2])

    // console.log("unflattenValue = ", Object.assign(unflattenValue))

    var requestField = this.yamlGenRequest();
    var responseField = this.yamlGenResponse();
    console.log("Request fields =", requestField);
    console.log("Response fileds =", responseField)

    var finalYaml = [{
      "description": "",
      "title": "test",
      "ibmName": "test",
      "targetUrl": clientUrl,
      "targetUrlDescription": "The URL of the target service",
      "basePath": "/ecollection/" + this.clientCode,
      "path": "/validation",
      "operations": [
        {

          "operationId": null,
          "path": this.sourcePath,
          "method": this.sourceMethod,
          fields: [requestField['fields']],
          responses: [responseField['responses']]
        }
      ]
    }]

    console.log("hardcoded , flattenData = ", flattenData)

    console.log("Final Yaml File =", finalYaml[0])


    var yamlObject = {
      'params': finalYaml[0],
      'templateName': config.templateNameYaml,
      'fileName': config.fileName_yaml_validation,
      "username": this.username,
      "orgName": this.organisation,
      "productName": this.productName,
      "serviceName": "ecollection with remitter validation at bank and client's end",
      'projectId': this.projectId,
      "clientCode": this.clientCode,
      "fileCount": 1,
      "txnReversal": "No"
    }

    this.mapping4Service.postYamlData(yamlObject).then((yamlResponse) => {

      console.log("yamlResponse = ", yamlResponse)
      this.toastr.success("Response for Yaml :" + yamlResponse.message);

    })
  }


  yamlGenRequest() {
    this.requestProperty = [];
    this.requestDataFiltered = [];
    this.requestLayout = [];
    this.requestPropertyNonArray = [];
    this.requestExtraction = [];
    this.requestPropNonArray2 = [];
    this.finalRequestWithoutArray = [];
    this.finalRequest = [];
    this.finalRequest2 = []

    //To check if the file has an array


    var arrayFlag: boolean = false;

    for (var ut = 0; ut < this.combinedDataAfterExtractionSource.length; ut++) {

      if (this.combinedDataAfterExtractionSource[ut].value == "array") {

        arrayFlag = true;
        ut = this.combinedDataAfterExtractionSource.length
      }
    }


    //step 1 - filter the mapped data from request array

    for (var t = 0; t < this.requestData.length; t++) {
      if (this.requestData[t].directRowNo !== "") {

        this.requestDataFiltered.push(this.requestData[t])
      }

    }
    console.log("this.requestDataFiltered = ", this.requestDataFiltered)
    //step 2 - check if any array from request data is present in flattened array

    // this.combinedDataAfterExtractionSource

    for (var y = 0; y < this.requestDataFiltered.length; y++) {

      for (var u = 0; u < this.combinedDataAfterExtractionSource.length; u++) {
        if (this.combinedDataAfterExtractionSource[u].key.includes(this.requestDataFiltered[y].sourceFieldName)) {

          for (var a = 0; a < this.combinedDataAfterExtractionSource.length; a++) {

            if (this.combinedDataAfterExtractionSource[a].key.includes(this.combinedDataAfterExtractionSource[u].key) && (this.combinedDataAfterExtractionSource[u].value == "array")) {


              var newValue = this.combinedDataAfterExtractionSource[u].key.replace(".type", "")
              this.requestLayout.push({
                key: newValue, value:

                {
                  [newValue]: {
                    "type": "array",
                    "items": {
                      "properties": {

                      },
                      "type": "object"
                    }
                  }
                }
              })

              a = this.combinedDataAfterExtractionSource.length;
            }
          }

        }
      }
      console.log(" this.requestLayout = ", this.requestLayout)
    }

    //step 3  - segregate the array values having a corresponding flattened array type in a new json

    for (var d = 0; d < this.requestDataFiltered.length; d++) {

      for (var s = 0; s < this.combinedDataAfterExtractionSource.length; s++) {
        if (this.combinedDataAfterExtractionSource[s].key.includes("." + this.requestDataFiltered[d].sourceFieldName + ".") && ((this.requestDataFiltered[d].datatypeVerified) !== "array")) {
          // console.log("this.combinedDataAfterExtractionSource[u].key = ", this.combinedDataAfterExtractionSource[s].key)

          // console.log("this.requestDataFiltered[y].sourceFieldName = ", this.requestDataFiltered[d].sourceFieldName)
          for (var f = 0; f < this.combinedDataAfterExtractionSource.length; f++) {

            if (this.combinedDataAfterExtractionSource[f].key.includes(this.combinedDataAfterExtractionSource[s].key) && (this.combinedDataAfterExtractionSource[f].value !== "array")) {
              // console.log ("this.combinedDataAfterExtractionSource[f].key = ", this.combinedDataAfterExtractionSource[f].key)

              // console.log ("this.combinedDataAfterExtractionSource[s].key= ", this.combinedDataAfterExtractionSource[s].key)

              this.requestProperty.push({
                key: this.combinedDataAfterExtractionSource[s].key, value: {



                  [this.requestDataFiltered[d].sourceFieldName]: {
                    "type": this.requestDataFiltered[d].datatypeVerified,

                  }
                }
              })


            }
          }


        }

      }

      console.log(" this.requestProperty = ", this.requestProperty)
    }
    //step 4 - Request non-array values from request data into a new json

    for (var g = 0; g < this.requestDataFiltered.length; g++) {

      for (var h = 0; h < this.combinedDataAfterExtractionSource.length; h++) {

        if (arrayFlag == true) {

          if (!(this.combinedDataAfterExtractionSource[h].key).includes(this.requestDataFiltered[g].sourceFieldName) && ((this.requestDataFiltered[g].datatypeVerified) !== "array")) {
            // console.log("Inside if od step 4")
            // console.log("this.combinedDataAfterExtractionSource[h].key = ", this.combinedDataAfterExtractionSource[h].key)

            for (var j = 0; j < this.combinedDataAfterExtractionSource.length; j++) {

              if (this.combinedDataAfterExtractionSource[j].key.includes(this.combinedDataAfterExtractionSource[h].key) && ((this.combinedDataAfterExtractionSource[j].value) !== "array")) {
                console.log("Inside 2nd if of step 4")

                // console.log("this.combinedDataAfterExtractionSource[j].key = ", this.combinedDataAfterExtractionSource[j].key)

                // console.log("this.combinedDataAfterExtractionSource[h].key= ", this.combinedDataAfterExtractionSource[h].key)


                this.requestPropertyNonArray.push({
                  key: this.requestDataFiltered[g].sourceFieldName, value:
                  {
                    [this.requestDataFiltered[g].sourceFieldName]: {
                      "type": this.requestDataFiltered[g].datatypeVerified,

                    }
                  }
                })
                j = this.combinedDataAfterExtractionSource.length
                h = this.combinedDataAfterExtractionSource.length
              }
            }


          }

        }

        else if (arrayFlag == false) {


          if ((this.combinedDataAfterExtractionSource[h].key).includes(this.requestDataFiltered[g].sourceFieldName) && ((this.requestDataFiltered[g].datatypeVerified) !== "array")) {
            // console.log("Inside if od step 4")
            // console.log("this.combinedDataAfterExtractionSource[h].key = ", this.combinedDataAfterExtractionSource[h].key)

            for (var j = 0; j < this.combinedDataAfterExtractionSource.length; j++) {

              if (this.combinedDataAfterExtractionSource[j].key.includes(this.combinedDataAfterExtractionSource[h].key) && ((this.combinedDataAfterExtractionSource[j].value) !== "array")) {
                console.log("Inside 2nd if of step 4")

                // console.log("this.combinedDataAfterExtractionSource[j].key = ", this.combinedDataAfterExtractionSource[j].key)

                // console.log("this.combinedDataAfterExtractionSource[h].key= ", this.combinedDataAfterExtractionSource[h].key)


                this.requestPropertyNonArray.push({
                  key: this.requestDataFiltered[g].sourceFieldName, value:
                  {
                    [this.requestDataFiltered[g].sourceFieldName]: {
                      "type": this.requestDataFiltered[g].datatypeVerified,

                    }
                  }
                })
                j = this.combinedDataAfterExtractionSource.length
                h = this.combinedDataAfterExtractionSource.length
              }
            }


          }
        }

      }
    }
    console.log("this.requestPropertyNonArray = ", this.requestPropertyNonArray)


    if (arrayFlag === true) {

      for (var l = 0; l < this.requestPropertyNonArray.length; l++) {
        var flag = false;
        for (var z = 0; z < this.requestProperty.length; z++) {

          var value1 = Object.keys(this.requestPropertyNonArray[l].value)
          var value2 = Object.keys(this.requestProperty[z].value)

          if (value1[0] == value2[0]) {
            console.log("inside z if / flag = true")
            flag = true
          }
        }

        if (flag === false) {
          this.requestPropNonArray2.push(this.requestPropertyNonArray[l])
        }
      }
    }
    else {
      this.requestPropNonArray2 = (this.requestPropertyNonArray)
    }
    console.log("this.requestPropNonArray2 = ", this.requestPropNonArray2)



    //step 5 - Arrange the values in the fields json


    for (var x = 0; x < this.requestProperty.length; x++) {

      if (this.requestLayout.length !== 0) {

        for (var c = 0; c < this.requestLayout.length; c++) {

          if (this.requestProperty[x].key.includes(this.requestLayout[c].key)) {
            console.log("Inside last if  = ")
            console.log("Object.keys(this.requestProperty[x].value)[0] = ", Object.keys(this.requestProperty[x].value)[0]);
            console.log("Object.values(this.requestProperty[x].value)[0] = ", Object.values(this.requestProperty[x].value)[0]);
            console.log("this.requestLayout[c].key = ", this.requestLayout[c].key)
            this.finalRequest = this.requestLayout[c].value
            console.log("abc = ", this.finalRequest)
            this.finalRequest[this.requestLayout[c].key].items.properties[Object.keys(this.requestProperty[x].value)[0]] = Object.values(this.requestProperty[x].value)[0]
          }

        }

      }

    }

    for (var v = 0; v < this.requestPropNonArray2.length; v++) {
      this.finalRequestWithoutArray.push(this.requestPropNonArray2[v].value)

    }

    console.log("Final requestLayout = ", this.requestLayout)
    console.log("this.finalRequestWithoutArray = ", this.finalRequestWithoutArray);


    var fields = {};

    console.log("this.finalRequest = ", this.finalRequest)
    console.log("this.finalRequestWithoutArray = ", this.finalRequestWithoutArray)

    if (this.requestLayout.length !== 0) {

      this.finalRequest2.push(this.finalRequest)
    }


    this.finalRequestWithoutArray.forEach((item) => {
      console.log("finalRequestWithoutArray , Item = ", item)
      var key1 = Object.keys(item)
      this.finalRequest2.push(item)
    })
    console.log("this.finalRequest2 = ", this.finalRequest2);

    if (arrayFlag == true) {
      fields['fields'] = this.finalRequest2
    }
    else if (arrayFlag == false) {
      var result = Object.assign({}, ...this.finalRequest2);

      console.log("result of Object.assign = ", result)

      fields["fields"] = result;
    }


    console.log("Fields, Request = ", fields)

    return fields;
  }



  yamlGenResponse() {
    this.responseProperty = [];
    this.responseDataFiltered = [];
    this.responseLayout = [];
    this.responsePropertyNonArray = [];
    this.responseExtraction = [];
    this.responsePropNonArray2 = [];
    this.finalResponseWithoutArray = [];
    this.finalResponse = {};
    this.responseRequest = [];
    this.finalResponse2 = []

    //To check if the file has array

    var arrayFlag: boolean = false;

    for (var ut = 0; ut < this.combinedDataAfterExtractionSourceResponse.length; ut++) {

      if (this.combinedDataAfterExtractionSourceResponse[ut].value == "array") {

        arrayFlag = true;
        ut = this.combinedDataAfterExtractionSourceResponse.length
      }
    }



    //step 1 - filter the mapped data from request array

    console.log("Inside YAML Gen Response")
    console.log("this.responseData = ", this.responseData)
    for (var t = 0; t < this.responseData.length; t++) {
      if (this.responseData[t].directRowNo !== "") {

        this.responseDataFiltered.push(this.responseData[t])
      }

    }
    console.log("this.responseDataFiltered = ", this.responseDataFiltered)
    console.log("this.combinedDataAfterExtractionSourceResponse = ", this.combinedDataAfterExtractionSourceResponse)
    //step 2 - check if any array from request data is present in flattened array

    // this.combinedDataAfterExtractionSource



    for (var y = 0; y < this.responseDataFiltered.length; y++) {

      for (var u = 0; u < this.combinedDataAfterExtractionSourceResponse.length; u++) {
        if (this.combinedDataAfterExtractionSourceResponse[u].key.includes(this.responseDataFiltered[y].sourceFieldName)) {
          for (var a = 0; a < this.combinedDataAfterExtractionSourceResponse.length; a++) {

            if (this.combinedDataAfterExtractionSourceResponse[a].value == "array") {
              var aSplit = this.combinedDataAfterExtractionSourceResponse[u].key.split(".");
              console.log("aSplit = ", aSplit)
              var splitted1 = aSplit[1];

              console.log("splitted1 = ", splitted1)

              var value11 = splitted1


              if (this.combinedDataAfterExtractionSourceResponse[a].key.includes(value11)) {


                var newArray = this.combinedDataAfterExtractionSourceResponse[a].key.split(".");
                var newValue = newArray[newArray.length - 2]


                var splitted = newValue.split(".");
                console.log(" ------- splitted Response--------- = ", splitted)
                var responseValue = newArray[0]
                var newValue2 = newArray[1]

                console.log("New newValue2  = ", newValue2)
                this.responseLayout.push({
                  key: newValue, value:
                  {
                    [responseValue]:

                    {
                      [newValue2]: {
                        "type": "array",
                        "items": {
                          "properties": {

                          },
                          "type": "object"
                        }
                      }
                    }
                  }
                })

                a = this.combinedDataAfterExtractionSourceResponse.length;
                u = this.combinedDataAfterExtractionSourceResponse.length;
                console.log("YAML Gen response ends")
              }
            }
          }
        }
      }
      console.log(" this.responseLayout = ", this.responseLayout)
    }
    //step 3  - segregate the array values having a corresponding flattened array type in a new json

    for (var d = 0; d < this.responseDataFiltered.length; d++) {

      for (var s = 0; s < this.combinedDataAfterExtractionSourceResponse.length; s++) {
        if (this.combinedDataAfterExtractionSourceResponse[s].key.includes("." + this.responseDataFiltered[d].sourceFieldName + ".") && ((this.responseDataFiltered[d].datatypeVerified) !== "array")) {
          // console.log("this.combinedDataAfterExtractionSourceResponse[u].key = ", this.combinedDataAfterExtractionSourceResponse[s].key)

          // console.log("this.responseDataFiltered[y].sourceFieldName = ", this.responseDataFiltered[d].sourceFieldName)
          for (var f = 0; f < this.combinedDataAfterExtractionSourceResponse.length; f++) {

            if (this.combinedDataAfterExtractionSourceResponse[f].key.includes(this.combinedDataAfterExtractionSourceResponse[s].key) && (this.combinedDataAfterExtractionSourceResponse[f].value !== "array")) {
              // console.log("this.combinedDataAfterExtractionSourceResponse[f].key = ", this.combinedDataAfterExtractionSourceResponse[f].key)

              // console.log("this.combinedDataAfterExtractionSourceResponse[s].key= ", this.combinedDataAfterExtractionSourceResponse[s].key)

              this.responseProperty.push({
                key: this.combinedDataAfterExtractionSourceResponse[s].key, value: {

                  [this.responseDataFiltered[d].sourceFieldName]: {
                    "type": this.responseDataFiltered[d].datatypeVerified,

                  }
                }
              })


            }
          }


        }

      }

      console.log(" this.responseProperty = ", this.responseProperty)
    }
    //step 4 - Request non-array values from request data into a new json

    for (var g = 0; g < this.responseDataFiltered.length; g++) {

      for (var h = 0; h < this.combinedDataAfterExtractionSourceResponse.length; h++) {
        if (arrayFlag == true) {

          if (!((this.combinedDataAfterExtractionSourceResponse[h].key).includes(this.responseDataFiltered[g].sourceFieldName)) && ((this.responseDataFiltered[g].datatypeVerified) !== "array")) {

            for (var j = 0; j < this.combinedDataAfterExtractionSourceResponse.length; j++) {

              if (this.combinedDataAfterExtractionSourceResponse[j].key.includes(this.combinedDataAfterExtractionSourceResponse[h].key) && ((this.combinedDataAfterExtractionSourceResponse[j].value) !== "array")) {


                this.responsePropertyNonArray.push({
                  key: this.responseDataFiltered[g].sourceFieldName, value:
                  {
                    [this.responseDataFiltered[g].sourceFieldName]: {
                      "type": this.responseDataFiltered[g].datatypeVerified,

                    }
                  }
                })
                j = this.combinedDataAfterExtractionSourceResponse.length
                h = this.combinedDataAfterExtractionSourceResponse.length
              }
            }


          }
        }
        else if (arrayFlag == false) {



          if (((this.combinedDataAfterExtractionSourceResponse[h].key).includes(this.responseDataFiltered[g].sourceFieldName)) && ((this.responseDataFiltered[g].datatypeVerified) !== "array")) {
            // console.log("Inside if od step 4")
            // console.log("this.combinedDataAfterExtractionSourceResponse[h].key = ", this.combinedDataAfterExtractionSourceResponse[h].key)

            for (var j = 0; j < this.combinedDataAfterExtractionSourceResponse.length; j++) {

              if (this.combinedDataAfterExtractionSourceResponse[j].key.includes(this.combinedDataAfterExtractionSourceResponse[h].key) && ((this.combinedDataAfterExtractionSourceResponse[j].value) !== "array")) {
                // console.log("Inside 2nd if of step 4")

                // console.log("this.combinedDataAfterExtractionSourceResponse[j].key = ", this.combinedDataAfterExtractionSourceResponse[j].key)

                // console.log("this.combinedDataAfterExtractionSourceResponse[h].key= ", this.combinedDataAfterExtractionSourceResponse[h].key)


                this.responsePropertyNonArray.push({
                  key: this.responseDataFiltered[g].sourceFieldName, value:
                  {
                    [this.responseDataFiltered[g].sourceFieldName]: {
                      "type": this.responseDataFiltered[g].datatypeVerified,

                    }
                  }
                })
                j = this.combinedDataAfterExtractionSourceResponse.length
                h = this.combinedDataAfterExtractionSourceResponse.length
              }
            }


          }
        }

      }



    }

    console.log("this.responseProperty = ", this.responseProperty)
    console.log("this.responsePropertyNonArray = ", this.responsePropertyNonArray)


    if (arrayFlag === true) {

      console.log("this.responsePropertyNonArray = ", this.responsePropertyNonArray)
      for (var l = 0; l < this.responsePropertyNonArray.length; l++) {
        var flag = false;
        for (var z = 0; z < this.responseProperty.length; z++) {

          var value1 = Object.keys(this.responsePropertyNonArray[l].value)
          var value2 = Object.keys(this.responseProperty[z].value)
          var value3 = this.responseProperty[z]

          if (value1[0] == value2[0]) {
            console.log("inside z if / flag = true")
            flag = true
          }
        }

        if (flag === false) {
          console.log("Inside Flag is false")
          this.responsePropNonArray2.push(this.responsePropertyNonArray[l])
        }
      }
    }
    else {
      console.log("Inside else of arrayFlag = false")

      this.responsePropNonArray2 = (this.responsePropertyNonArray)
    }
    console.log("this.responsePropNonArray2 = ", this.responsePropNonArray2)



    //step 5 - Arrange the values in the fields json
    console.log("this.responseProperty = ", this.responseProperty)
    console.log("this.responseLayout = ", this.responseLayout)

    for (var x = 0; x < this.responseProperty.length; x++) {

      if (this.responseLayout.length !== 0) {

        for (var c = 0; c < this.responseLayout.length; c++) {

          if (this.responseProperty[x].key.includes(this.responseLayout[c].key)) {
            console.log("Inside last if  = ")
            console.log("Object.keys(this.responseProperty[x].value)[0] = ", Object.keys(this.responseProperty[x].value)[0]);
            console.log("Object.values(this.responseProperty[x].value)[0] = ", Object.values(this.responseProperty[x].value)[0]);
            console.log("this.responseLayout[c].key = ", this.responseLayout[c].key)

            var xyz = Object.keys(this.responseLayout[c].value)[0]
            var abc = Object.values(this.responseLayout[c].value)[0]
            // this.finalResponse = this.responseLayout[c].value

            this.finalResponse = this.responseLayout[c].value
            // this.finalResponse = abc

            var pqr = this.responseLayout[c].key.replace(xyz + ".", "")
            console.log("xyz = ", xyz)
            console.log("pqr = ", pqr)
            console.log("this.finalResponse[xyz].pqr = ", this.finalResponse[xyz][pqr])
            // this.finalResponse[pqr].items.properties[Object.keys(this.responseProperty[x].value)[0]] = Object.values(this.responseProperty[x].value)[0]
            this.finalResponse[xyz][pqr].items.properties[Object.keys(this.responseProperty[x].value)[0]] = Object.values(this.responseProperty[x].value)[0]


          }

        }

      }

    }

    for (var v = 0; v < this.responsePropNonArray2.length; v++) {
      this.finalResponseWithoutArray.push(this.responsePropNonArray2[v].value)

    }

    console.log("Final responseLayout = ", this.responseLayout)
    console.log("this.finalResponseWithoutArray = ", this.finalResponseWithoutArray);


    var fields = {};

    console.log("this.finalResponse = ", this.finalResponse)
    console.log("this.finalResponseWithoutArray = ", this.finalResponseWithoutArray)

    if (JSON.stringify(this.finalResponse) !== '{}') {
      this.finalResponse2.push(this.finalResponse)
    }

    this.finalResponseWithoutArray.forEach((item) => {
      console.log("finalResponseWithoutArray , Item = ", item)
      var key1 = Object.keys(item)
      this.finalResponse2.push(item)
    })
    console.log("this.finalResponse2 = ", this.finalResponse2);

    if (arrayFlag == true) {
      fields['responses'] = this.finalResponse2
    }
    else if (arrayFlag == false) {
      var result = Object.assign({}, ...this.finalResponse2);

      console.log("result of Object.assign = ", result)

      fields["responses"] = result;
    }

    console.log("Fields ,Response= ", fields)

    return fields;
  }

  // PART - 2 / FILE -2

  /**
   * @author Sucheta
   * @param data
   * @description This function is used to get the json structure for esql generation
   */

  getFlattenStructure12() {


    this.dataForEsql2 = [];
    this.dataWithDirectRowNo2 = [];
    this.dataWithNoDirectRow2 = [];

    console.log(" this.combinedDataAfterExtractionSource2 = ", this.combinedDataAfterExtractionSource2)
    for (var i = 0; i < this.requestData2.length; i++) {
      if (this.requestData2[i].directRowNo !== "") {
        this.dataWithDirectRowNo2.push(this.requestData2[i]);
      }
      else {
        this.dataWithNoDirectRow2.push(this.requestData2[i]);
      }
    }
    console.log("this.dataWithDirectRowNo2 = ", this.dataWithDirectRowNo2)


    //fieldDefinitions ----------
    for (var y = 0; y < this.dataWithDirectRowNo2.length; y++) {
      for (var u = 0; u < this.combinedDataAfterExtractionSource2.length; u++) {
        if (this.combinedDataAfterExtractionSource2[u].key.includes(this.dataWithDirectRowNo2[y].sourceFieldName)) {

          for (var a = 0; a < this.combinedDataAfterExtractionSource2.length; a++) {
            //new ----------------
            if (this.combinedDataAfterExtractionSource2[a].value == "array") {
              var aSplit = this.combinedDataAfterExtractionSource2[u].key.split(".");
              console.log("aSplit = ", aSplit)
              var splitted1 = aSplit[0];

              console.log("splitted1 = ", splitted1)

              var value11 = splitted1

              if (this.combinedDataAfterExtractionSource2[a].key.includes(value11)) {

                var newArray = this.combinedDataAfterExtractionSource2[a].key.split(".");
                var newValue = newArray[newArray.length - 2]

                var splitted = newValue.split(".");
                console.log(" ------- splitted Response--------- = ", splitted)
                var responseValue = newArray[0]
                var newValue2 = newArray[1]

                console.log("New newValue2  = ", newValue2)
                this.fieldDefinitionsRequest2.push({
                  "fieldName": newValue,
                  "fieldType": "Array",
                  "format": "JSON",
                  "preset": "source"
                })

                a = this.combinedDataAfterExtractionSource2.length;
                u = this.combinedDataAfterExtractionSource2.length;
                console.log("ESQL Request field definitions ends")
              }
            }

            //new  ends ---------------

          }

        }
      }

      // fieldDefinitions ends

      //remove duplicate field definitions

      this.fieldDefinitionsRequest2 = this.removeDupFieldDefinitions(this.fieldDefinitionsRequest2)

      //remove duplicate field definitions ends

      for (var i = 0; i < this.dataWithDirectRowNo2.length; i++) {
        console.log("Inside 1")
        for (var j = 0; j < this.combinedDataAfterExtractionSource2.length; j++) {

          console.log("Inside 2")
          var x = this.combinedDataAfterExtractionSource2[j].key;
          if (x !== undefined) {


            var splitted = x.split(".");

            // console.log("Slippeted = ", splitted)
            for (var t = 0; t < splitted.length; t++) {
              var data = splitted[t];

              // console.log("Inside if , this.dataWithDirectRowNo2[i].sourceFieldName = ", this.dataWithDirectRowNo2[i].sourceFieldName)
              if (this.dataWithDirectRowNo2[i].sourceFieldName === splitted[t] && this.dataWithDirectRowNo2[i].datatypeVerified === this.combinedDataAfterExtractionSource2[j].value) {

                var sourceJson = this.combinedDataAfterExtractionSource2[j].key;
                var val = sourceJson.replace(".type", "");
                this.dataForEsql2.push({
                  'source': val,
                  'target': this.dataWithDirectRowNo2[i].tfieldName,
                  'operation': ""
                })
                console.log("Inside loop, this.dataForEsql2 = ", this.dataForEsql2)
              }

            }
          }

        }
      }
    }

    var obj = {};

    for (var t = 0; t < this.dataForEsql2.length; t++) {


      obj[this.dataForEsql2[t]['target']] = this.dataForEsql2[t];
    }
    this.dataForEsqlRequest2 = new Array();
    for (var key in obj)
      this.dataForEsqlRequest2.push(obj[key]);



    console.log(" Final this.dataForEsql2 Request= ", this.dataForEsql2)

    this.finalDataForEsql2 = {
      "sourceType": "JSON",
      "targetType": "DFDL",
      "fieldDefinitions": this.fieldDefinitionsRequest2,
      "fields": this.dataForEsqlRequest2
    }

    var finalEsqlObject = {
      "mappedObj": this.finalDataForEsql2,
      "templateName": config.templateNameEsql,
      "fileName": config.fileNameEsql_Scene_4_Request_2,
      "clientName": "abc",
      "username": this.username,
      "orgName": this.organisation,
      "productName": this.productName,
      "serviceName": "ecollection with remitter validation at bank and client's end",
      "projectId": this.projectId,
      "clientCode": this.clientCode,
      "fileCount": 3,
      "serializationFormat": this.webServiceType,
      "accountNo": this.poolAccountNumber,
      "IFSCCode": this.ifscCode,
      "basePath": "/ecollection/" + this.clientCode,
      "path": "/confirmation",
      "txnReversal": "No"

    }
    console.log("finalEsqlObject Request", JSON.stringify(finalEsqlObject))

    this.mapping4Service.postESQL(finalEsqlObject).then((dataEsql) => {

      console.log("response dataEsql = ", dataEsql)

      this.toastr.success("Response for ESQL :" + dataEsql.message);

      this.getFlattenStructureResponse12();

    })
  }

  /**
  * @author Sucheta
  * @param data
  * @description This function is used to get the json structure for esql generation
  */

  getFlattenStructureResponse12() {
    console.log("this.requestData2");

    this.dataForEsqlResponse2 = [];
    this.dataWithDirectRowNo2 = [];
    this.dataWithNoDirectRow2 = [];

    console.log(" this.combinedDataAfterExtractionSource2 = ", this.combinedDataAfterExtractionSource2)
    for (var i = 0; i < this.responseData2.length; i++) {
      if (this.responseData2[i].directRowNo !== "") {
        this.dataWithDirectRowNo2.push(this.responseData2[i]);
      }
      else {
        this.dataWithNoDirectRow2.push(this.responseData2[i]);
      }
    }
    console.log("this.dataWithDirectRowNo2 = ", this.dataWithDirectRowNo2)

    //fieldDefinitions ----------


    for (var y = 0; y < this.dataWithDirectRowNo2.length; y++) {

      for (var u = 0; u < this.combinedDataAfterExtractionSourceResponse2.length; u++) {
        if (this.combinedDataAfterExtractionSourceResponse2[u].key.includes(this.dataWithDirectRowNo2[y].sourceFieldName)) {
          // console.log("!!######    if   ######## = ")
          for (var a = 0; a < this.combinedDataAfterExtractionSourceResponse2.length; a++) {
            // console.log("##### this.combinedDataAfterExtractionSourceResponse2[a].key = ", this.combinedDataAfterExtractionSourceResponse2[a].key)

            // console.log("#######  this.combinedDataAfterExtractionSourceResponse2[u].key = ", this.combinedDataAfterExtractionSourceResponse2[u].key)

            // console.log(" ######  this.combinedDataAfterExtractionSourceResponse2[u].value = ", this.combinedDataAfterExtractionSourceResponse2[u].value)
            // if (this.combinedDataAfterExtractionSourceResponse2[a].key.includes(this.combinedDataAfterExtractionSourceResponse2[u].key) && (this.combinedDataAfterExtractionSourceResponse2[u].value == "array")) {


            //   var newValue = this.combinedDataAfterExtractionSourceResponse2[u].key.replace(".type", "")


            //   var splitted = newValue.split(".");
            //   console.log(" ------- splitted Response--------- = ", splitted)
            //   var responseValue = splitted[0]

            //   var newValue3 = newValue.replace(responseValue + ".", "")

            //   console.log("New value3  = ", newValue3)
            //   this.fieldDefinitionsResponse2.push({
            //     "fieldName": newValue3,
            //     "fieldType": "array",
            //     "format": "JSON",
            //     "preset": "target"
            //   })

            //   a = this.combinedDataAfterExtractionSourceResponse2.length;
            // }

            //new -----

            if (this.combinedDataAfterExtractionSourceResponse2[a].value == "array") {
              var aSplit = this.combinedDataAfterExtractionSourceResponse2[u].key.split(".");
              console.log("aSplit = ", aSplit)
              var splitted1 = aSplit[1];

              console.log("splitted1 = ", splitted1)

              var value11 = splitted1


              if (this.combinedDataAfterExtractionSourceResponse2[a].key.includes(value11)) {


                var newArray = this.combinedDataAfterExtractionSourceResponse2[a].key.split(".");
                var newValue = newArray[newArray.length - 2]


                var splitted = newValue.split(".");
                console.log(" ------- splitted Response--------- = ", splitted)
                var responseValue = newArray[0]
                var newValue2 = newArray[1]
                console.log("newValue2 = ", newValue2)
                console.log("New newValue2  = ", newValue2)
                this.fieldDefinitionsResponse2.push({
                  "fieldName": newValue2,
                  "fieldType": "Array",
                  "format": "JSON",
                  "preset": "source"
                })

                a = this.combinedDataAfterExtractionSourceResponse2.length;
                u = this.combinedDataAfterExtractionSourceResponse2.length;
                console.log("ESQL Response field definitions ends")
              }
            }



            //new ends --------
          }

        }
      }
      console.log(" this.fieldDefinitionsResponse2 = ", this.fieldDefinitionsResponse2)
    }


    // fieldDefinitions ends

    //
    this.fieldDefinitionsResponse2 = this.removeDupFieldDefinitions(this.fieldDefinitionsResponse2)


    for (var i = 0; i < this.dataWithDirectRowNo2.length; i++) {
      for (var j = 0; j < this.combinedDataAfterExtractionSource2.length; j++) {

        var x = this.combinedDataAfterExtractionSource2[j].key;
        if (x !== undefined) {


          var splitted = x.split(".");

          for (var t = 0; t < splitted.length; t++) {
            var data = splitted[t];

            if (this.dataWithDirectRowNo2[i].sourceFieldName === splitted[t] && this.dataWithDirectRowNo2[i].datatypeVerified === this.combinedDataAfterExtractionSource2[j].value && this.dataWithDirectRowNo2[i].tfieldName == "RejectionReason") {
              var sourceJson = this.combinedDataAfterExtractionSource2[j].key;
              var val = sourceJson.replace(".type", "");
              this.dataForEsqlResponse2.push({
                'source': this.dataWithDirectRowNo2[i].tfieldName,
                'target': val,
                'operation': "coalesce"
              })
            }

            else if (this.dataWithDirectRowNo2[i].sourceFieldName === splitted[t] && this.dataWithDirectRowNo2[i].datatypeVerified === this.combinedDataAfterExtractionSource2[j].value && this.dataWithDirectRowNo2[i].tfieldName !== "RejectionReason") {
              var sourceJson = this.combinedDataAfterExtractionSource2[j].key;
              var val = sourceJson.replace(".type", "");
              this.dataForEsqlResponse2.push({
                'source': this.dataWithDirectRowNo2[i].tfieldName,
                'target': val,
                'operation': ""
              })
            }

          }
        }

      }
    }

    this.dataForEsqlResponse2FundTransfer = this.dataForEsqlResponse2;

    this.dataForEsqlResponse2FundTransfer.push({
      "source": "Reserved7",
      "target": "Virtual Account Number Verification OUT.Item.Reserved7",
      "operation": ""
    })

    this.dataForEsqlResponse2FundTransfer.push({
      "source": "Reserved8",
      "target": "Virtual Account Number Verification OUT.Item.Reserved8",
      "operation": ""

    })

    this.dataForEsqlResponse2FundTransfer.push({
      "source": "Reserved9",
      "target": "Virtual Account Number Verification OUT.Item.Reserved9",
      "operation": ""
    })

    this.dataForEsqlResponse2FundTransfer.push({
      "source": "Reserved10",
      "target": "Virtual Account Number Verification OUT.Item.Reserved10",
      "operation": ""
    })


    console.log(" this.dataForEsqlResponse2 , Response= ", this.dataForEsqlResponse2)

    this.finalDataForEsql2 = {
      "sourceType": "JSON",
      "targetType": "DFDL",
      "fieldDefinitions": this.fieldDefinitionsResponse2,
      "fields": this.dataForEsqlResponse2
    }



    var finalEsqlObject_2 = {
      "mappedObj": this.finalDataForEsql2,
      "templateName": config.templateNameEsql,
      "fileName": config.fileNameEsql_Scene_4_Response_2,
      "clientName": "abc",
      "username": this.username,
      "orgName": this.organisation,
      "productName": this.productName,
      "serviceName": "ecollection with remitter validation at bank and client's end",
      "projectId": this.projectId,
      "clientCode": this.clientCode,
      "fileCount": 4,
      "serializationFormat": this.webServiceType,
      "accountNo": this.poolAccountNumber,
      "IFSCCode": this.ifscCode,
      "basePath": "/ecollection/" + this.clientCode,
      "path": "/confirmation",
      "txnReversal": "No"
    }


    this.finalDataForEsql2FundTransfer = {
      "sourceType": "JSON",
      "targetType": "DFDL",
      "fieldDefinitions": this.fieldDefinitionsResponse2,
      "fields": this.dataForEsqlResponse2FundTransfer
    }

    var finalEsqlObject_3 = {
      "mappedObj": this.finalDataForEsql2FundTransfer,
      "templateName": config.templateNameEsql,
      "fileName": config.fileNameEsql_Scene_4_Response_3,
      "clientName": "abc",
      "username": this.username,
      "orgName": this.organisation,
      "productName": this.productName,
      "serviceName": "ecollection with remitter validation at bank and client's end",
      "projectId": this.projectId,
      "clientCode": this.clientCode,
      "fileCount": 5,
      "serializationFormat": this.webServiceType,
      "accountNo": this.poolAccountNumber,
      "IFSCCode": this.ifscCode,
      "basePath": "/ecollection/" + this.clientCode,
      "path": "/confirmation",
      "txnReversal": "No"
    }



    var finalEsqlObject_4 = {
      "mappedObj": this.finalDataForEsql2FundTransfer,
      "templateName": config.templateNameEsql,
      "fileName": config.fileNameEsql_Scene_4_Response_4,
      "clientName": "abc",
      "username": this.username,
      "orgName": this.organisation,
      "productName": this.productName,
      "serviceName": "ecollection with remitter validation at bank and client's end",
      "projectId": this.projectId,
      "clientCode": this.clientCode,
      "fileCount": 6,
      "serializationFormat": this.webServiceType,
      "accountNo": this.poolAccountNumber,
      "IFSCCode": this.ifscCode,
      "basePath": "/ecollection/" + this.clientCode,
      "validationPath": "/validation",
      "confirmationPath": "/confirmation",
      "txnReversal": "No"
    }


    console.log("finalEsqlObject , Response", JSON.stringify(finalEsqlObject_2))

    this.mapping4Service.postESQL(finalEsqlObject_2).then((dataEsql) => {

      console.log(" 2nd response")
      console.log("response dataEsql = ", dataEsql)

      this.toastr.success("Response for ESQL  :" + dataEsql.message);

      console.log("3rd response")
      this.mapping4Service.postESQL(finalEsqlObject_3).then((dataEsql) => {

        console.log("response dataEsql = ", dataEsql)

        // this.toastr.success("Response for ESQL  :" + dataEsql.message);


        this.mapping4Service.postESQL(finalEsqlObject_4).then((dataEsql) => {

          console.log("4th response")
          console.log("response dataEsql = ", dataEsql)

          // this.toastr.success("Response for ESQL  :" + dataEsql.message);

          this.yamlCreation(this.serviceUrl);
          this.yamlCreation2(this.serviceUrl);

        })
      })
    })
  }

  /**
  * @author : Sucheta
  * @description : Generate YAML.
  */


  async yamlCreation2(clientUrl) {
    var flattenData =
    {

      "description": "",
      "title": "test",
      "ibmName": "test",
      "targetUrl": "http://example.com/operation-name",
      "targetUrlDescription": "The URL of the target service",
      "basePath": "/ecollection",
      "path": "/transaction",
      "operations": [
        {
          "operationId": null,
          "path": "/transaction",
          "method": "post",
          "fields": [
            {
              "Virtual Account Number Verification IN": {
                "type": "array",
                "items": {
                  "properties": {
                    "Client Code": {
                      "type": "string"
                    },
                    "Virtual Account Number": {
                      "type": "string"
                    },
                    "Transaction Amount": {
                      "type": "number"
                    },
                    "UTR number": {
                      "type": "string"
                    },
                    "Sender Name": {
                      "type": "string"
                    },
                    "Date": {
                      "type": "string"
                    },
                    "Sender IFSC_Code": {
                      "type": "string"
                    },
                    "Remitter Account Number": {
                      "type": "string"
                    },
                    "Mode": {
                      "type": "string"
                    },
                    "Status": {
                      "type": "string"
                    },
                    "sender to receiver information": {
                      "type": "string"
                    }
                  },
                  "type": "object"
                }
              }
            }
          ],
          "responses": [
            {
              "200": {
                "Virtual Account Number Verification OUT": {
                  "type": "array",
                  "items": {
                    "properties": {
                      "Client Code": {
                        "type": "string"
                      },
                      "Virtual Account Number": {
                        "type": "string"
                      },
                      "Transaction Amount": {
                        "type": "number"
                      },
                      "UTR number": {
                        "type": "string"
                      },
                      "Sender Name": {
                        "type": "string"
                      },
                      "Date": {
                        "type": "string"
                      },
                      "Sender IFSC_Code": {
                        "type": "string"
                      },
                      "Remitter Account Number": {
                        "type": "string"
                      },
                      "Mode": {
                        "type": "string"
                      },
                      "Status": {
                        "type": "string"
                      },
                      "Reject Reason": {
                        "type": "string"
                      }
                    },
                    "type": "object"
                  }
                }
              }
            }
          ]
        }
      ]

    }



    // console.log("combinedDataAfterExtractionSource2 = ", this.combinedDataAfterExtractionSource2);

    var combArray = [];
    this.combinedDataAfterExtractionSource2.forEach((item, index) => {

      combArray.push({ ['"' + item.key + '"']: item.value })
    })
    console.log("combArray = ", combArray)
    var unflattenValue = this.unflatten(combArray[2])

    // console.log("unflattenValue = ", Object.assign(unflattenValue))

    var requestField = this.yamlGenRequest2();
    var responseField = this.yamlGenResponse2();
    console.log("Request fields =", requestField);
    console.log("Response fileds =", responseField)

    var finalYaml = [{
      "description": "",
      "title": "test",
      "ibmName": "test",
      "targetUrl": clientUrl,
      "targetUrlDescription": "The URL of the target service",
      "basePath": "/ecollection/" + this.clientCode,
      "path": "/confirmation",
      "operations": [
        {

          "operationId": null,
          "path": this.sourcePath2,
          "method": this.sourceMethod2,
          fields: [requestField['fields']],
          responses: [responseField['responses']]
        }
      ]
    }]

    // console.log("hardcoded , flattenData = ", flattenData)

    console.log("Final Yaml File =", finalYaml[0])


    var yamlObject = {
      'params': finalYaml[0],
      'templateName': 'template.yaml',
      'fileName': config.fileName_yaml_confirmation,
      "username": this.username,
      "orgName": this.organisation,
      "productName": this.productName,
      "serviceName": "ecollection with remitter validation at bank and client's end",
      'projectId': this.projectId,
      "clientCode": this.clientCode,
      "fileCount": 2,
      "txnReversal": "No"
    }

    this.mapping4Service.postYamlData(yamlObject).then((yamlResponse) => {

      console.log("yamlResponse = ", yamlResponse)
      this.toastr.success("Response for Yaml :" + yamlResponse.message);

    })
  }


  yamlGenRequest2() {
    this.requestProperty2 = [];
    this.requestDataFiltered2 = [];
    this.requestLayout2 = [];
    this.requestPropertyNonArray2 = [];
    this.requestExtraction2 = [];
    this.requestPropNonArray22 = [];
    this.finalRequestWithoutArray2 = [];
    this.finalRequest12 = [];
    this.finalRequest22 = []

    //To check if the file has an array.

    var arrayFlag: boolean = false;

    for (var ut = 0; ut < this.combinedDataAfterExtractionSource2.length; ut++) {

      if (this.combinedDataAfterExtractionSource2[ut].value == "array") {

        arrayFlag = true;
        ut = this.combinedDataAfterExtractionSource2.length
      }
    }

    //step 1 - filter the mapped data from request array

    for (var t = 0; t < this.requestData2.length; t++) {
      if (this.requestData2[t].directRowNo !== "") {

        this.requestDataFiltered2.push(this.requestData2[t])
      }

    }
    console.log("this.requestDataFiltered2 = ", this.requestDataFiltered2)
    //step 2 - check if any array from request data is present in flattened array

    // this.combinedDataAfterExtractionSource2

    for (var y = 0; y < this.requestDataFiltered2.length; y++) {

      for (var u = 0; u < this.combinedDataAfterExtractionSource2.length; u++) {
        if (this.combinedDataAfterExtractionSource2[u].key.includes(this.requestDataFiltered2[y].sourceFieldName)) {

          for (var a = 0; a < this.combinedDataAfterExtractionSource2.length; a++) {

            if (this.combinedDataAfterExtractionSource2[a].key.includes(this.combinedDataAfterExtractionSource2[u].key) && (this.combinedDataAfterExtractionSource2[u].value == "array")) {


              var newValue = this.combinedDataAfterExtractionSource2[u].key.replace(".type", "")
              this.requestLayout2.push({
                key: newValue, value:

                {
                  [newValue]: {
                    "type": "array",
                    "items": {
                      "properties": {

                      },
                      "type": "object"
                    }
                  }
                }
              })

              a = this.combinedDataAfterExtractionSource2.length;
            }
          }

        }
      }
      // console.log(" this.requestLayout2 = ", this.requestLayout2)
    }

    //step 3  - segregate the array values having a corresponding flattened array type in a new json

    for (var d = 0; d < this.requestDataFiltered2.length; d++) {

      for (var s = 0; s < this.combinedDataAfterExtractionSource2.length; s++) {
        if (this.combinedDataAfterExtractionSource2[s].key.includes("." + this.requestDataFiltered2[d].sourceFieldName + ".") && ((this.requestDataFiltered2[d].datatypeVerified) !== "array")) {
          // console.log("this.combinedDataAfterExtractionSource2[u].key = ", this.combinedDataAfterExtractionSource2[s].key)

          // console.log("this.requestDataFiltered2[y].sourceFieldName = ", this.requestDataFiltered2[d].sourceFieldName)
          for (var f = 0; f < this.combinedDataAfterExtractionSource2.length; f++) {

            if (this.combinedDataAfterExtractionSource2[f].key.includes(this.combinedDataAfterExtractionSource2[s].key) && (this.combinedDataAfterExtractionSource2[f].value !== "array")) {
              // console.log ("this.combinedDataAfterExtractionSource2[f].key = ", this.combinedDataAfterExtractionSource2[f].key)

              // console.log ("this.combinedDataAfterExtractionSource2[s].key= ", this.combinedDataAfterExtractionSource2[s].key)

              this.requestProperty2.push({
                key: this.combinedDataAfterExtractionSource2[s].key, value: {



                  [this.requestDataFiltered2[d].sourceFieldName]: {
                    "type": this.requestDataFiltered2[d].datatypeVerified,

                  }
                }
              })


            }
          }


        }

      }

      console.log(" this.requestProperty2 = ", this.requestProperty2)
    }
    //step 4 - Request non-array values from request data into a new json

    for (var g = 0; g < this.requestDataFiltered2.length; g++) {

      for (var h = 0; h < this.combinedDataAfterExtractionSource2.length; h++) {

        if (arrayFlag == true) {

          if (!((this.combinedDataAfterExtractionSource2[h].key).includes(this.requestDataFiltered2[g].sourceFieldName)) && ((this.requestDataFiltered2[g].datatypeVerified) !== "array")) {
            // console.log("Inside if od step 4")
            // console.log("this.combinedDataAfterExtractionSource2[h].key = ", this.combinedDataAfterExtractionSource2[h].key)

            for (var j = 0; j < this.combinedDataAfterExtractionSource2.length; j++) {

              if (this.combinedDataAfterExtractionSource2[j].key.includes(this.combinedDataAfterExtractionSource2[h].key) && ((this.combinedDataAfterExtractionSource2[j].value) !== "array")) {
                console.log("Inside 2nd if of step 4")

                // console.log("this.combinedDataAfterExtractionSource2[j].key = ", this.combinedDataAfterExtractionSource2[j].key)

                // console.log("this.combinedDataAfterExtractionSource2[h].key= ", this.combinedDataAfterExtractionSource2[h].key)


                this.requestPropertyNonArray2.push({
                  key: this.requestDataFiltered2[g].sourceFieldName, value:
                  {
                    [this.requestDataFiltered2[g].sourceFieldName]: {
                      "type": this.requestDataFiltered2[g].datatypeVerified,

                    }
                  }
                })
                j = this.combinedDataAfterExtractionSource2.length
                h = this.combinedDataAfterExtractionSource2.length
              }
            }


          }

        }


        else if (arrayFlag == false) {

          if (((this.combinedDataAfterExtractionSource2[h].key).includes(this.requestDataFiltered2[g].sourceFieldName)) && ((this.requestDataFiltered2[g].datatypeVerified) !== "array")) {
            // console.log("Inside if od step 4")
            // console.log("this.combinedDataAfterExtractionSource2[h].key = ", this.combinedDataAfterExtractionSource2[h].key)

            for (var j = 0; j < this.combinedDataAfterExtractionSource2.length; j++) {

              if (this.combinedDataAfterExtractionSource2[j].key.includes(this.combinedDataAfterExtractionSource2[h].key) && ((this.combinedDataAfterExtractionSource2[j].value) !== "array")) {
                console.log("Inside 2nd if of step 4")

                // console.log("this.combinedDataAfterExtractionSource2[j].key = ", this.combinedDataAfterExtractionSource2[j].key)

                // console.log("this.combinedDataAfterExtractionSource2[h].key= ", this.combinedDataAfterExtractionSource2[h].key)


                this.requestPropertyNonArray2.push({
                  key: this.requestDataFiltered2[g].sourceFieldName, value:
                  {
                    [this.requestDataFiltered2[g].sourceFieldName]: {
                      "type": this.requestDataFiltered2[g].datatypeVerified,

                    }
                  }
                })
                j = this.combinedDataAfterExtractionSource2.length
                h = this.combinedDataAfterExtractionSource2.length
              }
            }


          }


        }


      }

    }


    if (arrayFlag === true) {

      for (var l = 0; l < this.requestPropertyNonArray2.length; l++) {
        var flag = false;
        for (var z = 0; z < this.requestProperty2.length; z++) {

          var value1 = Object.keys(this.requestPropertyNonArray2[l].value)
          var value2 = Object.keys(this.requestProperty2[z].value)


          if (value1[0] == value2[0]) {
            console.log("inside z if / flag = true")
            flag = true
          }
        }

        if (flag === false) {
          this.requestPropNonArray22.push(this.requestPropertyNonArray2[l])
        }
      }
    }
    else {
      this.requestPropNonArray22 = (this.requestPropertyNonArray2)
    }

    console.log("this.requestPropNonArray22 = ", this.requestPropNonArray22)



    //step 5 - Arrange the values in the fields json


    for (var x = 0; x < this.requestProperty2.length; x++) {

      if (this.requestLayout2.length !== 0) {

        for (var c = 0; c < this.requestLayout2.length; c++) {

          if (this.requestProperty2[x].key.includes(this.requestLayout2[c].key)) {
            console.log("Inside last if  = ")
            console.log("Object.keys(this.requestProperty2[x].value)[0] = ", Object.keys(this.requestProperty2[x].value)[0]);
            console.log("Object.values(this.requestProperty2[x].value)[0] = ", Object.values(this.requestProperty2[x].value)[0]);
            console.log("this.requestLayout2[c].key = ", this.requestLayout2[c].key)
            this.finalRequest12 = this.requestLayout2[c].value
            console.log("abc = ", this.finalRequest12)
            this.finalRequest12[this.requestLayout2[c].key].items.properties[Object.keys(this.requestProperty2[x].value)[0]] = Object.values(this.requestProperty2[x].value)[0]
          }

        }

      }

    }

    for (var v = 0; v < this.requestPropNonArray22.length; v++) {
      this.finalRequestWithoutArray2.push(this.requestPropNonArray22[v].value)

    }

    console.log("Final requestLayout2 = ", this.requestLayout2)
    console.log("this.finalRequestWithoutArray2 = ", this.finalRequestWithoutArray2);


    var fields = {};

    console.log("this.finalRequest12 = ", this.finalRequest12)
    console.log("this.finalRequestWithoutArray2 = ", this.finalRequestWithoutArray2)


    if (this.requestLayout2.length !== 0) {

      this.finalRequest22.push(this.finalRequest12)
    }

    this.finalRequestWithoutArray2.forEach((item) => {
      console.log("finalRequestWithoutArray2 , Item = ", item)
      var key1 = Object.keys(item)
      this.finalRequest22.push(item)
    })
    console.log("this.finalRequest22 = ", this.finalRequest22);

    if (arrayFlag == true) {
      fields['fields'] = this.finalRequest22
    }
    else if (arrayFlag == false) {
      var result = Object.assign({}, ...this.finalRequest22);

      console.log("result of Object.assign = ", result)

      fields["fields"] = result;
    }
    console.log("Fields, Request = ", fields)

    return fields;
  }



  yamlGenResponse2() {
    this.responseProperty2 = [];
    this.responseDataFiltered2 = [];
    this.responseLayout2 = [];
    this.responsePropertyNonArray2 = [];
    this.responseExtraction2 = [];
    this.responsePropNonArray2 = [];
    this.finalResponseWithoutArray2 = [];
    this.finalResponse12 = {};
    // this.responseRequest = [];
    this.finalResponse22 = []


    //To check if the file has an array

    var arrayFlag: boolean = false;

    for (var ut = 0; ut < this.combinedDataAfterExtractionSourceResponse2.length; ut++) {

      if (this.combinedDataAfterExtractionSourceResponse2[ut].value == "array") {

        arrayFlag = true;
        ut = this.combinedDataAfterExtractionSourceResponse2.length
      }
    }




    //step 1 - filter the mapped data from request array

    for (var t = 0; t < this.responseData2.length; t++) {
      if (this.responseData2[t].directRowNo !== "") {

        this.responseDataFiltered2.push(this.responseData2[t])
      }

    }
    console.log("this.responseDataFiltered2 = ", this.responseDataFiltered2)
    //step 2 - check if any array from request data is present in flattened array

    // this.combinedDataAfterExtractionSource2


    for (var y = 0; y < this.responseDataFiltered2.length; y++) {

      for (var u = 0; u < this.combinedDataAfterExtractionSourceResponse2.length; u++) {
        if (this.combinedDataAfterExtractionSourceResponse2[u].key.includes(this.responseDataFiltered2[y].sourceFieldName)) {
          // console.log("!!######    if   ######## = ")
          for (var a = 0; a < this.combinedDataAfterExtractionSourceResponse2.length; a++) {

            if (this.combinedDataAfterExtractionSourceResponse2[a].value == "array") {
              var aSplit = this.combinedDataAfterExtractionSourceResponse2[u].key.split(".");
              console.log("aSplit = ", aSplit)
              // var splitted1 = this.combinedDataAfterExtractionSourceResponse[a].key.replace(".type", "")
              var splitted1 = aSplit[1];

              console.log("splitted1 = ", splitted1)

              // var aSplit2 = splitted1.split(".");
              //  var splitted2 = splitted1.replace(aSplit2[1],"")
              var value11 = splitted1


              if (this.combinedDataAfterExtractionSourceResponse2[a].key.includes(value11)) {


                var newArray = this.combinedDataAfterExtractionSourceResponse2[a].key.split(".");
                var newValue = newArray[newArray.length - 2]


                var splitted = newValue.split(".");
                console.log(" ------- splitted Response--------- = ", splitted)
                var responseValue = newArray[0]
                var newValue2 = newArray[1]

                console.log("New newValue2  = ", newValue2)
                this.responseLayout2.push({
                  key: newValue, value:
                  {
                    [responseValue]:

                    {
                      [newValue2]: {
                        "type": "array",
                        "items": {
                          "properties": {

                          },
                          "type": "object"
                        }
                      }
                    }
                  }
                })

                a = this.combinedDataAfterExtractionSourceResponse2.length;
                u = this.combinedDataAfterExtractionSourceResponse2.length;
                console.log("YAML Gen response2 ends")
              }
            }
          }
        }
      }
      console.log(" this.responseLayout2 = ", this.responseLayout2)
    }

    //step 3  - segregate the array values having a corresponding flattened array type in a new json

    for (var d = 0; d < this.responseDataFiltered2.length; d++) {

      for (var s = 0; s < this.combinedDataAfterExtractionSourceResponse2.length; s++) {
        if (this.combinedDataAfterExtractionSourceResponse2[s].key.includes("." + this.responseDataFiltered2[d].sourceFieldName + ".") && ((this.responseDataFiltered2[d].datatypeVerified) !== "array")) {
          // console.log("this.combinedDataAfterExtractionSourceResponse2[u].key = ", this.combinedDataAfterExtractionSourceResponse2[s].key)

          // console.log("this.responseDataFiltered2[y].sourceFieldName = ", this.responseDataFiltered2[d].sourceFieldName)
          for (var f = 0; f < this.combinedDataAfterExtractionSourceResponse2.length; f++) {

            if (this.combinedDataAfterExtractionSourceResponse2[f].key.includes(this.combinedDataAfterExtractionSourceResponse2[s].key) && (this.combinedDataAfterExtractionSourceResponse2[f].value !== "array")) {
              // console.log("this.combinedDataAfterExtractionSourceResponse2[f].key = ", this.combinedDataAfterExtractionSourceResponse2[f].key)

              // console.log("this.combinedDataAfterExtractionSourceResponse2[s].key= ", this.combinedDataAfterExtractionSourceResponse2[s].key)

              this.responseProperty2.push({
                key: this.combinedDataAfterExtractionSourceResponse2[s].key, value: {

                  [this.responseDataFiltered2[d].sourceFieldName]: {
                    "type": this.responseDataFiltered2[d].datatypeVerified,

                  }
                }
              })


            }
          }


        }

      }

      console.log(" this.responseProperty2 = ", this.responseProperty2)
    }
    //step 4 - Request non-array values from request data into a new json

    for (var g = 0; g < this.responseDataFiltered2.length; g++) {

      for (var h = 0; h < this.combinedDataAfterExtractionSourceResponse2.length; h++) {
        if (arrayFlag == true) {



          if (!((this.combinedDataAfterExtractionSourceResponse2[h].key).includes(this.responseDataFiltered2[g].sourceFieldName)) && ((this.responseDataFiltered2[g].datatypeVerified) !== "array")) {
            // console.log("Inside if od step 4")
            // console.log("this.combinedDataAfterExtractionSourceResponse2[h].key = ", this.combinedDataAfterExtractionSourceResponse2[h].key)

            for (var j = 0; j < this.combinedDataAfterExtractionSourceResponse2.length; j++) {

              if (this.combinedDataAfterExtractionSourceResponse2[j].key.includes(this.combinedDataAfterExtractionSourceResponse2[h].key) && ((this.combinedDataAfterExtractionSourceResponse2[j].value) !== "array")) {
                // console.log("Inside 2nd if of step 4")

                // console.log("this.combinedDataAfterExtractionSourceResponse2[j].key = ", this.combinedDataAfterExtractionSourceResponse2[j].key)

                // console.log("this.combinedDataAfterExtractionSourceResponse2[h].key= ", this.combinedDataAfterExtractionSourceResponse2[h].key)


                this.responsePropertyNonArray2.push({
                  key: this.responseDataFiltered2[g].sourceFieldName, value:
                  {
                    [this.responseDataFiltered2[g].sourceFieldName]: {
                      "type": this.responseDataFiltered2[g].datatypeVerified,

                    }
                  }
                })
                j = this.combinedDataAfterExtractionSourceResponse2.length
                h = this.combinedDataAfterExtractionSourceResponse2.length
              }
            }


          }
        }
        else if (arrayFlag == false) {

          if (!((this.combinedDataAfterExtractionSourceResponse2[h].key).includes(this.responseDataFiltered2[g].sourceFieldName)) && ((this.responseDataFiltered2[g].datatypeVerified) !== "array")) {
            // console.log("Inside if od step 4")
            // console.log("this.combinedDataAfterExtractionSourceResponse2[h].key = ", this.combinedDataAfterExtractionSourceResponse2[h].key)

            for (var j = 0; j < this.combinedDataAfterExtractionSourceResponse2.length; j++) {

              if (this.combinedDataAfterExtractionSourceResponse2[j].key.includes(this.combinedDataAfterExtractionSourceResponse2[h].key) && ((this.combinedDataAfterExtractionSourceResponse2[j].value) !== "array")) {
                // console.log("Inside 2nd if of step 4")

                // console.log("this.combinedDataAfterExtractionSourceResponse2[j].key = ", this.combinedDataAfterExtractionSourceResponse2[j].key)

                // console.log("this.combinedDataAfterExtractionSourceResponse2[h].key= ", this.combinedDataAfterExtractionSourceResponse2[h].key)


                this.responsePropertyNonArray2.push({
                  key: this.responseDataFiltered2[g].sourceFieldName, value:
                  {
                    [this.responseDataFiltered2[g].sourceFieldName]: {
                      "type": this.responseDataFiltered2[g].datatypeVerified,

                    }
                  }
                })
                j = this.combinedDataAfterExtractionSourceResponse2.length
                h = this.combinedDataAfterExtractionSourceResponse2.length
              }
            }


          }


        }
      }
    }


    if (arrayFlag === true) {


      console.log("this.responsePropertyNonArray2 = ", this.responsePropertyNonArray2)
      for (var l = 0; l < this.responsePropertyNonArray2.length; l++) {
        var flag = false;
        for (var z = 0; z < this.responseProperty2.length; z++) {

          var value1 = Object.keys(this.responsePropertyNonArray2[l].value)
          var value2 = Object.keys(this.responseProperty2[z].value)

          if (value1[0] == value2[0]) {
            console.log("inside z if / flag = true")
            flag = true
          }
        }

        if (flag === false) {
          this.responsePropNonArray2.push(this.responsePropertyNonArray2[l])
        }
      }
    }
    else {
      this.responsePropNonArray2 = (this.responsePropertyNonArray2)
    }
    console.log("this.responsePropNonArray2 = ", this.responsePropNonArray2)



    //step 5 - Arrange the values in the fields json


    for (var x = 0; x < this.responseProperty2.length; x++) {

      if (this.responseLayout2.length !== 0) {

        for (var c = 0; c < this.responseLayout2.length; c++) {

          if (this.responseProperty2[x].key.includes(this.responseLayout2[c].key)) {
            console.log("Inside last if  = ")
            console.log("Object.keys(this.responseProperty2[x].value)[0] = ", Object.keys(this.responseProperty2[x].value)[0]);
            console.log("Object.values(this.responseProperty2[x].value)[0] = ", Object.values(this.responseProperty2[x].value)[0]);
            console.log("this.responseLayout2[c].key = ", this.responseLayout2[c].key)

            var xyz = Object.keys(this.responseLayout2[c].value)[0]
            var abc = Object.values(this.responseLayout2[c].value)[0]
            // this.finalResponse12 = this.responseLayout2[c].value

            this.finalResponse12 = this.responseLayout2[c].value
            // this.finalResponse12 = abc

            var pqr = this.responseLayout2[c].key.replace(xyz + ".", "")
            console.log("xyz = ", xyz)
            console.log("pqr = ", pqr)
            console.log("this.finalResponse12[xyz].pqr = ", this.finalResponse12[xyz][pqr])
            // this.finalResponse12[pqr].items.properties[Object.keys(this.responseProperty2[x].value)[0]] = Object.values(this.responseProperty2[x].value)[0]
            this.finalResponse12[xyz][pqr].items.properties[Object.keys(this.responseProperty2[x].value)[0]] = Object.values(this.responseProperty2[x].value)[0]


          }

        }

      }

    }

    for (var v = 0; v < this.responsePropNonArray2.length; v++) {
      this.finalResponseWithoutArray2.push(this.responsePropNonArray2[v].value)

    }

    console.log("Final responseLayout2 = ", this.responseLayout2)
    console.log("this.finalResponseWithoutArray2 = ", this.finalResponseWithoutArray2);


    var fields = {};

    console.log("this.finalResponse12 = ", this.finalResponse12)
    console.log("this.finalResponseWithoutArray2 = ", this.finalResponseWithoutArray2)

    if (JSON.stringify(this.finalResponse12) !== '{}') {
      this.finalResponse22.push(this.finalResponse12)
    }

    this.finalResponseWithoutArray2.forEach((item) => {
      console.log("finalResponseWithoutArray2 , Item = ", item)
      var key1 = Object.keys(item)
      this.finalResponse22.push(item)
    })
    console.log("this.finalResponse22 = ", this.finalResponse22);

    if (arrayFlag == true) {

      fields['responses'] = this.finalResponse22
    }

    else if (arrayFlag == false) {
      var result = Object.assign({}, ...this.finalResponse22);

      console.log("result of Object.assign = ", result)

      fields["responses"] = result;
    }
    console.log("Fields ,Response= ", fields)

    return fields;
  }



  // PART -2 / FILE -2 ends
  /****************** Unflatten *******************/
  /**
   * @author : Sucheta
   * @description : Unflatten the data
   * @param data
   */
  unflatten(data) {
    "use strict";
    if (Object(data) !== data || Array.isArray(data))
      return data;
    var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
      resultholder = {};
    for (var p in data) {
      var cur = resultholder,
        prop = "",
        m;
      while (m = regex.exec(p)) {
        cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
        prop = m[2] || m[1];
      }
      cur[prop] = data[p];
    }
    return resultholder[""] || resultholder;
  };
  /*****************************/




}



  // /**
  //    * @author : Suchheta
  //    * @description: Reset Function for Response.
  //    */


  // resetButtonResponse(resetIdValue) {


  //   console.log("this.resetButtonClickResponse2 Response", this.resetButtonClickResponse2);
  //   for (var i = 0; i < this.responseData.length; i++) {
  //     if (this.responseData[i].sfieldName === this.resetButtonClickResponse2 && this.resetButtonClickResponse2 != undefined) {
  //       this.responseData[i].directRowNo = resetIdValue;
  //       this.responseData[i].sourceFieldPath = this.responseData[resetIdValue - 1].sourceName;
  //       this.responseData[i].sourceFieldName = this.responseData[resetIdValue - 1].sfieldName
  //       this.responseData[i].datatypeVerified = this.responseData[resetIdValue - 1].sdataType
  //       this.responseData[i].tfieldNameMapping = this.responseData[i].tfieldName;
  //       if (this.responseData[i].sdataType != this.responseData[resetIdValue - 1].tdataType) {
  //         this.responseData[i].backgroundColor = "false"
  //       }
  //       else {
  //         this.responseData[i].backgroundColor = "true";
  //       }
  //     }
  //   }
  // }