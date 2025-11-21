// app/acessibilidade/page.tsx

export default function PerguntasFrequentesAcessibilidade() {

  return (
    <div className="flex flex-col gap-8">
      
      {/* ===== 1. CABEÇALHO ===== */}
      <div className="flex justify-between items-center">
        {/* Título da Página (Ícone placeholder) */}
        <div className="flex items-center gap-3">
          <span className="bg-red-100 text-red-600 p-3 rounded-lg">
            {/* Placeholder para o ícone de 'Acessibilidade' */}
            <div className="w-6 h-6 bg-red-300 rounded"></div> 
          </span>
          <h1 className="text-3xl font-bold text-gray-800">Perguntas Frequentes</h1>
        </div>
      </div>

      {/* ===== 2. CONTEÚDO ===== */}
      <div className="bg-white p-6 rounded-lg shadow-sm border min-h-[400px]">
        <p className="text-gray-600">
            Página de Perguntas Frequentes
        </p>
      </div>

    </div>
  );
}