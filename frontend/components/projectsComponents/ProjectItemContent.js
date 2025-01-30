import {Card, CardBody} from "@nextui-org/react";
import {convertNumberToUS} from "@/utils/common";
import {ImageWithBorder} from "@/components/common/ImageWithBorder";

export const ProjectItemContent = () => {
    return <>
        <div className={"flex flex-col gap-4"}>
            <div className={"text-foreground text-medium font-bold"}>INELIGIBLE - NOT ENOUGH PICS</div>
            <div className={"text-sm font-normal flex flex-col gap-7 mb-4"}>
                <div>Thank your for joining, but you didn`t burn enough steaks for $MON.</div>
                <div>Cheer up! You can stake more MEME, get more steaks, and prepare for the next
                    Murzilka
                    project!
                </div>
            </div>
            <Card shadow={"none"} className={"p-2 border-black border-[2px] border-solid"}>
                <CardBody className={"flex flex-col gap-3"}>
                    <div className={"text-medium font-bold"}>TOKENS</div>
                    <div className={"flex flex-row gap-4"}>
                        < ImageWithBorder url={'../assets/PIC.png'} height={29} width={29} radius={'none'} classNameCard={"bg-pink-700/[0.52] rounded-[8px]"}
                                          classNameImage={"rounded-[0px]"}/>
                        <div className={"text-2xl font-bold"}>0</div>
                    </div>
                    <div className={"text-sm font-normal"}>Returned {convertNumberToUS(1)} PICS</div>
                </CardBody>
            </Card>

        </div>
    </>
}