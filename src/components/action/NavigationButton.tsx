import { Button } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export interface NavigationButtonProp {
  name?: string;
  to?: string;
}

export function NavigationButton(props: NavigationButtonProp) {
  const { name, to } = props;
  const navigate = useNavigate();
  const handleClick = useCallback(() => navigate(to || "/"), [navigate, to]);
  return (
    <Button onClick={handleClick} type="primary">
      {name || "Back Home"}
    </Button>
  );
}
