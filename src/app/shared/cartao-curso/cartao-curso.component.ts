import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Curso } from '../../core/types/types';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { CursoService } from '../../core/services/curso.service';
@Component({
  selector: 'app-cartao-curso',
  imports: [MatIconModule, MatMenuModule,MatButtonModule],
  templateUrl: './cartao-curso.component.html',
  styleUrl: './cartao-curso.component.css'
})
export class CartaoCursoComponent {
  @Input() curso!: Curso;
  @Output() cursoAtualizado = new EventEmitter<any>();

  constructor(private service:CursoService, private toast: ToastrService) {}

  deletarCurso() {
    this.service.deletarCurso(this.curso.id).subscribe({
      next: () => {
        this.toast.success("Curso deletado com sucesso", "SUCESSO");
        this.cursoAtualizado.emit();

      },
      error: (err) => {
        this.toast.error(`Erro ao deletar curso: ${err.error.error}`);
      }
    })
  }

  
salvarImagem(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const imagem = input.files[0];
    const form = new FormData();
    form.append("file", imagem);
    this.service.salvarImagem(this.curso.id, form).subscribe({
      next: () => {
        this.toast.success("Imagem carregada com sucesso", "SUCESSO");
      },
      error: (err) => {
        this.toast.error(`Erro ao carregar imagem: ${err.error.error}`, "ERRO");
      }
    })
  }
}
}

