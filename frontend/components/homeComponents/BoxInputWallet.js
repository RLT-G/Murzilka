export const BoxInputWallet = ({inputValue, profile}) => {
    return (
        <div className={"flex flex-row place-items-center text-xs md:text-base justify-between w-full"}>
            <div className={"flex w-[40%] font-semibold leading-7"}>
                ЗАСТЕЙКАНО(МИН.1)
            </div>
            <div className={"w-[30%]"}/>
            <div className={"w-[40%] inline-flex gap-1 md:gap-3 justify-end place-items-center"}>
                <div>{inputValue}</div>
                <div className={"font-semibold"}>ПОТЕРЯНО</div>
            </div>
        </div>
    )
}
