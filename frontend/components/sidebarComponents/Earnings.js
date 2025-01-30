import {Card, CardBody, Divider} from "@nextui-org/react";
import {Icon} from "@/components/common/Icon";
import {ImageWithBorder} from "@/components/common/ImageWithBorder";

export const Earnings = () => {
    return <Card>
        <CardBody className={"p-4 flex flex-col gap-5"}>
            <div className={"font-medium flex text-lg text-start w-full"}>Заработанное за стейкинг</div>
            <div className={"flex flex-col gap-2 py-2"}>
                <div
                    className={"flex flex-row w-full justify-between flex flex-1 text-sm font-bold cursor-pointer hover:decoration-solid hover:underline"}>
                    <div className={"flex flex-row gap-2 items-center"}>
                        <Icon name={"wallet"}/>
                        Base
                    </div>
                    <div>1 MZK / PIC</div>
                </div>
                <Divider/>
                <div
                    className={"flex flex-row w-full justify-between flex flex-1 text-sm font-bold cursor-pointer hover:decoration-solid hover:underline"}>
                    <div className={"flex flex-row gap-2 items-center"}>
                        <Icon name={"wallet"}/>
                        [Redacted]
                    </div>
                    <div>????</div>
                </div>
                <Divider/>
                <div
                    className={"flex flex-row w-full justify-between text-sm font-medium place-items-center"}>
                    <div className={'flex'}>Заработок</div>
                    <div className={"flex flex-row gap-2 items-center"}>
                        < ImageWithBorder url={'../assets/PIC.png'} height={29} width={29}
                                          radius={'none'}
                                          classNameCard={"bg-pink-700/[0.52] rounded-[8px]"}
                                          classNameImage={"rounded-[0px]"}/>
                        0 / неделя
                    </div>
                </div>
            </div>
        </CardBody>
    </Card>
}