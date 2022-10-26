import '../../App.css';
import PinCodeInput from "./pincodeinput";
import {useEffect, useRef, useState} from "react";
import {Form} from "antd";

const initDigits = ['', '', '', '', ''];
export function TwoFactorsAuthentication() {

    const number = '+79999992323';
    const name = 'Иван'

    const [digits, setDigits] = useState(initDigits);

    const firstInputRef = useRef();

    const clear = (event) => {
        if (event?.key==="Backspace"){
            event.preventDefault();
            setDigits(initDigits);
            firstInputRef.current.focus();
        }
    }
    useEffect(() => {
        const onKeypress = e => clear(e);

        document.addEventListener('keydown', onKeypress, false);

        return () => {
            document.removeEventListener('keydown', onKeypress, false);
        };
    }, []);

    const hideNumber = (number, replaceTo = '*', elemsHide = 4, sliceFromback = 4) => {
        let result = number.match(/^(\(?\+?\d{1,2}\)? ?\(?\d{1,3}\)? ?\d+? ?\d+? ?\d+)$/);
        if (result !== null) {
            // тут мы выдергиваем n элементов после среза x
            const regex = new RegExp(`((\\(? ?-?\\d ??\\)?){${elemsHide}})(( ??\\d??){${sliceFromback}}$)`, 'gm');

            let m;
            while ((m = regex.exec(number)) !== null) {
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }

                const forRex = m[1];
                const str = m[1].replace(/(\d)/gm, replaceTo);
                const lasts = m[3];
                const noBack = number.slice(0, -lasts.length).slice(0, -forRex.length);
                return noBack+''+str+''+lasts;
            }
            return number;
        } else {
            return number;
        }
    }
    return (
        <div className="animateShow">
            <Form>
                <div className="hello">
                    {name && (
                        <h1 className="hello">Здравствуйте, {name}!</h1>
                    )
                    }
                <h2>Аутентификация аккаунта</h2>
                <p>
                Пожалуйста, введите код, отправленный Вам на телефон в приложении Telegram на номер {hideNumber(number)}
            </p>
            </div>
                <PinCodeInput digits={digits}
                              changeHandler={setDigits}
                              firstInputRef={firstInputRef}
                />
            </Form>
        </div>
    );
}
export default TwoFactorsAuthentication;