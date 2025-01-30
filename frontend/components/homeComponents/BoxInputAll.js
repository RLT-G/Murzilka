import {Input} from "@nextui-org/react";
import {isMobile} from "react-device-detect";
import {useState} from "react";

export const BoxInputAll = () => {
    const [inputValue, setInputValue] = useState(0);

    const styles = {
        label: "text-black",
        input: [
            "bg-transparent",
            "text-black",
            "placeholder:text-black",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
            "bg-[#FFF1C0]",
            "border-[#F2D077]",
            "hover:border-[#F2D077]",
            "focus-within:!bg-[#FFF1C0]",
            "!cursor-text",
        ],
    };

    return (
        <div className={"flex flex-col md:flex-row gap-3 md:gap-0 justify-between text-sm w-full"}>
            <div className={"flex flex-row gap-6 place-items-center md:w-[40%]"}>
                <div className={"font-semibold leading-7"}>Застейкано (MIN.1)</div>
                <Input data-hover={false} maxLength={7} type="number" max={10000000} min={1} value={inputValue} onValueChange={setInputValue} key={'warning'}
                       color={"warning"}
                       placeholder={'Enter your val'} variant={'bordered'}
                       classNames={styles}/>
            </div>
            {!isMobile && <div className={"w-[30%]"}/> }
            <div className={"md:w-[40%] inline-flex gap-3 justify-between md:justify-end place-items-center"}>
                <div>{1000000 - inputValue}</div>
                <div className={"font-semibold"}>Потеряно</div>
                <div>Макс.</div>
            </div>
        </div>
    )
}
