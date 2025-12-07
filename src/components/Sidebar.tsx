'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  FaUserSecret,
  FaTimes,
  FaUniversalAccess,
} from 'react-icons/fa';
import { TbMessageQuestion } from "react-icons/tb";
import { useTheme } from '@/contexts/ThemeContext';

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
  const { toggleTheme } = useTheme();
  const pathname = usePathname();

  const navItems = [
    { name: 'Faça sua denúncia', icon: <FaUserSecret />, href: '/denuncia' },
    { name: 'Perguntas frequentes', icon: <TbMessageQuestion width={25.6} height={24}/>, href: '/perguntas-frequentes' },
    { name: 'Glossário', icon: <Image src="/icons/glossario.svg" alt="Glossário" width={25.6} height={24}/>, href: '/glossario' },
    { name: 'Normas legislativas', icon: <Image src="/icons/normasLegislativas.svg" alt="Normas legislativas" width={25.6} height={24}/>, href: '/normas-legislativas' },
    { name: 'Portal de dados', icon: <Image src="/Chart.svg" alt="Portal de dados" width={25.6} height={24}/>, href: '/portal' },
    { name: 'Acessibilidade', icon: <FaUniversalAccess/>, href: '/acessibilidade' },
    { name: 'Sobre', icon: <Image src="/Activity.svg" alt="Sobre" width={25.6} height={24}/>, href: '/sobre' }
  ];

  return (
    <nav
      className={`
        /* 1. Cores e Borda */
        bg-card-bg border-r border-border z-[60]
        
        /* 2. Dimensões e Posição (Mobile) */
        fixed top-0 left-0 h-screen w-64 transition-transform duration-300
        
        /* 3. COMPORTAMENTO DESKTOP (A Mágica acontece aqui) */
        /* 'sticky' faz ela acompanhar o scroll, 'top-0' cola no teto, 'h-screen' garante altura total */
        md:sticky md:top-0 md:h-screen md:translate-x-0
        
        /* 4. SCROLL INTERNO (Correção do corte) */
        /* Se o conteúdo for maior que a tela, cria scroll só na barra */
        overflow-y-auto 
        
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Wrapper interno para organizar o layout verticalmente */}
      <div className="flex flex-col min-h-full p-4">
        
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 text-foreground text-2xl"
        >
          <FaTimes />
        </button>

        {/* Logo */}
        <div className="mb-8 p-2 flex items-center justify-center shrink-0">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Logo Apita Cidadão"
              width={150}
              height={40}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Lista de Itens (flex-1 empurra o botão de contraste para o fundo) */}
        <ul className="space-y-4 flex-1">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            
            return (
              <li key={index}>
                <Link href={item.href}>
                  <div
                    className={`
                      flex items-center gap-4 py-3 px-4 rounded-lg transition-colors duration-200
                      ${isActive 
                        ? 'bg-blue-100 text-blue-600' // Estilo ATIVO (Azul)
                        : 'text-muted hover:bg-accent' // Estilo PADRÃO
                      }
                    `}
                  >
                    <div className={`sidebar-icon ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                      {item.icon}
                    </div>
                    <span className="font-semibold text-sm">
                      {item.name}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Botão Alto Contraste (Fixo no final da lista) */}
        <div className="mt-8 shrink-0 pb-4 md:pb-0">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-4 py-3 px-4 rounded-lg transition-colors duration-200 text-muted hover:bg-accent w-full border border-border/40"
          >
            <div className="opacity-40 sidebar-icon">
              <Image
                src="/icons/contraste.svg"
                alt="Alto contraste"
                width={24}
                height={25.6}
              />
            </div>
            <span className="font-semibold text-sm">
              Alto contraste
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}