function Cabecalho({ atualizacao }) {
  const grade = [];
  for (let linha = 0; linha < 4; linha += 1) {
    for (let coluna = 0; coluna < 4; coluna += 1) {
      grade.push({
        x: coluna * 5,
        y: linha * 5,
        key: `${linha}-${coluna}`,
      });
    }
  }

  return (
    <header className="cabecalho">
      <div className="marca">
        <span className="marca-simbolo" aria-hidden="true">
          <svg viewBox="0 0 19 19" width="28" height="28">
            {grade.map((celula) => (
              <rect
                key={celula.key}
                x={celula.x}
                y={celula.y}
                width="4"
                height="4"
              />
            ))}
          </svg>
        </span>
        <span className="marca-nome">trama</span>
        <span className="marca-rotulo">Gestão de pedidos</span>
      </div>
      <div className="cabecalho-info">
        <span>Painel operacional</span>
        <span>Última atualização: hoje, {atualizacao}</span>
      </div>
    </header>
  );
}

export default Cabecalho;
