"use client";

import React from "react";
import { useMounted } from "@/hooks/use-mounted";
import { TableOfContent } from "@/components/docs/table-of-content";
import { DocSidebar } from "@/components/docs/docs-sidebar";
import { notFound, useParams } from "next/navigation";
import { SystemSlug, docsRegistry } from "@/lib/docs-registry";
import { docSidebars } from "@/lib/sidebar-content";
import { PageNavigator } from "@/components/docs/page-navigator";

export default function Page() {
  const isMounted = useMounted();
  const params = useParams();
  const [sections, setSections] = React.useState<
    { hash: string; title: string }[]
  >([]);

  const [rawSystemSlug, rawPageSlug] = (params?.params as string[]) || [];
  const system =
    rawSystemSlug in docsRegistry
      ? docsRegistry[rawSystemSlug as SystemSlug]
      : null;
  const page = system
    ? (rawPageSlug as keyof typeof system.pages) || system.default
    : null;

  React.useLayoutEffect(() => {
    if (!isMounted || !system || !page) return;

    const sections = document.querySelectorAll<HTMLElement>("section");
    const extracted = Array.from(sections).map((section) => ({
      hash: section.id,
      title: section.dataset.navTitle || section.id,
    }));

    setSections(extracted);
  }, [isMounted, system, page]);

  if (!isMounted) return null;
  if (!system || !page) return notFound();

  const systemSlug = rawSystemSlug as SystemSlug;
  const sidebar = docSidebars.find((s) => s.slug === systemSlug);
  if (!sidebar) return notFound();

  const PageComponent = system.pages[page];

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:grid lg:grid-cols-[220px_1fr_220px] gap-6 xl:grid-cols-[240px_1fr_240px] xl:gap-8">
        <DocSidebar
          label={sidebar.label}
          slug={sidebar.slug}
          pages={sidebar.pages}
        />

        <div className="p-3 md:p-5 lg:p-0">
          <PageComponent />
          <PageNavigator
            systemSlug={systemSlug}
            currentSlug={page}
            pages={sidebar.pages}
          />
        </div>

        <TableOfContent sections={sections} />
      </div>
    </div>
  );
}
