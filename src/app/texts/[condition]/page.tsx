"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { useSearchParams } from "next/navigation";
import { voiceOpnedContext } from "./layout";
import Link from "next/link";

export default function Home({
  params: { condition },
}: {
  params: { condition: string };
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { isVoiceOpned, setIsVoiceOpned, textOpned, setTextOpned } =
    useContext<any>(voiceOpnedContext);
  const textsToRecord: { id: number; text: string; isDone: boolean }[] =
    condition == "all"
      ? [
          { id: 1, text: "hello world", isDone: false },
          {
            id: 2,
            text: "Welcome to our website, we are happy to have you here.",
            isDone: true,
          },
          { id: 3, text: "Have a great day!", isDone: false },
          { id: 4, text: "Good Morning", isDone: true },
          { id: 5, text: "Im a proggramer", isDone: true },
          {
            id: 6,
            text: "JavaScript is the best proggraming language in the wolrd.",
            isDone: true,
          },
          { id: 7, text: "What are you going to do today", isDone: false },
          {
            id: 8,
            text: "Oh there is an earthquake going around here!",
            isDone: false,
          },
          { id: 9, text: "Can you give me that cup", isDone: true },
          {
            id: 10,
            text: "Im going to school to learn english",
            isDone: false,
          },
        ]
      : condition == "done"
      ? [
          {
            id: 2,
            text: "Welcome to our website, we are happy to have you here.",
            isDone: true,
          },

          { id: 4, text: "Good Morning", isDone: true },
          { id: 5, text: "Im a proggramer", isDone: true },
          {
            id: 6,
            text: "JavaScript is the best proggraming language in the wolrd.",
            isDone: true,
          },

          { id: 9, text: "Can you give me that cup", isDone: true },
        ]
      : condition == "pending"
      ? [
          { id: 1, text: "hello world", isDone: false },
          { id: 3, text: "Have a great day!", isDone: false },
          { id: 7, text: "What are you going to do today", isDone: false },
          {
            id: 8,
            text: "Oh there is an earthquake going around here!",
            isDone: false,
          },
          {
            id: 10,
            text: "Im going to school to learn english",
            isDone: false,
          },
        ]
      : [];
  return (
    <main className="">
      <div className="flex flex-col gap-3 mb-5">
        {textsToRecord?.map((text) => {
          return (
            <button
              onClick={() => {
                setIsVoiceOpned(true);
                setTextOpned(text);
              }}
              key={text.id}
              className="bg-secondary justify-between p-6 flex items-center rounded-md gap-5"
            >
              <div className="flex gap-1">
                <div className="">{text.id}-</div>

                <p className="">{text.text}</p>
              </div>
              {text.isDone ? (
                <div className="text-2xl text-tertiary">
                  <ImCheckboxChecked />
                </div>
              ) : (
                <div className="text-2xl text-tertiary">
                  <ImCheckboxUnchecked />
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="flex justify-center">
        <div className="join  gap-2 ">
          <Link
            href={`/texts/${condition}?page=${
              Number(searchParams.get("page") || 1) - 1
            }`}
            className={`join-item btn border-none ${
              (Number(searchParams.get("page")) || 1) == 1
                ? "hidden"
                : "bg-secondary/60 text-white hover:bg-secondary"
            } `}
          >
            prev
          </Link>
          <Link
            href={`/texts/${condition}?page=${1}`}
            className={`join-item btn border-none text-white hover:bg-secondary ${
              (Number(searchParams.get("page")) || 1) == 1
                ? "btn-disabled !bg-tertiary/80  !text-primary"
                : "text-white hover:bg-secondary bg-secondary/60"
            }`}
          >
            1
          </Link>
          <Link
            href={`/texts/${condition}?page=${2}`}
            className={`join-item btn border-none text-white hover:bg-secondary ${
              Number(searchParams.get("page")) == 2
                ? "btn-disabled !bg-tertiary/80  !text-primary"
                : "text-white hover:bg-secondary bg-secondary/60"
            }`}
          >
            2
          </Link>
          <Link
            href={`/texts/${condition}?page=${3}`}
            className={`join-item btn border-none text-white hover:bg-secondary ${
              Number(searchParams.get("page")) == 3
                ? "btn-disabled !bg-tertiary/80  !text-primary"
                : "text-white hover:bg-secondary bg-secondary/60"
            }`}
          >
            3
          </Link>
          <Link
            href={`/texts/${condition}?page=${4}`}
            className={`join-item btn border-none text-white hover:bg-secondary ${
              Number(searchParams.get("page")) == 4
                ? "btn-disabled !bg-tertiary/80  !text-primary"
                : "text-white hover:bg-secondary bg-secondary/60"
            }`}
          >
            4
          </Link>
          <Link
            href={`/texts/${condition}?page=${5}`}
            className={`join-item btn  border-none  ${
              Number(searchParams.get("page")) == 5
                ? "btn-disabled !bg-tertiary/80  !text-primary"
                : "text-white hover:bg-secondary bg-secondary/60"
            }`}
          >
            5
          </Link>
          <Link
            href={`/texts/${condition}?page=${
              Number(searchParams.get("page") || 1) + 1
            }`}
            className={`join-item btn border-none ${
              (Number(searchParams.get("page")) || 1) == 5
                ? "hidden"
                : "bg-secondary/60 text-white hover:bg-secondary"
            }`}
          >
            next
          </Link>
        </div>
      </div>
    </main>
  );
}
