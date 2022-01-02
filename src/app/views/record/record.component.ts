import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { duckRecord } from 'src/app/models/commonModels';
import { CommonService } from 'src/app/shared/common.service';
declare const google: any;

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit, AfterViewInit {

  processingFileInProgress: boolean = false;
  locationInfoReady: boolean = false;

  map: any;
  @ViewChild('mapElement') mapElement: any;

  zoom: number = 14;
  lat: number = 48.4634;
  lng: number = 123.3117;
  submitting: boolean = false;
  successfulSubmitted: boolean = false;
  initialLoading: boolean = false;

  duckTypeList: string[] = [];
  foodMetricsList: string[] = [];
  record: duckRecord;
  validRecord: boolean = false;
  validCode: boolean = false;
  validName: boolean = false;


  constructor(private common: CommonService) { 
    this.record = new duckRecord();
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.duckTypeList = this.common.duckTypeList;
    this.foodMetricsList = this.common.foodMetricsList;
    this.record.duckType = this.duckTypeList[0];
    this.record.foodMetric = this.foodMetricsList[0];
    this.getLocation();
  }

  getLocation(){
    this.initialLoading = false;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        const myPosition = { lat: this.lat, lng: this.lng };
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: myPosition,
          scrollwheel: false
        });
        var marker = new google.maps.Marker({
            position: myPosition,
            map: map,
            label: "You Are Here"
        });

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({location: myPosition})
          .then((response: any) => {
            this.record.location = response.results[0].formatted_address.toLocaleLowerCase().split(",")[1].replace(" ", "");
            this.locationInfoReady = true;
            this.initialLoading = true;
          });

      })
    }
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

  onNameChange(){
    this.validateName();

    if(this.validName){
      this.validateInput();
    }else{
      this.validRecord = false;
    }
  }

  validateName(){
    if(this.record.createdBy == null || this.record.createdBy == ""){
      this.validName = false;
    }else{
      const regex = new RegExp(/^[a-zA-Z]+$/g);
      this.validName = regex.test(this.record.createdBy);
    }

  }

  onCodeChange(){
    this.validateCode();

    if(this.validCode){
      this.validateInput();
    }else{
      this.validRecord = false;
    }
  }

  validateCode(){
    if(this.record.code == null || this.record.code.length != 4){
      this.validCode = false;
    }else{
      const regex = new RegExp(/^[a-zA-Z0-9]+$/g);
      this.validCode = regex.test(this.record.code);
    }
  }

  validateInput(){
    if(this.record.location == null || this.record.location.length < 3){
      this.validRecord = false;
      return;
    }

    if(this.record.duckType == null || this.record.duckType == ""){
      this.validRecord = false;
      return;
    }

    if(this.record.duckAmount == 0){
      this.validRecord = false;
      return;
    }

    if(this.record.food == null || this.record.food == ""){
      this.validRecord = false;
      return;
    }

    if(this.record.foodAmount == 0){
      this.validRecord = false;
      return;
    }

    if(this.record.foodMetric == null || this.record.foodMetric == ""){
      this.validRecord = false;
      return;
    }

    this.validateName();
    this.validateCode();

    if(!this.validCode || !this.validName){
      this.validRecord = false;
      return;
    }

    this.validRecord = true;
  }

  submit(){

  }

}
