import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4 px-6">
      <div className="container mx-auto flex flex-col items-center">
        
        {/* Seção da Logo e Slogan */}
        <div className="flex flex-col items-center mb-6">
          {/* Substitua a imagem abaixo pelo caminho para o seu arquivo da logo */}
          <Image
            src="/logo-footer.svg" 
            alt="Logo Apita Cidadão"
            width={500}
            height={80}
            className="mb-2"
          />
          <p className="mt-2 text-gray-700 text-lg text-center max-w-xl">
            Uma iniciativa da Polícia Federal para combater a corrupção no esporte brasileiro
          </p>
        </div>
        
        {/* Seção dos Links */}
        <div className="flex space-x-6 text-gray-800 text-sm font-semibold">
          <a href="#" className="hover:text-black transition-colors duration-200">
            Termos de Uso
          </a>
          <a href="#" className="hover:text-black transition-colors duration-200">
            Política de Privacidade
          </a>
          <a href="#" className="hover:text-black transition-colors duration-200">
            Ajuda
          </a>
        </div>

      </div>
    </footer>
  );
}