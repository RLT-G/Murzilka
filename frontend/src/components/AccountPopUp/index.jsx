import React, { useContext, useEffect } from "react";
import classes from "./index.module.css"
import Button from "../Button";
import Text from "../Text";
import { UserContext } from "../../context";
import { useState } from "react";

const AccountPopUp = ({ onClose, className }) => {
    const { logout, mzkBalance, totalMZK, totalPIC, isAuth } = useContext(UserContext);
    const [walletAddress, setWalletAddress] = useState('')
    
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
            <div className={[className, classes.AccountWrapper].join(' ')}>
                <div className={classes.AccountButtons}>
                    <Button className={classes.AccountBtn} onClick={onClose}>Закрыть</Button>
                    <Button className={classes.AccountBtn} onClick={() => {logout(); onClose()}}>Выйти</Button>
                </div>
                <div className={classes.AccountInfo}>
                    <div className={classes.Account}>
                        <div className={classes.AccountLogo}></div>
                        <div className={classes.AccountInner}>
                            <Text bold black>{walletAddress}</Text>
                            <Text black>Wallet: {mzkBalance} MZK</Text>
                        </div>
                    </div>
                    <div className={classes.AccountTotal}>
                        <div className={classes.TotalContainer}>
                            <Text black >TOTAL MZK</Text>
                            <Text black bold>{totalMZK}</Text>
                        </div>
                        <div className={classes.TotalContainer}>
                            <Text black >TOTAL PIC</Text>
                            <Text black bold>{totalPIC}</Text>
                        </div>
                    </div>
                    {/* <Button>MANAGE LINKED WALLETS</Button> */}
                    <Button>UNSTAKE</Button>
                </div>

                <div className={classes.AccountInfo2}>
                    <Text black bold>Base: 1 PIC / MZK</Text>
                </div>

            </div>
        </>
    )
}

export default AccountPopUp