"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlus, FaMinus, FaAdjust, FaRegQuestionCircle, FaUniversalAccess } from 'react-icons/fa';

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
        
        {/* HEADER */}
        <header className="mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 self-start md:self-auto">
                <Image 
                    src="/perguntas.png" 
                    alt="Ícone Perguntas Frequentes" 
                    width={80}
                    height={80}
                    className="shrink-0 object-contain"
                />
                
                <h1 className="text-2xl md:text-3xl font-bold text-black leading-tight">
                    Perguntas frequentes
                </h1>
            </div>

            <div className="flex items-center gap-4 text-gray-400 text-2xl self-end md:self-auto">
                <Link href="/ajuda" title="Ajuda">
                    <FaRegQuestionCircle className="cursor-pointer hover:text-gray-700 transition-colors" />
                </Link>
                
                {/* Ícone de contraste apenas decorativo ou link para página de acessibilidade */}
                <div title="Alto Contraste" className="cursor-pointer hover:text-gray-700 transition-colors">
                    <FaAdjust className="-rotate-90" />
                </div>

                {/* --- BOTÃO AZUL FIXO (VLIBRAS ) --- */}
                <div title="Acessibilidade em Libras" className="fixed right-0 top-1/2 -translate-y-1/2 z-[9999] cursor-pointer">
                <div className="flex h-14 w-12 bg-[#003399] items-center justify-center rounded-l-xl hover:bg-blue-700 transition-colors shadow-lg border-y border-l border-white/20">
                    <FaUniversalAccess className="text-white text-3xl" />
                </div>
                </div>
            </div>
        </header>

        {/* CONTAINER PRINCIPAL */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 md:p-6">
            <div className="space-y-2">
                {faqData.map((item, index) => {
                    const isOpen = openIndex === index;
                    
                    return (
                        <div key={index} className="border-b border-gray-100 last:border-0">
                            <div className="flex justify-between items-start gap-4 py-4 md:py-5 px-2">
                                <div className="flex-1 pt-1">
                                    <button 
                                      onClick={() => toggleFaq(index)}
                                      className="text-left w-full text-lg md:text-[1.1rem] font-bold text-gray-900 mb-2 hover:text-blue-700 transition-colors leading-snug"
                                    >
                                        {item.question}
                                    </button>
                                    
                                    {!isOpen && (
                                       <p className="text-gray-500 text-sm font-medium line-clamp-2 cursor-pointer leading-relaxed" onClick={() => toggleFaq(index)}>
                                         {item.answer}
                                       </p>
                                    )}

                                    {isOpen && (
                                        <div className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed font-medium animate-fadeIn">
                                            <p className="mb-4">{item.answer}</p>
                                            
                                            {item.hasList && item.listItems && (
                                                <ul className="list-disc pl-6 space-y-2 mt-2">
                                                    {item.listItems.map((li, i) => (
                                                        <li key={i}>{li}</li>
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
                                            ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' 
                                            : 'bg-[#1e40af] text-white hover:bg-blue-800'
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
    </div>
  );
}