// app/docs/layout.tsx
import { DocSidebar } from "@/components/docs/doc-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:grid lg:grid-cols-[240px_1fr_240px] gap-8">
        {children}
      </div>
    </div>
  );
}
