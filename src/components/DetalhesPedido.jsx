import { useEffect, useState } from 'react';
import {
  classePrioridade,
  classeStatus,
  formatarData,
  formatarMoeda,
  listaResponsaveis,
  listaStatus,
} from '../data/pedidos.js';

function DetalhesPedido({
  pedido,
  onFechar,
  onAtualizarStatus,
  onAtualizarResponsavel,
  onSalvarObservacao,
  onMarcarResolvido,
}) {
  const [textoObservacao, setTextoObservacao] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    setTextoObservacao('');
    setMensagem('');
  }, [pedido.id]);

  function salvarObservacao(evento) {
    evento.preventDefault();
    const texto = textoObservacao.trim();
    if (!texto) {
      setMensagem('Escreva uma observação antes de registrar.');
      return;
    }
    onSalvarObservacao(pedido.id, texto);
    setTextoObservacao('');
    setMensagem('Observação registrada.');
  }

  const resolvido = pedido.status === 'Resolvido';

  return (
    <aside className="detalhes-pedido">
      <header className="detalhes-cabecalho">
        <div>
          <p className="rotulo">Pedido</p>
          <h2>#{pedido.id}</h2>
          <p className="detalhes-cliente">{pedido.cliente}</p>
        </div>
        <button type="button" className="botao-texto" onClick={onFechar}>
          Fechar
        </button>
      </header>

      <dl className="detalhes-lista">
        <div>
          <dt>Valor</dt>
          <dd>{formatarMoeda(pedido.valor)}</dd>
        </div>
        <div>
          <dt>Data</dt>
          <dd>{formatarData(pedido.data)}</dd>
        </div>
        <div>
          <dt>Problema</dt>
          <dd>{pedido.problema}</dd>
        </div>
        <div>
          <dt>Prioridade</dt>
          <dd>
            <span className={classePrioridade(pedido.prioridade)}>{pedido.prioridade}</span>
          </dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>
            <span className={classeStatus(pedido.status)}>{pedido.status}</span>
          </dd>
        </div>
        <div>
          <dt>Responsável</dt>
          <dd>{pedido.responsavel || 'Não atribuído'}</dd>
        </div>
        {pedido.observacao && (
          <div>
            <dt>Observação</dt>
            <dd>{pedido.observacao}</dd>
          </div>
        )}
      </dl>

      <form className="detalhes-formulario" onSubmit={salvarObservacao}>
        <div className="campo">
          <label htmlFor="detalhe-status">Status</label>
          <select
            id="detalhe-status"
            value={pedido.status}
            onChange={(evento) => onAtualizarStatus(pedido.id, evento.target.value)}
          >
            {listaStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label htmlFor="detalhe-responsavel">Responsável</label>
          <select
            id="detalhe-responsavel"
            value={pedido.responsavel}
            onChange={(evento) => onAtualizarResponsavel(pedido.id, evento.target.value)}
          >
            <option value="">Não atribuído</option>
            {listaResponsaveis.map((responsavel) => (
              <option key={responsavel} value={responsavel}>
                {responsavel}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label htmlFor="observacao">Nova observação</label>
          <textarea
            id="observacao"
            rows="3"
            value={textoObservacao}
            onChange={(evento) => setTextoObservacao(evento.target.value)}
            placeholder="Ex.: cliente contatado; aguardando comprovante."
          />
        </div>

        {mensagem && <p className="form-mensagem">{mensagem}</p>}

        <div className="detalhes-acoes">
          <button type="submit" className="botao-secundario">
            Registrar observação
          </button>
          {!resolvido && (
            <button
              type="button"
              className="botao-principal"
              onClick={() => onMarcarResolvido(pedido.id)}
            >
              Marcar como resolvido
            </button>
          )}
        </div>
      </form>

      <section className="historico">
        <h3>Histórico</h3>
        <ol>
          {pedido.historico.map((evento, indice) => (
            <li key={`${evento.data}-${indice}`}>
              <time>{evento.data}</time>
              <p>{evento.texto}</p>
            </li>
          ))}
        </ol>
      </section>
    </aside>
  );
}

export default DetalhesPedido;
