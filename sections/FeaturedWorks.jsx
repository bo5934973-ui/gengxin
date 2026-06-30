"use client";

import { WorkCard } from "@/components/WorkCard";
import { useLiveContent } from "@/components/LiveContentProvider";

export function FeaturedWorks() {
  const { content } = useLiveContent();
  const { worksSection, works } = content;

  return (
    <section id="works" className="bg-whiteBg px-6 py-24 md:px-20 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14 max-w-3xl md:mb-20">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-textSoft">
            {worksSection.eyebrow}
          </p>
          <h2 className="text-5xl font-semibold leading-[1.08] tracking-normal text-textDark md:text-[64px]">
            {worksSection.title}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {works.map((work, index) => (
            <WorkCard key={work.slug} work={work} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
