"use server";
import axios from "axios";
import Cookies from "js-cookie";
export async function GetSentences() {
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
