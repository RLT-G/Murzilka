import React from "react";
import classes from "./index.module.css"
import Text from "../Text";
import Button from "../Button";
import PopUpWrapper from "../PopUpWrapper";

const Base = ({ onClose, className }) => {
    return (
        <>
            <PopUpWrapper className={className} title={"BASE"} onClose={onClose}>
                <p><Text>&nbsp;&nbsp;&nbsp;&nbsp;При стейкинге ваши PICS каждый день умножаются на выделенный процент APR</Text></p>
                <p><Text>&nbsp;&nbsp;&nbsp;&nbsp;Новые PICS начинают капать на счет только через день после вноса их в стейкинг</Text></p>
            </PopUpWrapper>
        </>
    )
}

export default Base