import * as React from "react";

export const Button = React.forwardRef(({ className = "", variant = "default", size = "md", ...props }, ref) => {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  };
  const sizes = {
    sm: "h-9 px-4 py-2 text-sm",
    md: "h-10 px-6 py-2 text-base",
    lg: "h-12 px-8 py-3 text-lg",
  };
  return (
    <button ref={ref} className={`${base} ${variants[variant] || ""} ${sizes[size] || ""} ${className}`} {...props} />
  );
});
Button.displayName = "Button";
