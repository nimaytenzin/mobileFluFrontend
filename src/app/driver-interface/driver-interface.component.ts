import { Component, OnInit } from '@angular/core';
import { DataService } from "../service/data.service";
import { SocketioService } from '../socketio.service';


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
  dispalyFluClinicLocation: boolean


  constructor(
    private dataService: DataService,
    private socketService: SocketioService
  ) { 

  }

  ngOnInit() {
    this.getlocation()
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


  startLocationShare(){ 
     this.dataService.postLocation({'my message': "hellosss"})
     
     this.socketService.socket.emit('my message', 'Hello there from Angular.')
  }  

  stopLocationShare(){
    this.dispalyFluClinicLocation = false

  }
 


}
