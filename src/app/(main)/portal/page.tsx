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
        return 'text-blue-600'; // Cor do texto
      case 'VERIFICADA':
        return 'text-green-600';
      case 'EM ANÁLISE':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    
    <div className="flex flex-col gap-8">
      
      {/* ===== 1. CABEÇALHO ===== */}
      <div className="flex justify-between items-center">
        {/* Título da Página (Ícone placeholder) */}
        <div className="flex items-center gap-3">
          <span className="bg-red-100 text-red-600 p-3 rounded-lg">
            {/* Placeholder para o ícone de Gráfico */}
            <div className="w-6 h-6 bg-red-300 rounded"></div> 
          </span>
          <h1 className="text-3xl font-bold text-gray-800">Portal de dados</h1>
        </div>
        
        {/* Ícones da Direita (Placeholders) */}
        <div className="hidden md:flex items-center gap-5 text-gray-500">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div> {/* Telefone */}
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div> {/* Sino */}
          <div className="w-9 h-9 bg-gray-300 rounded-full"></div> {/* Avatar */}
        </div>
      </div>

      {/* ===== 2. CARTÕES DE ESTATÍSTICAS (KPIs) ===== */}
      {/* Note: O Figma não usa 'cards', ele coloca o texto direto. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
        
        {/* Card 1 */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded-lg"></div> {/* Placeholder Ícone */}
          <div>
            <div className="text-3xl font-bold text-gray-900">327</div>
            <div className="text-sm text-gray-500">Total de Denúncias</div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded-lg"></div> {/* Placeholder Ícone */}
          <div>
            <div className="text-3xl font-bold text-gray-900">5</div>
            <div className="text-sm text-gray-500">Recebidas Hoje</div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded-lg"></div> {/* Placeholder Ícone */}
          <div>
            <div className="text-3xl font-bold text-gray-900">62%</div>
            <div className="text-sm text-gray-500">% Com Evidência</div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded-lg"></div> {/* Placeholder Ícone */}
          <div>
            <div className="text-3xl font-bold text-gray-900">! 3</div>
            <div className="text-sm text-gray-500">Novas (Triagem)</div>
          </div>
        </div>
      </div>

      {/* ===== 3. GRÁFICOS (PLACEHOLDERS) ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Gráfico de Linha (Volume) */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Volume de Denúncias (Tempo)</h3>
          {/* Placeholder para o gráfico de linha */}
          <div className="bg-gray-50 h-72 flex items-center justify-center rounded-lg">
            <span className="text-gray-400 text-sm">(Placeholder Gráfico de Linha)</span>
          </div>
        </div>

        {/* Gráfico de Pizza (Status) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Denúncia por Status</h3>
          {/* Placeholder para o gráfico de pizza */}
          <div className="bg-gray-50 h-72 flex items-center justify-center rounded-lg">
            <span className="text-gray-400 text-sm">(Placeholder Gráfico de Donut)</span>
          </div>
          {/* Legenda do Gráfico */}
          <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
             <span className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div>Verificada</span>
             <span className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400 rounded-full"></div>Em análise</span>
             <span className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div>Nova</span>
          </div>
        </div>
      </div>

      {/* ===== 4. TABELA DE DENÚNCIAS RECENTES ===== */}
      <div className="bg-white rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 p-6">Denúncias Recentes de Alto Risco</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
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
                <tr key={denuncia.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{denuncia.id}</td>
                  <td className="px-6 py-4 text-gray-700">{denuncia.risco}</td>
                  <td className="px-6 py-4 font-medium">
                    <span className={getStatusClass(denuncia.status)}>
                      {denuncia.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                     {/* Badge de Localização (como no Figma) */}
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium">
                      {denuncia.local}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{denuncia.data}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}