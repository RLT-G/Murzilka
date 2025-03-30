import React, { useState } from "react";
import classes from "./index.module.css"
import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import Staking from "../../components/Staking";
import Footer from "../../components/Footer";
import PopUpWrapper from "../../components/PopUpWrapper";
import ConnectWallet from "../../components/ConnectWallet";
import Guide from "../../components/Guide";
import Base from "../../components/Base";
import AccountPopUp from "../../components/AccountPopUp";

const Home = () => {
    const [ connectWalletIsOpen, setConnectWalletIsOpen ] = useState(false)
    const openWalletPopUp = () => { setConnectWalletIsOpen(true) }
    const closeWalletPopUp = () => { setConnectWalletIsOpen(false) }
    
    const [ guideIsOpen, setGuideIsOpen ] = useState(false)
    const openGuide = () => {setGuideIsOpen(true)}
    const closeGuide = () => {setGuideIsOpen(false)} 
    
    const [ baseIsOpen, setBaseIsOpen ] = useState(false)
    const openBase = () => {setBaseIsOpen(true)}
    const closeBase = () => {setBaseIsOpen(false)} 

    const [ accountIsOpen, setAccountIsOpen ] = useState(false)
    const openAccount = () => { setAccountIsOpen(true) }
    const closeAccount = () => { setAccountIsOpen(false) }

    return (
        <>
            <Wrapper>
                <Header openWalletPopUp={openWalletPopUp} openAccount={openAccount} isHome/>
                <Staking openWalletPopUp={openWalletPopUp} openGuide={openGuide} openBase={openBase}/>
                <Footer />

                <ConnectWallet onClose={closeWalletPopUp}
                    className={connectWalletIsOpen ? classes.OpenPopUp : classes.ClosePopUp}/>
                <Guide onClose={closeGuide}
                    className={guideIsOpen ? classes.OpenPopUp : classes.ClosePopUp}/>
                <Base onClose={closeBase}
                    className={baseIsOpen ? classes.OpenPopUp : classes.ClosePopUp}/>
                <AccountPopUp onClose={closeAccount}
                    className={accountIsOpen ? classes.OpenPopUp : classes.ClosePopUp}/>
            </Wrapper>
        </>
    )
}

export default Home