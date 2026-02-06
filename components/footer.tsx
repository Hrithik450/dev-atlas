"use client";

import Link from "next/link";
import { useMounted } from "@/hooks/use-mounted";
import { Mail } from "lucide-react";

export function Footer() {
  const isMounted = useMounted();
  if (!isMounted) return null;

  return (
    <footer className="bg-background/95 w-full border-t backdrop-blur-sm">
      <div className="container mx-auto flex flex-col gap-10 px-4 py-10 md:px-6 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-lg"
            >
              <span>DevAtlas</span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Practical, production-ready documentation for developers. Learn
              systems, backend engineering, and modern tooling with clarity and
              real-world context.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide">Connect</h4>

            <div className="flex gap-4">
              <a
                href="mailto:mhrithik450@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="size-5" />
                <span className="text-sm">mhrithik450@gmail.com</span>
              </a>
            </div>

            <p className="text-sm text-muted-foreground">
              Built for engineers who care about implementation, structure, and
              easy.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DevAtlas. All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground">
            Crafted with love ❤️ by Hruthik M.
          </p>
        </div>
      </div>
    </footer>
  );
}
