export const CHAVE_STORAGE = 'trama-excecoes-pedidos';

export const listaStatus = [
  'Pendente',
  'Em análise',
  'Aguardando cliente',
  'Aguardando expedição',
  'Resolvido',
];

export const listaProblemas = [
  'Pagamento não identificado',
  'Produto sem estoque',
  'CEP divergente',
  'Endereço incompleto',
  'Transportadora sem movimentação',
  'Pedido duplicado',
  'Cancelamento solicitado',
  'Divergência de valor',
  'Problema na separação',
  'Pedido parado na expedição',
];

export const listaPrioridades = ['Alta', 'Média', 'Baixa'];

export const listaResponsaveis = ['Eduardo', 'Mariana', 'Lucas'];

export function normalizar(texto) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatarData(iso) {
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}

export function eHoje(iso) {
  return iso === dataISO(0);
}

export function agoraHistorico() {
  return marcaHistorico(0);
}

export function doisDigitos(numero) {
  return String(numero).padStart(2, '0');
}

export function classeStatus(status) {
  return `status status-${slug(status)}`;
}

export function classePrioridade(prioridade) {
  return `prioridade prioridade-${slug(prioridade)}`;
}

export function filtrarPedidos(pedidos, filtros) {
  const termo = normalizar(filtros.pesquisa.replace('#', '').trim());
  const peso = { Alta: 0, Média: 1, Baixa: 2 };

  return pedidos
    .filter((pedido) => {
      const pesquisaOk =
        !termo || normalizar(`${pedido.id} ${pedido.cliente}`).includes(termo);
      const statusOk = filtros.status === 'todos' || pedido.status === filtros.status;
      const problemaOk = filtros.problema === 'todos' || pedido.problema === filtros.problema;
      const prioridadeOk =
        filtros.prioridade === 'todas' || pedido.prioridade === filtros.prioridade;
      const responsavelOk =
        filtros.responsavel === 'todos' ||
        pedido.responsavel === filtros.responsavel ||
        (filtros.responsavel === 'nao-atribuido' && !pedido.responsavel);

      return pesquisaOk && statusOk && problemaOk && prioridadeOk && responsavelOk;
    })
    .slice()
    .sort((a, b) => peso[a.prioridade] - peso[b.prioridade] || b.data.localeCompare(a.data) || a.id.localeCompare(b.id));
}

