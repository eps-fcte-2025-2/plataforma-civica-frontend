// app/(main)/layout.tsx
'use client'

import { useState } from 'react';
import Footer from "@/components/Footer";
import Sidebar from "../../components/Sidebar"; // Ajuste o caminho conforme necessário
import { FaBars } from 'react-icons/fa';

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // min-h-dvh garante que o container ocupe toda a altura da tela
    <div className="flex min-h-dvh bg-background">
      
      {/* 1. Botão Mobile (Sem alterações) */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[60] text-foreground text-2xl"
      >
        <FaBars />
      </button>

      {/* 2. Overlay Mobile (Sem alterações) */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      />

      {/* 3. A Sidebar fica aqui, isolada na esquerda */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
      {/* 4. Wrapper do Conteúdo + Footer (Coluna da Direita) */}
      <div className="flex flex-col flex-1 min-w-0">
        
        {/* O conteúdo principal expande para empurrar o footer para baixo */}
        <main className="flex-1 px-4 py-8">
          {children}
        </main>
        
        {/* O Footer agora mora AQUI, na coluna da direita */}
        <Footer />
        
      </div>
    </div>
  );
}