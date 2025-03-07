import React from "react";
import classes from './index.module.css'
import Text from "../Text";
import { useNavigate } from "react-router-dom";

const QAPopUp = ({ className, close }) => {
    const navigate = useNavigate()

    return (
        <>
            <div className={[className, classes.QAContainer].join(' ')}
                onClick={(e) => {e.stopPropagation()}}>
                <div className={classes.ToFAQ} onClick={() => {close(); navigate('/faq')}}>
                    <Text black>FAQ</Text>
                </div>
                <div className={classes.ToAbout} onClick={() => {close(); navigate('/about')}}>
                    <Text black>О нас</Text>
                </div>
            </div>
        </>
    )
}

export default QAPopUp