import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CadastroService } from '../../services/cadastro.service';
import { IlocalizacaoDTO } from '../../interfaces/IlocalizacaoDTO';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export interface Icadastro {
  name: string;
  emailDentista: string;
  nameDentista: string;
  especialidade: string;
  description: string;
  localizacaodto: IlocalizacaoDTO;
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})

export class CadastroComponent implements OnInit {
  clinicForm: FormGroup;

  constructor(
    private toastService: ToastrService,
    private cadastroService: CadastroService,
    private fb: FormBuilder
  ) {
    this.clinicForm = this.fb.group({
      name: ['', Validators.required],
      emailDentista: ['', [Validators.required, Validators.email]],
      nameDentista: ['', Validators.required],
      especialidade: ['', Validators.required],
      description: ['', Validators.required],
      localizacaodto: this.fb.group({
        rua: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        number: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.clinicForm.valid) {

      const clinicData = this.clinicForm.value;
      
      console.log('Clínica cadastrada:', clinicData); 
      this.cadastroService.cadastro(clinicData).subscribe({
        next: (response) => {
          this.toastService.success("Formulario cadastrado com sucesso!");
          this.clinicForm.reset(); 
        },
        error: (err) => {
          this.toastService.error("Erro ao cadastrar");
        }
      });
    } else {
      console.log("Formulário inválido")
      this.toastService.error("Formulário inválido");
    }
  }
  
}