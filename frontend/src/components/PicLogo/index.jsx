import React from "react";
import classes from "./index.module.css"

const PicLogo = ({ width, height, className }) => {
    return (
        <>
            <div className={[className, classes.Logo].join(' ')}
                style={{
                    width: width,
                    height: height
                }}></div>
        </>
    )
}

export default PicLogo