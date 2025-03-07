import React, { useState } from "react";
import classes from "./index.module.css"
import Wrapper from "../../components/Wrapper";
import ConnectWallet from "../../components/ConnectWallet";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AboutData from "../../components/AboutData";

const About = () => {
    const [ connectWalletIsOpen, setConnectWalletIsOpen ] = useState(false)
    const openWalletPopUp = () => { setConnectWalletIsOpen(true) }
    const closeWalletPopUp = () => { setConnectWalletIsOpen(false) }
    
    return (
        <>
            <Wrapper>
                <Header openWalletPopUp={openWalletPopUp} isQA/>
                <AboutData />
                <Footer />

                <ConnectWallet onClose={closeWalletPopUp}
                    className={connectWalletIsOpen ? classes.OpenPopUp : classes.ClosePopUp}/>
            </Wrapper>
        </>
    )
}

export default About