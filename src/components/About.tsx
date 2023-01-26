import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import axios from "axios";

import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { ServerError } from "./feedback/500";

export function About() {
  useDocumentTitle("about");
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios.get("http://localhost:5000/info").then((res) => res.data),
  });

  if (isLoading) return <Spin />;
  if (error) return <ServerError />;
  return <div>{data.data.info} </div>;
}
