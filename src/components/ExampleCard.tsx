import React from "react";

interface ExampleCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function ExampleCard({ title, description, children }: ExampleCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6 border border-zinc-200 dark:border-zinc-800 max-w-md w-full">
      <h2 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">{title}</h2>
      <p className="text-zinc-700 dark:text-zinc-300 mb-4">{description}</p>
      {children}
    </div>
  );
}
