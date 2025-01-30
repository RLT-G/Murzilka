import {Icon} from "@/components/common/Icon";
import {
    Accordion,
    AccordionItem,
    Button,
    Card,
    CardBody,
    Image,
    ScrollShadow,
    useDisclosure
} from "@nextui-org/react";
import {ModalPage} from "@/components/common/modalPage";
import {ConnectComponent} from "@/components/common/ConnectComponent";
import {ImageWithBorder} from "@/components/common/ImageWithBorder";
import {convertNumberToUS} from "@/utils/common";
import {CheckLink} from "@/components/common/CheckLink";
import {memo} from "react";
import {useWallet} from "@tronweb3/tronwallet-adapter-react-hooks";

export const TasksContent = ({tasks, completedTasksId, setCompleteTask, completeTask}) => {
    const ConnectDisclosure = useDisclosure();
    const {connected} = useWallet();

    const BackArrowImage = memo(() => (
        <Image width={20} height={20} src={"../assets/BackArrow.png"} className={"mr-[20px]"}/>
    ));

    return <>
        <Card className="box bg-white">
            <CardBody className={"pt-8 md:pb-6 px-3 md:px-4"}>
                <div className={"flex flex-col gap-4 md:gap-8"}>
                    <div className={"w-full flex flex-row gap-4 md:gap-8 h-fit p-1"}>
                        <div className={"min-w-[64px] w-fit h-fit"}>
                            < ImageWithBorder url={'../assets/PIC.png'} height={64} width={64}
                                              radius={'none'}
                                              classNameCard={"bg-pink-700/[0.52] rounded-[8px]"}
                                              classNameImage={"rounded-[0px]"}/>

                        </div>
                        <div className={"flex flex-col gap-3 w-full md:w-[80%] md:p-1"}>
                            <div className={"flex flex-col md:flex-row gap-4 place-items-start md:place-items-center"}>
                                <div
                                    className={"text-[24px] md:text-[32px] font-bold leading-7 text-black"}>КАРТИНКИ
                                </div>
                                <div
                                    className={"text-[16px] font-medium leading-5 text-black bg-gradient-to-r from-indigo-500 to-pink-500 p-px place-items-center"}>
                                    <div className="bg-white px-3 py-1">
                                        ДОБЫВАЮТСЯ
                                    </div>
                                </div>
                            </div>
                            <div className={"leading-5 text-base font-normal"}>Выполняй задания, получай картинки и
                                затем сжигай их за токены от наших партнеров!
                            </div>
                        </div>
                    </div>
                    {!connected &&
                        <Button
                            onClick={() => ConnectDisclosure.onOpen()}
                            className={'w-full bg-[#E17777] text-white mx-auto border-black btn'}
                            variant={'faded'}
                            radius="lg"
                        >
                            <div className={"flex flex-row gap-2 my-4 place-items-center mx-auto w-[90%] md:w-[65%]"}>
                                <Icon name={"wallet"} className={"h-[31px] min-w-[30px]"}/>
                                <div className={"text-wrap font-bold text-medium leading-[21px]"}>
                                    Подключи кошелек, чтобы выполнять задания
                                </div>
                            </div>
                        </Button>
                    }

                    <ScrollShadow hideScrollBar
                                  className={"flex flex-col gap-2 h-[45vh] md:h-[35vh] overflow-y-auto"}>
                        <Accordion variant="splitted" className={"p-0 w-full bg-white p-1"}
                                   disabledKeys={completedTasksId?.map(item => String(item))}>
                            {tasks.map((item) => {
                                return <AccordionItem
                                    isDisabled={!connected}
                                    key={item.id}
                                    aria-label={item.title}
                                    className={`border-black border-[2px]  ${item.id === completedTasksId?.find(el => el === item.id) ? "line-through border-success !bg-success" : ""}`}
                                    startContent={
                                        <div
                                            className={"text-medium font-bold flex flex-col place-items-center gap-1"}>
                                            <div className={"w-fit"}>
                                                < ImageWithBorder url={'../assets/PIC.png'} height={35} width={35}
                                                                  radius={'none'}
                                                                  classNameCard={"bg-pink-700/[0.52] min-w-[35px] rounded-[8px]"}
                                                                  classNameImage={"rounded-[0px]"}/>
                                            </div>
                                            <div
                                                className={"text-xs font-medium"}>{convertNumberToUS(item.reward)}</div>
                                        </div>
                                    }
                                    subtitle={item.description}
                                    title={item.title}
                                    indicator={<BackArrowImage/>}
                                >
                                    <CheckLink task_id={item.id} reward={item.reward} setCompleteTask={setCompleteTask}
                                               completeTask={completeTask}/>
                                </AccordionItem>
                            })}

                        </Accordion>
                    </ScrollShadow>

                    <div className={"w-full font-normal text-sm md:text-base text-center"}>... и еще больше</div>
                    <div className={"w-full font-normal text-sm md:text-base text-center"}>Боты и прочая подозрительная активность будет
                        фильтроваться без предупреждения!
                    </div>
                </div>
            </CardBody>
        </Card>
        <ModalPage isOpen={ConnectDisclosure.isOpen} onOpenChange={ConnectDisclosure.onOpenChange}
                   Component={ConnectComponent}/>
    </>

}
