import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Ajuda',
};

export default function AjudaPage() {
  return (
    <main className="container mx-auto py-12 px-4 font-[Poppins]">
      <h1 className="text-3xl font-bold mb-4">Ajuda</h1>

      <p className="mb-4 text-gray-700">
        Aqui você encontra informações sobre como utilizar a plataforma e como
        enviar uma denúncia de forma segura e eficaz.
      </p>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Como enviar uma denúncia</h2>
        <ol className="list-decimal list-inside text-gray-700">
          <li>Preencha as informações básicas sobre o caso.</li>
          <li>Anexe documentos ou evidências, se disponíveis.</li>
          <li>Revise e envie. Você receberá uma confirmação na tela.</li>
        </ol>
      </section>

      <Link href="/" className="text-blue-600 hover:underline">Voltar ao início</Link>
    </main>
  );
}
