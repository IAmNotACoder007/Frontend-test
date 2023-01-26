import { Result } from "antd";

import { NavigationButton } from "../action/NavigationButton";

export function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<NavigationButton />}
    />
  );
}
