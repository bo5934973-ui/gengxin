"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/Button";
import { useLiveContent } from "@/components/LiveContentProvider";

export function Hero() {
  const { scrollY } = useScroll();
  const lightY = useTransform(scrollY, [0, 900], [0, 120]);
  const { content } = useLiveContent();
  const { hero } = content;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-blackBg px-6 pt-24 text-white md:px-20">
      <motion.div
        style={{ y: lightY }}
        className="pointer-events-none absolute left-1/2 top-12 h-[640px] w-[840px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(220,234,255,0.34)_0%,rgba(160,185,225,0.12)_38%,transparent_70%)] blur-2xl"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_22%,rgba(255,255,255,0.03)_72%,transparent)]" />
      <div className="absolute bottom-[-22%] left-1/2 h-[520px] w-[1200px] -translate-x-1/2 rounded-[50%] border border-white/10 bg-white/[0.03] blur-[1px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-14 lg:grid-cols-[1fr_0.8fr]">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-white/52"
          >
            {hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[64px] font-semibold leading-[0.96] tracking-normal md:text-[96px]"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl text-xl leading-8 text-white/68 md:text-2xl md:leading-9"
          >
            {hero.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button href="#works">{hero.primaryButton}</Button>
            <Button href="#contact" variant="secondary">
              {hero.secondaryButton}
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-[0.82] w-full max-w-[420px] overflow-hidden rounded-[32px] border border-white/12 bg-white/[0.045] p-4 shadow-glass backdrop-blur-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.22),transparent_34%),linear-gradient(160deg,rgba(255,255,255,0.16),rgba(255,255,255,0.03)_36%,rgba(255,255,255,0.1))]" />
          <div className="relative flex h-full flex-col justify-between rounded-[24px] border border-white/12 bg-black/45 p-6">
            <div className="h-24 rounded-full bg-[radial-gradient(circle,rgba(236,243,255,0.8),rgba(170,196,235,0.16)_36%,transparent_62%)] blur-xl" />
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-white/42">
                {hero.visualSubtitle}
              </p>
              <p className="mt-2 text-3xl font-semibold leading-tight">
                {hero.visualTitle}
              </p>
            </div>
            <div className="space-y-5">
              <div className="aspect-square rounded-full border border-white/18 bg-[conic-gradient(from_160deg,#f5f5f7,#797d86,#111,#e8f0ff,#f5f5f7)] p-5 shadow-glow">
                <div className="h-full rounded-full border border-white/20 bg-blackBg" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="h-20 rounded-2xl bg-white/10" />
                <div className="h-20 rounded-2xl bg-white/16" />
                <div className="h-20 rounded-2xl bg-white/8" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
