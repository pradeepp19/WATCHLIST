import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
}

export function Card({
    children
}:CardProps) {
    return(
            <div className = "bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
            {children}
        </div>
    );
}