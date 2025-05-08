import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Aluno } from '../../core/types/types';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { AlunoService } from '../../core/services/aluno.service';

@Component({
  selector: 'app-cartao-aluno',
  imports: [MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './cartao-aluno.component.html',
  styleUrl: './cartao-aluno.component.css'
})
export class CartaoAlunoComponent {
  @Input() aluno!: Aluno;
  @Output() alunoAtualizado = new EventEmitter<any>();

  constructor(private service: AlunoService, private toast: ToastrService) { }

  deletarAluno() {
    this.service.deletarAluno(this.aluno.id).subscribe({
      next: () => {
        this.toast.success("Aluno deletado com sucesso!", "SUCESSO");
        this.alunoAtualizado.emit();
      },
      error: (err) => {
        this.toast.error(`Erro ao deletar aluno: ${err.error.error}`);
      }
    });
  }

  salvarImagem(event: Event){
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      const imagem = input.files[0];
      const form = new FormData();
      form.append("file", imagem);
      this.service.salvarImagem(this.aluno.id, form).subscribe({
        next: () =>{
          this.toast.success("Imagem salva com sucesso!", "SUCESSO");
        },
        error: (err) => {
          this.toast.error(`Erro ao salvar imagem: ${err.error.error}`, "ERRO");
        }
      })
    }
  }

};
