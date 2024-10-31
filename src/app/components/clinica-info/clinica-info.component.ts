import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { ActivatedRoute } from '@angular/router';
import { MapDisplayComponent } from '../map-display/map-display.component';
import { IlocalizacaoDTO } from '../../interfaces/IlocalizacaoDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clinica-info',
  standalone: true,
  imports: [MapDisplayComponent, CommonModule],
  templateUrl: './clinica-info.component.html',
  styleUrl: './clinica-info.component.scss'
})
export class ClinicaInfoComponent implements OnInit {
  @Input() clinica: any;
  localizacaoDTO!: IlocalizacaoDTO; // Propriedade para armazenar a localização

  clinicaId:  number;


  constructor(private homeService: HomeService,
    private route: ActivatedRoute,
  ) {
    this.clinicaId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getClinicasById(this.clinicaId);
  }

  getClinicasById(id: number) {
    this.homeService.findById(id).subscribe({
      next: (response) => {
        this.clinica = response; 
        this.localizacaoDTO = this.clinica.localizacaodto; // Atribui a localização
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
