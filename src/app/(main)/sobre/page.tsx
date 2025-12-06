// app/sobre/page.tsx

export default function PaginaSobre() {

  return (
    
    <div className="flex flex-col gap-10">

      {/* ===== 1. CABEÇALHO ===== */}
      <div className="flex justify-between items-center">
        {/* Título da Página (Ícone placeholder) */}
        <div className="flex items-center gap-3">
          <span className="bg-red-100 text-red-600 p-3 rounded-lg">
            {/* Placeholder para o ícone de 'Sobre' */}
            <div className="w-6 h-6 bg-red-300 rounded"></div> 
          </span>
          <h1 className="text-3xl font-bold text-foreground">Sobre</h1>
        </div>
        
        {/* Ícones da Direita (Placeholders) */}
        <div className="hidden md:flex items-center gap-5 text-gray-500">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div> {/* Telefone */}
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div> {/* Sino */}
          <div className="w-9 h-9 bg-gray-300 rounded-full"></div> {/* Avatar */}
        </div>
      </div>
      
      {/* ===== 2. TÍTULO PRINCIPAL ===== */}
      <h2 className="text-4xl font-bold text-foreground">APITA CIDADÃO</h2>

      {/* ===== 3. CARD "VOCÊ SABIA?" ===== */}
      <div className="bg-card-bg rounded-lg shadow-sm border-l-4 border-yellow-500 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          {/* Imagem Placeholder */}
          <div className="w-full md:w-1/3 p-6 flex justify-center">
             <div className="w-48 h-48 bg-gray-200 rounded-lg"></div>
          </div>
          {/* Textos */}
          <div className="w-full md:w-2/3 p-6">
            <h3 className="text-xl font-bold text-foreground mb-3">Você sabia?</h3>
            <div className="text-muted space-y-3">
              <p>
                O <span className="font-bold">Apita Cidadão</span> é uma iniciativa da Polícia Federal, desenvolvida em parceria com a Universidade de Brasília (UnB), unindo forças entre o setor público e a academia para o avanço da inovação tecnológica e da integridade esportiva.
              </p>
              <p>
                O projeto nasceu da necessidade de monitorar, prevenir e investigar manipulações de resultados esportivos, utilizando tecnologias modernas como inteligência artificial.
              </p>
              <p>
                Essa união reforça o papel da tecnologia como instrumento de cidadania, colocando o conhecimento acadêmico a serviço da sociedade.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 4. CARD "NOSSA MISSÃO" ===== */}
      <div className="bg-card-bg rounded-lg shadow-sm border-l-4 border-blue-500 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          {/* Textos */}
          <div className="w-full md:w-2/3 p-6">
            <h3 className="text-xl font-bold text-foreground mb-3">Nossa missão</h3>
            <div className="text-muted space-y-3">
              <p>
                Nossa missão é promover a <span className="font-bold">transparência, segurança e ética</span> no esporte, criando ferramentas que auxiliem na detecção de fraudes e no fortalecimento das boas práticas.
              </p>
              <p>
                Acreditamos na colaboração entre instituições, estudantes e sociedade para desenvolver soluções tecnológicas que protejam a credibilidade das competições e estimulem o jogo limpo.
              </p>
            </div>
          </div>
          {/* Imagem Placeholder */}
          <div className="w-full md:w-1/3 p-6 flex justify-center">
             <div className="w-48 h-48 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* ===== 5. CARD "NOSSOS VALORES" ===== */}
      <div className="bg-card-bg rounded-lg shadow-sm border-l-4 border-yellow-500 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          {/* Imagem Placeholder */}
          <div className="w-full md:w-1/3 p-6 flex justify-center">
             <div className="w-48 h-48 bg-gray-200 rounded-lg"></div>
          </div>
          {/* Textos */}
          <div className="w-full md:w-2/3 p-6">
            <h3 className="text-xl font-bold text-foreground mb-3">Nossos valores</h3>
            <div className="text-muted space-y-3">
              <p>
                Nossos valores se baseiam na <span className="font-bold">integridade</span>, que orienta cada decisão e ação do projeto; na <span className="font-bold">cooperação</span>, que une diferentes instituições e pessoas em torno de um mesmo propósito; na <span className="font-bold">inovação</span>, que impulsiona o uso de tecnologias de ponta para promover soluções eficazes e transparentes; na <span className="font-bold">inclusão</span>, garantindo que todas as pessoas, independentemente de suas condições, possam acessar e participar; e no <span className="font-bold">compromisso público</span>, que reafirma nossa responsabilidade em desenvolver ferramentas voltadas ao bem comum e ao fortalecimento da confiança social.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

