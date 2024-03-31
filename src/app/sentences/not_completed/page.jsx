import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

import Sentences from "./components/Sentences";
// export async function GetSentences() {
//   const options = {
//     method: "GET",
//     url: "https://clickai-api.kurdmake.com/sentence",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + Cookies.get("auth_token"),
//     },
//   };
//   try {
//     const { data } = await axios.request(options);
//     console.log(data, "data");
//     return data;
//   } catch (error) {
//     console.log(error, "error");
//     return [];
//   }
// }
export default async function Home({ params: { condition } }) {
  // const sentencesData = await GetSentences();

  return (
    <main className="">
      <Sentences sentencesData={undefined} />
    </main>
  );
}
