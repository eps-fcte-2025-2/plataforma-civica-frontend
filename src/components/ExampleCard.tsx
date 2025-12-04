import React from "react";

interface ExampleCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function ExampleCard({ title, description, children }: ExampleCardProps) {
  return (
    <div 
      className="bg-card-bg rounded-xl shadow-md p-6 border border-border max-w-md w-full"
      data-testid="example-card"
    >
      <h2 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400" data-testid="card-title">{title}</h2>
      <p className="text-zinc-700 dark:text-zinc-300 mb-4" data-testid="card-description">{description}</p>
      {children}
    </div>
  );
}
