"use client";

import { useState } from "react";
import Image from "next/image";

interface BackgroundPhotoProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export function BackgroundPhoto({
  src,
  alt,
  priority = false,
  className = "opacity-25",
}: BackgroundPhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="100vw"
      onError={() => setFailed(true)}
      className={`pointer-events-none object-cover object-center select-none ${className}`}
    />
  );
}

