import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Termos de Uso e Política de Privacidade',
};

export default function TermosDeUsoPage() {
  return (
    <main className="container mx-auto py-12 px-4 font-[Poppins]">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Termos de Uso e Política de Privacidade</h1>

      <div className="prose prose-lg max-w-none text-muted">
        <p className="mb-6">
          Seja bem-vindo ao <strong>Apita Cidadão</strong>, plataforma de cidadania digital desenvolvida pela Universidade de 
          Brasília, a pedido do Grupo Interministerial instituído pela Portaria MESP/MF/MJSP n. º 1, de 15 de agosto de 2025, publicado no 
          Diário Oficial da União para combater a Manipulação de Resultados Esportivos. 
        </p>
        <p className="mb-6">
          Os presentes Termos de Uso e Política de Privacidade regulam o acesso e a utilização desta plataforma, em conformidade 
          com a legislação brasileira aplicável — incluindo a LGPD (Lei nº 13.709/2018) — e com os padrões internacionais de 
          segurança da informação e privacidade (ISO/IEC 27001 e ISO/IEC 27701).
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Aceitação dos Termos</h2>
          <p className="mb-4">
           O acesso ou uso da plataforma, seja via aplicativo móvel ou interface web, implica a aceitação integral destes Termos.
          </p>
          <p className="mb-4">
           Ao utilizar o serviço, o Usuário declara:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              ser civilmente capaz;
            </li>
            <li className="mb-2">
              estar ciente de que suas ações no ambiente digital podem gerar responsabilidades legais;
            </li>
            <li className="mb-2">
              concordar com todas as disposições deste documento.
            </li>
          </ul>
          <p className="mb-4">
           Caso não concorde com os termos, o Usuário deve cessar imediatamente o uso.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Finalidade e Tratamento de Dados (Conformidade ISO/IEC 27701)</h2>
          <p className="mb-4">
            A plataforma tem por finalidade exclusiva receber informações e denúncias relacionadas a crimes contra a integridade esportiva.</p>
          <h1 className="text-1xl font-semibold mb-4 text-foreground"> Coleta de Dados Pessoais</h1>
          <p className="mb-4">
             A coleta poderá incluir dados pessoais (como nome, CPF e meios de contato) 
             quando necessários para identificar o denunciante, <strong><u>exceto nos casos em que a denúncia for realizada anonimamente.</u></strong>
          </p>
          <h1 className="text-1xl font-semibold mb-4 text-foreground"> Base Legal</h1>
          <p className="mb-4">
             O tratamento dos dados ocorre com fundamento em finalidades de segurança pública, 
              persecução penal e investigação criminal, hipóteses previstas no Art. 4º, III da LGPD, sujeitas a regras próprias.
              <strong> (Art. 7º e Art. 23 da LGPD)</strong>, 
              visando a segurança pública e a investigação criminal.
          </p>
          <h1 className="text-1xl font-semibold mb-4 text-foreground"> Sigilo e Confidencialidade</h1>
          <p className="mb-4">
             O Gestor do aplicativo compromete-se a:
          </p>
            <ul className="list-disc ml-6 mt-2">
              <li>manter o sigilo das informações e a identidade do denunciante;</li>
              <li>aplicar controles de segurança compatíveis com as normas ISO/IEC 27001 e 27701;</li>
              <li>adotar medidas técnicas e administrativas para prevenir acessos indevidos, vazamentos, adulterações ou incidentes de segurança.</li>
            </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Responsabilidades e Deveres do Usuário</h2>
          <p className="mb-4">
            O Usuário compromete-se a utilizar a plataforma de forma ética, responsável e exclusivamente para seus fins legais.
          </p>
          <h1 className="text-1xl font-semibold mb-4 text-foreground"> Veracidade das Informações</h1>
          <p className="mb-4">
            O fornecimento de dados falsos configura crime, podendo caracterizar:
          </p>
          <ol className="list-disc pl-6 mb-4">
            <li className="mb-2">
              Denunciação Caluniosa (Art. 339 do CP);
            </li>
            <li className="mb-2">
              Comunicação Falsa de Crime ou Contravenção (Art. 340 do CP).
            </li>
          </ol>
          <h1 className="text-1xl font-semibold mb-4 text-foreground"> Veracidade das Informações</h1>
          <p className="mb-4">
            É vedado:
          </p>
          <ol className="list-disc pl-6 mb-4">
            <li className="mb-2">
              utilizar scripts, bots, ferramentas automatizadas ou técnicas que comprometam segurança, estabilidade ou 
              indisponibilidade do serviço (ex.: DDoS, injeção de código, exploração de vulnerabilidades);
            </li>
            <li className="mb-2">
              tentar obter acesso não autorizado a sistemas internos ou bases de dados.
            </li>
          </ol>
          <h1 className="text-1xl font-semibold mb-4 text-foreground"> Finalidade Específica</h1>
          <p className="mb-4">
            O Usuário não poderá empregar a plataforma para:
          </p>
          <ol className="list-disc pl-6 mb-4">
            <li className="mb-2">
              fins difamatórios, vingança pessoal ou trotes;
            </li>
            <li className="mb-2">
              objetivos alheios à integridade esportiva ou à segurança pública.
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Limitação de Responsabilidade</h2>
          <p className="mb-4">
            O Apita Cidadão é um canal de comunicação de fatos, não substituindo procedimentos formais de investigação ou persecução penal. 
          </p>
          <h1 className="text-1xl font-semibold mb-4 text-foreground"> Discricionariedade Institucional</h1>
          <p className="mb-4">
            A Polícia Judiciária poderá avaliar a pertinência, materialidade e autoria das informações recebidas, bem como 
            decidir pela instauração ou não de procedimentos investigativos.         
          </p>
          <h1 className="text-1xl font-semibold mb-4 text-foreground"> Disponibilidade do Serviço</h1>
          <p className="mb-4">
            Embora sejam aplicadas boas práticas de TI, o Gestor do aplicativo não garante disponibilidade ininterrupta, 
            podendo haver indisponibilidades decorrentes de manutenção, atualização, incidentes ou força maior. Tais eventos 
            não geram direito à indenização.   
          </p>
          
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Direitos do Titular dos Dados</h2>
          <p className="mb-4">
            Nos termos da LGPD, e respeitadas as exceções legais aplicáveis às atividades de segurança pública e 
            investigação criminal (Art. 4º, III), o titular poderá solicitar:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">confirmação da existência de tratamento;</li>
            <li className="mb-2">acesso aos dados pessoais tratados (observados os limites de sigilo indispensáveis às investigações);</li>
            <li className="mb-2">correção de dados incompletos, inexatos ou desatualizados.            </li>
          </ul>
          <div className="bg-muted/20 p-4 rounded-lg border-l-4 border-primary">
            <strong>Observação:</strong> determinados direitos podem ser limitados quando a manutenção do dado for imprescindível para fins 
            de segurança pública, persecução penal ou investigação criminal, conforme previsto na legislação.
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Propriedade Intelectual</h2>
          <p className="mb-4">
           Todo o conteúdo da plataforma — textos, logos, design, códigos-fonte, interfaces, algoritmos e demais elementos — 
           é de propriedade da União, sendo proibida sua reprodução, modificação, engenharia reversa ou qualquer utilização 
           sem autorização expressa. 
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Atualização dos Termos</h2>
          <p className="mb-4">
            O Gestor do aplicativo poderá atualizar estes Termos a qualquer momento, em razão de: 
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">aprimoramento dos serviços; </li>
            <li className="mb-2">atualização tecnológica;  </li>
            <li className="mb-2">alterações legislativas ou regulatórias. </li>
          </ul>
            As alterações terão efeito imediato após publicação. O uso continuado da plataforma implica concordância com as versões atualizadas. 
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Foro e Legislação Aplicável</h2>
          <p className="mb-4">
            Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o
            <strong> Foro da Justiça Federal</strong> para dirimir eventuais controvérsias, com renúncia 
            expressa de qualquer outro foro, por mais privilegiado que seja.
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

