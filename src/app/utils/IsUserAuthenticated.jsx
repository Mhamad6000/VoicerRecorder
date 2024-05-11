"use client";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function IsUserAuthenticated({ children }) {
  const user = useQuery({
    queryKey: ["me"],
    queryFn: () => authEndpoits.getSession({}),
    // initialData: sentencesData,
  });
  return <div className="">{children}</div>;
}
