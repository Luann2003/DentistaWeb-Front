import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapDirectionsService } from '@angular/google-maps';
import { map } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { GeocodeService } from '../../services/geocode-service.service';
import { IlocalizacaoDTO } from '../../interfaces/IlocalizacaoDTO';

@Component({
  selector: 'app-map-display',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './map-display.component.html',
  styleUrl: './map-display.component.scss'
})
export class MapDisplayComponent implements AfterViewInit {
  @Input() localizacao?: IlocalizacaoDTO;


  @ViewChild('map', { static: true })
  map!: GoogleMap;
  zoom = 14;

  center: google.maps.LatLng | undefined;
  directionsResult: google.maps.DirectionsResult | undefined;
  markerPosition: google.maps.LatLng | undefined;

  @Input() from: any | undefined
  @Input() to: any | undefined

  address!: string;
  coordinates?: google.maps.LatLng | undefined;


  constructor(private directionsService: MapDirectionsService,
    private homeService: HomeService,
    private geocodeService: GeocodeService
  ) {
  }

  getCoordinates() {
    this.address = `${this.localizacao?.rua}, ${this.localizacao?.number}, ${this.localizacao?.cidade}, ${this.localizacao?.estado}`;
    
    this.geocodeService.getCoordinates(this.address).subscribe((response) => {
      console.log(response); // Verifique a estrutura da resposta
  
      if (response.status === 'OK' && response.results.length > 0) {
        const location = response.results[0].geometry.location;
  
        // Use as propriedades lat e lng diretamente
        if (location && location.lat !== undefined && location.lng !== undefined) {
          this.coordinates = new google.maps.LatLng(location.lat, location.lng);
          console.log(this.coordinates); // Para verificar os valores
          this.markerPosition = this.coordinates;
          this.map.panTo(this.coordinates); // Centraliza o mapa na nova localização
        } else {
          console.error('Localização inválida:', location);
        }
      } else {
        console.error('Erro ao buscar coordenadas ou sem resultados:', response.status);
      }
    }, (error) => {
      console.error('Erro na requisição:', error); // Tratamento de erro na requisição
    });
  }
  
  ngAfterViewInit() {
    this.getUserLocation();
    this.getCoordinates();
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
    const fromLocation = this.coordinates;
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
