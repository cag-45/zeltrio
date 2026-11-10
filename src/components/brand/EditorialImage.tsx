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
      className={`relative w-full overflow-hidden rounded-lg border border-rule bg-surface ${aspectClass}`}
    >
      {failed ? (
        <div className="flex h-full w-full flex-col justify-between p-6 text-ink">
          <span className="text-xs font-semibold tracking-widest uppercase text-zeltrio">
            Service {index}
          </span>
          <div>
            <p className="font-serif text-2xl font-medium text-ink">{label}</p>
            <p className="mt-2 text-sm text-slate">
              Zeltrio Digital Service Practice
            </p>
          </div>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          onError={() => setFailed(true)}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      )}
    </div>
  );
}
