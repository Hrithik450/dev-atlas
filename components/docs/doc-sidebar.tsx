"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useMounted } from "@/hooks/use-mounted";

export function DocSidebar() {
  const isMounted = useMounted();
  if (!isMounted) return null;

  return (
    <aside className="sticky top-24 h-fit w-full hidden lg:block border-r border-foreground/40">
      <ScrollArea className="py-6 pr-6">
        <div className="space-y-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Getting Started
            </h2>
            <div className="space-y-1">
              {["Introduction", "Installation", "Components", "Theming"].map(
                (item) => (
                  <button
                    key={item}
                    className="w-full justify-start px-4 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md flex"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Components
            </h2>
            <div className="space-y-1">
              {["Buttons", "Inputs", "Dialogs", "ScrollArea"].map((item) => (
                <button
                  key={item}
                  className="w-full justify-start px-4 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md flex"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
