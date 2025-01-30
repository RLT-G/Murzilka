import {Icon} from "@/components/common/Icon";
import {Card, CardBody, AccordionItem} from "@nextui-org/react";
import {ImageWithBorder} from "@/components/common/ImageWithBorder";
import {convertNumberToUS} from "@/utils/common";
import {useState} from "react";


export const TasksItem = ({
                              title,
                              description,
                              reward,
                              checkType
                          }) => {
    return (
        <Card shadow={"none"}
              className={"p-1 border-black border-[2px] border-solid min-h-[95px] hover:opacity-1/2"}>
            <CardBody className={"flex flex-row gap-4  w-full"}>
                <div className={"text-medium font-bold flex flex-col place-items-center gap-1 w-[5%]"}>
                    <div className={"w-fit"}>
                        < ImageWithBorder url={'../assets/PIC.png'} height={35} width={35}
                                          radius={'none'}
                                          classNameCard={"bg-pink-700/[0.52] min-w-[35px] rounded-[8px]"}
                                          classNameImage={"rounded-[0px]"}/>
                    </div>
                    <div className={"text-xs font-medium"}>{reward === 0 ? " - " : convertNumberToUS(reward)}</div>
                </div>
                <div className={"flex flex-col gap-2 w-[90%]"}>
                    <div className={"text-black font-medium text-sm"}>{title}</div>
                    <div className={"text-black text-xs font-normal text-wrap"}>{description}</div>
                </div>
                <div className={"flex place-items-center w-[5%]"}>
                    <Icon name={'arrowBtn'} className={"w-[40px] h-[50px]"}/>
                </div>
            </CardBody>
        </Card>)
}