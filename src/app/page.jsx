import { cookies } from "next/headers";
import { globalEndpoits } from "./lib/endpoints";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { RiInboxArchiveLine, RiInboxArchiveFill } from "react-icons/ri";
export async function GetCategories() {
  const options = {
    method: "GET",
    url: "https://clickai-api.kurdmake.com/category/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Cookies.get("auth_token"),
    },
  };
  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const categories = await GetCategories();

  return (
    <main className="flex min-h-screen flex-col py-10 px-4 md:px-8 lg:px-12 bg-primary  text-gray-100 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold">Welcome to the Voice Recorder</h1>
      <p className="mt-4 text-lg mb-5">
        You can record your voice and save it to the database. click on the link
        below to see all the texts.
      </p>
      <Link href="/sentences/all">all texts</Link>
    </main>
  );
}
