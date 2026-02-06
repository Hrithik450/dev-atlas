"use client";

import React from "react";
import { useMounted } from "@/hooks/use-mounted";
import { TableOfContent } from "@/components/docs/table-of-content";
import { Docker } from "./content/docker";
import { DocSidebar } from "@/components/docs/doc-sidebar";
import { dockerSidebar } from "@/lib/sidebar-content/content/docker";

export default function Page() {
  const isMounted = useMounted();
  const [options, setOptions] = React.useState<
    { hash: string; title: string }[]
  >([]);

  React.useEffect(() => {
    if (!isMounted) return;

    const sections = document.querySelectorAll<HTMLElement>("section");
    const extractedOptions = Array.from(sections).map((section) => ({
      hash: section.id,
      title: section.dataset.navTitle || section.id,
    }));
    setOptions(extractedOptions);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:grid lg:grid-cols-[240px_1fr_240px] gap-8">
        <DocSidebar title={dockerSidebar.title} items={dockerSidebar.items} />
        <Docker />
        <TableOfContent options={options} />
      </div>
    </div>
  );
}
