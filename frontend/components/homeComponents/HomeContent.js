import {BoxNav} from "@/components/homeComponents/BoxNav";
import {BoxInfo} from "@/components/homeComponents/BoxInfo";
import {BoxSlider} from "@/components/homeComponents/BoxSlider";
import {Icon} from "@/components/common/Icon";
import {useState} from "react";
import {Button, Card, CardBody, useDisclosure} from "@nextui-org/react";
import {ModalPage} from "@/components/common/modalPage";
import {NewToComponent} from "@/components/common/NewToComponent";
import {BoxInputAll} from "@/components/homeComponents/BoxInputAll";
import {BaseComponent} from "@/components/common/BaseComponent";
import {BoxInputWallet} from "@/components/homeComponents/BoxInputWallet";
import {ConnectComponent} from "@/components/common/ConnectComponent";
import {useWallet} from "@tronweb3/tronwallet-adapter-react-hooks";
import {isMobile} from "react-device-detect";
import profileActions from "@/actions/profile";
import {useFormik} from "formik";
import {TaskSchema} from "@/schemas/task";


export const HomeContent = ({profile}) => {
    const [inputValue, setInputValue] = useState(0);
    const NewToDisclosure = useDisclosure();
    const BaseDisclosure = useDisclosure();
    const ConnectDisclosure = useDisclosure();
    const {connected} = useWallet();

    const coinsForm = useFormik({
        initialValues: {
            murzilkaCoins: undefined
        },
        onSubmit: async (values) => await handleStake(values),
        validateOnChange: false,
    });

    const handleOpenSidebar = () => {
        ConnectDisclosure.onOpen();
    }

    const handleOpenBot = () => {
        window.open("https://www.binance.com/ru");
    }

    const handleStake = async (values) => {
        profileActions.stakeCoins(values).then()
        await profileActions.getCurrentProfile().then()
    }

    return <>
        <Card className="box bg-white">
            <CardBody className={"pb-5 mt:pb-10 px-4"}>
                <div className={'flex flex-col w-full h-full gap-6'}>
                    <BoxNav onOpen={NewToDisclosure.onOpen}/>
                    <BoxInfo inputValue={inputValue} onOpen={BaseDisclosure.onOpen}/>
                    {connected ?
                        < BoxInputWallet inputValue={inputValue} profile={profile}/>
                        :
                        <BoxInputAll/>
                    }
                    {connected && <BoxSlider coinsForm={coinsForm} setInputValue={setInputValue} profile={profile}/>}
                </div>
                <ModalPage isOpen={BaseDisclosure.isOpen} onOpenChange={BaseDisclosure.onOpenChange}
                           Component={BaseComponent}/>
                <ModalPage isOpen={NewToDisclosure.isOpen} onOpenChange={NewToDisclosure.onOpenChange}
                           Component={NewToComponent}/>
            </CardBody>
        </Card>
        {!connected ?
            <Button
                className={'relative top-[-40px] h-[80px] w-1/2 mx-auto z-10 border-black ' +
                    'text-white flex place-items-center justify-center bg-[#E17777] btn'}
                variant={'faded'}
                onClick={() => handleOpenSidebar()}
                radius="lg"
            >
                <div className={"flex flex-row gap-2 place-items-center mx-auto w-full md:w-[90%]"}>
                    <Icon name={"wallet"} className={"h-[31px] min-w-[30px]"}/>
                    <div className={"text-wrap font-bold font-normal text-base md:text-2xl leading-[28px]"}>
                        ПОДКЛЮЧИ КОШЕЛЕК
                    </div>
                </div>
            </Button>
            :
            profile.totalStaked === 0 ?
                <Button
                    isDisabled
                    className={'relative top-[-40px] h-[80px] w-1/2 mx-auto z-10 border-black ' +
                        'text-white flex place-items-center justify-center bg-[#E17777] btn'}
                    variant={'faded'}
                    onPress={handleOpenBot}
                    radius="lg"
                >
                    <div
                        className={"font-bold font-normal text-base md:text-2xl leading-[28px] text-wrap"}>
                        КУПИТЬ MZK В БОТЕ
                    </div>
                </Button>
                :
                <Button
                    className={'relative top-[-30px] md:top-[-40px] h-[60px] md:h-[80px] w-1/2 mx-auto z-10 border-black ' +
                        'text-white flex place-items-center justify-center bg-[#E17777] btn'}
                    variant={'faded'}
                    onPress={coinsForm.submitForm}
                    radius="lg"
                >
                    <div
                        className={"font-bold font-normal text-base md:text-2xl leading-[28px] text-wrap"}>
                        Застейкать
                    </div>
                </Button>
        }
        <ModalPage isOpen={ConnectDisclosure.isOpen} onOpenChange={ConnectDisclosure.onOpenChange}
                   Component={ConnectComponent}/>
    </>

}
