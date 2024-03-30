"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { globalEndpoits } from "@/app/lib/endpoints";
import VoicerRecorder from "../../sentences/components/VoiceRecorder";
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
          <span class="loading loading-dots loading-lg text-tertiary"></span>
        </div>
      </div>
    );
  console.log(sentenceInfo);
  return (
    <div className="flex min-h-screen flex-col py-10 px-4 md:px-8 lg:px-12 bg-primary  text-gray-100 max-w-7xl mx-auto">
      <h1 className="text-white text-right text-2xl mb-5">
        <span className="text-tertiary mr-2">"</span>
        {sentenceInfo?.data?.sentence?.content}
        <span className="text-tertiary ml-2">"</span>
      </h1>
      {/* <RecordMp3 /> */}
      <VoicerRecorder sentenceId={id} />
    </div>
  );
}
