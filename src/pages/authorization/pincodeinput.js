import { useRef, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import {urls} from "../../routes/urls";
import appGlobalStore from "../../store/AppGlobalStore";
export default function PinCodeInput(props) {
    const {
        digits,
        changeHandler,
        firstInputRef
    } = props;
    const navigateTo = useNavigate();

    useEffect(() => {
        inputRefs.current[0].focus();
        firstInputRef.current = inputRefs.current[0];
    }, [firstInputRef]);
    const length = digits.length;
    // здесь будут ссылки на input-элементы
    const inputRefs = useRef([]);

    // при монтировании компонента фокус на первое поле
    useEffect(() => {
        inputRefs.current[0].focus();
    }, []);

    // поля подсвечиваем красным (ошибка) или зеленым
    useEffect(() => {
        digits.forEach((value, index) => {
            if (value.match(/^[0-9]$/)) {
                inputRefs.current[index].style.backgroundColor = '#c6f7ee';
                // inputRefs.current[index].style.border= 'hidden';
            } else {
                inputRefs.current[index].style.backgroundColor = 'rgb(246 249 248)';
            }
        });
    }, [digits]);

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace') {
            event.preventDefault();
            if (digits[index].match(/^[0-9]$/)) {
                // если элемент массива digits содержит цифру, то при нажатии клавиши
                // вызываем callback-функцию родителя, чтобы записать пустую строку
                const newDigits = [...digits]; // копия digits
                newDigits[index] = '';
                changeHandler(newDigits);
            } else {
                // элемент массива digits пустой, удалять нечего — так что надо сместить
                // фокус на предыдущее поле input — при условии, что это не первое поле
                if (index > 0) inputRefs.current[index - 1].focus();
            }
        }
    }

    const handleChange = (index, newValue) => {
        const oldDigit = digits[index];
        // старую цифру в поле ввода убираем, оставляя только новую
        const newDigit = newValue.trim().replace(oldDigit, '');
        // если это не цифра, ничего не делаем, пока не будет цифры
        if (newDigit < '0' || newDigit > '9') return;
        // теперь вызываем callback родителя, чтобы обовить digits
        const newDigits = [...digits]; // копия digits
        newDigits[index] = newDigit;
        changeHandler(newDigits);
        // смещаем фокус на следующее поле для ввода следующей цифры
        if (index < length - 1) {
            inputRefs.current[index + 1].focus();
        } else { // проверка кода и переход на последнюю страницу, если это было последнее поле

            //Здесь должна быть проверка кода
            navigateTo(urls.objects)
        }
    }
    const divStyle = {
        margin: '10px',
        textAlign: "center",
        padding:0,
    };

    return (
        <div style={divStyle}>
            {digits.map((digit, index) => (
                <input
                    className="pincode"
                    key={index}
                    value={digit}
                    onChange={event => handleChange(index, event.target.value)}
                    onKeyDown={event => handleKeyDown(index, event)}
                    ref={element => inputRefs.current[index] = element}
                />
            ))}
        </div>
    );
}