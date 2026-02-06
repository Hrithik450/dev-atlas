import { DockerOverview } from "@/components/docs/content/docker/docker-overview";

export const docsRegistry = {
  docker: {
    default: "docker-overview",
    pages: {
      "docker-overview": DockerOverview,
    },
  },
} as const;

export type SystemSlug = keyof typeof docsRegistry;
export type PageSlug<T extends SystemSlug> = Extract<
  keyof (typeof docsRegistry)[T]["pages"],
  string
>;
