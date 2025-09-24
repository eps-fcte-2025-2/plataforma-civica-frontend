// app/(main)/layout.tsx

'use client'

import { useState } from 'react';
import Footer from "@/components/Footer";
import Sidebar from "../../components/Sidebar";
import { FaBars } from 'react-icons/fa';

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Botão para abrir o menu em telas pequenas */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[60] text-gray-700 text-2xl"
      >
        <FaBars />
      </button>

      {/* Overlay que escurece a tela quando o menu está aberto */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      />

      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 px-4 py-8">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}