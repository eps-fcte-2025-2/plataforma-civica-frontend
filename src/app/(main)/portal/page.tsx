'use client';

import { useState } from 'react';

interface Denuncia {
  id: string;
  idCurto: string;
  risco: number;
  status: string;
  local: string;
  municipio: string;
  data: string;
  tipo: string;
  descricao: string;
  pessoas: number;
  clubes: number;
  evidencias: number;
}

export default function PaginaPortalDeDados() {
  const [selectedDenuncia, setSelectedDenuncia] = useState<Denuncia | null>(null);
  
  const denuncias = [
    { 
      id: '35577d1d-beb3-4e4d-b8be-e0f71aac7034', 
      idCurto: '#878784', 
      risco: 50, 
      status: 'NOVO', 
      local: 'SP', 
      municipio: 'São Paulo',
      data: '02/09 20:15',
      tipo: 'PARTIDA_ESPECIFICA',
      descricao: 'Denúncia número 1 sobre possível manipulação',
      pessoas: 0,
      clubes: 0,
      evidencias: 0
    },
    { 
      id: '35577d1d-beb3-4e4d-b8be-e0f71aac7035', 
      idCurto: '#876388', 
      risco: 70, 
      status: 'VERIFICADA', 
      local: 'SP', 
      municipio: 'São Paulo',
      data: '28/08 2:16',
      tipo: 'ESQUEMA_DE_MANIPULACAO',
      descricao: 'Denúncia número 2 sobre possível manipulação',
      pessoas: 2,
      clubes: 1,
      evidencias: 3
    },
    { 
      id: '35577d1d-beb3-4e4d-b8be-e0f71aac7036', 
      idCurto: '#876412', 
      risco: 10, 
      status: 'EM ANÁLISE', 
      local: 'DF', 
      municipio: 'Brasília',
      data: '17/08 19:28',
      tipo: 'PARTIDA_ESPECIFICA',
      descricao: 'Denúncia número 3 sobre possível manipulação',
      pessoas: 1,
      clubes: 2,
      evidencias: 1
    },
    { 
      id: '35577d1d-beb3-4e4d-b8be-e0f71aac7037', 
      idCurto: '#876621', 
      risco: 100, 
      status: 'VERIFICADA', 
      local: 'RJ', 
      municipio: 'Rio de Janeiro',
      data: '01/08 10:02',
      tipo: 'ESQUEMA_DE_MANIPULACAO',
      descricao: 'Denúncia número 4 sobre possível manipulação',
      pessoas: 5,
      clubes: 3,
      evidencias: 10
    },
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
                <tr 
                  key={denuncia.id} 
                  className="bg-card-bg border-b border-border hover:bg-accent cursor-pointer"
                  onClick={() => setSelectedDenuncia(denuncia)}
                >
                  <td className="px-6 py-4 font-medium text-foreground">{denuncia.idCurto}</td>
                  <td className="px-6 py-4 text-muted">{denuncia.risco}</td>
                  <td className="px-6 py-4 font-medium">
                    <span className={getStatusClass(denuncia.status)}>
                      {denuncia.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
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

      {selectedDenuncia && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedDenuncia(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Detalhes da Denuncia</h2>
              <button
                onClick={() => setSelectedDenuncia(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">ID</label>
                  <p className="font-medium text-gray-900">{selectedDenuncia.id}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Tipo</label>
                  <p className="font-medium text-gray-900">{selectedDenuncia.tipo}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Status</label>
                  <p className="font-medium text-gray-900">{selectedDenuncia.status}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Data</label>
                  <p className="font-medium text-gray-900">{selectedDenuncia.data}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500 block mb-1">Municipio</label>
                  <p className="font-medium text-gray-900">{selectedDenuncia.municipio}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 block mb-1">UF</label>
                  <p className="font-medium text-gray-900">{selectedDenuncia.local}</p>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-1">Descricao</label>
                <p className="font-medium text-gray-900">{selectedDenuncia.descricao}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{selectedDenuncia.pessoas}</div>
                  <div className="text-sm text-gray-500 mt-1">Pessoas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{selectedDenuncia.clubes}</div>
                  <div className="text-sm text-gray-500 mt-1">Clubes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{selectedDenuncia.evidencias}</div>
                  <div className="text-sm text-gray-500 mt-1">Evidencias</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

