// app/portal-de-dados/page.tsx

export default function PaginaPortalDeDados() {
  
  // Dados de exemplo para a tabela
  const denuncias = [
    { id: '#878784', risco: 50, status: 'NOVO', local: 'SP', data: '02/09 20:15' },
    { id: '#876388', risco: 70, status: 'VERIFICADA', local: 'SP', data: '28/08 2:16' },
    { id: '#876412', risco: 10, status: 'EM ANÁLISE', local: 'DF', data: '17/08 19:28' },
    { id: '#876621', risco: 100, status: 'VERIFICADA', local: 'RJ', data: '01/08 10:02' },
  ];

  // Função para retornar a cor do "badge" de status (Aproximei do Figma)
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'NOVO':
        return 'text-primary'; // Cor do texto
      case 'VERIFICADA':
        return 'text-success';
      case 'EM ANÁLISE':
        return 'text-primary';
      default:
        return 'text-muted';
    }
  };

  return (
    
    <div className="flex flex-col gap-8">
      
      {/* ===== 1. CABEÇALHO ===== */}
      <div className="flex justify-between items-center">
        {/* Título da Página (Ícone placeholder) */}
        <div className="flex items-center gap-3">
          <span className="bg-accent text-primary p-3 rounded-lg">
            {/* Placeholder para o ícone de Gráfico */}
            <div className="w-6 h-6 bg-primary rounded"></div> 
          </span>
          <h1 className="text-3xl font-bold text-foreground">Portal de dados</h1>
        </div>
        
        {/* Ícones da Direita (Placeholders) */}
        <div className="hidden md:flex items-center gap-5 text-muted">
          <div className="w-6 h-6 bg-muted rounded-full"></div> {/* Telefone */}
          <div className="w-6 h-6 bg-muted rounded-full"></div> {/* Sino */}
          <div className="w-9 h-9 bg-muted rounded-full"></div> {/* Avatar */}
        </div>
      </div>

      {/* ===== 2. CARTÕES DE ESTATÍSTICAS (KPIs) ===== */}
      {/* Note: O Figma não usa 'cards', ele coloca o texto direto. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
        
        {/* Card 1 */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-accent rounded-lg"></div> {/* Placeholder Ícone */}
          <div>
            <div className="text-3xl font-bold text-foreground">327</div>
            <div className="text-sm text-muted">Total de Denúncias</div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-accent rounded-lg"></div> {/* Placeholder Ícone */}
          <div>
            <div className="text-3xl font-bold text-foreground">5</div>
            <div className="text-sm text-muted">Recebidas Hoje</div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-accent rounded-lg"></div> {/* Placeholder Ícone */}
          <div>
            <div className="text-3xl font-bold text-foreground">62%</div>
            <div className="text-sm text-muted">% Com Evidência</div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-accent rounded-lg"></div> {/* Placeholder Ícone */}
          <div>
            <div className="text-3xl font-bold text-foreground">! 3</div>
            <div className="text-sm text-muted">Novas (Triagem)</div>
          </div>
        </div>
      </div>

      {/* ===== 3. GRÁFICOS (PLACEHOLDERS) ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Gráfico de Linha (Volume) */}
        <div className="lg:col-span-3 bg-card-bg p-6 rounded-lg shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Volume de Denúncias (Tempo)</h3>
          {/* Placeholder para o gráfico de linha */}
          <div className="bg-accent h-72 flex items-center justify-center rounded-lg">
            <span className="text-muted text-sm">(Placeholder Gráfico de Linha)</span>
          </div>
        </div>

        {/* Gráfico de Pizza (Status) */}
        <div className="lg:col-span-2 bg-card-bg p-6 rounded-lg shadow-sm border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Denúncia por Status</h3>
          {/* Placeholder para o gráfico de pizza */}
          <div className="bg-accent h-72 flex items-center justify-center rounded-lg">
            <span className="text-muted text-sm">(Placeholder Gráfico de Donut)</span>
          </div>
          {/* Legenda do Gráfico */}
          <div className="flex justify-center gap-4 mt-4 text-sm text-muted">
             <span className="flex items-center gap-2"><div className="w-3 h-3 bg-success rounded-full"></div>Verificada</span>
             <span className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-full"></div>Em análise</span>
             <span className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-full"></div>Nova</span>
          </div>
        </div>
      </div>

      {/* ===== 4. TABELA DE DENÚNCIAS RECENTES ===== */}
      <div className="bg-card-bg rounded-lg shadow-sm border border-border">
        <h3 className="text-lg font-semibold text-foreground p-6">Denúncias Recentes de Alto Risco</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            
            <thead className="text-xs text-muted uppercase bg-accent border-b border-border">
              <tr>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Risco</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Local (UF)</th>
                <th scope="col" className="px-6 py-3">Data</th>
              </tr>
            </thead>

            <tbody>
              {denuncias.map((denuncia) => (
                <tr key={denuncia.id} className="bg-card-bg border-b border-border hover:bg-accent">
                  <td className="px-6 py-4 font-medium text-foreground">{denuncia.id}</td>
                  <td className="px-6 py-4 text-muted">{denuncia.risco}</td>
                  <td className="px-6 py-4 font-medium">
                    <span className={getStatusClass(denuncia.status)}>
                      {denuncia.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     {/* Badge de Localização (como no Figma) */}
                    <span className="bg-accent text-foreground px-3 py-1 rounded-md text-xs font-medium">
                      {denuncia.local}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted">{denuncia.data}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}

