'use client'

import Image from 'next/image';
import { useState } from 'react';

interface Law {
  title: string;
  description: string;
  color: 'blue' | 'green' | 'yellow' | 'red';
  link?: string;
}

export default function NormasLegislativas() {
  const [currentPage, setCurrentPage] = useState(0);

  const lawPages: Law[][] = [
    [
      {
        title: "Lei nº 14.597/2023 — Lei Geral do Esporte (LGE)",
        description: "Reorganiza o sistema esportivo (Sinesp), princípios, governança e responsabilidades.",
        color: "blue",
        link: "#"
      },
      {
        title: "Lei nº 10.671/2003 — Estatuto do Torcedor",
        description: "Tipifica fraude/manipulação de resultados e protege a lisura das competições.",
        color: "green",
        link: "#"
      },
      {
        title: "Portaria SPA/MF nº 827/2024:",
        description: "Regras e critérios para autorização de operadores de apostas de quota fixa pelo Ministério da Fazenda.",
        color: "yellow",
        link: "#"
      },
      {
        title: "Lei nº 13.155/2015 — PROFUT",
        description: "Programa de modernização, governança e responsabilidade fiscal dos clubes.",
        color: "red",
        link: "#"
      },
      {
        title: "Lei nº 9.615/1998 - Lei Pelé",
        description: "Organiza as regras do esporte no Brasil.",
        color: "blue",
        link: "#"
      },
      {
        title: "Lei nº 13.756/2018 – Loterias e apostas esportivas",
        description: "Regulamenta a exploração de apostas de quota fixa no Brasil.",
        color: "green",
        link: "#"
      },
      {
        title: "Lei nº 14.790/2023 – Marco legal das apostas esportivas online",
        description: "Estabelece regras específicas para casas de apostas digitais.",
        color: "yellow",
        link: "#"
      },
      {
        title: "Lei nº 13.709/2018 – LGPD",
        description: "Lei Geral de Proteção de Dados, que garante privacidade e segurança no uso de informações pessoais.",
        color: "red",
        link: "#"
      },
      {
        title: "Decreto nº 8.642/2016 — APFUT",
        description: "Regulamenta a Autoridade Pública de Governança do Futebol",
        color: "blue",
        link: "#"
      },
      {
        title: "CBJD — Código Brasileiro de Justiça Desportiva (Res. CNE)",
        description: "Regras da Justiça Desportiva aplicáveis às competições.",
        color: "green",
        link: "#"
      },
      {
        title: "Convenção de Macolin (Convenção da Europa)",
        description: "Tratado internacional contra match-fixing",
        color: "yellow",
        link: "#"
      },
      {
        title: "Lei nº 12.299/2010 (reforma do EDT)",
        description: "Medidas de prevenção e repressão à violência em competições esportivas",
        color: "red",
        link: "#"
      }
    ]
  ];

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
        {currentLaws.map((law, index) => (
          <div
            key={index}
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
