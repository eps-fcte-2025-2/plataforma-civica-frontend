import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidade',
};

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="container mx-auto py-12 px-4 font-[Poppins]">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Política de Privacidade</h1>

      <div className="prose prose-lg max-w-none text-muted">
        <p className="mb-6">
          O Apita Cidadão está comprometido com a proteção da sua privacidade. Esta política
          detalha como coletamos, usamos, protegemos e, quando necessário, compartilhamos as
          informações fornecidas por você, em conformidade com a Lei Geral de Proteção de
          Dados (LGPD) e outras legislações aplicáveis.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Dados que Coletamos</h2>
          <p className="mb-4">Podemos coletar os seguintes tipos de informações:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Dados de identificação pessoal (quando fornecidos voluntariamente)</li>
            <li className="mb-2">Detalhes sobre a denúncia realizada</li>
            <li className="mb-2">Documentos e evidências anexados</li>
            <li className="mb-2">Data e hora do envio da denúncia</li>
            <li className="mb-2">Informações técnicas do dispositivo usado para acesso</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Como Usamos seus Dados</h2>
          <p className="mb-4">Suas informações são utilizadas para:</p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Processar e investigar as denúncias recebidas</li>
            <li className="mb-2">Entrar em contato caso necessitemos de informações adicionais</li>
            <li className="mb-2">Gerar estatísticas anônimas sobre o uso da plataforma</li>
            <li className="mb-2">Melhorar nossos serviços e a experiência do usuário</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Proteção de Dados</h2>
          <p className="mb-4">
            Implementamos medidas de segurança técnicas e organizacionais para proteger suas
            informações, incluindo:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Criptografia de dados em trânsito e em repouso</li>
            <li className="mb-2">Controle de acesso rigoroso às informações</li>
            <li className="mb-2">Monitoramento contínuo de segurança</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Compartilhamento de Informações</h2>
          <p className="mb-4">
            Suas informações poderão ser compartilhadas apenas com:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Autoridades competentes para investigação</li>
            <li className="mb-2">Órgãos reguladores do esporte</li>
            <li className="mb-2">Mediante ordem judicial</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Seus Direitos</h2>
          <p className="mb-4">
            Você tem direito a:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Acessar seus dados pessoais</li>
            <li className="mb-2">Solicitar correções de informações inexatas</li>
            <li className="mb-2">Ser informado sobre o uso de seus dados</li>
            <li className="mb-2">Solicitar a exclusão de dados (quando aplicável)</li>
          </ul>
        </section>

        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-sm text-muted mb-4">
            Última atualização: 26 de outubro de 2025
          </p>
          <Link href="/" className="text-primary hover:underline">
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}

