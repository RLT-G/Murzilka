import {Card, CardBody} from "@nextui-org/react";
import {ImageWithBorder} from "@/components/common/ImageWithBorder";

export const TotalCard = ({profile}) => {
    return (
        <Card
            className="relative flex flex-col w-full min-w-full md:min-w-[450px] py-3 px-4 md:py-5 md:px-3 box-border border-[3px]
            border-solid border-black bg-white">
            <CardBody className={"flex p-0 flex-col md:flex-row gap-2 w-full"}>
                <div
                    className={"flex flex-row md:flex-col gap-1 justify-between md:justify-center items-center w-full"}>
                    <div className={"text-md font-bold text-muted-foreground text-center"}>Доступные MZK
                    </div>
                    <div className={"flex flex-row gap-[6px] justify-center items-center"}>
                        <ImageWithBorder url={'../assets/murzilka_logo.png'} width={31} height={31}
                                         classNameCard={"bg-[#360606] rounded-[100px]"}/>
                        <div
                            className={"text-foreground text-xl md:text-2xl font-bold z-10"}>{profile.totalStaked}</div>
                    </div>
                </div>
                <div
                    className={"flex flex-row md:flex-col gap-1 justify-between  md:justify-center items-center w-full"}>
                    <div className={"text-md font-bold text-muted-foreground text-center"}>Ваши PICS
                    </div>
                    <div className={"inline-flex gap-[6px] justify-center items-center"}>
                        < ImageWithBorder url={'../assets/PIC.png'} height={29} width={29} radius={'none'}
                                          classNameCard={"bg-pink-700/[0.52] rounded-[8px]"}
                                          classNameImage={"rounded-[0px]"}/>
                        <div className={"text-foreground text-xl md:text-2xl font-bold z-10"}>{profile.totalPics}</div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
