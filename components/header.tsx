"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { docSidebars } from "@/lib/sidebar-content";

const navbarItems: { label: string; slug: string }[] = [];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
  const [openSystem, setOpenSystem] = React.useState<string | null>(null);
  const [isScrolled, setIsScrolled] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href")?.slice(1);
    if (!targetId) return;

    const element = document.getElementById(targetId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border border/20 border-b backdrop-blur-lg",
        isScrolled ? "bg-background/90 shadow-xs" : "bg-background"
      )}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/">
          <div className="flex items-center gap-2 font-bold">
            <span>DevAtlas</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-4 lg:gap-8">
          {navbarItems.map((item, i) => (
            <motion.a
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
              href={item.slug}
              onClick={
                item.slug.startsWith("#") ? handleScrollToSection : undefined
              }
              className="text-muted-foreground hover:text-foreground group relative font-medium transition-colors text-sm"
            >
              {item.label}
              <span className="bg-primary absolute -bottom-2 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </nav>

        <div className="hidden lg:flex cursor-pointer items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <ThemeToggle
              variant="secondary"
              size="icon"
              className="rounded-full transition-transform hover:scale-105"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Link href="/editor/theme" prefetch>
              <Button className="cursor-pointer rounded-full font-medium transition-transform hover:scale-105">
                <span className="px-1">Try It Now</span>
                <ChevronRight className="ml-1 size-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle variant="ghost" size="icon" />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-background/95 absolute inset-x-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden border-b backdrop-blur-lg lg:hidden"
        >
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            {/* Page Navigations */}
            {navbarItems.map((item, i) => (
              <motion.a
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                href={item.slug}
                onClick={(e) => {
                  handleScrollToSection(e);
                  setMobileMenuOpen(false);
                }}
                className="group relative overflow-hidden py-2 text-sm font-medium"
              >
                <span className="relative z-10">{item.slug}</span>
              </motion.a>
            ))}

            {/* Systems Navigation */}
            {docSidebars.map((sidebar, i) => (
              <div key={sidebar.label} className="flex flex-col">
                {/* Systems Header */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: (navbarItems.length - 1 + i) * 0.05,
                  }}
                  onClick={() =>
                    setOpenSystem(
                      openSystem === sidebar.label ? null : sidebar.label
                    )
                  }
                  className="flex items-center justify-between"
                >
                  <span className="font-medium">{sidebar.label}</span>

                  <Button variant="ghost" size="icon">
                    <ChevronRight
                      className={cn(
                        "size-5 transition-transform duration-300 ease-in-out",
                        openSystem === sidebar.label ? "rotate-90" : "rotate-0"
                      )}
                    />
                  </Button>
                </motion.div>

                {/* Systems Dropdown */}
                {openSystem === sidebar.label && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-2"
                  >
                    <div className="flex flex-col gap-4 pt-2 px-2">
                      {sidebar.pages &&
                        sidebar.pages.map((page) => (
                          <Link
                            key={page.slug}
                            href={`/docs/${sidebar.slug}/${page.slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm text-muted-foreground hover:text-foreground"
                          >
                            {page.label}
                          </Link>
                        ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="border-t border-border/30 mt-2 pt-2"
            >
              <Link
                href="/editor/theme"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full rounded-full">
                  Try It Now
                  <ChevronRight className="ml-2 size-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
