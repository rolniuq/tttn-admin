import { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Login } from 'services/Setting.Service';
import { SetToken } from 'services/getWays/Setting.GetWay';
import { useHistory } from 'react-router';

const LoginForm = () => {
  const [message, setMessage] = useState<String>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();

  const handleClickLogin = () => {
    if (!username || !password) {
      return;
    }
    Login(username, password)
      .then(res => {
        SetToken(res.data.token);
        history.push("/category");
      })
      .catch(() => {
        setMessage("Đăng nhập thất bại");
      });
  }

  return (
    <div className="login-page">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label="Tài khoản"
          name="username"
          rules={[
            {
              required: true,
              message: 'Tài khoản không được trống!',
            },
          ]}
        >
          <Input onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: 'Mật khẩu không được trống!',
            },
          ]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Giữ đăng nhập</Checkbox>
        </Form.Item>

        <p className="release-status">{message}</p>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={handleClickLogin}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
