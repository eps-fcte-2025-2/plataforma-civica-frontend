// components/Sidebar.tsx

import Link from 'next/link';
import Image from 'next/image';
import {
  FaUserSecret,
  FaTimes,
  FaUniversalAccess, 
} from 'react-icons/fa';
import { TbMessageQuestion } from "react-icons/tb";

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
  const navItems = [
    { name: 'Faça sua denúncia', icon: <FaUserSecret />, href: '/denuncia', active: false },
    {name: 'Perguntas frequentes', icon: <TbMessageQuestion width={25.6} height={24}/>, href: '/perguntas-frequentes' },
    { name: 'Portal de dados', icon: <Image src="/Chart.svg" alt="Portal de dados" width={25.6} height={24}/>, href: '/portal' },
    { name: 'Acessibilidade', icon: <FaUniversalAccess/>, href: '/acessibilidade' },
    { name: 'Sobre', icon: <Image src="/Activity.svg" alt="Sobre" width={25.6} height={24}/>, href: '/sobre' }
  ];

  return (
    <nav
      className={`
        flex flex-col w-48 bg-white p-4 z-[60]
        md:relative md:translate-x-0 
        fixed top-0 left-0 h-screen transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <button
        onClick={() => setIsOpen(false)}
        className="md:hidden absolute top-4 right-4 text-gray-700 text-2xl"
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
                className="flex items-center gap-4 py-3 px-4 rounded-lg transition-colors duration-200 text-gray-600 hover:bg-gray-50"
              >
                <div className="opacity-40">
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

    </nav>
  );
}
