"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useMounted } from "@/hooks/use-mounted";

interface DocSidebarProps {
  title: string;
  items: {
    label: string;
    href: string;
  }[];
}

export function DocSidebar({ title, items }: DocSidebarProps) {
  const isMounted = useMounted();
  if (!isMounted) return null;

  return (
    <aside className="sticky top-24 h-fit w-full hidden lg:block border-r border-foreground/40">
      <ScrollArea className="py-6 px-2">
        <div className="space-y-4">
          <div className="py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              {title}
            </h2>

            <div className="space-y-1">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={`#${item.href}`}
                  className="w-full justify-start px-4 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md flex transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
