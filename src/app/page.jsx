import { cookies } from "next/headers";
import { globalEndpoits } from "./lib/endpoints";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { RiInboxArchiveLine, RiInboxArchiveFill } from "react-icons/ri";
export async function GetCategories() {
  const options = {
    method: "GET",
    url: "https://clickai-api.kurdmake.com/sentence/",
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
  console.log(categories?.categories[0]);
  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8 lg:p-12 bg-primary  text-gray-100 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold">Welcome to the Voice Recorder</h1>
      <p className="mt-4 text-lg mb-5">
        You can click one of the categories below to get related texts to
        record.
      </p>
      {/* <div className="flex flex-col gap-3">
        {categories?.categories?.map((catagory, index) => {
          return (
            <Link
              href={``}
              key={catagory?.id}
              className="bg-secondary justify-between p-4 flex items-center rounded-md gap-5"
            >
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 text-lg">
                  <div className="">{index + 1}-</div>

                  <h1 className="">{catagory?.name}</h1>
                </div>
                <p className="text-white/40 text-sm">{catagory?.description}</p>
                <div className="text-sm flex gap-1">
                  <span className="">related Sentence:</span>
                  <span className="text-tertiary">
                    {catagory?._count?.sentences}
                  </span>
                </div>
              </div>

              {catagory?.archived ? (
                <div className="text-2xl text-tertiary">
                  <RiInboxArchiveFill />
                </div>
              ) : (
                <div className="text-2xl text-tertiary">
                  <RiInboxArchiveLine />
                </div>
              )}
            </Link>
          );
        })}
      </div> */}
    </main>
  );
}
