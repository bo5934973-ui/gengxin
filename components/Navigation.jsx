"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLiveContent } from "@/components/LiveContentProvider";

export function Navigation() {
  const { content } = useLiveContent();
  const { site } = content;

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-blackBg/60 backdrop-blur-2xl"
    >
      <nav className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-6 text-sm text-white/72 md:px-20">
        <Link href="/" className="font-medium tracking-[0.01em] text-white">
          {site.name}
        </Link>
        <div className="flex items-center gap-6">
          <a className="transition hover:text-white" href="/#works">
            Works
          </a>
          <a className="transition hover:text-white" href="/#about">
            About
          </a>
          <a className="transition hover:text-white" href="/#contact">
            Contact
          </a>
          <Link className="hidden transition hover:text-white sm:inline" href="/admin/">
            Admin
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
