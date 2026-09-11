import {
  listaPrioridades,
  listaProblemas,
  listaResponsaveis,
  listaStatus,
} from '../data/pedidos.js';

function Filtros({ filtros, onChange, onLimpar, onRestaurar }) {
  function alterar(campo, valor) {
    onChange({ ...filtros, [campo]: valor });
  }

  return (
    <div className="filtros">
      <div className="campo campo-busca">
        <label htmlFor="pesquisa">Pedido ou cliente</label>
        <input
          id="pesquisa"
          type="text"
          value={filtros.pesquisa}
          onChange={(evento) => alterar('pesquisa', evento.target.value)}
          placeholder="Nº do pedido ou nome"
        />
      </div>

      <div className="campo">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={filtros.status}
          onChange={(evento) => alterar('status', evento.target.value)}
        >
          <option value="todos">Todos</option>
          {listaStatus.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label htmlFor="problema">Tipo de problema</label>
        <select
          id="problema"
          value={filtros.problema}
          onChange={(evento) => alterar('problema', evento.target.value)}
        >
          <option value="todos">Todos</option>
          {listaProblemas.map((problema) => (
            <option key={problema} value={problema}>
              {problema}
            </option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label htmlFor="prioridade">Prioridade</label>
        <select
          id="prioridade"
          value={filtros.prioridade}
          onChange={(evento) => alterar('prioridade', evento.target.value)}
        >
          <option value="todas">Todas</option>
          {listaPrioridades.map((prioridade) => (
            <option key={prioridade} value={prioridade}>
              {prioridade}
            </option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label htmlFor="responsavel">Responsável</label>
        <select
          id="responsavel"
          value={filtros.responsavel}
          onChange={(evento) => alterar('responsavel', evento.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="nao-atribuido">Não atribuído</option>
          {listaResponsaveis.map((responsavel) => (
            <option key={responsavel} value={responsavel}>
              {responsavel}
            </option>
          ))}
        </select>
      </div>

      <div className="filtros-acoes">
        <button type="button" className="botao-texto" onClick={onLimpar}>
          Limpar filtros
        </button>
        <button type="button" className="botao-texto" onClick={onRestaurar}>
          Restaurar exemplos
        </button>
      </div>
    </div>
  );
}

export default Filtros;
