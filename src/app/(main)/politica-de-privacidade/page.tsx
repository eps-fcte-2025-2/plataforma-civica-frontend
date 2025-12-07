import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidade',
};

export default function PoliticaPrivacidadePage() {
  return (
    <main className="container mx-auto py-12 px-4 font-[Poppins]">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Política de Privacidade</h1>

      <div className="prose prose-lg max-w-none text-muted">
        <p className="mb-6">
          <strong>O Apita Cidadão</strong>, gerido pelo <strong>Departamento de Polícia Federal (DPF)</strong>, 
          está comprometido com a transparência e a proteção dos seus dados pessoais. Esta <strong>Política 
          de Privacidade</strong> descreve como tratamos suas informações em conformidade com a <strong>Lei Geral 
          de Proteção de Dados (Lei nº 13.709/2018 - LGPD)</strong>, o Marco Civil da Internet e os 
          padrões internacionais de segurança <strong>(ISO/IEC 27701)</strong>.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Controlador e Encarregado (DPO)</h2>
          <p className="mb-4">
            O Controlador dos dados coletados nesta plataforma é o <strong>Departamento de Polícia Federal</strong>.
            Em caso de dúvidas sobre o tratamento de seus dados, você pode entrar em contato com o Encarregado 
            pelo Tratamento de Dados Pessoais através dos canais oficiais disponíveis no site <strong>`gov.br/pf`</strong>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Dados Coletados e Finalidade</h2>
          <p className="mb-4">
            A coleta de dados visa exclusivamente a instrução de procedimentos investigativos sobre crimes 
            contra a integridade esportiva. Coletamos:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              <strong>Dados de Identificação:</strong> Nome completo, CPF, telefone e e-mail (quando a denúncia não for anônima).
            </li>
            <li className="mb-2">
              <strong>Conteúdo da Denúncia:</strong> Relatos, documentos, fotos, áudios e evidências enviadas voluntariamente.
            </li>
            <li className="mb-2">
              <strong>Dados Técnicos e de Navegação:</strong> Endereço IP, *User-Agent* do dispositivo, data e hora de acesso 
              (coleta obrigatória conforme <strong>Art. 15 da Lei 12.965/2014 - Marco Civil da Internet</strong>).
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Base Legal para o Tratamento</h2>
          <p className="mb-4">
            O tratamento dos seus dados é realizado com base nas seguintes hipóteses legais da LGPD:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2"><strong>Cumprimento de obrigação legal ou regulatória</strong> <strong>(Art. 7º, II)</strong>.</li>
            <li className="mb-2"><strong>Execução de políticas públicas</strong> previstas em leis e regulamentos <strong>(Art. 7º, III)</strong>.</li>
            <li className="mb-2">
              <strong>Segurança Pública e Investigação Penal:</strong> Conforme o <strong>Art. 4º, III da LGPD</strong>, o tratamento de dados 
              para fins exclusivos de segurança pública e atividades de investigação e repressão de infrações penais segue 
              legislação específica, garantindo-se os direitos fundamentais de liberdade e privacidade.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Proteção e Armazenamento</h2>
          <p className="mb-4">
            Adotamos medidas técnicas e administrativas compatíveis com a norma <strong>ISO/IEC 27001</strong> para proteger seus dados, incluindo:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Criptografia de ponta a ponta para dados em trânsito (TLS/SSL).</li>
            <li className="mb-2">Armazenamento em servidores seguros com controle de acesso restrito e auditável.</li>
            <li className="mb-2">Monitoramento contínuo contra incidentes de segurança.</li>
          </ul>
          <p className="mb-4">
            Os dados serão mantidos pelo tempo necessário para a conclusão das investigações e eventuais processos judiciais, 
            respeitando os prazos prescricionais legais.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Compartilhamento de Informações</h2>
          <p className="mb-4">
            Não comercializamos seus dados. O compartilhamento ocorre estritamente nas seguintes situações:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Com o <strong>Ministério Público</strong> e o <strong>Poder Judiciário</strong>, para fins de persecução penal.</li>
            <li className="mb-2">Com outras autoridades policiais e de inteligência, mediante necessidade investigativa justificada.</li>
            <li className="mb-2">
              <strong>Atenção:</strong> Dados de denúncias não são compartilhados com entidades esportivas privadas (clubes ou federações) 
              sem ordem judicial ou anonimização prévia.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Seus Direitos (e suas Limitações)</h2>
          <p className="mb-4">
            Você possui direitos sobre seus dados, como confirmação de existência de tratamento e correção de dados incompletos. 
            No entanto, é importante ressaltar:
          </p>
          <div className="bg-muted/20 p-4 rounded-lg border-l-4 border-primary">
            <p className="italic text-sm">
              Devido à natureza de investigação criminal e segurança pública, o exercício de direitos como <strong>exclusão de dados</strong> ou 
              <strong> acesso integral</strong> poderá ser limitado ou negado quando tal ação puder prejudicar as investigações ou expor 
              sigilo policial, conforme previsto na legislação processual penal e no <strong>Art. 4º da LGPD</strong>.
            </p>
          </div>
        </section>

        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-sm text-muted mb-4">
            Última atualização: 07 de dezembro de 2025
          </p>
          <Link href="/" className="text-primary hover:underline">
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}

