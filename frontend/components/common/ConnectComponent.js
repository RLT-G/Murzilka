import {Button, ModalBody, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import {WalletItem} from "@/components/modalComponents/WalletItem";
import {useRouter} from "next/navigation";
import profileActions from "@/actions/profile";
import {useWallet} from "@tronweb3/tronwallet-adapter-react-hooks";
import {useEffect, useState} from "react";
import {CheckCookieCallback} from "@/plugins/callbacks";
import {ModalPage} from "@/components/common/modalPage";
import {UninstalledComponent} from "@/components/common/UninstalledComponent";
import loginWithMetaMask from "@/services/metamask";
import tonkeeperAuth from "@/services/tonkeeper";
import { TonConnect } from "@tonconnect/sdk";
import connectWallet from "@/services/tron";


export const ConnectComponent = ({onClose}) => {
    const router = useRouter();
    const {address, connected, select, disconnect} = useWallet();
    const uninstalledDisclosure = useDisclosure();
    
    const handleConnectTron = async () => {
        if (typeof window.tronLink === 'undefined') {
            uninstalledDisclosure.onOpen()
            return
        }

        await select('TronLink')
        onClose();
        router.refresh();
    }

    // const [tonConnect, setTonConnect] = useState(null);
    // function connectToTonkeeper(tonConnect) {
    //     try {
    //         tonConnect.connect({
    //             universalLink: 'https://app.tonkeeper.com/ton-connect',
    //             bridgeUrl: 'https://bridge.tonapi.io/bridge'
    //         });
    
    //         console.log('Успешное подключение к Tonkeeper');
    //     } catch (error) {
    //         console.error('Ошибка подключения TonKeeper', error);
    //     }
    // }
    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         const tonConnect = new TonConnect()
    //         connectToTonkeeper(tonConnect)
    //         setTonConnect(tonConnect);
    //     }
    // }, []);
    
    useEffect(() => {
        if (connected) {
            profileActions.authProfile(address).then(() => {
                CheckCookieCallback().then()
            }).catch((e) => {
                if (e?.response?.status === 404) {
                    profileActions.createProfile(address).then()
                    CheckCookieCallback().then()
                } else {
                    disconnect().then()
                }

            })
        }
    }, [connected])

    return <>
        <ModalHeader className="text-white text-center">
            <div className={"my-0 mx-auto"}>Подключение кошелька</div>
        </ModalHeader>
        <ModalBody>
            <div className={"flex flex-col gap-3 text-white"}>
                {/*<WalletItem handleConnect={handleConnect} iconName={"ton"} title={"Tonkeeper"}*/}
                {/*            className={"h-[25px] w-[25px]"}/>*/}
                <WalletItem handleConnect={handleConnectTron} iconName={"tron"}
                            title={"Tron"}
                            className={"h-[30px] w-[30px]"}/>

                <button
                    style={{display: "flex", justifyContent: "start"}}

                    onClick={() => {loginWithMetaMask()}}
                    >MetaMask</button>
                <button
                    style={{display: "flex", justifyContent: "start"}}

                    onClick={() => {tonkeeperAuth(tonConnect)}}
                    >TonKeeper</button>
                <button
                    style={{display: "flex", justifyContent: "start"}}

                    onClick={() => {connectWallet()}}
                    >Tron</button>
            </div>
        </ModalBody>
        <ModalFooter>
            <Button variant={'faded'} onPress={onClose}
                    className={"bg-[#E17777] border-black border-[1px] text-white btn"}>
                Закрыть
            </Button>
        </ModalFooter>
        <ModalPage isOpen={uninstalledDisclosure.isOpen} onOpenChange={uninstalledDisclosure.onOpenChange}
                   Component={UninstalledComponent}/>
    </>
}