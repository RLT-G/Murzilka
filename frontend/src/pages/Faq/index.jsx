import React, { useState } from "react";
import classes from "./index.module.css"
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import FaqData from "../../components/FaqData";
import Wrapper from "../../components/Wrapper";
import ConnectWallet from "../../components/ConnectWallet";
import AccountPopUp from "../../components/AccountPopUp";

const Faq = () => {
    const [ connectWalletIsOpen, setConnectWalletIsOpen ] = useState(false)
    const openWalletPopUp = () => { setConnectWalletIsOpen(true) }
    const closeWalletPopUp = () => { setConnectWalletIsOpen(false) }
    
    const [ accountIsOpen, setAccountIsOpen ] = useState(false)
    const openAccount = () => { setAccountIsOpen(true) }
    const closeAccount = () => { setAccountIsOpen(false) }
    
    return (
        <>
            <Wrapper>
                
                <Header openWalletPopUp={openWalletPopUp} openAccount={openAccount} isQA/>

                <FaqData />

                <Footer />

                <ConnectWallet onClose={closeWalletPopUp}
                    className={connectWalletIsOpen ? classes.OpenPopUp : classes.ClosePopUp}/>
                <AccountPopUp onClose={closeAccount}
                    className={accountIsOpen ? classes.OpenPopUp : classes.ClosePopUp}/>
            </Wrapper>
        </>
    )
}

export default Faq