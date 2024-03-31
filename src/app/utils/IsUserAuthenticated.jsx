import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import axios from "axios";
// export async function GetSentences({ page }) {
//   const options = {
//     method: "GET",
//     url: `https://clickai-api.kurdmake.com/sentence?perPage=20&page=${
//       page || 1
//     }`,
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
//     if (error?.response?.data?.error?.code == "INVALID_TOKEN") {
//       Cookies.remove("auth_token");
//       redirect("/auth/login");
//     }

//     return [];
//   }
// }
export default function IsUserAuthenticated({ children }) {
  return <div className="">{children}</div>;
}
