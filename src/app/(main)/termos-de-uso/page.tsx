import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Termos de Uso',
};

export default function TermosDeUsoPage() {
  return (
    <main className="container mx-auto py-12 px-4 font-[Poppins]">
      <h1 className="text-3xl font-bold mb-4">Termos de Uso</h1>

      <p className="mb-4 text-gray-700">
        Bem-vindo ao Apita Cidadão. Ao utilizar esta plataforma, você concorda
        com os termos e condições descritos nesta página. Esta é uma versão
        inicial dos termos; para dúvidas específicas, entre em contato com a
        equipe responsável.
      </p>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Uso aceitável</h2>
        <p className="text-gray-700">
          Você concorda em não usar a plataforma para fins ilegais, difamatórios
          ou que violem direitos de terceiros.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Limitação de responsabilidade</h2>
        <p className="text-gray-700">
          A plataforma fornece ferramentas para envio de denúncias e informações,
          mas não substitui procedimentos oficiais. Use com responsabilidade.
        </p>
      </section>

      <Link href="/" className="text-blue-600 hover:underline">Voltar ao início</Link>
    </main>
  );
}
