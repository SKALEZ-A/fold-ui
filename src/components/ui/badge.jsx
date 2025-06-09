import * as React from "react";

export function Badge({ children, variant = "default", className = "", ...props }) {
  const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default: "bg-primary text-primary-foreground",
    outline: "border border-primary text-primary bg-transparent",
  };
  return (
    <span className={`${base} ${variants[variant] || ""} ${className}`} {...props}>
      {children}
    </span>
  );
}
