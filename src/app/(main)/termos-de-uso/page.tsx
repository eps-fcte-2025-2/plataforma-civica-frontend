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
          Seja bem-vindo ao <strong>Apita Cidadão</strong>. Esta plataforma é uma ferramenta oficial desenvolvida pela <strong>Polícia 
          Federal</strong> com o objetivo de promover a integridade no esporte brasileiro, combatendo fraudes e manipulações de resultados.
        </p>
        <p className="mb-6">
          A seguir, apresentamos os <strong>Termos de Uso e a Política de Privacidade</strong> que regem o acesso e a utilização dos nossos 
          serviços, elaborados em conformidade com a legislação brasileira vigente e os padrões internacionais de segurança da 
          informação e privacidade <strong>(ISO/IEC 27001 e ISO/IEC 27701)</strong>.
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Aceitação dos Termos</h2>
          <p className="mb-4">
           O acesso e a utilização da plataforma <strong>Apita Cidadão</strong>, seja por meio de aplicativo móvel ou interface web, implicam 
           na aceitação integral e irrestrita destes <strong>Termos de Uso</strong>.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              Ao utilizar a plataforma, o Usuário declara ser civilmente capaz e estar ciente das responsabilidades 
              legais decorrentes de suas ações no ambiente digital.
            </li>
            <li className="mb-2">
              Caso não concorde com quaisquer condições aqui estabelecidas, o Usuário deve abster-se de utilizar a plataforma imediatamente.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Finalidade e Tratamento de Dados (Conformidade ISO/IEC 27701)</h2>
          <p className="mb-4">
            A plataforma tem como finalidade exclusiva a coleta de informações e denúncias relacionadas a crimes contra a integridade esportiva.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              <strong>Coleta de Dados Pessoais:</strong> A plataforma poderá coletar dados pessoais (como nome, CPF, contato) necessários para a identificação do 
              denunciante, exceto nos casos em que a denúncia for expressamente anônima.
            </li>
            <li className="mb-2">
              <strong>Base Legal:</strong> O tratamento dos dados baseia-se no cumprimento de obrigação legal e no exercício de competências públicas 
              <strong> (Art. 7º e Art. 23 da LGPD)</strong>, 
              visando a segurança pública e a investigação criminal.
            </li>
            <li className="mb-2">
              <strong>Sigilo e Confidencialidade:</strong> A <strong>Polícia Federal</strong> compromete-se a manter o sigilo das informações e a identidade do denunciante, aplicando 
              controles de segurança rigorosos para proteger os dados contra acessos não autorizados, vazamentos ou incidentes de segurança.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Responsabilidades e Deveres do Usuário</h2>
          <p className="mb-4">
            O Usuário compromete-se a utilizar a plataforma de forma ética e legal, observando os seguintes deveres:
          </p>
          <ol className="list-disc pl-6 mb-4">
            <li className="mb-2">
              <strong>Veracidade das Informações:</strong> Fornecer informações verdadeiras, precisas e completas. O envio deliberado de informações 
              falsas configura crime de Denunciação Caluniosa <strong>(Art. 339 do Código Penal)</strong> ou Comunicação Falsa de Crime ou de Contravenção 
              <strong> (Art. 340 do Código Penal)</strong>, sujeitando o infrator às sanções penais cabíveis.
            </li>
            <li className="mb-2">
              <strong>Integridade do Sistema:</strong> Não utilizar mecanismos de software, scripts ou processos automatizados para coletar informações,
              comprometer a segurança, ou causar indisponibilidade na plataforma (ataques DDoS, injeção de código, etc.).
              plataforma.
            </li>
            <li className="mb-2">
              <strong>Finalidade Específica:</strong> Não utilizar a plataforma para fins difamatórios, vingança pessoal, trotes ou qualquer 
              propósito alheio à integridade do esporte.
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Limitação de Responsabilidade</h2>
          <p className="mb-4">
            O <strong>Apita Cidadão</strong> é um canal de recebimento de notícias de fatos, e não substitui os trâmites processuais 
            formais do Inquérito Policial em todas as suas fases.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2"><strong>Discricionariedade:</strong> A <strong>Polícia Federal</strong> reserva-se o direito de avaliar a pertinência, 
              materialidade e autoria das informações recebidas para decidir sobre a instauração ou não de procedimentos investigativos.</li>
            <li className="mb-2"><strong>Disponibilidade:</strong> Embora empreguemos as melhores práticas de TI, não garantimos que a plataforma estará 
              disponível ininterruptamente, podendo haver suspensões temporárias para manutenção ou por motivos de força maior, sem que 
              isso gere direito a indenização.</li>
            <li className="mb-2">
              <strong>Links de Terceiros:</strong> A plataforma não se responsabiliza pelo conteúdo ou práticas de privacidade de sites externos que possam 
              ser mencionados ou linkados.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Direitos do Titular dos Dados</h2>
          <p className="mb-4">
            Em conformidade com a <strong>LGPD</strong> e a estrutura da <strong>ISO/IEC 27701</strong>, o Usuário, enquanto titular de dados pessoais identificados, 
            possui direitos que podem ser exercidos mediante requisição oficial, tais como:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">Confirmação da existência de tratamento de dados.</li>
            <li className="mb-2">Acesso aos dados (respeitando-se o sigilo imprescindível às investigações policiais, conforme <strong>Art. 4º, 
              III da LGPD</strong>).</li>
            <li className="mb-2">Correção de dados incompletos, inexatos ou desatualizados.
            </li>
          </ul>
          <div className="bg-muted/20 p-4 rounded-lg border-l-4 border-primary">
            <strong>Nota:</strong> O exercício desses direitos pode ser limitado quando a manutenção dos dados for essencial 
            para a investigação criminal ou a segurança pública <strong>(Art. 4º, III da LGPD)</strong>.
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Propriedade Intelectual</h2>
          <p className="mb-4">
            Todo o conteúdo da plataforma, incluindo logotipos, design, textos, códigos-fonte e software, é de propriedade exclusiva 
            da <strong>Polícia Federal </strong> 
            ou da União, sendo vedada sua reprodução, modificação ou engenharia reversa sem autorização expressa.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Atualização dos Termos</h2>
          <p className="mb-4">
            A <strong>Polícia Federal</strong> reserva-se o direito de alterar estes <strong>Termos de Uso e Política de Privacidade</strong> a 
            qualquer momento, visando a melhoria 
            dos serviços ou a adequação a novas legislações.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">As alterações entrarão em vigor imediatamente após sua publicação na plataforma.</li>
            <li className="mb-2">Recomendamos a consulta periódica deste documento. O uso continuado do serviço após as modificações constitui 
              anuência tácita aos novos termos.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Foro e Legislação Aplicável</h2>
          <p className="mb-4">
            Estes Termos são regidos pelas leis da <strong>República Federativa do Brasil</strong>. Fica eleito o Foro da <strong>Justiça Federal </strong> 
            para dirimir quaisquer 
            controvérsias oriundas da utilização desta plataforma, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
          </p>
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

