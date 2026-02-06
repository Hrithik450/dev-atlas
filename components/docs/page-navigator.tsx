import { SystemSlug } from "@/lib/docs-registry";
import { DocSidebarPage } from "@/lib/sidebar-content";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PageNavigatorProps<T extends SystemSlug> {
  systemSlug: T;
  currentSlug: string;
  pages: DocSidebarPage<T>[];
}
export function PageNavigator<T extends SystemSlug>({
  systemSlug,
  currentSlug,
  pages,
}: PageNavigatorProps<T>) {
  const currentIndex = pages.findIndex((item) => item.slug === currentSlug);
  if (currentIndex === -1) return null;

  const prev = pages[currentIndex - 1];
  const next = pages[currentIndex + 1];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 pt-6 border-t border-border">
      {prev ? (
        <Link
          href={`/docs/${systemSlug}/${prev.slug}`}
          className="group flex flex-col items-start p-4 rounded-lg border border-secondary-foreground/20 hover:border-primary transition-colors"
        >
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <ChevronLeft className="mr-1 size-4" />
            <span>Previous Page</span>
          </div>
          <span className="font-bold text-lg text-foreground group-hover:text-primary">
            {prev.label}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/docs/${systemSlug}/${next.slug}`}
          className="group flex flex-col items-end text-right p-4 rounded-lg border border-border hover:border-primary transition-colors"
        >
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <span>Next Page</span>
            <ChevronRight className="ml-1 size-4" />
          </div>
          <span className="font-bold text-lg text-foreground group-hover:text-primary">
            {next.label}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
