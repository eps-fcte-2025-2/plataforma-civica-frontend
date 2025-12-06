'use client'

import Image from 'next/image';
import { useState } from 'react';

export default function Glossario() {
  const [currentPage, setCurrentPage] = useState(0);

  const glossaryPages = [
    {
      title: "Glossário",
      subtitle: "Consulta rápida aos termos, dados, frases sobre o mundo esportivo.",
      cards: [
        {
          color: "blue",
          title: "Manipulação de resultados",
          description: "Quando alguém altera de forma irregular o resultado de uma partida ou competição, prejudicando a lisura do esporte."
        },
        {
          color: "green",
          title: "Jurisprudência",
          description: "Decisões anteriores da Justiça que são referência para novos casos semelhantes."
        },
        {
          color: "yellow",
          title: "LGPD (Lei Geral de Proteção de Dados)",
          description: "Lei que garante a proteção das informações pessoais e define como elas podem ser usadas."
        },
        {
          color: "red",
          title: "Corrupção no esporte",
          description: "Práticas ilegais, como manipulação de resultados, compra de árbitros ou dirigentes, que prejudicam a honestidade do jogo."
        },
        {
          color: "blue",
          quote: "Eu nunca joguei para ser a segunda ou a terceira. Eu jogo para ser a melhor.",
          author: "Marta, brasileira seis vezes melhor jogadora do mundo."
        },
        {
          color: "green",
          quote: "O jogo muda quando você acredita no coletivo.",
          author: "Bernardinho, Ex-técnico das seleções brasileira masculina e feminina de vôlei"
        },
        {
          color: "yellow",
          quote: "A dor faz parte da rotina de um atleta.",
          author: "Daiane dos Santos, ginasta brasileira"
        },
        {
          color: "red",
          quote: "O importante não é vencer todos os dias, mas lutar sempre.",
          author: "Ayrton Senna, piloto brasileiro de Fórmula 1"
        },
        {
          color: "blue",
          stat: "72% das denúncias de manipulação vêm do futebol"
        },
        {
          color: "green",
          stat: "O esporte limpo é um direito de todos."
        },
        {
          color: "yellow",
          stat: "Sua denúncia ajuda a proteger a integridade esportiva."
        },
        {
          color: "red",
          stat: "Apenas 4% da cobertura da mídia esportiva é feminina."
        }
      ]
    }
  ];

  const currentPageData = glossaryPages[currentPage];

  const getColorClasses = (color: string) => {
    switch(color) {
      case 'blue':
        return 'border-primary border-2';
      case 'green':
        return 'border-success border-2';
      case 'yellow':
        return 'border-primary border-2';
      case 'red':
        return 'border-destructive border-2';
      default:
        return 'border-border border-2';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-card-bg rounded-lg shadow-sm border border-border mb-8 p-6">
        <div className="flex items-center gap-4">
          <div className="bg-accent p-3 rounded-lg">
            <Image
              src="/icons/glossario.svg"
              alt="Glossário"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{currentPageData.title}</h1>
            <p className="text-muted mt-1">{currentPageData.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Cards Grid - 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {currentPageData.cards.map((card, index) => (
          <div
            key={index}
            className={`bg-card-bg rounded-lg p-6 ${getColorClasses(card.color)} flex flex-col justify-center min-h-[200px]`}
          >
            {card.title && (
              <>
                <h3 className="font-bold text-lg mb-3 text-foreground">{card.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{card.description}</p>
              </>
            )}
            {card.quote && (
              <div className="flex flex-col h-full justify-center">
                <p className="text-foreground font-medium mb-3 text-sm italic">
                  &ldquo;{card.quote}&rdquo;
                </p>
                <p className="text-muted text-xs">— {card.author}</p>
              </div>
            )}
            {card.stat && (
              <div className="flex items-center justify-center h-full">
                <p className="text-foreground font-bold text-center text-sm">{card.stat}</p>
              </div>
            )}
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
          onClick={() => setCurrentPage(prev => Math.min(glossaryPages.length - 1, prev + 1))}
          disabled={currentPage === glossaryPages.length - 1}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
