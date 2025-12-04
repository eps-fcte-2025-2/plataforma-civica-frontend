import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({ children, variant = "primary", ...props }: ButtonProps) {
  const base = "px-4 py-2 rounded font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-primary text-black hover:bg-primary-hover focus:ring-primary",
    secondary: "bg-accent text-foreground hover:bg-primary focus:ring-accent",
  };
  return (
    <button 
      className={`${base} ${variants[variant]}`} 
      data-testid={`button-${variant}`}
      {...props}
    >
      {children}
    </button>
  );
}
