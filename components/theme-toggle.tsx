"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { cn } from "@/lib/utils";

interface ThemeTogglePrpops extends React.ComponentProps<typeof Button> {}

export function ThemeToggle({ className, ...props }: ThemeTogglePrpops) {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <TooltipWrapper label="Toggle theme" asChild>
      <Button
        className={cn("cursor-pointer", className)}
        onClick={toggleTheme}
        {...props}
      >
        {resolvedTheme === "dark" ? <Moon /> : <Sun />}
      </Button>
    </TooltipWrapper>
  );
}
