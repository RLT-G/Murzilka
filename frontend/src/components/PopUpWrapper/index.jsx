import React from "react";
import classes from "./index.module.css"
import Text from "../Text";
import Button from "../Button";

const PopUpWrapper = ({ title, children, onClose, className }) => {
    return (
        <>
            <div className={[className, classes.PopUpWrapper].join(' ')}>
                <div className={classes.PopUp}>
                    <Text bold>{ title }</Text>
                    { children }
                    <Button className={classes.CloseButton} onClick={onClose}>Закрыть</Button>
                    <button className={classes.CloseButton2} onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="10" height="10" viewBox="0,0,256,256">
                            <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}>
                                <g transform="scale(5.12,5.12)">
                                    <path d="M7.71875,6.28125l-1.4375,1.4375l17.28125,17.28125l-17.28125,17.28125l1.4375,1.4375l17.28125,-17.28125l17.28125,17.28125l1.4375,-1.4375l-17.28125,-17.28125l17.28125,-17.28125l-1.4375,-1.4375l-17.28125,17.28125z"></path>
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default PopUpWrapper