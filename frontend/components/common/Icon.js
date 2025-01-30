export const Icon = ({className, name}) => {
    const iconRegistryUrl = {
        wallet: "../assets/wallet.svg",
        cross: "../assets/cross.svg",
        ellipsis: "../assets/ellipsis.png",
        ton: "../assets/ton.svg",
        metamask: "../assets/MetaMask.svg",
        facebook: "../assets/facebook.svg",
        message: "../assets/message.svg",
        insta: "../assets/insta.svg",
        telegram: "../assets/telegram.svg",
        gearLg: "../assets/Exclude 1.svg",
        gearMd: "../assets/Exclude 2.svg",
        gearSm: "../assets/Exclude 3.svg",
        arrowBtn: "../assets/button_arrow.svg",
        scrollArrow: "../assets/scroll_arrow.svg",
        murzCoin: "../assets/murz_coin.png",
        error: "../assets/error.svg",
        search: "../assets/search.svg",
        world: "../assets/world.svg",
        newsmode: "../assets/newsmode.svg",
        backtab: "../assets/backtab.svg",
        tron: "../assets/tron.svg",
        burger: "../assets/burger.svg"
    }

    const IconElementUrl = iconRegistryUrl[name];

    return <>
        <div style={{
            background: `url('${IconElementUrl}')`,
        }} className={'stroke-[1.5] bg-no-repeat ' + className}/>
    </>

}
