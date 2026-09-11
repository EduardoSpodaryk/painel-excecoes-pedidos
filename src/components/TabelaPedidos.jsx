import { classePrioridade, classeStatus, formatarData } from '../data/pedidos.js';

function TabelaPedidos({ pedidos, pedidoSelecionado, onSelecionar }) {
  return (
    <div className="tabela-envoltorio">
      <table className="tabela-pedidos">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Problema</th>
            <th>Prioridade</th>
            <th>Status</th>
            <th>Responsável</th>
            <th>Data</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr
              key={pedido.id}
              className={pedido.id === pedidoSelecionado ? 'selecionado' : ''}
              onClick={() => onSelecionar(pedido.id)}
            >
              <td>
                <button
                  type="button"
                  className="pedido-link"
                  onClick={(evento) => {
                    evento.stopPropagation();
                    onSelecionar(pedido.id);
                  }}
                >
                  #{pedido.id}
                </button>
              </td>
              <td>{pedido.cliente}</td>
              <td>{pedido.problema}</td>
              <td>
                <span className={classePrioridade(pedido.prioridade)}>{pedido.prioridade}</span>
              </td>
              <td>
                <span className={classeStatus(pedido.status)}>{pedido.status}</span>
              </td>
              <td>
                {pedido.responsavel ? (
                  pedido.responsavel
                ) : (
                  <span className="nao-atribuido">Não atribuído</span>
                )}
              </td>
              <td>{formatarData(pedido.data)}</td>
              <td>
                <button
                  type="button"
                  className="botao-texto"
                  onClick={(evento) => {
                    evento.stopPropagation();
                    onSelecionar(pedido.id);
                  }}
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!pedidos.length && (
        <div className="vazio">
          <p>Nenhum pedido nesta seleção.</p>
          <p>Ajuste a pesquisa ou limpe os filtros para ampliar a busca.</p>
        </div>
      )}
    </div>
  );
}

export default TabelaPedidos;
