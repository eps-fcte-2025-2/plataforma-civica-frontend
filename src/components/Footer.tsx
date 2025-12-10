import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-accent py-2 px-6">
      <div className="container mx-auto flex flex-col items-center font-[Poppins]">
        
        <div className="flex flex-col items-center mb-6">
          <Link href="/">
            <Image
              src="/logo-footer.svg" 
              alt="Logo Apita Cidadão"
              width={400}
              height={80}
              className="mb-2 cursor-pointer"
            />
          </Link>
          <p className="mt-2 text-muted text-lg text-center max-w-4xl mx-auto">
             iniciativa do Grupo Interministerial instituído pela Portaria MESP/MF/MJSP 
             n. º 1, de 15 de agosto de 2025, publicado no Diário Oficial da União para combater a Manipulação de Resultados Esportivos.
          </p>

        </div>
        
        <div className="flex space-x-6 text-foreground text-sm font-semibold">
          <Link
            href="/termos-de-uso"
            className="hover:text-primary transition-colors duration-200"
            aria-label="Termos de Uso"
          >
            Termos de Uso
          </Link>
          <Link
            href="/politica-de-privacidade"
            className="hover:text-primary transition-colors duration-200"
            aria-label="Política de Privacidade"
          >
            Política de Privacidade
          </Link>
          <Link
            href="/ajuda"
            className="hover:text-primary transition-colors duration-200"
            aria-label="Ajuda"
          >
            Ajuda
          </Link>
        </div>

      </div>
    </footer>
  );
}