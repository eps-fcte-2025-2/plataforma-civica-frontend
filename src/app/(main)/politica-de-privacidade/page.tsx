import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidade',
};

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="container mx-auto py-12 px-4 font-[Poppins]">
      <h1 className="text-3xl font-bold mb-4">Política de Privacidade</h1>

      <p className="mb-4 text-gray-700">
        Esta política explica como coletamos, usamos e protegemos os dados
        enviados pelos usuários. Informações pessoais serão tratadas de forma
        confidencial e somente utilizadas para apurar denúncias conforme a
        legislação aplicável.
      </p>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Dados coletados</h2>
        <p className="text-gray-700">Podemos coletar informações básicas fornecidas no formulário de denúncias.</p>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Compartilhamento</h2>
        <p className="text-gray-700">Os dados poderão ser compartilhados com autoridades competentes quando necessário.</p>
      </section>

      <Link href="/" className="text-blue-600 hover:underline">Voltar ao início</Link>
    </main>
  );
}
