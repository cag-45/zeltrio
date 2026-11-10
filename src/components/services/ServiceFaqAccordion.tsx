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
    <section className="rounded-2xl border border-rule bg-porcelain p-7 sm:p-10">
      <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
        Common Questions
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        Frequently asked questions about {serviceTitle.toLowerCase()}
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
                className="flex w-full items-start justify-between gap-6 text-left"
              >
                <span className="text-base font-semibold text-ink sm:text-lg">
                  {faq.question}
                </span>
                <span className="shrink-0 rounded border border-rule bg-alabaster px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate">
                  {isOpen ? "Hide" : "Read"}
                </span>
              </button>

              {isOpen ? (
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate sm:text-base">
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

