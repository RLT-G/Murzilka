import React from "react";
import classes from "./index.module.css"


const Wrapper = ({ children }) => {
    return (
        <>
            <div className={classes.Wrapper}>
                { children }
            </div>
            <video autoPlay loop muted playsInline className={classes.VideoBackground}>
                <source src="./murz.webm" type="video/mp4" />
            </video>
        </>
    )
}

export default Wrapper