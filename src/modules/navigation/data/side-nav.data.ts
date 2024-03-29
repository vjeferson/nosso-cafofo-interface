import { EnumTipoPerfil } from '@app/utils/enums';
import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: '',
        items: [
            'dashboard',
            'assinantes',
            'planos',
            'republica',
            'moradores',
            'usuarios',
            'contas',
            'festas',
            'reunioes'
        ]
    }
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
        tipoPerfil: [EnumTipoPerfil.AdministradorNossoCafofo, EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
    },
    assinantes: {
        icon: 'house-user',
        text: 'Assinantes',
        link: '/assinantes',
        tipoPerfil: [EnumTipoPerfil.AdministradorNossoCafofo]
    },
    planos: {
        icon: 'money-check-alt',
        text: 'Planos',
        link: '/planos',
        tipoPerfil: [EnumTipoPerfil.AdministradorNossoCafofo]
    },
    pages: {
        icon: 'book-open',
        text: 'Pages',
        tipoPerfil: [EnumTipoPerfil.AdministradorNossoCafofo, EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador],
        submenu: [
            {
                text: 'Authentication',
                submenu: [
                    {
                        text: 'Login',
                        link: '/auth/login',
                        tipoPerfil: [EnumTipoPerfil.AdministradorNossoCafofo, EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
                    },
                    {
                        text: 'Register',
                        link: '/auth/register',
                        tipoPerfil: [EnumTipoPerfil.AdministradorNossoCafofo, EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
                    },
                    {
                        text: 'Forgot Password',
                        link: '/auth/forgot-password',
                        tipoPerfil: [EnumTipoPerfil.AdministradorNossoCafofo, EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
                    },
                ],
                tipoPerfil: [EnumTipoPerfil.AdministradorNossoCafofo, EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
            },
            {
                text: 'Error',
                submenu: [
                    {
                        text: '401 Page',
                        link: '/error/401',
                        tipoPerfil: [EnumTipoPerfil.AdministradorNossoCafofo, EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
                    },
                    {
                        text: '404 Page',
                        link: '/error/404',
                        tipoPerfil: [EnumTipoPerfil.AdministradorNossoCafofo, EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
                    },
                    {
                        text: '500 Page',
                        link: '/error/500',
                        tipoPerfil: [EnumTipoPerfil.AdministradorNossoCafofo, EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
                    }
                ],
                tipoPerfil: [EnumTipoPerfil.AdministradorNossoCafofo, EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
            },
        ],
    },
    charts: {
        icon: 'chart-area',
        text: 'Charts',
        link: '/charts',
        tipoPerfil: [EnumTipoPerfil.AdministradorNossoCafofo, EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
    },
    tables: {
        icon: 'table',
        text: 'Tables',
        link: '/tables',
        tipoPerfil: [EnumTipoPerfil.AdministradorNossoCafofo, EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
    },
    republica: {
        icon: 'home',
        text: 'República',
        tipoPerfil: [EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador],
        submenu: [
            {
                text: 'Info. Cadastro',
                link: '/republica/info-cadastro',
                tipoPerfil: [EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
            },
            // {
            //     text: 'Caixa',
            //     link: '/republica/caixa',
            //     tipoPerfil: [EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
            // },
            // {
            //     text: 'Entradas e Saídas',
            //     link: '/republica/entradas-saidas',
            //     tipoPerfil: [EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
            // }
        ]
    },
    moradores: {
        icon: 'house-user',
        text: 'Moradores',
        link: '/moradores',
        tipoPerfil: [EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
    },
    usuarios: {
        icon: 'users',
        text: 'Usuários',
        link: '/usuarios',
        tipoPerfil: [EnumTipoPerfil.MoradorAdministrador]
    },
    contas: {
        icon: 'file-invoice-dollar',
        text: 'Contas',
        link: '/contas',
        tipoPerfil: [EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
    },
    festas: {
        icon: 'wine-glass',
        text: 'Festas',
        link: '/festas',
        tipoPerfil: [EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
    },
    reunioes: {
        icon: 'handshake',
        text: 'Reuniões',
        link: '/reunioes',
        tipoPerfil: [EnumTipoPerfil.MoradorAdministrador, EnumTipoPerfil.Morador]
    }
};
