import { Component, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../shared/container/container.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CriarAlunoComponent } from './criar-aluno/criar-aluno.component';
import { CartaoAlunoComponent } from "../../shared/cartao-aluno/cartao-aluno.component";
import { AlunoService } from '../../../app/core/services/aluno.service';
import { Aluno } from '../../core/types/types';


@Component({
  selector: 'app-alunos',
  imports: [
    MatButtonModule,
    MatIconModule,
    ContainerComponent,
    MatDialogModule,
    CartaoAlunoComponent
  ],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.css'
})
export class AlunosComponent implements OnInit {

  alunos: Aluno[] = []; // Cria um lista de alunos vazia

  constructor(private dialog: MatDialog, private service: AlunoService) { }
  ngOnInit(): void {
    this.buscarAlunos();

  }

  abrirModalCriarAluno() {
    this.dialog.open(CriarAlunoComponent).afterClosed().subscribe({
      next: (value) => {
        if (value == "criado") {
          this.buscarAlunos();
        }
      }
    })
  }

  buscarAlunos() {

    this.service.buscarAlunos().subscribe({
      next: (value) => {
        console.log(value);
        this.alunos = value.content; // Atribui o valor retornado à lista de cursos
        console.log(this.alunos);
      },
      error: (err) => {
        console.log(err);

      }
    })



  }
}
