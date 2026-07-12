import Image from "next/image";
import { site } from "@/lib/site";

// Brand logo (CH Power Solutions). Uses the uploaded logo image.
export default function Logo({ className = "", size = 44 }) {
  return (
    <span
      className={`relative inline-block overflow-hidden rounded-xl ring-1 ring-slate-200 ${className}`}
      style={{ width: size * 1.85, height: size }}
    >
      <Image
        src="/logo.jpeg"
        alt={site.name}
        fill
        sizes="120px"
        className="object-cover"
        priority
      />
    </span>
  );
}
