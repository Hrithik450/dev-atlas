import type { DocSidebarProps } from "@/lib/sidebar-content/index";

export const dockerSidebar: DocSidebarProps<"docker"> = {
  label: "Docker",
  slug: "docker",
  pages: [
    { label: "Docker Overview", slug: "docker-overview" },
    // { label: "Build Images", slug: "build-images" },
    // { label: "Run Containers", slug: "run-containers" },
    // { label: "Deploy With Docker", slug: "deploy-with-docker" },
  ],
};
