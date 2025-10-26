import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Termos de Uso',
};

export default function TermosDeUsoPage() {
  return (
    <main className="container mx-auto py-12 px-4 font-[Poppins]">
      <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>

      <div className="prose prose-lg max-w-none text-gray-700">
        <p className="mb-6">
          Bem-vindo ao Apita Cidadão, uma plataforma desenvolvida pela Polícia Federal para promover
          a integridade no esporte brasileiro. Ao utilizar nossos serviços, você concorda com estes
          termos e condições. Por favor, leia-os atentamente.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
          <p className="mb-4">
            Ao acessar ou utilizar a plataforma Apita Cidadão, você confirma que leu, entendeu e
            concorda com estes termos de uso. Se você não concordar com qualquer parte destes termos,
            não deverá utilizar a plataforma.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Uso Aceitável</h2>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Fornecer informações verdadeiras e precisas nas denúncias</li>
            <li className="mb-2">Respeitar a confidencialidade das investigações em andamento</li>
            <li className="mb-2">Não utilizar a plataforma para fins difamatórios ou fraudulentos</li>
            <li className="mb-2">Não compartilhar informações falsas ou enganosas</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Responsabilidades do Usuário</h2>
          <p className="mb-4">
            O usuário é inteiramente responsável pela veracidade das informações fornecidas e pela
            legitimidade dos documentos enviados através da plataforma.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Limitação de Responsabilidade</h2>
          <p className="mb-4">
            A plataforma Apita Cidadão é uma ferramenta para recebimento de denúncias e não substitui
            os canais oficiais de investigação. A Polícia Federal se reserva o direito de:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Avaliar a pertinência das denúncias recebidas</li>
            <li className="mb-2">Iniciar ou não procedimentos investigativos</li>
            <li className="mb-2">Solicitar informações adicionais quando necessário</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Modificações dos Termos</h2>
          <p className="mb-4">
            Estes termos podem ser atualizados periodicamente. Recomendamos que você os revise
            regularmente. O uso continuado da plataforma após alterações constitui aceitação dos
            novos termos.
          </p>
        </section>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">
            Última atualização: 26 de outubro de 2025
          </p>
          <Link href="/" className="text-blue-600 hover:underline">
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}
