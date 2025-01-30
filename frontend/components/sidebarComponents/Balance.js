import {Avatar, Button, Card, CardBody, Tooltip, useDisclosure} from "@nextui-org/react";
import {ImageWithBorder} from "@/components/common/ImageWithBorder";
import {convertNumberToUS} from "@/utils/common";
import sidebarActions from "@/actions/sidebar";
import {ModalPage} from "@/components/common/modalPage";
import {HistoryComponent} from "@/components/common/HistoryComponent";
import {UnstakeComponent} from "@/components/common/unstakeComponent/UnstakeComponent";
import {useWallet} from "@tronweb3/tronwallet-adapter-react-hooks";
import {useHistory} from "@/store";
import {useEffect} from "react";
import profileActions from "@/actions/profile";

export const Balance = ({profile}) => {
    const unstakeDisclosure = useDisclosure();
    const historyDisclosure = useDisclosure();
    const {address} = useWallet();

    const handleUnstake = () => {
        sidebarActions.setSidebarOpen(false);
        unstakeDisclosure.onOpen();
    }

    const handleHistory = () => {
        sidebarActions.setSidebarOpen(false);
        historyDisclosure.onOpen();
    }

    const handleCopyToBuffer = () => {
        navigator.clipboard.writeText(address)
            .catch(err => {
                console.log('Something went wrong', err);
            });
    }

    return <Card>
        <CardBody className={"p-4 flex flex-col gap-4"}>
            <div className={"inline-flex gap-3"}>
                <div className={"p-[6px]"}>
                    <Avatar isBordered className={""} size={"lg"} src={''}/>
                </div>
                <div>
                    <Tooltip content={address}>
                        <Button data-hover={false} variant="light" onClick={handleCopyToBuffer}
                                className={"text-lg font-medium p-0"}>{address?.slice(0, 10)}...</Button>
                    </Tooltip>
                    <div className={"flex flex-row gap-2 items-center"}>
                        <div className={"text-foreground text-sm font-normal"}>Баланс кошелька:</div>
                        <div className={"flex flex-row gap-2 items-center"}>
                            <ImageWithBorder url={'../assets/murzilka_logo.png'} width={20} height={20}
                                             classNameCard={"bg-[#360606] rounded-[100px]"}/>
                            {profile.totalStaked}
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex flex-col gap-2"}>
                <div className={"flex flex-col gap-1 place-items-center items-start"}>
                    <div className={"text-md font-medium text-muted-foreground text-start"}>Общие
                        PIC
                    </div>
                    <div className={"relative flex gap-x-1.5 items-center"}>
                        < ImageWithBorder url={'../assets/PIC.png'} height={29} width={29}
                                          radius={'none'}
                                          classNameCard={"bg-pink-700/[0.52] rounded-[8px]"}
                                          classNameImage={"rounded-[0px]"}/>
                        <div
                            className={"text-2xl font-bold "}>{convertNumberToUS(profile.totalPics)}.00
                        </div>
                    </div>
                </div>
                {/*<div className={"flex flex-row place-items-center justify-between w-full"}>*/}
                {/*    <div className={"text-sm font-medium"}>Застейкано в общем</div>*/}
                {/*    <div className={"flex flex-row gap-2 items-center"}>*/}
                {/*        <ImageWithBorder url={'../assets/murzilka_logo.png'} width={20} height={20}*/}
                {/*                         classNameCard={"bg-[#360606] rounded-[100px]"}/>*/}
                {/*        0*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div className={"inline-flex gap-3 w-full"}>
                <Button variant={'faded'} onPress={handleUnstake}
                        className={'relative w-fit border-black text-sm text-white font-medium leading-[22px] bg-[#E17777] btn'}
                >Забрать из стейкинга</Button>
                <Button variant={'faded'} onPress={handleHistory}
                        className={'relative w-1/2  border-black text-sm text-white font-medium leading-[22px] bg-[#E17777] btn'}>
                    История</Button>
            </div>
        </CardBody>
        <ModalPage isOpen={historyDisclosure.isOpen} onOpenChange={historyDisclosure.onOpenChange}
                   Component={HistoryComponent} size={"2xl"}/>
        <ModalPage isOpen={unstakeDisclosure.isOpen} onOpenChange={unstakeDisclosure.onOpenChange}
                   Component={UnstakeComponent} size={"2xl"}/>
    </Card>
}
