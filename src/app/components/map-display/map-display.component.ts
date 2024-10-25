import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';
import { map } from 'rxjs';
import { PlaceSearchResult } from '../home-page/home-page.component';

@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './map-display.component.html',
  styleUrl: './map-display.component.scss'
})
export class MapDisplayComponent implements AfterViewInit {

  @ViewChild('map', { static: true })
  map!: GoogleMap;
  zoom = 12;

  center: google.maps.LatLng | undefined;
  directionsResult: google.maps.DirectionsResult | undefined;
  markerPosition: google.maps.LatLng | undefined;

  @Input() from: PlaceSearchResult | undefined
  @Input() to: PlaceSearchResult | undefined

  constructor(private directionsService: MapDirectionsService) {
  }

  ngAfterViewInit() {
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.center = latLng;
        this.markerPosition = latLng; // Adiciona o marcador na localização atual
        this.map.panTo(latLng); // Centraliza o mapa na localização atual

        if (this.to?.location) {
          this.getDirections(latLng, this.to.location); // Se houver um destino, busca a rota
        }
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  ngOnChanges() {
    const fromLocation = this.center
    const toLocation = this.to?.location;

    if(fromLocation && toLocation){
      this.getDirections(fromLocation, toLocation);
    }else if (fromLocation){
      this.gotoLocation(fromLocation);
    }else if (toLocation){
      this.gotoLocation(toLocation);
    }
  }

  gotoLocation(location: google.maps.LatLng){
    this.markerPosition = location;
    this.map.panTo(location);
    this.zoom = 17;
    this.directionsResult = undefined;
  }

  getDirections(from: google.maps.LatLng, to: google.maps.LatLng){

    const request: google.maps.DirectionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request).pipe(
      map(res => res.result)
    ).subscribe((result) => {
      this.directionsResult = result;
      this.markerPosition = undefined;
    })

  }

}
