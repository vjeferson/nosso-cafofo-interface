# Nosso Cafofo - Front-end

O "Nosso Cafofo" visa facilitar e aprimorar o gerenciamento de contas do dia-a-dia em Repúblicas Estudantis, proporcionando uma solução eficiente e intuitiva para os residentes. O sistema foi criado como [Projeto de Conclusão de Curso](https://drive.google.com/file/d/1EflAN8GAvkyCKtBGUPiQ39cHiZsSN00B/view?usp=sharing) da Pós-graduação Lato Sensu em Desenvolvimento Web Full Stack da [Puc Minas](https://www.linkedin.com/school/pucminas/), onde foi detalhado todo o processo de criação/ideação, definição da estrutura, desenvolvimento de ferramentas e/ou sistemas que guiam o funcionamento de um negocio/empresa para atuar no meio digital.

## Tecnologias Utilizadas 
O projeto foi desenvolvido utilizando o framework Angular, na versão 11. O Angular proporciona uma estrutura robusta para o desenvolvimento de aplicações web, facilitando a criação de componentes reutilizáveis e a gestão eficiente do estado da aplicação. Para garantir uma experiência responsiva e consistente em diferentes dispositivos, o Bootstrap foi integrado ao projeto. O Bootstrap oferece uma variedade de componentes e estilos predefinidos que facilitam a criação de interfaces modernas e adaptáveis. O tema SB Admin Angular foi adotado para agilizar o desenvolvimento da interface do usuário. Esse tema fornece componentes estilizados e layouts pré-construídos que se alinham com as melhores práticas de design, economizando tempo no desenvolvimento front-end.

### SB Admin Angular
O SB Admin Angular é um projeto inicial Angular com tema Bootstrap gratuito e de código aberto que já vem com uma implementação básica de navegação e layouts.

### Layout - Figma
O projeto de Layout do Sistema, com especificação de fontes, cores de texto e componentes, entre outras informacões, foi criado na Plataforma do Figma, e pode ser
acessado [neste link](https://bit.ly/3zMCKdT). 

### API
O código-fonte do projeto da API REST utilizada está presente em outro repositório na plataforma do GitHub, disponínel em [Nosso Cafofo - API](https://github.com/VJEFERSON/nosso-cafofo-api).


## Funcionalidades do projeto

### Cadastro de Moradores
Permitirá o registro fácil e seguro de informações pessoais dos moradores da república, incluindo nome, contato e dados de emergência.

### Controle de Despesas
Possibilitará o registro e monitoramento das despesas compartilhadas, como aluguel, contas de serviços públicos e compras coletivas.

### Divisão de Despesas
Automatizará a divisão justa das despesas entre os moradores, considerando variáveis como área ocupada, consumo individual e outros critérios pré-definidos.

### Histórico Financeiro
Manterá um registro detalhado das transações financeiras, permitindo aos moradores visualizar seu histórico e acompanhar as mudanças ao longo do tempo.

### Notificações e Lembretes
Enviará notificações automáticas sobre datas de vencimento, eventos importantes e outras informações relevantes para garantir uma comunicação eficiente.
Geração de Relatórios:

## Inicialização

```bash
git clone https://github.com/vjeferson/nosso-cafofo-interface.git
cd nosso-cafofo-interface
npm install
npm start
```

`npm start` deve abrir uma janela do navegador para <http://localhost:4200>

Por padrão, o Angular é executado na porta 4200. Para alterar esta porta, você pode executar:

```bash
# Isso inicia o servidor de desenvolvimento na porta 3000,
# mas você pode usar qualquer porta que desejar
export PORT=3000 && npm start
```

## Solução de problemas

### npm start

Se você receber problemas de memória, ajuste
`max_old_space_size` no comando `ng` presente no arquivo `package.json`:

```json
"ng": "cross-env NODE_OPTIONS=--max_old_space_size=2048 ./node_modules/.bin/ng",
```

Você pode ajustar 2048 para qualquer número que precisar.

Para obter mais informações sobre por que você pode precisar `--max_old_space_size`
veja [este artigo](https://medium.com/@ashleydavis75/node-js-memory-limitations-30d3fe2664c0).

## Status do projeto
O projeto encontra-se concluído, estando na sua versão 2.0.0.
