import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center px-6 py-24">
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Bem-vindo à Plataforma Cívica</h1>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300">Esta é a página inicial pública. Utilize o menu para navegar pelas áreas internas.</p>
        <Link href="/denuncia" className="inline-flex items-center justify-center mt-6 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors">Ir para o Dashboard</Link>
      </div>
    </main>
  );
}
