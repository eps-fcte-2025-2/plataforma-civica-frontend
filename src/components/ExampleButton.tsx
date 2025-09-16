import React from "react";

export function ExampleButton() {
  return (
    <button
      className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:ring-offset-2 scale-100 hover:scale-105"
    >
      <span className="inline-flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        Botão Exemplo
      </span>
    </button>
  );
}
