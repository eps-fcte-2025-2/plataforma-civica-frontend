'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

interface Report {
  id: string;
  tipoDenuncia: string;
  descricao: string;
  municipio: string;
  uf: string;
  dataDenuncia: string;
  status?: string;
  totalPessoas: number;
  totalClubes: number;
  totalEvidencias: number;
}

interface ReportDetail {
  id: string;
  tipoDenuncia: string;
  descricao: string;
  comoSoube?: string;
  pontualOuDisseminado: string;
  frequencia: string;
  municipio: string;
  uf: string;
  dataDenuncia: string;
  status?: string;
  observacoes?: string;
  partidas?: Array<{
    id: string;
    torneio: string;
    dataPartida: string;
    localPartida: string;
    timeA?: string;
    timeB?: string;
    municipio?: string;
    uf?: string;
  }>;
  pessoasEnvolvidas: Array<{ id: string; nomePessoa: string; funcaoPessoa: string }>;
  clubesEnvolvidos: Array<{ id: string; nomeClube: string }>;
  focosManipulacao: Array<{ id: string; foco: string }>;
  evidencias: Array<{ id: string; nomeOriginal: string; tipo: string; tamanhoBytes: number }>;
}

interface DashboardMetrics {
  totalReports: number;
  statusDistribution: {
    PENDENTE: number;
    EM_ANALISE: number;
    APROVADA: number;
    REJEITADA: number;
    ARQUIVADA: number;
  };
}

function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch {
      setError('Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Login - Área restrita
        </h1>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-center text-gray-700 text-sm">
            O acesso a esta área é restrito às pessoas diretamente envolvidas na gestão do projeto.
          </p>
          <p className="text-center text-gray-900 font-semibold text-sm mt-1">
            Somente pessoas autorizadas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-600 outline-none bg-transparent text-gray-800"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-blue-600 outline-none bg-transparent text-gray-800"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Carregando
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Esqueci a minha senha
        </p>
      </div>
    </div>
  );
}

function Dashboard() {
  const { token, user, logout } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [selectedReport, setSelectedReport] = useState<ReportDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    if (!token) return;

    try {
      const [reportsRes, metricsRes] = await Promise.all([
        fetch(`${API_URL}/v1/reports`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/v1/public/dashboard-metrics`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!reportsRes.ok) throw new Error('Erro ao carregar dados');

      const reportsData = await reportsRes.json();
      setReports(reportsData.reports || []);

      if (metricsRes.ok) {
        const metricsData = await metricsRes.json();
        setMetrics(metricsData);
      }
    } catch {
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const fetchReportDetail = async (id: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/v1/reports/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Erro ao carregar denúncia');

      const data = await response.json();
      setSelectedReport(data);
    } catch {
      setError('Erro ao carregar detalhes');
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'APROVADA': return 'text-green-600 bg-green-50';
      case 'PENDENTE': return 'text-yellow-600 bg-yellow-50';
      case 'EM_ANALISE': return 'text-blue-600 bg-blue-50';
      case 'REJEITADA': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (selectedReport) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setSelectedReport(null)}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Voltar para lista
          </button>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Sair
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Denúncia #{selectedReport.id.slice(0, 8)}</h2>
              <p className="text-gray-500">{new Date(selectedReport.dataDenuncia).toLocaleDateString('pt-BR')}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedReport.status)}`}>
              {selectedReport.status || 'PENDENTE'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Tipo</h3>
              <p className="text-gray-900">{selectedReport.tipoDenuncia === 'PARTIDA_ESPECIFICA' ? 'Partida Específica' : 'Esquema de Manipulação'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Local</h3>
              <p className="text-gray-900">{selectedReport.municipio}, {selectedReport.uf}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Frequência</h3>
              <p className="text-gray-900">{selectedReport.frequencia}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Abrangência</h3>
              <p className="text-gray-900">{selectedReport.pontualOuDisseminado}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Descrição</h3>
            <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedReport.descricao}</p>
          </div>

          {selectedReport.partidas && selectedReport.partidas.length > 0 && (
            <div className="mb-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Dados da Partida</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500">Torneio:</span> {selectedReport.partidas[0].torneio}</div>
                <div><span className="text-gray-500">Local:</span> {selectedReport.partidas[0].localPartida}</div>
                <div><span className="text-gray-500">Times:</span> {selectedReport.partidas[0].timeA} x {selectedReport.partidas[0].timeB}</div>
                <div><span className="text-gray-500">Data:</span> {new Date(selectedReport.partidas[0].dataPartida).toLocaleDateString('pt-BR')}</div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedReport.pessoasEnvolvidas && selectedReport.pessoasEnvolvidas.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Pessoas Envolvidas ({selectedReport.pessoasEnvolvidas.length})</h3>
                <ul className="space-y-2">
                  {selectedReport.pessoasEnvolvidas.map((p) => (
                    <li key={p.id} className="text-sm">
                      <span className="font-medium">{p.nomePessoa}</span> - {p.funcaoPessoa}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedReport.clubesEnvolvidos && selectedReport.clubesEnvolvidos.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Clubes ({selectedReport.clubesEnvolvidos.length})</h3>
                <ul className="space-y-2">
                  {selectedReport.clubesEnvolvidos.map((c) => (
                    <li key={c.id} className="text-sm">{c.nomeClube}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedReport.focosManipulacao && selectedReport.focosManipulacao.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Focos de Manipulação</h3>
                <ul className="space-y-2">
                  {selectedReport.focosManipulacao.map((f) => (
                    <li key={f.id} className="text-sm">{f.foco.replace(/_/g, ' ')}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedReport.evidencias && selectedReport.evidencias.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Evidências ({selectedReport.evidencias.length})</h3>
                <ul className="space-y-2">
                  {selectedReport.evidencias.map((e) => (
                    <li key={e.id} className="text-sm">
                      <span className="font-medium">{e.nomeOriginal}</span>
                      <span className="text-gray-500 ml-2">({e.tipo} - {formatBytes(e.tamanhoBytes)})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="bg-red-100 text-red-600 p-3 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Portal de dados</h1>
            <p className="text-sm text-gray-500">Olá, {user?.name}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Sair
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">{metrics?.totalReports || reports.length}</div>
            <div className="text-sm text-gray-500">Total de denúncias</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
          <div className="bg-green-100 text-green-600 p-3 rounded-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">{metrics?.statusDistribution?.APROVADA || 0}</div>
            <div className="text-sm text-gray-500">Verificadas</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
          <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">{metrics?.statusDistribution?.EM_ANALISE || 0}</div>
            <div className="text-sm text-gray-500">Em análise</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
          <div className="bg-red-100 text-red-600 p-3 rounded-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">{metrics?.statusDistribution?.PENDENTE || 0}</div>
            <div className="text-sm text-gray-500">Novas</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Denúncias Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Tipo</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Local (UF)</th>
                <th className="px-6 py-3">Data</th>
                <th className="px-6 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">#{report.id.slice(0, 8)}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {report.tipoDenuncia === 'PARTIDA_ESPECIFICA' ? 'Partida' : 'Esquema'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status || 'PENDENTE'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium">
                      {report.uf}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(report.dataDenuncia).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => fetchReportDetail(report.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function PortalPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <LoginForm />;
}
