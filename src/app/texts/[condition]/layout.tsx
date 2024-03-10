"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import VoicerRecorder from "./components/VoiceRecorder";
export const voiceOpnedContext = createContext({});
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  type text = {
    text: string;
    id: number;
    isDone: boolean;
  };
  const { condition }: { condition: string } = useParams();
  const [isVoiceOpned, setIsVoiceOpned] = useState(false);
  const [textOpned, setTextOpned] = useState<text>();
  return (
    <div className="grid grid-cols-12 min-h-screen  bg-primary  text-gray-100">
      <div
        className={`flex flex-col p-16 ${
          isVoiceOpned ? "col-span-8" : "col-span-12"
        }`}
      >
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
        <div>
          <voiceOpnedContext.Provider
            value={{ isVoiceOpned, setIsVoiceOpned, textOpned, setTextOpned }}
          >
            {children}
          </voiceOpnedContext.Provider>
        </div>
      </div>
      <div className={`bg-secondary p-6 ${isVoiceOpned ? "col-span-4" : ""}`}>
        <div className="flex justify-end items-center ">
          <button
            onClick={() => {
              setIsVoiceOpned(false);
              setTextOpned({} as text);
            }}
            className="text-tertiary text-3xl bg-tertiary/5 hover:bg-tertiary/10 rounded-full"
          >
            <IoClose />
          </button>
        </div>
        <div className="flex flex-col">
          <div className="">
            <p className="">{textOpned?.text}</p>
          </div>
          <VoicerRecorder />
        </div>
      </div>
    </div>
  );
}
