"use client";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { globalEndpoits } from "@/app/lib/endpoints";
import Pagination from "../../components/Pagination";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import VoiceModal from "../../components/VoiceModal";
import { IoClose } from "react-icons/io5";
import { get } from "http";
import { set } from "zod";
export default function Sentences({ sentencesData }) {
  const searchParams = useSearchParams();
  const [activeSentence, setActiveSentence] = useState();
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const sentencesInfo = useQuery({
    queryKey: ["sentences", searchParams.get("page") || 1],
    queryFn: () =>
      globalEndpoits.completedSentences({
        perPage: 20,
        page: searchParams.get("page") || 1,
      }),
    // initialData: sentencesData,
  });
  function getSentences(index) {
    return {
      prev: sentencesInfo?.data?.data[index - 1],
      current: sentencesInfo?.data?.data[index],
      next: sentencesInfo?.data?.data[index + 1],
    };
  }

  if (sentencesInfo?.isError) {
    if (sentencesInfo?.error?.response?.data?.error?.code == "NO_TOKEN") {
      window.location.href = "/auth/login";
    }
  }
  if (sentencesInfo?.isLoading)
    return (
      <div className="flex w-full justify-center items-center min-h-[600px]">
        <div className="">
          <span className="loading loading-dots loading-lg text-tertiary"></span>
        </div>
      </div>
    );

  return (
    <div className="">
      <div className="flex flex-col gap-3 mb-5">
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="bg-primary relative w-full h-full pt-24 pb-10">
            <div className="flex justify-end">
              <label htmlFor="my_modal_7">
                <IoClose className="text-4xl text-tertiary mr-10 mb-5" />
              </label>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 ">
              <VoiceModal
                sentenceInfo={activeSentence}
                sentenceIndex={sentenceIndex}
                setSentenceIndex={setSentenceIndex}
                setActiveSentence={setActiveSentence}
                getSentences={getSentences}
              />
            </div>
          </div>
          <label
            className="modal-backdrop h-screen w-screen absolute left-0 top-0  "
            htmlFor="my_modal_7"
          >
            Close
          </label>
        </div>
        {sentencesInfo?.data?.data?.map((text, index) => {
          return (
            <label
              htmlFor="my_modal_7"
              onClick={() => {
                setActiveSentence(getSentences(index));
                setSentenceIndex(index);
              }}
              key={text.id}
              className="bg-secondary justify-between p-6 flex items-center rounded-md gap-5"
            >
              <div className="flex gap-1">
                <div className="">{index + 1}-</div>

                <p className="">{text.content}</p>
              </div>
              <div className="text-2xl text-tertiary">
                <ImCheckboxChecked />
              </div>
            </label>
          );
        })}
      </div>
      <div className="">
        <Pagination
          condition={"completed"}
          nextPage={sentencesInfo?.data?.nextPage}
          prevPage={sentencesInfo?.data?.previousPage}
        />
      </div>
    </div>
  );
}
