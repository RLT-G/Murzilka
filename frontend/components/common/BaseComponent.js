import {Button, ModalBody, ModalFooter, ModalHeader} from "@nextui-org/react";

export const BaseComponent = ({onClose}) => {
    return (
        <>
            <ModalHeader className="flex flex-col gap-1 text-white text-center">BASE</ModalHeader>
            <ModalBody className={"text-white"}>
                <p className={"indent-3"}>
                    При стейкинге ваши PICS каждый день умножаются на выделенный процент APR
                </p>
                <p className={"indent-3"}>
                    Новые PICS начинают капать на счет только через день после вноса их в стейкинг
                </p>
            </ModalBody>
            <ModalFooter>
                <Button className={'text-white border-black bg-[#E17777] btn'} variant={'faded'} onPress={onClose}>
                    Закрыть
                </Button>
            </ModalFooter>
        </>
    )
}
