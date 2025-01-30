import {Icon} from "@/components/common/Icon";
import {Button, Card, CardBody, useDisclosure} from "@nextui-org/react";
import {ModalPage} from "@/components/common/modalPage";
import {ConnectComponent} from "@/components/common/ConnectComponent";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useWallet} from "@tronweb3/tronwallet-adapter-react-hooks";

export const AboutContent = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const router = useRouter();
    const { connected } = useWallet();

    return <>
        <Card className="box bg-white">
            <CardBody>
                <div className={'flex flex-col w-full h-full gap-4 md:gap-6 pb-4 md:pb-8'}>
                    <Card shadow={"none"} className={"bg-[#FFF5C0]"}>
                        <CardBody className={"mx-auto my-2 md:my-4 w-[90%] md:w-[80%] font-bold text-lg md:text-2xl leading-7 text-center"}>
                            Мурзилка - это первый проект на просторах СНГ для сообщества протоколов социальных ставок,
                            созданный командой опытных разработчиков.
                        </CardBody>
                    </Card>
                    <div className={"flex flex-row text-sm md:text-base gap-5 p-0 md:p-2"}>
                        <div>
                            <Icon name={"gearLg"} className={"w-[69px] h-[69px]"}/>
                        </div>
                        <div>
                            Это платформа, которая позволяет пользователям ставить свои криптоактивы, такие как
                            Мурзилка или другие монеты, чтобы зарабатывать новые токены на новых перспективных
                            проектах
                        </div>
                    </div>
                    <div className={"flex flex-row text-sm md:text-base gap-5 p-0 md:p-2"}>
                        <div className={"pl-[8px]"}>
                            <Icon name={"gearMd"} className={"w-[59px] h-[59px]"}/>
                        </div>
                        <div>Это платформа, которая позволяет пользователям ставить свои криптоактивы, такие как
                            Мурзилка или другие монеты, чтобы зарабатывать новые токены на новых перспективных
                            проектах
                        </div>
                    </div>
                    <div className={"flex flex-row text-sm md:text-base gap-[24px] p-0 md:p-2"}>
                        <div className={"pl-[14px]"}>
                            <Icon name={"gearSm"} className={"w-[49px] h-[49px]"}/>
                        </div>
                        <div>Это платформа, которая позволяет пользователям ставить свои криптоактивы, такие как
                            Мурзилка или другие монеты, чтобы зарабатывать новые токены на новых перспективных
                            проектах
                        </div>
                    </div>
                </div>
                {connected &&
                    <div className={'flex justify-center md:justify-end md:pr-5'}>
                        <Button
                            className={'text-bold text-xl border-black text-white bg-[#E17777] btn'}
                            variant={'faded'}
                            onClick={() => router.push('/faq')}
                        >
                            Подробнее
                        </Button>
                    </div>
                }
                <ModalPage isOpen={isOpen} onOpenChange={onOpenChange}
                           Component={ConnectComponent}/>
            </CardBody>
        </Card>
        {!connected &&
            <Button
                className={'relative top-[-40px] h-[80px] w-[75%] md:w-1/2 mx-auto z-10 border-black ' +
                    'text-white flex place-items-center justify-center bg-[#E17777] btn'}
                variant={'faded'}
                onPress={onOpen}
                radius={"lg"}
            >
                <div className={"flex flex-row gap-1 md:gap-2 place-items-center"}>
                    <Icon name={"wallet"} className={"h-[31px] w-[30px]"}/>
                    <div className={"w-fit font-bold text-wrap font-normal text-lg md:text-2xl leading-[28px]"}>
                        Подключить кошелек
                    </div>
                </div>
            </Button>
        }
    </>
}
