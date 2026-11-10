"use client";

import { useState } from "react";
import type { ServiceFaqItem } from "@/types";

interface ServiceFaqAccordionProps {
  faqs: ServiceFaqItem[];
  serviceTitle: string;
}

export function ServiceFaqAccordion({
  faqs,
  serviceTitle,
}: ServiceFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="rounded-2xl border border-rule bg-card p-7 text-left sm:p-10">
      <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
        Common Questions
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        Frequently Asked Questions About {serviceTitle}
      </h2>

      <div className="mt-8 divide-y divide-rule border-t border-rule">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="py-5">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-6 text-left transition-colors hover:text-zeltrio"
              >
                <span className="text-base font-bold text-ink sm:text-lg">
                  {faq.question}
                </span>
                <span
                  className={`shrink-0 rounded-md border px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${isOpen
                      ? "border-zeltrio bg-zeltrio text-canvas"
                      : "border-rule bg-surface text-slate hover:border-zeltrio hover:text-zeltrio"
                    }`}
                >
                  {isOpen ? "Hide" : "Read"}
                </span>
              </button>

              {isOpen ? (
                <p className="animate-hero-enter mt-4 max-w-3xl text-sm leading-relaxed text-slate sm:text-base">
                  {faq.answer}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
