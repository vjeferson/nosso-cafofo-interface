export interface IAccountSocial {
    id: string;
    name: string;
    email: string;
    telefone: string;
    socialType: string;
}

export class AccountSocial implements IAccountSocial {
    id!: string;
    name!: string;
    email!: string;
    telefone!: string;
    socialType!: string;
}