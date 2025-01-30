import {Button, Card, CardBody} from "@nextui-org/react";
import {Icon} from "@/components/common/Icon";


export const ProjectItem = () => {
    return <div className={"flex flex-col hover:scale-105"}>
        <div
            className={'text-center rounded-[16px] border-[2px] border-solid border-black top-[40px] relative h-[62px] w-[80%] min-w-[80%] mx-auto z-10 border-black ' +
                'text-white flex place-items-center justify-center bg-[#E17777] border-black p-5 ' +
                'before:content-[""] before:absolute before:h-[25px] before:w-full before:bottom-[-10px] before:rounded-[3px] ' +
                'before:h-[25px] before:bottom-[4px] before:rounded-b-[10px] before:shadow-[0_7px_7px_0_rgba(0,0,0,0.25)]'}>
            PROJECT NAME
        </div>
        <Card
            className="bg-white w-full min-w-[300px] rounded-[16px] border-[2px] border-solid border-black">
            <CardBody className={"min-w-[300px]"}>
                <div className={"flex flex-col gap-4 p-5 pt-10 pb-4"}>
                    <div>
                        {/*<Image src={"../assets/[project_name].png"} width={95} height={95} alt={'photo'}*/}
                        {/*       className={"rounded-[100px]"}/>*/}
                        <div className={"bg-gray-400 p-5 rounded-[12px] h-[239px] w-full"}></div>
                    </div>
                    <Button className={"flex flex-row py-4 px-3 bg-[#FFF5C085]/[0.70] h-[84px]"}>
                        <div className={"w-fit text-wrap text-left font-normal text-[10px] leading-4"}>Lorem ipsum dolor
                            sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
                            dolor...
                        </div>
                        <div>
                            <Icon name={"arrowBtn"} className={"w-[46px] h-[46px]"}/>
                        </div>
                    </Button>
                </div>
            </CardBody>
        </Card>

    </div>
}