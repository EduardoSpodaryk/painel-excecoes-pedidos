import { useEffect, useMemo, useState } from 'react';
import Cabecalho from './components/Cabecalho.jsx';
import Resumo from './components/Resumo.jsx';
import Filtros from './components/Filtros.jsx';
import TabelaPedidos from './components/TabelaPedidos.jsx';
import DetalhesPedido from './components/DetalhesPedido.jsx';
import {
  CHAVE_STORAGE,
  agoraHistorico,
  criarPedidosIniciais,
  eHoje,
  filtrarPedidos,
} from './data/pedidos.js';

const filtrosIniciais = {
  pesquisa: '',
  status: 'todos',
  problema: 'todos',
  prioridade: 'todas',
  responsavel: 'todos',
};

function App() {
  const [pedidos, setPedidos] = useState(criarPedidosIniciais);
  const [filtros, setFiltros] = useState(filtrosIniciais);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [pronto, setPronto] = useState(false);
  const [avisoStorage, setAvisoStorage] = useState('');
  const [atualizacao, setAtualizacao] = useState(horaAtual());

  useEffect(() => {
    try {
      const salvo = localStorage.getItem(CHAVE_STORAGE);
      if (salvo) {
        const dados = JSON.parse(salvo);
        if (Array.isArray(dados) && dados.length) {
          setPedidos(dados);
        }
      }
    } catch {
      setAvisoStorage('Não foi possível carregar os dados locais. A demonstração funciona nesta sessão.');
    }
    setPronto(true);
  }, []);

  useEffect(() => {
    if (!pronto) return;
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(pedidos));
      setAvisoStorage('');
    } catch {
      setAvisoStorage('Alterações mantidas apenas nesta sessão. O navegador não permitiu salvar os dados locais.');
    }
  }, [pedidos, pronto]);

  const pedidosFiltrados = useMemo(
    () => filtrarPedidos(pedidos, filtros),
    [pedidos, filtros],
  );

  const pedido = pedidos.find((item) => item.id === pedidoSelecionado) || null;

  const resumo = {
    pendentes: pedidos.filter((item) => item.status !== 'Resolvido').length,
    emAnalise: pedidos.filter((item) => item.status === 'Em análise').length,
    altaPrioridade: pedidos.filter((item) => item.prioridade === 'Alta' && item.status !== 'Resolvido').length,
    resolvidosHoje: pedidos.filter((item) => item.status === 'Resolvido' && eHoje(item.data)).length,
  };

  function limparFiltros() {
    setFiltros(filtrosIniciais);
  }

  function selecionarPedido(id) {
    setPedidoSelecionado(id);
  }

  function atualizarPedido(id, mudancas, textoHistorico) {
    setPedidos((lista) =>
      lista.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          ...mudancas,
          historico: [
            { data: agoraHistorico(), texto: textoHistorico },
            ...item.historico,
          ],
        };
      }),
    );
    setAtualizacao(horaAtual());
  }

  function atualizarStatus(id, status) {
    const atual = pedidos.find((item) => item.id === id);
    if (!atual || atual.status === status) return;
    atualizarPedido(id, { status }, `Status alterado para ${status}`);
  }

  function atualizarResponsavel(id, responsavel) {
    const atual = pedidos.find((item) => item.id === id);
    if (!atual || atual.responsavel === responsavel) return;
    atualizarPedido(
      id,
      { responsavel },
      responsavel ? `Pedido atribuído para ${responsavel}` : 'Responsável removido',
    );
  }

  function salvarObservacao(id, texto) {
    atualizarPedido(id, { observacao: texto }, texto);
  }

  function marcarResolvido(id) {
    const atual = pedidos.find((item) => item.id === id);
    if (!atual || atual.status === 'Resolvido') return;
    atualizarPedido(id, { status: 'Resolvido' }, 'Exceção resolvida');
  }

  function restaurarExemplos() {
    const confirmar = window.confirm(
      'Os pedidos de exemplo serão restaurados e as alterações deste navegador serão substituídas.',
    );
    if (!confirmar) return;
    setPedidos(criarPedidosIniciais());
    setPedidoSelecionado(null);
    setFiltros(filtrosIniciais);
    setAtualizacao(horaAtual());
  }

  return (
    <div className="app">
      <Cabecalho atualizacao={atualizacao} />
      <main className="conteudo">
        <p className="caminho">OPERAÇÕES / PEDIDOS</p>
        <div className="titulo-pagina">
          <div>
            <h1>Painel de exceções</h1>
            <p>Acompanhe pedidos que precisam de análise ou intervenção da equipe.</p>
          </div>
        </div>

        <Resumo {...resumo} />

        {avisoStorage && (
          <p className="aviso" role="alert">
            {avisoStorage}
          </p>
        )}

        <div className={pedido ? 'area-trabalho' : 'area-trabalho sem-detalhe'}>
          <section className="painel-lista">
            <Filtros
              filtros={filtros}
              onChange={setFiltros}
              onLimpar={limparFiltros}
              onRestaurar={restaurarExemplos}
            />
            <p className="resultado">
              {pronto
                ? `${pedidosFiltrados.length} ${pedidosFiltrados.length === 1 ? 'pedido encontrado' : 'pedidos encontrados'}`
                : 'Carregando pedidos…'}
            </p>
            <TabelaPedidos
              pedidos={pedidosFiltrados}
              pedidoSelecionado={pedidoSelecionado}
              onSelecionar={selecionarPedido}
            />
          </section>

          {pedido && (
            <DetalhesPedido
              pedido={pedido}
              onFechar={() => setPedidoSelecionado(null)}
              onAtualizarStatus={atualizarStatus}
              onAtualizarResponsavel={atualizarResponsavel}
              onSalvarObservacao={salvarObservacao}
              onMarcarResolvido={marcarResolvido}
            />
          )}
        </div>

        <p className="rodape">Dados fictícios. Alterações ficam salvas neste navegador.</p>
      </main>
    </div>
  );
}

function horaAtual() {
  return new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default App;
