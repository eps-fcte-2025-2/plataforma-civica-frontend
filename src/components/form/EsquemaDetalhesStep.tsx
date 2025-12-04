'use client';

import React from 'react';
import { FocoManipulacao, PessoaEnvolvida } from '@/types/api';

interface PartidaSuspeita {
  nome: string;
  data: string;
  local: string;
  municipio: string;
}

interface EsquemaDetalhesStepProps {
  focosManipulacao: FocoManipulacao[];
  pessoasEnvolvidas: PessoaEnvolvida[];
  clubesEnvolvidos: Array<{ nomeClube: string }>;
  partidasSuspeitas: PartidaSuspeita[];
  descricao: string;
  onUpdatePessoas: (pessoas: PessoaEnvolvida[]) => void;
  onUpdateClubes: (clubes: Array<{ nomeClube: string }>) => void;
  onUpdatePartidas: (partidas: PartidaSuspeita[]) => void;
  onUpdateDescricao: (descricao: string) => void;
  hasFieldError?: (field: string) => boolean;
  getFieldError?: (field: string) => string | undefined;
}

const EsquemaDetalhesStep: React.FC<EsquemaDetalhesStepProps> = ({
  focosManipulacao,
  pessoasEnvolvidas,
  clubesEnvolvidos,
  partidasSuspeitas,
  descricao,
  onUpdatePessoas,
  onUpdateClubes,
  onUpdatePartidas,
  onUpdateDescricao,
  hasFieldError,
  getFieldError,
}) => {
  // Funções para pessoas envolvidas
  const addPessoa = (funcaoPadrao?: string) => {
    const novaPessoa: PessoaEnvolvida = { 
      nomePessoa: '', 
      funcaoPessoa: funcaoPadrao || '' 
    };
    onUpdatePessoas([...pessoasEnvolvidas, novaPessoa]);
  };

  const updatePessoa = (index: number, field: keyof PessoaEnvolvida, value: string) => {
    const novasPessoas = pessoasEnvolvidas.map((pessoa, i) => 
      i === index ? { ...pessoa, [field]: value } : pessoa
    );
    onUpdatePessoas(novasPessoas);
  };

  const removePessoa = (index: number) => {
    onUpdatePessoas(pessoasEnvolvidas.filter((_, i) => i !== index));
  };

  // Funções para clubes
  const addClube = () => {
    onUpdateClubes([...clubesEnvolvidos, { nomeClube: '' }]);
  };

  const updateClube = (index: number, value: string) => {
    const novosClubes = clubesEnvolvidos.map((clube, i) => 
      i === index ? { nomeClube: value } : clube
    );
    onUpdateClubes(novosClubes);
  };

  const removeClube = (index: number) => {
    onUpdateClubes(clubesEnvolvidos.filter((_, i) => i !== index));
  };

  // Funções para partidas suspeitas
  const addPartida = () => {
    const novaPartida: PartidaSuspeita = {
      nome: '',
      data: '',
      local: '',
      municipio: ''
    };
    onUpdatePartidas([...partidasSuspeitas, novaPartida]);
  };

  const updatePartida = (index: number, field: keyof PartidaSuspeita, value: string) => {
    const novasPartidas = partidasSuspeitas.map((partida, i) => 
      i === index ? { ...partida, [field]: value } : partida
    );
    onUpdatePartidas(novasPartidas);
  };

  const removePartida = (index: number) => {
    onUpdatePartidas(partidasSuspeitas.filter((_, i) => i !== index));
  };



  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Detalhes do Esquema
      </h3>

      {/* Seção para Juízes */}
      {focosManipulacao.includes(FocoManipulacao.JUIZES) && (
        <div className={`border rounded-lg p-6 ${hasFieldError?.('pessoas_juizes') ? 'border-destructive' : 'border-border'}`}>
          <h4 className="text-lg font-semibold text-foreground mb-4">
            Informações sobre Juízes Envolvidos
          </h4>
          
          <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Juízes envolvidos *
            </label>
            
            {pessoasEnvolvidas
              .map((pessoa, index) => ({ pessoa, index }))
              .filter(({ pessoa }) => pessoa.funcaoPessoa === 'Juiz')
              .map(({ pessoa, index }) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Nome do juiz"
                      value={pessoa.nomePessoa}
                      onChange={(e) => updatePessoa(index, 'nomePessoa', e.target.value)}
                      className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-input-focus"
                    />
                  </div>
                  <input
                    type="hidden"
                    value="Juiz"
                    onChange={(e) => updatePessoa(index, 'funcaoPessoa', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removePessoa(index)}
                    className="px-3 py-2 text-destructive hover:text-destructive"
                  >
                    Remover
                  </button>
                </div>
              ))}
            
            <button
              type="button"
              onClick={() => addPessoa('Juiz')}
              className="text-primary hover:text-blue-800 text-sm"
            >
              + Adicionar Juiz
            </button>
            {getFieldError?.('pessoas_juizes') && (
              <p className="text-sm text-destructive mt-2">{getFieldError('pessoas_juizes')}</p>
            )}
          </div>
        </div>
      )}

      {/* Seção para Apostadores */}
      {focosManipulacao.includes(FocoManipulacao.APOSTADORES) && (
        <div className={`border rounded-lg p-6 ${hasFieldError?.('pessoas_apostadores') ? 'border-destructive' : 'border-border'}`}>
          <h4 className="text-lg font-semibold text-foreground mb-4">
            Informações sobre Apostadores Envolvidos
          </h4>
          
          <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Apostadores envolvidos *
            </label>
            
            {pessoasEnvolvidas
              .map((pessoa, index) => ({ pessoa, index }))
              .filter(({ pessoa }) => pessoa.funcaoPessoa === 'Apostador')
              .map(({ pessoa, index }) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Nome do apostador"
                      value={pessoa.nomePessoa}
                      onChange={(e) => updatePessoa(index, 'nomePessoa', e.target.value)}
                      className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-input-focus"
                    />
                  </div>
                  <input
                    type="hidden"
                    value="Apostador"
                    onChange={(e) => updatePessoa(index, 'funcaoPessoa', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removePessoa(index)}
                    className="px-3 py-2 text-destructive hover:text-destructive"
                  >
                    Remover
                  </button>
                </div>
              ))}
            
            <button
              type="button"
              onClick={() => addPessoa('Apostador')}
              className="text-primary hover:text-blue-800 text-sm"
            >
              + Adicionar Apostador
            </button>
            {getFieldError?.('pessoas_apostadores') && (
              <p className="text-sm text-destructive mt-2">{getFieldError('pessoas_apostadores')}</p>
            )}
          </div>
        </div>
      )}

      {/* Seção para Atletas, Dirigentes ou Comissão Técnica */}
      {focosManipulacao.includes(FocoManipulacao.ATLETAS_DIRIGENTES_COMISSAO) && (
        <div className={`border rounded-lg p-6 ${hasFieldError?.('pessoas_atletas_dirigentes') ? 'border-destructive' : 'border-border'}`}>
          <h4 className="text-lg font-semibold text-foreground mb-4">
            Informações sobre Atletas, Dirigentes ou Comissão Técnica
          </h4>
          
          {/* Pessoas envolvidas */}
          <div className="space-y-4 mb-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Pessoas envolvidas *
            </label>
            
            {pessoasEnvolvidas
              .map((pessoa, index) => ({ pessoa, index }))
              .filter(({ pessoa }) => 
                !pessoa.funcaoPessoa || 
                ['Atleta', 'Dirigente', 'Comissão Técnica', ''].includes(pessoa.funcaoPessoa)
              )
              .map(({ pessoa, index }) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Nome da pessoa"
                      value={pessoa.nomePessoa}
                      onChange={(e) => updatePessoa(index, 'nomePessoa', e.target.value)}
                      className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-input-focus"
                    />
                  </div>
                  <div className="flex-1">
                    <select
                      value={pessoa.funcaoPessoa}
                      onChange={(e) => updatePessoa(index, 'funcaoPessoa', e.target.value)}
                      className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-input-focus"
                    >
                      <option value="">Selecione a função</option>
                      <option value="Atleta">Atleta</option>
                      <option value="Dirigente">Dirigente</option>
                      <option value="Comissão Técnica">Comissão Técnica</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePessoa(index)}
                    className="px-3 py-2 text-destructive hover:text-destructive"
                  >
                    Remover
                  </button>
                </div>
              ))}
            
            <button
              type="button"
              onClick={() => addPessoa()}
              className="text-primary hover:text-blue-800 text-sm"
            >
              + Adicionar Pessoa
            </button>
            {getFieldError?.('pessoas_atletas_dirigentes') && (
              <p className="text-sm text-destructive mt-2">{getFieldError('pessoas_atletas_dirigentes')}</p>
            )}
          </div>

          {/* Clubes implicados */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Clubes implicados (opcional)
            </label>
            
            {clubesEnvolvidos.map((clube, index) => (
              <div key={index} className="flex gap-4 items-center">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Nome do clube"
                    value={clube.nomeClube}
                    onChange={(e) => updateClube(index, e.target.value)}
                    className="w-full px-3 py-2 border border-input-border rounded-md focus:outline-none focus:ring-2 focus:ring-input-focus"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeClube(index)}
                  className="px-3 py-2 text-destructive hover:text-destructive"
                >
                  Remover
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addClube}
              className="text-primary hover:text-blue-800 text-sm"
            >
              + Adicionar Clube
            </button>
          </div>
        </div>
      )}

      {/* Partidas suspeitas (comum para todos os focos) */}
      <div className={`border rounded-lg p-6 ${hasFieldError?.('partidasSuspeitas') ? 'border-destructive' : 'border-border'}`}>
        <h4 className="text-lg font-semibold text-foreground mb-4">
          Partidas Suspeitas *
        </h4>
        
        <div className="space-y-4">
          {partidasSuspeitas.map((partida, index) => (
            <div key={index} className="border border-border rounded-md p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h5 className="font-medium text-foreground">Partida {index + 1}</h5>
                <button
                  type="button"
                  onClick={() => removePartida(index)}
                  className="text-destructive hover:text-destructive text-sm"
                >
                  Remover
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Nome da partida/jogo *</label>
                  <input
                    type="text"
                    placeholder="Nome da partida/jogo"
                    value={partida.nome}
                    onChange={(e) => updatePartida(index, 'nome', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${hasFieldError?.(`partida_${index}_nome`) ? 'border-destructive focus:ring-destructive' : 'border-input-border focus:ring-input-focus'}`}
                  />
                  {getFieldError?.(`partida_${index}_nome`) && (
                    <p className="text-sm text-destructive mt-1">{getFieldError(`partida_${index}_nome`)}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Data e horário *</label>
                  <input
                    type="datetime-local"
                    placeholder="Data e horário"
                    value={partida.data}
                    onChange={(e) => updatePartida(index, 'data', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${hasFieldError?.(`partida_${index}_data`) ? 'border-destructive focus:ring-destructive' : 'border-input-border focus:ring-input-focus'}`}
                  />
                  {getFieldError?.(`partida_${index}_data`) && (
                    <p className="text-sm text-destructive mt-1">{getFieldError(`partida_${index}_data`)}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Local *</label>
                  <input
                    type="text"
                    placeholder="Local"
                    value={partida.local}
                    onChange={(e) => updatePartida(index, 'local', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${hasFieldError?.(`partida_${index}_local`) ? 'border-destructive focus:ring-destructive' : 'border-input-border focus:ring-input-focus'}`}
                  />
                  {getFieldError?.(`partida_${index}_local`) && (
                    <p className="text-sm text-destructive mt-1">{getFieldError(`partida_${index}_local`)}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Município *</label>
                  <input
                    type="text"
                    placeholder="Município"
                    value={partida.municipio}
                    onChange={(e) => updatePartida(index, 'municipio', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${hasFieldError?.(`partida_${index}_municipio`) ? 'border-destructive focus:ring-destructive' : 'border-input-border focus:ring-input-focus'}`}
                  />
                  {getFieldError?.(`partida_${index}_municipio`) && (
                    <p className="text-sm text-destructive mt-1">{getFieldError(`partida_${index}_municipio`)}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addPartida}
            className="text-primary hover:text-blue-800 text-sm"
          >
            + Adicionar Partida Suspeita
          </button>
          {getFieldError?.('partidasSuspeitas') && (
            <p className="text-sm text-destructive mt-2">{getFieldError('partidasSuspeitas')}</p>
          )}
        </div>
      </div>

      {/* Descrição */}
      <div>
        <label htmlFor="descricao" className="block text-sm font-medium text-foreground mb-2">
          Descrição *
        </label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => onUpdateDescricao(e.target.value)}
          placeholder="Descreva detalhadamente o esquema de manipulação. Seja claro e objetivo. Informações pessoais, inclusive identificação, não devem ser inseridas a não ser que sejam essenciais para a caracterização da manifestação"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${hasFieldError?.('descricao') ? 'border-destructive focus:ring-destructive' : 'border-input-border focus:ring-input-focus'}`}
          rows={6}
          minLength={10}
          maxLength={5000}
          required
        />
        <p className="mt-1 text-sm text-muted">
          Mínimo 10 caracteres, máximo 5000 caracteres ({descricao.length}/5000)
        </p>
        {getFieldError?.('descricao') && (
          <p className="text-sm text-destructive mt-1">{getFieldError('descricao')}</p>
        )}
      </div>
    </div>
  );
};

export default EsquemaDetalhesStep;

