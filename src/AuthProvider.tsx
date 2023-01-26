import React, { useContext, createContext, FC, useState } from "react";

type AccessTokenContext = [
  string,
  React.Dispatch<React.SetStateAction<string>>
];

type AccessTokenProviderProps = {
  children: React.ReactNode; // 👈️ type children
};

const AccessTokenProvider: FC<AccessTokenProviderProps> = (props) => {
  const [accessToken, setAccessToken] = useState<string>("");
  return (
    <AccessToken.Provider value={[accessToken, setAccessToken]} {...props} />
  );
};

const AccessToken = createContext<AccessTokenContext>(["", () => ""]);

const useAccessToken = (): AccessTokenContext =>
  useContext<AccessTokenContext>(AccessToken);

export { AccessTokenProvider, useAccessToken };
