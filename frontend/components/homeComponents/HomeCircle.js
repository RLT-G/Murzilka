export const HomeCircle = ({xValue}) => {
    return (
        <div
            className={"w-[90px] h-[90px] md:w-[123px] md:h-[123px] rounded-[100px] bg-[#FFF1C0] border-solid border-[2px] border-[#F2D077]" +
                " grid place-items-center text-base md:text-2xl font-bold text-black animate-[pulse_2s_infinite]"}>
            {xValue}x
        </div>
    )
}