export function criarPedidosIniciais() {
  return [
    pedido('10458', 'Marcos Silva', 259.9, 1, 'Pagamento não identificado', 'Alta', 'Em análise', 'Eduardo', 'Cliente informou que o Pix foi enviado no mesmo horário da compra.', [
      { data: marcaHistorico(1, 9, 32), texto: 'Exceção identificada' },
      { data: marcaHistorico(1, 10, 5), texto: 'Pedido atribuído para Eduardo' },
      { data: marcaHistorico(1, 10, 28), texto: 'Cliente contatado' },
    ]),
    pedido('10461', 'Ana Paula Ferreira', 189.5, 0, 'Produto sem estoque', 'Alta', 'Pendente', '', '', [
      { data: marcaHistorico(0, 8, 14), texto: 'Exceção identificada' },
    ]),
    pedido('10464', 'Carlos Henrique', 312.0, 2, 'CEP divergente', 'Média', 'Aguardando cliente', 'Mariana', 'CEP informado não corresponde ao município do cadastro.', [
      { data: marcaHistorico(2, 11, 10), texto: 'Exceção identificada' },
      { data: marcaHistorico(2, 11, 40), texto: 'Pedido atribuído para Mariana' },
      { data: marcaHistorico(2, 14, 5), texto: 'Cliente contatado' },
    ]),
    pedido('10467', 'Fernanda Souza', 148.9, 0, 'Endereço incompleto', 'Média', 'Pendente', '', '', [
      { data: marcaHistorico(0, 9, 2), texto: 'Exceção identificada' },
    ]),
    pedido('10470', 'Lucas Martins', 427.0, 3, 'Transportadora sem movimentação', 'Alta', 'Aguardando expedição', 'Lucas', 'Objeto sem atualização há mais de 48 horas.', [
      { data: marcaHistorico(3, 8, 20), texto: 'Exceção identificada' },
      { data: marcaHistorico(3, 9, 15), texto: 'Pedido atribuído para Lucas' },
      { data: marcaHistorico(2, 16, 40), texto: 'Transportadora acionada' },
    ]),
    pedido('10473', 'Juliana Ribeiro', 198.0, 1, 'Pedido duplicado', 'Baixa', 'Em análise', 'Eduardo', 'Cliente possui outro pedido com os mesmos itens no mesmo dia.', [
      { data: marcaHistorico(1, 13, 12), texto: 'Exceção identificada' },
      { data: marcaHistorico(1, 13, 48), texto: 'Pedido atribuído para Eduardo' },
    ]),
    pedido('10476', 'Rafael Oliveira', 276.5, 0, 'Cancelamento solicitado', 'Média', 'Pendente', 'Mariana', '', [
      { data: marcaHistorico(0, 10, 18), texto: 'Exceção identificada' },
      { data: marcaHistorico(0, 10, 33), texto: 'Pedido atribuído para Mariana' },
    ]),
    pedido('10479', 'Camila Rodrigues', 354.9, 2, 'Divergência de valor', 'Alta', 'Em análise', 'Eduardo', 'Valor cobrado não confere com o cupom aplicado no checkout.', [
      { data: marcaHistorico(2, 9, 8), texto: 'Exceção identificada' },
      { data: marcaHistorico(2, 9, 50), texto: 'Pedido atribuído para Eduardo' },
      { data: marcaHistorico(2, 11, 22), texto: 'Financeiro acionado para conferência' },
    ]),
    pedido('10482', 'Marcos Silva', 164.0, 1, 'Problema na separação', 'Média', 'Aguardando expedição', 'Lucas', 'Item separado no tamanho incorreto.', [
      { data: marcaHistorico(1, 15, 4), texto: 'Exceção identificada' },
      { data: marcaHistorico(1, 15, 30), texto: 'Pedido atribuído para Lucas' },
    ]),
    pedido('10485', 'Ana Paula Ferreira', 219.9, 0, 'Pedido parado na expedição', 'Alta', 'Pendente', '', '', [
      { data: marcaHistorico(0, 7, 45), texto: 'Exceção identificada' },
    ]),
    pedido('10491', 'Rafael Oliveira', 132.5, 2, 'Endereço incompleto', 'Média', 'Aguardando cliente', 'Eduardo', 'Falta número e complemento para a entrega.', [
      { data: marcaHistorico(2, 16, 12), texto: 'Exceção identificada' },
      { data: marcaHistorico(2, 16, 40), texto: 'Pedido atribuído para Eduardo' },
      { data: marcaHistorico(1, 9, 10), texto: 'Cliente contatado' },
    ]),
    pedido('10450', 'Fernanda Souza', 189.9, 0, 'Pagamento não identificado', 'Baixa', 'Resolvido', 'Eduardo', 'Pagamento localizado após conferência do comprovante.', [
      { data: marcaHistorico(0, 8, 10), texto: 'Exceção identificada' },
      { data: marcaHistorico(0, 8, 40), texto: 'Pedido atribuído para Eduardo' },
      { data: marcaHistorico(0, 9, 15), texto: 'Exceção resolvida' },
    ]),
    pedido('10448', 'Carlos Henrique', 244.0, 0, 'Produto sem estoque', 'Média', 'Resolvido', 'Mariana', 'Cliente aceitou a troca para o tamanho seguinte.', [
      { data: marcaHistorico(0, 9, 20), texto: 'Exceção identificada' },
      { data: marcaHistorico(0, 9, 55), texto: 'Pedido atribuído para Mariana' },
      { data: marcaHistorico(0, 11, 5), texto: 'Exceção resolvida' },
    ]),
    pedido('10442', 'Juliana Ribeiro', 159.0, 1, 'CEP divergente', 'Baixa', 'Resolvido', 'Lucas', 'CEP corrigido com os dados confirmados pelo cliente.', [
      { data: marcaHistorico(1, 14, 10), texto: 'Exceção identificada' },
      { data: marcaHistorico(1, 14, 35), texto: 'Pedido atribuído para Lucas' },
      { data: marcaHistorico(1, 16, 2), texto: 'Exceção resolvida' },
    ]),
    pedido('10440', 'Lucas Martins', 298.0, 0, 'Pedido duplicado', 'Baixa', 'Resolvido', 'Eduardo', 'Pedido duplicado cancelado. O original segue em separação.', [
      { data: marcaHistorico(0, 7, 30), texto: 'Exceção identificada' },
      { data: marcaHistorico(0, 8, 5), texto: 'Pedido atribuído para Eduardo' },
      { data: marcaHistorico(0, 8, 50), texto: 'Exceção resolvida' },
    ]),
  ];
}

function pedido(id, cliente, valor, diasAtras, problema, prioridade, status, responsavel, observacao, historico) {
  return {
    id,
    cliente,
    valor,
    data: dataISO(diasAtras),
    problema,
    prioridade,
    status,
    responsavel,
    observacao,
    historico,
  };
}

function slug(texto) {
  return normalizar(texto).replace(/\s+/g, '-');
}

function dataISO(diasAtras) {
  const data = new Date();
  data.setHours(12, 0, 0, 0);
  data.setDate(data.getDate() - diasAtras);
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function marcaHistorico(diasAtras, hora = 12, minuto = 0) {
  const data = new Date();
  data.setDate(data.getDate() - diasAtras);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const horas = String(hora).padStart(2, '0');
  const minutos = String(minuto).padStart(2, '0');
  return `${dia}/${mes} ${horas}:${minutos}`;
}
