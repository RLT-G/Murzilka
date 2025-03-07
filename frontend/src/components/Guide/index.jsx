import React from "react";
import classes from "./index.module.css"
import Text from "../Text";
import Button from "../Button";
import PopUpWrapper from "../PopUpWrapper";

const Guide = ({ onClose, className }) => {
    return (
        <>
            <PopUpWrapper className={className} title={"Murzilka Guide"} onClose={onClose}>
                <p><Text>&nbsp;&nbsp;&nbsp;&nbsp;Добро пожаловать в Мурзилку, старый детский журнал, где вы сможете окунуться в мир ярких картинок!</Text></p>
                <Text className={classes.TextLeft}>&nbsp;&nbsp;&nbsp;&nbsp;Стейкай MZK, получи PICS!</Text>
                <ul className={classes.List}>
                    <li><Text>&nbsp;&nbsp;&nbsp;&nbsp;Застейкайте ваши Murzlika COIN (MZK), чтобы получить PICS</Text></li>
                    <li><Text>&nbsp;&nbsp;&nbsp;&nbsp;Чем больше MZK вы стейкнете, тем больше PICS вы получите</Text></li>
                    <li><Text>&nbsp;&nbsp;&nbsp;&nbsp;Чем дольше ваши монеты остаются в стейкинге, тем больше будет буст</Text></li>
                    <li><Text>&nbsp;&nbsp;&nbsp;&nbsp;Вывел из стейкинга? Большая ошибка. вы получите ваши MZK обратно, но вы потеряете ваш картинки и рискнете вашими бустами</Text></li>
                </ul>
            </PopUpWrapper>
        </>
    )
}

export default Guide