"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import next from "next";
export default function Pagination({ condition, nextPage, prevPage }) {
  const searchParams = useSearchParams();
  return (
    <div className="flex justify-center">
      <div className="join  gap-2 ">
        {(Number(searchParams.get("page")) || 1) == 1 ? (
          <button
            disabled={(Number(searchParams.get("page")) || 1) == 1}
            className={`join-item btn border-none disabled:opacity-50 disabled:!cursor-not-allowed bg-secondary/60 !text-white hover:bg-secondary `}
          >
            prev
          </button>
        ) : (
          <Link
            href={`/sentences/${condition}?page=${
              Number(searchParams.get("page") || 1) - 1
            }`}
            className={`join-item btn border-none ${"bg-secondary/60 text-white hover:bg-secondary"} `}
          >
            prev
          </Link>
        )}

        {prevPage && (
          <Link
            href={`/sentences/${condition}?page=${prevPage}`}
            className={`join-item btn border-none text-white hover:bg-secondary ${"text-white hover:bg-secondary bg-secondary/60"}`}
          >
            {prevPage}
          </Link>
        )}
        <Link
          href={`/sentences/${condition}?page=${1}`}
          className={`join-item btn border-none text-white hover:bg-secondary ${"btn-disabled !bg-tertiary/80  !text-primary"}`}
        >
          {searchParams.get("page") || 1}
        </Link>
        {nextPage && (
          <Link
            href={`/sentences/${condition}?page=${nextPage}`}
            className={`join-item btn border-none text-white hover:bg-secondary ${"text-white hover:bg-secondary bg-secondary/60"}`}
          >
            {nextPage}
          </Link>
        )}

        {nextPage ? (
          <Link
            href={`/sentences/${condition}?page=${
              Number(searchParams.get("page") || 1) + 1
            }`}
            className={`join-item btn border-none ${"bg-secondary/60 text-white hover:bg-secondary"}`}
          >
            next
          </Link>
        ) : (
          <button
            disabled={nextPage == null}
            className={`join-item btn border-none disabled:opacity-50 disabled:!cursor-not-allowed bg-secondary/60 !text-white hover:bg-secondary `}
          >
            next
          </button>
        )}
      </div>
    </div>
  );
}
