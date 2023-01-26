import { useQuery } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAccessToken } from "../../AuthProvider";

export function SignIn() {
  const [form] = Form.useForm();
  const [accessToken, setAccessToken] = useAccessToken();
  const navigate = useNavigate();
  const { error, data, isFetching, refetch } = useQuery({
    enabled: false,
    cacheTime: 0,
    queryFn: () =>
      axios.get("http://localhost:5000/login").then((res) => res.data),
  });

  useEffect(() => {
    if (isFetching || !data || error) return;
    setAccessToken(data.data.token);
    navigate("/profile");
  }, [data, error, isFetching, navigate, setAccessToken]);

  const onFinish = (values: any) => {
    console.log(values); // these form values needs to passed to server..
    refetch();
    form.resetFields();
  };

  if (accessToken) <Navigate to="/profile" />; //already logged in

  return (
    <div className="app-sign-in">
      <Form
        form={form}
        name="login-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Email Address"
          name="emailAddress"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isFetching}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
