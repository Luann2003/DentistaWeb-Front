import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-home.component.html',
  styleUrl: './search-home.component.scss'
})
export class SearchHomeComponent implements OnInit{

  searchTerm: string = ''; 

  constructor(
    private router: Router,
    private homeService: HomeService
  ) {}

  clinicas: any[] = [];

  ngOnInit(): void {
    this.onSearch();
  }

  loadMovies(name: string) {
    this.homeService.findAll(name).subscribe({
      next: (response) =>{
        this.clinicas = response.content; 
        console.log(response)
      }
    })
  }

  onSearch() {
    this.loadMovies(this.searchTerm);
  }

  getClinicaId(id: number) {
    this.homeService.findById(id).subscribe({
      next: (response) =>{
        this.router.navigate(["/clinicas", id])
      },
      error: (err) => { 
        console.log(err);
      }
    })
  }


}
