import {Button, ModalBody, ModalFooter, ModalHeader} from "@nextui-org/react";

export const UninstalledComponent = ({onClose}) => {
    return <>
        <ModalHeader className={"text-white flex justify-center"}>Ошибка</ModalHeader>
        <ModalBody className={"flex flex-col gap-3 text-white text-center"}>
            У вас не установлено расширение кошелька в вашем браузере или приложение TronLink на телефоне!
        </ModalBody>
        <ModalFooter>
            <Button variant={'faded'} onPress={onClose}
                    className={"bg-[#E17777] border-black border-[1px] text-white btn"}>
                Закрыть
            </Button>
        </ModalFooter>
    </>
}
