import {Icon} from "@/components/common/Icon";

export const WalletItem = ({iconName, title, className, handleConnect}) => {
    return <div onClick={handleConnect}
                className={"flex flex-row gap-3 font-medium leading-normal text-base place-items-center cursor-pointer p-1 hover:rounded-lg hover:text-black hover:bg-gray-100"}>
        <Icon name={iconName} className={className}/>
        <div>{title}</div>
    </div>
}
