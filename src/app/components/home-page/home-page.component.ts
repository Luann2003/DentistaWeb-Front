/// <reference types="google.maps" />
import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { MatInputModule }  from '@angular/material/input';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'
import { MapDisplayComponent } from "../map-display/map-display.component";


export interface PlaceSearchResult {
  address?: string;
  location?: google.maps.LatLng;
  imageUrl?: string;
  iconUrl?: string;
  name?: string;
} 

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatCardModule, MapDisplayComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  @ViewChild('inputField')
  inputField!: ElementRef;

  @Input() placeholder = 'Insira o endereço...';

  data: PlaceSearchResult = {};  // Variável para armazenar os dados do resultado
  
  autocomplete: google.maps.places.Autocomplete | undefined;

  fromValue: PlaceSearchResult | undefined;
  toValue: PlaceSearchResult | undefined;
  
  listener: any;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement
    );

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete?.getPlace();
        this.data = {
          address: this.inputField.nativeElement.value,
          name: place?.name,
          location: place?.geometry?.location,
          imageUrl: this.getPhotoUrl(place),
          iconUrl: place?.icon,
        };

        this.fromValue = this.data;
        this.toValue = this.data;
      });
    });
  }

  getPhotoUrl(
    place: google.maps.places.PlaceResult | undefined
  ): string | undefined {
    return place?.photos && place?.photos.length > 0
      ? place?.photos[0].getUrl({ maxWidth: 500 })
      : undefined;
  }
}
