import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import { useAccessToken } from "../../AuthProvider";
import { SignOut } from "../authentication/SignOut";
import "./Header.css";

export function Header() {
  const navigate = useNavigate();
  const [accessToken] = useAccessToken();

  return (
    <header className="app-header">
      <Button onClick={() => navigate("/about")}>About us</Button>
      {accessToken && (
        <Button onClick={() => navigate("/profile")}>Profile</Button>
      )}
      {!accessToken && (
        <Button onClick={() => navigate("/sign-in")}>Sign in</Button>
      )}
      <SignOut />
    </header>
  );
}
