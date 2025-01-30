import {Button} from "@nextui-org/react";
import sidebarActions from "@/actions/sidebar";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useWallet} from "@tronweb3/tronwallet-adapter-react-hooks";

export const MobileMenu = ({WalletDisclosure}) => {

    const router = useRouter();
    const [active, setActive] = useState(null);
    const {connected} = useWallet();

    useEffect(() => {
        setActive(sessionStorage.getItem("page"))
    }, [])

    return <>
        <div className={"w-full flex flex-col"}>
            <Button data-hover={false} variant="light" onClick={() => {
                sidebarActions.setSidebarOpen(false)
                router.push('/')
            }}
                    className={active === 'main' ? "text-[#D25F5F]" : "text-white "}>
                ДОМ
            </Button>

            <Button data-hover={false} variant="light" onClick={() => {
                sidebarActions.setSidebarOpen(false)
                router.push('/tasks')
            }}
                    className={active === 'tasks' ? "text-[#D25F5F]" : "text-white "}>
                ЗАДАНИЯ
            </Button>

            <Button data-hover={false} variant="light" onClick={() => {
                sidebarActions.setSidebarOpen(false)
                router.push('/faq')
            }}
                    className={active === 'faq' ? "text-[#D25F5F]" : "text-white "}>
                FAQ
            </Button>
            <Button data-hover={false} variant="light" onClick={() => {
                sidebarActions.setSidebarOpen(false)
                router.push('/about')
            }}
                    className={active === 'about' ? "text-[#D25F5F]" : "text-white "}>
                О НАС
            </Button>
            {connected &&
                <Button data-hover={false} variant="light" onClick={() => {
                    sidebarActions.setSidebarOpen(false);
                    WalletDisclosure.onOpen();
                }}
                        className={"text-white"}>
                    КОШЕЛЕК
                </Button>
            }
        </div>
    </>
}
