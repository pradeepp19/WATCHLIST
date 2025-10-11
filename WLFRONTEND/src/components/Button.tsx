import type { ReactElement } from "react";

interface ButtonProps {
    variant?: "primary" | "secondary";
    text:string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantClasses = {
    primary: "bg-purple-800 text-white cursor-pointer hover:bg-purple-900",
    secondary:"bg-purple-200 text-white cursor-pointer  hover:bg-purple-300", 
};

const baseStyles =
  "px-6 py-4 min-w-[150px] rounded-sm font-medium flex items-center justify-center transition-colors";

export function Button({
    variant = "primary",
    text,
    startIcon,
    onClick,
    fullWidth,
    loading
}: ButtonProps) {
    return (
        <button 
            type="button"
            onClick={onClick}
            disabled = {loading}
            className={`
                 ${baseStyles}
                 ${variantClasses[variant]}
                 ${fullWidth ? "w-full" : "w-auto"}
                 ${loading ? "opacity-50 cursor-not-allowed" : ""}
                `}
    >
      {startIcon && <span className="pr-2">{startIcon}</span>}
      {loading ? "Loading..." : text}
    </button>
    );
}