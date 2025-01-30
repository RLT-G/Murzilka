import {Icon} from "@/components/common/Icon";

export const FooterLink = ({iconName, title, link, iconClassName}) => {

    const handlerLink = () => {
        window.open(link);
    }
    return (
        <div className={"flex inline-flex gap-2 p-1 place-items-center hover:underline"}>
            <Icon name={iconName} className={"w-[24px] h-[24px] fill-[#D25F5F] object-fit" + iconClassName}/>
            <div onClick={handlerLink} className={"text-sm font-medium leading-[24px] cursor-pointer"}>{title}</div>
        </div>
    )
}