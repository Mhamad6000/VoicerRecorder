"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { condition }: { condition: string } = useParams();

  return (
    <div className="flex min-h-screen flex-col  p-16 bg-primary  text-gray-100">
      <div className="mb-8">
        <h1 className="text-6xl font-bold uppercase text-tertiary mb-1">
          voice collecter
        </h1>

        <p className="max-w-lg ">
          here are all available texts for you to record , please be somewhere
          quiet while you record so we have a better voice record.
        </p>
      </div>
      <div role="tablist" className="tabs tabs-bordered mb-5">
        <Link
          href="/texts/all"
          role="tab"
          className={`tab  !pb-8 text-lg transition-colors duration-300 ${
            condition === "all"
              ? "tab-active !border-tertiary text-tertiary"
              : "!border-gray-100/10 text-white"
          }`}
        >
          All Texts
        </Link>
        <Link
          href="/texts/done"
          role="tab"
          className={`tab !pb-8 text-lg transition-colors duration-300 ${
            condition === "done"
              ? "tab-active !border-tertiary text-tertiary"
              : "!border-gray-100/10 text-white"
          }`}
        >
          Done Texts
        </Link>
        <Link
          href="/texts/pending"
          role="tab"
          className={`tab !pb-8 text-lg transition-colors duration-300 ${
            condition === "pending"
              ? "tab-active !border-tertiary text-tertiary"
              : "!border-gray-100/10 text-white"
          }`}
        >
          Pending Texts
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
