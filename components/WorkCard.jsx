"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function WorkCard({ work, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/work/?slug=${encodeURIComponent(work.slug)}`}
        className="group block overflow-hidden rounded-work border border-black/8 bg-white shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-[0_34px_120px_rgba(12,18,28,0.22)]"
      >
        <div className="relative aspect-[1.18] overflow-hidden bg-[#111]">
          <img
            src={`${work.coverImage}?v=real-images-2`}
            alt={work.title}
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.28)_48%,transparent_72%)] opacity-0 transition duration-700 group-hover:translate-x-[120%] group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/38 to-transparent" />
        </div>
        <div className="space-y-3 p-6 md:p-7">
          <div className="flex items-center justify-between gap-4 text-[13px] leading-[18px] text-textSoft">
            <span>{work.category}</span>
            <span>{work.year}</span>
          </div>
          <h3 className="text-2xl font-semibold leading-8 tracking-[-0.01em] text-textDark">
            {work.title}
          </h3>
          <p className="max-w-xl text-base leading-6 text-textSoft">
            {work.description}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
