'use client'

import {CoinConversion} from "@/components/homeComponents/CoinConversion";
import {Button, Card, Image} from "@nextui-org/react";
import {HomeCircle} from "@/components/homeComponents/HomeCircle";
import {ImageWithBorder} from "@/components/common/ImageWithBorder";

export const BoxInfo = ({inputValue, onOpen}) => {

    const MurComponent = () => {
        return (
            < ImageWithBorder url={'../assets/murzilka_logo.png'} height={29} width={29}
                              classNameCard={"bg-[#360606] rounded-[100px]"}/>
        )
    }

    const PicComponent = () => {
        return (
            < ImageWithBorder url={'../assets/PIC.png'} height={29} width={29} radius={'none'}
                              classNameCard={"bg-pink-700/[0.52] rounded-[8px]"}/>
        )
    }

    return (
        <div
            className={'flex flex-col text-center gap-5 md:gap-5 md:gap-10 py-4 px-2 ' +
                'md:py-8 md:px-4 rounded-[16px] bg-[#FFF5C085]/[0.52] '}>
            <div className={"leading-7 text-xl md:text-2xl font-bold"}>ПОСМОТРИ НА КОНВЕРСИЮ СВОИХ МОНЕТ!</div>
            <div className={"flex flex-col gap-5 md:gap-10"}>
                <div className={"flex flex-col items-center gap-4 md:flex-row justify-between w-full"}>
                    < CoinConversion title={"MZK"} PictureComponent={MurComponent} convNumber={inputValue}/>
                    < HomeCircle xValue={1.15}/>
                    < CoinConversion title={"PIC"} PictureComponent={PicComponent} convNumber={inputValue}/>
                </div>
                <div className={'flex flex-row gap-3 place-items-center justify-center'}>
                    <Button className={"btn bg-[#E17777] w-[104px] text-white"} onPress={onOpen}>Base</Button>
                    <Button isDisabled className={"btn bg-[#E17777] w-[104px] text-white"}>[Redacted]</Button>
                </div>
            </div>
        </div>
    )
}
