"use client";
import Image from "next/image";
import { useState } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const textsToRecord: { id: number; text: string; isDone: boolean }[] = [
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
    { id: 10, text: "Im going to school to learn english", isDone: false },
  ];
  return (
    <main className="flex min-h-screen flex-col  p-16 bg-primary  text-gray-100">
      <div className="mb-5">
        <h1 className="text-6xl font-bold uppercase text-tertiary">
          voice collecter
        </h1>

        <p className="max-w-lg ">
          here are all available texts for you to record , please be somewhere
          quiet while you record so we have a better voice record.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {textsToRecord?.map((text) => {
          return (
            <div
              key={text.id}
              className="bg-secondary justify-between p-6 flex items-center rounded-md gap-5"
            >
              <div className="flex gap-1">
                <div className="">{text.id}-</div>

                <p className="">{text.text}</p>
              </div>
              {text.isDone ? (
                <div className="text-2xl text-tertiary">
                  <ImCheckboxUnchecked />
                </div>
              ) : (
                <div className="text-2xl text-tertiary">
                  <ImCheckboxChecked />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
