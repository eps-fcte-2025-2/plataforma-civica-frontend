import React from "react";

export function ExampleSelect() {
  return (
    <div className="relative w-full max-w-xs">
      <select
        className="block w-full px-5 py-3 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-200 shadow-md text-gray-700 bg-white appearance-none transition-all duration-200 font-semibold"
        defaultValue=""
      >
        <option value="" disabled>
          Selecione uma opção
        </option>
        <option value="opcao1">Opção 1</option>
        <option value="opcao2">Opção 2</option>
        <option value="opcao3">Opção 3</option>
      </select>
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </span>
    </div>
  );
}
