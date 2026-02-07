"use client";

import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useMounted } from "@/hooks/use-mounted";
import { useTheme } from "next-themes";
import React from "react";
import { cn } from "@/lib/utils";

interface CodeBlockWithCopyProps {
  content: string;
  language: string;
  title?: string;
  className?: string;
}

export function CodeBlockWithCopy({
  content,
  className,
  language,
  title,
}: CodeBlockWithCopyProps) {
  const { theme } = useTheme();
  const [copied, setCopied] = React.useState(false);

  const mounted = useMounted();

  const codeTheme = theme === "dark" ? oneLight : oneDark;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <div
      className={cn(
        className,
        "relative rounded-[18px] overflow-hidden border"
      )}
    >
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-4 py-2 backdrop-blur-sm text-xs font-medium text-background z-10 border-b border-border/20">
        <span>{title || language}</span>

        <button
          onClick={handleCopy}
          className="text-xs px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 transition"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      <div className={className}>
        <SyntaxHighlighter
          language={language}
          style={codeTheme}
          customStyle={{
            borderRadius: "18px",
            padding: "48px 12px 12px 12px",
            fontSize: "14px",
            margin: "0",
          }}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

interface CodeBlockProps {
  content: string;
  language: string;
  className?: string;
}

export function CodeBlock({ content, className, language }: CodeBlockProps) {
  const { theme } = useTheme();
  const mounted = useMounted();

  const codeTheme = theme === "dark" ? oneLight : oneDark;

  if (!mounted) return null;

  return (
    <div
      className={cn(
        className,
        "relative rounded-[18px] overflow-hidden border"
      )}
    >
      <div className={className}>
        <SyntaxHighlighter
          language={language}
          style={codeTheme}
          customStyle={{
            borderRadius: "18px",
            padding: "12px",
            fontSize: "14px",
            margin: "0",
          }}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
