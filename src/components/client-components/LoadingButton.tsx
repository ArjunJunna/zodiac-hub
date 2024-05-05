import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonLoadingProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export function ButtonLoading({ children, ...props }: ButtonLoadingProps) {
  return (
    <Button disabled {...props}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {children || "Please wait"}
    </Button>
  );
}
