import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: '',
        items: [
            'dashboard',
            'pages',
            'charts',
            'tables',
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
    },
    pages: {
        icon: 'book-open',
        text: 'Pages',
        submenu: [
            {
                text: 'Authentication',
                submenu: [
                    {
                        text: 'Login',
                        link: '/auth/login',
                    },
                    {
                        text: 'Register',
                        link: '/auth/register',
                    },
                    {
                        text: 'Forgot Password',
                        link: '/auth/forgot-password',
                    },
                ],
            },
            {
                text: 'Error',
                submenu: [
                    {
                        text: '401 Page',
                        link: '/error/401'
                    },
                    {
                        text: '404 Page',
                        link: '/error/404'
                    },
                    {
                        text: '500 Page',
                        link: '/error/500'
                    },
                ],
            },
        ],
    },
    charts: {
        icon: 'chart-area',
        text: 'Charts',
        link: '/charts'
    },
    tables: {
        icon: 'table',
        text: 'Tables',
        link: '/tables'
    },
    republica: {
        icon: 'book-open',
        text: 'República',
        submenu: [
            {
                text: 'Info. Cadastro',
                link: '/info-cadastro'
            },
            {
                text: 'Caixa',
                link: '/caixa'
            },
            {
                text: 'Entradas e Saídas',
                link: '/entradas-saidas'
            }
        ],
    },
    moradores: {
        icon: 'table',
        text: 'Moradores',
        link: '/moradores'
    },
    usuarios: {
        icon: 'table',
        text: 'Usuários',
        link: '/usuarios'
    },
    contas: {
        icon: 'table',
        text: 'Contas',
        link: '/contas'
    },
    festas: {
        icon: 'table',
        text: 'Festas',
        link: '/festas'
    },
    reunioes: {
        icon: 'table',
        text: 'Reuniões',
        link: '/reunioes'
    }
};
