"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";

interface TableOfContentProps {
  options: {
    hash: string;
    title: string;
  }[];
}

export const TableOfContent: React.FC<TableOfContentProps> = ({ options }) => {
  const [activeHash, setActiveHash] = React.useState<string>("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    options.forEach((opt) => {
      const el = document.getElementById(opt.hash);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [options]);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(hash);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
      window.history.pushState(null, "", `#${hash}`);
    }
  };

  return (
    <aside className="sticky top-48 h-fit w-full hidden lg:block">
      <h2 className="text-muted-foreground">On this page</h2>
      <Separator className="my-4" />
      <div className="relative flex flex-col gap-4">
        {/* The consistent vertical background line */}
        <div className="absolute left-0 top-0 h-full w-[2px] bg-muted" />

        {options.map((option) => {
          return (
            <a
              key={option.hash}
              href={`#${option.hash}`}
              onClick={(e) => handleScroll(e, option.hash)}
              className={cn(
                "relative text-sm transition-all duration-300 pl-5",
                activeHash == option.hash
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeHash === option.hash && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute left-0 top-0 z-10 h-full w-[2px] bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 25,
                    mass: 1,
                  }}
                >
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_#3b82f6]" />
                </motion.div>
              )}
              {option.title}
            </a>
          );
        })}
      </div>
    </aside>
  );
};
