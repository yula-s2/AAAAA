import { Component } from '@angular/core';
import { CursoService } from '../../core/services/curso.service';
import { Curso } from '../../core/types/types';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-home',
  imports: [ MatSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  cursos: Curso[] = [];

  constructor(private cursoService: CursoService) {}
    
    ngOnInit (): void{
      this.buscarCursos();

    }

    buscarCursos() {
      this.cursoService.buscarCursos().subscribe({
        next: (value) => {
          this.cursos = value.content;
        },
        error: (err) => {
          console.log(err.error.error);
        }
      })
    }

}
