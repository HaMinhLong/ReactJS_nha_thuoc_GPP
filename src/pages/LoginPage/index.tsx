import React from "react";
import { Form, Input, Button, Checkbox, Row, Col, Typography } from "antd";
import { useDispatch } from "react-redux";

import { usePostLoginMutation } from "../../api/auth";
import { useMessage } from "../../context/MessageContext";

const LoginPage = () => {
  const messageApi = useMessage();
  const dispatch = useDispatch();

  const [login, { isLoading }] = usePostLoginMutation();

  interface LoginFormValues {
    username: string;
    password: string;
    remember: boolean;
  }

  const onFinish = (values: LoginFormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    login(values).then((res: any) => {
      if (res?.error) {
        messageApi.error(res.error.data.error.message || "");
      } else {
        localStorage.setItem("accessToken", res?.data?.data?.accessToken);
        dispatch({
          type: "auth/updateAccessToken",
          payload: res?.data?.data?.accessToken,
        });
        window.location.href = "/";
      }
    });
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={6}>
        <Typography.Title level={3} className="text-semibold text-center">
          Login
        </Typography.Title>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          {/* Input cho email */}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input size="large" />
          </Form.Item>

          {/* Input cho mật khẩu */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          {/* Checkbox để ghi nhớ tài khoản */}
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          {/* Nút đăng nhập */}
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
              loading={isLoading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginPage;
