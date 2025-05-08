import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../types/types';


@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http: HttpClient) { }
  
  criarCurso(curso: Curso): Observable<any> {
    return this.http.post<Curso>('http://localhost:8080/cursos', curso);
  }
  
  buscarCursos(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/cursos');
  }

  deletarCurso(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/cursos/${id}`);
  }

  salvarImagem(id: number, form: FormData): Observable<any> {
    return this.http.post(`http://localhost:8080/cursos/imagem/${id}`, form);
  }

}
