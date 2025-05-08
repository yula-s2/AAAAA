import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ContainerComponent } from '../../shared/container/container.component';
import {MatDialog,MatDialogModule} from '@angular/material/dialog';
import { CriarCursoComponent } from './criar-curso/criar-curso.component';
import { CartaoCursoComponent } from '../../shared/cartao-curso/cartao-curso.component';
import { ValueChangeEvent } from '@angular/forms';
import { CursoService } from '../../core/services/curso.service';
import { Curso } from '../../core/types/types';

@Component({
  selector: 'app-cursos',
  imports: [MatButtonModule,MatIconModule, ContainerComponent,MatDialogModule,CartaoCursoComponent],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements OnInit{

  cursos: Curso [] = [];//cria uma lista de cursos vazia

  constructor(private dialog:MatDialog, private service: CursoService){}

  ngOnInit(): void {
  this.buscarCursos();
  }

  abrirModalCriarCurso() {
    this.dialog.open(CriarCursoComponent).afterClosed().subscribe({
      next: (value) => {
        if (value == "criado") {
          this.buscarCursos();
        }
      }
    })
  }

  buscarCursos() {
    this.service.buscarCursos().subscribe({
      next: (value) => {
        console.log(value);
        this.cursos = value.content;

      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
