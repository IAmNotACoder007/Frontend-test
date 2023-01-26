import { Result } from "antd";

import { NavigationButton } from "../action/NavigationButton";

export function ServerError() {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<NavigationButton />}
    />
  );
}
