export interface IUsuarioAutenticado {
  id: number;
  nome: string;
  email: string;
  descricaoPerfil: string;
  tipoPerfil: number;
}

export interface IRetornoAutenticacao {
  token: string;
  expiresIn: Date | any;
  usuario: IUsuarioAutenticado;
}