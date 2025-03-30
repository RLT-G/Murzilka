import React from "react";
import classes from './index.module.css'
import Text from "../Text";

const Footer = () => {
    return (
        <>
            <div className={classes.FooterContainer}>
                <Text bold big>СВЯЖИСЬ С НАМИ</Text>
                <div className={classes.socialButtons}>
                    <button className={classes.socialButton}>
                        <div className={classes.socialButtonBackground}></div>
                    </button>
                    <button className={classes.socialButton}>
                        <div className={classes.socialButtonBackground}></div>
                    </button>
                    <button className={classes.socialButton}>
                        <div className={classes.socialButtonBackground}></div>
                    </button>
                    <button className={classes.socialButton}>
                        <div className={classes.socialButtonBackground}></div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Footer