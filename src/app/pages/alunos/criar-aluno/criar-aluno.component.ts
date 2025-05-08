import { Component } from '@angular/core';
import { ModalFormComponent } from '../../../shared/modal-form/modal-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, EmailValidator } from '@angular/forms';
import { Aluno, AlunoForm, Curso } from '../../../core/types/types';
import { AlunoService } from '../../../core/services/aluno.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { CursoService } from '../../../core/services/curso.service';

@Component({
  selector: 'app-criar-aluno',
  imports: [
    ModalFormComponent,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-aluno.component.html',
  styleUrl: './criar-aluno.component.css'
})
export class CriarAlunoComponent {

  aluno: AlunoForm = {
    cursoId: 0,
    matricula: '',
    nome: '',
    email: '',
    telefone: '',
    pais: '',
    estado: '',
    cidade: '',
    bairro: '',
    cep: '',
    rua: '',
    numero: '',
  }

  form: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required]),
    fotoUrl: new FormControl(''),
    matricula: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    cursoId: new FormControl('', [Validators.required]),
    bairro: new FormControl('', [Validators.required]),
    cidade: new FormControl('', [Validators.required]),
    pais: new FormControl('', [Validators.required]),
    cep: new FormControl('', [Validators.required]),
    numero: new FormControl('', [Validators.required]),
    rua: new FormControl('', [Validators.required]),
  });

  curso: Curso[] = [];

  constructor(
    private service: AlunoService,
    private toast: ToastrService,
    public dialog: MatDialogRef<CriarAlunoComponent>,
    private cursoService: CursoService 
  ) { }


  salvarAluno() {



    
    this.aluno.nome = this.form.get('nome')?.value;
    this.aluno.email = this.form.get('email')?.value;
    this.aluno.telefone = this.form.get('telefone')?.value;
    this.aluno.matricula = this.form.get('matricula')?.value;
    this.aluno.cursoId = this.form.get('cursoId')?.value;
    this.aluno.estado = this.form.get('estado')?.value;
    this.aluno.bairro = this.form.get('bairro')?.value;
    this.aluno.cidade = this.form.get('cidade')?.value;
    this.aluno.pais = this.form.get('pais')?.value;
    this.aluno.cep = this.form.get('cep')?.value;
    this.aluno.numero = this.form.get('numero')?.value;
    this.aluno.rua = this.form.get('rua')?.value;



    console.log('Nome:', this.aluno.nome);
  console.log('Email:', this.aluno.email);
  console.log('Telefone:', this.aluno.telefone);
  console.log('Matrícula:', this.aluno.matricula);
  console.log('Curso ID:', this.aluno.cursoId);

    this.service.criarAluno(this.aluno).subscribe({
      next: (value) => {
        this.toast.success("Aluno criado com sucesso!", "SUCESSO");
        this.dialog.close("criado");
      },
      error: (error) => {
        this.toast.error("Erro ao criar aluno!", "ERRO");
        console.log(error.error.error);
      }
    })
  }

  ngOnInit(): void {
    this.buscarCursos();}

  buscarCursos() {
    this.cursoService.buscarCursos().subscribe({
      next: (value) => {
        this.curso = value.content;
      },
      error: (err) => {
        console.log(err.error.error);
      }
    });


}}
