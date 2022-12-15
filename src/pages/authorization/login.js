import '../../App.css';
import {Checkbox, Col, Form, Row} from "antd";
import { InputStyled, PasswordStyled} from "../../styledAntd";
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
      <div className="animateShow">
          <div className="login">
            <h2 >Введите логин и пароль</h2>
            <div className="line"></div>
                    <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    style={{marginTop:20}}
                >
                    <Col>

                    </Col>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Введите логин' }]}
                    >
                        <Row gutter={[24,0]}>
                            <Col span={6} style={{paddingTop:5}}>
                                Логин
                            </Col>
                            <Col span={18} >
                                <InputStyled />
                            </Col>
                        </Row>


                    </Form.Item>
                    <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль' }]}
                >
                        <Row gutter={[24,0]}>
                            <Col span={6} style={{paddingTop:5}}>
                                Пароль
                            </Col>
                            <Col span={18} >
                                    <PasswordStyled />
                            </Col>
                        </Row>

                </Form.Item>
                <Form.Item>
                    <div className="wide">
                    <button className="btn-new" onClick={handleButtonClick}>
                        Войти
                    </button>
                </div>
                </Form.Item>
                <Form.Item name="remember" wrapperCol={{ span: 30 }}>
                    <Checkbox><div className="login">Запомнить меня</div></Checkbox>
                </Form.Item>
            </Form>
          </div>
      </div>
  );
}

export default Login;
