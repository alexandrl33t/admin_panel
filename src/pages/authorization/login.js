import 'antd/dist/antd.min.css';
import '../../App.css';
import {Button, Checkbox, Col, Form, Input, Row} from "antd";
function Login(state) {
  const {setLogin} = state;
  // const someGuy = {
  //     id:1253234,
  //     name:'Ivan',
  //     number:'+79993453384'
  // };

  const handleButtonClick = () => {
      //Какая-то проверка
      setLogin(true)
  };
  return (
      <>
            <h2>Введите логин и пароль</h2>
                    <Form
                    name="basic"
                    labelCol={{span: 4}}
                    wrapperCol= {{span: 16}}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Логин"
                        name="username"
                        rules={[{ required: true, message: 'Введите логин' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Row gutter={5}>
                    <Col offset={8}>
                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ span: 30 }}>
                            <Checkbox>Запомнить меня</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item wrapperCol={{span: 16 }}>
                        <Button type="primary" htmlType="submit" onClick={handleButtonClick}>
                            Войти
                        </Button>
                    </Form.Item>
                    </Col>

                </Row>

            </Form>
      </>
  );
}

export default Login;
