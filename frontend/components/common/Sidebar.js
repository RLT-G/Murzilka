'use client';
import {Button, useDisclosure} from "@nextui-org/react";
import {Icon} from "@/components/common/Icon";
import sidebarActions from "@/actions/sidebar";
import {useSidebarOpen} from "@/store";
import {Footer} from "@/components/sidebarComponents/Footer";
import {isMobile} from "react-device-detect";
import {ModalPage} from "@/components/common/modalPage";
import {UserMenuModal} from "@/components/common/UserMenuModal";
import {UserMenu} from "@/components/common/UserMenu";
import {MobileMenu} from "@/components/common/MobileMenu";

export const Sidebar = ({openMenu, setOpenMenu}) => {
    const isOpen = useSidebarOpen();
    const WalletDisclosure = useDisclosure();

    return (
        <>
            <style>{
                openMenu ?
                    `body {
                        overflow: hidden;
                    }` :
                    ''}</style>
            <div
                className={`${openMenu ? ' activeSideBar' : 'sideBar'} sidenav z-[999] `}
                style={{flex: 1}}
            >
                <div className={'flex flex-col w-full h-full gap-6 right-2'}>
                    <div className={"inline-flex place-items-center gap-4 h-9 w-full"}>
                        <div className={"text-white font-medium flex text-lg text-start w-[90%]"}>{!isMobile && 'Кошелек'} </div>
                        <Button isIconOnly
                                size={'sm'}
                                className={'w-[10%] p-0 border-white'}
                                variant={'bordered'}
                                onClick={() => {
                                    setOpenMenu(!openMenu)
                                    sidebarActions.setSidebarOpen(!isOpen);
                                }}
                        >
                            <Icon name={"cross"} className={"w-[20px] h-[20px]"}/>
                        </Button>
                    </div>
                    {isMobile ?
                        <MobileMenu WalletDisclosure={WalletDisclosure}/>
                        :
                        <UserMenu/>
                    }
                </div>
                <Footer/>
            </div>
            <ModalPage isOpen={WalletDisclosure.isOpen} onOpenChange={WalletDisclosure.onOpenChange}
                       Component={UserMenuModal} placement={"bottom-center"}/>
        </>
    );
};
