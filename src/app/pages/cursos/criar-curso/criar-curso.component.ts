import { Component } from '@angular/core';
import { ModalFormComponent } from '../../../shared/modal-form/modal-form.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Curso } from '../../../core/types/types';
import { CursoService } from '../../../core/services/curso.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-criar-curso',
  imports: [ModalFormComponent, 
    MatInputModule,
    MatSelectModule,MatButtonModule, ReactiveFormsModule],
  templateUrl: './criar-curso.component.html',
  styleUrl: './criar-curso.component.css'
})
export class CriarCursoComponent {

  curso: Curso = {
    id: 0,
    areaTecnologica: '',
    titulo: '',
    modalidade: '',
    imagemUrl: ''
  }

  form: FormGroup = new FormGroup({
    areaTecnologica: new FormControl('',[Validators.minLength(5), Validators.required]),
    titulo: new FormControl('',[Validators.minLength(5), Validators.required]),
    modalidade: new FormControl('PRESENCIAL',[Validators.required])
  })

  constructor(
    private service: CursoService,
    private toast: ToastrService,
    public dialog: MatDialogRef<CriarCursoComponent>
  ) {}
  
  salvarCurso() {
    if (this.form.invalid) {
      this.toast.info("Preencha corretamente o formulário");
      return;
    }
  
    this.curso.areaTecnologica = this.form.get('areaTecnologica')?.value;
    this.curso.titulo = this.form.get('titulo')?.value;
    this.curso.modalidade = this.form.get('modalidade')?.value;
  
    this.service.criarCurso(this.curso).subscribe({
      next: (value) => {
        this.toast.success("Sucesso ao criar curso", "SUCESSO!");
        this.dialog.close("criado");
      },
      error: (error) => {
        this.toast.error("Erro ao criar curso", "Erro!");
        console.log(error);
      }
    });
  }

}