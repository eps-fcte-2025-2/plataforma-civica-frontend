import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center h-16">
  <div className="flex items-center space-x-3">
    <Link href="/">
      <Image
        src="/logo.svg"
        alt="Logo Apita Cidadão"
        width={200}
        height={40}
        className="h-12 w-auto cursor-pointer"
        priority
      />
    </Link>
  </div>
  <nav className="hidden md:flex space-x-6 font-poppins">
    <Link href="/ajuda" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
      <Image
        src="/icons/ajuda.svg"
        alt="Ajuda"
        width={20}
        height={20}
      />
      Ajuda
    </Link>
    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
      <Image
        src="/icons/contraste.svg"
        alt="Alto contraste"
        width={20}
        height={20}
      />
      Alto contraste
    </button>
  </nav>
</div>

        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl  text-blue-600 mb-6 font-[Nunito]">
            Canal de Denúncias de<br />
            Manipulação Esportiva
          </h1>
          
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center">
              <Image
                src="/icons/seguranca_24.svg"
                alt="Segurança"
                width={58}
                height={58}
              />
            </div>
          </div>


          <p className="text-gray-600 mb-2 text-sm sm:text-base max-w-2xl mx-auto font-[Inter]">
            Este é um canal seguro e anônimo para denunciar fraudes e manipulação de resultados
            no esporte brasileiro. <span className="text-blue-600 font-medium ">Sua identidade será preservada.</span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm text-gray-500 mb-8 font-[Roboto_Slab]">
            <div className="flex items-center gap-2">
              <span className="text-red-500">
                <Image
                src="/icons/anonimato.svg"
                alt="anonimato"
                width={20}
                height={20}
                />
              </span>
              <span>100% Anônimo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">
                <Image
                src="/icons/seguro.svg"
                alt="seguro"
                width={20}
                height={20}
                />
              </span>
              <span>Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">
                <Image
                src="/icons/24por7.svg"
                alt="24/7"
                width={20}
                height={20}
                />
              </span>
              <span>24/7</span>
            </div>
          </div>

          <Link 
            href="/denuncia" 
            className="inline-flex items-center gap-x-2 justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-lg font-[Roboto_Slab]"
          >
            <Image
                src="/icons/fazer_denuncia_24.svg"
                alt="denuncia"
                width={20}
                height={20}
                /> 
            
             <span>Fazer uma Denúncia</span>
          </Link>

          <p className="text-xs text-gray-400 mt-3 font-[Roboto_Slab]">
            Processo rápido e confidencial • Sem necessidade de cadastro
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 font-[Roboto_Slab]">
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-xl">
                <Image
                src="/icons/anonimato.svg"
                alt="anonimato"
                width={20}
                height={20}
                /> 
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Anonimato Garantido</h3>
            <p className="text-sm text-gray-600">
              Não coletamos informações pessoais. Sua denúncia é processada de forma completamente anônima.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-xl">
                <Image
                src="/icons/normasLegislativas.svg"
                alt="normasLegislativas"
                width={20}
                height={20}
                /> 

              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Respaldo Legal</h3>
            <p className="text-sm text-gray-600">
              Baseado na Lei Geral do Esporte e regulamentações federais para combate à corrupção esportiva.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-xl">
                <Image
                src="/icons/investigacao.svg"
                alt="investigacao"
                width={20}
                height={20}
                /> 

              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Investigação Rigorosa</h3>
            <p className="text-sm text-gray-600">
              Todas as denúncias são analisadas por especialistas da Polícia Federal e órgãos competentes.
            </p>
          </div>
        </div>

        {/* Types of Reports */}
        <div className="mb-16 font-[Roboto_Slab]">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8 ">Tipos de Denúncias</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-l-4 border-l-blue-500">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 text-sm">
                    <Image
                    src="/icons/manipulacao.svg"
                    alt="manipulacao"
                    width={20}
                    height={20}
                    /> 

                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Manipulação de Resultados</h3>
                  <p className="text-sm text-gray-600">
                    Alteração artificial de resultados, combinação de jogos, &quot;esquemas&quot; entre atletas ou equipes.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-l-4 border-l-green-500">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600 text-sm">
                    <Image
                    src="/icons/corrupcao.svg"
                    alt="corrupcao"
                    width={20}
                    height={20}
                    /> 

                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Corrupção e Suborno</h3>
                  <p className="text-sm text-gray-600">
                    Pagamentos indevidos, propinas, benefícios ilícitos a árbitros, atletas ou dirigentes.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-l-4 border-l-yellow-500">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-yellow-600 text-sm">
                    <Image
                      src="/icons/apostasIrregulares.svg"
                      alt="apostasIrregulares"
                      width={20}
                      height={20}
                    /> 

                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Apostas Irregulares</h3>
                  <p className="text-sm text-gray-600">
                    Uso de informações privilegiadas, apostas por atletas ou pessoas próximas às competições.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-l-4 border-l-red-500">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-600 text-sm">
                    <Image
                      src="/icons/irregularidades.svg"
                      alt="irregularidades"
                      width={20}
                      height={20}
                    />
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Outras Irregularidades</h3>
                  <p className="text-sm text-gray-600">
                    Doping, falsificação de documentos, irregularidades administrativas em competições.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
