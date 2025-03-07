import React, { useState } from "react";
import classes from './index.module.css'
import ConnectWallet from "../../components/ConnectWallet";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Wrapper from "../../components/Wrapper";

const Tasks = () => {
    const [ connectWalletIsOpen, setConnectWalletIsOpen ] = useState(false)
    const openWalletPopUp = () => { setConnectWalletIsOpen(true) }
    const closeWalletPopUp = () => { setConnectWalletIsOpen(false) }
    
    return (
        <>
            <Wrapper>
                <Header openWalletPopUp={openWalletPopUp} isTasks/>
                <Footer />
                <ConnectWallet onClose={closeWalletPopUp}
                    className={connectWalletIsOpen ? classes.OpenPopUp : classes.ClosePopUp}/>

            </Wrapper>
        </>
    )
}

export default Tasks