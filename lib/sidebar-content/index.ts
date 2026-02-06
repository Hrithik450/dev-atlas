import { dockerSidebar } from "@/lib/sidebar-content/docker";
import { PageSlug, SystemSlug } from "@/lib/docs-registry";

export interface DocSidebarPage<T extends SystemSlug> {
  label: string;
  slug: PageSlug<T>;
}

export interface DocSidebarProps<T extends SystemSlug> {
  label: string;
  slug: T;
  pages: DocSidebarPage<T>[];
}

export const docSidebars = [dockerSidebar];
