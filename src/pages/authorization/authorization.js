import 'antd/dist/antd.min.css';
import '../../App.css';
import {useNavigate} from "react-router-dom";
import Header from "../../components/header";
import {Button, Checkbox, Form, Input} from "antd";
function Authorization() {
  const navigateTo = useNavigate();

  const someGuy = {
      id:1253234,
      name:'Ivan',
      number:'+79993453384'
  }

  const handleButtonClick = () => {
      navigateTo(`${someGuy.id}/two-factors-authentication/`)
  }
  return (
      <>
          <Header />
        <div id="wrapper">
                    <h2>Введите логин и пароль</h2>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={handleButtonClick}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
      </>
  );
}

export default Authorization;
