export interface IUsuarioAutenticado {
  id: number;
  nome: string;
  email: string;
  descricaoPerfil: string;
  tipoPerfil: number;
  republicaId: number;
  moradorId?: number;
  assinaturaId?: number;
  anoEntradaRepublica: number;
  facebookVinculado: boolean;
  googleVinculado: boolean;
  profileUrlImage?:string;
}

export interface IRetornoAutenticacao {
  token: string;
  expiresIn: Date | any;
  usuario: IUsuarioAutenticado;
}