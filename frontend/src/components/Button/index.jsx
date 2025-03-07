import React from "react";
import classes from "./index.module.css"

const Button = ({ className, onClick, children, disabled, needWallet = false }) => {
    return (
        <>
            <button className={[className, classes.Button, disabled && classes.Disabled].join(' ')}
                onClick={onClick}>
                    {needWallet && (<><div className={classes.Wallet}></div></>)}
                    {children}
            </button>
        </>
    )
}

export default Button