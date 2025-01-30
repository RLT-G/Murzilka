import {ImageWithBorder} from "@/components/common/ImageWithBorder";

export const Line = ({text, value}) => {
    return <div className={"flex flex-col gap-2"}>
        <div className={"text-md font-bold text-muted-foreground"}>{text}
        </div>
        <div className={"flex flex-row gap-[6px] place-items-center"}>
            <ImageWithBorder url={'../assets/PIC.png'} width={31} height={31}
                             classNameCard={"bg-[#360606] rounded-[4px]"}/>
            <div className={"text-foreground text-2xl font-bold z-10"}>{value}</div>
        </div>
    </div>
}