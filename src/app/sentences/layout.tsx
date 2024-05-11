"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import VoicerRecorder from "./components/VoiceRecorder";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { authEndpoits } from "../lib/endpoints";

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
  const [isVoiceOpned, setIsVoiceOpned] = useState(false);
  const [textOpned, setTextOpned] = useState<text>();
  const router = useRouter();
  const user = useQuery({
    queryKey: ["me"],
    queryFn: () => authEndpoits.getSession({}),
    // initialData: sentencesData,
  });

  if (!user.data?.session && !user.isLoading) {
    router.push("/auth/login");
  }
  return (
    <div className="grid grid-cols-12 min-h-screen  bg-primary  text-gray-100 max-w-7xl mx-auto">
      <div className={`flex flex-col col-span-12`}>
        <div className="mb-8">
          <p className="max-w-lg ">
            here are all available texts for you to record , please be somewhere
            quiet while you record so we have a better voice record.
          </p>
        </div>
        <Navbar />
        <div>{children}</div>
      </div>
      {/* <div className={`bg-secondary p-6 ${isVoiceOpned ? "col-span-4" : ""}`}>
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
      </div> */}
    </div>
  );
}
