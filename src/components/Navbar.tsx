import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-zinc-950/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-blue-600 dark:text-blue-400">Plataforma Cívica</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-zinc-700 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400">Início</Link>
          <Link href="/exemplos" className="text-zinc-700 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400">Exemplos</Link>
          <Link href="/dashboard" className="text-zinc-700 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}


