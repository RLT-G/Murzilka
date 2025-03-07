import React from "react";
import classes from "./index.module.css"

const Logo = ({ width, height }) => {
    return (
        <>
            <div className={classes.Logo}
                style={{
                    width: width,
                    height: height
                }}></div>
        </>
    )
}

export default Logo