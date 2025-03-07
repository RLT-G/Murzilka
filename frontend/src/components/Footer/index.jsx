import React from "react";
import classes from './index.module.css'
import Text from "../Text";

const Footer = () => {
    return (
        <>
            <div className={classes.FooterContainer}>
                <Text bold big>СВЯЖИСЬ С НАМИ</Text>
                <div className={classes.socialButtons}>
                    <button className={classes.socialButton}></button>
                    <button className={classes.socialButton}></button>
                    <button className={classes.socialButton}></button>
                    <button className={classes.socialButton}></button>
                </div>
            </div>
        </>
    )
}

export default Footer