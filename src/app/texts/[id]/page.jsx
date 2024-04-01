"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { globalEndpoits } from "@/app/lib/endpoints";
import VoicerRecorder from "../../sentences/components/VoiceRecorder";
import Link from "next/link";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
export default function Page({ params: { id } }) {
  const searchParams = useSearchParams();
  const sentenceInfo = useQuery({
    queryKey: ["singleSentence", searchParams.get("id")],
    queryFn: () =>
      globalEndpoits.singleSentence({
        id: id,
      }),
    // initialData: sentencesData,
  });
  if (sentenceInfo?.isError) {
    if (sentenceInfo?.error?.response?.data?.error?.code == "NO_TOKEN") {
      window.location.href = "/auth/login";
    }
  }
  if (sentenceInfo?.isLoading)
    return (
      <div className="flex w-full justify-center items-center min-h-[600px]">
        <div className="">
          <span className="loading loading-dots loading-lg text-tertiary"></span>
        </div>
      </div>
    );
  console.log(sentenceInfo?.data);
  return (
    <div className="flex flex-col bg-primary  text-gray-100 h-full">
      <h1 className="text-white text-right text-2xl mb-5">
        <span className="text-tertiary mr-2">&quot;</span>
        {sentenceInfo?.data?.sentence?.content}
        <span className="text-tertiary ml-2">&quot;</span>
      </h1>
      {/* <RecordMp3 /> */}
      <VoicerRecorder sentenceId={id} />
      <div className="flex justify-between items-center mt-40">
        <Link
          href={`/texts/${sentenceInfo?.data?.prevSentence?.id}`}
          className="bg-quaternary px-8 sm:px-10 py-2 text-primary font-semibold rounded-md flex justify-center items-center"
        >
          <GrFormPrevious className="inline-block text-2xl" />
          Prev
        </Link>
        <Link
          href={`/texts/${sentenceInfo?.data?.nextSentence?.id}`}
          className="bg-quaternary px-8 sm:px-10 py-2 text-primary font-semibold rounded-md flex justify-center items-center"
        >
          Next
          <GrFormNext className="inline-block text-2xl" />
        </Link>
      </div>
    </div>
  );
}
