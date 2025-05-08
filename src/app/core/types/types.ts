
export interface Curso{
    id: number,
    areaTecnologica: string,
    titulo: string,
    modalidade: string,
    imagemUrl: string,
}

export interface AlunoForm{
    cursoId: number,
    matricula: string,
    nome: string,
    email: string,
    telefone: string,
    pais: string,
    estado: string,
    cidade: string,
    bairro: string,
    cep: string,
    rua: string,
    numero: string
}

export interface Aluno{
    id: number,
    curso: Curso,
    telefone: string,
    endereco: Endereco,
    fotoUrl: string,
    matricula: string,
    nome: string,
    email: string,
}

export interface Endereco{
    id: number,
    pais: string
    estado: string,
    cidade: string,
    bairro: string,
    cep: string,
    rua: string,
    numero: string,
}   