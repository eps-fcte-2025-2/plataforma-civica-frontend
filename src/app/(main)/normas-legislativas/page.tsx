'use client'

import Image from 'next/image';
import { useState } from 'react';

interface Law {
  title: string;
  description: string;
  color: 'blue' | 'green' | 'yellow' | 'red';
  link?: string;
}

const createLaw = (title: string, description: string, color: 'blue' | 'green' | 'yellow' | 'red', link = "#"): Law => ({
  title, description, color, link
});

export default function NormasLegislativas() {
  const [currentPage, setCurrentPage] = useState(0);

  const lawPages: Law[][] = [[
    createLaw("Lei nº 14.597/2023 — Lei Geral do Esporte (LGE)", "Reorganiza o sistema esportivo (Sinesp), princípios, governança e responsabilidades.", "blue"),
    createLaw("Lei nº 10.671/2003 — Estatuto do Torcedor", "Tipifica fraude/manipulação de resultados e protege a lisura das competições.", "green"),
    createLaw("Portaria SPA/MF nº 827/2024:", "Regras e critérios para autorização de operadores de apostas de quota fixa pelo Ministério da Fazenda.", "yellow"),
    createLaw("Lei nº 13.155/2015 — PROFUT", "Programa de modernização, governança e responsabilidade fiscal dos clubes.", "red"),
    createLaw("Lei nº 9.615/1998 - Lei Pelé", "Organiza as regras do esporte no Brasil.", "blue"),
    createLaw("Lei nº 13.756/2018 – Loterias e apostas esportivas", "Regulamenta a exploração de apostas de quota fixa no Brasil.", "green"),
    createLaw("Lei nº 14.790/2023 – Marco legal das apostas esportivas online", "Estabelece regras específicas para casas de apostas digitais.", "yellow"),
    createLaw("Lei nº 13.709/2018 – LGPD", "Lei Geral de Proteção de Dados, que garante privacidade e segurança no uso de informações pessoais.", "red"),
    createLaw("Decreto nº 8.642/2016 — APFUT", "Regulamenta a Autoridade Pública de Governança do Futebol", "blue"),
    createLaw("CBJD — Código Brasileiro de Justiça Desportiva (Res. CNE)", "Regras da Justiça Desportiva aplicáveis às competições.", "green"),
    createLaw("Convenção de Macolin (Convenção da Europa)", "Tratado internacional contra match-fixing", "yellow"),
    createLaw("Lei nº 12.299/2010 (reforma do EDT)", "Medidas de prevenção e repressão à violência em competições esportivas", "red")
  ]];

  const currentLaws = lawPages[currentPage];

  const getColorClasses = (color: 'blue' | 'green' | 'yellow' | 'red') => {
    switch(color) {
      case 'blue':
        return 'border-primary border-4';
      case 'green':
        return 'border-success border-4';
      case 'yellow':
        return 'border-[#FFD700] border-4';
      case 'red':
        return 'border-destructive border-4';
      default:
        return 'border-border border-4';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-card-bg rounded-lg shadow-sm border border-border mb-8 p-6">
        <div className="flex items-center gap-4">
          <div className="bg-accent p-3 rounded-lg">
            <Image
              src="/icons/normasLegislativas.svg"
              alt="Normas Legislativas"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Normas legislativas</h1>
            <p className="text-muted mt-1">Consulta rápida às leis, decisões e normas sobre o mundo esportivo.</p>
          </div>
        </div>
      </div>

      {/* Laws Grid - 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {currentLaws.map((law) => (
          <div
            key={law.title}
            className={`bg-card-bg rounded-lg p-6 ${getColorClasses(law.color)} flex flex-col justify-between min-h-[250px] shadow-sm`}
          >
            <div>
              <h3 className="font-bold text-base mb-3 text-foreground leading-tight">
                {law.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                {law.description}
              </p>
            </div>
            <button
              className="w-full px-4 py-2 bg-button-secondary text-foreground rounded-md hover:bg-accent transition-colors border border-border font-medium text-sm"
              onClick={() => {
                if (law.link) {
                  window.open(law.link, '_blank');
                }
              }}
            >
              Acesse aqui
            </button>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          className="px-6 py-2 bg-button-secondary text-foreground rounded-md hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-border"
          onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
        >
          Anterior
        </button>
        <button
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage(prev => Math.min(lawPages.length - 1, prev + 1))}
          disabled={currentPage === lawPages.length - 1}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
