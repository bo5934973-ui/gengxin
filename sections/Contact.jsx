"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/Button";
import { useLiveContent } from "@/components/LiveContentProvider";

export function Contact() {
  const { content } = useLiveContent();
  const { contact } = content;

  return (
    <section id="contact" className="relative overflow-hidden bg-whiteBg px-6 py-24 md:px-20 md:py-32">
      <div className="absolute left-1/2 top-0 h-72 w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(210,226,255,0.6),transparent_68%)] blur-3xl" />
      <div className="relative mx-auto max-w-[980px] text-center">
        <div className="mx-auto mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white shadow-soft">
          <Mail className="h-5 w-5 text-textDark" />
        </div>
        <h2 className="text-5xl font-semibold leading-[1.05] tracking-normal text-textDark md:text-[64px]">
          {contact.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-textSoft">
          {contact.description}
        </p>
        <div className="mt-9">
          <Button
            href={`mailto:${contact.email}`}
            className="border-black/10 bg-textDark text-white hover:bg-black"
          >
            {contact.buttonText}
          </Button>
        </div>
        <p className="mt-5 text-sm text-textSoft">{contact.email}</p>
      </div>
    </section>
  );
}
