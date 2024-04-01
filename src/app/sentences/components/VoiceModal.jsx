"use client";
import VoicerRecorder from "./VoiceRecorder";
import Link from "next/link";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default function VoiceModal({
  sentenceIndex,
  sentenceInfo,
  setSentenceIndex,
  setActiveSentence,
  getSentences,
}) {
  // const sentenceInfo = useQuery({
  //   queryKey: ["singleSentence", searchParams.get("id")],
  //   queryFn: () =>
  //     globalEndpoits.singleSentence({
  //       id: id,
  //     }),
  //   // initialData: sentencesData,
  // });
  // if (sentenceInfo?.isError) {
  //   if (sentenceInfo?.error?.response?.data?.error?.code == "NO_TOKEN") {
  //     window.location.href = "/auth/login";
  //   }
  // }
  // if (sentenceInfo?.isLoading)
  //   return (
  //     <div className="flex w-full justify-center items-center min-h-[600px]">
  //       <div className="">
  //         <span className="loading loading-dots loading-lg text-tertiary"></span>
  //       </div>
  //     </div>
  //   );

  return (
    <div className="flex flex-col bg-primary  text-gray-100 h-full">
      <h1 className="text-white text-right text-2xl mb-5">
        <span className="text-tertiary mr-2">&quot;</span>
        {sentenceInfo?.current?.content}
        <span className="text-tertiary ml-2">&quot;</span>
      </h1>
      {/* <RecordMp3 /> */}
      <VoicerRecorder sentenceId={sentenceInfo?.current?.id} />
      <div className="flex justify-between items-center mt-20">
        <button
          disabled={sentenceInfo?.prev == undefined}
          onClick={() => {
            setActiveSentence(getSentences(sentenceIndex - 1));
            setSentenceIndex(sentenceIndex - 1);
          }}
          //   href={`/texts/${sentenceInfo?.prev?.id}`}
          className="bg-secondary px-8 disabled:opacity-60 disabled:cursor-not-allowed  sm:px-10 py-2 text-white font-semibold rounded-md flex justify-center items-center"
        >
          <GrFormPrevious className="inline-block text-2xl" />
          Prev
        </button>
        <button
          disabled={sentenceInfo?.next == undefined}
          onClick={() => {
            setActiveSentence(getSentences(sentenceIndex + 1));
            setSentenceIndex(sentenceIndex + 1);
          }}
          className="bg-secondary disabled:opacity-60 disabled:cursor-not-allowed px-8 sm:px-10 py-2 text-white font-semibold rounded-md flex justify-center items-center"
        >
          Next
          <GrFormNext className="inline-block text-2xl" />
        </button>
      </div>
    </div>
  );
}
