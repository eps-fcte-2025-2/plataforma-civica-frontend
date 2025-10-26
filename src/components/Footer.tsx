import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-2 px-6">
      <div className="container mx-auto flex flex-col items-center font-[Poppins]">
        
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo-footer.svg" 
            alt="Logo Apita Cidadão"
            width={400}
            height={80}
            className="mb-2"
          />
          <p className="mt-2 text-gray-700 text-lg text-center max-w-4xl mx-auto">
             Uma iniciativa da Polícia Federal para combater a corrupção no esporte brasileiro
          </p>

        </div>
        
        <div className="flex space-x-6 text-gray-800 text-sm font-semibold">
          <Link
            href="/termos-de-uso"
            className="hover:text-black transition-colors duration-200"
            aria-label="Termos de Uso"
          >
            Termos de Uso
          </Link>
          <Link
            href="/politica-de-privacidade"
            className="hover:text-black transition-colors duration-200"
            aria-label="Política de Privacidade"
          >
            Política de Privacidade
          </Link>
          <Link
            href="/ajuda"
            className="hover:text-black transition-colors duration-200"
            aria-label="Ajuda"
          >
            Ajuda
          </Link>
        </div>

      </div>
    </footer>
  );
}