import {Balance} from "@/components/sidebarComponents/Balance";
import {Button} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {resetStore, useProfile} from "@/store";
import {useWallet} from "@tronweb3/tronwallet-adapter-react-hooks";
import {useEffect} from "react";
import profileActions from "@/actions/profile";
import tasksActions from "@/actions/tasks";

export const UserMenu = ({onClose}) => {
    const router = useRouter();
    const profile = useProfile();
    const {disconnect, connected} = useWallet();


    useEffect(() => {
        if(connected) {
            profileActions.getCurrentProfile().then()
        }
    }, [])

    const handleDisconnect = async () => {
        await disconnect()
        tasksActions.setCompletedTasksId([])
        profileActions.logoutProfile().then()
        onClose()
        resetStore()
        router.refresh();
    }
    return <>
        <Balance profile={profile}/>
        {/*<Earnings/>*/}
        <Button variant={'faded'}
                onClick={handleDisconnect}
                className={'w-full border-black text-sm text-white font-medium leading-[22px]' +
                    'text-white bg-[#E17777] btn'}>Отключить кошелек</Button></>
}
