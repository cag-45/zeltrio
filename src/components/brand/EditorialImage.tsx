"use client";

import { useState } from "react";
import Image from "next/image";

interface EditorialImageProps {
  src: string;
  alt: string;
  label: string;
  index: string;
  priority?: boolean;
  sizes?: string;
  aspectClass?: string;
}

export function EditorialImage({
  src,
  alt,
  label,
  index,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  aspectClass = "aspect-[4/3]",
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl border border-rule-strong bg-surface-elevated ${aspectClass}`}
    >
      {failed ? (
        <div className="flex h-full w-full flex-col justify-between bg-linear-to-br from-surface-elevated to-navy p-6 text-ink">
          <span className="text-xs font-bold tracking-widest uppercase text-gold">
            Service {index}
          </span>
          <div>
            <p className="font-serif text-2xl font-medium text-ink">{label}</p>
            <p className="mt-2 text-sm text-slate">
              Zeltrio Digital Services Practice
            </p>
          </div>
        </div>
      ) : (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            onError={() => setFailed(true)}
            className="object-cover brightness-[0.88] contrast-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-canvas/85 via-canvas/15 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-rule-strong bg-canvas/75 px-3 py-1 text-[11px] font-bold tracking-widest uppercase text-gold backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-zeltrio-bright" />
            <span>Practice {index}</span>
          </div>
        </>
      )}
    </div>
  );
}
