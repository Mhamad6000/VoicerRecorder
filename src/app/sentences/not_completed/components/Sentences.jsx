"use client";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { globalEndpoits } from "@/app/lib/endpoints";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "next/navigation";
export default function Sentences({ sentencesData }) {
  const searchParams = useSearchParams();
  const sentencesInfo = useQuery({
    queryKey: ["sentences", searchParams.get("page") || 1],
    queryFn: () =>
      globalEndpoits.notCompletedSentences({
        perPage: 20,
        page: searchParams.get("page") || 1,
      }),
    // initialData: sentencesData,
  });
  if (sentencesInfo?.isError) {
    if (sentencesInfo?.error?.response?.data?.error?.code == "NO_TOKEN") {
      window.location.href = "/auth/login";
    }
  }
  if (sentencesInfo?.isLoading)
    return (
      <div className="flex w-full justify-center items-center min-h-[600px]">
        <div className="">
          <span class="loading loading-dots loading-lg text-tertiary"></span>
        </div>
      </div>
    );
  console.log(sentencesInfo);
  return (
    <div className="">
      <div className="flex flex-col gap-3 mb-5">
        {sentencesInfo?.data?.data?.map((text, index) => {
          return (
            <Link
              href={`/texts/${text.id}`}
              key={text.id}
              className="bg-secondary justify-between p-6 flex items-center rounded-md gap-5"
            >
              <div className="flex gap-1">
                <div className="">{index + 1}-</div>

                <p className="">{text.content}</p>
              </div>
              {text?.completed ? (
                <div className="text-2xl text-tertiary">
                  <ImCheckboxChecked />
                </div>
              ) : (
                <div className="text-2xl text-tertiary">
                  <ImCheckboxUnchecked />
                </div>
              )}
            </Link>
          );
        })}
      </div>
      <div className="">
        <Pagination
          condition={"all"}
          nextPage={sentencesInfo?.data?.nextPage}
          prevPage={sentencesInfo?.data?.previousPage}
        />
      </div>
    </div>
  );
}
