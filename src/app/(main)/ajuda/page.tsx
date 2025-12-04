import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Ajuda',
};

export default function AjudaPage() {
  return (
    <main className="container mx-auto py-12 px-4 font-[Poppins]">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Central de Ajuda</h1>

      <div className="prose prose-lg max-w-none text-muted">
        <p className="mb-6">
          Bem-vindo à Central de Ajuda do Apita Cidadão. Aqui você encontrará informações
          detalhadas sobre como utilizar nossa plataforma e fazer denúncias de forma segura
          e eficaz.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Como Enviar uma Denúncia</h2>
          <ol className="list-decimal space-y-4 pl-6">
            <li>
              <strong>Escolha o tipo de denúncia</strong>
              <p className="mt-2">
                Selecione entre denúncia de partida específica ou esquema de
                manipulação. Cada tipo tem um formulário adaptado às informações
                necessárias.
              </p>
            </li>
            <li>
              <strong>Preencha as informações básicas</strong>
              <p className="mt-2">
                Forneça detalhes como data, local, competição e equipes envolvidas.
                Quanto mais precisa for a informação, melhor poderemos investigar.
              </p>
            </li>
            <li>
              <strong>Descreva os fatos</strong>
              <p className="mt-2">
                Relate o ocorrido de forma clara e objetiva. Inclua informações sobre:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>O que aconteceu</li>
                <li>Quando aconteceu</li>
                <li>Quem estava envolvido</li>
                <li>Como você tomou conhecimento</li>
              </ul>
            </li>
            <li>
              <strong>Anexe evidências</strong>
              <p className="mt-2">
                Se possível, inclua:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Fotos ou vídeos relevantes</li>
                <li>Documentos comprobatórios</li>
                <li>Capturas de tela de conversas ou publicações</li>
                <li>Qualquer outro material que suporte a denúncia</li>
              </ul>
            </li>
            <li>
              <strong>Revise e envie</strong>
              <p className="mt-2">
                Confira todas as informações antes de enviar. Você receberá uma
                confirmação na tela após o envio bem-sucedido.
              </p>
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Dicas Importantes</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Seja preciso e objetivo nas descrições</li>
            <li>Mantenha sigilo sobre sua denúncia</li>
            <li>Evite compartilhar informações sensíveis em redes sociais</li>
            <li>Guarde cópias das evidências fornecidas</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Perguntas Frequentes</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Posso fazer uma denúncia anônima?</h3>
              <p>
                Sim, você pode optar por não se identificar. No entanto, fornecer seus dados
                pode ajudar caso precisemos de informações adicionais para a investigação.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Como acompanhar minha denúncia?</h3>
              <p>
                Por questões de sigilo e segurança, não é possível acompanhar o andamento
                das denúncias através da plataforma.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">As informações são seguras?</h3>
              <p>
                Sim, utilizamos tecnologias avançadas de criptografia e segurança para
                proteger todas as informações enviadas através da plataforma.
              </p>
            </div>
          </div>
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

