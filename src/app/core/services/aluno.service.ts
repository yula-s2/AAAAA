import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno, AlunoForm } from '../types/types';

/**
 * ele é um serviço (service) que faz requisições HTTP para um back-end.
 */

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private http: HttpClient) { }

  criarAluno(aluno:AlunoForm): Observable<any> {
    return this.http.post<Aluno>('http://localhost:8080/alunos', aluno);
  }

  buscarAlunos(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/alunos');

}

deletarAluno(id:number):Observable<any>{
  return this.http.delete<any>(`http://localhost:8080/alunos/${id}`);
}

salvarImagem(id:number, form: FormData):Observable<any>{
  return this.http.post<any>(`http://localhost:8080/alunos/foto/${id}`, form);

}
}
