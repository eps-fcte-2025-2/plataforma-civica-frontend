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
          O Apita Cidadão reafirma seu compromisso com a transparência e com a proteção de dados pessoais. 
          Esta Política de Privacidade descreve como as informações são tratadas em conformidade com a Lei 
          Geral de Proteção de Dados (Lei nº 13.709/2018), o Marco Civil da Internet (Lei nº 12.965/2014) e os 
          padrões internacionais de privacidade e segurança (ISO/IEC 27701 e ISO/IEC 27001). 
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Controlador e Encarregado (DPO)</h2>
          <p className="mb-4">
           O Ministério do Esporte é o Controlador dos dados pessoais coletados pela plataforma. 
          </p>
          <p className="mb-4">
            O Usuário poderá contatar o Encarregado pelo Tratamento de Dados Pessoais (DPO) por meio dos canais oficiais 
            disponibilizados no endereço eletrônico gov.br, conforme previsto nos arts. 41 e 23 da LGPD.  
          </p>  
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Dados Coletados e Finalidade</h2>
          <p className="mb-4">
            A coleta de dados tem finalidade exclusiva de subsidiar procedimentos investigativos e ações de 
            prevenção e repressão a crimes que atentem contra a integridade esportiva.
          </p>
          <p className="mb-4">
            Os dados coletados podem incluir:
          </p>
          <h1 className="text-1xl font-semibold mb-4 text-foreground"> a) Dados de Identificação (quando a denúncia não for anônima)</h1>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              Nome completo
            </li>
            <li className="mb-2">
              CPF
            </li>
            <li className="mb-2">
              Telefone
            </li>
            <li className="mb-2">
              E-mail
            </li>
          </ul>
          <h1 className="text-1xl font-semibold mb-4 text-foreground"> b) Conteúdo da Denúncia</h1>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              Relatos, documentos, fotografias, vídeos, áudios e demais evidências fornecidas voluntariamente pelo Usuário.
            </li>
          </ul>
          <h1 className="text-1xl font-semibold mb-4 text-foreground"> c) Dados Técnicos e de Navegação</h1>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              Endereço IP
            </li>
            <li className="mb-2">
              User-Agent
            </li>
            <li className="mb-2">
              Data e hora de acesso
            </li>
          </ul>
          <p className="mb-4">
            Tais informações são registradas conforme obrigação do Art. 15 do Marco Civil da Internet, para fins 
            de preservação de registros de acesso a aplicações.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Base Legal para o Tratamento</h2>
          <p className="mb-4">
            O tratamento de dados pessoais observa as seguintes bases jurídicas: 
          </p>
          <h1 className="text-1xl font-semibold mb-4 text-foreground"> a) Cumprimento de obrigação legal ou regulatória</h1>
          <p className="mb-4">
            (Art. 7º, II da LGPD)
          </p>   
          <h1 className="text-1xl font-semibold mb-4 text-foreground"> b) Execução de políticas públicas</h1>        
            <p className="mb-4">
              previstas em leis e regulamentos aplicáveis (Art. 7º, III e Art. 23 da LGPD)
            </p>
          <h1 className="text-1xl font-semibold mb-4 text-foreground"> c) Atividades de segurança pública e investigação penal</h1>        
            <p className="mb-4">
               Nos termos do Art. 4º, III da LGPD, o tratamento de dados para fins de:
            </p>  
            <ul className="list-disc ml-6 mt-2">
              <li>Segurança pública;</li>
              <li>Investigação;</li>
              <li>Repressão de infrações penais.</li>
            </ul>
            <p className="mb-4">
               segue legislação específica, aplicável às autoridades de persecução penal, preservando-se as garantias fundamentais.
            </p>               
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Proteção e Armazenamento</h2>
          <p className="mb-4">
            O Ministério do Esporte adota medidas técnicas e administrativas compatíveis com as normas ISO/IEC 27001 e 27701, incluindo:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Criptografia para proteção dos dados em trânsito (TLS/SSL);</li>
            <li className="mb-2">Servidores protegidos, com controle de acesso restrito, segregação de funções e trilhas de auditoria;</li>
            <li className="mb-2">Monitoramento contínuo para prevenção, detecção e resposta a incidentes de segurança;</li>
            <li className="mb-2">Gestão do ciclo de vida da informação adequada às atividades investigativas.</li>
          </ul>
          <p className="mb-4">
            Os dados serão armazenados pelo período necessário ao cumprimento de suas finalidades, incluindo eventuais procedimentos administrativos, 
            investigativos, 
            sancionatórios ou judiciais — observados os prazos prescricionais e normas de guarda aplicáveis à persecução penal.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Compartilhamento de Informações</h2>
          <p className="mb-4">
            O Apita Cidadão não comercializa dados pessoais.
          </p>
          <p className="mb-4">
            O compartilhamento poderá ocorrer apenas nas hipóteses estritamente necessárias e autorizadas em lei:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Ministério Público e Poder Judiciário, para fins de persecução penal;</li>
            <li className="mb-2">Órgãos policiais, de inteligência ou de segurança pública, mediante justificativa legal e necessidade investigativa;</li>
            <li className="mb-2">Outras autoridades competentes, quando houver previsão normativa ou ordem judicial.</li>
          </ul>
          <div className="bg-muted/20 p-4 rounded-lg border-l-4 border-primary">
            <strong>Importante:</strong> Dados de denúncias não são repassados a entidades esportivas privadas, clubes ou federações 
            sem ordem judicial ou sem anonimização 
            prévia, resguardando-se a integridade da investigação e o sigilo do denunciante.
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Direitos do Titular (e suas Limitações Legais)</h2>
          <p className="mb-4">
            O titular possui direitos previstos na LGPD, tais como:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">confirmação da existência de tratamento;</li>
            <li className="mb-2">correção de dados incompletos, inexatos ou desatualizados.</li>
          </ul>
          <p className="mb-4">
            Contudo, em razão da natureza jurídica do tratamento (segurança pública e investigação penal), determinados 
            direitos podem sofrer limitações, de acordo com o Art. 4º da LGPD, quando seu exercício puder:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">causar prejuízo à investigação;</li>
            <li className="mb-2">comprometer medidas sigilosas;</li>
            <li className="mb-2">afetar a prevenção ou repressão de ilícitos penais;</li>
            <li className="mb-2">violar restrições previstas no ordenamento jurídico.</li>
          </ul>
          <p className="mb-4">
            Nesses casos, o Ministério do Esporte poderá restringir ou indeferir solicitações, mediante fundamentação legal.
          </p>
        </section>

        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-sm text-muted mb-4">
            Última atualização: 09 de dezembro de 2025
          </p>
          <Link href="/" className="text-primary hover:underline">
            Voltar ao início
          </Link>
        </div>
      </div>
    </main>
  );
}

