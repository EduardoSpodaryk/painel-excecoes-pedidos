# Painel de Exceções de Pedidos

Painel operacional desenvolvido em React para acompanhar pedidos que precisam de análise ou intervenção da equipe.

**Demo:** [Acessar o projeto](https://painel-excecoes-pedidos.vercel.app/)

## Preview

![Tela principal do Painel de Exceções](src/img/painel.png)

![Detalhes de um pedido](src/img/painel2.png)

## Sobre o projeto

O projeto simula uma ferramenta interna da empresa fictícia **Trama** para acompanhar pedidos que apresentam algum tipo de exceção durante a operação.

Os exemplos incluem situações como problemas de pagamento, divergências de estoque, endereço incompleto e ocorrências relacionadas ao transporte.

A proposta foi criar uma interface administrativa simples, onde a equipe consegue localizar pedidos, aplicar filtros, consultar detalhes e atualizar o andamento de cada ocorrência.

## Funcionalidades

- Pesquisa por pedido ou cliente
- Filtros por status, prioridade e tipo de problema
- Visualização dos detalhes do pedido
- Alteração do responsável pela ocorrência
- Atualização de status
- Registro de observações
- Persistência das alterações no navegador
- Restauração dos dados de exemplo

## Tecnologias

- React
- JavaScript
- HTML
- CSS
- Vite

## Estrutura do projeto

O projeto foi dividido em componentes responsáveis por partes específicas da interface, como filtros, tabela de pedidos e painel de detalhes.

Os dados utilizados são fictícios e ficam no próprio projeto. As alterações feitas durante o uso são armazenadas com `localStorage`.

## Objetivo

Desenvolvi este projeto para praticar conceitos de React aplicados a uma situação próxima de um sistema administrativo real.

Durante o desenvolvimento trabalhei principalmente com:

- Componentização
- Estados com React
- Filtros e pesquisa
- Manipulação de arrays
- Atualização de dados pela interface
- Persistência com `localStorage`
- Construção de interfaces administrativas

## Como executar

Clone o repositório e instale as dependências:

```bash
npm install
