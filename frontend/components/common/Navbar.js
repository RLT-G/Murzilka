"use client"
import {useEffect, useState} from "react";
import {Icon} from "@/components/common/Icon";
import {
    Button,
    DropdownTrigger,
    useDisclosure,
    DropdownMenu,
    DropdownItem,
    Dropdown
} from "@nextui-org/react";
import {Sidebar} from "@/components/common/Sidebar";
import {useAllProjectNames, useProfile, useSidebarOpen} from "@/store";
import sidebarActions from "@/actions/sidebar";
import {ModalPage} from "@/components/common/modalPage";
import {ConnectComponent} from "@/components/common/ConnectComponent";
import {useRouter} from "next/navigation";
import {ImageWithBorder} from "@/components/common/ImageWithBorder";
import {useWallet} from "@tronweb3/tronwallet-adapter-react-hooks";
import {isMobile} from "react-device-detect";

export function Navbar() {
    const isSideBarOpen = useSidebarOpen();
    const [active, setActive] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    // const names = useAllProjectNames();
    const router = useRouter();
    const {address, connected} = useWallet();

    // useEffect(() => {
    //     projectActions.getAllNames().then();
    // }, [])

    const handleOpenBinance = () => {
        window.open("https://www.binance.com/ru");
    }

    const handleOpened = () => {
        onOpen()
    }

    useEffect(() => {
        setActive(sessionStorage.getItem("page"))
    }, [])

    useEffect(() => {
        setOpenMenu(isSideBarOpen)
    }, [isSideBarOpen])


    return (
        <nav className={`w-full h-[7vh] bg-neutral-900/[.75] flex py-8 md:px-10`}>
            <div className={"menu-box"}>
                <div className={"cursor-pointer min-w-[90px] md:min-w-[70px]"} onClick={() => router.push('/')}>
                    < ImageWithBorder url={"../assets/murzilka_logo.png"} height={50} width={70}
                                      classNameCard={"mr-10 bg-[#360606] rounded-[100px]"}/>
                </div>
                <div className="nav-elems">
                    {!isMobile &&
                        <>
                            <Button data-hover={false} variant="light" onClick={() => router.push('/')}
                                    className={active === 'main' ? "text-[#D25F5F]" : "text-white "}>
                                ДОМ
                            </Button>

                            {/*<Dropdown className={"border-solid border-black border-[2px] mt-3"}>*/}
                            {/*    <DropdownTrigger>*/}
                            {/*        <Button data-hover={false} variant="light" className={"text-white"}>ПРОЕКТЫ</Button>*/}
                            {/*    </DropdownTrigger>*/}
                            {/*    <DropdownMenu variant="flat" aria-label="Link Actions">*/}
                            {/*        {names.map((item) =>*/}
                            {/*            <DropdownItem data-hover={true}*/}
                            {/*                          className={active === `${item.name}` ? "text-[#D25F5F]" : "text-black"}*/}
                            {/*                          key={item.name}*/}
                            {/*                          href={`/${encodeURIComponent(item.name)}`}>{item.name}*/}
                            {/*            </DropdownItem>)}*/}
                            {/*    </DropdownMenu>*/}
                            {/*</Dropdown>*/}

                            {/*<Dropdown className={"border-solid border-black border-[2px] mt-3"}>*/}
                            {/*    <DropdownTrigger>*/}
                            {/*        <Button data-hover={false} variant="light" className={"text-white"}>MZK</Button>*/}
                            {/*    </DropdownTrigger>*/}
                            {/*    <DropdownMenu variant="flat" aria-label="Link Actions">*/}
                            {/*        <DropdownItem data-hover={true}*/}
                            {/*                      className={"text-black"} key="Заклеймить"*/}
                            {/*                      onClick={handleOpenBinance}>*/}
                            {/*            <div className={"flex flex-row justify-between place-items-end"}>*/}
                            {/*                <div>Заклеймить</div>*/}
                            {/*                <Icon name={'backtab'} className={"w-[22px] h-[22px]"}/>*/}
                            {/*            </div>*/}
                            {/*        </DropdownItem>*/}
                            {/*        <DropdownItem data-hover={true}*/}
                            {/*                      className={"text-black"} key="Купить"*/}
                            {/*                      onClick={handleOpenBinance}>*/}
                            {/*            <div className={"flex flex-row justify-between place-items-end"}>*/}
                            {/*                <div>Купить</div>*/}
                            {/*                <Icon name={'backtab'} className={"w-[22px] h-[22px]"}/>*/}
                            {/*            </div>*/}
                            {/*        </DropdownItem>*/}
                            {/*    </DropdownMenu>*/}
                            {/*</Dropdown>*/}

                            <Button data-hover={false} variant="light" onClick={() => router.push('/tasks')}
                                    className={active === 'tasks' ? "text-[#D25F5F]" : "text-white "}>
                                ЗАДАНИЯ
                            </Button>


                            <Dropdown className={"border-solid border-black border-[2px] mt-3"}>
                                <DropdownTrigger>
                                    <Button data-hover={false} variant="light" className={"text-white"}>Q&A</Button>
                                </DropdownTrigger>
                                <DropdownMenu variant="flat" aria-label="Link Actions">
                                    <DropdownItem data-hover={true}
                                                  className={active === 'faq' ? "text-[#D25F5F]" : "text-black"}
                                                  key="home"
                                                  href="/faq">
                                        FAQ
                                    </DropdownItem>
                                    <DropdownItem data-hover={true}
                                                  className={active === 'about' ? "text-[#D25F5F]" : "text-black"}
                                                  key="about"
                                                  href="/about">
                                        О НАС
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </>
                    }
                </div>
                {!connected ?
                    <Button size={'md'}
                            className={"bg-[#E17777] w-[800px] md:w-fit border-black border-[1px] text-white btn"}
                            onClick={handleOpened}>
                        <div className={"p-3 flex gap-[6px] justify-center items-center"}>
                            <Icon name={'wallet'} className={'fill-white w-[31px] h-[29px]'}/>
                            <div className={"font-medium"}>Подключить</div>
                        </div>
                    </Button>
                    :
                    !isMobile && <Button size={'md'}
                            className={"bg-[#E17777] min-w-[154px] border-black border-[1px] text-white btn"}
                            onClick={() => {
                                setOpenMenu(!openMenu)
                                sidebarActions.setSidebarOpen(!isSideBarOpen)
                            }}>
                        <div className={"p-3 inline-flex gap-3 justify-center items-center"}>
                            <Icon name={'wallet'} className={"w-[31px] h-[29px]"}/>
                            <div className={"font-medium"}>{address?.slice(0, 10)}...</div>
                        </div>
                    </Button>
                }
                {isMobile && <Button size={'md'}
                                     isIconOnly
                                     className={"bg-[#E17777] btn"}
                                     onClick={() => {
                                         setOpenMenu(!openMenu)
                                         sidebarActions.setSidebarOpen(!isSideBarOpen)
                                     }}>
                    <Icon name={'burger'} className={"fill-white stroke-white w-[30px] h-[30px]"}/>
                </Button>}
            </div>
            <ModalPage isOpen={isOpen} onOpenChange={onOpenChange}
                       Component={ConnectComponent}/>

            <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu}/>

        </nav>
    );
}
