import '../App.css';
import PinCodeInput from "./pincodeinput";
import {useState} from "react";

const initDigits = ['', '', '', ''];
export function TwoFactorsAuthentication() {
    let number = "+79999999999"
    const [digits, setDigits] = useState(initDigits);
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
        <div id="wrapper">
            <form>
            <h1>Аутентификация аккаунта</h1>
            <p>
                Пожалуйста, введите код, отправленный Вам на телефон в приложении Telegram на номер {hideNumber(number)}
            </p>
                <PinCodeInput digits={digits} changeHandler={setDigits} />
            </form>
        </div>
    );
}
export default TwoFactorsAuthentication;