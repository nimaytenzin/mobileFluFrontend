import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-public-interface',
  templateUrl: './public-interface.component.html',
  styleUrls: ['./public-interface.component.scss']
})
export class PublicInterfaceComponent implements OnInit {
  map:L.Map;
  satelliteTileUrl ="http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}";
  cartoPositronUrl = "https://tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png";
  latitude: number;
  longitude: number;
  accuracy:number;
  watchId;
  showSideNav : boolean;
  doctorName: string;
  doctorContact: number;
  drivername: String;
  driverContact: number;
  
  mfluClinicIcon = L.icon({
    iconUrl: 'flaticon.com/svg/static/icons/svg/1032/1032989.svg',
    iconSize:     [20, 20], // size of the icon
   });
  


  constructor() { }

  ngOnInit() {
    this.renderMap();
    this.showSideNav = false;

    this.doctorName = "Dr. Tshokey"
    this.doctorContact = 17654432;
    this.drivername = "Kado";
    this.driverContact = 172655845;


  }

  renderMap(){
  
   
    this.map = L.map('map').setView([27.4712,89.64191], 13);
    // const googleSateliteMap = L.tileLayer(this.satelliteTileUrl);
    // googleSateliteMap.addTo(this.map)
    const cartoPositronMap = L.tileLayer(this.cartoPositronUrl)
    cartoPositronMap.addTo(this.map)

    const iconRetinaUrl = 'assets/ambulance.png';
    const iconUrl = 'assets/ambulance.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      iconSize: [30, 30]
    });



    var marker = L.marker([27.467753, 89.641527], {icon: iconDefault});
    marker.addTo(this.map).on('click', (e) => {
    
      if(this.showSideNav === true){
        this.showSideNav = false;
      } else{
        this.showSideNav = true
      }   
  });
  }

  getMyLocation() {
    if (navigator.geolocation) {
      const iconRetinaUrl = 'assets/mymarker.png';
      const iconUrl = 'assets/mymarker.png';
      const iconDefault = L.icon({
        iconRetinaUrl,
        iconUrl,
        iconSize: [20, 20]
      });

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        this.accuracy = position.coords.accuracy;

        if (this.accuracy > 100) {
          L.marker([this.latitude, this.longitude], {icon: iconDefault}).addTo(this.map)
          .bindPopup('You are here')
          .openPopup();
          this.map.flyTo([this.latitude, this.longitude], 19);
          navigator.geolocation.clearWatch(this.watchId);
        } else {
          L.marker([this.latitude, this.longitude], {icon: iconDefault}).addTo(this.map)
          .bindPopup('You are here')
          .openPopup();
          L.circle([this.latitude, this.longitude], {
            color: '#3498db',
            fillColor: '#3498db',
            fillOpacity: 0.3,
            radius: this.accuracy
          }).addTo(this.map);
          this.map.flyTo([this.latitude, this.longitude], 19);
        }
      }, error => {
        console.error('No support for geolocation');
      }, options);
    }
  }

}
