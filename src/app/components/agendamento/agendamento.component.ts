import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { AgendamentoService } from '../../services/agendamento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [MatDatepickerModule, MatNativeDateModule,MatInputModule,MatFormFieldModule, CommonModule, ReactiveFormsModule],
  templateUrl: './agendamento.component.html',
  styleUrl: './agendamento.component.scss'
})
export class AgendamentoComponent {

  agendamentoForm!: FormGroup<any>;

  constructor(
    private toastService: ToastrService,
    private agendamentoService: AgendamentoService
  ) {
    this.agendamentoForm = new FormGroup({
      data: new FormControl(''), 
      horario: new FormControl(''), 
      pacienteName: new FormControl(''), 
      pacienteEmail: new FormControl(''), 
      pacienteTelefone: new FormControl(''), 
      status: new FormControl('Confirmada'), 
      clinica: new FormGroup({
        id: new FormControl(1) 
      })
    });
  }

  onSubmit() {
    const agendamento = this.agendamentoForm.value;
    console.log(agendamento)
    this.agendamentoService.insert(agendamento).subscribe({
      next: (response) => {
        console.log(response)
        this.toastService.success("Agendamento realizado com sucesso");
        this.agendamentoForm.reset();
      },
      error: (err) => {
        console.log(err)
      }
    })

  }
}
