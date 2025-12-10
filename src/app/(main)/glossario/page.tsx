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
          title: "Manipulação de Resultados Esportivos",
          description: "Acordo, ação ou omissão intencional destinada a alterar indevidamente o resultado ou o curso de uma competição esportiva, eliminando sua imprevisibilidade para obter vantagem indevida."
        },
        {
          color: "green",
          title: "Integridade Esportiva",
          description: "Princípio que assegura que competições esportivas ocorram sem interferências indevidas, preservando a incerteza do resultado, a igualdade entre competidores e a lisura das práticas esportivas."
        },
        {
          color: "yellow",
          title: "Match-Fixing",
          description: "Manipulação do resultado final de uma competição esportiva, geralmente vinculada a esquemas de apostas e organizada por grupos criminosos ou intermediários."
        },
        {
          color: "red",
          title: "Spot-Fixing",
          description: "Manipulação de eventos específicos dentro de uma partida — como faltas, cartões ou escanteios — sem necessariamente alterar o resultado final."
        },
        {
          color: "blue",
          title: "Mercado de Apostas de Quota Fixa (AQF)",
          description: "Modalidade lotérica em que o apostador sabe previamente quanto pode ganhar no momento da aposta, sendo regulamentada pela Lei nº 14.790/2023 e sujeita a controles de integridade."
        },
        {
          color: "green",
          title: "Organismos de Integridade Esportiva",
          description: "Entidades nacionais ou internacionais responsáveis pelo monitoramento da integridade das competições e apostas, pela detecção de padrões atípicos e pelo envio de relatórios de suspeita."
        },
        {
          color: "yellow",
          title: "Red Flags (Indicadores de Risco)",
          description: "Sinais ou padrões atípicos, estatísticos ou comportamentais, que indicam possível manipulação, como fluxos anormais de apostas, contas múltiplas ou eventos esportivos desproporcionais."
        },
        {
          color: "red",
          title: "Operadores de Apostas (Bets)",
          description: "Pessoas jurídicas autorizadas pelo Ministério da Fazenda a explorar apostas de quota fixa, devendo implementar políticas de prevenção à manipulação, controles internos e comunicação obrigatória de suspeitas."
        },
        {
          color: "blue",
          title: "Organização Criminosa no Contexto Esportivo",
          description: "Estrutura coordenada para manipular resultados, explorar mercados de apostas e praticar crimes correlatos, como corrupção, coação, fraudes e lavagem de dinheiro."
        },
        {
          color: "green",
          title: "Crime Contra a Incerteza do Resultado Esportivo",
          description: "Conjunto de tipos penais previstos nos arts. 198 a 200 da Lei Geral do Esporte que punem solicitações, ofertas ou práticas destinadas a alterar ou falsear resultados de competições esportivas."
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