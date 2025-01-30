import {Avatar, Button, Card, CardBody, useDisclosure} from "@nextui-org/react";
import {Icon} from "@/components/common/Icon";
import {ModalPage} from "@/components/common/modalPage";
import {NewToComponent} from "@/components/common/NewToComponent";
import {useEffect} from "react";
import {useProject} from "@/store";
import projectActions from "@/actions/project";
import {getSlug} from "@/utils/common";
import {Footer} from "@/components/projectsComponents/Footer";
import {ConnectComponent} from "@/components/common/ConnectComponent";
import {useWallet} from "@tronweb3/tronwallet-adapter-react-hooks";

export const ItemContent = ({ProjectItemComponent}) => {
    const ConnectDisclosure = useDisclosure();
    const {address, connected, wallet} = useWallet();

    const project = useProject();
    const projectName = getSlug();

    useEffect(() => {
        projectActions.getProjectByName(projectName).then()
    }, [])

    return (
        <Card className="box bg-white">
            <CardBody>
                <div className={" pb-6 flex flex-col gap-10"}>
                    {!connected ?
                        <Button onPress={ConnectDisclosure.onOpen}
                                className={'h-[66px] w-full font-bold text-xl leading-5 text-white bg-[#E17777] border-black border-[2px] btn'}>
                            <Icon name={'wallet'} className={"h-[31px] w-[30px]"}/>
                            Подключи кошелек
                        </Button>
                        :
                        <ProjectItemComponent/>
                    }
                    <div className={"flex flex-col gap-4"}>
                        <div className={"text-medium font-medium"}>О токене</div>
                        <div className={"w-full flex flex-row gap-8 h-fit"}>
                            <div className={"min-w-[130px] h-[152px]"}>
                                <Avatar  radius="full" src={project.logoUrl} alt={'photo'}
                                        className={"h-[152px] min-w-[152px]"}/>
                            </div>
                            <div className={"flex flex-col gap-5 w-[80%] p-1"}>
                                <div className={"flex flex-row gap-4 place-items-center"}>
                                    <div className={"text-[32px] font-bold leading-7 text-black"}>{project.name} (${project.token})</div>
                                    <div
                                        className={"text-[16px] font-medium leading-5 text-black bg-gradient-to-r from-indigo-500 to-pink-500 p-px place-items-center"}>
                                        <div className="bg-white px-3 py-1">
                                            {project.status}
                                        </div>
                                    </div>
                                </div>
                                <div className={"leading-5 text-base font-normal"}>{project.description}
                                </div>
                                <Footer project={project}/>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
            <ModalPage isOpen={ConnectDisclosure.isOpen} onOpenChange={ConnectDisclosure.onOpenChange}
                       textHeader={"Подключение кошелька"}
                       Component={ConnectComponent}/>
        </Card>
    )
}
