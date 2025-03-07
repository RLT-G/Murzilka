import React, { useContext } from "react";
import classes from "./index.module.css"
import Text from "../Text";
import Button from "../Button";
import PopUpWrapper from "../PopUpWrapper";
import { UserContext } from "../../context";
import { MetamaskService } from "../../api/MetamaskService";

const ConnectWallet = ({ onClose, className }) => {
    const { isAuth, setTokens, setWallet } = useContext(UserContext);

    
    const connectMetamaskWallet = async () => {
        const { authData, walletAddress } = await MetamaskService.loginViaMetamask();

        if (authData?.access && authData?.refresh && walletAddress) {
            const newAccessToken = authData.access;
            const newRefreshToken = authData.refresh;
            setTokens(newAccessToken, newRefreshToken)
            setWallet(walletAddress)
            onClose()
        }
    }

    return (
        <>
            <PopUpWrapper className={className} title={"Подключение кошелька"} onClose={onClose}>
                <div className={classes.WalletContainer}>
                    <div className={classes.TronContainer}>
                        <div className={classes.TronLogo}></div>
                        <Text>Tron</Text>
                    </div>

                    <div className={classes.MetamaskContainer} onClick={connectMetamaskWallet}>
                        <div className={classes.MetamaskLogo}></div>
                        <Text>Metamask</Text>
                    </div>

                    <div className={classes.tonkeeperContainer}>
                        <div className={classes.tonkeeperLogo}></div>
                        <Text>Tonkeeper</Text>
                    </div>

                </div>
            </PopUpWrapper>
        </>
    )
}

export default ConnectWallet