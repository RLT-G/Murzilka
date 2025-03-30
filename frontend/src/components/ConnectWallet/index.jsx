import React, { useContext } from "react";
import classes from "./index.module.css"
import Text from "../Text";
import Button from "../Button";
import PopUpWrapper from "../PopUpWrapper";
import { UserContext } from "../../context";
import { MetamaskService } from "../../api/MetamaskService";
import { TonkeeperService } from "../../api/TonkeeperService";
import { PhantomService } from "../../api/PhantomService";
import { TronService } from "../../api/TronService";

const ConnectWallet = ({ onClose, className }) => {
    const { isAuth, setTokens, setWallet } = useContext(UserContext);
    
    const connectMetamaskWallet = async () => {
        const { authData, walletAddress } = await MetamaskService.loginViaMetamask();

        if (authData?.access && authData?.refresh && walletAddress) {
            const newAccessToken = authData.access;
            const newRefreshToken = authData.refresh;
            setTokens(newAccessToken, newRefreshToken)
            setWallet(walletAddress, 'metamask')
            onClose()
        }
    }

    const connectTonkeeperWallet = async () => {
        // await TonkeeperService.disconnect()
        const { authData, walletAddress } = await TonkeeperService.loginViaTonkeeper();
        if (authData?.access && authData?.refresh && walletAddress) {
            const newAccessToken = authData.access;
            const newRefreshToken = authData.refresh;
            setTokens(newAccessToken, newRefreshToken)
            setWallet(walletAddress, 'tonkeeper')
            onClose()
        }
    }

    const connectTronWallet = async () => {
        const { authData, walletAddress } = await TronService.loginViaTron();
        if (authData?.access && authData?.refresh && walletAddress) {
            const newAccessToken = authData.access;
            const newRefreshToken = authData.refresh;
            setTokens(newAccessToken, newRefreshToken)
            setWallet(walletAddress, 'tron')
            onClose()
        }
    }

    const connectPhantomWallet = async () => {
        const { authData, walletAddress } = await PhantomService.loginViaPhantom();
        if (authData?.access && authData?.refresh && walletAddress) {
            const newAccessToken = authData.access;
            const newRefreshToken = authData.refresh;
            setTokens(newAccessToken, newRefreshToken)
            setWallet(walletAddress, 'phantom')
            onClose()
        }
    }

    
    return (
        <>
            <PopUpWrapper className={className} title={"Подключение кошелька"} onClose={onClose}>
                <div className={classes.WalletContainer}>
                    <div className={classes.TronContainer} onClick={connectTronWallet}>
                        <div className={classes.TronLogo}></div>
                        <Text>Tron</Text>
                    </div>

                    <div className={classes.MetamaskContainer} onClick={connectMetamaskWallet}>
                        <div className={classes.MetamaskLogo}></div>
                        <Text>Metamask</Text>
                    </div>

                    <div className={classes.tonkeeperContainer} onClick={connectTonkeeperWallet}>
                        <div className={classes.tonkeeperLogo}></div>
                        <Text>Tonkeeper</Text>
                    </div>

                    <div className={classes.phantomContainer} onClick={connectPhantomWallet}>
                        <div className={classes.phantomLogo}></div>
                        <Text>Phantom</Text>
                    </div>

                </div>
            </PopUpWrapper>
        </>
    )
}

export default ConnectWallet