import React, { useState } from "react";
import { CreateReportResponse } from "@/types/api";
import Link from "next/link";

interface SuccessScreenProps {
  response: CreateReportResponse;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ response }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyProtocol = async () => {
    try {
      await navigator.clipboard.writeText(response?.id || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar protocolo:", err);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-foreground mb-2 text-2xl font-bold">Denúncia Enviada com Sucesso!</h2>
        <p className="text-muted mb-6">
          Agradecemos sua colaboração com a integridade do esporte brasileiro. Sua denúncia foi
          recebida e será encaminhada para análise pela equipe da Polícia Federal.
        </p>
      </div>

      {/* Seção Importante */}
      <div className="mb-6 rounded-lg bg-accent p-6">
        <div className="mb-4 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary">
              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-primary">Importante</h3>
          </div>
          <p className="mb-4 text-foreground">
            Anote o seu protocolo de acompanhamento. Ele é a única forma de verificar o andamento da
            sua denúncia no futuro.
          </p>
        </div>
        <div className="mt-4 rounded-lg border border-border bg-card-bg">
          <p className="mb-2 text-center text-sm text-foreground">Protocolo de Acompanhamento</p>
          <div className="flex items-center justify-center gap-3">
            <div className="px-4 py-3">
              <p className="text-foreground font-mono text-2xl font-bold">{response?.id}</p>
            </div>
            <button
              onClick={handleCopyProtocol}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>
        </div>
      </div>

      {/* Seção Próximos Passos */}
      <div className="mb-6 rounded-lg bg-accent p-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center">
            <svg
              className="h-5 w-5 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-foreground mb-3 text-lg font-bold">Próximos Passos</h3>
            <ul className="text-foreground space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-muted">•</span>
                <span>Sua denúncia será analisada pela equipe especializada</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-muted">•</span>
                <span>O acompanhamento pode ser feito através do protocolo fornecido</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-muted">•</span>
                <span>Mantenha o protocolo em local seguro para futuras consultas</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Botão Voltar ao Início */}
      <div className="text-center">
        <Link
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-bold text-white transition-colors hover:bg-primary-hover"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
};

export default SuccessScreen;
