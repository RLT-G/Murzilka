import {Button, Card, CardBody, Input, ModalBody, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/react";
import {BaseComponent} from "@/components/common/BaseComponent";
import {ModalPage} from "@/components/common/modalPage";
import {ImageWithBorder} from "@/components/common/ImageWithBorder";
import {Line} from "@/components/common/unstakeComponent/Line";
import {useFormik} from "formik";
import {useProfile} from "@/store";
import {useEffect} from "react";
import profileActions from "@/actions/profile";

export const UnstakeComponent = ({onClose}) => {
    const BaseDisclosure = useDisclosure();
    const profile = useProfile();

    useEffect(() => {
        profileActions.getCurrentProfile().catch(r => console.log(r, "home"))
    }, [])

    const unstakedForm = useFormik({
        initialValues: {
            picsCoins: 0
        },
        onSubmit: async (values) => await handleUnstaked(values),
        validateOnChange: false,
    });

    const handleUnstaked = async (value) => {
        if(unstakedForm.values.picsCoins > profile.totalPics){
            unstakedForm.setFieldError('picsCoins', 'Вы не можете вывести более того, что у вас есть!!');
            return
        }

        await profileActions.unstakeCoins(value).then()
        await profileActions.getCurrentProfile().then()
    }

    return (
        <>
            <ModalHeader className="text-white text-center">
                <div className={"flex flex-row gap-[6px] "}>
                    <ImageWithBorder url={'../assets/murzilka_logo.png'} width={31} height={31}
                                     classNameCard={"bg-[#360606] rounded-[100px]"}/>
                    <div className={"text-2xl font-bold z-10"}>Снять MZK</div>
                </div>
            </ModalHeader>
            <ModalBody className={"flex flex-col gap-4 md:gap-8"}>
                <div className={"text-white text-sm leading-5 font-semibold"}>Снятые PIC вернутся в ваш кошелек в виде
                    MZK.
                </div>
                <Card>
                    <CardBody className={"bg-white flex flex-col place-items-start justify-start gap-8 p-6 py-8"}>
                        < Line text={'PIC * 15% APR'} value={profile.totalPics}/>
                        < Line text={'ОСТАВШИЕСЯ PIC'} value={profile.totalPics - unstakedForm.values.picsCoins}/>
                        <div className={'flex flex-row gap-3'}>
                            <Button size={'sm'} className={"btn bg-[#E17777] w-[80px] text-white"}
                                    onPress={BaseDisclosure.onOpen}>Base</Button>
                            <Button isDisabled size={'sm'} className={"btn bg-[#E17777] w-[80px] text-white"}
                                    onPress={BaseDisclosure.onOpen}>[Redacted]</Button>
                        </div>
                    </CardBody>
                </Card>
                <div className={"text-white flex flex-col gap-3"}>
                    <div className={"flex flex-col md:flex-row md:justify-between"}>
                        <div className={"text-sm font-medium flex-1"}>РАССТЕЙКАНО (МИН. 1)</div>
                        <div className={"text-sm font-medium"}>РАССТЕЙКАНО: {unstakedForm.values.picsCoins} MZK</div>
                    </div>
                    <Input
                        type="number"
                        placeholder={profile.totalPics.toString()}
                        labelPlacement="outside"
                        startContent={
                            < ImageWithBorder url={'../assets/murzilka_logo.png'} height={29} width={29}
                                              classNameCard={"bg-[#360606] rounded-[100px]"}/>
                        }
                        value={unstakedForm.values.picsCoins}
                        onChange={(e) =>
                            unstakedForm.setFieldValue('picsCoins', e.target.value)
                        }
                        isInvalid={!!unstakedForm.errors.picsCoins}
                        errorMessage={
                            unstakedForm.errors.picsCoins && <a>{unstakedForm.errors.picsCoins}</a>
                        }
                    />
                </div>
                <ModalPage isOpen={BaseDisclosure.isOpen} onOpenChange={BaseDisclosure.onOpenChange}
                           Component={BaseComponent}/>
            </ModalBody>
            <ModalFooter>
                <Button variant={'faded'} onPress={onClose}
                        className={"bg-gray-500 border-black text-white btn"}>
                    Закрыть
                </Button>
                <Button variant={'faded'}
                        className={"text-wrap bg-[#E17777] border-black text-white btn"}
                        onClick={unstakedForm.submitForm}>
                    Вынуть из стейкинга
                </Button>
            </ModalFooter>
        </>
    )
}
