import {Icon} from "@/components/common/Icon";
import Link from "next/link";

export function Footer() {
    return (
        <footer className={"min-h-full bg-black "}>
            <div className={"flex relative text-center "}>
                <div
                    className={"text-center mx-auto relative block w-[300px] overflow-y-hidden " +
                        " box-border flex flex-col gap-3 mx-[824px] my-3"}>
                    <div className={"text-white text-base md:text-lg leading-8 font-bold "}>СВЯЖИСЬ С НАМИ</div>
                    <div className={"flex gap-4 justify-between items-center flex-row text-base cursor-pointer"}>
                        <Link href={""}  className={"border-[1px] rounded-full border-white px-2 pt-[10px] pb-[6px] "}>
                            <Icon name={"telegram"} className={"flex place-items-center w-[25px] h-[25px]"}/>
                        </Link>
                        <Link href={""} className={"border-[1px] rounded-full border-white p-2 w-[43px] h-[43px] pl-[13px] pt-[9px]"}>
                            <Icon name={"facebook"} className={"flex place-items-center w-[12px] h-[25px]"}/>
                        </Link>
                        <Link href={""} className={"border-[1px] rounded-full border-white py-2 pr-[7px] pl-[9px]"}>
                            <Icon name={"insta"} className={"flex place-items-center w-[25px] h-[25px]"}/>
                        </Link>
                        <Link href={""} className={"border-[1px] rounded-full border-white py-2 pr-[7.5px] pl-[8.5px]"}>
                            <Icon name={"message"} className={"flex place-items-center w-[23px] h-[23px]"}/>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
