import React, { useContext, useEffect, useState } from "react";
import classes from "./index.module.css"
import Text from "../Text";
import Logo from "../Logo";
import Button from "../Button";
import QAPopUp from "../QAPopUp";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";

const Header = ({ openWalletPopUp, isHome, isQA, isTasks, openAccount }) => {
    const { isAuth } = useContext(UserContext);
    const [walletAddress, setWalletAddress] = useState('')
    
    const navigate = useNavigate()

    const [QAIsOpen, setQAIsOpen] = useState(false)
    const handleQAPopUp = () => {
        if (QAIsOpen) { setQAIsOpen(false) }
        else { setQAIsOpen(true) }
    }
    
    const shortenString = (str) => {
        if (!str) { return }
        if (str.length <= 8) {
            return str;
        }
        return str.slice(0, 5) + "..." + str.slice(-3);
    }
    useEffect(() => {
        if (isAuth) {
            setWalletAddress(shortenString(localStorage.getItem('walletAddress')))
        } else {
            setWalletAddress('')
        }
    }, [isAuth])

    return (
        <>
            <div className={classes.HeaderContainer}>
                <Logo className={classes.Logo} width={'50px'} height={'50px'}/>
                <div className={classes.headerNavBarContainer}>
                    <div className={classes.headerNavBar}>
                        <Text className={[classes.NavBarText, isHome && classes.currentPage].join(' ')} onClick={() => {navigate('/')}}>ДОМ</Text>
                        <Text className={[classes.NavBarText, isTasks && classes.currentPage].join(' ')} onClick={() => {navigate('/tasks')}}>ЗАДАНИЯ</Text>
                        <Text className={[classes.NavBarText, isQA && classes.currentPage].join(' ')} onClick={handleQAPopUp}>Q&A
                            <QAPopUp className={QAIsOpen ? classes.OpenPopUp : classes.ClosePopUp} close={() => {setQAIsOpen(false)}}/>
                        </Text>
                    </div>
                </div>
                {isAuth && <Button className={classes.ConnectWalletBtn} needWallet={true} onClick={() => {openAccount()}}>{walletAddress}</Button>}
                {!isAuth && <Button className={classes.ConnectWalletBtn} needWallet={true} onClick={openWalletPopUp}>Подключить</Button>}
            </div>
        </>
    )
}

export default Header