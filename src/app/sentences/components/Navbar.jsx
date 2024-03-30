"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const pathname = usePathname();

  return (
    <div role="tablist" className="tabs tabs-bordered mb-5">
      <Link
        href="/sentences/all"
        role="tab"
        className={`tab  !pb-8 text-lg transition-colors duration-300 ${
          pathname == "/sentences/all"
            ? "tab-active !border-tertiary text-tertiary"
            : "!border-gray-100/10 text-white"
        }`}
      >
        All <span className="hidden ml-1.5 sm:block">Texts</span>
      </Link>
      <Link
        href="/sentences/completed"
        role="tab"
        className={`tab !pb-8 text-lg transition-colors duration-300 ${
          pathname == "/sentences/completed"
            ? "tab-active !border-tertiary text-tertiary"
            : "!border-gray-100/10 text-white"
        }`}
      >
        Completed <span className="hidden ml-1.5 sm:block">Texts</span>
      </Link>
      <Link
        href="/sentences/not_completed"
        role="tab"
        className={`tab !pb-8 text-lg transition-colors duration-300 ${
          pathname == "/sentences/not_completed"
            ? "tab-active !border-tertiary text-tertiary"
            : "!border-gray-100/10 text-white"
        }`}
      >
        Pending <span className="hidden ml-1.5 sm:block">Texts</span>
      </Link>
    </div>
  );
}
