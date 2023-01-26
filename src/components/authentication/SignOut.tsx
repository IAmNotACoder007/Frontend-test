import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import axios from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAccessToken } from "../../AuthProvider";

export function SignOut() {
  const [accessToken, setAccessToken] = useAccessToken();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () => {
      return axios.delete(`http://localhost:5000/logout/${accessToken}`);
    },
  });

  const handleSignOut = useCallback(() => {
    mutation.mutate();
    setAccessToken("");
    navigate("/");
  }, [mutation, navigate, setAccessToken]);

  if (!accessToken) return null;
  return (
    <Button onClick={handleSignOut} loading={mutation.isLoading}>
      Sign out
    </Button>
  );
}
