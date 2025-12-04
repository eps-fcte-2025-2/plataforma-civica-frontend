// app/acessibilidade/page.tsx

export default function PaginaAcessibilidade() {

  return (
    <div className="flex flex-col gap-8">
      
      {/* ===== 1. CABEÇALHO ===== */}
      <div className="flex justify-between items-center">
        {/* Título da Página (Ícone placeholder) */}
        <div className="flex items-center gap-3">
          <span className="bg-accent text-primary p-3 rounded-lg">
            {/* Placeholder para o ícone de 'Acessibilidade' */}
            <div className="w-6 h-6 bg-primary rounded"></div> 
          </span>
          <h1 className="text-3xl font-bold text-foreground">Acessibilidade</h1>
        </div>
      </div>

      {/* ===== 2. CONTEÚDO ===== */}
      <div className="bg-card-bg p-6 rounded-lg shadow-sm border border-border min-h-[400px]">
        <p className="text-muted">
            Página de Acessibilidade
        </p>
      </div>

    </div>
  );
}

