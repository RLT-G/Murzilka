import React, { useState } from "react";
import classes from "./index.module.css"
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import FaqData from "../../components/FaqData";
import Wrapper from "../../components/Wrapper";
import ConnectWallet from "../../components/ConnectWallet";

const Faq = () => {
    const [ connectWalletIsOpen, setConnectWalletIsOpen ] = useState(false)
    const openWalletPopUp = () => { setConnectWalletIsOpen(true) }
    const closeWalletPopUp = () => { setConnectWalletIsOpen(false) }

    
    return (
        <>
            <Wrapper>
                
                <Header openWalletPopUp={openWalletPopUp} isQA/>

                <FaqData />

                <Footer />

                <ConnectWallet onClose={closeWalletPopUp}
                    className={connectWalletIsOpen ? classes.OpenPopUp : classes.ClosePopUp}/>
            </Wrapper>
        </>
    )
}

export default Faq