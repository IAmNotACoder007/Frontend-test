import { useQuery } from "@tanstack/react-query";
import { Avatar, Spin } from "antd";
import axios from "axios";

import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { ServerError } from "../feedback/500";
import { Quote } from "../quote/Quote";
import "./Profile.css";

export function Profile() {
  useDocumentTitle("profile");
  const { isLoading, error, data } = useQuery({
    queryKey: ["profileData"],
    queryFn: () =>
      axios.get(`http://localhost:5000/profile`).then((res) => res.data),
  });

  if (isLoading) return <Spin />;
  if (error) return <ServerError />;
  return (
    <div className="app-profile">
      <div className="app-profile__user">
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
        <div className="app-profile__user-data">
          <h1>Welcome, {data.data.fullname} </h1>
          <Quote />
        </div>
      </div>
      <p>placeholder</p>
    </div>
  );
}
