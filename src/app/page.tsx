
'use client';

import Image from "next/image";
import Button from "@/components/ui/Button";
import ExampleCard from "@/components/ExampleCard";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center gap-8 p-8 sm:p-20">
      <ExampleCard title="Bem-vindo!" description="Este é um exemplo de card reutilizável.">
        <Button onClick={() => alert('Você clicou no botão principal!')}>Botão principal</Button>
      </ExampleCard>
      <ExampleCard title="Outro exemplo" description="Você pode criar quantos cards quiser.">
        <Button variant="secondary">Botão secundário</Button>
      </ExampleCard>
    </div>
  );
}
