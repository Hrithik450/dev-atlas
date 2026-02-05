"use client";

import React from "react";
import { useMounted } from "@/hooks/use-mounted";
import { TableOfContent } from "@/components/docs/table-of-content";
import { Docker } from "./content/docker";
import { DocSidebar } from "@/components/docs/doc-sidebar";

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
    <>
      <DocSidebar />

      <main>
        <Docker />
      </main>

      <TableOfContent options={options} />
    </>
  );
}
