"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useMounted } from "@/hooks/use-mounted";
import { SystemSlug } from "@/lib/docs-registry";
import { DocSidebarPage } from "@/lib/sidebar-content/index";
import Link from "next/link";

export function DocSidebar<T extends SystemSlug>({
  label,
  pages,
}: {
  label: string;
  pages: DocSidebarPage<T>[];
}) {
  const isMounted = useMounted();
  if (!isMounted) return null;

  return (
    <aside className="sticky top-24 h-fit w-full hidden lg:block border-r border-foreground/40">
      <ScrollArea className="py-6 px-2">
        <div className="space-y-4">
          <div className="py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {label}
            </h2>

            <div className="space-y-1">
              {pages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className="w-full justify-start px-4 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md flex transition-colors"
                >
                  {page.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
