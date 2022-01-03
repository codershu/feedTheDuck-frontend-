import { Component, OnInit } from '@angular/core';
import { duckRecord } from 'src/app/models/commonModels';
import { DuckServiceService } from 'src/app/services/duck-service.service';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  records: duckRecord[] = []
  selectedRecord: duckRecord = new duckRecord();
  openUpdateModal: boolean = false;
  validRecord: boolean = true;
  duckTypeList: string[] = [];
  foodMetricsList: string[] = [];
  updatedRecord: duckRecord;
  openDeleteModal: boolean = false;
  deleteError: string = "";
  deleteSuccessMessage: string = "";
  updateError: string = "";
  updateSuccessMessage: string = "";
  loadingRecords: boolean = false;

  constructor(private common: CommonService, private duckService: DuckServiceService) { 
    this.updatedRecord = new duckRecord();
    this.selectedRecord = new duckRecord();
  }

  ngOnInit(): void {
    this.duckTypeList = this.common.duckTypeList;
    this.foodMetricsList = this.common.foodMetricsList;
    this.getRecords();
  }

  getRecords(){
    this.loadingRecords = true;
    this.duckService.getAllRecords().subscribe(response => {
      if(response && response.isSuccess){
        // console.log("all records", response.result)
        this.loadingRecords = false;
        this.records = response.result;
        this.selectedRecord = this.records[0];
      }
    })
  }

  refreshTable(){
    this.getRecords();
  }

  onRecordChange(event: any){
  }

  openModal(){
    this.openUpdateModal = true;
    this.resetAllMessage();
  }

  onLocationChange(){
    this.validateInput();
  }

  onDuckTypeChange(){
    this.validateInput();
  }

  onDuckAmountChange(){
    this.validateInput();
  }

  onFoodDescriptionChange(){
    this.validateInput();
  }

  onFoodAmountChange(){
    this.validateInput();
  }

  onWeightMetricChange(){
    this.validateInput();
  }

  validateInput(){
    if(this.selectedRecord.location == null || this.selectedRecord.location.length < 3){
      this.validRecord = false;
      return;
    }

    if(this.selectedRecord.duckType == null || this.selectedRecord.duckType == ""){
      this.validRecord = false;
      return;
    }

    if(this.selectedRecord.duckAmount == 0){
      this.validRecord = false;
      return;
    }

    if(this.selectedRecord.food == null || this.selectedRecord.food == ""){
      this.validRecord = false;
      return;
    }

    if(this.selectedRecord.foodAmount == 0){
      this.validRecord = false;
      return;
    }

    if(this.selectedRecord.foodMetric == null || this.selectedRecord.foodMetric == ""){
      this.validRecord = false;
      return;
    }

    this.validRecord = true;
  }

  updateRecord(){
    // console.log("updated ", this.selectedRecord)
    this.duckService.updateRecord(this.selectedRecord).subscribe(response => {
      if(response) this.onGetUpdateResponse(response)
    },
    error => this.updateError = JSON.stringify(error))
  }

  onGetUpdateResponse(response: any){
    // console.log("update response", response)
    if(response && response.isSuccess){
      // console.log(response.body.message)
      this.openUpdateModal = false;
      this.updateSuccessMessage = response.message;
      this.getRecords();
    }else{
      this.updateError = response.message;
      // console.log(response.message)
    }
  }

  openDeletionModal(){
    this.openDeleteModal = true;
  }

  deleteRecord(){
    this.duckService.deleteRecord(this.selectedRecord).subscribe(response => {
      if(response) this.onGetDeleteResponse(response)
    },
    error => this.deleteError = JSON.stringify(error))
  }

  onGetDeleteResponse(response: any){
    // console.log("delete response", response)
    if(response && response.isSuccess){
      // console.log(response.message)
      this.openDeleteModal = false;
      this.deleteSuccessMessage = response.message;
      this.getRecords();
    }else{
      this.deleteError = response.message;
      // console.log(response.message)
    }
  }

  resetAllMessage(){
    this.deleteSuccessMessage = "";
    this.deleteError = "";
    this.updateSuccessMessage = "";
    this.updateError = "";
  }

}
