import { doisDigitos } from '../data/pedidos.js';

function Resumo({ pendentes, emAnalise, altaPrioridade, resolvidosHoje }) {
  const itens = [
    { rotulo: 'Pendentes', valor: pendentes },
    { rotulo: 'Em análise', valor: emAnalise },
    { rotulo: 'Alta prioridade', valor: altaPrioridade },
    { rotulo: 'Resolvidos hoje', valor: resolvidosHoje },
  ];

  return (
    <section className="resumo" aria-label="Resumo operacional">
      {itens.map((item) => (
        <div className="resumo-item" key={item.rotulo}>
          <span>{item.rotulo}</span>
          <strong>{doisDigitos(item.valor)}</strong>
        </div>
      ))}
    </section>
  );
}

export default Resumo;
