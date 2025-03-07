import React from "react";
import classes from "./index.module.css"

const Text = ({ className, children, black, bold, big, onClick }) => {
    return (
        <>
            <span className={[
                className, 
                classes.Text,
                black && classes.black,
                bold && classes.bold,
                big && classes.big
            ].join(' ')} onClick={onClick}>{children}</span>
        </>
    )
}

export default Text