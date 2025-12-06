"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { FaPlus, FaMinus, FaUniversalAccess } from 'react-icons/fa';

const faqData = [
  {
    question: "As denúncias são mesmo anônimas?",
    answer: "Sim. A plataforma garante o sigilo total da identidade do denunciante. Nossos servidores não armazenam IP e os dados são criptografados.",
    hasList: false
  },
  {
    question: "Como funciona o processo de denúncia?",
    answer: "O processo segue etapas rigorosas de verificação:",
    hasList: true,
    listItems: [
        "Envio do formulário anônimo",
        "Análise preliminar pela equipe técnica",
        "Encaminhamento para os órgãos competentes",
        "Acompanhamento via protocolo gerado"
    ]
  },
  {
    question: "Posso acompanhar minha denúncia?",
    answer: "Sim, ao finalizar a denúncia você receberá um número de protocolo para consultar o andamento sem precisar se identificar.",
    hasList: false
  },
  {
    question: "Quais tipos de irregularidade posso denunciar?",
    answer: "Você pode denunciar qualquer suspeita de manipulação de resultados, suborno, ou conduta antiética no esporte.",
    hasList: false
  },
  {
    question: "O serviço é gratuito?",
    answer: "Sim, o Apita Cidadão é uma iniciativa pública e totalmente gratuita.",
    hasList: false
  }
];

export default function PerguntasFrequentesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto font-[Poppins] relative">

        <header className="mb-8 flex items-center gap-4">
            <Image
                src="/perguntas.png"
                alt="Ícone Perguntas Frequentes"
                width={80}
                height={80}
                className="shrink-0 object-contain"
            />

            <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Perguntas frequentes
            </h1>
        </header>

        <div className="bg-card-bg rounded-2xl shadow-sm border border-border p-2 md:p-6">
            <div className="space-y-2">
                {faqData.map((item, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div key={item.question} className="border-b border-border last:border-0">
                            <div className="flex justify-between items-start gap-4 py-4 md:py-5 px-2">
                                <div className="flex-1 pt-1">
                                    <button
                                      onClick={() => toggleFaq(index)}
                                      className="text-left w-full text-lg md:text-[1.1rem] font-bold text-foreground mb-2 hover:text-primary transition-colors leading-snug"
                                    >
                                        {item.question}
                                    </button>

                                    {!isOpen && (
                                       <p className="text-muted text-sm font-medium line-clamp-2 leading-relaxed">
                                         {item.answer}
                                       </p>
                                    )}

                                    {isOpen && (
                                        <div className="mt-4 text-foreground text-sm md:text-base leading-relaxed font-medium animate-fadeIn">
                                            <p className="mb-4">{item.answer}</p>

                                            {item.hasList && item.listItems && (
                                                <ul className="list-disc pl-6 space-y-2 mt-2">
                                                    {item.listItems.map((li) => (
                                                        <li key={li}>{li}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => toggleFaq(index)}
                                    className={`
                                        flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-200 shrink-0 mt-1
                                        ${isOpen
                                            ? 'bg-accent text-muted hover:bg-button-secondary border border-border'
                                            : 'bg-primary text-white hover:bg-primary-hover'
                                        }
                                    `}
                                >
                                    {isOpen ? <FaMinus size={12} /> : <FaPlus size={12} />}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        <div
            title="Acessibilidade em Libras"
            className="fixed right-0 top-1/2 -translate-y-1/2 z-[9999] cursor-pointer"
        >
            <div className="flex h-14 w-12 bg-primary items-center justify-center rounded-l-xl hover:bg-primary-hover transition-colors shadow-lg border-y border-l border-border">
                <FaUniversalAccess className="text-white text-3xl" />
            </div>
        </div>

    </div>
  );
}
