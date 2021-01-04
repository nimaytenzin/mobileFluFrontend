import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from "../service/data.service";
import { SocketioService } from '../socketio.service';

export class ClinicDetails{
  latitude: number;
  longitude:number;
  doctorName:string;
  driverName:string;
  vehicleNumber:string;
  doctorContact:string;
  driverContact:string;
  zones:string;
}


@Component({
  selector: 'app-driver-interface',
  templateUrl: './driver-interface.component.html',
  styleUrls: ['./driver-interface.component.scss']
})
export class DriverInterfaceComponent implements OnInit {
  latitude: number;
  longitude: number;
  accuracy:number;
  watchId;
  dispalyFluClinicLocation: boolean;
  fluClinicDetails: ClinicDetails;
  clinicDetialsForm: FormGroup;
  

  constructor(
    private dataService: DataService,
    private socketService: SocketioService,
    private fb: FormBuilder,
  ) { 
    this.fluClinicDetails = new ClinicDetails();
  }

  ngOnInit() {
    this.getlocation()
    this.reactiveForms()
  }

  getlocation(){
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition((position) => {
      this.longitude = position.coords.longitude;
      this.latitude = position.coords.latitude;
      this.accuracy = position.coords.accuracy;
      this.dispalyFluClinicLocation = true
    }, error => {
      console.error('No support for geolocation');
    }, options);
  }

  
  reactiveForms() {
    this.clinicDetialsForm = this.fb.group({
      doctorsNameControl:[],
      doctorsContactControl:[],
      vehicleNumberControl:[],
      driverNameControl:[],
      driversContactControl:[],
      zonesControl:[]
    })
  }


  startLocationShare(){
    this.fluClinicDetails.doctorName=this.clinicDetialsForm.get('doctorsNameControl').value;
    this.fluClinicDetails.doctorContact = this.clinicDetialsForm.get('doctorsNameControl').value;
    this.fluClinicDetails.vehicleNumber = this.clinicDetialsForm.get('vehicleNumberControl').value;
    this.fluClinicDetails.driverName = this.clinicDetialsForm.get('driverNameControl').value;
    this.fluClinicDetails.driverContact = this.clinicDetialsForm.get('driversContactControl').value;
    this.fluClinicDetails.zones = this.clinicDetialsForm.get('zonesControl').value

    navigator.geolocation.watchPosition((position) => {
      this.fluClinicDetails.latitude = position.coords.longitude;
      this.fluClinicDetails.longitude = position.coords.latitude;
      this.accuracy = position.coords.accuracy;
      this.dataService.postLocation(this.fluClinicDetails).subscribe(
        (response) => {
          console.log(response)
        }
      )
    })
  }  

  stopLocationShare(){
    this.dispalyFluClinicLocation = false

  }


}
