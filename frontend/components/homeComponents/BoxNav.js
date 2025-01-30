import {Button} from "@nextui-org/react";
import {ImageWithBorder} from "@/components/common/ImageWithBorder";
import {isMobile} from "react-device-detect";

export const BoxNav = ({onOpen}) => {

    return <div className={'flex flex-row gap-3 md:gap-0 justify-between place-items-center'}>
        {isMobile ?
            <div className={"flex flex-row gap-3 place-items-center text-foreground self-center heading-4 font-medium"}>
                < ImageWithBorder url={"../assets/murzilka_logo.png"} height={30}
                                  classNameCard={"min-w-[30px] md:w-[30px] bg-[#360606] rounded-[100px]"}/>
                <div className={"font-bold leading-7 text-center text-base md:text-2xl"}>MZK стейкинг</div>
            </div>
            :
            <div className={"flex flex-row gap-3 place-items-center text-foreground self-center heading-4 font-medium"}>
                < ImageWithBorder url={"../assets/murzilka_logo.png"} height={30}
                                  classNameCard={"min-w-[30px] md:w-[30px] bg-[#360606] rounded-[100px]"}/>
                <div className={"font-bold leading-7 text-center text-base md:text-2xl"}>Стейкай MZK, получи PICS</div>
                < ImageWithBorder url={'../assets/PIC.png'} height={29} radius={'none'}
                                  classNameCard={"min-w-[29px] md:w-[29px] bg-pink-700/[0.52] rounded-[8px]"}
                                  classNameImage={"rounded-[0px]"}/>
            </div>
        }
        <Button
            className={'p-5  md:min-w-4 text-white bg-[#E17777] border-black btn'}
            variant={'faded'}
            radius="lg"
            onPress={onOpen}
        >
            <div className={"text-sm font-base leading-[20px]"}>
                Новичек?
            </div>
        </Button>
    </div>
}
