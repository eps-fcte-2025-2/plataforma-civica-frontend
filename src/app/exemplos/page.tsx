"use client";
import Button from "@/components/Button";
import ExampleCard from "@/components/ExampleCard";

export default function Exemplos() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-zinc-900 dark:to-zinc-800 p-8">
      <ExampleCard title="Botão Primário" description="Este é um botão estilizado com Tailwind.">
        <Button onClick={() => alert('Você clicou!')}>Clique aqui</Button>
      </ExampleCard>
      <ExampleCard title="Botão Secundário" description="Outro exemplo de variante de botão.">
        <Button variant="secondary">Secundário</Button>
      </ExampleCard>
    </div>
  );
}
