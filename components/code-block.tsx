"use client";

import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useMounted } from "@/hooks/use-mounted";
import { useTheme } from "next-themes";

interface CodeBlockProps {
  content: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ content, className, language }: CodeBlockProps) {
  const { theme } = useTheme();
  const mounted = useMounted();

  const codeTheme = theme === "dark" ? oneLight : oneDark;

  if (!mounted) return null;

  return (
    <div className={className}>
      <SyntaxHighlighter
        language={language}
        style={codeTheme}
        customStyle={{
          fontSize: "14px",
          padding: "12px",
          margin: "0",
        }}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  );
}
