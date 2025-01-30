import {FooterLink} from "@/components/projectsComponents/FooterLink";
import {Icon} from "@/components/common/Icon";
import {ModalPage} from "@/components/common/modalPage";
import {ConnectComponent} from "@/components/common/ConnectComponent";
import {useDisclosure} from "@nextui-org/react";
import {NewToComponent} from "@/components/common/NewToComponent";

export const Footer = ({project}) => {
    const NewToDisclosure = useDisclosure();

    return <div
        className={"flex  text-[#D25F5F] items-center gap-9 mx-4  place-items-center"}>
        {project?.websiteUrl &&
            <FooterLink title={'Website'} iconName={'world'}
                        link={project?.websiteUrl}/>
        }

        {project?.whitepaperUrl &&
            <FooterLink title={'Whitepaper'} iconName={'newsmode'}
                        link={project?.whitepaperUrl}/>
        }
        <FooterLink title={'Reserch'} iconName={'search'}
                    link={"https://www.stakeland.com/farm/mon-protocol"}/>
        <div onClick={NewToDisclosure.onOpen}
             className={"flex inline-flex gap-2 p-1 hover:underline"}>
            <Icon name={'error'} className={"w-[24px] h-[24px] fill-[#D25F5F] object-fit"}/>
            <div
                className={"text-sm font-medium leading-[22px] cursor-pointer"}>{"New to Murzilka?"}</div>
        </div>
        <ModalPage isOpen={NewToDisclosure.isOpen} onOpenChange={NewToDisclosure.onOpenChange}
                   textHeader={"Murzilka помощник"}
                   Component={NewToComponent}/>
    </div>
}