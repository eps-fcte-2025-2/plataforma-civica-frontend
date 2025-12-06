'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FaUserSecret,
  FaTimes,
  FaUniversalAccess,
} from 'react-icons/fa';
import { TbMessageQuestion } from "react-icons/tb";
import { useTheme } from '@/contexts/ThemeContext';

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
  const { toggleTheme } = useTheme();

  const navItems = [
    { name: 'Faça sua denúncia', icon: <FaUserSecret />, href: '/denuncia', active: false },
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
        flex flex-col w-48 bg-card-bg p-4 z-[60] border-r border-border
        md:relative md:translate-x-0 
        fixed top-0 left-0 h-screen transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <button
        onClick={() => setIsOpen(false)}
        className="md:hidden absolute top-4 right-4 text-foreground text-2xl"
      >
        <FaTimes />
      </button>

      {/* Logo */}
      <div className="mb-8 p-2 flex items-center justify-center">
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

      <ul className="space-y-4">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link href={item.href}>
              <div
                className="flex items-center gap-4 py-3 px-4 rounded-lg transition-colors duration-200 text-muted hover:bg-accent"
              >
                <div className="opacity-40 sidebar-icon">
                  {item.icon}
                </div>
                <span className="font-semibold text-sm">
                  {item.name}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Botão Alto Contraste */}
      <div className="mt-auto">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-4 py-3 px-4 rounded-lg transition-colors duration-200 text-muted hover:bg-accent w-full"
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

    </nav>
  );
}
