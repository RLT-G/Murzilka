import {convertNumberToUS} from "@/utils/common";
import {useMemo} from "react";

export const CoinConversion = ({title, PictureComponent, convNumber}) => {

    const memoizedPicture = useMemo(() => <PictureComponent/>, [])

    return (
        <div className={'flex flex-row  md:flex-col gap-3 w-[40%] place-items-center'}>
            <div className={'font-bold leading-7 text-base md:text-2xl'}>
                {title}
            </div>
            <div className={"flex flex-row gap-3 justify-center place-items-center"}>
                <div className={"min-w-[33px]"}>
                    {memoizedPicture}
                </div>
                <div className={"text-base md:text-xl md:w-[100%]"}>{convertNumberToUS(convNumber)}.00</div>
            </div>
        </div>
    )
}
